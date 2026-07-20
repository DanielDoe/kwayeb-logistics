import { forwardRef, type InputHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, id, ...props }, ref) => (
    <div className="w-full">
      {label && (
        <label htmlFor={id} className="mb-2 block text-sm font-medium text-foreground">
          {label}
        </label>
      )}
      <input
        ref={ref}
        id={id}
        className={cn(
          "w-full rounded-xl border border-border bg-[var(--input-bg)] px-4 py-3 text-[var(--input-text)]",
          "placeholder:text-muted backdrop-blur-sm",
          "transition-colors focus:border-[color-mix(in_srgb,var(--accent)_50%,transparent)]",
          "focus:outline-none focus:ring-2 focus:ring-[var(--accent-ring)]",
          error && "border-red-500/50 focus:border-red-500/50 focus:ring-red-500/20",
          className,
        )}
        {...props}
      />
      {error && <p className="mt-1.5 text-xs text-red-500 dark:text-red-400">{error}</p>}
    </div>
  ),
);
Input.displayName = "Input";
