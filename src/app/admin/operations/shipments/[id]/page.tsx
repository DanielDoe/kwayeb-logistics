import { notFound } from "next/navigation";
import { AdminActionBanner } from "@/components/admin/admin-action-banner";
import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { AdminShipmentDetailTabs } from "@/components/admin/admin-shipment-detail-tabs";
import { AdminShipmentTimeline } from "@/components/admin/admin-shipment-timeline";
import { getDemoShipment } from "@/lib/admin/workspace-demo-data";

export default async function ShipmentDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const shipment = getDemoShipment(id);

  if (!shipment) notFound();

  return (
    <>
      {shipment.pendingIssue && shipment.pendingAction ? (
        <AdminActionBanner
          issue={shipment.pendingIssue}
          description={shipment.pendingAction}
          priority={shipment.pendingIssue.includes("Customs") ? "urgent" : "high"}
          actionLabel={shipment.documentsNeeded ? "Open documents" : "Message customer"}
          actionHref={
            shipment.documentsNeeded
              ? `#documents`
              : `/admin/support?customer=${encodeURIComponent(shipment.customer)}`
          }
        />
      ) : null}

      <AdminPageHeader />

      <div className="mb-6">
        <div className="flex flex-wrap items-center gap-3">
          <span className="rounded-full bg-sky-500/10 px-3 py-1 text-xs font-bold text-sky-700">
            {shipment.statusLabel}
          </span>
        </div>
        <p className="mt-3 text-sm text-muted">
          {shipment.origin} <span className="mx-2 text-[#ff6600]">───────────────→</span> {shipment.destination}
        </p>
        <p className="mt-1 text-sm text-muted">{shipment.freightType}</p>
        <p className="mt-2 text-sm">
          <span className="text-muted">Customer:</span>{" "}
          <span className="font-medium text-foreground">{shipment.customer}</span>
        </p>
        <p className="text-sm text-muted">
          ETD: {shipment.etd} · ETA: {shipment.eta}
        </p>
      </div>

      <AdminShipmentTimeline steps={shipment.timeline} />

      <AdminShipmentDetailTabs shipment={shipment} />
    </>
  );
}
