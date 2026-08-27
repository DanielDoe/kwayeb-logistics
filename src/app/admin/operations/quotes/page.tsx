import Link from "next/link";

import { fetchAdminQuotes } from "@/lib/actions/admin";
import { AdminPageHeader } from "@/components/admin/admin-page-header";



export default async function OperationsQuotesPage() {

  const quotes = await fetchAdminQuotes();



  return (

    <>
      <AdminPageHeader />

<div className="overflow-hidden rounded-xl border border-border bg-white shadow-sm">

        <table className="w-full min-w-[640px] text-left text-sm">

          <thead>

            <tr className="border-b border-border bg-surface/50 text-xs font-semibold uppercase tracking-wide text-muted">

              <th className="px-4 py-3 sm:px-5">Quote #</th>

              <th className="px-4 py-3">Customer</th>

              <th className="px-4 py-3">Destination</th>

              <th className="px-4 py-3">Method</th>

              <th className="px-4 py-3">Status</th>

              <th className="px-4 py-3 sm:pr-5">Date</th>
              <th className="px-4 py-3 sm:pr-5">Action</th>

            </tr>

          </thead>

          <tbody>

            {quotes.map((quote) => (

              <tr key={quote.id} className="border-b border-border/70 transition hover:bg-surface/30">

                <td className="px-4 py-3 font-mono text-xs font-medium sm:px-5">{quote.quote_number}</td>

                <td className="px-4 py-3">

                  <p className="font-medium text-foreground">{quote.contact_name}</p>

                  <p className="text-xs text-muted">{quote.contact_email}</p>

                </td>

                <td className="px-4 py-3 text-muted">{quote.destination_country}</td>

                <td className="px-4 py-3 capitalize text-muted">{quote.freight_method ?? "—"}</td>

                <td className="px-4 py-3">

                  <span className="rounded-full bg-accent-soft px-2.5 py-0.5 text-xs font-medium text-accent-text">

                    {quote.status.replace(/_/g, " ")}

                  </span>

                </td>

                <td className="px-4 py-3 text-muted">
                  {new Date(quote.created_at).toLocaleDateString()}
                </td>
                <td className="px-4 py-3 sm:pr-5">
                  <Link
                    href={`/admin/operations/quotes/${quote.id}`}
                    className="text-xs font-semibold text-[#ff6600] hover:underline"
                  >
                    {quote.status === "SUBMITTED" ? "Prepare" : "View"}
                  </Link>
                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </>

  );

}


