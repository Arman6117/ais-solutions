import mongoose, { Schema, model, models } from "mongoose";

const CourseSchema = new Schema(
  {
    courseName: { type: String, required: true },
    courseDescription: { type: String, required: true },
    courseThumbnail: { type: String, required: true },
    syllabusLink: { type: String },
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
    numberOfStudents: { type: Number, default: 0, required: true }, 
    modules: [{ type: String, ref: "Module", index: true }],
    batches: [{ type: String, ref: "Batch", default: [], index: true }],
    rating:{type:Number, default: 0, min: 0, max: 5},
    // comments:[{}]
  },
  { timestamps: true }
);

export const Course = models.Course || model("Course", CourseSchema);
