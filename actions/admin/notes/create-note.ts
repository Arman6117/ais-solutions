// actions/admin/notes/create-note.ts
"use server";
import { connectToDB } from "@/lib/db";
import { NoteTableType } from "@/lib/types/note.type";
import { Batch } from "@/models/batch.model";
import { Notes } from "@/models/notes.model";
import { isValidObjectId } from "mongoose";
import { ObjectId } from "mongodb";
import { Sessions } from "@/models/sessions.model";

export const createNote = async (batchId: string, notesData: NoteTableType) => {
  if (!batchId) {
    return { success: false, message: "Batch ID is required" };
  }
  if (!isValidObjectId(batchId)) {
    return { success: false, message: "Invalid Batch ID" };
  }
  try {
    await connectToDB();
    const newNoteDoc = {
      module: notesData.module,
      chapter: notesData.chapter,
      topics: notesData.topics || [], // NEW: Include topics
      session: notesData.session?._id,
      videoLinks: notesData.videoLinks || [],
      files: notesData.files || [],
      batchId: batchId,
    };
    const createdNote = await Notes.create(newNoteDoc);
    await Batch.findByIdAndUpdate(new ObjectId(batchId), {
      $addToSet: { notes: createdNote },
    });
    if (notesData.session?._id) {
      await Sessions.findByIdAndUpdate(new ObjectId(notesData.session._id), {
        $addToSet: { notes: createdNote },
      });
    }
    return { success: true, message: "Note created successfully" };
  } catch (error) {
    console.log("Error creating note:", error);
    return { success: false, message: "Failed to create note" };
  }
};
