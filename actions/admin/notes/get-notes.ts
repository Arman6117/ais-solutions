"use server";

import { connectToDB } from "@/lib/db";
import { NoteTableType } from "@/lib/types/note.type";
import { Notes } from "@/models/notes.model";
import { isValidObjectId } from "mongoose";
import { ObjectId } from "mongodb";
import "@/models/sessions.model";
import "@/models/batch.model";
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
