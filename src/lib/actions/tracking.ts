"use server";

import { lookupCarrierTracking, isCarrierTrackingConfigured } from "@/lib/tracking/carrier-tracking";
import { lookupDemoTracking } from "@/lib/tracking/demo-tracking";
import { lookupInternalTracking } from "@/lib/tracking/internal-tracking";
import type { TrackingResult } from "@/lib/tracking/types";
import { trackingQuerySchema } from "@/lib/validations";

export type { TrackingResult } from "@/lib/tracking/types";

export async function trackShipment(
  trackingId: string,
  carrierCode?: string,
): Promise<TrackingResult> {
  const parsed = trackingQuerySchema.safeParse({ trackingId, carrierCode });

  if (!parsed.success) {
    return { success: false, error: parsed.error.issues[0]?.message ?? "Invalid tracking ID" };
  }

  const normalizedId = parsed.data.trackingId;

  const internal = await lookupInternalTracking(normalizedId);
  if (internal) {
    return { success: true, shipment: internal };
  }

  const demo = await lookupDemoTracking(normalizedId);
  if (demo) {
    return { success: true, shipment: demo };
  }

  const carrier = await lookupCarrierTracking(normalizedId, parsed.data.carrierCode);
  if (carrier) {
    return { success: true, shipment: carrier };
  }

  if (isCarrierTrackingConfigured()) {
    return {
      success: false,
      error: "No shipment found with that tracking ID. For carrier numbers, select the courier or verify the number.",
    };
  }

  return {
    success: false,
    error: "No shipment found with that tracking ID. Try a Kwayeb ID such as KW-TRK-88421 or KWY-2026-001.",
  };
}
