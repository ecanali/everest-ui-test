import React from "react";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "danger" | "icon";
};

export const Button = ({
  children,
  variant = "primary",
  className = "",
  ...props
}: ButtonProps) => {
  const baseStyle =
    "flex items-center justify-center rounded-md font-medium transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-900 disabled:opacity-50 disabled:cursor-not-allowed";

  const variants = {
    primary:
      "bg-accent px-5 py-3 text-white hover:brightness-80 focus-visible:ring-accent",
    danger:
      "bg-red-600 px-3 py-1 text-xs text-white hover:brightness-80 focus-visible:ring-red-600",
    icon: "text-gray-500 hover:brightness-80 focus-visible:ring-gray-500 rounded-full p-2",
  };

  return (
    <button
      className={`${baseStyle} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
