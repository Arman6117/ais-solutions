import { z } from "zod";
export const sessionSchema = z.object({
  courseName: z.string().min(1, "Course name is required"),
  modules: z.array(z.string().min(1, "Module is required")),
  chapters: z.array(z.string().min(1, "Chapter is required")),
  instructor: z.string().optional(),
  title: z.string().min(1, "Title is required"),
  date: z.date(),
  time: z.string().min(1, "Time is required"),
});
export const updateSessionSchema = z.object({
  
  courseName: z.string().min(1, "Course name is required").optional(),
  modules: z.array(z.string().min(1, "Module is required")).optional(),
  chapters: z.array(z.string().min(1, "Chapter is required")).optional(),
  instructor: z.string().optional(),
  title: z.string().min(1, "Title is required").optional(),
  date: z.date().optional(),
  time: z.string().min(1, "Time is required").optional(),
  notes: z.string().optional(),
  videoLink: z.string().url("Invalid video link").optional(),
});
