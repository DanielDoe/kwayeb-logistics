import { fetchAdminCustomers } from "@/lib/actions/admin";
import { AdminPageHeader } from "@/components/admin/admin-page-header";



export default async function FinanceCustomersPage() {

  const customers = await fetchAdminCustomers();



  return (

    <>
      <AdminPageHeader />

<div className="overflow-hidden rounded-xl border border-border bg-white shadow-sm">

        <table className="w-full text-left text-sm">

          <thead>

            <tr className="border-b border-border bg-surface/50 text-xs uppercase text-muted">

              <th className="px-4 py-3">Customer</th>

              <th className="px-4 py-3">Email</th>

              <th className="px-4 py-3">Balance</th>

              <th className="px-4 py-3">Status</th>

            </tr>

          </thead>

          <tbody>

            {customers.map((c, i) => (

              <tr key={c.id} className="border-b border-border/70">

                <td className="px-4 py-3 font-medium">{c.full_name ?? "—"}</td>

                <td className="px-4 py-3 text-muted">{c.email}</td>

                <td className="px-4 py-3">${(i % 3 === 0 ? 2480 : i % 3 === 1 ? 0 : 4120).toLocaleString()}</td>

                <td className="px-4 py-3">

                  <span className={`text-xs font-semibold ${i % 3 === 1 ? "text-emerald-600" : "text-amber-600"}`}>

                    {i % 3 === 1 ? "Current" : "Outstanding"}

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


