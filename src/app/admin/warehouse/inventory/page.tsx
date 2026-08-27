"use client";



import { useState } from "react";

import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { WarehouseInventoryGrid } from "@/components/admin/admin-workspace-widgets";

import { WAREHOUSE_PACKAGES } from "@/lib/admin/workspace-demo-data";



export default function WarehouseInventoryPage() {

  const [view, setView] = useState<"cards" | "table">("cards");



  return (

    <>

      <AdminPageHeader
        actions={
          <div className="flex rounded-lg border border-border bg-white p-1">
            <button
              type="button"
              onClick={() => setView("cards")}
              className={`rounded-md px-3 py-1.5 text-sm font-medium ${view === "cards" ? "bg-[#0a1d37] text-white" : "text-muted"}`}
            >
              Cards
            </button>
            <button
              type="button"
              onClick={() => setView("table")}
              className={`rounded-md px-3 py-1.5 text-sm font-medium ${view === "table" ? "bg-[#0a1d37] text-white" : "text-muted"}`}
            >
              Table
            </button>
          </div>
        }
      />



      {view === "cards" ? (

        <WarehouseInventoryGrid packages={WAREHOUSE_PACKAGES} />

      ) : (

        <div className="overflow-hidden rounded-xl border border-border bg-white shadow-sm">

          <table className="w-full text-left text-sm">

            <thead>

              <tr className="border-b border-border bg-surface/50 text-xs uppercase text-muted">

                <th className="px-4 py-3">Package ID</th>

                <th className="px-4 py-3">Supplier</th>

                <th className="px-4 py-3">Weight</th>

                <th className="px-4 py-3">Location</th>

                <th className="px-4 py-3">Status</th>

              </tr>

            </thead>

            <tbody>

              {WAREHOUSE_PACKAGES.map((pkg) => (

                <tr key={pkg.id} className="border-b border-border/70">

                  <td className="px-4 py-3 font-mono text-xs font-bold">{pkg.packageId}</td>

                  <td className="px-4 py-3 text-muted">{pkg.supplier}</td>

                  <td className="px-4 py-3">{pkg.weightKg} kg</td>

                  <td className="px-4 py-3 font-mono text-xs text-muted">{pkg.location}</td>

                  <td className="px-4 py-3 text-xs font-semibold">{pkg.status}</td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      )}

    </>

  );

}


