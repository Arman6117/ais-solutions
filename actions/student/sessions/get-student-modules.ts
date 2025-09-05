"use server";

import { connectToDB } from "@/lib/db";
import { Student } from "@/models/student.model";
import { ObjectId } from "mongodb";
import "@/models/module.model"
export const getStudentModules = async (
  studentId: string
): Promise<{ data: string[]; message: string }> => {
  if (!studentId) {
    return { data: [], message: "StudentId is required" };
  }
  try {
    await connectToDB();
    const modules = (await Student.findById(new ObjectId(studentId))
      .select("courses.moduleId")
      .populate({ path: "courses.moduleId", select: "name" })
      .exec()) as string[];
      console.log(JSON.parse(JSON.stringify(modules)))
    return {
      data: JSON.parse(JSON.stringify(modules)),
      message: "Modules fetched",
    };
  } catch (error) {
    console.log(error)
    return {
        data: [],
        message:"Something went wrong",
      };
  }
};
