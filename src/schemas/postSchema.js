import { z } from "zod";

export const postSchema = z.object({
  title: z.string().trim().min(1),
  content: z.string().trim().min(1),
});