import React from "react";
import type { FC, PropsWithChildren } from "react";

type TodoSummaryProps = PropsWithChildren<{
  total: number;
  active: number;
  completed: number;
  className?: string;
}>;

export const TodoSummary: FC<TodoSummaryProps> = ({
  total,
  active,
  completed,
  className = "",
}) => {
  return (
    <div
      className={`flex items-center justify-between px-4 py-3 bg-muted-foreground rounded-lg ${className}`}
    >
      <div className="flex items-center gap-3 sm:gap-6">
        <div>
          <p className="text-sm text-gray-400">Total</p>
          <p className="text-2xl font-bold text-white">{total}</p>
        </div>

        <div
          className="h-10 w-px bg-gray-700"
          role="separator"
          aria-hidden="true"
        ></div>

        <div>
          <p className="text-sm text-gray-400">Active</p>
          <p className="text-2xl font-bold text-accent">{active}</p>
        </div>

        <div
          className="h-10 w-px bg-gray-700"
          role="separator"
          aria-hidden="true"
        ></div>

        <div>
          <p className="text-sm text-gray-400">Completed</p>
          <p className="text-2xl font-bold text-green-400">{completed}</p>
        </div>
      </div>
    </div>
  );
};

const MemoizedTodoSummary = React.memo(TodoSummary);
MemoizedTodoSummary.displayName = "MemoizedTodoSummary";
export default MemoizedTodoSummary;
