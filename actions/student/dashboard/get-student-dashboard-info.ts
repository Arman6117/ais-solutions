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
import { Sessions } from "@/models/sessions.model";
import { Module } from "@/models/module.model";
import { Course } from "@/models/course.model";

export const getStudentDashboard = async (
  studentId: string,
  courseId: string
): Promise<{
  data: StudentDashboard | null;
  success: boolean;
  message: string;
}> => {
  if (!studentId || !courseId) {
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

    // Include status fields in the query
    const meetings = (await Sessions.find(
      { batchId: batchInfo._id },
      { 
        time: 1, 
        module: 1, 
        meetingLink: 1, 
        date: 1, 
        studentId: 1,
        status: 1,              // Add status
        isDeleted: 1,           // Add isDeleted
        originalDate: 1,        // Add original date
        originalTime: 1,        // Add original time
        rescheduledAt: 1,       // Add reschedule timestamp
        cancelledAt: 1          // Add cancelled timestamp
      }
    ).exec()) as MeetingInfo[];

    const attendedMeetings = meetings.filter(
      (meet) => meet.studentId?.includes(studentId) && meet.status !== "cancelled"
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
        _id: meet._id,
        batchName: batchInfo.name,
        time: meet.time,
        courseName: course.courseName,
        module: meet.module,
        meetingLink: meet.meetingLink,
        date: meet.date,
        status: meet.status,
        isDeleted: meet.isDeleted,
        originalDate: meet.originalDate,
        originalTime: meet.originalTime,
        rescheduledAt: meet.rescheduledAt,
        cancelledAt: meet.cancelledAt,
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
