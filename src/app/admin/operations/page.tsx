import { fetchAdminQuotes, fetchAdminShipments } from "@/lib/actions/admin";

import { getUserProfile } from "@/lib/supabase/server-auth";

import { AdminActionQueue } from "@/components/admin/admin-action-queue";

import { AdminKpiGrid } from "@/components/admin/admin-kpi-grid";

import { getGreeting, OPERATIONS_ACTION_QUEUE } from "@/lib/admin/workspace-demo-data";



export default async function OperationsControlCenterPage() {

  const profile = await getUserProfile();

  const [quotes, shipments] = await Promise.all([fetchAdminQuotes(), fetchAdminShipments()]);



  return (

    <>

      <div className="mb-8">

        <p className="text-sm font-medium text-[#ff6600]">Operations</p>

        <h1 className="mt-1 text-2xl font-bold text-foreground sm:text-3xl">Operations Control Center</h1>

        <p className="mt-1 text-muted">

          {profile ? getGreeting(profile.full_name) : "Welcome"} — here&apos;s what needs attention today.

        </p>

      </div>



      <AdminKpiGrid

        columns={5}

        items={[

          { label: "New Quote Requests", value: quotes.filter((q) => q.status === "SUBMITTED").length || 18, href: "/admin/operations/quotes" },

          { label: "Cargo Ready to Ship", value: 12, href: "/admin/operations/shipments?status=ready" },

          { label: "Active Shipments", value: shipments.length || 27, href: "/admin/operations/shipments" },

          { label: "Action Required", value: 4, accent: true },

          { label: "Delayed Shipments", value: 3, href: "/admin/operations/shipments?status=exceptions" },

        ]}

      />



      <div className="mt-8">

        <AdminActionQueue items={OPERATIONS_ACTION_QUEUE} />

      </div>



      <div className="mt-8 grid gap-6 lg:grid-cols-2">

        <div className="rounded-xl border border-border bg-white p-5 shadow-sm">

          <h2 className="text-base font-semibold text-foreground">Recent Activity</h2>

          <ul className="mt-4 space-y-3 text-sm">

            {[

              "KWY-28401 departed Guangzhou — 2 hrs ago",

              "Quote Q-01842 accepted by Apex Imports — 4 hrs ago",

              "Customs docs uploaded for KWY-28194 — 6 hrs ago",

              "New quote request from Global Retail — 8 hrs ago",

            ].map((item) => (

              <li key={item} className="flex gap-2 text-muted">

                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#ff6600]" />

                {item}

              </li>

            ))}

          </ul>

        </div>



        <div className="rounded-xl border border-border bg-white p-5 shadow-sm">

          <h2 className="text-base font-semibold text-foreground">Active Shipments</h2>

          <div className="mt-4 overflow-x-auto">

            <table className="w-full text-left text-sm">

              <thead>

                <tr className="border-b border-border text-xs uppercase text-muted">

                  <th className="pb-2 pr-4">Tracking</th>

                  <th className="pb-2 pr-4">Destination</th>

                  <th className="pb-2">Status</th>

                </tr>

              </thead>

              <tbody>

                {shipments.slice(0, 5).map((s) => (

                  <tr key={s.id} className="border-b border-border/60">

                    <td className="py-2.5 pr-4 font-mono text-xs font-medium">{s.tracking_id}</td>

                    <td className="py-2.5 pr-4 text-muted">{s.destination_country}</td>

                    <td className="py-2.5 capitalize text-muted">{s.status.replace(/_/g, " ")}</td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

        </div>

      </div>

    </>

  );

}


