import { createContext } from "react";
import type { TodoState } from "../reducers/todoReducer";

export interface TodoContextValue {
  state: TodoState;
  loadTodos: () => Promise<void>;
  addTodo: (content: string) => void;
  removeTodo: (id: number) => void;
  toggleTodo: (id: number) => void;
}

export const TodoContext = createContext<TodoContextValue | undefined>(
  undefined
);
