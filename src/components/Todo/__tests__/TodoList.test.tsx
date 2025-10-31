vi.mock("../../../context/useTodos", () => ({
  useTodos: vi.fn(),
}));

import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { useTodos } from "../../../context/useTodos";
import { TodoList } from "../TodoList";

const mockedUseTodos = vi.mocked(useTodos);

const createContextValue = (
  todos: Array<{ id: number; content: string; checked: boolean }>
) => ({
  state: { todos },
  loadTodos: vi.fn(),
  addTodo: vi.fn(),
  removeTodo: vi.fn(),
  toggleTodo: vi.fn(),
});

describe("TodoList", () => {
  beforeEach(() => {
    mockedUseTodos.mockReset();
  });

  it("renders empty state message and zero counts when there are no todos", () => {
    mockedUseTodos.mockReturnValue(
      createContextValue([]) as unknown as ReturnType<typeof useTodos>
    );

    render(<TodoList />);

    expect(screen.getByText("No tasks yet")).toBeInTheDocument();
    expect(
      screen.getByText("Add your first task to get started!")
    ).toBeInTheDocument();

    const totalLabel = screen.getByText("Total");
    expect(totalLabel.nextElementSibling).toHaveTextContent("0");

    const activeLabel = screen.getByText("Active");
    expect(activeLabel.nextElementSibling).toHaveTextContent("0");

    const completedLabel = screen.getByText("Completed");
    expect(completedLabel.nextElementSibling).toHaveTextContent("0");
  });

  it("sorts todos with incomplete items first and updates counts", () => {
    const todos = [
      { id: 1, content: "Done task", checked: true },
      { id: 2, content: "First pending", checked: false },
      { id: 3, content: "Second pending", checked: false },
    ];

    mockedUseTodos.mockReturnValue(
      createContextValue(todos) as unknown as ReturnType<typeof useTodos>
    );

    render(<TodoList />);

    const listItems = screen.getAllByRole("listitem");
    expect(listItems).toHaveLength(3);
    expect(listItems[0]).toHaveTextContent("First pending");
    expect(listItems[1]).toHaveTextContent("Second pending");
    expect(listItems[2]).toHaveTextContent("Done task");

    const totalLabel = screen.getByText("Total");
    expect(totalLabel.nextElementSibling).toHaveTextContent("3");

    const activeLabel = screen.getByText("Active");
    expect(activeLabel.nextElementSibling).toHaveTextContent("2");

    const completedLabel = screen.getByText("Completed");
    expect(completedLabel.nextElementSibling).toHaveTextContent("1");
  });
});
