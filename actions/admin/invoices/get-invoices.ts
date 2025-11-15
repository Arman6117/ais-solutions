"use server";

import { connectToDB } from "@/lib/db";
import { Invoice } from "@/models/invoice.model";
import { Types, isValidObjectId } from "mongoose";
import { ObjectId } from "mongodb";
import { FormattedCourse, InvoiceDocBase, InvoiceDocPopulated, InvoiceResponse, PaymentHistory, Student } from "@/lib/types/invoice";
import "@/models/student.model"
import "@/models/course.model"
export const getInvoiceTable = async () => {
  try {
    await connectToDB();

    console.log("Function called")
    const invoices = await Invoice.find({})
      .select("_id studentId createdAt totalFees amountPaid status paymentHistory")
      .populate({
        path: "studentId",
        select: "name email courses",
        populate: [{ path: "courses.courseId", select: "courseName" }],
      })
      .sort({ createdAt: -1 });
console.log(JSON.parse(JSON.stringify(invoices)));
 
    return {
      success: true,
      data: JSON.parse(JSON.stringify(invoices)),
      message: "Invoices fetched successfully",
    };
  } catch (error) {
    console.error("Error fetching invoices:", error);
    return {
      success: false,
      message: "Something went wrong while fetching invoices",
    };
  }
};

export const getInvoiceById = async (id: string): Promise<InvoiceResponse> => {
  try {
    if (!id) return { success: false, message: "Invoice ID is required" };
    if (!isValidObjectId(id))
      return { success: false, message: "Invalid Invoice ID" };

    await connectToDB();

    const invoice = (await Invoice.findById(new ObjectId(id))
      .populate({
        path: "studentId",
        select: "name email phone courses batches",
        populate: [
          {
            path: "batches.batchId",
            select: "name courseId modules",
            populate: [
              {
                path: "courseId",
                select: "courseName",
              },
              {
                path: "modules.id",
                select: "name price",
              },
            ],
          },
        ],
      })
      .exec()) as InvoiceDocPopulated | null;

    if (!invoice) {
      return { success: false, message: "Invoice not found" };
    }

    // Type guard: Check if studentId is populated
    if (
      !invoice.studentId ||
      typeof invoice.studentId === 'string' ||
      invoice.studentId instanceof Types.ObjectId
    ) {
      return { success: false, message: "Student data not properly populated" };
    }

    const student: Student = invoice.studentId;

    // Format courses with only purchased modules
    const formattedCourses = student.batches
      ?.filter((batchEntry) => batchEntry.batchId)
      .map((batchEntry) => {
        const batch = batchEntry.batchId;

        if (!batch || !batch.courseId) {
          console.warn("Batch or courseId not populated:", batchEntry);
          return null;
        }

        const courseIdStr = batch.courseId._id.toString();

        // Find matching course details from invoice
        const invoiceCourseDetails = invoice.courseDetails.find(
          (cd) => cd.courseId?.toString() === courseIdStr
        );

        if (!invoiceCourseDetails) {
          return null; // Skip if no invoice details found
        }

        // Get only the modules that the student purchased
        const purchasedModuleIds = invoiceCourseDetails.modules.map((mid) =>
          mid.toString()
        );

        // Filter batch modules to only show purchased ones
        const purchasedModules = batch.modules
          ?.filter(
            (module) =>
              module.id &&
              purchasedModuleIds.includes(module.id._id.toString())
          )
          .map((module) => ({
            name: module.id.name || "Unknown Module",
            price: module.id.price || 0,
          })) || [];

        return {
          courseName: batch.courseId.courseName || "Unknown Course",
          courseMode: batchEntry.mode || "N/A", // Use batch mode (offline/online)
          batchName: batch.name || "N/A",
          modules: purchasedModules, // Only purchased modules
          totalFees: invoiceCourseDetails.totalFees || 0,
          amountPaid: invoiceCourseDetails.amountPaid || 0,
          remainingFees: invoiceCourseDetails.remainingFees || 0,
          dueDate: invoiceCourseDetails.dueDate || null,
          status: invoiceCourseDetails.status || "Due",
          paymentProgress: invoiceCourseDetails.totalFees
            ? (
                (invoiceCourseDetails.amountPaid /
                  invoiceCourseDetails.totalFees) *
                100
              ).toFixed(1)
            : "0",
        };
      })
      .filter(Boolean) as FormattedCourse[];

    // Format payment history
    const formattedPayments = invoice.paymentHistory.map((payment) => {
      const paymentModuleNames: string[] = [];

      // Get module names for modules in this payment
      if (payment.modules && payment.modules.length > 0) {
        student.batches?.forEach((batchEntry) => {
          const batch = batchEntry.batchId;
          if (batch && batch.modules) {
            batch.modules.forEach((module) => {
              if (
                module.id &&
                payment.modules.some(
                  (pModId) => pModId.toString() === module.id._id.toString()
                )
              ) {
                paymentModuleNames.push(module.id.name);
              }
            });
          }
        });
      }

      return {
        amount: payment.amount,
        courseName: payment.courseName,
        modules:
          paymentModuleNames.length > 0
            ? paymentModuleNames.join(" + ")
            : "Complete Course Fee",
        paymentDate: payment.createdAt || new Date(),
        dueDate: payment.dueDate || null,
        notes: payment.notes || null,
        mode: payment.mode,
      };
    });

    const overallProgress = invoice.totalFees
      ? ((invoice.amountPaid / invoice.totalFees) * 100).toFixed(1)
      : "0";

    return {
      success: true,
      data: {
        student: {
          name: student.name,
          email: student.email,
          phone: student.phone,
        },
        summary: {
          totalFees: invoice.totalFees,
          amountPaid: invoice.amountPaid,
          remainingFees: invoice.remainingFees,
          paymentProgress: overallProgress,
        },
        courses: formattedCourses,
        paymentHistory: formattedPayments,
      },
    };
  } catch (error) {
    console.error("Error fetching invoice:", error);
    return {
      success: false,
      message: "Something went wrong while fetching invoice",
    };
  }
};
