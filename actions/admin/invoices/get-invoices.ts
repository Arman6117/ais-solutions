"use server";

import { connectToDB } from "@/lib/db";
import { Invoice } from "@/models/invoice.model";
import { Types, isValidObjectId } from "mongoose";
import { ObjectId } from "mongodb";
import {
  InvoiceResponse,
  InvoiceDocPopulated,
  FormattedCourse,
  FormattedPayment,
  Student as StudentType,
} from "@/lib/types/invoice"; // Ensure this path matches where you saved the types file

// Import models to ensure schemas are registered
import "@/models/student.model";
import "@/models/course.model";
import "@/models/batch.model";
import "@/models/module.model";

export const getInvoiceTable = async () => {
  try {
    await connectToDB();

    console.log("Function called");
    const invoices = await Invoice.find({})
      .select(
        "_id studentId createdAt totalFees amountPaid status paymentHistory"
      )
      .populate({
        path: "studentId",
        select: "name email courses",
        populate: [{ path: "courses.courseId", select: "courseName" }],
      })
      .sort({ createdAt: -1 });

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

    // 1. Fetch the specific requested invoice (to get student details mostly)
    const currentInvoice = (await Invoice.findById(new ObjectId(id))
      .populate({
        path: "studentId",
        select: "name email phone courses batches",
        populate: {
          path: "batches.batchId",
          select: "name courseId modules",
          populate: [
            { path: "courseId", select: "courseName" },
            { path: "modules.id", select: "name price" },
            { path: "modules", select: "name price" },
          ],
        },
      })
      .lean()) as unknown as InvoiceDocPopulated | null;

    if (!currentInvoice) {
      return { success: false, message: "Invoice not found" };
    }

    const student = currentInvoice.studentId;
    if (!student) {
      return { success: false, message: "Student data not properly populated" };
    }

    // --- NEW STEP: FETCH ALL INVOICES FOR THIS STUDENT ---
    const allStudentInvoices = await Invoice.find({ studentId: student._id })
      .select("paymentHistory")
      .lean();

    // 2. Initialize Overall Summary Variables
    let overallTotalFees = 0;
    let overallAmountPaid = 0;

    // 3. Format courses with Dynamic Calculation (Logic kept same as previous correct version)
    const formattedCourses = student.batches
      ?.map((batchEntry) => {
        const batch = batchEntry.batchId;
        if (!batch || !batch.courseId) return null;

        const courseIdStr =
          typeof batch.courseId._id === "string"
            ? batch.courseId._id
            : batch.courseId._id.toString();

        // Use currentInvoice to find course details (assuming current invoice has course links)
        // Note: If courseDetails are spread across multiple invoices, we might need logic to merge them.
        // For now, assuming currentInvoice holds the master record or at least the link.
        const invoiceCourseDetails = currentInvoice.courseDetails.find(
          (cd) => cd.courseId.toString() === courseIdStr
        );

        if (!invoiceCourseDetails) return null;

        const invoiceModuleIds = invoiceCourseDetails.modules.map((id) =>
          id.toString()
        );

        let calculatedCourseTotal = 0;

        const displayedModules = (batch.modules || [])
          .map((m) => {
            const moduleData = (m as any).id && (m as any).id.name ? (m as any).id : m;
            if (!moduleData || !moduleData._id) return null;

            // Include ALL modules in the batch
            const price = moduleData.price || 0;
            calculatedCourseTotal += price;

            return {
              name: moduleData.name || "Unknown Module",
              price: price,
            };
          })
          .filter((item): item is { name: string; price: number } => Boolean(item));

        const currentAmountPaid = invoiceCourseDetails.amountPaid || 0;
        const currentRemaining = Math.max(
          0,
          calculatedCourseTotal - currentAmountPaid
        );

        const courseProgress =
          calculatedCourseTotal > 0
            ? ((currentAmountPaid / calculatedCourseTotal) * 100).toFixed(1)
            : "0";

        overallTotalFees += calculatedCourseTotal;
        overallAmountPaid += currentAmountPaid;

        return {
          courseName: batch.courseId.courseName || "Unknown Course",
          courseMode: batchEntry.mode || "N/A",
          batchName: batch.name || "N/A",
          modules: displayedModules,
          totalFees: calculatedCourseTotal,
          amountPaid: currentAmountPaid,
          remainingFees: currentRemaining,
          dueDate: invoiceCourseDetails.dueDate
            ? new Date(invoiceCourseDetails.dueDate).toISOString()
            : null,
          status: currentRemaining === 0 ? "Paid" : "Due",
          paymentProgress: courseProgress,
        };
      })
      .filter((item): item is FormattedCourse => Boolean(item));

    // 4. Format Payment History (AGGREGATED FROM ALL INVOICES)
    let allPayments: any[] = [];
    
    // Combine payments from all invoices found for this student
    allStudentInvoices.forEach((inv: any) => {
        if (inv.paymentHistory && Array.isArray(inv.paymentHistory)) {
            allPayments = [...allPayments, ...inv.paymentHistory];
        }
    });

    // Sort payments by date (newest first)
    allPayments.sort((a, b) => {
        const dateA = new Date(a.createdAt || a.date).getTime();
        const dateB = new Date(b.createdAt || b.date).getTime();
        return dateB - dateA;
    });

    const formattedPayments: FormattedPayment[] = allPayments.map(
      (payment) => {
        const paymentModuleNames: string[] = [];

        if (payment.modules && payment.modules.length > 0) {
          student.batches?.forEach((batchEntry) => {
            const batch = batchEntry.batchId;
            if (batch && batch.modules) {
              batch.modules.forEach((m) => {
                const moduleData = (m as any).id && (m as any).id.name ? (m as any).id : m;
                if (
                  moduleData &&
                  payment.modules.some(
                    (pModId: any) =>
                      pModId.toString() === moduleData._id.toString()
                  )
                ) {
                  paymentModuleNames.push(moduleData.name);
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
              : "Course Payment", // Fallback if specific modules aren't tracked
          paymentDate: payment.createdAt
            ? new Date(payment.createdAt).toISOString()
            : new Date().toISOString(),
          dueDate: payment.dueDate
            ? new Date(payment.dueDate).toISOString()
            : null,
          notes: payment.notes || null,
          mode: payment.mode,
        };
      }
    );

    // 5. Calculate Overall Summary
    const overallRemaining = Math.max(0, overallTotalFees - overallAmountPaid);
    const overallProgress =
      overallTotalFees > 0
        ? ((overallAmountPaid / overallTotalFees) * 100).toFixed(1)
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
          totalFees: overallTotalFees,
          amountPaid: overallAmountPaid,
          remainingFees: overallRemaining,
          paymentProgress: overallProgress,
        },
        courses: formattedCourses || [],
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
