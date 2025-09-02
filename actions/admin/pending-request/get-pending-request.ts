"use server";

import { connectToDB } from "@/lib/db";
import { AllPendingRequests } from "@/lib/types/pending-request";
import { PendingRequest } from "@/models/pending-request.model";
import "@/models/student.model";
import "@/models/course.model";

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
