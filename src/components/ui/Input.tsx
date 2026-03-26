"use client";

import { forwardRef } from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  status?: "default" | "correct" | "incorrect";
}

const statusStyles = {
  default: "border-border focus:border-primary focus:ring-primary/30",
  correct: "border-success bg-success-light focus:border-success focus:ring-success/30",
  incorrect: "border-danger bg-danger-light focus:border-danger focus:ring-danger/30",
};

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ status = "default", className = "", ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={`w-full rounded-lg border px-3 py-2 text-sm transition-colors focus:outline-none focus:ring-2 ${statusStyles[status]} ${status === "incorrect" ? "animate-shake" : ""} ${className}`}
        {...props}
      />
    );
  }
);

Input.displayName = "Input";
export default Input;
