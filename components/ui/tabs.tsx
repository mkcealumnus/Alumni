"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface TabsProps {
  value: string;
  onValueChange: (value: string) => void;
  children: React.ReactNode;
  className?: string;
}

export function Tabs({ value, onValueChange, children, className }: TabsProps) {
  return (
    <div className={cn("space-y-4", className)}>
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child, { activeValue: value, onValueChange } as any);
        }
        return child;
      })}
    </div>
  );
}

export function TabsList({
  children,
  className,
  activeValue,
  onValueChange,
}: {
  children: React.ReactNode;
  className?: string;
  activeValue?: string;
  onValueChange?: (value: string) => void;
}) {
  return (
    <div
      className={cn(
        "inline-flex h-9 items-center rounded-md border border-border bg-[#EFEFEA] p-0.5 text-xs text-secondary",
        className
      )}
    >
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child, { activeValue, onValueChange } as any);
        }
        return child;
      })}
    </div>
  );
}

export function TabsTrigger({
  value,
  children,
  className,
  activeValue,
  onValueChange,
}: {
  value: string;
  children: React.ReactNode;
  className?: string;
  activeValue?: string;
  onValueChange?: (value: string) => void;
}) {
  const isActive = activeValue === value;
  return (
    <button
      type="button"
      onClick={() => onValueChange?.(value)}
      className={cn(
        "inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1 text-xs font-medium transition-all focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary",
        isActive
          ? "bg-surface text-primary shadow-subtle border border-border/80"
          : "text-secondary hover:text-primary",
        className
      )}
    >
      {children}
    </button>
  );
}

export function TabsContent({
  value,
  children,
  activeValue,
  className,
}: {
  value: string;
  children: React.ReactNode;
  activeValue?: string;
  className?: string;
}) {
  if (value !== activeValue) return null;
  return <div className={cn("animate-in fade-in duration-150", className)}>{children}</div>;
}
