"use server";

import { connectToDB } from "@/lib/db";
import { StudentData, StudentTable } from "@/lib/types/student";
import { Student } from "@/models/student.model";
import { isValidObjectId } from "mongoose";
import { ObjectId } from "mongodb";

import "@/models/batch.model";

export const getStudentTable = async () => {
  try {
    await connectToDB();
    const student = (await Student.find({isApproved:true})
      .select("_id createdAt name email phone batches feeStatus gender")
      .sort({ createdAt: -1 })
      .populate({ path: "batches", select: "name" }).exec() as StudentTable[])
      
  console.log("Fetched student table:", student);
    return {
      success: true,
      data: JSON.parse(JSON.stringify(student)), // Convert Mongoose documents to plain objects
    };
  } catch (error) {
    console.error("Error fetching student table:", error);
    return {
      success: false,
      data: [],
    };
  }
};

export const getStudentById = async (studentId: string) => {
  try {
    await connectToDB();
    if (!studentId)
      return { success: false, message: "Student Id is required", data: null };
    if (!isValidObjectId(studentId))
      return { success: false, message: "Invalid Student Id", data: null };

    const student = (await Student.findById(
      new ObjectId(studentId)
    ).exec()) as StudentData | null;

    if (!student) {
      return { success: false, message: "Student not found" };
    }

    return {
      success: true,
      data: student,
      message: "fetched student successfully",
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: "Error fetching student",
      data: null,
    };
  }
};
