// schemas/module.schema.ts
import { z } from "zod";

export const TopicSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
});

export const ChapterSchema = z.object({
  name: z.string().min(1),
  description: z.string().min(1),
  topics: z.array(TopicSchema),
});

export const CreateModuleSchema = z.object({
  name: z.string().min(1),
  description: z.string().min(1),
  syllabusLink: z.string().min(1).optional(),
  syllabusLabel: z.string().min(1).optional(),
  price: z.number().min(1),
  discount: z.number().min(0).max(100),

  chapters: z.array(ChapterSchema).optional().default([]),
});

export type CreateModuleInput = z.infer<typeof CreateModuleSchema>;
