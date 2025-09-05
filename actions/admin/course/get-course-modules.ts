"use server";
import { connectToDB } from "@/lib/db";
import { Course } from "@/models/course.model"; // You'll need to have a Course model
import { Module } from "@/models/module.model";
import { isValidObjectId } from "mongoose";
import { ObjectId } from "mongodb";
import { CourseModule } from "@/lib/types/course.type";
import "@/models/module.model";

export const getCourseModules = async (
  courseId: string
): Promise<{ data: CourseModule[]; success: boolean; message: string }> => {
  if (!courseId) {
    return { data: [], success: false, message: "Course ID is missing." };
  }
  if (!isValidObjectId(courseId)) {
    return { data: [], success: false, message: "Invalid Course ID." };
  }

  try {
    await connectToDB();
    const modules = (await Module.find({
      courseId: new ObjectId(courseId),
    }).exec()) as CourseModule[];
    return {
      data: JSON.parse(JSON.stringify(modules)),
      success: true,
      message: modules.length
        ? "Modules fetched successfully."
        : "No modules found for this course.",
    };
  } catch (error) {
    console.error("Error fetching course modules:", error);
    return { data: [], success: false, message: "Failed to fetch modules." };
  }
};
