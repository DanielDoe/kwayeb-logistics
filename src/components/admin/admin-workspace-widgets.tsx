"use client";

import Link from "next/link";
import { Package } from "lucide-react";
import { cn } from "@/lib/utils";
import type { WarehousePackage } from "@/lib/admin/workspace-demo-data";

const STATUS_COLORS = {
  green: "text-emerald-600 bg-emerald-500/10",
  amber: "text-amber-600 bg-amber-500/10",
  red: "text-red-600 bg-red-500/10",
  blue: "text-sky-600 bg-sky-500/10",
};

interface WarehouseInventoryGridProps {
  packages: WarehousePackage[];
}

export function WarehouseInventoryGrid({ packages }: WarehouseInventoryGridProps) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
      {packages.map((pkg) => (
        <div
          key={pkg.id}
          className="overflow-hidden rounded-xl border border-border bg-white shadow-sm transition hover:shadow-md"
        >
          <div className="flex h-32 items-center justify-center bg-gradient-to-br from-slate-100 to-slate-50">
            <Package className="h-12 w-12 text-slate-300" strokeWidth={1.25} />
          </div>
          <div className="p-4">
            <p className="font-mono text-sm font-bold text-foreground">{pkg.packageId}</p>
            <p className="mt-1 truncate text-sm text-muted">{pkg.supplier}</p>
            <div className="mt-3 flex gap-4 text-sm">
              <span className="font-medium text-foreground">{pkg.weightKg} kg</span>
              <span className="text-muted">{pkg.volumeCbm} m³</span>
            </div>
            <p className="mt-2 font-mono text-xs text-muted">{pkg.location}</p>
            <p
              className={cn(
                "mt-3 inline-flex rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide",
                STATUS_COLORS[pkg.statusColor],
              )}
            >
              ● {pkg.status}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

interface SupportInboxProps {
  conversations: import("@/lib/admin/workspace-demo-data").SupportConversation[];
  messages: import("@/lib/admin/workspace-demo-data").SupportMessage[];
  activeId?: string;
}

export function SupportInbox({ conversations, messages, activeId = "1" }: SupportInboxProps) {
  const active = conversations.find((c) => c.id === activeId) ?? conversations[0];

  return (
    <div className="grid min-h-[560px] grid-cols-1 overflow-hidden rounded-xl border border-border bg-white shadow-sm lg:grid-cols-[240px_1fr_260px]">
      <div className="border-b border-border lg:border-b-0 lg:border-r">
        <div className="border-b border-border px-3 py-2.5">
          <p className="text-xs font-semibold uppercase tracking-wide text-muted">Conversations</p>
        </div>
        <div className="divide-y divide-border/70">
          {conversations.map((conv) => (
            <button
              key={conv.id}
              type="button"
              className={cn(
                "w-full px-3 py-3 text-left transition hover:bg-surface/50",
                conv.id === active?.id && "bg-accent-soft/50",
              )}
            >
              <div className="flex items-center gap-1.5">
                {conv.priority === "urgent" ? (
                  <span className="h-2 w-2 rounded-full bg-red-500" />
                ) : conv.status === "unassigned" ? (
                  <span className="h-2 w-2 rounded-full bg-amber-500" />
                ) : (
                  <span className="h-2 w-2 rounded-full bg-emerald-500" />
                )}
                <span className="truncate text-sm font-semibold text-foreground">{conv.customer}</span>
              </div>
              <p className="mt-0.5 truncate text-xs text-muted">{conv.subject}</p>
              <p className="mt-1 text-[10px] text-muted">{conv.updatedAt}</p>
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-col border-b border-border lg:border-b-0 lg:border-r">
        <div className="border-b border-border px-4 py-3">
          <h2 className="font-semibold text-foreground">{active?.subject}</h2>
          <p className="text-xs text-muted">{active?.customer}</p>
        </div>
        <div className="flex-1 space-y-4 overflow-y-auto p-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={cn(
                "max-w-[85%] rounded-xl px-4 py-2.5 text-sm",
                msg.sender === "staff" ? "ml-auto bg-[#0a1d37] text-white" : "bg-surface text-foreground",
              )}
            >
              <p>{msg.content}</p>
              <p className={cn("mt-1 text-[10px]", msg.sender === "staff" ? "text-white/60" : "text-muted")}>
                {msg.time}
              </p>
            </div>
          ))}
        </div>
        <div className="border-t border-border p-3">
          <textarea
            placeholder="Write a reply..."
            rows={2}
            className="w-full resize-none rounded-lg border border-border bg-white px-3 py-2 text-sm focus:border-[#ff6600]/50 focus:outline-none focus:ring-1 focus:ring-[#ff6600]/30"
          />
        </div>
      </div>

      <div className="p-4">
        <p className="text-[10px] font-semibold uppercase tracking-widest text-muted">Customer</p>
        <p className="mt-2 font-semibold text-foreground">{active?.customer}</p>
        <p className="text-sm text-muted">Accra, Ghana</p>
        <div className="mt-4 space-y-1 text-sm">
          <p>
            <span className="text-muted">Active shipments:</span> 3
          </p>
          <p>
            <span className="text-muted">Open invoices:</span> 1
          </p>
        </div>

        {active?.shipment ? (
          <div className="mt-5 rounded-lg border border-border p-3">
            <p className="text-[10px] font-semibold uppercase tracking-widest text-muted">Current Shipment</p>
            <p className="mt-1 font-mono text-sm font-bold text-foreground">{active.shipment}</p>
            <p className="text-xs text-muted">China → Ghana</p>
            <p className="mt-2 text-xs font-semibold text-[#ff6600]">● IN TRANSIT</p>
            <p className="mt-1 text-xs text-muted">Departed Guangzhou · Aug 24 · 4:38 PM</p>
            <Link
              href="/admin/operations/shipments/kwy-28401"
              className="mt-2 inline-block text-xs font-semibold text-[#ff6600] hover:underline"
            >
              View Shipment
            </Link>
          </div>
        ) : null}

        {active?.invoice ? (
          <div className="mt-4 rounded-lg border border-border p-3">
            <p className="text-[10px] font-semibold uppercase tracking-widest text-muted">Payment</p>
            <p className="mt-1 font-mono text-sm font-bold">{active.invoice}</p>
            <p className="text-xs text-emerald-600">✓ Paid</p>
          </div>
        ) : null}
      </div>
    </div>
  );
}
