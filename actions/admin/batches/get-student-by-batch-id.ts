"use server";

import { connectToDB } from "@/lib/db";
// import { Student } from "@/models/student";
import { Batch } from "@/models/batch.model";

export async function getStudentsByBatch(batchId: string) {
  try {
    await connectToDB();

    // Explicitly type or cast the result. 
    // We know populate('students') will replace the array of IDs with student objects.
    const batch = await Batch.findById(batchId).populate("students").lean() as any;
    
    if (!batch) {
      return { success: false, message: "Batch not found", data: [] };
    }

    // Safety check: ensure students exists and is an array
    const studentList = Array.isArray(batch.students) ? batch.students : [];

    // Transform data to match table structure
    const students = studentList.map((student: any) => ({
      id: student._id.toString(),
      name: student.name || "Unknown",
      email: student.email || "N/A",
      phone: student.phone || "N/A",
      joinedAt: student.createdAt ? new Date(student.createdAt).toLocaleDateString() : "N/A",
      feesStatus: student.feeStatus || "Unknown", 
    }));

    return { success: true, data: students };
  } catch (error) {
    console.error("Error fetching students:", error);
    return { success: false, message: "Failed to fetch students", data: [] };
  }
}
