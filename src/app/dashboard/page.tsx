import Link from "next/link";
import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { getDashboardStats, getCustomerQuotes, getCustomerShipments } from "@/lib/actions/quotes";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default async function DashboardPage() {
  const [stats, quotes, shipments] = await Promise.all([
    getDashboardStats(),
    getCustomerQuotes(),
    getCustomerShipments(),
  ]);

  return (
    <DashboardShell>
      <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
      <p className="mt-1 text-muted">Manage your shipments, quotes, and account.</p>

      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        {[
          { label: "Active quotes", value: stats?.activeQuotes ?? 0 },
          { label: "Active shipments", value: stats?.activeShipments ?? 0 },
          { label: "Outstanding invoices", value: stats?.outstandingInvoices ?? 0 },
        ].map((s) => (
          <Card key={s.label}>
            <CardContent className="p-5">
              <p className="text-2xl font-bold text-foreground">{s.value}</p>
              <p className="text-sm text-muted">{s.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-8 flex gap-3">
        <Link href="/source"><Button size="sm">New Quote Request</Button></Link>
        <Link href="/track"><Button size="sm" variant="secondary">Track Shipment</Button></Link>
      </div>

      <div className="mt-10 grid gap-8 lg:grid-cols-2">
        <div>
          <h2 className="font-semibold text-foreground">Recent Quotes</h2>
          {quotes.length === 0 ? (
            <p className="mt-2 text-sm text-muted">No quotes yet.</p>
          ) : (
            <ul className="mt-3 space-y-2">
              {quotes.slice(0, 5).map((q) => (
                <li key={q.id} className="rounded-lg border border-border bg-card px-4 py-3 text-sm">
                  <span className="font-mono text-accent-text">{q.quote_number}</span>
                  <span className="mx-2 text-muted">·</span>
                  <span className="text-foreground">{q.destination_country}</span>
                  <span className="ml-2 text-xs text-muted">{q.status}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
        <div>
          <h2 className="font-semibold text-foreground">Recent Shipments</h2>
          {shipments.length === 0 ? (
            <p className="mt-2 text-sm text-muted">No shipments yet.</p>
          ) : (
            <ul className="mt-3 space-y-2">
              {shipments.slice(0, 5).map((s) => (
                <li key={s.id} className="rounded-lg border border-border bg-card px-4 py-3 text-sm">
                  <Link href="/track" className="font-mono text-accent-text hover:underline">{s.tracking_id}</Link>
                  <span className="mx-2 text-muted">→</span>
                  <span className="text-foreground">{s.destination}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </DashboardShell>
  );
}
