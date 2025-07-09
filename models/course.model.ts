import mongoose, { Schema, model, models } from "mongoose";

const CourseSchema = new Schema(
  {
    courseName: { type: String, required: true },
    courseDescription: { type: String, required: true },
    courseThumbnail: { type: String, required: true },
    coursePrice: { type: Number, required: true },
    courseDiscount: { type: Number, default: 0 },
    courseOfferPrice: { type: Number, required: true },
    courseStartDate: { type: Date, required: true },
    courseEndDate: { type: Date, required: true },
    courseMode: {
      type: String,
      enum: ["online", "offline", "hybrid"],
      required: true,
    },
    modules: [{ type: String, ref: "Module", index: true }],
    batches: [{ type: String, ref: "Batch", default: [], index: true }],
  },
  { timestamps: true }
);

export const Course = models.Course || model("Course", CourseSchema);
