import { z } from "zod";
export const sessionSchema = z.object({
  meetingName: z.string().min(1, "Meeting name is required"),
  meetingLink: z.string().min(1, "Meeting link is required"),
  modules:z.string().min(1, "Module is required"),
  chapters: z.array(z.string().min(1, "Chapter is required")),
  instructor: z.string().optional(),
  date: z.date(),
  time: z.string().min(1, "Time is required"),
});
export const updateSessionSchema = z.object({
  
  meetingName: z.string().min(1, "Course name is required").optional(),
  modules: z.string().min(1, "Module is required").optional(),
  chapters: z.array(z.string().min(1, "Chapter is required")).optional(),
  instructor: z.string().optional(),
  meetingLink: z.string().min(1, "Meeting link is required").optional(),
  date: z.date().optional(),
  time: z.string().min(1, "Time is required").optional(),

});
