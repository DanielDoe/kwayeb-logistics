"use client";

import Link from "next/link";
import { ChevronRight } from "lucide-react";
import type { ReactNode } from "react";
import { StatusBadge } from "@/components/dashboard/status-badge";

export interface DashboardListField {
  label: string;
  value: ReactNode;
}

interface DashboardListCardProps {
  href: string;
  title: ReactNode;
  fields: DashboardListField[];
  status?: string;
}

export function DashboardListCard({ href, title, fields, status }: DashboardListCardProps) {
  return (
    <Link
      href={href}
      className="block border-b border-border px-4 py-4 transition last:border-0 active:bg-surface/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[var(--accent-ring)]"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <p className="break-all font-mono text-sm font-semibold text-accent-text">{title}</p>
          <dl className="mt-3 grid grid-cols-2 gap-x-3 gap-y-3">
            {fields.map((field) => (
              <div key={field.label} className="min-w-0">
                <dt className="text-[10px] font-semibold uppercase tracking-wide text-muted">
                  {field.label}
                </dt>
                <dd className="mt-0.5 text-sm text-foreground">{field.value}</dd>
              </div>
            ))}
          </dl>
        </div>
        <div className="flex shrink-0 flex-col items-end gap-2 pt-0.5">
          {status ? <StatusBadge status={status} /> : null}
          <ChevronRight className="h-4 w-4 text-muted" aria-hidden />
        </div>
      </div>
    </Link>
  );
}

interface DashboardListToolbarProps {
  children: ReactNode;
}

export function DashboardListToolbar({ children }: DashboardListToolbarProps) {
  return (
    <div className="flex flex-col gap-3 border-b border-border px-4 py-3 sm:flex-row sm:items-center sm:justify-end">
      {children}
    </div>
  );
}
