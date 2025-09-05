"use server";

import { connectToDB } from "@/lib/db";
import { FormattedCourse } from "@/lib/types/course.type";
import { Mode } from "@/lib/types/types";
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

export const getCourseById = async (id: string):Promise<{data:FormattedCourse | undefined, success:boolean, message:string}> => {
  if (!id) {
    return {
      data:undefined,
      success: false,
      message: "Course ID is required",
    };
  }
  try {
    await connectToDB();
    const course = await Course.findById(new ObjectId(id)).exec() as FormattedCourse;

    if (!course) {
      return {
        data:undefined,
        success: false,
        message: "Course not found",
      };
    }
   
    return {
      success: true,
      data: JSON.parse(JSON.stringify(course)),
      message: "Course fetched successfully",
    };
  } catch (error) {
    console.error("Error fetching course by ID:", error);
    return {
      data:undefined,
      success: false,
      message: "Something went wrong while fetching course",
    };
  }
};



