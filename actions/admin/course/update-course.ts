"use server";

import { connectToDB } from "@/lib/db";
import { Course } from "@/models/course.model";
import { isValidObjectId } from "mongoose";
import { ObjectId } from "mongodb";

type UpdateCoursePayload = {
  courseId: string;
  courseName?: string;
  courseDescription?: string;
  courseThumbnail?: string;
  coursePrice?: number;
  courseDiscount?: number;
  courseOfferPrice?: number;
  courseStartDate?: string | Date;
  courseEndDate?: string | Date;
  courseMode?: "online" | "offline" | "hybrid";
  syllabusLink?: string;
  modules?: string[];
};

export const updateCourse = async (data: UpdateCoursePayload) => {
  try {
    await connectToDB();

    const { courseId, ...rest } = data;

    if (!isValidObjectId(courseId)) {
      return { success: false, message: "Provide valid course id" };
    }

    const course = await Course.findById(new ObjectId(courseId));
    if (!course) {
      return { success: false, message: "Course not found" };
    }

    // filter out undefined fields
    const updateData = Object.fromEntries(
      Object.entries(rest).filter(([_, v]) => v !== undefined)
    );

    // handle date conversion if present
    if (updateData.courseStartDate) {
      updateData.courseStartDate = new Date(updateData.courseStartDate as any);
    }
    if (updateData.courseEndDate) {
      updateData.courseEndDate = new Date(updateData.courseEndDate as any);
    }

    Object.assign(course, updateData);

    await course.save();

    return { success: true, message: "Course updated successfully" };
  } catch (error) {
    console.error("updateCourse error:", error);
    return { success: false, message: "Something went wrong" };
  }
};
