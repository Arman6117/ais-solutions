"use server";
import { connectToDB } from "@/lib/db";
import { Courses } from "@/lib/types/course.type";

import { Course } from "@/models/course.model";

export const getCourses = async ():Promise<Courses[]> => {
  try {
    await connectToDB();
    const courses= (await Course.find({})
      .select("_id courseName")
      .exec())  as Courses[];
    
    return JSON.parse(JSON.stringify(courses)) || [];
  } catch (err) {
    console.error("Failed to fetch courses", err);
    return [];
  }
};
