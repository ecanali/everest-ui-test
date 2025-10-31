import { useState } from "react";
import { useTodos } from "../../context/TodoContext";
import type { TodoEntry } from "../../types";
import { Button } from "../ui/Button";
import { Checkbox } from "../ui/Checkbox";

const TrashIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 20 20"
    fill="currentColor"
    className="h-5 w-5"
  >
    <path
      fillRule="evenodd"
      d="M8.75 1A2.75 2.75 0 006 3.75v.443c-.795.077-1.584.176-2.365.298a.75.75 0 10.23 1.482l.149-.022.841 10.518A2.75 2.75 0 007.596 19h4.807a2.75 2.75 0 002.742-2.53l.841-10.52.149.023a.75.75 0 00.23-1.482A41.03 41.03 0 0014 4.193V3.75A2.75 2.75 0 0011.25 1h-2.5zM10 4c.84 0 1.673.025 2.5.075V3.75a1.25 1.25 0 00-1.25-1.25h-2.5A1.25 1.25 0 007.5 3.75v.325C8.327 4.025 9.16 4 10 4zM8.58 7.72a.75.75 0 00-1.5.06l.3 7.5a.75.75 0 101.5-.06l-.3-7.5zm4.34.06a.75.75 0 10-1.5-.06l-.3 7.5a.75.75 0 101.5.06l.3-7.5z"
      clipRule="evenodd"
    />
  </svg>
);

interface TodoItemProps {
  todo: TodoEntry;
}

export const TodoItem = ({ todo }: TodoItemProps) => {
  const { removeTodo, toggleTodo } = useTodos();
  const [isRemoving, setIsRemoving] = useState(false);
  const [hasEntered, setHasEntered] = useState(false);

  const handleAnimationEnd = () => {
    if (!hasEntered) {
      setHasEntered(true);
    }

    if (isRemoving) {
      removeTodo(todo.id);
    }
  };

  const handleDelete = () => {
    if (isRemoving) return;
    setIsRemoving(true);
  };

  const handleToggle = () => {
    if (isRemoving) return;
    toggleTodo(todo.id);
  };

  const checkboxId = `todo-${todo.id}`;
  const entryClass = hasEntered ? "" : "animate-fade-in-up";
  const exitClass = isRemoving
    ? "pointer-events-none animate-slide-out"
    : entryClass;

  return (
    <li
      className={`flex items-center justify-between rounded-lg bg-accent-foreground p-4 shadow-md transition-opacity ${exitClass}`}
      aria-label={todo.content}
      onAnimationEnd={handleAnimationEnd}
    >
      <Checkbox
        id={checkboxId}
        label={todo.content}
        checked={todo.checked}
        onChange={handleToggle}
        disabled={isRemoving}
      />
      <Button
        variant="icon"
        onClick={handleDelete}
        aria-label={`Delete task: ${todo.content}`}
        disabled={isRemoving}
      >
        <TrashIcon />
      </Button>
    </li>
  );
};
