"use client";



import { useState } from "react";

import { ScanLine } from "lucide-react";



export default function ReceiveCargoPage() {

  const [submitted, setSubmitted] = useState(false);



  if (submitted) {

    return (

      <div className="mx-auto max-w-lg rounded-xl border border-border bg-white p-8 text-center shadow-sm">

        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/10 text-2xl text-emerald-600">

          ✓

        </div>

        <h1 className="mt-4 text-xl font-bold text-foreground">Cargo received successfully</h1>

        <p className="mt-2 font-mono text-lg font-bold text-[#ff6600]">Package ID: KWY-PKG-10842</p>

        <div className="mx-auto mt-6 flex h-32 w-32 items-center justify-center rounded-lg border-2 border-dashed border-border bg-surface">

          <span className="text-xs text-muted">QR / Barcode</span>

        </div>

        <button

          type="button"

          onClick={() => setSubmitted(false)}

          className="mt-6 rounded-lg bg-[#ff6600] px-6 py-2.5 text-sm font-semibold text-white hover:bg-[#e55a00]"

        >

          Receive Another

        </button>

      </div>

    );

  }



  return (

    <div className="mx-auto max-w-2xl">

      <div className="mb-6 text-center">

        <p className="text-sm font-semibold uppercase tracking-widest text-[#ff6600]">Receive Cargo</p>

        <h1 className="mt-2 text-2xl font-bold text-foreground">Scan barcode / Enter tracking number</h1>

      </div>



      <div className="rounded-xl border border-border bg-white p-6 shadow-sm">

        <div className="flex gap-2">

          <div className="relative flex-1">

            <ScanLine className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted" />

            <input

              type="text"

              placeholder="KWY-2026-002813"

              defaultValue="KWY-2026-002813"

              className="h-12 w-full rounded-lg border border-border pl-10 pr-3 text-lg font-mono focus:border-[#ff6600]/50 focus:outline-none focus:ring-1 focus:ring-[#ff6600]/30"

            />

          </div>

          <button type="button" className="rounded-lg bg-[#0a1d37] px-5 text-sm font-semibold text-white hover:bg-[#0a1d37]/90">

            Find Package

          </button>

        </div>



        <div className="mt-6 grid gap-4 sm:grid-cols-2">

          <div className="rounded-lg bg-surface p-4">

            <p className="text-xs font-semibold uppercase text-muted">Supplier</p>

            <p className="mt-1 font-medium text-foreground">Guangzhou Electronics Co.</p>

          </div>

          <div className="rounded-lg bg-surface p-4">

            <p className="text-xs font-semibold uppercase text-muted">Customer</p>

            <p className="mt-1 font-medium text-foreground">Kofi Imports</p>

          </div>

        </div>



        <div className="mt-6 grid gap-4 sm:grid-cols-2">

          <label className="block">

            <span className="text-sm font-medium text-muted">Packages</span>

            <input type="number" defaultValue={4} className="mt-1 h-10 w-full rounded-lg border border-border px-3" />

          </label>

          <label className="block">

            <span className="text-sm font-medium text-muted">Weight (kg)</span>

            <input type="text" defaultValue="87.4" className="mt-1 h-10 w-full rounded-lg border border-border px-3" />

          </label>

          <label className="block">

            <span className="text-sm font-medium text-muted">Length (cm)</span>

            <input type="text" defaultValue="80" className="mt-1 h-10 w-full rounded-lg border border-border px-3" />

          </label>

          <label className="block">

            <span className="text-sm font-medium text-muted">Width (cm)</span>

            <input type="text" defaultValue="60" className="mt-1 h-10 w-full rounded-lg border border-border px-3" />

          </label>

          <label className="block sm:col-span-2">

            <span className="text-sm font-medium text-muted">Height (cm)</span>

            <input type="text" defaultValue="74" className="mt-1 h-10 w-full rounded-lg border border-border px-3" />

          </label>

        </div>



        <fieldset className="mt-6">

          <legend className="text-sm font-medium text-muted">Condition</legend>

          <div className="mt-2 flex flex-wrap gap-4">

            {["Good", "Damaged", "Opened", "Incomplete"].map((opt, i) => (

              <label key={opt} className="flex items-center gap-2 text-sm">

                <input type="radio" name="condition" defaultChecked={i === 0} />

                {opt}

              </label>

            ))}

          </div>

        </fieldset>



        <label className="mt-6 block">

          <span className="text-sm font-medium text-muted">Warehouse Location</span>

          <input

            type="text"

            defaultValue="Warehouse A → Zone 3 → Rack 14 → Shelf B"

            className="mt-1 h-10 w-full rounded-lg border border-border px-3 text-sm"

          />

        </label>



        <button

          type="button"

          onClick={() => setSubmitted(true)}

          className="mt-8 w-full rounded-xl bg-[#ff6600] py-4 text-lg font-bold text-white shadow-md hover:bg-[#e55a00]"

        >

          Receive Cargo

        </button>

      </div>

    </div>

  );

}


