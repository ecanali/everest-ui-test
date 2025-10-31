import { forwardRef } from "react";
import type { InputHTMLAttributes } from "react";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  error?: string;
};

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, id, error, ...props }, ref) => {
    const { ["aria-describedby"]: ariaDescribedBy, ...rest } = props;
    const errorId = error && id ? `${id}-error` : undefined;
    const describedBy =
      [ariaDescribedBy, errorId].filter(Boolean).join(" ").trim() || undefined;

    return (
      <div className="w-full">
        <label htmlFor={id} className="sr-only">
          {label}
        </label>
        <input
          ref={ref}
          id={id}
          className={`w-full rounded-md border-2 bg-gray-800 px-4 py-3 text-gray-100 placeholder-gray-500 transition-colors
          ${
            error
              ? "border-red-500 focus:border-red-500 focus:ring-red-500"
              : "border-gray-700 focus:border-blue-500 focus:ring-blue-500"
          }
          focus:outline-none focus:ring-2`}
          aria-describedby={describedBy}
          {...rest}
        />
        {error && (
          <p id={errorId} role="alert" className="mt-1 text-sm text-red-400">
            {error}
          </p>
        )}
      </div>
    );
  }
);
