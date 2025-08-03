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
    invoiceID,
    paymentMode,
    dueDate,
    notes,
  } = data;
  try {
    if (!invoiceID)
      return { success: false, message: "Invoice ID is required" };

    if (!isValidObjectId(invoiceID))
      return { success: false, message: "Invalid Invoice ID" };

    const invoice = await Invoice.findById(new ObjectId(invoiceID));
    if (!invoice) return { success: false, message: "No Invoice Found" };
    if (dueDate !== undefined && courseId) {
      invoice.courseDetails = invoice.courseDetails.map(
        (course: CourseDetails) => {
          if (course.courseId.toString() === courseId.toString()) {
            return { ...course, dueDate };
          }
          return course;
        }
      );
    }
    const newPayment: PaymentHistory = {
      amount: amountPaid,
      courseName: courseName,
      mode: paymentMode,
      dueDate,
      notes,
    };
    invoice.paymentHistory.push(newPayment);
    invoice.amountPaid += amountPaid;
    invoice.remainingFees = invoice.totalFees - invoice.amountPaid;
    if (courseId) {
      invoice.courseDetails = invoice.courseDetails.map(
        (course: CourseDetails) => {
          if (course.courseId.toString() === courseId.toString()) {
            const updatedPaid = course.amountPaid + amountPaid;
            const updatedRemaining = course.totalFees - updatedPaid;
            return {
              ...course,
              amountPaid: updatedPaid,
              remainingFees: updatedRemaining,
            };
          }
          return course;
        }
      );
    }
    await invoice.save();
    return { success: true, message: "New invoice added" };
  } catch (error) {
    console.log(error);
    return { success: false, message: "Something went wrong" };
  }
};
