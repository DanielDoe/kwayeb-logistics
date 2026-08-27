"use client";

import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface DashboardNavLinkProps {
  href: string;
  label: string;
  description?: string;
  icon: LucideIcon;
  active: boolean;
  onNavigate?: () => void;
}

export function DashboardNavLink({
  href,
  label,
  description,
  icon: Icon,
  active,
  onNavigate,
}: DashboardNavLinkProps) {
  return (
    <Link
      href={href}
      onClick={onNavigate}
      className={cn(
        "group relative flex items-center gap-3 rounded-xl px-3 py-2.5 transition-all duration-200",
        active
          ? "bg-accent-soft shadow-sm ring-1 ring-[color-mix(in_srgb,var(--accent)_20%,transparent)]"
          : "hover:bg-surface-hover",
      )}
    >
      {active ? (
        <span className="absolute inset-y-2 left-0 w-1 rounded-r-full bg-accent" aria-hidden />
      ) : null}
      <span
        className={cn(
          "flex h-9 w-9 shrink-0 items-center justify-center rounded-lg transition-all duration-200",
          active
            ? "bg-accent text-[var(--btn-primary-fg)] shadow-md shadow-[var(--accent-shadow)]"
            : "border border-border bg-surface text-muted group-hover:border-[color-mix(in_srgb,var(--accent)_30%,transparent)] group-hover:text-foreground",
        )}
      >
        <Icon className="h-4 w-4" />
      </span>
      <span className="min-w-0 flex-1">
        <span className={cn("block text-sm font-semibold", active ? "text-accent-text" : "text-foreground")}>
          {label}
        </span>
        {description ? (
          <span className="block truncate text-xs text-muted">{description}</span>
        ) : null}
      </span>
    </Link>
  );
}
