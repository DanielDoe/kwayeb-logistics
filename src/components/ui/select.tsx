import { forwardRef, type SelectHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, label, id, children, ...props }, ref) => (
    <div className="w-full">
      {label && (
        <label htmlFor={id} className="mb-2 block text-sm font-medium text-foreground">
          {label}
        </label>
      )}
      <select
        ref={ref}
        id={id}
        className={cn(
          "w-full rounded-xl border border-border bg-[var(--input-bg)] px-4 py-3 text-[var(--input-text)]",
          "transition-colors focus:border-[color-mix(in_srgb,var(--accent)_50%,transparent)]",
          "focus:outline-none focus:ring-2 focus:ring-[var(--accent-ring)]",
          className,
        )}
        {...props}
      >
        {children}
      </select>
    </div>
  ),
);
Select.displayName = "Select";
