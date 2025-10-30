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
            transition-all checked:bg-accent
            focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-900 hover:border-accent"
        {...props}
      />
      <svg
        className="pointer-events-none absolute left-[3px] hidden h-5 w-5 text-white peer-checked:block self-center"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 22 22"
        fill="currentColor"
        stroke="currentColor"
        strokeWidth="1"
      >
        <path
          fillRule="evenodd"
          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
          clipRule="evenodd"
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
