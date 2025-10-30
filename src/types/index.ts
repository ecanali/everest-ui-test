import { z } from "zod";
import { todoEntrySchema } from "../lib/schemas";

export type TodoEntry = z.infer<typeof todoEntrySchema>;

export type LoadingStatus = "idle" | "loading" | "success" | "error";
