import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { describe, expect, it } from "vitest";
import MemoizedTodoSummary, { TodoSummary } from "../TodoSummary";

describe("TodoSummary", () => {
  it("displays the provided totals", () => {
    render(<TodoSummary total={5} active={3} completed={2} />);

    const totalLabel = screen.getByText("Total");
    expect(totalLabel.nextElementSibling).toHaveTextContent("5");

    const activeLabel = screen.getByText("Active");
    expect(activeLabel.nextElementSibling).toHaveTextContent("3");

    const completedLabel = screen.getByText("Completed");
    expect(completedLabel.nextElementSibling).toHaveTextContent("2");
  });

  it("applies additional class names on the wrapper", () => {
    render(
      <MemoizedTodoSummary
        total={1}
        active={1}
        completed={0}
        className="border"
      />
    );

    const outerWrapper = screen.getByText("Total").closest("div")?.parentElement
      ?.parentElement as HTMLElement;

    expect(outerWrapper).toHaveClass("border");
  });
});
