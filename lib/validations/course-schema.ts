import { z } from "zod";

export const courseSchema = z.object({
  courseName: z.string().min(3),
  courseDescription: z.string().min(10),
  syllabusLink: z.string().url().optional(),
  courseThumbnail: z.string().url(),
  coursePrice: z.number().nonnegative(),
  courseDiscount: z.number().min(0).max(100).optional(),
  courseOfferPrice: z.number().nonnegative(),
  courseStartDate: z.string(),
  courseEndDate: z.string(),
  courseMode: z.enum(["online", "offline", "hybrid"]),
  courseLevel: z.enum(["beginner", "intermediate", "advanced"]),
  modules: z.array(z.string()).optional(), // array of module IDs
});
