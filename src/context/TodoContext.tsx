import { createContext, ReactNode, useReducer, useCallback } from "react";
import {
  todoReducer,
  initialState,
  type TodoState,
} from "../reducers/todoReducer";
import { fetchTodos } from "../services/todoService";

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

interface TodoProviderProps {
  children: ReactNode;
}

export const TodoProvider = ({ children }: TodoProviderProps) => {
  const [state, dispatch] = useReducer(todoReducer, initialState);

  const loadTodos = useCallback(async () => {
    dispatch({ type: "SET_LOADING" });
    try {
      const todos = await fetchTodos();
      dispatch({ type: "SET_TODOS_SUCCESS", payload: todos });
    } catch (err) {
      dispatch({ type: "SET_ERROR", payload: (err as Error).message });
    }
  }, []);

  const addTodo = (content: string) => {
    dispatch({ type: "ADD_TODO", payload: content });
  };

  const removeTodo = (id: number) => {
    dispatch({ type: "REMOVE_TODO", payload: id });
  };

  const toggleTodo = (id: number) => {
    dispatch({ type: "TOGGLE_TODO", payload: id });
  };

  const value: TodoContextValue = {
    state,
    loadTodos,
    addTodo,
    removeTodo,
    toggleTodo,
  };

  return <TodoContext.Provider value={value}>{children}</TodoContext.Provider>;
};
