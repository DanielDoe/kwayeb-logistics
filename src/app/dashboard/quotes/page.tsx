import { FileText } from "lucide-react";
import { DashboardDetailRow } from "@/components/dashboard/dashboard-detail-row";
import { DashboardEmptyState } from "@/components/dashboard/dashboard-empty-state";
import { DashboardListCard, DashboardListToolbar } from "@/components/dashboard/dashboard-list-card";
import { DashboardPageHeader } from "@/components/dashboard/dashboard-page-header";
import { StatusBadge } from "@/components/dashboard/status-badge";
import { getCustomerQuotes } from "@/lib/actions/quotes";
import { ButtonLink } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default async function QuotesPage() {
  const quotes = await getCustomerQuotes();

  return (
    <div className="space-y-4 sm:space-y-6">
      <DashboardPageHeader
        eyebrow="Pricing"
        title="Quote requests"
        description="Track the status of your freight quotations. Tap a row to view full quote details."
      />

      {quotes.length === 0 ? (
        <DashboardEmptyState
          icon={FileText}
          title="No quote requests yet"
          description="Start a new quote to receive pricing for your China-to-Africa shipment."
          actionLabel="New quote request"
          actionHref="/dashboard/quotes/new"
        />
      ) : (
        <Card>
          <CardContent className="p-0">
            <DashboardListToolbar>
              <ButtonLink href="/dashboard/quotes/new" size="sm" className="w-full sm:w-auto">
                New quote request
              </ButtonLink>
            </DashboardListToolbar>

            <div className="md:hidden">
              {quotes.map((quote) => (
                <DashboardListCard
                  key={quote.id}
                  href={`/dashboard/quotes/${quote.id}`}
                  title={quote.quote_number}
                  status={quote.status}
                  fields={[
                    { label: "Destination", value: quote.destination_country },
                    { label: "Method", value: quote.freight_method ?? "—" },
                    {
                      label: "Submitted",
                      value: new Date(quote.created_at).toLocaleDateString(),
                    },
                  ]}
                />
              ))}
            </div>

            <div className="hidden overflow-x-auto md:block">
              <table className="w-full min-w-[640px] text-sm">
                <thead className="border-b border-border bg-surface">
                  <tr>
                    <th className="px-4 py-3 text-left font-medium text-muted">Quote #</th>
                    <th className="px-4 py-3 text-left font-medium text-muted">Destination</th>
                    <th className="px-4 py-3 text-left font-medium text-muted">Method</th>
                    <th className="px-4 py-3 text-left font-medium text-muted">Status</th>
                    <th className="px-4 py-3 text-left font-medium text-muted">Submitted</th>
                    <th className="px-4 py-3 text-right font-medium text-muted">Details</th>
                  </tr>
                </thead>
                <tbody>
                  {quotes.map((quote) => (
                    <DashboardDetailRow key={quote.id} href={`/dashboard/quotes/${quote.id}`}>
                      <td className="px-4 py-3 font-mono font-medium text-accent-text">
                        {quote.quote_number}
                      </td>
                      <td className="px-4 py-3 text-foreground">{quote.destination_country}</td>
                      <td className="px-4 py-3 text-muted">{quote.freight_method ?? "—"}</td>
                      <td className="px-4 py-3">
                        <StatusBadge status={quote.status} />
                      </td>
                      <td className="px-4 py-3 text-muted">
                        {new Date(quote.created_at).toLocaleDateString()}
                      </td>
                    </DashboardDetailRow>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
