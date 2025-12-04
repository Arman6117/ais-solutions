"use server";

import { connectToDB } from "@/lib/db";
import { isValidObjectId } from "mongoose";
import { Sessions } from "@/models/sessions.model";

export const deleteSession = async (sessionId: string) => {
  if (!sessionId) {
    return { success: false, message: "Session ID is required" };
  }
  
  if (!isValidObjectId(sessionId)) {
    return { success: false, message: "Invalid session ID" };
  }
  
  try {
    await connectToDB();
    
    const session = await Sessions.findById(sessionId);
    
    if (!session) {
      return { success: false, message: "Session not found" };
    }
    
    // Soft delete - mark as cancelled
    session.isDeleted = true;
    session.deletedAt = new Date();
    session.status = "cancelled";
    session.cancelledAt = new Date();
    
    await session.save();

    
    return { success: true, message: "Session cancelled successfully" };
    
  } catch (error) {
    console.error("Error cancelling session:", error);
    return { success: false, message: "Failed to cancel session" };
  }
};

// Optional: Create a separate function for permanent deletion (admin only)
export const permanentlyDeleteSession = async (sessionId: string) => {
  if (!sessionId) {
    return { success: false, message: "Session ID is required" };
  }
  
  if (!isValidObjectId(sessionId)) {
    return { success: false, message: "Invalid session ID" };
  }
  
  try {
    await connectToDB();
    
    await Sessions.findByIdAndDelete(sessionId);
    
    return { success: true, message: "Session permanently deleted" };
    
  } catch (error) {
    console.error("Error permanently deleting session:", error);
    return { success: false, message: "Failed to permanently delete session" };
  }
};


