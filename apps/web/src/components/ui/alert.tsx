import * as React from "react";
import { cn } from "@/lib/utils";
import { AlertCircle, CheckCircle2, Info, AlertTriangle } from "lucide-react";

export interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "info" | "success" | "warning" | "error";
  title?: string;
}

export function Alert({
  className,
  variant = "default",
  title,
  children,
  ...props
}: AlertProps) {
  const variantStyles = {
    default: "bg-[#F4F4F0] border-border text-primary",
    info: "bg-accent-subtle border-[#C7D2FE] text-primary",
    success:
      "bg-semantic-success-subtle border-semantic-success-border text-primary",
    warning:
      "bg-semantic-warning-subtle border-semantic-warning-border text-primary",
    error: "bg-semantic-error-subtle border-semantic-error-border text-primary",
  };

  const icons = {
    default: <Info className="w-4 h-4 text-secondary mt-0.5 shrink-0" />,
    info: <Info className="w-4 h-4 text-accent mt-0.5 shrink-0" />,
    success: (
      <CheckCircle2 className="w-4 h-4 text-semantic-success mt-0.5 shrink-0" />
    ),
    warning: (
      <AlertTriangle className="w-4 h-4 text-semantic-warning mt-0.5 shrink-0" />
    ),
    error: (
      <AlertCircle className="w-4 h-4 text-semantic-error mt-0.5 shrink-0" />
    ),
  };

  return (
    <div
      role="alert"
      className={cn(
        "relative flex gap-3 rounded-md border p-3.5 text-xs leading-relaxed",
        variantStyles[variant],
        className
      )}
      {...props}
    >
      {icons[variant]}
      <div className="flex-1 space-y-1">
        {title && <h5 className="font-semibold text-primary">{title}</h5>}
        <div className="text-secondary">{children}</div>
      </div>
    </div>
  );
}
