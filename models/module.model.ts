// models/module.model.ts
import mongoose, { Schema, model, models } from "mongoose";

const topicSchema = new Schema({
  title: { type: String, },
  description: { type: String, },
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
    price: { type: Number, required: true },
    discount: { type: Number },
    chapters: [chapterSchema],
    courseId: [{ type: String, ref: "Course", required: true }],
    batchId: [{ type: String, ref: "Batch", required: true }],
    rating:{ type: Number, default: 0, min: 0, max: 5 },
  },
  {
    timestamps: true,
  }
);

export const Module = models.Module || model("Module", moduleSchema);
