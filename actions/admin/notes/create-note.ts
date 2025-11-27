// actions/admin/notes/create-note.ts
"use server";

import { connectToDB } from "@/lib/db";
import { NoteTableType } from "@/lib/types/note.type";
import { Batch } from "@/models/batch.model";
import { Notes } from "@/models/notes.model";
import { isValidObjectId } from "mongoose";
import { ObjectId } from "mongodb";
import { Sessions } from "@/models/sessions.model";

// Helper to create a single note and update refs
const createSingleNote = async (
  targetBatchId: string,
  notesData: NoteTableType,
  isPrimary: boolean // True if this is the original batch being edited
) => {
  const newNoteDoc = {
    module: notesData.module,
    chapter: notesData.chapter,
    topics: notesData.topics || [],
    // Only link session if it's the primary batch.
    // Sessions are unique to batches, so we can't link a Batch A session to a Batch B note.
    session: isPrimary ? notesData.session?._id || null : null,
    videoLinks: notesData.videoLinks || [],
    files: notesData.files || [],
    batchId: targetBatchId,
  };

  const createdNote = await Notes.create(newNoteDoc);

  // Add note reference to batch
  await Batch.findByIdAndUpdate(new ObjectId(targetBatchId), {
    $addToSet: { notes: createdNote._id },
  });

  // Add note reference to session if exists AND it's the primary batch
  if (
    isPrimary &&
    notesData.session?._id &&
    isValidObjectId(notesData.session._id)
  ) {
    await Sessions.findByIdAndUpdate(new ObjectId(notesData.session._id), {
      $addToSet: { notes: createdNote._id },
    });
  }

  return createdNote;
};

export const createNote = async (
  batchId: string,
  notesData: NoteTableType,
  additionalBatchIds: string[] = []
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

    // 1. Create the primary note
    const primaryNote = await createSingleNote(batchId, notesData, true);

    // 2. Create copies for additional batches
    if (additionalBatchIds.length > 0) {
      const validAdditionalIds = additionalBatchIds.filter((id) =>
        isValidObjectId(id)
      );

      if (validAdditionalIds.length > 0) {
        await Promise.all(
          validAdditionalIds.map((extraBatchId) =>
            createSingleNote(extraBatchId, notesData, false)
          )
        );
      }
    }

    const successMessage =
      additionalBatchIds.length > 0
        ? `Note created for this batch and ${additionalBatchIds.length} other(s)`
        : "Note created successfully";

    // Return the primary note
    return {
      success: true,
      message: successMessage,
      data: JSON.parse(JSON.stringify(primaryNote)),
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
