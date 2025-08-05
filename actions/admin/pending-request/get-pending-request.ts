"use server";

import { connectToDB } from "@/lib/db";
import { AllPendingRequests } from "@/lib/types/pending-request";
import { PendingRequest } from "@/models/pending-request.model";


export const getAllPendingRequests = async () => {
  try {
    await connectToDB();
    const pendingRequest = (await PendingRequest.find({})
      .sort({ createdAt: -1 })
      .select("_id studentId courseId")
      .populate([
        {
          path: "studentId",
          select: "name email",
        },
        {
          path: "courseId",
          select: "courseName",
        },
      ])
      .exec()) as AllPendingRequests[] | null;

    return {
      success: true,
      data: pendingRequest,
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      data: [],
    };
  }
};
