"use server";

import { connectToDB } from "@/lib/db";
import { Mode } from "@/lib/types";
import { Course } from "@/models/course.model";
import { format } from "date-fns";
import { ObjectId } from "mongodb";

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

export const getCourseById = async (id: string) => {
  if (!id) {
    return {
      success: false,
      message: "Course ID is required",
    };
  }
  try {
    await connectToDB();
    const course = await Course.findById(new ObjectId(id));

    if (!course) {
      return {
        success: false,
        message: "Course not found",
      };
    }
    const formattedCourse = {
      _id: `${course._id}`,
      courseName: course.courseName as string,
      courseDescription: course.courseDescription as string,
      createdAt: format(new Date(course.createdAt), "PP"),
      coursePrice: Number(course.coursePrice),
      courseDiscount: Number(course.courseDiscount),
      courseOfferPrice: Number(course.courseOfferPrice),
      numberOfStudents: Number(course.numberOfStudents ?? 0),
      courseThumbnail: course.courseThumbnail as string,
      courseStartDate: format(new Date(course.courseStartDate), "PP"),
      courseEndDate: format(new Date(course.courseEndDate), "PP"),
      courseMode: course.courseMode as Mode,
      modules: course.modules as string[],
    };
    return {
      success: true,
      data: formattedCourse,
      message: "Course fetched successfully",
    };
  } catch (error) {
    console.error("Error fetching course by ID:", error);
    return {
      success: false,
      message: "Something went wrong while fetching course",
    };
  }
};
