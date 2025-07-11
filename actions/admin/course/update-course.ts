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
    const {
      courseId,
      courseDescription,
      courseDiscount,
      courseEndDate,
      courseMode,
      courseName,
      courseOfferPrice,
      coursePrice,
      courseStartDate,
      courseThumbnail,
      syllabusLink,
      modules,
    } = data;

    if (!isValidObjectId(courseId)) {
      return { success: false, message: "Provide valid course id" };
    }

    const course = await Course.findById(new ObjectId(courseId));

    if (!course) {
      return { success: false, message: "Course not found" };
    }

    // Update only provided fields
    if (courseName !== undefined) course.courseName = courseName;
    if (courseDescription !== undefined)
      course.courseDescription = courseDescription;
    if (courseThumbnail !== undefined) course.courseThumbnail = courseThumbnail;
    if (coursePrice !== undefined) course.coursePrice = coursePrice;
    if (courseDiscount !== undefined) course.courseDiscount = courseDiscount;
    if (courseOfferPrice !== undefined)
      course.courseOfferPrice = courseOfferPrice;
    if (courseStartDate !== undefined)
      course.courseStartDate = new Date(courseStartDate);
    if (courseEndDate !== undefined)
      course.courseEndDate = new Date(courseEndDate);
    if (courseMode !== undefined) course.courseMode = courseMode;
    if (syllabusLink !== undefined) course.syllabusLink = syllabusLink;
    if (modules !== undefined && modules?.length > 0) course.modules = modules;

    await course.save();
    return { success: true, message: "Course updated successfully" };
  } catch (error) {
    return { success: false, message: "Something went wrong" };
  }
};
