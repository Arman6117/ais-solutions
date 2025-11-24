// actions/student/sessions/get-sessions-by-module.ts
"use server";

import { connectToDB } from "@/lib/db";
import { Session } from "@/lib/types/sessions.type";
import { Sessions } from "@/models/sessions.model";
import "@/models/notes.model";
type GetSessionsByModuleResponse = {
  success: boolean;
  message: string;
  data: Session[];
};

export async function getSessionsByModule(
  moduleName: string,
  batchId: string
): Promise<GetSessionsByModuleResponse> {
  try {
    await connectToDB();

    if (!moduleName || !batchId) {
      return {
        success: false,
        message: "Module name and batch ID are required",
        data: [],
      };
    }

    // Find ALL sessions for this module in the specific batch
    // Don't filter by studentId - we want to show both attended and missed sessions
    const sessions = await Sessions.find({
      module: moduleName,
      batchId: batchId,
      isDeleted: false,
    })
      .populate({
        path: "notes",
        select: "topics chapter module createdAt",
      })
      .sort({ date: -1, time: -1 })
      .lean();

    // Filter to only show past sessions
    const currentDateTime = new Date();
    const pastSessions = sessions.filter((session: any) => {
      const sessionDateObj = new Date(session.date);

      if (session.time && session.time.includes(":")) {
        const [hours, minutes] = session.time
          .split(":")
          .map((num: string) => parseInt(num, 10));
        sessionDateObj.setHours(hours, minutes, 0, 0);
      } else {
        // If no time specified, assume end of day
        sessionDateObj.setHours(23, 59, 59, 999);
      }

      return sessionDateObj < currentDateTime;
    });

    // Convert MongoDB documents to plain objects with all required fields
    const formattedSessions: Session[] = pastSessions.map((session: any) => ({
      _id: session._id.toString(),
      studentId: session.studentId.map((id: any) => id.toString()),
      courseName: session.courseName || "",
      module: session.module || moduleName,
      chapters: session.chapters || [],
      instructor: session.instructor || undefined,
      meetingName: session.meetingName || "",
      meetingLink: session.meetingLink || "",
      date: new Date(session.date),
      time: session.time || "",
      notes: Array.isArray(session.notes)
        ? session.notes.map((note: any) => ({
            _id: note._id?.toString() || "",
            topics: note.topics || [],
            chapter: note.chapter || "",
            module: note.module || "",
            createdAt: note.createdAt || new Date(),
          }))
        : [],
      videoLink: session.videoLink || "",
      batchId: session.batchId?.toString() || batchId,
      status: session.status || "scheduled",
      isDeleted: session.isDeleted || false,
      deletedAt: session.deletedAt || null,
      originalDate: session.originalDate || undefined,
      originalTime: session.originalTime || undefined,
      rescheduledAt: session.rescheduledAt || null,
      cancelledAt: session.cancelledAt || null,
      createdAt: new Date(session.createdAt),
      updatedAt: new Date(session.updatedAt),
    }));

 
    return {
      success: true,
      message: `Found ${formattedSessions.length} session(s) for ${moduleName}`,
      data: formattedSessions,
    };
  } catch (error) {
    console.error("Error fetching sessions by module:", error);
    return {
      success: false,
      message: "Failed to fetch sessions",
      data: [],
    };
  }
}
