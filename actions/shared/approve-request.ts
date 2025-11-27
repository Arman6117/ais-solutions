"use server";

import { connectToDB } from "@/lib/db";
import { parseZodError } from "@/lib/helpers/parse-zod-errors";
import { CreatePendingRequest } from "@/lib/types/pending-request.type";
import { pendingRequestSchema } from "@/lib/validations/pending-request.schema";
import { PendingRequest } from "@/models/pending-request.model";
import { Student } from "@/models/student.model";
import { ZodError } from "zod";
import mongoose from "mongoose";

interface StudentCourse {
  courseId: mongoose.Types.ObjectId;
  moduleId?: mongoose.Types.ObjectId[];
  isApproved: boolean;
  appliedAt?: Date;
  approvedAt?: Date | null;
}

interface IStudent {
  _id: string;
  email: string;
  courses?: StudentCourse[];
}

export const createApproveRequest = async (data: CreatePendingRequest) => {
  try {
    await connectToDB();
    const validated = pendingRequestSchema.parse(data);

    // Convert module strings to ObjectIds
    const moduleObjectIds = (data.modules || []).map(
      (id) => new mongoose.Types.ObjectId(id)
    );

    if (moduleObjectIds.length === 0) {
      return {
        success: false,
        message: "Please select at least one module",
      };
    }

    console.log("📦 Module IDs being saved:", moduleObjectIds);

    // Check if student exists
    const student = await Student.findById(data.studentId)
      .select("courses")
      .lean<IStudent>()
      .exec();

    if (!student) {
      return { success: false, message: "Student not found" };
    }

    // Check for existing course entry
    const existingCourse = student.courses?.find(
      (c: StudentCourse) => c.courseId.toString() === data.courseId
    );

    if (existingCourse) {
      // Get already purchased/requested modules
      const existingModuleIds = (existingCourse.moduleId || []).map((id) =>
        id.toString()
      );
      const newModuleIds = moduleObjectIds.map((id) => id.toString());

      // Check if any of the requested modules are already purchased
      const alreadyPurchased = newModuleIds.filter((id) =>
        existingModuleIds.includes(id)
      );

      if (alreadyPurchased.length > 0) {
        return {
          success: false,
          message: "Some modules are already purchased or pending approval",
        };
      }

      if (existingCourse.isApproved) {
        // Course is approved - student wants to add MORE modules
        // Check if there's already a pending request for additional modules
        const existingPendingRequest = await PendingRequest.findOne({
          studentId: data.studentId,
          courseId: data.courseId,
          status: "pending",
        });

        if (existingPendingRequest) {
          // Add to existing pending request
          await PendingRequest.findByIdAndUpdate(existingPendingRequest._id, {
            $addToSet: {
              modules: { $each: data.modules || [] },
            },
            $set: { updatedAt: new Date() },
          });

          return {
            success: true,
            message: "Additional modules added to your pending request",
          };
        } else {
          // Create a NEW pending request for additional modules
          const pendingRequestDoc = {
            ...validated,
            status: "pending" as const,
          };

          await PendingRequest.create(pendingRequestDoc);

          return {
            success: true,
            message: "Request for additional modules sent successfully",
          };
        }
      } else {
        // Course exists but not approved - update the existing entry
        const updateResult = await Student.findOneAndUpdate(
          {
            _id: data.studentId,
            "courses.courseId": new mongoose.Types.ObjectId(data.courseId),
            "courses.isApproved": false,
          },
          {
            $addToSet: {
              "courses.$.moduleId": { $each: moduleObjectIds },
            },
            $set: {
              "courses.$.appliedAt": new Date(),
            },
          },
          { new: true }
        );

        console.log("✅ Updated course with modules:", updateResult?.courses);

        // Update existing pending request
        const existingPendingRequest = await PendingRequest.findOne({
          studentId: data.studentId,
          courseId: data.courseId,
          status: "pending",
        });

        if (existingPendingRequest) {
          const updateFields: Record<string, unknown> = {
            updatedAt: new Date(),
          };

          if ("batch" in validated) updateFields.batch = validated.batch;
          if ("batchMode" in validated)
            updateFields.batchMode = validated.batchMode;

          await PendingRequest.findByIdAndUpdate(existingPendingRequest._id, {
            $addToSet: {
              modules: { $each: data.modules || [] },
            },
            $set: updateFields,
          });

          return {
            success: true,
            message: "Additional modules added to your pending request",
          };
        }
      }
    }

    // No existing course entry - create new one
    if (!existingCourse) {
      const updateResult = await Student.findByIdAndUpdate(
        data.studentId,
        {
          $push: {
            courses: {
              courseId: new mongoose.Types.ObjectId(data.courseId),
              moduleId: moduleObjectIds,
              appliedAt: new Date(),
              approvedAt: null,
              isApproved: false,
            },
          },
        },
        { new: true }
      );

      console.log("✅ Created course with modules:", updateResult?.courses);
    }

    const pendingRequestDoc = {
      ...validated,
      status: "pending" as const,
    };

    await PendingRequest.create(pendingRequestDoc);

    return { success: true, message: "Request sent successfully" };
  } catch (error) {
    if (error instanceof ZodError) {
      return { success: false, message: parseZodError(error) };
    }
    console.error("❌ Error in createApproveRequest:", error);
    return {
      success: false,
      message: "Something went wrong while sending the request",
    };
  }
};
