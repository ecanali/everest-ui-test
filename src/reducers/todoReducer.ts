import type { TodoEntry, LoadingStatus } from "../types";

export interface TodoState {
  todos: TodoEntry[];
  status: LoadingStatus;
  error: string | null;
}

export type TodoAction =
  | { type: "SET_LOADING" }
  | { type: "SET_TODOS_SUCCESS"; payload: TodoEntry[] }
  | { type: "SET_ERROR"; payload: string }
  | { type: "ADD_TODO"; payload: string }
  | { type: "REMOVE_TODO"; payload: number }
  | { type: "TOGGLE_TODO"; payload: number };

export const initialState: TodoState = {
  todos: [],
  status: "idle",
  error: null,
};

export function todoReducer(state: TodoState, action: TodoAction): TodoState {
  switch (action.type) {
    case "SET_LOADING":
      return {
        ...state,
        status: "loading",
        error: null,
      };

    case "SET_TODOS_SUCCESS":
      return {
        ...state,
        status: "success",
        todos: action.payload,
      };

    case "SET_ERROR":
      return {
        ...state,
        status: "error",
        error: action.payload,
      };

    case "ADD_TODO": {
      const newTodo: TodoEntry = {
        id: Date.now(),
        content: action.payload,
        checked: false,
      };
      return {
        ...state,
        todos: [newTodo, ...state.todos],
      };
    }

    case "REMOVE_TODO":
      return {
        ...state,
        todos: state.todos.filter((todo) => todo.id !== action.payload),
      };

    case "TOGGLE_TODO":
      return {
        ...state,
        todos: state.todos.map((todo) =>
          todo.id === action.payload
            ? { ...todo, checked: !todo.checked }
            : todo
        ),
      };

    default:
      return state;
  }
}
