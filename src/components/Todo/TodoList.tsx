import { useMemo } from "react";
import { useTodos } from "../../context/TodoContext";
import { TodoItem } from "./TodoItem";
import TodoSummary from "./TodoSummary";
import type { TodoEntry } from "../../types";

export const TodoList = () => {
  const { state } = useTodos();
  const { todos } = state;

  const sortedTodos = useMemo(() => {
    return [...todos].sort((a: TodoEntry, b: TodoEntry) => {
      if (a.checked === b.checked) return 0;
      return a.checked ? 1 : -1;
    });
  }, [todos]);

  const incompleteTodos = todos.filter((todo) => !todo.checked);
  const completedTodos = todos.filter((todo) => todo.checked);

  if (todos.length === 0) {
    return (
      <>
        <TodoSummary
          total={todos.length}
          active={incompleteTodos.length}
          completed={completedTodos.length}
        />

        <p className="py-8 text-center text-gray-500">
          Your list is empty. Add a task to get started!
        </p>
      </>
    );
  }

  return (
    <>
      <TodoSummary
        total={todos.length}
        active={incompleteTodos.length}
        completed={completedTodos.length}
      />

      <ul className="w-full space-y-3 mt-6" aria-label="Todo items">
        {sortedTodos.map((todo) => (
          <TodoItem key={todo.id} todo={todo} />
        ))}
      </ul>
    </>
  );
};
