"use server";

import { connectToDB } from "@/lib/db"; // Adjust your DB connection path
import SalesPerson from "@/models/sales-person.model";
import { revalidatePath } from "next/cache";

// --- Create ---
export async function createSalesPerson(data: {
  name: string;
  email: string;
  mobile: string;
  joiningDate: Date;
}) {
  try {
    await connectToDB();
    const newPerson = await SalesPerson.create(data);
    revalidatePath("/admin/sales-persons"); // Adjust path to where you list them
    return { success: true, message: "Sales person added successfully", data: JSON.parse(JSON.stringify(newPerson)) };
  } catch (error: any) {
    console.error("Create Error:", error);
    return { success: false, message: error.message || "Failed to create sales person" };
  }
}

// --- Get All ---


// ... createSalesPerson (keep as is) ...

export async function getSalesPersons() {
  try {
    await connectToDB();
    const persons = await SalesPerson.find().sort({ createdAt: -1 }).lean();
    
    return { 
      success: true, 
      data: JSON.parse(JSON.stringify(persons)).map((p: any) => ({
        ...p,
        // Return count of enrolled students for the UI
        enrolledCount: p.enrolledStudents ? p.enrolledStudents.length : 0
      })) 
    };
  } catch (error: any) {
    console.error("Fetch Error:", error);
    return { success: false, message: "Failed to fetch sales persons", data: [] };
  }
}

// ... updateSalesPerson and deleteSalesPerson (keep as is) ...


// --- Update ---
export async function updateSalesPerson(id: string, data: Partial<{
  name: string;
  email: string;
  mobile: string;
  joiningDate: Date;
}>) {
  try {
    await connectToDB();
    await SalesPerson.findByIdAndUpdate(id, data);
    revalidatePath("/admin/sales-persons");
    return { success: true, message: "Sales person updated successfully" };
  } catch (error: any) {
    console.error("Update Error:", error);
    return { success: false, message: "Failed to update sales person" };
  }
}

// --- Delete ---
export async function deleteSalesPerson(id: string) {
  try {
    await connectToDB();
    await SalesPerson.findByIdAndDelete(id);
    revalidatePath("/admin/sales-persons");
    return { success: true, message: "Sales person deleted successfully" };
  } catch (error: any) {
    console.error("Delete Error:", error);
    return { success: false, message: "Failed to delete sales person" };
  }
}
