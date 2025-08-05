import { Schema, model, models } from "mongoose";
const pendingRequestSchema = new Schema({
  studentId: { type: String, required: true, ref: "Student" },
  courseId: { type: String, required: true, ref: "Course" },
  status: {
    type: String,
    enum: ["pending", "approved", "rejected"],
    default: "pending",
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  modules: [{ type: Schema.Types.ObjectId, ref: "Module", required: true }],
  finalPrice: { type: Number, required: true },
});

export const PendingRequest =
  models.PendingRequest || model("PendingRequest", pendingRequestSchema);
