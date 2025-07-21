import { z } from "zod";

export const batchSchema = z.object({
  name: z.string().min(1),
  description: z.string().min(1),
  startDate: z.string().min(1),
  endDate: z.string().min(1),
  groupLink: z.string().url(),
  status: z.enum(["Upcoming", "Ongoing", "Completed"]),
  mode: z.enum(["offline", "hybrid", "online"]),
  type: z.enum(["weekdays", "weekend"]),

  courseId: z.string().length(24, "Invalid course ID"),
  modules:z.array(z.object({_id:z.string(), name:z.string()})),

  

});
