"use server";

import { connectToDB } from "@/lib/db";
import { SupportDepartment } from "@/models/support.model";
import { Batch } from "@/models/batch.model"; // Import Batch model to resolve names
import { revalidatePath } from "next/cache";
import { ObjectId } from "mongodb";
import { MemberPayload } from "@/lib/types/support.type";

// Define payload types locally or import from your types file


/**
 * Helper function to resolve Batch IDs to objects with names
 */
async function resolveBatches(batchIds: string[]) {
  if (!batchIds || batchIds.length === 0) return [];
  
  // Fetch batch details to get names
  const batches = await Batch.find({ _id: { $in: batchIds } }).select("name");
  
  return batches.map((b) => ({
    batchId: b._id,
    batchName: b.name,
  }));
}

export const addSupportMember = async (data: MemberPayload) => {
  try {
    await connectToDB();

    const { departmentId, assignedBatches, ...memberDetails } = data;

    // 1. Resolve Batch IDs to { id, name } objects
    const formattedBatches = await resolveBatches(assignedBatches);

    // 2. Create new member object
    const newMember = {
      ...memberDetails,
      assignedBatches: formattedBatches,
    };

    // 3. Push to the specific department's members array
    const updatedDepartment = await SupportDepartment.findByIdAndUpdate(
      departmentId,
      { $push: { members: newMember } },
      { new: true }
    );

    if (!updatedDepartment) {
      return { success: false, message: "Department not found" };
    }

    revalidatePath("/admin/support"); // Update the path where you display this
    return { success: true, message: "Member added successfully" };
  } catch (error) {
    console.error("Error adding support member:", error);
    return { success: false, message: "Failed to add member" };
  }
};

export const updateSupportMember = async (data: MemberPayload) => {
  try {
    await connectToDB();

    const { departmentId, memberId, assignedBatches, ...memberDetails } = data;

    if (!departmentId || !memberId) {
      return { success: false, message: "Missing ID parameters" };
    }

    // 1. Resolve Batch IDs to { id, name } objects
    const formattedBatches = await resolveBatches(assignedBatches);

    // 2. Update specific member inside the array using the positional operator ($)
    const result = await SupportDepartment.findOneAndUpdate(
      { _id: departmentId, "members._id": memberId },
      {
        $set: {
          "members.$.name": memberDetails.name,
          "members.$.designation": memberDetails.designation,
          "members.$.email": memberDetails.email,
          "members.$.contact": memberDetails.contact,
          "members.$.availableTime": memberDetails.availableTime,
          "members.$.assignedBatches": formattedBatches,
        },
      },
      { new: true }
    );

    if (!result) {
      return { success: false, message: "Member or Department not found" };
    }

    revalidatePath("/admin/support");
    return { success: true, message: "Member updated successfully" };
  } catch (error) {
    console.error("Error updating support member:", error);
    return { success: false, message: "Failed to update member" };
  }
};

export const deleteSupportMember = async (departmentId: string, memberId: string) => {
    try {
      await connectToDB();
  
      const result = await SupportDepartment.findByIdAndUpdate(
        departmentId,
        { $pull: { members: { _id: memberId } } }
      );
  
      if (!result) return { success: false, message: "Department not found" };
  
      revalidatePath("/admin/support");
      return { success: true, message: "Member removed successfully" };
    } catch (error) {
      console.error("Error deleting member:", error);
      return { success: false, message: "Failed to delete member" };
    }
  };
