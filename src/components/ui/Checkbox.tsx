import React from "react";

type CheckboxProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label: string;
};

export const Checkbox = ({
  id,
  label,
  className = "",
  ...props
}: CheckboxProps) => {
  return (
    <div className="relative flex items-center">
      <input
        id={id}
        type="checkbox"
        className="peer h-6 w-6 shrink-0 cursor-pointer appearance-none rounded-md border-2 border-gray-600 bg-muted-foreground
            transition-shadow duration-150 checked:bg-accent
            focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-900 hover:border-accent"
        {...props}
      />
      <svg
        className={`w-4 h-4 text-white absolute left-1 hidden peer-checked:block`}
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={3}
          d="M5 13l4 4L19 7"
        />
      </svg>
      <label
        htmlFor={id}
        className={`ml-3 cursor-pointer text-lg text-gray-200 transition-colors peer-checked:text-gray-500 peer-checked:line-through ${className}`}
      >
        {label}
      </label>
    </div>
  );
};
