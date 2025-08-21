"use server";

import { connectToDB } from "@/lib/db";
import { parseZodError } from "@/lib/helpers/parse-zod-errors";
import { CreatePendingRequest } from "@/lib/types/pending-request";
import { pendingRequestSchema } from "@/lib/validations/pending-request.schema";
import { PendingRequest } from "@/models/pending-request.model";
import { Student } from "@/models/student.model";
import { ZodError } from "zod";

export const createApproveRequest = async (data: CreatePendingRequest) => {
  // console.log("Creating Approve Request with data:", data);
  try {
    await connectToDB();
    const validated = pendingRequestSchema.parse(data);

    const pendingRequestDoc = {
      ...validated,
      status: "pending",
    };
    await Student.findByIdAndUpdate(data.studentId, {
      $push: {
        courses: {
          courseId: data.courseId,
          moduleId: data.modules || [],
          approvedAt: null,
          isApproved: false,
        },
      },
    });

    await PendingRequest.create(pendingRequestDoc);

    return { success: true, message: "Request sent successfully" };
  } catch (error) {
    if (error instanceof ZodError) {
      return { success: false, message: parseZodError(error) };
    }
    return {
      success: false,
      message: "Something went wrong while sending the request",
    };
  }
};
