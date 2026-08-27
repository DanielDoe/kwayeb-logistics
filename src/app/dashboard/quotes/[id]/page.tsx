import { notFound } from "next/navigation";
import { DashboardSubpageHeader } from "@/components/dashboard/dashboard-page-header";
import { DetailField, RecordDetailShell } from "@/components/dashboard/record-detail-shell";
import { StatusBadge } from "@/components/dashboard/status-badge";
import { getCustomerQuoteById } from "@/lib/actions/quotes";
import { Card, CardContent } from "@/components/ui/card";

export default async function QuoteDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const quote = await getCustomerQuoteById(id);

  if (!quote) notFound();

  const routeLabel = [quote.origin_city, quote.origin_country].filter(Boolean).join(", ") || "China";
  const destinationLabel = [quote.destination_city, quote.destination_country].filter(Boolean).join(", ");

  return (
    <RecordDetailShell backHref="/dashboard/quotes" backLabel="Back to quotes">
      <DashboardSubpageHeader />

      <Card>
        <CardContent className="space-y-6 p-4 sm:p-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <DetailField label="Quote number" value={quote.quote_number} />
            <StatusBadge status={quote.status} />
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <DetailField label="Origin" value={routeLabel} />
            <DetailField label="Destination" value={destinationLabel || quote.destination_country} />
            <DetailField label="Freight method" value={quote.freight_method ?? "—"} />
            <DetailField
              label="Submitted"
              value={new Date(quote.created_at).toLocaleDateString(undefined, {
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
            />
            {quote.contact_name ? <DetailField label="Contact" value={quote.contact_name} /> : null}
            {quote.contact_email ? <DetailField label="Email" value={quote.contact_email} /> : null}
          </div>

          {quote.item_description ? (
            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-muted">Cargo description</p>
              <p className="mt-2 rounded-xl border border-border bg-surface/50 p-4 text-sm text-foreground">
                {quote.item_description}
              </p>
            </div>
          ) : (
            <p className="text-sm text-muted">
              Pricing team is reviewing this request. You will receive updates here as the quote moves through review.
            </p>
          )}
        </CardContent>
      </Card>
    </RecordDetailShell>
  );
}
