import { createAdminClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/auth/env";
import { formatTrackingDate, type TrackingShipment } from "@/lib/tracking/types";
import { formatStatusLabel } from "@/lib/tracking/status-labels";

export async function lookupInternalTracking(trackingId: string): Promise<TrackingShipment | null> {
  if (!isSupabaseConfigured()) return null;

  try {
    const supabase = createAdminClient();

    const { data: shipment, error } = await supabase
      .from("kwayeb_shipments")
      .select("*")
      .eq("tracking_id", trackingId)
      .maybeSingle();

    if (error || !shipment) return null;

    const { data: events } = await supabase
      .from("kwayeb_shipment_events")
      .select("*")
      .eq("shipment_id", shipment.id)
      .order("sort_order", { ascending: true });

    return {
      trackingId: shipment.tracking_id,
      status: formatStatusLabel(shipment.status),
      origin: shipment.origin,
      destination: shipment.destination,
      estimatedDelivery: shipment.estimated_delivery
        ? formatTrackingDate(shipment.estimated_delivery)
        : null,
      events: (events ?? []).map((event) => ({
        date: formatTrackingDate(event.event_at),
        location: event.location,
        status: event.status_label,
      })),
      source: "internal",
    };
  } catch {
    return null;
  }
}
