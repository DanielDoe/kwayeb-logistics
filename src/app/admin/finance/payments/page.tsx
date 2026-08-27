import { FINANCE_PAYMENTS } from "@/lib/admin/workspace-demo-data";
import { AdminPageHeader } from "@/components/admin/admin-page-header";



export default function FinancePaymentsPage() {

  const pending = FINANCE_PAYMENTS.filter((p) => p.status === "verify");



  return (

    <>
      <AdminPageHeader />

<div className="space-y-3">

        {pending.map((payment) => (

          <div key={payment.id} className="flex flex-wrap items-center justify-between gap-4 rounded-xl border border-border bg-white p-4 shadow-sm">

            <div>

              <p className="font-medium text-foreground">{payment.customer}</p>

              <p className="font-mono text-sm text-muted">{payment.invoice} · ${payment.amount.toLocaleString()} · {payment.method}</p>

            </div>

            <div className="flex gap-2">

              <button type="button" className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white">

                Confirm Payment

              </button>

              <button type="button" className="rounded-lg border border-border px-4 py-2 text-sm font-medium">

                Reject

              </button>

            </div>

          </div>

        ))}

      </div>

    </>

  );

}


