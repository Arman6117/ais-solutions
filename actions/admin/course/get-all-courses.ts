"use server";

import { connectToDB } from "@/lib/db";
import { Course } from "@/models/course.model";
import { format } from "date-fns";
import { ObjectId } from "mongoose";

export const getAllCoursesTable = async () => {
  try {
    await connectToDB();

    const courses = await Course.find({})
      .select(
        "_id courseName createdAt coursePrice courseDiscount courseOfferPrice"
      )
      .sort({ createdAt: -1 })
      .lean();

    const formattedCourses = courses.map((course) => {
      return {
        _id: `${course._id}`, 
        courseName: course.courseName as string,
        createdAt: format(new Date(course.createdAt), "PP"), 
        coursePrice: Number(course.coursePrice),
        courseDiscount: Number(course.courseDiscount),
        courseOfferPrice: Number(course.courseOfferPrice),
        numberOfStudents: Number(course.numberOfStudents ?? 0), 
      };
    });

    return {
      success: true,
      data: formattedCourses || [],
      message: courses.length
        ? "Courses fetched successfully"
        : "No courses found",
    };
  } catch (error) {
    console.error("Error fetching courses:", error);
    return {
      success: false,
      message: "Something went wrong while fetching courses",
    };
  }
};
