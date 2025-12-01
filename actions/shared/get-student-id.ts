'use server'

import { connectToDB } from "@/lib/db"
import { Student } from "@/models/student.model";
import { Types } from "mongoose";

export const getStudentId: (email: string) => Promise<string | null> = async (email: string): Promise<string | null> => {
  try {
    await connectToDB();

    const student = await Student.findOne({ email })
      .select("_id")
      .lean<{ _id: string }>()   // 👈 tell TS exactly what comes back
      .exec();

    if (!student) {
      return null;
    }


    return student._id.toString(); // ✅ safe now
  } catch (error) {
    console.error("Error fetching student ID:", error);
    return null;
  }
};
