"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight } from "lucide-react";
import {
  buildAdminBreadcrumbs,
  buildDashboardBreadcrumbs,
  type BreadcrumbItem,
} from "@/lib/navigation/breadcrumbs";
import { cn } from "@/lib/utils";

interface AppBreadcrumbsProps {
  variant: "admin" | "dashboard";
  role?: string;
  className?: string;
}

function BreadcrumbTrail({ items }: { items: BreadcrumbItem[] }) {
  if (items.length === 0) return null;

  return (
    <nav aria-label="Breadcrumb" className="mb-5">
      <ol className="inline-flex max-w-full flex-wrap items-center gap-1 rounded-2xl border border-border bg-white px-2 py-1.5 shadow-sm sm:gap-1.5 sm:px-3 sm:py-2">
        {items.map((item, index) => {
          const Icon = item.icon;
          const isFirst = index === 0;
          const isLast = item.current ?? index === items.length - 1;

          return (
            <li key={`${item.label}-${index}`} className="flex min-w-0 items-center gap-1 sm:gap-1.5">
              {index > 0 ? (
                <ChevronRight className="h-3.5 w-3.5 shrink-0 text-muted/70" aria-hidden="true" />
              ) : null}

              {isLast ? (
                <span
                  aria-current="page"
                  className="inline-flex max-w-[12rem] truncate rounded-full bg-accent-soft px-3 py-1.5 text-xs font-semibold text-accent-text sm:max-w-none sm:text-sm"
                >
                  {item.label}
                </span>
              ) : isFirst ? (
                <Link
                  href={item.href ?? "#"}
                  className="inline-flex max-w-[10rem] items-center gap-1.5 truncate rounded-md px-1.5 py-1 text-xs font-medium text-muted transition hover:text-foreground sm:max-w-none sm:text-sm"
                >
                  {Icon ? <Icon className="h-3.5 w-3.5 shrink-0" strokeWidth={2} /> : null}
                  <span className="truncate">{item.label}</span>
                </Link>
              ) : (
                <Link
                  href={item.href ?? "#"}
                  className="inline-flex max-w-[10rem] items-center gap-1.5 truncate rounded-full border border-border bg-surface/80 px-2.5 py-1 text-xs font-medium text-foreground transition hover:border-[#ff6600]/30 hover:bg-surface sm:max-w-none sm:px-3 sm:py-1.5 sm:text-sm"
                >
                  {Icon ? <Icon className="h-3.5 w-3.5 shrink-0 text-muted" strokeWidth={2} /> : null}
                  <span className="truncate">{item.label}</span>
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

export function AppBreadcrumbs({ variant, role = "admin", className }: AppBreadcrumbsProps) {
  const pathname = usePathname();
  const items =
    variant === "admin" ? buildAdminBreadcrumbs(pathname, role) : buildDashboardBreadcrumbs(pathname);

  if (items.length === 0) return null;

  return (
    <div className={cn("relative z-10", className)}>
      <BreadcrumbTrail items={items} />
    </div>
  );
}
