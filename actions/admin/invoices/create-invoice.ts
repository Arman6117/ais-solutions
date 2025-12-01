// actions/admin/invoices/create-invoice.ts
"use server";

import { Invoice } from "@/models/invoice.model";
import { isValidObjectId } from "mongoose";
import { ObjectId } from "mongodb";
import {
  CourseDetails,
  CreateInvoicePayload,
  PaymentHistory,
} from "@/lib/types/invoice";

export const createInvoice = async (data: CreateInvoicePayload) => {
  const {
    amountPaid,
    courseName,
    courseId,
    invoiceID, // This acts as the "Reference Invoice ID"
    paymentMode,
    dueDate,
    notes,
  } = data;

  try {
    if (!invoiceID)
      return { success: false, message: "Reference Invoice ID is required" };

    if (!isValidObjectId(invoiceID))
      return { success: false, message: "Invalid Invoice ID" };

    // 1. Fetch the "Reference" invoice to get Student data and previous course state
    const referenceInvoice = await Invoice.findById(new ObjectId(invoiceID));
    if (!referenceInvoice)
      return { success: false, message: "Reference Invoice Not Found" };

    // 2. Find the specific course details to get the Total Fees context
    const targetCourse = referenceInvoice.courseDetails.find(
      (c: CourseDetails) => c.courseId.toString() === courseId.toString()
    );

    if (!targetCourse) {
      return {
        success: false,
        message: "Course not found in reference invoice",
      };
    }

    // 3. Calculate New Cumulative Balances
    const previousPaid = targetCourse.amountPaid || 0;
    const totalFees = targetCourse.totalFees;
    const newCumulativePaid = previousPaid + amountPaid;
    const newRemaining = Math.max(0, totalFees - newCumulativePaid); // Ensure no negative values

    // 4. Determine Status based on Mongoose Enum
    let status = "Due";
    if (newRemaining <= 0) {
      status = "Paid";
    } else if (newCumulativePaid > 0) {
      status = "Partially Paid";
    }

    // 5. Prepare the Course Details for the NEW Invoice
    // We create a snapshot of the course status at this moment
    const newCourseDetails = [
      {
        courseId: targetCourse.courseId,
        modules: targetCourse.modules, // Keep reference to modules
        totalFees: totalFees,
        amountPaid: newCumulativePaid, // Updated Cumulative
        remainingFees: newRemaining, // Updated Remaining
        status: status,
        mode: targetCourse.mode,
        // Use new due date if provided, otherwise keep the old one
        dueDate: dueDate !== undefined ? dueDate : targetCourse.dueDate,
      },
    ];

    // 6. Prepare the Payment History Entry
    // This array will only contain THIS specific payment
    const newPaymentEntry = {
      amount: amountPaid,
      courseName: courseName,
      mode: paymentMode,
      dueDate: dueDate,
      notes: notes,
      modules: [], // Add module IDs here if you want to track specific modules paid
      totalFees: totalFees, // Snapshot of total fees (Optional in schema, but good for records)
    };

    // 7. Create the NEW Invoice Document
    const newInvoice = new Invoice({
      studentId: referenceInvoice.studentId, // Inherit student
      totalFees: totalFees, // Contextual Total for this invoice
      amountPaid: newCumulativePaid, // Contextual Cumulative Paid
      remainingFees: newRemaining, // Contextual Remaining
      courseDetails: newCourseDetails,
      paymentHistory: [newPaymentEntry], // Contains only the current payment
      status: status,
    });

    // 8. Save
    await newInvoice.save();

    return { success: true, message: "Payment recorded & new invoice created" };
  } catch (error) {
    console.error("Create Invoice Error:", error);
    return { success: false, message: "Something went wrong creating invoice" };
  }
};
