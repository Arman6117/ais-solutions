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

interface StudentCourse {
  courseId: mongoose.Types.ObjectId;
  moduleId?: mongoose.Types.ObjectId[];
  isApproved: boolean;
  appliedAt?: Date;
  approvedAt?: Date | null;
}

interface StudentBatch {
  batchId: mongoose.Types.ObjectId;
  mode: string;
  enrolledAt: Date;
}

interface IStudent {
  _id: string;
  email: string;
  courses?: StudentCourse[];
  batches?: StudentBatch[];
}

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

    // Validations
    if (!requestId || !email || !courseId || !batch || !modules.length) {
      return { success: false, message: "Missing required fields" };
    }

    const pendingRequest = await PendingRequest.findById(requestId);
    if (!pendingRequest) {
      return { success: false, message: "Pending request not found" };
    }

    const student = await Student.findOne({ email })
      .select("_id courses batches")
      .lean<IStudent>()
      .exec();

    if (!student) {
      return { success: false, message: "Student not found" };
    }

    const studentId = student._id;

    // Convert modules to ObjectIds
    const moduleObjectIds = modules.map((id) => new mongoose.Types.ObjectId(id));

    // Check if student already has an approved course entry
    const approvedCourse = student.courses?.find(
      (c: StudentCourse) =>
        c.courseId.toString() === courseId && c.isApproved === true
    );

    // Validate course and batch exist
    const [courseExists, batchExists] = await Promise.all([
      Course.findById(courseId).select("_id"),
      Batch.findById(batch).select("_id"),
    ]);

    if (!courseExists || !batchExists) {
      return { success: false, message: "Course or Batch not found" };
    }

    const remainingFee = Math.max(0, totalFees - amountPaid);

    console.log({
      Payload: payload,
      "Calculated Remaining Fee": remainingFee,
      "Is Additional Purchase": !!approvedCourse,
    });

    // Check if student is already enrolled in this batch
    const isAlreadyInBatch =
      student.batches?.some((b: StudentBatch) => b.batchId.toString() === batch) ??
      false;

    // Create invoice
    const paymentHistory =
      amountPaid > 0
        ? [
            {
              amount: amountPaid,
              courseName: courseName,
              modules: modules,
              totalFees: totalFees,
              dueDate: status !== "Paid" ? dueDate : undefined,
              notes: approvedCourse
                ? "Payment for additional modules"
                : "Initial payment during course approval",
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

    // Update student based on whether it's first-time or additional purchase
    if (approvedCourse) {
      // Student already has approved course - add new modules to existing entry
      await Student.findOneAndUpdate(
        {
          _id: studentId,
          "courses.courseId": new mongoose.Types.ObjectId(courseId),
          "courses.isApproved": true,
        },
        {
          $addToSet: {
            "courses.$.moduleId": { $each: moduleObjectIds },
            invoices: invoice._id,
          },
        }
      );

      console.log("✅ Added modules to existing approved course");
    } else {
      // First-time approval - update the pending course entry
      const updateDoc: {
        $set: Record<string, unknown>;
        $addToSet: Record<string, unknown>;
      } = {
        $set: {
          "courses.$[elem].isApproved": true,
          "courses.$[elem].approvedAt": new Date(),
          "courses.$[elem].moduleId": moduleObjectIds,
          feeStatus: status.toLowerCase(),
        },
        $addToSet: {
          invoices: invoice._id,
        },
      };

      await Student.findByIdAndUpdate(studentId, updateDoc, {
        arrayFilters: [
          {
            "elem.courseId": new mongoose.Types.ObjectId(courseId),
            "elem.isApproved": false,
          },
        ],
      });

      console.log("✅ Approved course for first time");
    }

    // Only add batch if not already enrolled
    if (!isAlreadyInBatch) {
      await Student.findByIdAndUpdate(studentId, {
        $push: {
          batches: {
            batchId: new mongoose.Types.ObjectId(batch),
            mode: batchMode.toLowerCase(),
            enrolledAt: new Date(),
          },
        },
      });

      console.log("✅ Added student to batch");
    }

    // Update related collections
    await Promise.all([
      Course.findByIdAndUpdate(courseId, {
        $addToSet: { studentsEnrolled: studentId },
        $inc: { numberOfStudents: approvedCourse ? 0 : 1 }, // Only increment for first-time
      }),
      Batch.findByIdAndUpdate(batch, {
        $addToSet: { students: studentId },
      }),
      Module.updateMany(
        { _id: { $in: moduleObjectIds } },
        { $addToSet: { students: studentId } }
      ),
    ]);

    // Delete pending request
    await PendingRequest.findByIdAndDelete(requestId);

    return {
      success: true,
      message: `Course enrollment approved successfully for ${email}`,
    };
  } catch (error) {
    console.error("Failed to approve pending request:", error);
    return {
      success: false,
      message: "Something went wrong while processing the request.",
    };
  }
};
