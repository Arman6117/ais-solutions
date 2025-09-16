"use server";

import { connectToDB } from "@/lib/db";
import { ObjectId } from "mongodb";
import {
  MeetingInfo,
  StudentDashboard,
  StudentInfo,
  BatchInfo,
} from "@/lib/types/student-dashboard.type";
import { Batch } from "@/models/batch.model";
import { Student } from "@/models/student.model";
import { isValidObjectId } from "mongoose";
import "@/models/batch.model";
import { Sessions } from "@/models/sessions.model";
import { Module } from "@/models/module.model";
import { Course } from "@/models/course.model";
export const getStudentBatchName = async (
  studentId: string,
  courseId: string
): Promise<{ success: boolean; message: string; data: string }> => {
  if (!studentId || !courseId) {
    return {
      success: false,
      message: "No student id or course id provided",
      data: "",
    };
  }
  if (!isValidObjectId(courseId)) {
    return {
      success: false,
      message: "Invalid student id or course id provided",
      data: "",
    };
  }

  try {
    await connectToDB();
    const batch = (await Batch.findOne(
      {
        courseId: courseId,
        students: studentId,
      },
      { name: 1, _id: 0 }
    ).lean()) as unknown as { name: string };

    if (!batch) {
      return {
        success: false,
        message: "No batch found for this student in the course",
        data: "",
      };
    }

    return {
      data: batch.name,
      success: true,
      message: "Fetched batch",
    };
  } catch (error) {
    console.log(error);
    return { data: "", success: false, message: "Something went wrong" };
  }
};

export const getStudentInfo = async (
  studentId: string
): Promise<{ success: boolean; message: string; data: StudentInfo | null }> => {
  if (!studentId) {
    return {
      success: false,
      message: "No student id provided",
      data: null,
    };
  }

  try {
    await connectToDB();
    const studentInfo = (await Student.findOne(
      { _id: studentId },
      { name: 1, _id: 0, profilePic: 1 }
    ).exec()) as StudentInfo;

    if (!studentInfo) {
      return {
        success: false,
        message: "No student found",
        data: null,
      };
    }
    return {
      data: JSON.parse(JSON.stringify(studentInfo)),
      message: "Fetched student",
      success: true,
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: "Something went wrong",
      data: null,
    };
  }
};

export const getStudentDashboard = async (
  studentId: string,
  courseId: string
): Promise<{
  data: StudentDashboard | null;
  success: boolean;
  message: string;
}> => {
  if (!studentId || !courseId) {
    console.log(studentId, courseId);
    return {
      success: false,
      message: "No student id or course id provided",
      data: null,
    };
  }

  if (!isValidObjectId(courseId)) {
    return {
      success: false,
      message: "Invalid student id or course id provided",
      data: null,
    };
  }

  try {
    await connectToDB();

    const studentInfo = (await Student.findOne(
      { _id: studentId },
      { name: 1, email: 1, _id: 0, profilePic: 1 }
    ).exec()) as StudentInfo;

    if (!studentInfo) {
      return { success: false, message: "No student found", data: null };
    }

    const batchInfo = (await Batch.findOne(
      {
        courseId: courseId,
        students: studentId,
      },
      { name: 1, groupLink: 1 }
    ).exec()) as BatchInfo;

    if (!batchInfo) {
      return {
        success: false,
        message: "Student not enrolled in this course or batch not found",
        data: null,
      };
    }

    const meetings = (await Sessions.find(
      { batchId: batchInfo._id },
      { time: 1, module: 1, meetingLink: 1, date: 1, studentId: 1 }
    ).exec()) as MeetingInfo[];
    const attendedMeetings = meetings.filter((meet) =>
      meet.studentId?.includes(studentId)
    );

    const batchWithModules = (await Batch.findOne(
      {
        courseId: courseId,
        students: studentId,
      },
      { modules: 1 }
    ).exec()) as {
      modules: {
        id: string;
        name: string;
        status: "Upcoming" | "Ongoing" | "Completed";
        startDate: string;
        endDate: string;
        instructor: string[];
      }[];
    };
  
    const course = (await Course.findById(new ObjectId(courseId), {
      courseName: 1,
      courseThumbnail: 1,
    }).exec()) as { courseName: string; courseThumbnail: string };

    if (!course) {
      return {
        success: false,
        message: "Course not found",
        data: null,
      };
    }

    const modules = (await Module.find(
      { batchId: batchInfo._id },
      { chapters: 1 }
    ).exec()) as string[];

    const formattedData: StudentDashboard = {
      student: studentInfo,
      batch: {
        name: batchInfo.name,
        groupLink: batchInfo.groupLink,
      },
      lectureCompleted: attendedMeetings.length,
      meetings: meetings.map((meet) => ({
        _id:meet._id,
        batchName: batchInfo.name,
        time: meet.time,
        courseName: course.courseName,
        module: meet.module,
        meetingLink: meet.meetingLink,
        date: meet.date,
      })),
      modules:
        batchWithModules.modules?.map((mod) => ({
          id: mod.id,
          courseName: course.courseName,
          name: mod.name,
          noOfChap: modules.length,
          thumbnail: course.courseThumbnail || "",
          status: mod.status,
          startDate: mod.startDate,
          endDate: mod.endDate,
          instructor: mod.instructor.map((inst) => inst),
        })) || [],
    };

  
    return {
      success: true,
      message: "Dashboard data retrieved successfully",
      data: formattedData,
    };
  } catch (error) {
    console.error("Error in getStudentDashboard:", error);
    return {
      success: false,
      message: "Something went wrong",
      data: null,
    };
  }
};
