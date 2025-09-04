"use server";

import { connectToDB } from "@/lib/db";
import { CourseData } from "@/lib/types/pending-request.type";
import { Course } from "@/models/course.model";
import "@/models/batch.model"
import "@/models/module.model"
export const getCourseList = async (): Promise<{
  data: CourseData[];
  success: boolean;
  message: string;
}> => {
  try {
    await connectToDB();
    const courseList = (await Course.find()
      .select("courseName modules batches")
      .populate([
        { path: "modules", select: "name price _id" },
        { path: "batches", select: "_id name" },
      ])
      .exec()) as CourseData[];

    return {
      data: JSON.parse(JSON.stringify(courseList)),
      success: true,
      message: "Fetched course list",
    };
  } catch (error) {
    return {
      data: [],
      success: false,
      message: "Something went wrong",
    };
  }
};
