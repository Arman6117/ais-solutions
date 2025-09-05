"use server";

import { connectToDB } from "@/lib/db";
import { ApprovePendingRequestPayload } from "@/lib/types/pending-request.type";
import { Student } from "@/models/student.model";
import { Invoice } from "@/models/invoice.model";
import { Course } from "@/models/course.model";
import { Batch } from "@/models/batch.model";
import { Module } from "@/models/module.model";
import { PendingRequest } from "@/models/pending-request.model";
import mongoose from "mongoose";

export const approvePendingRequest = async (
  requestId: string,
  payload: ApprovePendingRequestPayload
): Promise<{ success: boolean; message: string }> => {
  const {
    email,
    courseName,
    amountPaid,
    batch,
    batchMode,
    courseId,
    mode,
    modules,
    status,
    totalFees,
    dueDate,
  } = payload;

  try {
    await connectToDB();

    // --- All initial validations remain the same ---
    if (!requestId || !email || !courseId || !batch || !modules.length) {
      return { success: false, message: "Missing required fields" };
    }
    const pendingRequest = await PendingRequest.findById(requestId);
    if (!pendingRequest) {
      return { success: false, message: "Pending request not found" };
    }
    const student = await Student.findOne({ email }).select("_id courses").exec();
    if (!student) {
      return { success: false, message: "Student not found" };
    }
    const studentId = student._id;

    const existingCourseEntry = student.courses?.find(
      (c: any) => c.courseId.toString() === courseId && !c.isApproved
    );
    if (!existingCourseEntry) {
      return {
        success: false,
        message: "Student has not applied for this course or is already approved.",
      };
    }

    // --- All other validations (course, batch, payment logic) remain the same ---
    const [courseExists, batchExists] = await Promise.all([
        Course.findById(courseId).select("_id"),
        Batch.findById(batch).select("_id")
    ]);
    if (!courseExists || !batchExists) {
        return { success: false, message: "Course or Batch not found" };
    }
    const remainingFee = Math.max(0, totalFees - amountPaid);
    // (Add your other payment validation logic here)


    // Create the invoice first (no changes here)
    const paymentHistory =
      amountPaid > 0
        ? [
            {
              amount: amountPaid,
              courseName: courseName,
              modules: modules,
              totalFees: totalFees,
              dueDate: status !== "Paid" ? dueDate : undefined,
              notes: "Initial payment during course approval",
              mode: mode,
            },
          ]
        : [];

    const invoice = new Invoice({
      studentId: studentId,
      totalFees: totalFees,
      remainingFees: remainingFee,
      amountPaid: amountPaid,
      courseDetails: [
        {
          courseId: courseId,
          modules: modules,
          totalFees: totalFees,
          remainingFees: remainingFee,
          amountPaid: amountPaid,
          dueDate: status !== "Paid" ? dueDate : undefined,
          status: status,
          mode: batchMode.toLowerCase(),
        },
      ],
      paymentHistory: paymentHistory,
      status: status,
    });
    await invoice.save();


    // *** MODIFIED STUDENT UPDATE LOGIC ***
    await Student.findByIdAndUpdate(
      studentId,
      {
        // Use $set with arrayFilters to target the specific course entry
        $set: {
          "courses.$[elem].isApproved": true,
          "courses.$[elem].approvedAt": new Date(),
          "courses.$[elem].moduleId": modules, // Update modules if needed
          feeStatus: status.toLowerCase(),
        },
        // Add the new invoice and batch
        $addToSet: {
          invoices: invoice._id,
        },
        $push: {
            batches: { 
              batchId: batch, 
              mode: batchMode.toLowerCase(),
              enrolledAt: new Date() 
            },
        },
      },
      {
        // Define the filter to find the correct course in the array
        arrayFilters: [
          {
            "elem.courseId": new mongoose.Types.ObjectId(courseId),
            "elem.isApproved": false, // Ensure we only update unapproved entries
          },
        ],
      }
    );

    // --- All subsequent updates (Course, Batch, Module, PendingRequest deletion) remain the same ---
    await Course.findByIdAndUpdate(courseId, { 
      $addToSet: { studentsEnrolled: studentId },
      $inc: { numberOfStudents: 1 }
    });
    await Batch.findByIdAndUpdate(batch, { 
      $addToSet: { students: studentId },
    });
    await Module.updateMany(
        { _id: { $in: modules } },
        { $addToSet: { students: studentId } }
    );
    await PendingRequest.findByIdAndDelete(requestId);

    return {
      success: true,
      message: `Course enrollment approved successfully for ${email}`,
    };
  } catch (error) {
    console.error("Failed to approve pending request:", error);
    // (Your existing error handling logic)
    return {
      success: false,
      message: "Something went wrong while processing the request.",
    };
  }
};