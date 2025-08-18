"use server";

import { connectToDB } from "@/lib/db";
import { Sessions } from "@/models/sessions.model";
import { isValidObjectId } from "mongoose";
import { ObjectId } from "mongodb";
export const markSessionAsWatched = async (
  sessionId: string,
  studentId: string
) => {
  if (!sessionId || !studentId) {
    return { success: false, message: "Session id or student id is missing " };
  }
  if (!isValidObjectId(sessionId)) {
    return { success: false, message: "Invalid session id" };
  }
  try {
    await connectToDB();
    const session = await Sessions.findByIdAndUpdate(
      new ObjectId(sessionId),
      { $push: { studentId: studentId } },
      { new: true }
    ).exec();
    if (!session) {
      return { success: false, message: "No session found" };
    }
    return { success: true, message: "Session marked as watched" };
  } catch (error) {
    console.log(error);
    return { success: false, message: "Something went wrong" };
  }
};
