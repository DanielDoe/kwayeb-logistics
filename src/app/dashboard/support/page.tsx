import { MessageSquare } from "lucide-react";
import { DashboardEmptyState } from "@/components/dashboard/dashboard-empty-state";
import { DashboardSubpageHeader } from "@/components/dashboard/dashboard-page-header";
import { StatusBadge } from "@/components/dashboard/status-badge";
import { SupportTicketForm } from "@/components/dashboard/support-ticket-form";
import { getCustomerSupportTickets } from "@/lib/actions/support";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

function formatCategory(category: string) {
  return category.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}

export default async function SupportPage() {
  const tickets = await getCustomerSupportTickets();

  return (
    <div className="space-y-4 sm:space-y-6">
      <DashboardSubpageHeader />

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader className="pb-4" id="support-ticket-form">
            <h2 className="font-semibold text-foreground">New support ticket</h2>
            <p className="text-sm text-muted">We typically respond within one business day.</p>
          </CardHeader>
          <CardContent className="pt-0">
            <SupportTicketForm />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between gap-2 pb-4">
            <div>
              <h2 className="font-semibold text-foreground">Your tickets</h2>
              <p className="text-sm text-muted">{tickets.length} open or recent</p>
            </div>
          </CardHeader>
          <CardContent className="space-y-3 pt-0">
            {tickets.length === 0 ? (
              <DashboardEmptyState
                icon={MessageSquare}
                title="No tickets yet"
                description="Submit a ticket using the form on the left."
                actionLabel="New ticket"
                actionHref="#support-ticket-form"
                className="py-8"
              />
            ) : (
              tickets.map((ticket) => (
                <div
                  key={ticket.id}
                  className="rounded-xl border border-border bg-surface/50 p-4 transition hover:border-[color-mix(in_srgb,var(--accent)_25%,transparent)]"
                >
                  <div className="flex flex-wrap items-start justify-between gap-2">
                    <div>
                      <p className="font-mono text-xs font-medium text-accent-text">{ticket.ticket_number}</p>
                      <p className="mt-1 font-medium text-foreground">{ticket.subject}</p>
                      <p className="mt-1 text-xs text-muted">
                        {formatCategory(ticket.category)} · {new Date(ticket.created_at).toLocaleDateString()}
                      </p>
                    </div>
                    <StatusBadge status={ticket.status} />
                  </div>
                </div>
              ))
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
