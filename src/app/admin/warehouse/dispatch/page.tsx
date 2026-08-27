import { WAREHOUSE_PACKAGES } from "@/lib/admin/workspace-demo-data";
import { AdminPageHeader } from "@/components/admin/admin-page-header";



export default function WarehouseDispatchPage() {

  const ready = WAREHOUSE_PACKAGES.filter((p) => p.status.includes("CONSOLIDATION") || p.status.includes("DISPATCH"));



  return (

    <>
      <AdminPageHeader />

<div className="space-y-3">

        {ready.length ? (

          ready.map((pkg) => (

            <div key={pkg.id} className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-border bg-white p-4 shadow-sm">

              <div>

                <p className="font-mono text-sm font-bold">{pkg.packageId}</p>

                <p className="text-sm text-muted">{pkg.customer} · {pkg.weightKg} kg</p>

              </div>

              <button type="button" className="rounded-lg bg-[#ff6600] px-4 py-2 text-sm font-semibold text-white">

                Mark Dispatched

              </button>

            </div>

          ))

        ) : (

          <p className="text-muted">No packages ready for dispatch.</p>

        )}

      </div>

    </>

  );

}


