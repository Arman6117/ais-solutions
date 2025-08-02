import { studentSchema } from "@/lib/helpers/parse-student-registration";
import mongoose, { Schema, model, models } from "mongoose";
import { string } from "zod";
const StudentSchema = new Schema(
  {
    _id: { type: String, required: true },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, index: true },
    phone: { type: String, required: true, index: true },
    referralCode: { type: String,  },
    gender: { type: String, enum: ["male", "female", "other"], required: true },
    profilePic: { type: String, required: true },
    role: { type: String, required: true },

    courses: [
      {
        courseId: { type: Schema.Types.ObjectId,ref:"Course", required: true, index: true },
        moduleId: [{  type: Schema.Types.ObjectId,ref:"Module", required: true }],
        approvedAt: { type: Date, default: null },
        isApproved: { type: Boolean, default: false },
      },
    ],

    batches: [ { type: Schema.Types.ObjectId,ref:"Batch", required: true, index: true } ],
    invoices: [ {  type: Schema.Types.ObjectId,ref:"Invoice" ,required: true, index: true } ],
  },
  {
    timestamps: true,
  }
);

export const Student = models.Student || model("Student", StudentSchema);
