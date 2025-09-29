"use server";

import { connectToDB } from "@/lib/db";
import { Session } from "@/lib/types/sessions.type";
import { Batch } from "@/models/batch.model";
import { Sessions } from "@/models/sessions.model";

export const getStudentSessions = async (
  studentId: string
): Promise<{ data: Session[]; message: string }> => {
  try {
    await connectToDB();

    // Step 1: Find batches where the student is enrolled
    const batches = await Batch.find({ students: studentId }).select("_id").exec();
    const batchIds = batches.map((batch) => batch._id);

    if (batchIds.length === 0) {
      return { data: [], message: "Student is not enrolled in any batch" };
    }

    // Step 2: Fetch sessions for those batches
    const sessions = (await Sessions.find({ batchId: { $in: batchIds } })
      .sort({ date: -1 })
      .exec()) as Session[];

    if (!sessions || sessions.length === 0) {
      return { data: [], message: "No sessions available for this student" };
    }

    return { data: JSON.parse(JSON.stringify(sessions)), message: "Fetched successfully" };
  } catch (error) {
    console.log("Error fetching student sessions:", error);
    return { data: [], message: "Failed to get student sessions" };
  }
};
