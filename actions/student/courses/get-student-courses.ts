"use server";

import { Student } from "@/models/student.model";

import { CourseSelector, StudentCourse } from "@/lib/types/course.type";

export const getStudentCourses = async (
  studentEmail: string
): Promise<{ data: StudentCourse[] }> => {
  try {
    if (!studentEmail) {
      console.log("Invalid");
      return { data: [] };
    }

    const student = (await Student.findOne({ email: studentEmail })
      .select("courses")
      .populate({ path: "courseId", select: "_id courseName" })
      .exec()) as unknown as CourseSelector;
    if (!student) {
      return { data: [] };
    }
    if (!student.courses || !Array.isArray(student.courses)) {
      return { data: [] };
    }

    const approvedCourses = student.courses
      .filter((c) => c.isApproved && c._id) 
      .map((c) => ({
        _id: c._id,
        courseName: c.courseName,
      }));
    return { data: approvedCourses || [] };
  } catch (error) {
    console.log("Error fetching student courses:", error);
    return { data: [] };
  }
};
