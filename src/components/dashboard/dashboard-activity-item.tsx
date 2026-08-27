import Link from "next/link";
import { cn } from "@/lib/utils";
import { StatusBadge } from "@/components/dashboard/status-badge";
import { ChevronRight } from "lucide-react";

interface DashboardActivityItemProps {
  primary: React.ReactNode;
  secondary: React.ReactNode;
  status: string;
  href?: string;
}

export function DashboardActivityItem({ primary, secondary, status, href }: DashboardActivityItemProps) {
  const content = (
    <div
      className={cn(
        "flex flex-wrap items-center justify-between gap-3 rounded-xl border border-border bg-surface/50 px-3 py-3 transition sm:px-4 sm:py-3.5",
        href && "cursor-pointer hover:border-[color-mix(in_srgb,var(--accent)_25%,transparent)] hover:bg-surface",
      )}
    >
      <div className="min-w-0 flex-1 basis-full sm:basis-auto">
        <div className="break-words text-sm font-medium text-foreground">{primary}</div>
        <div className="mt-1 text-xs text-muted">{secondary}</div>
      </div>
      <div className="flex w-full items-center justify-between gap-2 sm:w-auto sm:justify-end">
        <StatusBadge status={status} />
        {href ? <ChevronRight className="h-4 w-4 shrink-0 text-muted" aria-hidden /> : null}
      </div>
    </div>
  );

  if (href) {
    return (
      <Link href={href} className="block rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-ring)]">
        {content}
      </Link>
    );
  }

  return content;
}
