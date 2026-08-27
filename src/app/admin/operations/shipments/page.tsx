import Link from "next/link";

import { fetchAdminShipments } from "@/lib/actions/admin";
import { getDemoShipment } from "@/lib/admin/workspace-demo-data";
import { AdminPageHeader } from "@/components/admin/admin-page-header";

function shipmentDetailHref(trackingId: string) {
  const slug = trackingId.toLowerCase().replace(/\s+/g, "-");
  if (getDemoShipment(slug)) return `/admin/operations/shipments/${slug}`;
  const kwySlug = slug.replace(/^kw-?trk-?/i, "kwy-");
  if (getDemoShipment(kwySlug)) return `/admin/operations/shipments/${kwySlug}`;
  return `/admin/operations/shipments/${slug}`;
}



export default async function OperationsShipmentsPage() {

  const shipments = await fetchAdminShipments();



  return (

    <>
      <AdminPageHeader />

<div className="overflow-hidden rounded-xl border border-border bg-white shadow-sm">

        <table className="w-full min-w-[640px] text-left text-sm">

          <thead>

            <tr className="border-b border-border bg-surface/50 text-xs font-semibold uppercase tracking-wide text-muted">

              <th className="px-4 py-3 sm:px-5">Tracking ID</th>

              <th className="px-4 py-3">Customer</th>

              <th className="px-4 py-3">Destination</th>

              <th className="px-4 py-3">Freight</th>

              <th className="px-4 py-3">Status</th>

              <th className="px-4 py-3 sm:pr-5">Action</th>

            </tr>

          </thead>

          <tbody>

            {shipments.map((shipment) => (

              <tr key={shipment.id} className="border-b border-border/70 transition hover:bg-surface/30">

                <td className="px-4 py-3 font-mono text-xs font-medium sm:px-5">{shipment.tracking_id}</td>

                <td className="px-4 py-3 text-muted">{shipment.customer_name ?? "—"}</td>

                <td className="px-4 py-3 text-muted">{shipment.destination_country}</td>

                <td className="px-4 py-3 text-muted">{shipment.freight_type ?? "—"}</td>

                <td className="px-4 py-3 capitalize text-muted">{shipment.status.replace(/_/g, " ")}</td>

                <td className="px-4 py-3 sm:pr-5">

                  <Link

                    href={shipmentDetailHref(shipment.tracking_id)}

                    className="text-xs font-semibold text-[#ff6600] hover:underline"

                  >

                    View

                  </Link>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </>

  );

}


