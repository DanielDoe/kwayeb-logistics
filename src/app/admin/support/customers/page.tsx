import { fetchAdminCustomers } from "@/lib/actions/admin";
import { AdminPageHeader } from "@/components/admin/admin-page-header";



export default async function SupportCustomersPage() {

  const customers = await fetchAdminCustomers();



  return (

    <>
      <AdminPageHeader />

<div className="overflow-hidden rounded-xl border border-border bg-white shadow-sm">

        <table className="w-full text-left text-sm">

          <thead>

            <tr className="border-b border-border bg-surface/50 text-xs uppercase text-muted">

              <th className="px-4 py-3">Name</th>

              <th className="px-4 py-3">Email</th>

              <th className="px-4 py-3">Company</th>

            </tr>

          </thead>

          <tbody>

            {customers.map((c) => (

              <tr key={c.id} className="border-b border-border/70">

                <td className="px-4 py-3 font-medium">{c.full_name ?? "—"}</td>

                <td className="px-4 py-3 text-muted">{c.email}</td>

                <td className="px-4 py-3 text-muted">{c.company ?? "—"}</td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </>

  );

}


