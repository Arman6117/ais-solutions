"use server";

import { Student } from "@/models/student.model";
import "@/models/module.model";
import "@/models/course.model";

import {
  CourseDetails,
  // CourseSelector,
  StudentCourse,
} from "@/lib/types/course.type";
import { isValidObjectId } from "mongoose";
import { connectToDB } from "@/lib/db";
import { Course } from "@/models/course.model";
import { ObjectId } from "mongodb";



export const getStudentCourses = async (
  studentEmail: string
): Promise<{ data: StudentCourse[] }> => {
  try {
    if (!studentEmail) {
      console.log("Invalid");
      return { data: [] };
    }

    const student = await Student.findOne({ email: studentEmail })
      .select("courses.courseId courses.isApproved")
      .populate({ path: "courses.courseId", select: "_id courseName" });

    if (!student) {
      return { data: [] };
    }

    console.log(JSON.parse(JSON.stringify(student)));

    if (!student.courses || !Array.isArray(student.courses)) {
      return { data: [] };
    }

    const approvedCourses: StudentCourse[] = student.courses
      .filter((c: any) => c.isApproved && c.courseId) // ✅ check courseId
      .map((c: any) => ({
        _id: c.courseId._id, // ✅ use nested courseId
        courseName: c.courseId.courseName,
      }));

    return { data: JSON.parse(JSON.stringify(approvedCourses)) };
  } catch (error) {
    console.log("Error fetching student courses:", error);
    return { data: [] };
  }
};

export const getStudentCourseById = async (
  courseId: string
): Promise<{ data: CourseDetails | undefined; message: string }> => {
  if (!courseId) {
    return { data: undefined, message: "No course id is provided" };
  }
  if (!isValidObjectId(courseId)) {
    return { data: undefined, message: "Invalid course id" };
  }

  try {
    await connectToDB();
    const course = (await Course.findById(new ObjectId(courseId))
      .populate({
        path: "modules",
        select: "_id name description syllabusLink price chapters",
      })
      .lean()
      .exec()) as unknown as CourseDetails;
    if (!course) {
      return { data: undefined, message: "Course not found" };
    }
    return {
      data: JSON.parse(JSON.stringify(course)),
      message: "Course fetched successfully",
    };
  } catch (error) {
    console.log("Error fetching course:", error);
    return {
      data: undefined,
      message: "Something went wrong while fetching course",
    };
  }
};
