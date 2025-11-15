// actions/admin/notes/create-note.ts
"use server";

import { connectToDB } from "@/lib/db";
import { NoteTableType } from "@/lib/types/note.type";
import { Batch } from "@/models/batch.model";
import { Notes } from "@/models/notes.model";
import { isValidObjectId } from "mongoose";
import { ObjectId } from "mongodb";
import { Sessions } from "@/models/sessions.model";

export const createNote = async (
  batchId: string,
  notesData: NoteTableType
): Promise<{
  success: boolean;
  message: string;
  data: NoteTableType | null;
}> => {
  if (!batchId) {
    return { success: false, message: "Batch ID is required", data: null };
  }

  if (!isValidObjectId(batchId)) {
    return { success: false, message: "Invalid Batch ID", data: null };
  }

  try {
    await connectToDB();

    const newNoteDoc = {
      module: notesData.module,
      chapter: notesData.chapter,
      topics: notesData.topics || [],
      session: notesData.session?._id || null,
      videoLinks: notesData.videoLinks || [],
      files: notesData.files || [],
      batchId: batchId,
    };

    const createdNote = await Notes.create(newNoteDoc);

    // Add note reference to batch
    await Batch.findByIdAndUpdate(
      new ObjectId(batchId),
      { $addToSet: { notes: createdNote._id } }
    );

    // Add note reference to session if exists
    if (notesData.session?._id && isValidObjectId(notesData.session._id)) {
      await Sessions.findByIdAndUpdate(
        new ObjectId(notesData.session._id),
        { $addToSet: { notes: createdNote._id } }
      );
    }

    // Return the created note with all fields
    return {
      success: true,
      message: "Note created successfully",
      data: JSON.parse(JSON.stringify(createdNote)), // Convert to plain object
    };
  } catch (error) {
    console.error("Error creating note:", error);
    return {
      success: false,
      message: "Failed to create note",
      data: null,
    };
  }
};
