"use server";

import { connectToDB } from "@/lib/db";
import { Session } from "@/lib/types/sessions.type";
import { Batch } from "@/models/batch.model";
import { Sessions } from "@/models/sessions.model";
import { Notes } from "@/models/notes.model";
import { Student } from "@/models/student.model";
import { Module } from "@/models/module.model";
import { Types } from "mongoose";
import mongoose from "mongoose";

interface StudentCourse {
  courseId: mongoose.Types.ObjectId;
  moduleId: mongoose.Types.ObjectId[];
  isApproved: boolean;
}

interface IStudent {
  _id: string;
  courses?: StudentCourse[];
}

interface IModule {
  _id: mongoose.Types.ObjectId;
  name: string;
}

interface ISession {
  _id: Types.ObjectId;
  studentId: string[];
  meetingName: string;
  meetingLink: string;
  module: string;
  chapters: string[];
  instructor?: string;
  date: string;
  time: string;
  notes: Types.ObjectId[];
  videoLink?: string;
  batchId: Types.ObjectId;
  status: "scheduled" | "rescheduled" | "cancelled";
  isDeleted: boolean;
  deletedAt?: Date;
  originalDate?: string;
  originalTime?: string;
  rescheduledAt?: Date;
  cancelledAt?: Date;
}

interface IBatch {
  _id: mongoose.Types.ObjectId;
  name: string;
  courseId: mongoose.Types.ObjectId;
  modules?: { id: mongoose.Types.ObjectId }[];
  pausedStudents?: mongoose.Types.ObjectId[];
}

export const getStudentSessions = async (
  studentId: string
): Promise<{ data: Session[]; message: string }> => {
  try {
    await connectToDB();

    const student = await Student.findById(studentId)
      .select("courses")
      .lean<IStudent>()
      .exec();

    if (!student) {
      return { data: [], message: "Student not found" };
    }

    const approvedCourses =
      student.courses?.filter((c: StudentCourse) => c.isApproved === true) ||
      [];

    const purchasedModuleIds: string[] = [];
    approvedCourses.forEach((course: StudentCourse) => {
      const moduleIds = (course.moduleId || []).map((id) => id.toString());
      purchasedModuleIds.push(...moduleIds);
    });
    const uniquePurchasedModuleIds = [...new Set(purchasedModuleIds)];

    let purchasedModuleNames: string[] = [];
    if (uniquePurchasedModuleIds.length > 0) {
      const purchasedModules = await Module.find({
        _id: { $in: uniquePurchasedModuleIds },
      })
        .select("name")
        .lean<IModule[]>();
      purchasedModuleNames = purchasedModules.map((mod) => mod.name);
    }

    const batches = await Batch.find({ students: studentId })
      .select("_id name courseId modules.id pausedStudents")
      .lean<IBatch[]>()
      .exec();

    if (batches.length === 0) {
      return { data: [], message: "Student is not enrolled in any batch" };
    }
    const batchIds = batches.map((batch) => batch._id);

    const allOfficialModuleIdsInBatches: mongoose.Types.ObjectId[] = [];
    batches.forEach((batch) => {
      if (batch.modules && Array.isArray(batch.modules)) {
        allOfficialModuleIdsInBatches.push(...batch.modules.map((m) => m.id));
      }
    });

    const allOfficialModules = await Module.find({
      _id: { $in: allOfficialModuleIdsInBatches },
    })
      .select("name")
      .lean<IModule[]>();
    const allOfficialModuleNames = new Set(
      allOfficialModules.map((mod) => mod.name)
    );

    const sessions = await Sessions.find({
      isDeleted: false,
      batchId: { $in: batchIds },
    })
      .sort({ date: -1 })
      .lean<ISession[]>()
      .exec();

    if (!sessions || sessions.length === 0) {
      return { data: [], message: "No sessions available for this student" };
    }

    const sessionIds = sessions.map((session) => session._id);
    const notes = await Notes.find({ session: { $in: sessionIds } })
      .select("session topics")
      .lean();
    const sessionTopicsMap = new Map<string, string[]>();
    notes.forEach((note) => {
      const sessionId = (note.session as Types.ObjectId)?.toString();
      if (sessionId) {
        const existingTopics = sessionTopicsMap.get(sessionId) || [];
        sessionTopicsMap.set(sessionId, [
          ...existingTopics,
          ...(note.topics || []),
        ]);
      }
    });

    const batchInfoMap = new Map<
      string,
      { name: string; courseId: string; isPaused: boolean }
    >();
    batches.forEach((batch) => {
      const isPaused =
        batch.pausedStudents?.some((id) => id.toString() === studentId) ||
        false;

      batchInfoMap.set(batch._id.toString(), {
        name: batch.name,
        courseId: batch.courseId.toString(),
        isPaused: isPaused,
      });
    });

    const sessionsWithTopics = sessions.map((session) => {
      const sessionId = (session._id as Types.ObjectId).toString();
      const batchId = session.batchId.toString();
      const topics = sessionTopicsMap.get(sessionId) || [];
      const batchInfo = batchInfoMap.get(batchId);
      const uniqueTopics = [...new Set(topics)];

      const isOfficialModule = allOfficialModuleNames.has(session.module);
      let hasAccess = false;

      if (batchInfo?.isPaused) {
        hasAccess = false;
      } else {
        if (!isOfficialModule) {
          hasAccess = true;
        } else {
          hasAccess = purchasedModuleNames.includes(session.module);
        }
      }

      return {
        ...session,
        _id: session._id.toString(),
        batchId: session.batchId.toString(),
        batchName: batchInfo?.name || "Unknown Batch",
        courseId: batchInfo?.courseId || null,
        isPurchasedModule: hasAccess,
        accessLevel: hasAccess ? "full" : "preview",
        notes: uniqueTopics.length > 0 ? [{ topics: uniqueTopics }] : [],
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