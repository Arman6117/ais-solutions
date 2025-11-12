import { Schema, model, models } from "mongoose";

const StudentSchema = new Schema(
  {
    _id: { type: String, required: true },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, index: true },
    phone: { type: String, required: true, index: true },
    referralCode: { type: String },
    refCoins: { type: Number, default: 0 },
    gender: { type: String, enum: ["male", "female", "other"], required: true },
    profilePic: { type: String },
    role: { type: String, required: true },
    feeStatus: {
      type: String,
      enum: ["paid", "partially paid", "due", "overdue"],
      default: "due",
      required: true,
    },
    courses: [
      {
        courseId: {
          type: Schema.Types.ObjectId,
          ref: "Course",
          required: true,
          index: true,
        },
        moduleId: [
          { type: Schema.Types.ObjectId, ref: "Module", required: true },
        ],
        approvedAt: { type: Date, default: null },
        isApproved: { type: Boolean, default: false },
      },
    ],
    batches: [
      {
        batchId: {
          type: Schema.Types.ObjectId,
          ref: "Batch",
          required: true,
          index: true,
        },
        mode: {
          type: String,
          enum: ["offline", "online", "hybrid"],
          required: true,
        },
        enrolledAt: { type: Date, default: Date.now },
      },
    ],
    invoices: [
      {
        type: Schema.Types.ObjectId,
        ref: "Invoice",
        required: true,
        index: true,
      },
    ],
  },
  {
    timestamps: true,
  }
);

export const Student = models.Student || model("Student", StudentSchema);
