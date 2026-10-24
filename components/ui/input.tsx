import * as React from "react";
import { cn } from "@/lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, error, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-9 w-full rounded-md border border-border bg-surface px-3 py-1.5 text-sm text-primary transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-[#9E9E98] focus-visible:outline-none focus-visible:border-primary focus-visible:ring-1 focus-visible:ring-primary disabled:cursor-not-allowed disabled:bg-[#F2F2EC] disabled:text-[#888880]",
          error && "border-semantic-error focus-visible:ring-semantic-error focus-visible:border-semantic-error",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";
