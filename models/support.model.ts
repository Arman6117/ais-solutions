import { Schema, model, models } from "mongoose";

// Schema for individual support members
const supportMemberSchema = new Schema({
  name: { type: String, required: true },
  designation: { type: String, required: true },
  email: { type: String, required: true },
  contact: { type: String, required: true },
  availableTime: { type: String, required: true }, // e.g. "9:00 AM - 5:00 PM"
  
  // Assigned Batches (Array of objects with ID and Name)
  assignedBatches: [
    {
      batchId: { type: Schema.Types.ObjectId, ref: "Batch", required: true },
      batchName: { type: String, required: true } // Storing name for faster access
    }
  ]
});

// Main Schema for Support Departments
const supportDepartmentSchema = new Schema({
  name: { type: String, required: true, unique: true }, // e.g., "Technical Support"
  icon: { type: String, default: "Building2" }, // Store icon name string (e.g., "Laptop")
  color: { type: String, default: "blue" }, // Store color theme string
  
  // Array of members belonging to this department
  members: [supportMemberSchema]
}, { 
  timestamps: true 
});

// Create and export the model
export const SupportDepartment = models.SupportDepartment || model("SupportDepartment", supportDepartmentSchema);
