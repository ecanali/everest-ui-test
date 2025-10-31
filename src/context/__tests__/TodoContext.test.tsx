vi.mock("../../services/todoService", () => ({
  fetchTodos: vi.fn(),
}));

import { act, render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { useEffect } from "react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { TodoProvider, useTodos } from "../TodoContext";
import { fetchTodos } from "../../services/todoService";

type TodoContextValue = ReturnType<typeof useTodos>;

const sampleTodos = [
  { id: 1, content: "Sample", checked: false },
  { id: 2, content: "Another", checked: true },
];

const mockedFetchTodos = vi.mocked(fetchTodos);

const Harness = ({
  onContext,
}: {
  onContext: (value: TodoContextValue) => void;
}) => {
  const context = useTodos();

  useEffect(() => {
    onContext(context);
  });

  return (
    <div>
      <span data-testid="status">{context.state.status}</span>
      <span data-testid="count">{context.state.todos.length}</span>
      <span data-testid="error">{context.state.error ?? ""}</span>
    </div>
  );
};

describe("TodoContext", () => {
  let contextValue: TodoContextValue | undefined;

  beforeEach(() => {
    contextValue = undefined;
    mockedFetchTodos.mockReset();
  });

  const renderWithProvider = () =>
    render(
      <TodoProvider>
        <Harness
          onContext={(ctx) => {
            contextValue = ctx;
          }}
        />
      </TodoProvider>
    );

  it("loads todos successfully and updates the state", async () => {
    mockedFetchTodos.mockResolvedValueOnce(sampleTodos);

    renderWithProvider();

    await waitFor(() => expect(contextValue).toBeDefined());
    await act(async () => {
      await contextValue!.loadTodos();
    });

    expect(screen.getByTestId("status")).toHaveTextContent("success");
    expect(screen.getByTestId("count")).toHaveTextContent(
      String(sampleTodos.length)
    );
    expect(screen.getByTestId("error")).toHaveTextContent("");
    expect(mockedFetchTodos).toHaveBeenCalledTimes(1);
  });

  it("handles load failures and exposes the error message", async () => {
    mockedFetchTodos.mockRejectedValueOnce(new Error("boom"));

    renderWithProvider();

    await waitFor(() => expect(contextValue).toBeDefined());
    await act(async () => {
      await contextValue!.loadTodos();
    });

    expect(screen.getByTestId("status")).toHaveTextContent("error");
    expect(screen.getByTestId("error")).toHaveTextContent("boom");
  });

  it("throws when useTodos is called outside of the provider", () => {
    const consoleError = vi
      .spyOn(console, "error")
      .mockImplementation(() => {});

    const Consumer = () => {
      useTodos();
      return null;
    };

    expect(() => render(<Consumer />)).toThrowError(
      "useTodos must be used within a TodoProvider"
    );

    consoleError.mockRestore();
  });
});
