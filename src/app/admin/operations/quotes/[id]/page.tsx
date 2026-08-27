import { notFound } from "next/navigation";
import { AdminActionBanner } from "@/components/admin/admin-action-banner";
import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { AdminQuotePrepareForm } from "@/components/admin/admin-quote-prepare-form";
import { fetchAdminQuoteById } from "@/lib/actions/admin";

export default async function AdminQuoteDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const quote = await fetchAdminQuoteById(id);

  if (!quote) notFound();

  return (
    <>
      {quote.pendingIssue ? (
        <AdminActionBanner
          issue={quote.pendingIssue}
          description="Review the request details below and prepare pricing for the customer."
          priority="normal"
        />
      ) : null}

      <AdminPageHeader />

      <div className="mb-6 flex flex-wrap items-start justify-between gap-4">
        <p className="text-sm text-muted">
          {quote.customer} · {quote.contactEmail}
        </p>
        <span className="rounded-full bg-amber-500/10 px-3 py-1 text-xs font-bold text-amber-700">
          {quote.statusLabel}
        </span>
      </div>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
        <div className="rounded-xl border border-border bg-white p-5 shadow-sm">
          <h2 className="font-semibold text-foreground">Request details</h2>
          <dl className="mt-4 grid gap-4 sm:grid-cols-2">
            <div>
              <dt className="text-xs font-semibold uppercase tracking-wide text-muted">Origin</dt>
              <dd className="mt-1 text-sm text-foreground">{quote.origin}</dd>
            </div>
            <div>
              <dt className="text-xs font-semibold uppercase tracking-wide text-muted">Destination</dt>
              <dd className="mt-1 text-sm text-foreground">{quote.destination}</dd>
            </div>
            <div>
              <dt className="text-xs font-semibold uppercase tracking-wide text-muted">Freight method</dt>
              <dd className="mt-1 text-sm text-foreground">{quote.freightMethod}</dd>
            </div>
            <div>
              <dt className="text-xs font-semibold uppercase tracking-wide text-muted">Submitted</dt>
              <dd className="mt-1 text-sm text-foreground">{quote.submittedAt}</dd>
            </div>
          </dl>
          <div className="mt-6">
            <p className="text-xs font-semibold uppercase tracking-wide text-muted">Cargo description</p>
            <p className="mt-2 rounded-xl border border-border bg-surface/50 p-4 text-sm text-foreground">
              {quote.cargoDescription}
            </p>
          </div>
        </div>

        <AdminQuotePrepareForm quoteNumber={quote.quoteNumber} customer={quote.customer} />
      </div>
    </>
  );
}
