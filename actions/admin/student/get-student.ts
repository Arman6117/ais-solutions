"use server";

import { connectToDB } from "@/lib/db";
import { StudentTable } from "@/lib/types/student";
import { Student } from "@/models/student.model";
import "@/models/batch.model"; // Ensure batch model is registered for populate

export const getStudentTable = async (): Promise<{
  success: boolean;
  data: StudentTable[];
}> => {
  try {
    await connectToDB();

    // The query uses dot notation to look inside the 'courses' array
    const students = (await Student.find({
      "courses.isApproved": true,
    })
      .select("_id createdAt name email phone batches feeStatus gender")
      .sort({ createdAt: -1 })
      .populate({ path: "batches.batchId", select: "name" })
      .exec()) as StudentTable[];

    return {
      success: true,
      data: JSON.parse(JSON.stringify(students)),
    };
  } catch (error) {
    console.error("Error fetching students with approved courses:", error);
    return {
      success: false,
      data: [],
    };
  }
};
