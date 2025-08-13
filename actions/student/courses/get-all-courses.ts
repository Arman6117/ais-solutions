"use server";

import { connectToDB } from "@/lib/db";
import { CourseCards } from "@/lib/types/course.type";
import { Course } from "@/models/course.model";

export const getAllCourses = async (): Promise<{ data: CourseCards[] }> => {
  try {
    await connectToDB();
    const courses = (await Course.find({})
      .select(
        "_id courseThumbnail courseName courseDescription coursePrice courseOfferPrice modules courseLevel rating courseStartDate courseEndDate courseMode createdAt"
      )
      .exec()) as CourseCards[];

    return { data: JSON.parse(JSON.stringify(courses)) };
  } catch (error) {
    console.log("Error fetching courses: ", error);
    return { data: [] };
  }
};
