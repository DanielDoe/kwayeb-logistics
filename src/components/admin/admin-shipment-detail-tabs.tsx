"use client";

import Link from "next/link";
import { useState } from "react";
import type { ShipmentDetail } from "@/lib/admin/workspace-demo-data";

const TABS = ["Overview", "Cargo", "Tracking", "Documents", "Charges", "Messages", "Activity"] as const;

interface AdminShipmentDetailTabsProps {
  shipment: ShipmentDetail;
}

export function AdminShipmentDetailTabs({ shipment }: AdminShipmentDetailTabsProps) {
  const [activeTab, setActiveTab] = useState<(typeof TABS)[number]>("Overview");

  return (
    <>
      <div className="mt-6 flex gap-1 overflow-x-auto border-b border-border">
        {TABS.map((tab) => (
          <button
            key={tab}
            type="button"
            onClick={() => setActiveTab(tab)}
            className={`shrink-0 px-4 py-2.5 text-sm font-medium transition ${
              activeTab === tab
                ? "border-b-2 border-[#ff6600] text-[#ff6600]"
                : "text-muted hover:text-foreground"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {activeTab === "Overview" || activeTab === "Charges" ? (
        <div className="mt-6 grid gap-6 lg:grid-cols-2">
          <div className="rounded-xl border border-border bg-white p-5 shadow-sm">
            <h2 className="font-semibold text-foreground">Charges</h2>
            <ul className="mt-4 space-y-2">
              {shipment.charges.map((charge) => (
                <li key={charge.label} className="flex justify-between text-sm">
                  <span className="text-muted">{charge.label}</span>
                  <span className="font-medium text-foreground">${charge.amount.toLocaleString()}</span>
                </li>
              ))}
              <li className="flex justify-between border-t border-border pt-2 text-sm font-bold">
                <span>Total</span>
                <span>${shipment.charges.reduce((sum, charge) => sum + charge.amount, 0).toLocaleString()}</span>
              </li>
            </ul>
          </div>

          <div className="rounded-xl border border-border bg-white p-5 shadow-sm">
            <h2 className="font-semibold text-foreground">Activity</h2>
            <ul className="mt-4 space-y-3 text-sm text-muted">
              <li>Aug 28 · Departed Guangzhou — Operations</li>
              <li>Aug 23 · Payment confirmed — Finance</li>
              <li>Aug 20 · Measurements confirmed — Warehouse</li>
              <li>Aug 19 · Cargo received at WH-A — Warehouse</li>
            </ul>
            <Link href="/admin/finance/invoices/inv-01831" className="mt-4 inline-block text-sm font-semibold text-[#ff6600] hover:underline">
              View linked invoice →
            </Link>
          </div>
        </div>
      ) : null}

      {activeTab === "Documents" ? (
        <div id="documents" className="mt-6 rounded-xl border border-border bg-white p-5 shadow-sm">
          <h2 className="font-semibold text-foreground">Documents</h2>
          {shipment.documentsNeeded?.length ? (
            <>
              <p className="mt-2 text-sm text-muted">The following documents are still required for customs clearance:</p>
              <ul className="mt-4 space-y-2">
                {shipment.documentsNeeded.map((doc) => (
                  <li key={doc} className="flex items-center justify-between rounded-lg border border-border px-4 py-3 text-sm">
                    <span className="font-medium text-foreground">{doc}</span>
                    <button
                      type="button"
                      className="rounded-lg bg-[#ff6600] px-3 py-1.5 text-xs font-semibold text-white hover:bg-[#e55a00]"
                    >
                      Request upload
                    </button>
                  </li>
                ))}
              </ul>
            </>
          ) : (
            <p className="mt-2 text-sm text-muted">All required documents are on file for this shipment.</p>
          )}
        </div>
      ) : null}

      {activeTab === "Messages" ? (
        <div className="mt-6 rounded-xl border border-border bg-white p-5 shadow-sm">
          <h2 className="font-semibold text-foreground">Customer messages</h2>
          <p className="mt-2 text-sm text-muted">
            Use this thread to confirm revised cargo details with {shipment.customer}.
          </p>
          <textarea
            className="mt-4 min-h-28 w-full rounded-xl border border-border bg-surface/50 px-4 py-3 text-sm"
            placeholder={`Message ${shipment.customer} about ${shipment.pendingIssue?.toLowerCase() ?? "this shipment"}…`}
            defaultValue={
              shipment.pendingIssue?.includes("measurements")
                ? `Hi ${shipment.customer.split(" ")[0]}, we recorded updated cargo measurements at our Guangzhou warehouse. Please confirm the revised weight and dimensions so we can proceed with dispatch.`
                : ""
            }
          />
          <button
            type="button"
            className="mt-4 rounded-lg bg-[#ff6600] px-4 py-2 text-sm font-semibold text-white hover:bg-[#e55a00]"
          >
            Send message
          </button>
        </div>
      ) : null}

      {activeTab === "Cargo" || activeTab === "Tracking" || activeTab === "Activity" ? (
        <div className="mt-6 rounded-xl border border-border bg-white p-5 shadow-sm">
          <h2 className="font-semibold text-foreground">{activeTab}</h2>
          <p className="mt-2 text-sm text-muted">
            {activeTab === "Cargo"
              ? `${shipment.freightType} cargo for ${shipment.customer}. Measurements and packing details are managed by the warehouse team.`
              : activeTab === "Tracking"
                ? `Latest milestone: ${shipment.statusLabel.replace(/_/g, " ")}. Full carrier tracking will appear here once the shipment is handed off.`
                : "Cross-department activity for this shipment appears here."}
          </p>
        </div>
      ) : null}
    </>
  );
}
