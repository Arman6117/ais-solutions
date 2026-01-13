"use server";

import { connectToDB } from "@/lib/db";
import { Batch } from "@/models/batch.model";
// import { revalidatePath } from "next/cache";

export async function toggleStudentBatchAccess(
  studentId: string,
  batchId: string,
  action: "pause" | "resume"
) {
  try {
    await connectToDB();

    const updateQuery =
      action === "pause"
        ? { $addToSet: { pausedStudents: studentId } }
        : { $pull: { pausedStudents: studentId } };

    await Batch.findByIdAndUpdate(batchId, updateQuery);

    // revalidatePath(`/admin/batches/${batchId}`);

    return {
      success: true,
      message: `Student access ${action}d successfully`,
    };
  } catch (error) {
    console.error("Error toggling access:", error);
    return { success: false, message: "Failed to update access status" };
  }
}