"use server";
import { connectToDB } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { Sessions } from "@/models/sessions.model";
import { UpdateSessionPayload } from "@/lib/types/sessions.type";

export const updateSession = async (
  sessionId: string,
  data: UpdateSessionPayload
) => {
  try {
    await connectToDB();

    const session = await Sessions.findById(sessionId);
    if (!session) {
      return { success: false, message: "Session not found" };
    }

    // Check if date or time is changing
    const isRescheduled =
      (data.date && data.date !== session.date) ||
      (data.time && data.time !== session.time);

    // Store original values on first reschedule
    if (isRescheduled && !session.originalDate) {
      session.originalDate = session.date;
      session.originalTime = session.time;
    }

    Object.keys(data).forEach((key) => {
      const typedKey = key as keyof UpdateSessionPayload;
      if (data[typedKey] !== undefined) {
        session[typedKey] = data[typedKey];
      }
    });

    if (isRescheduled) {
      session.status = "rescheduled";
      session.rescheduledAt = new Date();

      // TODO: Notify students about reschedule
    }

    await session.save();

    revalidatePath("/admin/all-batches/[courseId]/[batchId]/batch-details");
    revalidatePath("/student/dashboard");

    return {
      success: true,
      message: isRescheduled
        ? "Session rescheduled successfully"
        : "Session updated successfully",
    };
  } catch (error) {
    console.error("Error updating session:", error);
    return { success: false, message: "Error updating session" };
  }
};

export const deleteSession = async (sessionId: string) => {
  try {
    await connectToDB();

    const session = await Sessions.findById(sessionId);
    if (!session) {
      return { success: false, message: "Session not found" };
    }

    // Soft delete
    session.isDeleted = true;
    session.deletedAt = new Date();
    session.status = "cancelled";
    session.cancelledAt = new Date();

    await session.save();

    // TODO: Notify students about cancellation

    revalidatePath("/admin/sessions");
    revalidatePath("/student/dashboard");

    return { success: true, message: "Session cancelled successfully" };
  } catch (error) {
    console.error("Error cancelling session:", error);
    return { success: false, message: "Error cancelling session" };
  }
};
