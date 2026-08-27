import Link from "next/link";
import { AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils";

interface AdminActionBannerProps {
  issue: string;
  description: string;
  priority?: "urgent" | "high" | "normal";
  actionLabel?: string;
  actionHref?: string;
}

const PRIORITY_STYLES = {
  urgent: "border-red-500/30 bg-red-500/5",
  high: "border-amber-500/30 bg-amber-500/5",
  normal: "border-sky-500/30 bg-sky-500/5",
};

export function AdminActionBanner({
  issue,
  description,
  priority = "high",
  actionLabel,
  actionHref,
}: AdminActionBannerProps) {
  return (
    <div className={cn("mb-6 rounded-xl border p-4 sm:p-5", PRIORITY_STYLES[priority])}>
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="flex min-w-0 gap-3">
          <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white shadow-sm">
            <AlertTriangle className="h-4 w-4 text-[#ff6600]" />
          </span>
          <div>
            <p className="text-sm font-semibold text-foreground">Action required · {issue}</p>
            <p className="mt-1 max-w-2xl text-sm text-muted">{description}</p>
          </div>
        </div>
        {actionLabel && actionHref ? (
          <Link
            href={actionHref}
            className="inline-flex shrink-0 rounded-lg bg-[#ff6600] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#e55a00]"
          >
            {actionLabel}
          </Link>
        ) : null}
      </div>
    </div>
  );
}
