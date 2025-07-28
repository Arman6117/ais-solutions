import { z } from "zod";

export const courseDetailsSchema = z.object({
  courseId: z.string().min(1), 
  batchName: z.string().min(1),
  modules: z.array(z.object({ name: z.string().min(1) })),
  totalFees: z.number().nonnegative(),
  remainingFees: z.number().nonnegative(),
  amountPaid: z.number().nonnegative(),
  dueDate: z.string().optional(), 
  mode: z.enum(["offline", "hybrid", "online"]),
});

export const paymentHistorySchema = z.object({
  amount: z.number().nonnegative(),
  courseName: z.string().min(1),
  modules: z.array(z.string().min(1)),
  dueDate: z.string().optional(),
  notes: z.string().optional(),
  mode: z.enum(["UPI", "Cash", "Card", "Other"]),
});

export const invoiceSchema = z.object({
  studentId: z.string().min(1), // Mongo ObjectId as string
  totalFees: z.number().nonnegative(),
  remainingFees: z.number().nonnegative(),
  amountPaid: z.number().nonnegative(),
  courseDetails: z.array(courseDetailsSchema).optional(),
  paymentHistory: z.array(paymentHistorySchema).optional(),
});
