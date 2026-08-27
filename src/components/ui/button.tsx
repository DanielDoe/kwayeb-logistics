import { forwardRef, type ButtonHTMLAttributes } from "react";
import Link from "next/link";
import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

const variants = {
  primary:
    "bg-[var(--btn-primary-bg)] text-[var(--btn-primary-fg)] hover:bg-[var(--btn-primary-hover)] shadow-lg shadow-[var(--accent-shadow)]",
  secondary:
    "border border-border bg-surface text-foreground hover:bg-surface-hover",
  ghost: "text-muted hover:bg-surface-hover hover:text-foreground",
  outline:
    "border border-[color-mix(in_srgb,var(--accent)_40%,transparent)] text-accent-text hover:bg-accent-soft",
};

const sizes = {
  sm: "h-9 px-4 text-sm",
  md: "h-11 px-6 text-sm",
  lg: "h-12 px-8 text-base",
};

export function buttonClassName(
  variant: keyof typeof variants = "primary",
  size: keyof typeof sizes = "md",
  className?: string,
) {
  return cn(
    "inline-flex items-center justify-center gap-2 rounded-xl font-semibold transition-all duration-200",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-ring)]",
    "disabled:pointer-events-none disabled:opacity-50",
    variants[variant],
    sizes[size],
    className,
  );
}

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: keyof typeof variants;
  size?: keyof typeof sizes;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", ...props }, ref) => (
    <button
      ref={ref}
      className={buttonClassName(variant, size, className)}
      {...props}
    />
  ),
);
Button.displayName = "Button";

export function ButtonLink({
  href,
  variant = "primary",
  size = "md",
  className,
  children,
  ...props
}: ComponentProps<typeof Link> & {
  variant?: keyof typeof variants;
  size?: keyof typeof sizes;
}) {
  return (
    <Link href={href} className={buttonClassName(variant, size, className)} {...props}>
      {children}
    </Link>
  );
}
