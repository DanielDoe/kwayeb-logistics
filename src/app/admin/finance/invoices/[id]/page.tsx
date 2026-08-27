import Link from "next/link";

import { DEMO_INVOICE } from "@/lib/admin/workspace-demo-data";



export default function InvoiceDetailPage() {

  const invoice = DEMO_INVOICE;



  return (

    <>

      <div className="mb-6 flex flex-wrap items-start justify-between gap-4">

        <div>

          <p className="text-sm font-semibold uppercase tracking-widest text-muted">Invoice</p>

          <h1 className="font-mono text-2xl font-bold text-foreground">{invoice.invoiceNumber}</h1>

          <p className="mt-2 text-3xl font-bold text-foreground">

            ${invoice.total.toLocaleString()}.00 {invoice.currency}

          </p>

          <span className="mt-2 inline-flex rounded-full bg-amber-500/10 px-3 py-1 text-xs font-bold text-amber-700">

            {invoice.statusLabel}

          </span>

        </div>

        <div className="flex flex-wrap gap-2">

          <button type="button" className="rounded-lg bg-[#ff6600] px-4 py-2 text-sm font-semibold text-white">

            Record Payment

          </button>

          <button type="button" className="rounded-lg border border-border bg-white px-4 py-2 text-sm font-medium">

            Send Reminder

          </button>

          <button type="button" className="rounded-lg border border-border bg-white px-4 py-2 text-sm font-medium">

            Download Invoice

          </button>

        </div>

      </div>



      <div className="grid gap-6 lg:grid-cols-3">

        <div className="rounded-xl border border-border bg-white p-5 shadow-sm lg:col-span-2">

          <h2 className="font-semibold text-foreground">Line Items</h2>

          <ul className="mt-4 space-y-2">

            {invoice.lineItems.map((item) => (

              <li key={item.label} className="flex justify-between text-sm">

                <span className="text-muted">{item.label}</span>

                <span className="font-medium">${item.amount.toLocaleString()}</span>

              </li>

            ))}

            <li className="flex justify-between border-t border-border pt-3 text-base font-bold">

              <span>TOTAL</span>

              <span>${invoice.total.toLocaleString()}</span>

            </li>

          </ul>

        </div>



        <div className="space-y-4">

          <div className="rounded-xl border border-border bg-white p-5 shadow-sm">

            <p className="text-xs font-semibold uppercase text-muted">Customer</p>

            <p className="mt-1 font-medium">{invoice.customer}</p>

          </div>

          <div className="rounded-xl border border-border bg-white p-5 shadow-sm">

            <p className="text-xs font-semibold uppercase text-muted">Shipment</p>

            <Link href="/admin/operations/shipments/kwy-28401" className="mt-1 block font-mono text-sm font-bold text-[#ff6600] hover:underline">

              {invoice.shipment}

            </Link>

          </div>

          <div className="rounded-xl border border-border bg-white p-5 shadow-sm text-sm">

            <p><span className="text-muted">Issued:</span> {invoice.issued}</p>

            <p className="mt-1"><span className="text-muted">Due:</span> {invoice.due}</p>

          </div>

        </div>

      </div>

    </>

  );

}


