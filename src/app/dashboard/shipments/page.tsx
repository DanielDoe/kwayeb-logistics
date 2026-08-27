import { Package } from "lucide-react";
import { DashboardDetailRow } from "@/components/dashboard/dashboard-detail-row";
import { DashboardEmptyState } from "@/components/dashboard/dashboard-empty-state";
import { DashboardListCard, DashboardListToolbar } from "@/components/dashboard/dashboard-list-card";
import { DashboardPageHeader } from "@/components/dashboard/dashboard-page-header";
import { StatusBadge } from "@/components/dashboard/status-badge";
import { getCustomerShipments } from "@/lib/actions/quotes";
import { ButtonLink } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default async function ShipmentsPage() {
  const shipments = await getCustomerShipments();

  return (
    <div className="space-y-4 sm:space-y-6">
      <DashboardPageHeader
        eyebrow="Logistics"
        title="Shipments"
        description="View and track all your active and completed shipments. Tap a row to see full tracking details."
      />

      {shipments.length === 0 ? (
        <DashboardEmptyState
          icon={Package}
          title="No shipments found"
          description="Submit a quote request and book freight to start tracking shipments here."
          actionLabel="Request a quote"
          actionHref="/dashboard/quotes/new"
        />
      ) : (
        <Card>
          <CardContent className="p-0">
            <DashboardListToolbar>
              <ButtonLink href="/dashboard/track" size="sm" variant="secondary" className="w-full sm:w-auto">
                Track by ID
              </ButtonLink>
            </DashboardListToolbar>

            <div className="md:hidden">
              {shipments.map((shipment) => (
                <DashboardListCard
                  key={shipment.id}
                  href={`/dashboard/track?id=${encodeURIComponent(shipment.tracking_id)}`}
                  title={shipment.tracking_id}
                  status={shipment.status}
                  fields={[
                    {
                      label: "Destination",
                      value: `${shipment.destination} (${shipment.destination_country})`,
                    },
                    { label: "Method", value: shipment.freight_type ?? "—" },
                    {
                      label: "Est. delivery",
                      value: shipment.estimated_delivery
                        ? new Date(shipment.estimated_delivery).toLocaleDateString()
                        : "—",
                    },
                  ]}
                />
              ))}
            </div>

            <div className="hidden overflow-x-auto md:block">
              <table className="w-full min-w-[640px] text-sm">
                <thead className="border-b border-border bg-surface">
                  <tr>
                    <th className="px-4 py-3 text-left font-medium text-muted">Tracking ID</th>
                    <th className="px-4 py-3 text-left font-medium text-muted">Destination</th>
                    <th className="px-4 py-3 text-left font-medium text-muted">Status</th>
                    <th className="px-4 py-3 text-left font-medium text-muted">Method</th>
                    <th className="px-4 py-3 text-left font-medium text-muted">Est. delivery</th>
                    <th className="px-4 py-3 text-right font-medium text-muted">Details</th>
                  </tr>
                </thead>
                <tbody>
                  {shipments.map((shipment) => (
                    <DashboardDetailRow
                      key={shipment.id}
                      href={`/dashboard/track?id=${encodeURIComponent(shipment.tracking_id)}`}
                    >
                      <td className="px-4 py-3 font-mono font-medium text-accent-text">
                        {shipment.tracking_id}
                      </td>
                      <td className="px-4 py-3 text-foreground">
                        {shipment.destination}
                        <span className="ml-1 text-muted">({shipment.destination_country})</span>
                      </td>
                      <td className="px-4 py-3">
                        <StatusBadge status={shipment.status} />
                      </td>
                      <td className="px-4 py-3 text-muted">{shipment.freight_type ?? "—"}</td>
                      <td className="px-4 py-3 text-muted">
                        {shipment.estimated_delivery
                          ? new Date(shipment.estimated_delivery).toLocaleDateString()
                          : "—"}
                      </td>
                    </DashboardDetailRow>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
