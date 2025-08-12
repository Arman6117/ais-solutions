"use server";
import { connectToDB } from "@/lib/db";
import { CourseSelector } from "@/lib/types/course.type";
import { Course } from "@/models/course.model";

export const getCourses = async () => {
  try {
    await connectToDB();
    const courses= (await Course.find({})
      .select("_id courseName")
      .lean()
      .exec()) as unknown as CourseSelector[];
    
    return JSON.parse(JSON.stringify(courses)) || [];
  } catch (err) {
    console.error("Failed to fetch courses", err);
    return [];
  }
};
