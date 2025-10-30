import { z } from "zod";

export const todoEntrySchema = z.object({
  id: z.number().int(),
  content: z.string().min(1, "Content cannot be empty"),
  checked: z.boolean(),
});

export const apiResponseSchema = z.object({
  todos: z.array(z.unknown()),
});
