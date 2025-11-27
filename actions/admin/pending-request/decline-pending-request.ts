// actions/admin/pending-request/decline-pending-request.ts
"use server";

import { connectToDB } from "@/lib/db";
import { PendingRequest } from "@/models/pending-request.model";
import { Student } from "@/models/student.model";
import { isValidObjectId } from "mongoose";

type DeclineRequestResponse = {
  success: boolean;
  message: string;
};

export async function declinePendingRequest(
  requestId: string
): Promise<DeclineRequestResponse> {
  try {
    await connectToDB();

    if (!requestId || !isValidObjectId(requestId)) {
      return {
        success: false,
        message: "Invalid request ID",
      };
    }

    // Find the pending request
    const pendingRequest = await PendingRequest.findById(requestId);

    if (!pendingRequest) {
      return {
        success: false,
        message: "Pending request not found",
      };
    }

    // Check if already processed
    if (pendingRequest.status !== "pending") {
      return {
        success: false,
        message: `This request has already been ${pendingRequest.status}`,
      };
    }

    await Student.findByIdAndUpdate(
      pendingRequest.studentId,
      {
        $pull: {
          courses: {
            courseId: pendingRequest.courseId,
            isApproved: false,
          },
        },
      }
    );
    // Update the pending request status to rejected
    await PendingRequest.findByIdAndDelete(requestId);

    // Optional: Remove the unapproved course entry from Student model
    // This cleans up the student's courses array

    return {
      success: true,
      message: "Request declined successfully",
    };
  } catch (error) {
    console.error("Error declining request:", error);
    return {
      success: false,
      message: "Failed to decline request",
    };
  }
}
