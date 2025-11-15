// actions/admin/notes/delete-note.ts
"use server";

import { connectToDB } from "@/lib/db";
import { Notes } from "@/models/notes.model";
import { Sessions } from "@/models/sessions.model";
import { isValidObjectId } from "mongoose";

export const deleteNote = async (noteId: string) => {
  if (!noteId || !isValidObjectId(noteId)) {
    return { success: false, message: "Invalid note ID" };
  }

  try {
    await connectToDB();

    // Find the note to get its session reference
    const note = await Notes.findById(noteId);
    
    if (!note) {
      return { success: false, message: "Note not found" };
    }

    // Delete the note
    await Notes.findByIdAndDelete(noteId);

    // Remove the note reference from the session
    if (note.session) {
      await Sessions.findByIdAndUpdate(
        note.session,
        { $pull: { notes: noteId } }, // Remove noteId from notes array
        { new: true }
      );
    }

    return { success: true, message: "Note deleted successfully" };
  } catch (error) {
    console.error("Error deleting note:", error);
    return { success: false, message: "Failed to delete note" };
  }
};

// Bulk delete notes
export const bulkDeleteNotes = async (noteIds: string[]) => {
  if (!noteIds || noteIds.length === 0) {
    return { success: false, message: "No note IDs provided" };
  }

  try {
    await connectToDB();

    // Validate all IDs
    const validIds = noteIds.filter(id => isValidObjectId(id));
    if (validIds.length === 0) {
      return { success: false, message: "No valid note IDs" };
    }

    // Get all notes to find their session references
    const notes = await Notes.find({ _id: { $in: validIds } });
    
    // Delete all notes
    await Notes.deleteMany({ _id: { $in: validIds } });

    // Remove note references from sessions
    const sessionIds = notes
      .map(note => note.session)
      .filter(Boolean);

    if (sessionIds.length > 0) {
      await Sessions.updateMany(
        { _id: { $in: sessionIds } },
        { $pull: { notes: { $in: validIds } } }
      );
    }

    return { 
      success: true, 
      message: `${validIds.length} note(s) deleted successfully` 
    };
  } catch (error) {
    console.error("Error bulk deleting notes:", error);
    return { success: false, message: "Failed to delete notes" };
  }
};
