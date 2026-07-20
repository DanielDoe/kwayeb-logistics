"use server";

import { createAdminClient } from "@/lib/supabase/server";
import { trackingQuerySchema } from "@/lib/validations";
import type { ShipmentStatus, ShipmentWithEvents } from "@/types/database";

const STATUS_LABELS: Record<ShipmentStatus, string> = {
  processing: "Processing",
  consolidated: "Consolidated",
  in_transit: "In Transit",
  customs: "Customs Clearance",
  out_for_delivery: "Out for Delivery",
  delivered: "Delivered",
  delayed: "Delayed",
};

export type TrackingResult =
  | {
      success: true;
      shipment: {
        trackingId: string;
        status: string;
        origin: string;
        destination: string;
        estimatedDelivery: string | null;
        events: { date: string; location: string; status: string }[];
      };
    }
  | { success: false; error: string };

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export async function trackShipment(trackingId: string): Promise<TrackingResult> {
  const parsed = trackingQuerySchema.safeParse({ trackingId });

  if (!parsed.success) {
    return { success: false, error: parsed.error.issues[0]?.message ?? "Invalid tracking ID" };
  }

  try {
    const supabase = createAdminClient();

    const { data: shipment, error } = await supabase
      .from("kwayeb_shipments")
      .select("*")
      .eq("tracking_id", parsed.data.trackingId)
      .maybeSingle();

    if (error) {
      if (error.code === "42P01") {
        return { success: false, error: "Tracking system is being set up. Try again shortly." };
      }
      return { success: false, error: error.message };
    }

    if (!shipment) {
      return { success: false, error: "No shipment found with that tracking ID." };
    }

    const { data: events, error: eventsError } = await supabase
      .from("kwayeb_shipment_events")
      .select("*")
      .eq("shipment_id", shipment.id)
      .order("sort_order", { ascending: true });

    if (eventsError) {
      return { success: false, error: eventsError.message };
    }

    const typed = shipment as ShipmentWithEvents;

    return {
      success: true,
      shipment: {
        trackingId: typed.tracking_id,
        status: STATUS_LABELS[typed.status] ?? typed.status,
        origin: typed.origin,
        destination: typed.destination,
        estimatedDelivery: typed.estimated_delivery
          ? formatDate(typed.estimated_delivery)
          : null,
        events: (events ?? []).map((e) => ({
          date: formatDate(e.event_at),
          location: e.location,
          status: e.status_label,
        })),
      },
    };
  } catch {
    return { success: false, error: "Unable to track shipment. Please try again." };
  }
}
