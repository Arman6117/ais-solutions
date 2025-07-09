// models/counter.schema.ts
import { Schema, model, models } from "mongoose";

const CounterSchema = new Schema({
  _id: { type: String, required: true }, // e.g. "student"
  seq: { type: Number, default: 1000 },  // starting point
});

export const Counter = models.Counter || model("Counter", CounterSchema);
