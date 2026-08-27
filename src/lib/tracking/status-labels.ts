import type { ShipmentStatus } from "@/types/database";

export const STATUS_LABELS: Record<ShipmentStatus, string> = {
  processing: "Processing",
  consolidated: "Consolidated",
  in_transit: "In Transit",
  customs: "Customs Clearance",
  out_for_delivery: "Out for Delivery",
  delivered: "Delivered",
  delayed: "Delayed",
};

export function formatStatusLabel(status: string) {
  if (status in STATUS_LABELS) {
    return STATUS_LABELS[status as ShipmentStatus];
  }

  return status
    .replace(/_/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
}
