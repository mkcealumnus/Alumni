import * as React from "react";
import { cn } from "@/lib/utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?:
    | "default"
    | "verified"
    | "pending"
    | "needs_review"
    | "rejected"
    | "outline"
    | "accent";
}

export function Badge({
  className,
  variant = "default",
  ...props
}: BadgeProps) {
  const variantStyles = {
    default: "bg-[#EAEAE2] text-primary border-transparent",
    accent: "bg-accent-subtle text-accent border-[#C7D2FE]",
    verified:
      "bg-semantic-success-subtle text-semantic-success border-semantic-success-border font-medium",
    pending:
      "bg-[#F3F4F6] text-[#4B5563] border-[#E5E7EB]",
    needs_review:
      "bg-semantic-warning-subtle text-semantic-warning border-semantic-warning-border font-medium",
    rejected:
      "bg-semantic-error-subtle text-semantic-error border-semantic-error-border font-medium",
    outline: "bg-transparent text-secondary border-border",
  };

  return (
    <div
      className={cn(
        "inline-flex items-center rounded-sm border px-2 py-0.5 text-xs font-medium tracking-tight transition-colors select-none",
        variantStyles[variant],
        className
      )}
      {...props}
    />
  );
}
