import { forwardRef, type TextareaHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  hint?: string;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, label, hint, id, ...props }, ref) => (
    <div className="w-full">
      {label && (
        <label htmlFor={id} className="mb-2 block text-sm font-medium text-foreground">
          {label}
          {hint && <span className="ml-1 font-normal text-muted">{hint}</span>}
        </label>
      )}
      <textarea
        ref={ref}
        id={id}
        className={cn(
          "w-full rounded-xl border border-border bg-[var(--input-bg)] px-4 py-3 text-[var(--input-text)]",
          "placeholder:text-muted backdrop-blur-sm",
          "transition-colors focus:border-[color-mix(in_srgb,var(--accent)_50%,transparent)]",
          "focus:outline-none focus:ring-2 focus:ring-[var(--accent-ring)]",
          className,
        )}
        {...props}
      />
    </div>
  ),
);
Textarea.displayName = "Textarea";
