import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface DashboardEmptyStateProps {
  icon: LucideIcon;
  title: string;
  description: string;
  actionLabel?: string;
  actionHref?: string;
  className?: string;
}

export function DashboardEmptyState({
  icon: Icon,
  title,
  description,
  actionLabel,
  actionHref,
  className,
}: DashboardEmptyStateProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center rounded-xl border border-dashed border-border bg-surface/50 px-6 py-10 text-center",
        className,
      )}
    >
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-accent-soft">
        <Icon className="h-6 w-6 text-accent-text" />
      </div>
      <h2 className="mt-4 font-semibold text-foreground">{title}</h2>
      <p className="mt-2 max-w-md text-sm text-muted">{description}</p>
      {actionLabel && actionHref ? (
        <Link href={actionHref} className="mt-6">
          <Button size="sm">{actionLabel}</Button>
        </Link>
      ) : null}
    </div>
  );
}
