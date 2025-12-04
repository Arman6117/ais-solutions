"use server";

import { connectToDB } from "@/lib/db";
import { ApprovePendingRequestPayload } from "@/lib/types/pending-request.type";
import { Student } from "@/models/student.model";
import { Invoice } from "@/models/invoice.model";
import { Course } from "@/models/course.model";
import { Batch } from "@/models/batch.model";
import { Module } from "@/models/module.model";
import { PendingRequest } from "@/models/pending-request.model";
import SalesPerson from "@/models/sales-person.model"; // Import SalesPerson model
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
    salesPersonId, // New field in payload
  } = payload;

  try {
    await connectToDB();

    // ... (Existing validations) ...
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
    const moduleObjectIds = modules.map((id) => new mongoose.Types.ObjectId(id));

    // ... (Existing Invoice Creation Logic) ...
    const remainingFee = Math.max(0, totalFees - amountPaid);
    const paymentHistory = amountPaid > 0 ? [{ /* ... */ }] : []; // (Simplify for brevity, keep your original logic)

    // Re-create invoice logic from your provided code
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
      paymentHistory: amountPaid > 0 ? [{
          amount: amountPaid,
          courseName: courseName,
          modules: modules,
          totalFees: totalFees,
          dueDate: status !== "Paid" ? dueDate : undefined,
          notes: "Initial payment during course approval",
          mode: mode,
      }] : [],
      status: status,
    });
    await invoice.save();

    // ... (Existing Student Update Logic - Approved/Pending) ...
    // NOTE: I am assuming your original logic for updating Student is correct and keeping it.
    // I'll just focus on the new Sales Person logic here.

    const approvedCourse = student.courses?.find(
        (c: StudentCourse) =>
          c.courseId.toString() === courseId && c.isApproved === true
    );

    if (approvedCourse) {
       await Student.findOneAndUpdate(
        { _id: studentId, "courses.courseId": new mongoose.Types.ObjectId(courseId), "courses.isApproved": true },
        { $addToSet: { "courses.$.moduleId": { $each: moduleObjectIds }, invoices: invoice._id } }
      );
    } else {
       const updateDoc = {
        $set: {
          "courses.$[elem].isApproved": true,
          "courses.$[elem].approvedAt": new Date(),
          "courses.$[elem].moduleId": moduleObjectIds,
          feeStatus: status.toLowerCase(),
        },
        $addToSet: { invoices: invoice._id },
      };
      await Student.findByIdAndUpdate(studentId, updateDoc, {
        arrayFilters: [{ "elem.courseId": new mongoose.Types.ObjectId(courseId), "elem.isApproved": false }],
      });
    }

    const isAlreadyInBatch = student.batches?.some((b: StudentBatch) => b.batchId.toString() === batch) ?? false;
    if (!isAlreadyInBatch) {
      await Student.findByIdAndUpdate(studentId, {
        $push: {
          batches: { batchId: new mongoose.Types.ObjectId(batch), mode: batchMode.toLowerCase(), enrolledAt: new Date() },
        },
      });
    }

    // ... (Update Course, Batch, Module) ...
    await Promise.all([
      Course.findByIdAndUpdate(courseId, {
        $addToSet: { studentsEnrolled: studentId },
        $inc: { numberOfStudents: approvedCourse ? 0 : 1 },
      }),
      Batch.findByIdAndUpdate(batch, { $addToSet: { students: studentId } }),
      Module.updateMany({ _id: { $in: moduleObjectIds } }, { $addToSet: { students: studentId } }),
    ]);

    // --- NEW LOGIC: Update Sales Person ---
    if (salesPersonId) {
        await SalesPerson.findByIdAndUpdate(salesPersonId, {
            $addToSet: { enrolledStudents: studentId } 
            // OR if you have a complex object in enrolledStudents array:
            // $push: { enrolledStudents: { studentId, enrolledAt: new Date() } }
            // Based on your previous schema request, it was an array of ObjectIds.
        });
        console.log("✅ Updated Sales Person record");
    }

    // Delete pending request
    await PendingRequest.findByIdAndDelete(requestId);

    return {
      success: true,
      message: `Course enrollment approved successfully for ${email}`,
    };
  } catch (error) {
    console.error("Failed to approve pending request:", error);
    return { success: false, message: "Something went wrong while processing the request." };
  }
};
