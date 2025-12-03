"use server";


import { connectToDB } from "@/lib/db";
import { Invoice } from "@/models/invoice.model";
import { Student } from "@/models/student.model";
import { parseISO, startOfDay, endOfDay } from "date-fns";
import { Batch } from "@/models/batch.model"; // Ensure imports exist

// Helper to filter data based on date range
const createDateFilter = (year: string, month: string, startDate?: string, endDate?: string) => {
  let start: Date;
  let end: Date;

  if (startDate && endDate) {
    start = startOfDay(parseISO(startDate));
    end = endOfDay(parseISO(endDate));
  } else {
    const yearNum = parseInt(year);
    if (month !== "All") {
      // Month is 1-indexed string ("01", "12"), JS Date is 0-indexed
      const monthNum = parseInt(month) - 1; 
      start = new Date(yearNum, monthNum, 1);
      // Last day of the month
      end = new Date(yearNum, monthNum + 1, 0, 23, 59, 59);
    } else {
      start = new Date(yearNum, 0, 1);
      end = new Date(yearNum, 11, 31, 23, 59, 59);
    }
  }

  return { $gte: start, $lte: end };
};

export async function getNewStudentRegistrations(year: string, month: string, startDate?: string, endDate?: string) {
  try {
    await connectToDB();
    const dateFilter = createDateFilter(year, month, startDate, endDate);
    
    // Fetch students created within the date range
    // We only need the 'createdAt' field
    const students = await Student.find({ createdAt: dateFilter })
      .select("createdAt")
      .lean();
    
    // Transform to simple object array for Client Component serialization
    return students.map(s => ({
      date: s.createdAt instanceof Date 
        ? s.createdAt.toISOString() 
        : new Date(s.createdAt).toISOString()
    }));
  } catch (error) {
    console.error("Error fetching student registrations:", error);
    return [];
  }
}

// ... existing code ...

export async function getRevenueData(year: string, month: string, startDate?: string, endDate?: string) {
  try {
    await connectToDB();
    const dateFilter = createDateFilter(year, month, startDate, endDate);

    // Fetch invoices created within the date range
    // We need 'createdAt' for date and 'amountPaid' for revenue
    const invoices = await Invoice.find({ createdAt: dateFilter })
      .select("createdAt amountPaid")
      .lean();

    // Transform to simple object array
    return invoices.map(inv => ({
      date: inv.createdAt instanceof Date 
        ? inv.createdAt.toISOString() 
        : new Date(inv.createdAt).toISOString(),
      amount: inv.amountPaid || 0
    }));
  } catch (error) {
    console.error("Error fetching revenue data:", error);
    return [];
  }
}



// ... existing code ...

// 4. Fee Status Data (Donut Chart)
export async function getFeeStatusData(courseFilter?: string, batchFilter?: string) {
  try {
    await connectToDB();


    const stats = await Invoice.aggregate([
      {
        $group: {
          _id: "$status", // "Paid", "Due", "Overdue", "Partially Paid"
          count: { $sum: 1 }
        }
      }
    ]);

    return stats.map(s => ({ status: s._id, count: s.count }));
  } catch (error) {
    console.error("Error fetching fee status:", error);
    return [];
  }
}

// 5. Student Distribution Data (Pie Chart)
export async function getStudentDistributionData() {
  try {
    await connectToDB();

    // We want to know how many students are in each Batch (and implicitly Course)
    const batches = await Batch.find({})
      .populate("courseId", "courseName") // Get course name
      .select("name students courseId")
      .lean();

    return batches.map((b: any) => ({
      course: b.courseId?.courseName || "Unknown Course",
      batch: b.name,
      studentCount: b.students ? b.students.length : 0
    }));
  } catch (error) {
    console.error("Error fetching student distribution:", error);
    return [];
  }
}

// 6. Helper for Dropdown Options
export async function getFilterOptions() {
    try {
        await connectToDB();
        // Get all unique batch names
        const batches = await Batch.distinct("name");
        
        // Get all unique course names
        // We can fetch Courses directly if you have a Course model, or derive from Batches
        const batchesWithCourses = await Batch.find().populate("courseId", "courseName").select("courseId");
        const courses = Array.from(new Set(batchesWithCourses.map((b: any) => b.courseId?.courseName).filter(Boolean)));

        return { batches, courses };
    } catch (error) {
        return { batches: [], courses: [] };
    }
}
