import { describe, expect, it, afterEach, vi } from "vitest";
import {
  todoReducer,
  initialState,
  TodoState,
  TodoAction,
} from "../todoReducer";

describe("todoReducer", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("returns loading state and clears error", () => {
    const baseState: TodoState = {
      ...initialState,
      status: "error",
      error: "Something went wrong",
    };

    const result = todoReducer(baseState, { type: "SET_LOADING" });

    expect(result.status).toBe("loading");
    expect(result.error).toBeNull();
    expect(result.todos).toBe(baseState.todos);
  });

  it("stores fetched todos on success", () => {
    const todos = [
      { id: 1, content: "First", checked: false },
      { id: 2, content: "Second", checked: true },
    ];

    const result = todoReducer(initialState, {
      type: "SET_TODOS_SUCCESS",
      payload: todos,
    });

    expect(result.status).toBe("success");
    expect(result.todos).toEqual(todos);
    expect(result.error).toBeNull();
  });

  it("keeps the error message when a load fails", () => {
    const result = todoReducer(initialState, {
      type: "SET_ERROR",
      payload: "Network down",
    });

    expect(result.status).toBe("error");
    expect(result.error).toBe("Network down");
  });

  it("adds a new todo at the beginning", () => {
    const mockNow = vi.spyOn(Date, "now").mockReturnValue(42);

    const preloaded: TodoState = {
      ...initialState,
      todos: [{ id: 1, content: "Existing", checked: true }],
    };

    const result = todoReducer(preloaded, {
      type: "ADD_TODO",
      payload: "New task",
    });

    expect(result.todos).toHaveLength(2);
    expect(result.todos[0]).toEqual({
      id: 42,
      content: "New task",
      checked: false,
    });
    expect(result.todos[1]).toEqual(preloaded.todos[0]);

    mockNow.mockRestore();
  });

  it("removes a todo by id", () => {
    const preloaded: TodoState = {
      ...initialState,
      todos: [
        { id: 1, content: "First", checked: false },
        { id: 2, content: "Second", checked: true },
      ],
    };

    const result = todoReducer(preloaded, {
      type: "REMOVE_TODO",
      payload: 1,
    });

    expect(result.todos).toEqual([{ id: 2, content: "Second", checked: true }]);
  });

  it("toggles the completed state of the specified todo", () => {
    const preloaded: TodoState = {
      ...initialState,
      todos: [
        { id: 1, content: "First", checked: false },
        { id: 2, content: "Second", checked: true },
      ],
    };

    const result = todoReducer(preloaded, {
      type: "TOGGLE_TODO",
      payload: 1,
    });

    expect(result.todos).toEqual([
      { id: 1, content: "First", checked: true },
      preloaded.todos[1],
    ]);
  });

  it("returns the current state when action type is unknown", () => {
    const preloaded: TodoState = {
      ...initialState,
      status: "success",
      todos: [{ id: 1, content: "First", checked: false }],
    };

    const unknownAction = { type: "UNKNOWN" } as unknown as TodoAction;
    const result = todoReducer(preloaded, unknownAction);

    expect(result).toBe(preloaded);
  });
});
