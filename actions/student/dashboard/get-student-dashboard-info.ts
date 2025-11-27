"use server";

import { connectToDB } from "@/lib/db";
import {
  MeetingInfo,
  StudentDashboard,
  StudentInfo,
  // Ensure your types are updated in this file as discussed previously
} from "@/lib/types/student-dashboard.type";
import { Batch } from "@/models/batch.model";
import { Student } from "@/models/student.model";
import { isValidObjectId } from "mongoose";
import { Sessions } from "@/models/sessions.model";
import { Module } from "@/models/module.model";
import { Course } from "@/models/course.model";
import mongoose from "mongoose";

// --- Interface Definitions ---
interface StudentCourse {
  courseId: mongoose.Types.ObjectId;
  moduleId: mongoose.Types.ObjectId[];
  isApproved: boolean;
  appliedAt?: Date;
  approvedAt?: Date | null;
}

interface IStudent {
  _id: string;
  name: string;
  email: string;
  profilePic?: string;
  courses?: StudentCourse[];
}

interface IBatchModule {
  id: mongoose.Types.ObjectId;
  name: string;
  status: "Upcoming" | "Ongoing" | "Completed";
  startDate: string;
  endDate: string;
  instructor: string[];
  numberOfStudent: number;
}

interface IBatch {
  _id: mongoose.Types.ObjectId;
  name: string;
  groupLink: string;
  modules: IBatchModule[];
}

interface IModule {
  _id: mongoose.Types.ObjectId;
  name: string;
  chapters?: unknown[];
}

interface ICourse {
  _id: mongoose.Types.ObjectId;
  courseName: string;
  courseThumbnail: string;
}

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

    // 1. Get Student Info
    const student = await Student.findOne({ _id: studentId })
      .select("name email profilePic courses")
      .lean<IStudent>()
      .exec();

    if (!student) {
      return { success: false, message: "No student found", data: null };
    }

    const studentInfo: StudentInfo = {
      name: student.name,
      email: student.email,
      profilePic: student.profilePic || "",
    };

    // 2. Find Student's Purchased Modules
    const studentCourse = student.courses?.find(
      (c: StudentCourse) =>
        c.courseId.toString() === courseId && c.isApproved === true
    );

    if (!studentCourse) {
      return {
        success: false,
        message: "Student has not purchased any modules for this course",
        data: null,
      };
    }

    const purchasedModuleIds = (studentCourse.moduleId || []).map((id) =>
      id.toString()
    );
    console.log("📦 Student's purchased modules:", purchasedModuleIds);

    // 3. Get Batch Info
    const batchInfo = await Batch.findOne(
      {
        courseId: courseId,
        students: studentId,
      },
      { name: 1, groupLink: 1, _id: 1, modules: 1 }
    )
      .lean<IBatch>()
      .exec();

    if (!batchInfo) {
      return {
        success: false,
        message: "Student not enrolled in this course or batch not found",
        data: null,
      };
    }

    // 4. Get Course Info
    const course = await Course.findById(courseId, {
      courseName: 1,
      courseThumbnail: 1,
    })
      .lean<ICourse>()
      .exec();

    if (!course) {
      return { success: false, message: "Course not found", data: null };
    }

    // 5. Fetch ALL modules in the batch
    const batchModuleIds = (batchInfo.modules || []).map((m) => m.id);
    const allBatchModules = await Module.find(
      { _id: { $in: batchModuleIds } },
      { _id: 1, name: 1, chapters: 1 }
    )
      .lean<IModule[]>()
      .exec();

    // Create lookup map
    const moduleDataMap = new Map<string, { name: string; chapterCount: number }>();
    allBatchModules.forEach((mod) => {
      moduleDataMap.set(mod._id.toString(), {
        name: mod.name,
        chapterCount: mod.chapters?.length || 0,
      });
    });

    // 6. Prepare Module List (Marking Purchased vs Locked)
    const studentModules =
      batchInfo.modules?.map((mod) => {
        const modIdStr = mod.id.toString();
        const isPurchased = purchasedModuleIds.includes(modIdStr);
        const moduleData = moduleDataMap.get(modIdStr);

        return {
          id: modIdStr,
          courseName: course.courseName,
          name: mod.name,
          noOfChap: moduleData?.chapterCount || 0,
          thumbnail: course.courseThumbnail || "",
          status: mod.status,
          startDate: mod.startDate,
          endDate: mod.endDate,
          instructor: mod.instructor,
          batchId: batchInfo._id.toString(),
          // Access Flags with Explicit Type Casting
          isPurchased: isPurchased,
          accessLevel: (isPurchased ? "full" : "preview") as "full" | "preview",
        };
      }) || [];

    console.log("✅ Total modules in dashboard:", studentModules.length);

    // 7. Get All Meetings
    const meetings = await Sessions.find(
      { batchId: batchInfo._id },
      {
        time: 1,
        module: 1,
        meetingLink: 1,
        date: 1,
        studentId: 1,
        status: 1,
        isDeleted: 1,
        originalDate: 1,
        originalTime: 1,
        rescheduledAt: 1,
        cancelledAt: 1,
      }
    )
      .lean<MeetingInfo[]>()
      .exec();

    const attendedMeetings = meetings.filter(
      (meet) =>
        meet.studentId?.includes(studentId) && meet.status !== "cancelled"
    );

    // 8. Flag Meetings with Access Info
    // Map module names to IDs to check purchase status
    const moduleNameIdMap = new Map<string, string>();
    allBatchModules.forEach(m => moduleNameIdMap.set(m.name, m._id.toString()));

    const processedMeetings = meetings.map((meet) => {
        const moduleId = moduleNameIdMap.get(meet.module);
        let isPurchased = false;

        if (moduleId) {
            // It's an official module, check if purchased
            isPurchased = purchasedModuleIds.includes(moduleId);
        } else {
            // It's a custom/other module -> Grant access
            isPurchased = true; 
        }

        return {
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
            // Access Info with Explicit Type Casting
            isPurchasedModule: isPurchased,
            accessLevel: (isPurchased ? "full" : "preview") as "full" | "preview",
        };
    });

    const formattedData: StudentDashboard = {
      student: studentInfo,
      batch: {
        name: batchInfo.name,
        groupLink: batchInfo.groupLink,
      },
      lectureCompleted: attendedMeetings.length,
      meetings: processedMeetings,
      modules: studentModules,
    };

    return {
      success: true,
      message: "Dashboard data retrieved successfully",
      data: formattedData,
    };
  } catch (error) {
    console.error("❌ Error in getStudentDashboard:", error);
    return {
      success: false,
      message: "Something went wrong",
      data: null,
    };
  }
};
