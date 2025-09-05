// models/module.model.ts
import mongoose, { Schema, model, models } from "mongoose";

const topicSchema = new Schema({
  title: { type: String },
  description: { type: String },
});

const chapterSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  topics: [topicSchema],
});

const moduleSchema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    syllabusLink: { type: String },
    syllabusLabel: { type: String },
    price: { type: Number, required: true },
    discount: { type: Number },
    chapters: [chapterSchema],
    students: [{ type: String, default: [], ref: "Student" }],
    courseId: [{ type: Schema.Types.ObjectId, ref: "Course", required: true }],
    batchId: [{ type: Schema.Types.ObjectId, ref: "Batch", required: true }],
    rating: { type: Number, default: 0, min: 0, max: 5 },
  },
  {
    timestamps: true,
  }
);
moduleSchema.index({ courseId: 1 });
moduleSchema.index({ batchId: 1 });
moduleSchema.index({ students: 1 });

export const Module = models.Module || model("Module", moduleSchema);
