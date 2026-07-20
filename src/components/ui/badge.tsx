import { cn } from "@/lib/utils";
import type { HTMLAttributes } from "react";

const variants = {
  default: "bg-surface text-muted border-border",
  amber: "bg-accent-soft text-accent-text border-[color-mix(in_srgb,var(--accent)_25%,transparent)]",
  green: "bg-emerald-500/10 text-emerald-700 border-emerald-500/25 dark:text-emerald-300",
  blue: "bg-sky-500/10 text-sky-700 border-sky-500/25 dark:text-sky-300",
};

export function Badge({
  className,
  variant = "default",
  ...props
}: HTMLAttributes<HTMLSpanElement> & { variant?: keyof typeof variants }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium",
        variants[variant],
        className,
      )}
      {...props}
    />
  );
}
