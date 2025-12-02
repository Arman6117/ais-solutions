"use server";

import { connectToDB } from "@/lib/db";
import { SupportDepartment } from "@/models/support.model";
import { ISupportDepartment } from "@/lib/types/support.type";

export const getSupportDepartments = async () => {
  try {
    await connectToDB();

    const departments = await SupportDepartment.find({})
      .sort({ createdAt: -1 })
      .lean();

    // We use a deep mapping strategy to ensure clean data
    const formattedDepartments = departments.map((dept: any) => ({
      _id: dept._id.toString(),
      name: dept.name,
      icon: dept.icon,
      color: dept.color,
      createdAt: dept.createdAt?.toISOString(), // Convert Date to String
      updatedAt: dept.updatedAt?.toISOString(), // Convert Date to String
      members: (dept.members || []).map((member: any) => ({
        _id: member._id.toString(),
        id: member._id.toString(),
        name: member.name,
        designation: member.designation,
        email: member.email,
        contact: member.contact,
        availableTime: member.availableTime,
        assignedBatches: (member.assignedBatches || []).map((batch: any) => ({
          // ⚠️ THIS IS THE KEY FIX ⚠️
          // We map 'batchId' (from DB) to 'id' (for frontend) ensuring it's a string
          id: batch.batchId ? batch.batchId.toString() : "", 
          name: batch.batchName || ""
        }))
      }))
    }));

    // ⚠️ Nuclear option: serialization check
    return { success: true, data: JSON.parse(JSON.stringify(formattedDepartments)) };
  } catch (error) {
    console.error("Error fetching support departments:", error);
    return { success: false, message: "Failed to fetch support data", data: [] };
  }
};
