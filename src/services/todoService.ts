import { todoEntrySchema, apiResponseSchema } from "../lib/schemas";
import type { TodoEntry } from "../types";

const API_URL =
  "https://everest-interview-public-files.s3.amazonaws.com/input.json";

export async function fetchTodos(): Promise<TodoEntry[]> {
  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error("Failed to fetch todos");
  }

  const data: unknown = await response.json();

  const apiCheck = apiResponseSchema.safeParse(data);
  if (!apiCheck.success) {
    console.error(
      'API response was not in the expected format { "todos": [...] }:',
      apiCheck.error.flatten()
    );
    return [];
  }

  const validTodos: TodoEntry[] = [];
  const seenIds = new Set<number>();

  apiCheck.data.todos.forEach((item: unknown, index: number) => {
    const itemCheck = todoEntrySchema.safeParse(item);

    if (!itemCheck.success) {
      console.warn(
        `Discarding invalid todo item at index ${index} (schema failure):`,
        itemCheck.error.flatten()
      );
      return;
    }

    const { id } = itemCheck.data;
    if (seenIds.has(id)) {
      console.warn(
        `Discarding invalid todo item at index ${index} (duplicate ID ${id}):`,
        itemCheck.data
      );
      return;
    }

    seenIds.add(id);
    validTodos.push(itemCheck.data);
  });

  return validTodos;
}
