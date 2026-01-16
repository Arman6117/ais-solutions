"use server";

import { connectToDB } from "@/lib/db";
import { Batch } from "@/models/batch.model";

export async function getStudentsByBatch(batchId: string) {
  try {
    await connectToDB();

    const batch = await Batch.findById(batchId).populate("students").lean() as any;
    
    if (!batch) {
      return { success: false, message: "Batch not found", data: [] };
    }

    const studentList = Array.isArray(batch.students) ? batch.students : [];
    
    const pausedList = Array.isArray(batch.pausedStudents) ? batch.pausedStudents : [];

    const students = studentList.map((student: any) => {
      const isPaused = pausedList.some(
        (pausedId: any) => pausedId.toString() === student._id.toString()
      );

      return {
        id: student._id.toString(),
        name: student.name || "Unknown",
        email: student.email || "N/A",
        phone: student.phone || "N/A",
        joinedAt: student.createdAt ? new Date(student.createdAt).toLocaleDateString() : "N/A",
        feesStatus: student.feeStatus || "Unknown",
        isPaused: isPaused, // <--- Now accessible in the frontend
      };
    });

    return { success: true, data: students };
  } catch (error) {
    console.error("Error fetching students:", error);
    return { success: false, message: "Failed to fetch students", data: [] };
  }
}