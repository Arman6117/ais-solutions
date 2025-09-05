"use server";

import { connectToDB } from "@/lib/db";
import { Modules } from "@/lib/types/types";
import { Course } from "@/models/course.model";
import { Module } from "@/models/module.model";
import { isValidObjectId } from "mongoose";

export const getCourseModulesByCourse = async (
  courseId: string
): Promise<{
  success: boolean;
  message: string;
  data: Modules[];
}> => {
  try {
    await connectToDB();

    if (!courseId || !isValidObjectId(courseId)) {
      return {
        data: [],
        success: false,
        message: "Invalid course ID provided",
      };
    }

    const course = await Course.findById(courseId);

    if (!course) {
      return {
        data: [],
        success: false,
        message: "Course not found",
      };
    }

    const modules = (await Module.find(
      { _id: { $in: course.modules } },
      { _id: 1, name: 1 }
    ).exec()) as Modules[];

    return {
      success: true,
      message: "Modules fetched successfully",
      data: JSON.parse(JSON.stringify(modules)),
    };
  } catch (error) {
    console.error("[getCourseModules]", error);
    return {
      data: [],
      success: false,
      message: "Failed to fetch course modules",
    };
  }
};
