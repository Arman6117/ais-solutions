// actions/admin/notes/update-note.ts
"use server";

import { connectToDB } from "@/lib/db";
import { Notes } from "@/models/notes.model";
import { Sessions } from "@/models/sessions.model";
import { isValidObjectId } from "mongoose";
import { NoteTableType } from "@/lib/types/note.type";

export const updateNoteAction = async (noteId: string, updatedData: Partial<NoteTableType>) => {
  if (!noteId || !isValidObjectId(noteId)) {
    return { success: false, message: "Invalid note ID" };
  }

  try {
    await connectToDB();

    const note = await Notes.findById(noteId);
    
    if (!note) {
      return { success: false, message: "Note not found" };
    }

    // Update the note
    const updatedNote = await Notes.findByIdAndUpdate(
      noteId,
      {
        $set: {
          module: updatedData.module || note.module,
          chapter: updatedData.chapter || note.chapter,
          topics: updatedData.topics || note.topics,
          videoLinks: updatedData.videoLinks || note.videoLinks,
          files: updatedData.files || note.files,
        }
      },
      { new: true, runValidators: true }
    );

    // If session reference changed, update both old and new sessions
    if (updatedData.session && updatedData.session !== note.session?.toString()) {
      // Remove from old session
      if (note.session) {
        await Sessions.findByIdAndUpdate(
          note.session,
          { $pull: { notes: noteId } }
        );
      }

      // Add to new session
      if (isValidObjectId(updatedData.session)) {
        await Sessions.findByIdAndUpdate(
          updatedData.session,
          { $addToSet: { notes: noteId } }
        );
        
        // Update the note's session reference
        updatedNote!.session = updatedData.session as any;
        await updatedNote!.save();
      }
    }

    return { 
      success: true, 
      message: "Note updated successfully",
      data: JSON.parse(JSON.stringify(updatedNote))
    };
  } catch (error) {
    console.error("Error updating note:", error);
    return { success: false, message: "Failed to update note" };
  }
};
