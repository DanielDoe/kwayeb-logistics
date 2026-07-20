import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Payments",
  description: "Secure payment options for KWAYEB LOGISTICS sourcing and shipping services.",
};

export default function PaymentsPage() {
  return (
    <div className="bg-slate-50 py-16 dark:bg-navy-900">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm dark:border-white/10 dark:bg-navy-950 sm:p-12">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-gold-500/15">
            <svg className="h-10 w-10 text-gold-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z" />
            </svg>
          </div>

          <h1 className="mt-6 text-3xl font-bold text-navy-950 dark:text-white">
            Secure Payments — Coming Soon
          </h1>
          <p className="mx-auto mt-4 max-w-lg text-slate-600 dark:text-slate-400">
            We&apos;re building a secure payment portal so you can pay for
            sourcing and shipping directly online. For now, our team will share
            payment instructions when you receive your quote.
          </p>

          <div className="mt-8 grid gap-4 text-left sm:grid-cols-2">
            {[
              "Bank transfer (international wire)",
              "Mobile money (Ghana & Africa)",
              "PayPal & card payments",
              "Escrow for large orders",
            ].map((method) => (
              <div
                key={method}
                className="flex items-center gap-3 rounded-lg border border-slate-200 p-4 dark:border-white/10"
              >
                <span className="text-gold-500">◆</span>
                <span className="text-sm text-slate-700 dark:text-slate-300">{method}</span>
              </div>
            ))}
          </div>

          <Link
            href="/source"
            className="mt-8 inline-flex rounded-lg bg-gold-500 px-8 py-3 font-semibold text-navy-950 transition hover:bg-gold-400"
          >
            Get a Quote First
          </Link>
        </div>
      </div>
    </div>
  );
}
