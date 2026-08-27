import Link from "next/link";

import { fetchAdminInvoices } from "@/lib/actions/admin";



export default async function FinanceInvoicesPage() {

  const invoices = await fetchAdminInvoices();



  return (

    <>

      <div className="mb-6">

        <h1 className="text-2xl font-bold text-foreground">Invoices</h1>

        <p className="mt-1 text-muted">Manage billing and payment status.</p>

      </div>



      <div className="overflow-hidden rounded-xl border border-border bg-white shadow-sm">

        <table className="w-full min-w-[640px] text-left text-sm">

          <thead>

            <tr className="border-b border-border bg-surface/50 text-xs uppercase text-muted">

              <th className="px-4 py-3 sm:px-5">Invoice #</th>

              <th className="px-4 py-3">Customer</th>

              <th className="px-4 py-3">Amount</th>

              <th className="px-4 py-3">Status</th>

              <th className="px-4 py-3">Due</th>

              <th className="px-4 py-3 sm:pr-5">Action</th>

            </tr>

          </thead>

          <tbody>

            {invoices.map((invoice) => (

              <tr key={invoice.id} className="border-b border-border/70 hover:bg-surface/30">

                <td className="px-4 py-3 font-mono text-xs font-medium sm:px-5">{invoice.invoice_number}</td>

                <td className="px-4 py-3 text-muted">{invoice.contact_name ?? "—"}</td>

                <td className="px-4 py-3 font-medium">

                  {invoice.currency} {Number(invoice.total).toLocaleString()}

                </td>

                <td className="px-4 py-3">

                  <span className="rounded-full bg-accent-soft px-2.5 py-0.5 text-xs font-medium text-accent-text">

                    {invoice.status}

                  </span>

                </td>

                <td className="px-4 py-3 text-muted">

                  {invoice.due_date ? new Date(invoice.due_date).toLocaleDateString() : "—"}

                </td>

                <td className="px-4 py-3 sm:pr-5">

                  <Link

                    href={`/admin/finance/invoices/${invoice.invoice_number.toLowerCase().replace(/\s+/g, "-")}`}

                    className="text-xs font-semibold text-[#ff6600] hover:underline"

                  >

                    View

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


