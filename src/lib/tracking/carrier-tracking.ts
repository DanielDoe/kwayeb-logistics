import { formatTrackingDate, type TrackingShipment } from "@/lib/tracking/types";

const TRACKINGMORE_BASE = "https://api.trackingmore.com/v4";

type TrackingMoreCheckpoint = {
  checkpoint_date?: string;
  tracking_detail?: string;
  location?: string;
};

type TrackingMoreItem = {
  courier_code?: string;
  courier_name?: string;
  delivery_status?: string;
  origin_info?: { trackinfo?: TrackingMoreCheckpoint[] };
  destination_info?: { trackinfo?: TrackingMoreCheckpoint[] };
  latest_event?: {
    time_iso?: string;
    location?: string;
    description?: string;
  };
};

export function isCarrierTrackingConfigured() {
  return Boolean(process.env.TRACKINGMORE_API_KEY?.trim());
}

function carrierStatusLabel(status?: string) {
  const labels: Record<string, string> = {
    pending: "Pending",
    transit: "In Transit",
    pickup: "Ready for Pickup",
    delivered: "Delivered",
    undelivered: "Undelivered",
    exception: "Exception",
    expired: "Expired",
    notfound: "Not Found",
  };

  if (!status) return "In Transit";
  return labels[status.toLowerCase()] ?? status.replace(/_/g, " ");
}

async function trackingMoreRequest<T>(path: string, init?: RequestInit): Promise<T | null> {
  const apiKey = process.env.TRACKINGMORE_API_KEY?.trim();
  if (!apiKey) return null;

  try {
    const response = await fetch(`${TRACKINGMORE_BASE}${path}`, {
      ...init,
      headers: {
        "Content-Type": "application/json",
        "Tracking-Api-Key": apiKey,
        ...(init?.headers ?? {}),
      },
      cache: "no-store",
    });

    if (!response.ok) return null;

    const payload = (await response.json()) as { data?: T; meta?: { code?: number } };
    if (payload.meta?.code && payload.meta.code !== 200) return null;

    return payload.data ?? null;
  } catch {
    return null;
  }
}

async function detectCourierCode(trackingNumber: string) {
  const data = await trackingMoreRequest<{ courier_code?: string }[]>(
    "/couriers/detect",
    {
      method: "POST",
      body: JSON.stringify({ tracking_number: trackingNumber }),
    },
  );

  return data?.[0]?.courier_code ?? null;
}

function collectCarrierEvents(item: TrackingMoreItem) {
  const checkpoints = [
    ...(item.origin_info?.trackinfo ?? []),
    ...(item.destination_info?.trackinfo ?? []),
  ];

  if (checkpoints.length > 0) {
    return checkpoints
      .filter((checkpoint) => checkpoint.checkpoint_date)
      .map((checkpoint) => ({
        date: formatTrackingDate(checkpoint.checkpoint_date!),
        location: checkpoint.location ?? "—",
        status: checkpoint.tracking_detail ?? "Update",
      }));
  }

  if (item.latest_event?.time_iso) {
    return [
      {
        date: formatTrackingDate(item.latest_event.time_iso),
        location: item.latest_event.location ?? "—",
        status: item.latest_event.description ?? "Latest update",
      },
    ];
  }

  return [];
}

export async function lookupCarrierTracking(
  trackingNumber: string,
  courierCode?: string,
): Promise<TrackingShipment | null> {
  if (!isCarrierTrackingConfigured()) return null;

  const resolvedCourier = courierCode?.trim().toLowerCase() ?? (await detectCourierCode(trackingNumber));
  if (!resolvedCourier) return null;

  const data = await trackingMoreRequest<{ items?: TrackingMoreItem[] }>(
    "/trackings/create",
    {
      method: "POST",
      body: JSON.stringify({
        tracking_number: trackingNumber,
        courier_code: resolvedCourier,
        language: "en",
      }),
    },
  );

  const item = data?.items?.[0];
  if (!item) return null;

  const events = collectCarrierEvents(item);
  const latest = events.at(-1);

  return {
    trackingId: trackingNumber,
    status: carrierStatusLabel(item.delivery_status),
    origin: latest?.location ?? "Origin pending",
    destination: "See carrier updates below",
    estimatedDelivery: null,
    events,
    source: "carrier",
    carrier: item.courier_name ?? resolvedCourier.toUpperCase(),
  };
}
