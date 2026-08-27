"use client";

import { useState } from "react";

interface AdminQuotePrepareFormProps {
  quoteNumber: string;
  customer: string;
}

export function AdminQuotePrepareForm({ quoteNumber, customer }: AdminQuotePrepareFormProps) {
  const [submitted, setSubmitted] = useState(false);

  if (submitted) {
    return (
      <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/5 p-5 shadow-sm">
        <h2 className="font-semibold text-foreground">Quote prepared</h2>
        <p className="mt-2 text-sm text-muted">
          Pricing for {quoteNumber} has been saved and {customer} will be notified to review the quote.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-border bg-white p-5 shadow-sm">
      <h2 className="font-semibold text-foreground">Prepare quote</h2>
      <p className="mt-1 text-sm text-muted">Enter line items and send pricing to the customer.</p>

      <form
        className="mt-4 space-y-3"
        onSubmit={(event) => {
          event.preventDefault();
          setSubmitted(true);
        }}
      >
        <label className="block">
          <span className="text-xs font-semibold uppercase tracking-wide text-muted">Ocean freight (USD)</span>
          <input
            type="number"
            defaultValue={1720}
            className="mt-1 w-full rounded-lg border border-border bg-surface/50 px-3 py-2 text-sm"
          />
        </label>
        <label className="block">
          <span className="text-xs font-semibold uppercase tracking-wide text-muted">Origin handling (USD)</span>
          <input
            type="number"
            defaultValue={210}
            className="mt-1 w-full rounded-lg border border-border bg-surface/50 px-3 py-2 text-sm"
          />
        </label>
        <label className="block">
          <span className="text-xs font-semibold uppercase tracking-wide text-muted">Documentation (USD)</span>
          <input
            type="number"
            defaultValue={120}
            className="mt-1 w-full rounded-lg border border-border bg-surface/50 px-3 py-2 text-sm"
          />
        </label>
        <label className="block">
          <span className="text-xs font-semibold uppercase tracking-wide text-muted">Notes to customer</span>
          <textarea
            className="mt-1 min-h-20 w-full rounded-lg border border-border bg-surface/50 px-3 py-2 text-sm"
            defaultValue="Rates based on 2.4 CBM LCL consolidation. Valid for 7 days."
          />
        </label>
        <button
          type="submit"
          className="w-full rounded-lg bg-[#ff6600] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#e55a00]"
        >
          Send quote to customer
        </button>
      </form>
    </div>
  );
}
