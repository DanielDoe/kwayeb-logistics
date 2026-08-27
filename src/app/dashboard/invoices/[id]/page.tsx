import { notFound } from "next/navigation";
import { DashboardPageHeader } from "@/components/dashboard/dashboard-page-header";
import { DetailField, RecordDetailShell } from "@/components/dashboard/record-detail-shell";
import { StatusBadge, formatCurrency } from "@/components/dashboard/status-badge";
import { getCustomerInvoiceById } from "@/lib/actions/invoices";
import { Card, CardContent } from "@/components/ui/card";

export default async function InvoiceDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const invoice = await getCustomerInvoiceById(id);

  if (!invoice) notFound();

  return (
    <RecordDetailShell backHref="/dashboard/invoices" backLabel="Back to invoices">
      <DashboardPageHeader
        eyebrow="Billing"
        title={invoice.invoice_number}
        description="Review amount, due date, and payment status for this invoice."
      />

      <Card>
        <CardContent className="space-y-6 p-4 sm:p-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <DetailField label="Invoice number" value={invoice.invoice_number} />
            <StatusBadge status={invoice.status} />
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <DetailField
              label="Amount due"
              value={formatCurrency(invoice.total, invoice.currency)}
            />
            <DetailField label="Status" value={invoice.status.replace(/_/g, " ")} />
            <DetailField
              label="Due date"
              value={
                invoice.due_date
                  ? new Date(invoice.due_date).toLocaleDateString(undefined, {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })
                  : "—"
              }
            />
            <DetailField
              label="Issued"
              value={new Date(invoice.created_at).toLocaleDateString(undefined, {
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
            />
          </div>

          {invoice.status === "PAID" ? (
            <p className="rounded-xl border border-emerald-500/20 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-700 dark:text-emerald-300">
              This invoice has been paid. Contact support if you need a receipt or have billing questions.
            </p>
          ) : (
            <p className="rounded-xl border border-border bg-surface/50 px-4 py-3 text-sm text-muted">
              Payment instructions will be sent by our billing team. Open a support ticket if you need help with this invoice.
            </p>
          )}
        </CardContent>
      </Card>
    </RecordDetailShell>
  );
}
