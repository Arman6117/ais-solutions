
"use server";

import { connectToDB } from "@/lib/db";
import { Batch } from "@/models/batch.model";
import { Course } from "@/models/course.model";
import { Module } from "@/models/module.model";
import { Student } from "@/models/student.model";
import { format } from "date-fns";

// Ensure you have this model

// Define the shape of the search result to keep it consistent
export type SearchResultItem = {
  id: string;
  title: string; // Primary display text (Name, Title)
  subtitle: string; // Secondary text (Email, Date, etc.)
  meta: string; // Extra info (Batch name, Course name, etc.)
  category: "students" | "courses" | "batches" | "modules" | "instructors";
};

export async function globalSearch(
  query: string,
  category: "students" | "courses" | "batches" | "modules" | "instructors"
): Promise<SearchResultItem[]> {
  if (!query || query.length < 2) return [];

  try {
    await connectToDB();
    const regex = new RegExp(query, "i"); // Case-insensitive search

    let results: any[] = [];

    switch (category) {
      case "students":
        results = await Student.find({
          $or: [{ name: regex }, { email: regex }],
        })
          .select("name email batches") // Select necessary fields
          .limit(5)
          .lean();
        
        return results.map((s: any) => ({
          id: s._id.toString(),
          title: s.name,
          subtitle: s.email,
          meta: s.batches?.length ? `${s.batches.length} Batches` : "No Batch",
          category: "students",
        }));

      case "courses":
        // Assuming Course model exists
        results = await Course.find({ courseName: regex })
          .select("courseName courseStartDate")
          .limit(5)
          .lean();

        return results.map((c: any) => ({
          id: c._id.toString(),
          title: c.courseName,
          subtitle: c.courseStartDate ? `Starts: ${format(c.courseStartDate, "PP")}` : "No Date",
          meta: "Course",
          category: "courses",
        }));

      case "batches":
        results = await Batch.find({ name: regex })
          .populate("courseId", "courseName")
          .select("name courseId")
          .limit(5)
          .lean();

        return results.map((b: any) => ({
          id: b._id.toString(),
          title: b.name,
          subtitle: b.courseId?.courseName || "Unknown Course",
          meta: "Batch",
          category: "batches",
        }));

      case "modules":
        // Assuming Module model exists
        results = await Module.find({ name: regex })
          .select("name chapters")
          .limit(5)
          .lean();

        return results.map((m: any) => ({
          id: m._id.toString(),
          title: m.name,
          subtitle: `${m.chapters?.length || 0} Chapters`,
          meta: "Module",
          category: "modules",
        }));

    //   case "instructors":
    //     // Assuming Instructor model exists
    //     results = await Instructor.find({
    //         $or: [{ name: regex }, { email: regex }],
    //     })
    //       .select("name email modules")
    //       .limit(5)
    //       .lean();

    //     return results.map((i: any) => ({
    //       id: i._id.toString(),
    //       title: i.name,
    //       subtitle: i.email,
    //       meta: i.modules?.length ? `${i.modules.length} Modules` : "No Modules",
    //       category: "instructors",
    //     }));

      default:
        return [];
    }
  } catch (error) {
    console.error("Global search error:", error);
    return [];
  }
}
