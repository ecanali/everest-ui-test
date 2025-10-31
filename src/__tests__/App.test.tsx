import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import { beforeEach, describe, expect, it, vi } from "vitest";
import App from "../App";
import { TodoProvider } from "../context/TodoContext";
import { fetchTodos } from "../services/todoService";

vi.mock("../services/todoService", () => ({
  fetchTodos: vi.fn(),
}));

const renderApp = () => {
  render(
    <TodoProvider>
      <App />
    </TodoProvider>
  );
};

const mockTodos = [
  { id: 1, content: "Organized my tasks", checked: true },
  { id: 2, content: "Meditated", checked: false },
  { id: 3, content: "Worked out", checked: true },
  { id: 4, content: "Completed project proposal", checked: false },
  { id: 5, content: "Reviewed code", checked: true },
  { id: 6, content: "Attended team meeting", checked: false },
  { id: 7, content: "Read a book", checked: true },
  { id: 8, content: "Updated my resume", checked: false },
  { id: 9, content: "Went grocery shopping", checked: true },
  { id: 10, content: "Cooked dinner", checked: false },
  { id: 11, content: "Watered the plants", checked: true },
  { id: 12, content: "Called family", checked: false },
  { id: 13, content: "Cleaned the house", checked: true },
  { id: 15, content: "Finished online course", checked: false },
];

const mockedFetchTodos = vi.mocked(fetchTodos);

beforeEach(() => {
  mockedFetchTodos.mockReset();
  mockedFetchTodos.mockResolvedValue(mockTodos.map((todo) => ({ ...todo })));
});

describe("Todo App Integration Test (Dirty Data)", () => {
  it("should load and display only valid todos from API", async () => {
    renderApp();

    expect(screen.getByLabelText("Loading...")).toBeInTheDocument();

    expect(await screen.findByText("Meditated")).toBeInTheDocument();
    expect(screen.getByText("Organized my tasks")).toBeInTheDocument();

    expect(
      screen.queryByText("Planned next week's schedule")
    ).not.toBeInTheDocument();
    expect(screen.getAllByText("Completed project proposal")).toHaveLength(1);

    const listItems = screen.getAllByRole("listitem");
    expect(listItems.length).toBe(14);
  });

  it("should sort todos with unchecked items first", async () => {
    renderApp();

    await screen.findByText("Meditated");

    const listItems = screen.getAllByRole("listitem");
    const itemTexts = listItems.map((item) => item.textContent);

    expect(itemTexts[0]).toContain("Meditated");
    expect(itemTexts[1]).toContain("Completed project proposal");
    expect(itemTexts[2]).toContain("Attended team meeting");
    expect(itemTexts[3]).toContain("Updated my resume");
    expect(itemTexts[4]).toContain("Cooked dinner");
    expect(itemTexts[5]).toContain("Called family");
    expect(itemTexts[6]).toContain("Finished online course");

    expect(itemTexts[7]).toContain("Organized my tasks");
    expect(itemTexts[8]).toContain("Worked out");
  });

  it("should allow user to add a new todo", async () => {
    const user = userEvent.setup();
    renderApp();
    await screen.findByText("Meditated");

    const input = screen.getByPlaceholderText("What needs to be done?");
    const addButton = screen.getByRole("button", { name: /Add Task/i });

    await user.type(input, "New test task");
    await user.click(addButton);

    const listItems = screen.getAllByRole("listitem");
    expect(listItems[0]).toHaveTextContent("New test task");
    expect(listItems.length).toBe(15);
    expect(input).toHaveValue("");
  });

  it("should allow user to check an item, moving it to the bottom", async () => {
    const user = userEvent.setup();
    renderApp();
    await screen.findByText("Meditated");

    const checkbox = screen.getByRole("checkbox", { name: "Meditated" });

    let listItems = screen.getAllByRole("listitem");
    expect(listItems[0]).toHaveTextContent("Meditated");

    await user.click(checkbox);

    listItems = screen.getAllByRole("listitem");
    const itemTexts = listItems.map((item) => item.textContent || "");
    const meditatedIndex = itemTexts.findIndex((text) =>
      text.includes("Meditated")
    );
    expect(meditatedIndex).toBeGreaterThanOrEqual(6);
    expect(screen.getByRole("checkbox", { name: "Meditated" })).toBeChecked();
  });

  it("should allow user to remove an item", async () => {
    const user = userEvent.setup();
    renderApp();
    await screen.findByText("Meditated");

    const todoContent = "Attended team meeting";
    expect(screen.getByText(todoContent)).toBeInTheDocument();

    expect(screen.getAllByRole("listitem").length).toBe(14);

    const deleteButton = screen.getByRole("button", {
      name: `Delete task: ${todoContent}`,
    });

    await user.click(deleteButton);

    expect(screen.queryByText(todoContent)).not.toBeInTheDocument();

    expect(screen.getAllByRole("listitem").length).toBe(13);
  });

  it("shows API error messages when the initial load fails", async () => {
    mockedFetchTodos.mockRejectedValueOnce(new Error("API offline"));

    renderApp();

    const alert = await screen.findByRole("alert");
    expect(alert).toHaveTextContent("API offline");
  });

  it("falls back to generic error copy when API error is empty", async () => {
    const emptyError = new Error("");
    mockedFetchTodos.mockRejectedValueOnce(emptyError);

    renderApp();

    const alert = await screen.findByRole("alert");
    expect(alert).toHaveTextContent("Failed to load tasks.");
  });
});
