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
    invoiceID, // Used here as a "Reference ID" to find the Student
    paymentMode,
    dueDate,
    notes,
  } = data;

  try {
    if (!invoiceID)
      return { success: false, message: "Reference Invoice ID is required" };

    if (!isValidObjectId(invoiceID))
      return { success: false, message: "Invalid Invoice ID" };

    // 1. Fetch the "Reference" invoice to get Student metadata and Course context
    const referenceInvoice = await Invoice.findById(new ObjectId(invoiceID));
    if (!referenceInvoice) return { success: false, message: "Reference Invoice Not Found" };

    // 2. Find the specific course details to get the Total Fees context
    const targetCourse = referenceInvoice.courseDetails.find(
      (c: CourseDetails) => c.courseId.toString() === courseId.toString()
    );

    if (!targetCourse) {
      return { success: false, message: "Course not found in reference invoice" };
    }

    // 3. Calculate New Balances (Cumulative)
    // We calculate the new state based on the reference invoice + this new payment
    const previousPaid = targetCourse.amountPaid || 0;
    const totalFees = targetCourse.totalFees;
    const newCumulativePaid = previousPaid + amountPaid;
    const newRemaining = totalFees - newCumulativePaid;

    // Determine Status
    let status = "Partially Paid";
    if (newRemaining <= 0) status = "Paid";
    else if (newRemaining > 0 && newCumulativePaid > 0) status = "Partially Paid";
    else status = "Due";

    // 4. Prepare the Course Details for the NEW Invoice
    // We create a snapshot of the course status at this moment
    const newCourseDetails = [{
      courseId: targetCourse.courseId,
      modules: targetCourse.modules, // Keep reference to modules
      totalFees: totalFees,
      amountPaid: newCumulativePaid, // Updated Cumulative
      remainingFees: newRemaining,   // Updated Remaining
      status: status,
      mode: targetCourse.mode,
      dueDate: dueDate !== undefined ? dueDate : targetCourse.dueDate
    }];

    // 5. Prepare the Payment History Entry
    const newPaymentEntry: PaymentHistory = {
      amount: amountPaid,
      courseName: courseName,
      mode: paymentMode,
      dueDate,
      notes,
      modules: [],
      totalFees: totalFees // Snapshot of total fees
    };

    // 6. Create the NEW Invoice Document
    // We inherit the studentId from the reference invoice
    const newInvoice = new Invoice({
      studentId: referenceInvoice.studentId,
      totalFees: totalFees, // Contextual Total for this invoice
      amountPaid: newCumulativePaid, // Contextual Cumulative Paid
      remainingFees: newRemaining, // Contextual Remaining
      courseDetails: newCourseDetails,
      paymentHistory: [newPaymentEntry], // Only contains THIS payment
      status: status,
    });

    // 7. Save the NEW Invoice
    await newInvoice.save();

    return { success: true, message: "New invoice created successfully" };
  } catch (error) {
    console.log(error);
    return { success: false, message: "Something went wrong creating invoice" };
  }
};
