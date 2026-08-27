import Link from "next/link";

import { ScanLine } from "lucide-react";

import { getUserProfile } from "@/lib/supabase/server-auth";

import { AdminKpiGrid } from "@/components/admin/admin-kpi-grid";
import { AdminPageIntro } from "@/components/admin/admin-page-intro";

import { getGreeting } from "@/lib/admin/workspace-demo-data";



export default async function WarehouseControlPage() {

  const profile = await getUserProfile();



  return (

    <>

      <AdminPageIntro>
        <h1 className="text-2xl font-bold text-foreground sm:text-3xl">Warehouse Control</h1>
        <p className="mt-1 text-muted">
          {profile ? getGreeting(profile.full_name) : "Welcome"} — scan, receive, and dispatch cargo.
        </p>
      </AdminPageIntro>



      <Link

        href="/admin/warehouse/receive"

        className="mb-8 flex items-center justify-center gap-3 rounded-xl bg-[#ff6600] px-6 py-5 text-lg font-bold text-white shadow-md transition hover:bg-[#e55a00]"

      >

        <ScanLine className="h-6 w-6" />

        Scan Package / Enter Package ID

      </Link>



      <AdminKpiGrid

        columns={6}

        items={[

          { label: "Expected Today", value: 32, href: "/admin/warehouse/receive" },

          { label: "Received Today", value: 11 },

          { label: "Awaiting Inspection", value: 7, href: "/admin/warehouse/inventory" },

          { label: "Ready to Consolidate", value: 18, href: "/admin/warehouse/inventory" },

          { label: "Ready for Dispatch", value: 6, href: "/admin/warehouse/dispatch" },

          { label: "Exceptions", value: 3, accent: true, href: "/admin/warehouse/exceptions" },

        ]}

      />



      <div className="mt-8 rounded-xl border border-border bg-white p-5 shadow-sm">

        <h2 className="font-semibold text-foreground">Today&apos;s Receiving Queue</h2>

        <ul className="mt-4 space-y-2 text-sm">

          {[

            { id: "KWY-2026-002813", supplier: "Guangzhou Electronics Co.", customer: "Kofi Imports" },

            { id: "KWY-2026-002819", supplier: "Shenzhen Textiles Ltd", customer: "Mensah Trading" },

            { id: "KWY-2026-002822", supplier: "Yiwu Wholesale Hub", customer: "Global Retail GH" },

          ].map((item) => (

            <li key={item.id} className="flex flex-wrap items-center justify-between gap-2 rounded-lg border border-border px-4 py-3">

              <div>

                <p className="font-mono text-xs font-bold">{item.id}</p>

                <p className="text-muted">{item.supplier} → {item.customer}</p>

              </div>

              <Link href="/admin/warehouse/receive" className="rounded-lg bg-[#0a1d37] px-3 py-1.5 text-xs font-semibold text-white hover:bg-[#0a1d37]/90">

                Receive

              </Link>

            </li>

          ))}

        </ul>

      </div>

    </>

  );

}


