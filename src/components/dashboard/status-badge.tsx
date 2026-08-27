import { Badge } from "@/components/ui/badge";

const STATUS_VARIANTS: Record<string, "default" | "amber" | "green" | "blue"> = {
  SUBMITTED: "blue",
  UNDER_REVIEW: "blue",
  QUOTE_READY: "amber",
  ACCEPTED: "green",
  OPEN: "amber",
  ASSIGNED: "blue",
  WAITING_FOR_CUSTOMER: "amber",
  RESOLVED: "green",
  CLOSED: "default",
  ISSUED: "amber",
  PARTIALLY_PAID: "amber",
  PAID: "green",
  OVERDUE: "amber",
  DRAFT: "default",
  in_transit: "blue",
  booked: "blue",
  pending: "default",
  customs: "amber",
  out_for_delivery: "blue",
  delivered: "green",
};

function formatStatus(status: string) {
  return status.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}

export function StatusBadge({ status }: { status: string }) {
  const variant = STATUS_VARIANTS[status] ?? "default";
  return <Badge variant={variant}>{formatStatus(status)}</Badge>;
}

export function formatCurrency(amount: number, currency = "USD") {
  return new Intl.NumberFormat("en-US", { style: "currency", currency }).format(amount);
}
