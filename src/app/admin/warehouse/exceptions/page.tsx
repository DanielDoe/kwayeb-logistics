import { WAREHOUSE_PACKAGES } from "@/lib/admin/workspace-demo-data";
import { AdminPageHeader } from "@/components/admin/admin-page-header";



export default function WarehouseExceptionsPage() {

  const exceptions = WAREHOUSE_PACKAGES.filter((p) => p.statusColor === "red");



  return (

    <>
      <AdminPageHeader />

<div className="space-y-3">

        {exceptions.map((pkg) => (

          <div key={pkg.id} className="rounded-xl border border-red-200 bg-red-50/50 p-4">

            <p className="font-mono text-sm font-bold text-foreground">{pkg.packageId}</p>

            <p className="mt-1 text-sm text-muted">{pkg.supplier} · {pkg.customer}</p>

            <p className="mt-2 text-sm font-semibold text-red-700">{pkg.status}</p>

            <button type="button" className="mt-3 rounded-lg border border-red-300 bg-white px-4 py-2 text-sm font-medium text-red-700">

              Resolve Exception

            </button>

          </div>

        ))}

      </div>

    </>

  );

}


