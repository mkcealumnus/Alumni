import * as React from "react";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "danger" | "ghost";
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "md",
      isLoading = false,
      disabled,
      children,
      ...props
    },
    ref
  ) => {
    const baseStyles =
      "inline-flex items-center justify-center font-medium transition-colors duration-150 ease-in-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-1 disabled:opacity-50 disabled:pointer-events-none select-none";

    const variantStyles = {
      primary:
        "bg-accent text-accent-foreground hover:bg-accent-hover active:bg-[#1E3A8A] border border-transparent shadow-none",
      secondary:
        "bg-surface text-primary border border-border hover:bg-[#F2F2EC] active:bg-[#EAEAE2]",
      outline:
        "bg-transparent text-primary border border-border hover:border-primary active:bg-surface",
      danger:
        "bg-semantic-error text-white hover:bg-[#B91C1C] border border-transparent",
      ghost:
        "bg-transparent text-primary hover:bg-[#EAEAE2] border border-transparent",
    };

    const sizeStyles = {
      sm: "h-8 px-3 text-xs rounded-sm gap-1.5",
      md: "h-9 px-4 text-sm rounded-md gap-2",
      lg: "h-11 px-6 text-base rounded-md gap-2.5",
    };

    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={cn(baseStyles, variantStyles[variant], sizeStyles[size], className)}
        {...props}
      >
        {isLoading && <Loader2 className="w-4 h-4 animate-spin text-current" />}
        {children}
      </button>
    );
  }
);
Button.displayName = "Button";
