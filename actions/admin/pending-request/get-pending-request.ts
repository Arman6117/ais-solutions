"use server";

import { connectToDB } from "@/lib/db";
import {
  AllPendingRequests,
  RequestToApprove,
} from "@/lib/types/pending-request.type";
import { PendingRequest } from "@/models/pending-request.model";
import { isValidObjectId } from "mongoose";
import { ObjectId } from "mongodb";
import "@/models/course.model";
import "@/models/student.model";
import "@/models/module.model"

export const getAllPendingRequests = async (): Promise<{
  data: AllPendingRequests[];
  success: boolean;
}> => {
  try {
    await connectToDB();
    const pendingRequest = await PendingRequest.find({})
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
      ]);

    const formattedPendingRequest: AllPendingRequests[] = pendingRequest.map(
      (req) => ({
        _id: req._id as string,
        studentName: req.studentId.name as string,
        email: req.studentId.email as string,
        courseName: req.courseId.courseName as string,
        courseId: req.courseId._id as string,
      })
    );
    return {
      success: true,
      data: JSON.parse(JSON.stringify(formattedPendingRequest)),
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      data: [],
    };
  }
};

export const getPendingRequestById = async (
  requestId: string
): Promise<{
  success: boolean;
  message: string;
  data: RequestToApprove | null;
}> => {
  if (!requestId) {
    return { success: false, message: "Invalid Request ID", data: null };
  }
  if (!isValidObjectId(requestId)) {
    return { success: false, message: "Invalid Request ID", data: null };
  }

  try {
    await connectToDB();
    const request = (await PendingRequest.findById(new ObjectId(requestId))
      .select("_id studentId courseId finalPrice modules")
      .populate([
        {
          path: "studentId",
          select: "name email",
        },
        {
          path: "courseId",
          select: "courseName",
        },
        {
          path: "modules",
          select: "name price",
        },
      ])
      .exec()) as RequestToApprove;

    return {
      data: JSON.parse(JSON.stringify(request)),
      message: "Request to approve fetched",
      success: true,
    };
  } catch (error) {
    console.log(error);
    return { data: null, message: "Failed to fetch", success: false };
  }
};
