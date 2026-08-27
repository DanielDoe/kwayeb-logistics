import { redirect } from "next/navigation";

import Link from "next/link";

import { fetchAdminStats } from "@/lib/actions/admin";

import { getStaffHomePath } from "@/lib/auth/roles";

import { getUserProfile } from "@/lib/supabase/server-auth";

import { AdminKpiGrid } from "@/components/admin/admin-kpi-grid";

import { getGreeting } from "@/lib/admin/workspace-demo-data";



export default async function AdminExecutivePage() {

  const profile = await getUserProfile();

  if (!profile) redirect("/login");



  if (profile.role !== "admin") {

    redirect(getStaffHomePath(profile.role));

  }



  const stats = await fetchAdminStats();



  return (

    <>

      <div className="mb-8">

        <p className="text-sm font-medium text-muted">Kwayeb Logistics · Administration</p>

        <h1 className="mt-1 text-2xl font-bold text-foreground sm:text-3xl">{getGreeting(profile.full_name)}</h1>

        <p className="mt-1 text-muted">Company-level overview across all departments.</p>

      </div>



      <AdminKpiGrid

        columns={4}

        items={[

          { label: "Active Shipments", value: stats.activeShipments || 184 },

          { label: "Revenue (30 days)", value: "$126,480" },

          { label: "Cargo in Warehouse", value: 43 },

          { label: "On-Time Shipments", value: "92%" },

        ]}

      />



      <div className="mt-4">

        <AdminKpiGrid

          columns={4}

          items={[

            { label: "New Customers (30 days)", value: 28 },

            { label: "Avg. Quote Response", value: "4.8 hrs" },

            { label: "Operational Exceptions", value: 7, accent: true },

            { label: "Open Support Tickets", value: stats.openTickets || 6 },

          ]}

        />

      </div>



      <div className="mt-8 grid gap-6 lg:grid-cols-2">

        <div className="rounded-xl border border-border bg-white p-5 shadow-sm">

          <h2 className="text-base font-semibold text-foreground">Shipment Volume</h2>

          <p className="mt-1 text-sm text-muted">Air · Sea · Express · LCL · FCL</p>

          <div className="mt-6 flex h-40 items-end justify-between gap-2 px-2">

            {[65, 88, 42, 76, 54].map((h, i) => (

              <div key={i} className="flex flex-1 flex-col items-center gap-2">

                <div className="w-full rounded-t-md bg-[#0a1d37]/80" style={{ height: `${h}%` }} />

                <span className="text-[10px] text-muted">{["Air", "Sea", "Exp", "LCL", "FCL"][i]}</span>

              </div>

            ))}

          </div>

        </div>



        <div className="rounded-xl border border-border bg-white p-5 shadow-sm">

          <h2 className="text-base font-semibold text-foreground">Top Routes</h2>

          <ul className="mt-4 space-y-3">

            {[

              { route: "China → Ghana", pct: 34 },

              { route: "China → United States", pct: 22 },

              { route: "China → United Kingdom", pct: 16 },

              { route: "China → Nigeria", pct: 14 },

              { route: "China → Germany", pct: 9 },

            ].map((item) => (

              <li key={item.route}>

                <div className="flex justify-between text-sm">

                  <span className="text-foreground">{item.route}</span>

                  <span className="text-muted">{item.pct}%</span>

                </div>

                <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-surface">

                  <div className="h-full rounded-full bg-[#ff6600]" style={{ width: `${item.pct}%` }} />

                </div>

              </li>

            ))}

          </ul>

        </div>

      </div>



      <div className="mt-8 rounded-xl border border-border bg-white p-5 shadow-sm">

        <h2 className="text-base font-semibold text-foreground">Operational Health</h2>

        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">

          {[

            { label: "Quotes awaiting action", value: stats.newQuotes || 8, href: "/admin/operations/quotes" },

            { label: "Warehouse exceptions", value: 3, href: "/admin/warehouse/exceptions" },

            { label: "Payment verification", value: 5, href: "/admin/finance/payments" },

            { label: "Delayed shipments", value: 4, href: "/admin/operations/shipments?status=exceptions" },

            { label: "Unassigned tickets", value: 6, href: "/admin/support?filter=unassigned" },

          ].map((item) => (

            <Link

              key={item.label}

              href={item.href}

              className="rounded-lg border border-border p-3 transition hover:border-[#ff6600]/30 hover:bg-accent-soft/30"

            >

              <p className="text-xl font-bold text-foreground">{item.value}</p>

              <p className="mt-1 text-xs text-muted">{item.label}</p>

            </Link>

          ))}

        </div>

      </div>



      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

        {[

          { title: "Operations", href: "/admin/operations", desc: "Quotes, shipments & bookings" },

          { title: "Warehouse", href: "/admin/warehouse", desc: "Receive, inspect & dispatch" },

          { title: "Finance", href: "/admin/finance", desc: "Invoices & payments" },

          { title: "Support", href: "/admin/support", desc: "Customer conversations" },

        ].map((dept) => (

          <Link

            key={dept.href}

            href={dept.href}

            className="rounded-xl border border-border bg-white p-4 shadow-sm transition hover:border-[#ff6600]/30 hover:shadow-md"

          >

            <h3 className="font-semibold text-foreground">{dept.title}</h3>

            <p className="mt-1 text-sm text-muted">{dept.desc}</p>

          </Link>

        ))}

      </div>

    </>

  );

}


