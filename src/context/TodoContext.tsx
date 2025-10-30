import {
  createContext,
  useReducer,
  useContext,
  useCallback,
  ReactNode,
} from "react";
import { todoReducer, initialState, TodoState } from "../reducers/todoReducer";
import { fetchTodos } from "../services/todoService";

interface TodoContextType {
  state: TodoState;
  loadTodos: () => Promise<void>;
  addTodo: (content: string) => void;
  removeTodo: (id: number) => void;
  toggleTodo: (id: number) => void;
}

const TodoContext = createContext<TodoContextType | undefined>(undefined);

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

  const addTodo = useCallback((content: string) => {
    dispatch({ type: "ADD_TODO", payload: content });
  }, []);

  const removeTodo = useCallback((id: number) => {
    dispatch({ type: "REMOVE_TODO", payload: id });
  }, []);

  const toggleTodo = useCallback((id: number) => {
    dispatch({ type: "TOGGLE_TODO", payload: id });
  }, []);

  const value = {
    state,
    loadTodos,
    addTodo,
    removeTodo,
    toggleTodo,
  };

  return <TodoContext.Provider value={value}>{children}</TodoContext.Provider>;
};

export const useTodos = () => {
  const context = useContext(TodoContext);
  if (context === undefined) {
    throw new Error("useTodos must be used within a TodoProvider");
  }
  return context;
};
