import { WAREHOUSE_PACKAGES } from "@/lib/admin/workspace-demo-data";



export default function WarehouseDispatchPage() {

  const ready = WAREHOUSE_PACKAGES.filter((p) => p.status.includes("CONSOLIDATION") || p.status.includes("DISPATCH"));



  return (

    <>

      <div className="mb-6">

        <h1 className="text-2xl font-bold text-foreground">Ready for Dispatch</h1>

        <p className="mt-1 text-muted">Cargo cleared for consolidation and loading.</p>

      </div>

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


