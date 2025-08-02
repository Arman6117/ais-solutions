"use server";

import { connectToDB } from "@/lib/db";
import { InvoiceStatus, PaymentMode } from "@/lib/types/types";
import { Invoice } from "@/models/invoice.model";
import { isValidObjectId } from "mongoose";
import { ObjectId } from "mongodb";
import { InvoiceDoc, PaymentHistory, Student } from "@/lib/types/invoice";

export const getInvoiceTable = async () => {
  try {
    await connectToDB();

    const invoices = await Invoice.find({})
      .select("_id studentId totalFees amountPaid status paymentHistory")
      .populate({
        path: "studentId",
        select: "name email courseIds",
        populate: [{ path: "courseIds", select: "name" }],
      })
      .sort({ createdAt: -1 });

    const formattedInvoices = invoices.map((invoice) => {
      const student = invoice.studentId;
      const lastPayment =
        invoice.paymentHistory?.[invoice.paymentHistory.length - 1];

      return {
        _id: `${invoice._id}`,
        studentName: student?.name || "Unknown",
        email: student?.email || ("Unknown" as string),
        courses: (student?.courseIds?.map((c: { name: string }) => c.name) ||
          []) as string[],
        totalFee: invoice.totalFees as number,
        amountPaid: invoice.amountPaid as number,
        status: invoice.status as InvoiceStatus,
        lastPaymentMode: (lastPayment?.mode || "N/A") as PaymentMode,
        lastPaymentDate: (lastPayment?.dueDate || "N/A") as string,
      };
    });

    return {
      success: true,
      data: formattedInvoices,
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

export const getInvoiceById = async (id: string) => {
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
            path: "courses.courseId",
            select: "courseName courseMode",
          },
          {
            path: "batches",
            select: "name courseId modules",
          },
        ],
      })

      .exec()) as InvoiceDoc | null;

    if (!invoice) {
      return { success: false, message: "Invoice not found" };
    }

    const student: Student = invoice.studentId;

    const formattedCourses = student.courses.map((courseEntry) => {
      const courseIdStr = (
        courseEntry.courseId as { _id: string }
      )._id.toString();

      const batch = student.batches.find(
        (b) => b.courseId.toString() === courseIdStr
      );

      const invoiceCourseDetails = invoice.courseDetails.find(
        (cd) => cd.courseId.toString() === courseIdStr
      );

      return {
        courseName: courseEntry.courseId.courseName,
        courseMode: courseEntry.courseId.courseMode,
        batchName: batch?.name || "N/A",
        modules: batch?.modules || [],
        totalFees: invoiceCourseDetails?.totalFees || 0,
        amountPaid: invoiceCourseDetails?.amountPaid || 0,
        remainingFees: invoiceCourseDetails?.remainingFees || 0,
        dueDate: invoiceCourseDetails?.dueDate || null,
        status: invoiceCourseDetails?.status || "Due",
      };
    });

    const formattedPayments = invoice.paymentHistory.map(
      (payment): PaymentHistory => ({
        amount: payment.amount,
        courseName: payment.courseName,
        modules: payment.modules,
        dueDate: payment.dueDate,
        notes: payment.notes,
        mode: payment.mode,
      })
    );

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
