import Link from "next/link";
import { cn } from "@/lib/utils";

export interface AdminTableColumn<T> {
  key: string;
  header: string;
  className?: string;
  render: (row: T) => React.ReactNode;
}

interface AdminDataTableProps<T> {
  columns: AdminTableColumn<T>[];
  rows: T[];
  emptyMessage?: string;
  getRowKey: (row: T) => string;
}

export function AdminDataTable<T>({
  columns,
  rows,
  emptyMessage = "No records found.",
  getRowKey,
}: AdminDataTableProps<T>) {
  if (!rows.length) {
    return (
      <div className="rounded-xl border border-border bg-card p-8 text-center text-sm text-muted shadow-sm">
        {emptyMessage}
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-xl border border-border bg-card shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[640px] text-left text-sm">
          <thead>
            <tr className="border-b border-border bg-surface/50 text-xs font-semibold uppercase tracking-wide text-muted">
              {columns.map((col) => (
                <th key={col.key} className={cn("px-4 py-3 sm:px-5", col.className)}>
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr
                key={getRowKey(row)}
                className="border-b border-border/70 transition last:border-0 hover:bg-surface/30"
              >
                {columns.map((col) => (
                  <td key={col.key} className={cn("px-4 py-3 sm:px-5", col.className)}>
                    {col.render(row)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export function AdminTableLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link href={href} className="text-xs font-semibold text-accent-text hover:underline">
      {children}
    </Link>
  );
}

export function AdminStatusBadge({
  label,
  tone = "default",
}: {
  label: string;
  tone?: "default" | "success" | "warning" | "danger";
}) {
  const tones = {
    default: "bg-accent-soft text-accent-text",
    success: "bg-emerald-500/10 text-emerald-700",
    warning: "bg-amber-500/10 text-amber-700",
    danger: "bg-red-500/10 text-red-700",
  };
  return (
    <span className={cn("inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium", tones[tone])}>
      {label}
    </span>
  );
}
