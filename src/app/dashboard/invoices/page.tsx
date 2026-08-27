import { CreditCard } from "lucide-react";
import { DashboardDetailRow } from "@/components/dashboard/dashboard-detail-row";
import { DashboardEmptyState } from "@/components/dashboard/dashboard-empty-state";
import { DashboardListCard } from "@/components/dashboard/dashboard-list-card";
import { DashboardPageHeader } from "@/components/dashboard/dashboard-page-header";
import { StatusBadge, formatCurrency } from "@/components/dashboard/status-badge";
import { getCustomerInvoices } from "@/lib/actions/invoices";
import { Card, CardContent } from "@/components/ui/card";

export default async function InvoicesPage() {
  const invoices = await getCustomerInvoices();

  return (
    <div className="space-y-4 sm:space-y-6">
      <DashboardPageHeader
        eyebrow="Billing"
        title="Invoices"
        description="View billing status, due dates, and payment history. Tap a row to open invoice details."
      />

      {invoices.length === 0 ? (
        <DashboardEmptyState
          icon={CreditCard}
          title="No invoices yet"
          description="Invoices appear here once a quote is accepted and billing is issued."
          actionLabel="View quotes"
          actionHref="/dashboard/quotes"
        />
      ) : (
        <Card>
          <CardContent className="p-0">
            <div className="md:hidden">
              {invoices.map((invoice) => (
                <DashboardListCard
                  key={invoice.id}
                  href={`/dashboard/invoices/${invoice.id}`}
                  title={invoice.invoice_number}
                  status={invoice.status}
                  fields={[
                    { label: "Amount", value: formatCurrency(invoice.total, invoice.currency) },
                    {
                      label: "Due date",
                      value: invoice.due_date
                        ? new Date(invoice.due_date).toLocaleDateString()
                        : "—",
                    },
                    {
                      label: "Issued",
                      value: new Date(invoice.created_at).toLocaleDateString(),
                    },
                  ]}
                />
              ))}
            </div>

            <div className="hidden overflow-x-auto md:block">
              <table className="w-full min-w-[640px] text-sm">
                <thead className="border-b border-border bg-surface">
                  <tr>
                    <th className="px-4 py-3 text-left font-medium text-muted">Invoice #</th>
                    <th className="px-4 py-3 text-left font-medium text-muted">Amount</th>
                    <th className="px-4 py-3 text-left font-medium text-muted">Status</th>
                    <th className="px-4 py-3 text-left font-medium text-muted">Due date</th>
                    <th className="px-4 py-3 text-left font-medium text-muted">Issued</th>
                    <th className="px-4 py-3 text-right font-medium text-muted">Details</th>
                  </tr>
                </thead>
                <tbody>
                  {invoices.map((invoice) => (
                    <DashboardDetailRow key={invoice.id} href={`/dashboard/invoices/${invoice.id}`}>
                      <td className="px-4 py-3 font-mono font-medium text-accent-text">
                        {invoice.invoice_number}
                      </td>
                      <td className="px-4 py-3 font-semibold text-foreground">
                        {formatCurrency(invoice.total, invoice.currency)}
                      </td>
                      <td className="px-4 py-3">
                        <StatusBadge status={invoice.status} />
                      </td>
                      <td className="px-4 py-3 text-muted">
                        {invoice.due_date ? new Date(invoice.due_date).toLocaleDateString() : "—"}
                      </td>
                      <td className="px-4 py-3 text-muted">
                        {new Date(invoice.created_at).toLocaleDateString()}
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
