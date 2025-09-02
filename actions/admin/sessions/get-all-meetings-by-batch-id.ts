"use server";

import { connectToDB } from "@/lib/db";
import { BatchMeetings } from "@/lib/types/sessions.type";
import { Sessions } from "@/models/sessions.model";
import { isValidObjectId } from "mongoose";
import { ObjectId } from "mongodb";
export const getAllMeetingsByBatchId = async (
  batchId: string
): Promise<{ data: BatchMeetings[]; success: boolean; message: string }> => {
  if (!batchId) {
    return { data: [], success: false, message: "NO Batch ID is provided" };
  }
  if (!isValidObjectId(batchId)) {
    return { data: [], success: false, message: "Invalid batch id" };
  }
  try {
    await connectToDB();
    const meetings = (await Sessions.find({ batchId: new ObjectId(batchId) })
      .select("_id meetingName module time date chapters")
      .exec()) as BatchMeetings[];
    return {
      data: JSON.parse(JSON.stringify(meetings)),
      message: "Fetched Meetings",
      success: true,
    };
  } catch (error) {
    console.log(error);
    return { data: [], success: false, message: "Something went wrong" };
  }
};
