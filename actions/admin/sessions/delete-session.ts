"use server";

import { connectToDB } from "@/lib/db";
import { isValidObjectId } from "mongoose";
import { ObjectId } from "mongodb";
import { Sessions } from "@/models/sessions.model";

export const deleteSession = async (sessionId: string) => {
  if (!sessionId) {
    return { success: false, message: "Session ID is required" };
  }
  if (!isValidObjectId(sessionId)) {
    return { success: false, message: "Invalid session ID" };
  }
  try {
    await connectToDB();
    await Sessions.findByIdAndDelete(new ObjectId(sessionId));
    return { success: true, message: "Session deleted successfully" };
  } catch (error) {
    console.error("Error deleting session:", error);
    return { success: false, message: "Failed to delete session" };
  }
};
