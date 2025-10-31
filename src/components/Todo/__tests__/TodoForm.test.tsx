vi.mock("../../../context/TodoContext", () => ({
  useTodos: vi.fn(),
}));

import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { useTodos } from "../../../context/TodoContext";
import { TodoForm } from "../TodoForm";

const mockedUseTodos = vi.mocked(useTodos);

describe("TodoForm", () => {
  beforeEach(() => {
    mockedUseTodos.mockReset();
  });

  it("submits trimmed todo content and resets the form", async () => {
    const addTodo = vi.fn();
    mockedUseTodos.mockReturnValue({
      addTodo,
    } as unknown as ReturnType<typeof useTodos>);

    const user = userEvent.setup();
    render(<TodoForm />);

    const input = screen.getByPlaceholderText("What needs to be done?");
    const submitButton = screen.getByRole("button", { name: /add task/i });

    await user.type(input, "  Buy milk  ");
    await user.click(submitButton);

    expect(addTodo).toHaveBeenCalledWith("Buy milk");
    expect(input).toHaveValue("");
    expect(screen.queryByRole("alert")).not.toBeInTheDocument();
  });

  it("shows an error when submitting empty content and clears it after typing", async () => {
    const addTodo = vi.fn();
    mockedUseTodos.mockReturnValue({
      addTodo,
    } as unknown as ReturnType<typeof useTodos>);

    render(<TodoForm />);

    const form = screen.getByRole("form", { name: /add new todo/i });
    fireEvent.submit(form);

    const errorMessage = await screen.findByRole("alert");
    expect(errorMessage).toHaveTextContent("Please enter a task.");
    expect(addTodo).not.toHaveBeenCalled();

    const user = userEvent.setup();
    const input = screen.getByPlaceholderText("What needs to be done?");

    await user.type(input, "Write tests");

    expect(screen.queryByRole("alert")).not.toBeInTheDocument();
  });

  it("keeps the submit button disabled until non-empty content is provided", async () => {
    const addTodo = vi.fn();
    mockedUseTodos.mockReturnValue({
      addTodo,
    } as unknown as ReturnType<typeof useTodos>);

    const user = userEvent.setup();
    render(<TodoForm />);

    const input = screen.getByPlaceholderText("What needs to be done?");
    const submitButton = screen.getByRole("button", { name: /add task/i });

    expect(submitButton).toBeDisabled();

    await user.type(input, "   ");
    expect(submitButton).toBeDisabled();

    await user.clear(input);
    await user.type(input, "Plan roadmap");
    expect(submitButton).toBeEnabled();
  });
});
