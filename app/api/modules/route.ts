import { connectToDB } from "@/lib/db";
import { Modules } from "@/lib/types/types";
import { Course } from "@/models/course.model";
import { Module } from "@/models/module.model";
import { isValidObjectId } from "mongoose";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  try {
    await connectToDB();
    const courseId = req.nextUrl.searchParams.get("courseId");

    if (!isValidObjectId(courseId)) {
      return NextResponse.json(
        { success: false, message: "Invalid course id" },
        { status: 400 }
      );
    }

    const course = await Course.findById(new Object(courseId));

    if (!course) {
      return NextResponse.json(
        { success: false, message: "Course not found" },
        { status: 404 }
      );
    }

    const data = await Module.find<Modules>(
      { _id: { $in: course.modules } },
      { _id: 1, name: 1 }
    );
    const modules = data.map((mod) => {
      return {
        _id: mod._id,
        name: mod.name,
      };
    });
    return NextResponse.json({
      success: true,
      data: JSON.parse(JSON.stringify(modules)) as Modules[],
    });
  } catch (error) {
    console.error("[getModuleByCourseId]", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch modules" },
      { status: 500 }
    );
  }
};
