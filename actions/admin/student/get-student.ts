"use server";

import { connectToDB } from "@/lib/db";
import { StudentTable } from "@/lib/types/student";
import { Student } from "@/models/student.model";

export const getStudentTable = async () => {
  try {
    await connectToDB();
    const student = (await Student.find({})
      .select("_id createdAt name email phone batches feeStatus gender")
      .sort({ createdAt: -1 })
      .populate({ path: "batches", select: "name" })) as StudentTable[];

      return {
        success: true,
        data:student
      }
  } catch (error) {
    console.error("Error fetching student table:", error);
    return {
      success:false,
      data:[]
    }
  }
};
