"use server";

import { connectToDB } from "@/lib/db";
import { Batch } from "@/models/batch.model";
import { Invoice } from "@/models/invoice.model";
import { Module } from "@/models/module.model";
import { Sessions } from "@/models/sessions.model";
import { Student } from "@/models/student.model";
import { addDays, format } from "date-fns";
import "@/models/course.model"; 
export async function getDashboardData() {
  try {
    await connectToDB();

    // --- 1. Fetch Key Statistics (Parallel Execution) ---
    const [
      totalStudents,
      totalBatches,
      activeBatches,
      totalModules,
      financials
    ] = await Promise.all([
      Student.countDocuments({}),
      Batch.countDocuments({}),
      Batch.countDocuments({ status: "Ongoing" }),
      // Try to count modules if model exists, else default to 0 to prevent crash
      Module ? Module.countDocuments({}) : Promise.resolve(0), 
      Invoice.aggregate([
        {
          $group: {
            _id: null,
            totalRevenue: { $sum: "$amountPaid" },
            totalFees: { $sum: "$totalFees" },
          },
        },
      ]),
    ]);

    const revenue = financials[0]?.totalRevenue || 0;
    const totalExpected = financials[0]?.totalFees || 0;
    const pendingFees = totalExpected - revenue;

    // --- 2. Fetch Schedule (Today & Tomorrow) ---
    // Formats: YYYY-MM-DD (Adjust format string if your DB uses DD-MM-YYYY)
    const todayStr = format(new Date(), "yyyy-MM-dd");
    const tomorrowStr = format(addDays(new Date(), 1), "yyyy-MM-dd");

    const upcomingSessions = await Sessions.find({
      date: { $in: [todayStr, tomorrowStr] },
      isDeleted: false,
    })
      .select("meetingName date time module instructor batchId")
      .sort({ date: 1, time: 1 }) // Sort by date then time
      .lean();

    // --- 3. Fetch Ongoing Batches for Sidebar ---
    const ongoingBatchesData = await Batch.find({ status: "Ongoing" })
      .populate("courseId", "courseName") // Ensure Course model is registered
      .select("name courseId students modules status")
      .limit(10)
      .lean();

    // --- Return Serializable Object ---
    return {
      success: true,
      data: {
        stats: {
          totalStudents,
          totalModules,
          totalBatches,
          activeBatches,
          totalRevenue: revenue,
          pendingFees: pendingFees,
        },
        schedule: JSON.parse(JSON.stringify(upcomingSessions)),
        ongoingBatches: JSON.parse(JSON.stringify(ongoingBatchesData)),
      },
    };
  } catch (error) {
    console.error("Error fetching dashboard data:", error);
    return {
      success: false,
      error: "Failed to load dashboard data",
      data: null,
    };
  }
}
