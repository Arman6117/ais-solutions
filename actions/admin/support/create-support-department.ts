"use server";

import { connectToDB } from "@/lib/db";
import { CreateDepartmentPayload } from "@/lib/types/support.type";

import { SupportDepartment } from "@/models/support.model";

export const createSupportDepartment = async (payload: CreateDepartmentPayload) => {
  const { name, icon, color } = payload;

  // 1. Validate input
  if (!name.trim()) {
    return { success: false, message: "Department name cannot be empty." };
  }

  try {
    await connectToDB();

    // 2. Check if a department with the same name already exists
    const existingDepartment = await SupportDepartment.findOne({ name });
    if (existingDepartment) {
      return { success: false, message: `Department "${name}" already exists.` };
    }

    // 3. Create a new department with an empty members array
    const newDepartment = new SupportDepartment({
      name,
      icon,
      color,
      members: [], // Initialize with empty members
    });

    // 4. Save to the database
    await newDepartment.save();

    return {
      success: true,
      message: `Department "${name}" created successfully.`,
    //   data: JSON.parse(JSON.stringify(newDepartment)), // Return plain object
    };
  } catch (error) {
    console.error("Error creating support department:", error);
    return { success: false, message: "Something went wrong. Please try again." };
  }
};
