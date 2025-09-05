import { Schema, model, models } from "mongoose";

const courseDetailsSchema = new Schema(
  {
    courseId: { type: Schema.Types.ObjectId, ref: "Course", required: true },
    modules: [{ type: Schema.Types.ObjectId, required: true, ref:"Module" }],
    totalFees: { type: Number, required: true },
    remainingFees: { type: Number, required: true },
    amountPaid: { type: Number, required: true },
    dueDate: { type: String },
    status: {
      type: String,
      enum: ["Due", "Paid", "Overdue", "Partially Paid"],
      required: true,
    },

    mode: {
      type: String,
      enum: ["offline", "hybrid", "online"],
      required: true,
    },
  },
  { _id: false }
);

const paymentHistorySchema = new Schema({
  amount: { type: Number, required: true },
  courseName: { type: String, required: true },
  modules: [{ type: Schema.Types.ObjectId, required: true, ref:"Module" }],
  totalFees: { type: Number, required: true },
  dueDate: { type: String },
  notes: { type: String },
  mode: {
    type: String,
    enum: ["UPI", "Cash", "Card", "Other"],
    required: true,
  },
});
const invoiceSchema = new Schema({
  studentId: { type: String, required: true },
  totalFees: { type: Number, required: true },
  remainingFees: { type: Number, required: true },
  amountPaid: { type: Number, required: true },
  courseDetails: [courseDetailsSchema],
  paymentHistory: [paymentHistorySchema],
  status: {
    type: String,
    enum: ["Due", "Paid", "Overdue", "Partially Paid"],
    required: true,
  },
});

export const Invoice = models.Invoice || model("Invoice", invoiceSchema);
