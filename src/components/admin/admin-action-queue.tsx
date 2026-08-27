"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import type { ActionQueueItem } from "@/lib/admin/workspace-demo-data";

const PRIORITY_STYLES = {
  urgent: "bg-red-500/10 text-red-700 border-red-500/20",
  high: "bg-amber-500/10 text-amber-700 border-amber-500/20",
  normal: "bg-slate-500/10 text-slate-600 border-slate-500/20",
};

interface AdminActionQueueProps {
  title?: string;
  items: ActionQueueItem[];
}

export function AdminActionQueue({ title = "Action Required", items }: AdminActionQueueProps) {
  const router = useRouter();

  return (
    <div className="relative z-10 overflow-hidden rounded-xl border border-border bg-white shadow-sm">
      <div className="border-b border-border px-4 py-3 sm:px-5">
        <h2 className="text-base font-semibold text-foreground">{title}</h2>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[640px] text-left text-sm">
          <thead>
            <tr className="border-b border-border bg-surface/50 text-xs font-semibold uppercase tracking-wide text-muted">
              <th className="px-4 py-2.5 sm:px-5">Priority</th>
              <th className="px-4 py-2.5">Shipment</th>
              <th className="px-4 py-2.5">Customer</th>
              <th className="px-4 py-2.5">Issue</th>
              <th className="px-4 py-2.5">Location</th>
              <th className="px-4 py-2.5 sm:pr-5">Action</th>
              <th className="w-10 px-2 py-2.5 sm:pr-4" aria-hidden="true">
                <span className="sr-only">Open</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr
                key={item.id}
                className="group cursor-pointer border-b border-border/70 transition last:border-0 hover:bg-surface/30"
                onClick={() => router.push(item.href)}
              >
                <td className="px-4 py-3 sm:px-5">
                  <span
                    className={cn(
                      "inline-flex rounded-full border px-2 py-0.5 text-[11px] font-semibold uppercase",
                      PRIORITY_STYLES[item.priority],
                    )}
                  >
                    {item.priority}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <Link
                    href={item.href}
                    className="inline-flex items-center gap-1 font-medium text-foreground underline-offset-2 transition group-hover:text-[#ff6600] hover:underline"
                    onClick={(event) => event.stopPropagation()}
                  >
                    {item.shipment}
                    <ChevronRight className="h-3.5 w-3.5 text-muted opacity-0 transition group-hover:opacity-100 group-hover:text-[#ff6600]" />
                  </Link>
                </td>
                <td className="px-4 py-3 text-muted">{item.customer}</td>
                <td className="px-4 py-3 text-muted">{item.issue}</td>
                <td className="px-4 py-3 text-muted">{item.location}</td>
                <td className="px-4 py-3 sm:pr-5">
                  <Link
                    href={item.href}
                    className="relative z-10 inline-flex items-center gap-1 rounded-lg bg-[#ff6600] px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-[#e55a00]"
                    onClick={(event) => event.stopPropagation()}
                  >
                    {item.action}
                    <ChevronRight className="h-3.5 w-3.5 shrink-0 opacity-90" />
                  </Link>
                </td>
                <td className="px-2 py-3 sm:pr-4">
                  <ChevronRight
                    className="h-4 w-4 text-muted/40 transition group-hover:translate-x-0.5 group-hover:text-[#ff6600]"
                    aria-hidden="true"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
