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
    return { data: [], success: false, message: "No Batch ID is provided" };
  }
  
  if (!isValidObjectId(batchId)) {
    return { data: [], success: false, message: "Invalid batch ID" };
  }
  
  try {
    await connectToDB();
    
    const meetings = (await Sessions.find({ 
      batchId: new ObjectId(batchId),
     
    })
      .select(
        "_id meetingName meetingLink module time date chapters " +
        "status isDeleted originalDate originalTime " +
        "rescheduledAt cancelledAt instructor deletedAt"
      )
      .sort({ date: 1, time: 1 }) 
      .exec()) as BatchMeetings[];
    
    return {
      data: JSON.parse(JSON.stringify(meetings)),
      message: "Fetched meetings successfully",
      success: true,
    };
  } catch (error) {
    console.error("Error fetching meetings:", error);
    return { 
      data: [], 
      success: false, 
      message: "Failed to fetch meetings" 
    };
  }
};

// Optional: Function to get ALL meetings including cancelled ones
export const getAllMeetingsIncludingCancelled = async (
  batchId: string
): Promise<{ data: BatchMeetings[]; success: boolean; message: string }> => {
  if (!batchId) {
    return { data: [], success: false, message: "No Batch ID is provided" };
  }
  
  if (!isValidObjectId(batchId)) {
    return { data: [], success: false, message: "Invalid batch ID" };
  }
  
  try {
    await connectToDB();
    
    const meetings = (await Sessions.find({ 
      batchId: new ObjectId(batchId)
    })
      .select(
        "_id meetingName meetingLink module time date chapters " +
        "status isDeleted originalDate originalTime " +
        "rescheduledAt cancelledAt deletedAt meetingLink instructor"
      )
      .sort({ date: 1, time: 1 })
      .exec()) as BatchMeetings[];
    
    return {
      data: JSON.parse(JSON.stringify(meetings)),
      message: "Fetched all meetings successfully",
      success: true,
    };
  } catch (error) {
    console.error("Error fetching meetings:", error);
    return { 
      data: [], 
      success: false, 
      message: "Failed to fetch meetings" 
    };
  }
};
