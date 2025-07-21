import { z } from "zod";

export const batchSchema = z.object({
  name: z.string().min(1),
  description: z.string().min(1),
  startDate: z.string().min(1),
  endDate: z.string().min(1),
  groupLink: z.string().url(),
  status: z.enum(["upcoming", "ongoing", "completed"]),
  mode: z.enum(["offline", "hybrid", "online"]),
  type: z.enum(["weekdays", "weekend"]),

  courseId: z.string().length(24, "Invalid course ID"),

  
  instructors: z.any().optional(),
  meetings: z.any().optional(),
  modules: z.any().optional(),
  notes: z.any().optional(),
  students: z.any().optional(),
});
