import Link from "next/link";
import { cn } from "@/lib/utils";

interface KpiItem {
  label: string;
  value: string | number;
  href?: string;
  accent?: boolean;
}

interface AdminKpiGridProps {
  items: KpiItem[];
  columns?: 3 | 4 | 5 | 6;
}

export function AdminKpiGrid({ items, columns = 4 }: AdminKpiGridProps) {
  const gridClass =
    columns === 6
      ? "sm:grid-cols-3 lg:grid-cols-6"
      : columns === 5
        ? "sm:grid-cols-2 lg:grid-cols-5"
        : columns === 3
          ? "sm:grid-cols-3"
          : "sm:grid-cols-2 lg:grid-cols-4";

  return (
    <div className={cn("grid gap-3", gridClass)}>
      {items.map((item) => {
        const content = (
          <>
            <p className={cn("text-2xl font-bold tabular-nums tracking-tight", item.accent ? "text-[#ff6600]" : "text-foreground")}>
              {item.value}
            </p>
            <p className="mt-1 text-sm text-muted">{item.label}</p>
          </>
        );

        if (item.href) {
          return (
            <Link
              key={item.label}
              href={item.href}
              className="rounded-xl border border-border bg-white p-4 shadow-sm transition hover:border-[#ff6600]/30 hover:shadow-md"
            >
              {content}
            </Link>
          );
        }

        return (
          <div key={item.label} className="rounded-xl border border-border bg-white p-4 shadow-sm">
            {content}
          </div>
        );
      })}
    </div>
  );
}
