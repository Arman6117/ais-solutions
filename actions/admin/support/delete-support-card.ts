"use server";

import { connectToDB } from "@/lib/db";
import { SupportDepartment } from "@/models/support.model"; // Adjust import path to where your schema is saved
import { revalidatePath } from "next/cache";

export async function deleteDepartment(departmentId: string) {
  try {
    await connectToDB();

    const deletedDepartment = await SupportDepartment.findByIdAndDelete(departmentId);

    if (!deletedDepartment) {
      return { success: false, message: "Department not found" };
    }

    // Revalidate the support page to reflect changes immediately
    revalidatePath("/admin/support"); 

    return { success: true, message: "Department and all its members deleted successfully" };
  } catch (error) {
    console.error("Error deleting department:", error);
    return { success: false, message: "Failed to delete department" };
  }
}