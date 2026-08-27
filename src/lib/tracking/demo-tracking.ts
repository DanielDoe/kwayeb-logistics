import { findDemoShipmentByTrackingId } from "@/lib/auth/demo-data";
import { formatTrackingDate, type TrackingShipment } from "@/lib/tracking/types";
import { formatStatusLabel } from "@/lib/tracking/status-labels";

export async function lookupDemoTracking(trackingId: string): Promise<TrackingShipment | null> {
  const shipment = await findDemoShipmentByTrackingId(trackingId);
  if (!shipment) return null;

  return {
    trackingId: shipment.tracking_id,
    status: formatStatusLabel(shipment.status),
    origin: shipment.origin,
    destination: `${shipment.destination}, ${shipment.destination_country}`,
    estimatedDelivery: shipment.estimated_delivery
      ? formatTrackingDate(shipment.estimated_delivery)
      : null,
    events: shipment.events.map((event) => ({
      date: formatTrackingDate(event.event_at),
      location: event.location,
      status: event.status_label,
    })),
    source: "demo",
  };
}
