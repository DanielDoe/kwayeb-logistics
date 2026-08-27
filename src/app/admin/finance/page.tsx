import Link from "next/link";

import { fetchAdminInvoices } from "@/lib/actions/admin";

import { getUserProfile } from "@/lib/supabase/server-auth";

import { AdminKpiGrid } from "@/components/admin/admin-kpi-grid";
import { AdminPageIntro } from "@/components/admin/admin-page-intro";

import { FINANCE_PAYMENTS, getGreeting } from "@/lib/admin/workspace-demo-data";



export default async function FinanceCenterPage() {

  const profile = await getUserProfile();

  const invoices = await fetchAdminInvoices();

  const unpaid = invoices.filter((i) => i.status === "ISSUED" || i.status === "OVERDUE").length;



  return (

    <>

      <AdminPageIntro>
        <h1 className="text-2xl font-bold text-foreground sm:text-3xl">Finance Center</h1>
        <p className="mt-1 text-muted">
          {profile ? getGreeting(profile.full_name) : "Welcome"} — invoices, payments, and verification.
        </p>
      </AdminPageIntro>



      <AdminKpiGrid

        columns={5}

        items={[

          { label: "Outstanding", value: "$48,520" },

          { label: "Collected This Month", value: "$72,840" },

          { label: "Unpaid Invoices", value: unpaid || 14, href: "/admin/finance/invoices" },

          { label: "Payments to Verify", value: 5, accent: true, href: "/admin/finance/payments" },

          { label: "Overdue Accounts", value: 2 },

        ]}

      />



      <div className="mt-8 overflow-hidden rounded-xl border border-border bg-white shadow-sm">

        <div className="border-b border-border px-4 py-3 sm:px-5">

          <h2 className="font-semibold text-foreground">Payments requiring verification</h2>

        </div>

        <table className="w-full min-w-[640px] text-left text-sm">

          <thead>

            <tr className="border-b border-border bg-surface/50 text-xs uppercase text-muted">

              <th className="px-4 py-2.5 sm:px-5">Customer</th>

              <th className="px-4 py-2.5">Invoice</th>

              <th className="px-4 py-2.5">Amount</th>

              <th className="px-4 py-2.5">Method</th>

              <th className="px-4 py-2.5 sm:pr-5">Status</th>

            </tr>

          </thead>

          <tbody>

            {FINANCE_PAYMENTS.map((payment) => (

              <tr key={payment.id} className="border-b border-border/70 hover:bg-surface/30">

                <td className="px-4 py-3 sm:px-5">{payment.customer}</td>

                <td className="px-4 py-3">

                  <Link href={payment.href} className="font-mono text-xs font-medium text-[#ff6600] hover:underline">

                    {payment.invoice}

                  </Link>

                </td>

                <td className="px-4 py-3">${payment.amount.toLocaleString()}</td>

                <td className="px-4 py-3 text-muted">{payment.method}</td>

                <td className="px-4 py-3 sm:pr-5">

                  <span

                    className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${

                      payment.status === "verify"

                        ? "bg-amber-500/10 text-amber-700"

                        : "bg-emerald-500/10 text-emerald-700"

                    }`}

                  >

                    {payment.status === "verify" ? "Verify" : "Confirmed"}

                  </span>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </>

  );

}


