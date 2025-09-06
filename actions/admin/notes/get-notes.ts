"use server";

import { connectToDB } from "@/lib/db";
import { NoteTableType } from "@/lib/types/note.type";
import { Notes } from "@/models/notes.model";
import { isValidObjectId } from "mongoose";
import { ObjectId } from "mongodb";
import "@/models/sessions.model";
import "@/models/batch.model";
import { NoteData } from "@/lib/types/types";
export const getNotesTable = async (
  batchId: string
): Promise<{ data: NoteTableType[]; message: string; success: boolean }> => {
  if (!batchId) {
    return { data: [], success: false, message: "Batch ID is required" };
  }
  if (!isValidObjectId(batchId)) {
    return { data: [], success: false, message: "Invalid Batch ID" };
  }
  try {
    await connectToDB();
    const notes = (await Notes.find({ batchId: new ObjectId(batchId) })
      .populate({ path: "session", select: "meetingName date" })
      .exec()) as NoteTableType[];
    return {
      data: JSON.parse(JSON.stringify(notes)),
      success: true,
      message: "Notes fetched successfully",
    };
  } catch (error) {
    console.log("Error fetching notes:", error);
    return { data: [], success: false, message: "Failed to fetch notes" };
  }
};

export const getNotesById = async (
  
  sessionId: string
): Promise<{ data: NoteData[]; success: boolean; message: string }> => {
  if (!sessionId) {
    return {
      data: [],
      success: false,
      message: "Note id or Session Id is missing",
    };
  }
  if ( !isValidObjectId(sessionId)) {
    return {
      data: [],
      success: false,
      message: "Invalid Note id or Session Id is missing",
    };
  }

  try {
    await connectToDB();
    const notes = (await Notes.find({
      session: new ObjectId(sessionId),
    })
      .populate({
        path: "session", // The field to populate in the Notes schema
        select: "meetingName", // The field to select from the referenced Session model
      })
      .exec()) as NoteData[];
      console.log(JSON.parse(JSON.stringify(notes)))
      return {data:JSON.parse(JSON.stringify(notes)),success:true, message:"Note fetched"}
    } catch (error) {
      console.log(error)
   return{data:[], success:false,message:"Something went wrong"}
    }
};
