"use server";

import { connectToDB } from "@/lib/db";
import { Session } from "@/lib/types/sessions.type";
import { Batch } from "@/models/batch.model";
import { Sessions } from "@/models/sessions.model";
import { Notes } from "@/models/notes.model";
import { Types } from "mongoose";

export const getStudentSessions = async (
  studentId: string
): Promise<{ data: Session[]; message: string }> => {
  try {
    await connectToDB();

    const batches = await Batch.find({ students: studentId })
      .select("_id")
      .exec();
    const batchIds = batches.map((batch) => batch._id);

    if (batchIds.length === 0) {
      return { data: [], message: "Student is not enrolled in any batch" };
    }

    const sessions = await Sessions.find({
      isDeleted: false,
      batchId: { $in: batchIds },
    })
      .sort({ date: -1 })
      .lean()
      .exec();

    if (!sessions || sessions.length === 0) {
      return { data: [], message: "No sessions available for this student" };
    }

    const sessionIds = sessions.map((session) => session._id);

    const notes = await Notes.find({
      session: { $in: sessionIds },
    })
      .select("session topics")
      .lean()
      .exec();

    // Create Map with STRING keys
    const sessionTopicsMap = new Map<string, string[]>();
    
    notes.forEach((note) => {
      // Cast to ObjectId then toString
      const sessionId = (note.session as Types.ObjectId)?.toString();
      
      if (sessionId) {
        const existingTopics = sessionTopicsMap.get(sessionId) || [];
        sessionTopicsMap.set(sessionId, [
          ...existingTopics,
          ...(note.topics || []),
        ]);
      }
    });

    // Attach topics to sessions
    const sessionsWithTopics = sessions.map((session) => {
      // Cast to ObjectId then toString
      const sessionId = (session._id as Types.ObjectId).toString();
      const topics = sessionTopicsMap.get(sessionId) || [];
      
      const uniqueTopics = [...new Set(topics)];
      
      return {
        ...session,
        notes: uniqueTopics.length > 0 
          ? [{ topics: uniqueTopics }] 
          : [],
      };
    });

    return {
      data: JSON.parse(JSON.stringify(sessionsWithTopics)),
      message: "Fetched successfully",
    };
  } catch (error) {
    console.error("Error fetching student sessions:", error);
    return { data: [], message: "Failed to get student sessions" };
  }
};
