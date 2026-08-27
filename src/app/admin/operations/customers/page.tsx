import { fetchAdminCustomers } from "@/lib/actions/admin";



export default async function OperationsCustomersPage() {

  const customers = await fetchAdminCustomers();



  return (

    <>

      <div className="mb-6">

        <h1 className="text-2xl font-bold text-foreground">Customers</h1>

        <p className="mt-1 text-muted">Accounts and contacts for operations workflows.</p>

      </div>



      <div className="overflow-hidden rounded-xl border border-border bg-white shadow-sm">

        <table className="w-full min-w-[480px] text-left text-sm">

          <thead>

            <tr className="border-b border-border bg-surface/50 text-xs font-semibold uppercase tracking-wide text-muted">

              <th className="px-4 py-3 sm:px-5">Name</th>

              <th className="px-4 py-3">Email</th>

              <th className="px-4 py-3">Company</th>

              <th className="px-4 py-3 sm:pr-5">Type</th>

            </tr>

          </thead>

          <tbody>

            {customers.map((customer) => (

              <tr key={customer.id} className="border-b border-border/70 transition hover:bg-surface/30">

                <td className="px-4 py-3 font-medium sm:px-5">{customer.full_name ?? "—"}</td>

                <td className="px-4 py-3 text-muted">{customer.email}</td>

                <td className="px-4 py-3 text-muted">{customer.company ?? "—"}</td>

                <td className="px-4 py-3 capitalize text-muted sm:pr-5">{customer.role}</td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </>

  );

}


