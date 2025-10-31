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

        <div className="text-center py-16 animate-fade-in-scale">
          <svg
            className="w-20 h-20 mx-auto text-gray-600 mb-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
            />
          </svg>
          <p className="text-xl text-gray-400 font-medium">No tasks yet</p>
          <p className="text-gray-500 mt-2">
            Add your first task to get started!
          </p>
        </div>
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

      <ul
        className="w-full space-y-3 mt-6 [overflow-anchor:none]"
        aria-label="Todo items"
      >
        {sortedTodos.map((todo) => (
          <TodoItem key={todo.id} todo={todo} />
        ))}
      </ul>
    </>
  );
};
