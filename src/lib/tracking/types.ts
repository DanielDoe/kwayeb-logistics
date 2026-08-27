export type TrackingEvent = {
  date: string;
  location: string;
  status: string;
};

export type TrackingShipment = {
  trackingId: string;
  status: string;
  origin: string;
  destination: string;
  estimatedDelivery: string | null;
  events: TrackingEvent[];
  source: "internal" | "demo" | "carrier";
  carrier?: string;
};

export type TrackingSuccess = {
  success: true;
  shipment: TrackingShipment;
};

export type TrackingFailure = {
  success: false;
  error: string;
};

export type TrackingResult = TrackingSuccess | TrackingFailure;

export function formatTrackingDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}
