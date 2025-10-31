import React, { useState } from "react";
import { useTodos } from "../../context/useTodos";
import { Button } from "../ui/Button";
import { Input } from "../ui/Input";

export const TodoForm = () => {
  const [content, setContent] = useState("");
  const [error, setError] = useState<string | undefined>(undefined);
  const { addTodo } = useTodos();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const trimmedContent = content.trim();

    if (!trimmedContent) {
      setError("Please enter a task.");
      return;
    }

    addTodo(trimmedContent);
    setContent("");
    setError(undefined);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setContent(e.target.value);
    if (error && e.target.value.trim()) {
      setError(undefined);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex w-full flex-col gap-2 sm:flex-row"
      aria-label="Add new todo"
    >
      <Input
        id="new-todo-input"
        label="New task content"
        value={content}
        onChange={handleChange}
        placeholder="What needs to be done?"
        className={`w-full px-4 py-3 bg-muted-foreground text-white placeholder-gray-400 rounded-lg border-2 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent ${
          error
            ? "border-red-500 focus:ring-red-500"
            : "border-gray-700 hover:border-gray-600"
        }`}
        error={error}
        aria-invalid={!!error}
      />
      <Button
        type="submit"
        disabled={!content.trim()}
        className="sm:w-32 shadow-lg"
      >
        Add Task
      </Button>
    </form>
  );
};
