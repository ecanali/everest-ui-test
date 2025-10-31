vi.mock("../../../context/TodoContext", () => ({
  useTodos: vi.fn(),
}));

import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { useTodos } from "../../../context/TodoContext";
import { TodoItem } from "../TodoItem";

const mockedUseTodos = vi.mocked(useTodos);

const baseTodo = {
  id: 1,
  content: "Test todo",
  checked: false,
};

describe("TodoItem", () => {
  beforeEach(() => {
    mockedUseTodos.mockReset();
  });

  it("renders the todo content and unchecked checkbox", () => {
    mockedUseTodos.mockReturnValue({
      toggleTodo: vi.fn(),
      removeTodo: vi.fn(),
    } as unknown as ReturnType<typeof useTodos>);

    render(<TodoItem todo={baseTodo} />);

    const checkbox = screen.getByRole("checkbox", { name: baseTodo.content });
    expect(checkbox).toBeInTheDocument();
    expect(checkbox).not.toBeChecked();

    const deleteButton = screen.getByRole("button", {
      name: `Delete task: ${baseTodo.content}`,
    });
    expect(deleteButton).toBeInTheDocument();
  });

  it("calls toggleTodo when the checkbox is clicked", async () => {
    const toggleTodo = vi.fn();
    mockedUseTodos.mockReturnValue({
      toggleTodo,
      removeTodo: vi.fn(),
    } as unknown as ReturnType<typeof useTodos>);

    const user = userEvent.setup();
    render(<TodoItem todo={baseTodo} />);

    const checkbox = screen.getByRole("checkbox", { name: baseTodo.content });
    await user.click(checkbox);

    expect(toggleTodo).toHaveBeenCalledWith(baseTodo.id);
  });

  it("calls removeTodo when the delete button is pressed", async () => {
    const removeTodo = vi.fn();
    mockedUseTodos.mockReturnValue({
      toggleTodo: vi.fn(),
      removeTodo,
    } as unknown as ReturnType<typeof useTodos>);

    const user = userEvent.setup();
    render(<TodoItem todo={baseTodo} />);

    const deleteButton = screen.getByRole("button", {
      name: `Delete task: ${baseTodo.content}`,
    });
    await user.click(deleteButton);

    await waitFor(() => expect(deleteButton).toBeDisabled());

    const todoItem = screen.getByRole("listitem", { name: baseTodo.content });
    fireEvent.animationEnd(todoItem, { animationName: "slideOut" });

    expect(removeTodo).toHaveBeenCalledWith(baseTodo.id);
  });
});
