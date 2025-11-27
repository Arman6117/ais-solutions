// actions/admin/notes/update-note.ts
"use server";

import { connectToDB } from "@/lib/db";
import { Notes } from "@/models/notes.model";
import { Batch } from "@/models/batch.model";
import { Sessions } from "@/models/sessions.model";
import { isValidObjectId } from "mongoose";
import { NoteTableType } from "@/lib/types/note.type";

// Helper to duplicate a note to another batch
const duplicateNoteToBatch = async (
  sourceNoteData: any,
  targetBatchId: string
) => {
  // We DO NOT copy the session ID because sessions are batch-specific.
  // Linking a Batch A session to a Batch B note is invalid.
  const newNoteData = {
    module: sourceNoteData.module,
    chapter: sourceNoteData.chapter,
    topics: sourceNoteData.topics,
    videoLinks: sourceNoteData.videoLinks,
    files: sourceNoteData.files,
    batchId: targetBatchId,
    session: null, // Reset session for the copy
  };

  const newNote = await Notes.create(newNoteData);

  await Batch.findByIdAndUpdate(targetBatchId, {
    $addToSet: { notes: newNote._id },
  });

  return newNote;
};

export const updateNoteAction = async (
  noteId: string,
  updatedData: Partial<NoteTableType>,
  additionalBatchIds: string[] = [] // NEW PARAMETER
) => {
  if (!noteId || !isValidObjectId(noteId)) {
    return { success: false, message: "Invalid note ID" };
  }

  try {
    await connectToDB();

    const note = await Notes.findById(noteId);

    if (!note) {
      return { success: false, message: "Note not found" };
    }

    // 1. Update the current note
    const updatedNote = await Notes.findByIdAndUpdate(
      noteId,
      {
        $set: {
          module: updatedData.module || note.module,
          chapter: updatedData.chapter || note.chapter,
          topics: updatedData.topics || note.topics,
          videoLinks: updatedData.videoLinks || note.videoLinks,
          files: updatedData.files || note.files,
        },
      },
      { new: true, runValidators: true }
    );

    // Handle Session Updates (Only for the primary note)
    // If session reference changed, update both old and new sessions
    if (
      updatedData.session &&
      updatedData.session?._id !== note.session?.toString()
    ) {
      // Remove from old session
      if (note.session) {
        await Sessions.findByIdAndUpdate(note.session, {
          $pull: { notes: noteId },
        });
      }

      // Add to new session
      const newSessionId = updatedData.session._id || updatedData.session;
      if (isValidObjectId(newSessionId)) {
        await Sessions.findByIdAndUpdate(newSessionId, {
          $addToSet: { notes: noteId },
        });

        updatedNote!.session = newSessionId;
        await updatedNote!.save();
      }
    }

    // 2. Handle Copying to Additional Batches
    let copyMessage = "";
    if (additionalBatchIds && additionalBatchIds.length > 0) {
      const validBatchIds = additionalBatchIds.filter((id) =>
        isValidObjectId(id)
      );

      if (validBatchIds.length > 0) {
        await Promise.all(
          validBatchIds.map((batchId) =>
            duplicateNoteToBatch(updatedNote, batchId)
          )
        );
        copyMessage = ` and copied to ${validBatchIds.length} batches`;
      }
    }

    return {
      success: true,
      message: `Note updated successfully${copyMessage}`,
      data: JSON.parse(JSON.stringify(updatedNote)),
    };
  } catch (error) {
    console.error("Error updating note:", error);
    return { success: false, message: "Failed to update note" };
  }
};
