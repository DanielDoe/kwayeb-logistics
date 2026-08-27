import Link from "next/link";
import { FileText, Package, Plus, Search } from "lucide-react";
import { DashboardActivityItem } from "@/components/dashboard/dashboard-activity-item";
import { DashboardEmptyState } from "@/components/dashboard/dashboard-empty-state";
import { DashboardPageHeader } from "@/components/dashboard/dashboard-page-header";
import { DashboardStatsPanel } from "@/components/dashboard/dashboard-stats-panel";
import { getDashboardStats, getCustomerQuotes, getCustomerShipments } from "@/lib/actions/quotes";
import { getCustomerInvoices } from "@/lib/actions/invoices";
import { bucketLastMonths, bucketLastWeek, latestUpdatedLabel } from "@/lib/dashboard/stats-trends";
import { getUserProfile } from "@/lib/supabase/server-auth";
import { ButtonLink } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export default async function DashboardPage() {
  const [stats, quotes, shipments, invoices, profile] = await Promise.all([
    getDashboardStats(),
    getCustomerQuotes(),
    getCustomerShipments(),
    getCustomerInvoices(),
    getUserProfile(),
  ]);

  const firstName = profile?.full_name?.split(/\s+/)[0];

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="space-y-5">
        <DashboardPageHeader
          eyebrow="Customer portal"
          title={firstName ? `Welcome back, ${firstName}` : "Welcome back"}
          description="Track shipments, review quotes, pay invoices, and manage your Kwayeb Logistics account from one place."
        />

        <DashboardStatsPanel
          activeQuotes={stats?.activeQuotes ?? 0}
          activeShipments={stats?.activeShipments ?? 0}
          outstandingInvoices={stats?.outstandingInvoices ?? 0}
          quoteTrend={bucketLastWeek(quotes)}
          shipmentTrend={bucketLastMonths(shipments)}
          invoiceTrend={bucketLastMonths(invoices.filter((invoice) => invoice.status !== "PAID"))}
          quoteUpdated={latestUpdatedLabel(quotes)}
          shipmentUpdated={latestUpdatedLabel(shipments)}
          invoiceUpdated={latestUpdatedLabel(invoices)}
        />
      </div>

      <Card>
        <CardHeader className="flex flex-row flex-wrap items-center justify-between gap-3 pb-4">
          <div>
            <h2 className="font-semibold text-foreground">Quick actions</h2>
            <p className="text-sm text-muted">Common tasks to keep your logistics moving.</p>
          </div>
        </CardHeader>
        <CardContent className="grid gap-3 pt-0 sm:flex sm:flex-wrap">
          <ButtonLink href="/dashboard/quotes/new" size="sm" className="w-full sm:w-auto">
            <Plus className="h-4 w-4" />
            New quote request
          </ButtonLink>
          <ButtonLink href="/dashboard/track" size="sm" variant="secondary" className="w-full sm:w-auto">
            <Search className="h-4 w-4" />
            Track shipment
          </ButtonLink>
          <ButtonLink href="/dashboard/support" size="sm" variant="outline" className="w-full sm:w-auto">
            Get support
          </ButtonLink>
        </CardContent>
      </Card>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between gap-2 pb-4">
            <div>
              <h2 className="font-semibold text-foreground">Recent quotes</h2>
              <p className="text-sm text-muted">Latest freight quotation requests</p>
            </div>
            {quotes.length > 0 ? (
              <Link href="/dashboard/quotes" className="text-xs font-semibold text-accent-text hover:underline">
                View all
              </Link>
            ) : null}
          </CardHeader>
          <CardContent className="space-y-2 pt-0">
            {quotes.length === 0 ? (
              <DashboardEmptyState
                icon={FileText}
                title="No quotes yet"
                description="Request a freight quote to see pricing and status updates here."
                actionLabel="Request a quote"
                actionHref="/dashboard/quotes/new"
              />
            ) : (
              quotes.slice(0, 5).map((q) => (
                <DashboardActivityItem
                  key={q.id}
                  href={`/dashboard/quotes/${q.id}`}
                  primary={
                    <>
                      <span className="font-mono text-accent-text">{q.quote_number}</span>
                      <span className="mx-2 text-muted">·</span>
                      {q.destination_country}
                    </>
                  }
                  secondary={`${q.freight_method ?? "Freight"} · ${new Date(q.created_at).toLocaleDateString()}`}
                  status={q.status}
                />
              ))
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between gap-2 pb-4">
            <div>
              <h2 className="font-semibold text-foreground">Recent shipments</h2>
              <p className="text-sm text-muted">Active and recent cargo movements</p>
            </div>
            {shipments.length > 0 ? (
              <Link href="/dashboard/shipments" className="text-xs font-semibold text-accent-text hover:underline">
                View all
              </Link>
            ) : null}
          </CardHeader>
          <CardContent className="space-y-2 pt-0">
            {shipments.length === 0 ? (
              <DashboardEmptyState
                icon={Package}
                title="No shipments yet"
                description="Once a quote is booked, your active shipments will appear here."
                actionLabel="Track a shipment"
                actionHref="/dashboard/track"
              />
            ) : (
              shipments.slice(0, 5).map((s) => (
                <DashboardActivityItem
                  key={s.id}
                  href={`/dashboard/track?id=${encodeURIComponent(s.tracking_id)}`}
                  primary={
                    <>
                      <span className="font-mono text-accent-text">{s.tracking_id}</span>
                      <span className="mx-2 text-muted">→</span>
                      {s.destination}
                    </>
                  }
                  secondary={`${s.destination_country} · ${s.freight_type ?? "Freight"}`}
                  status={s.status}
                />
              ))
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
