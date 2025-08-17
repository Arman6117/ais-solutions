import { z } from "zod";

export const pendingRequestSchema = z.object({
  studentId: z.string(),
  courseId: z.string().length(24, "Invalid course ID"),
  modules: z.array(z.object({ _id: z.string(), name: z.string() })),
  finalPrice: z.number().min(0, "Final price must be a positive number"),
});
