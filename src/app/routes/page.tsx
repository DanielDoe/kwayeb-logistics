import type { Metadata } from "next";
import Link from "next/link";
import { SHIPPING_ROUTES } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Shipping Routes",
  description:
    "KWAYEB LOGISTICS shipping routes from China to Ghana, USA, UK, Australia, Germany, all of Europe, and Africa.",
};

export default function RoutesPage() {
  return (
    <div className="py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-navy-950 dark:text-white sm:text-4xl">
            Our Shipping Routes
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-slate-600 dark:text-slate-400">
            We ship from China to destinations worldwide. Air freight for speed,
            sea freight for volume — we help you choose the best option.
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {SHIPPING_ROUTES.map((route) => (
            <article
              key={route.id}
              className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:border-gold-500/40 hover:shadow-md dark:border-white/10 dark:bg-navy-950"
            >
              <div className="flex items-center gap-4">
                <span className="text-4xl">{route.flag}</span>
                <div>
                  <h2 className="text-xl font-bold text-navy-950 dark:text-white">
                    China → {route.destination}
                  </h2>
                  <p className="text-sm text-gold-600">{route.region}</p>
                </div>
              </div>
              <p className="mt-4 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                {route.description}
              </p>
              <ul className="mt-4 space-y-1.5 text-sm text-slate-500">
                <li>✓ Air & sea freight available</li>
                <li>✓ Customs documentation included</li>
                <li>✓ Real-time shipment tracking</li>
              </ul>
            </article>
          ))}
        </div>

        <div className="mt-16 rounded-2xl bg-navy-950 p-8 text-center sm:p-12">
          <h2 className="text-2xl font-bold text-white">
            Don&apos;t see your country?
          </h2>
          <p className="mx-auto mt-3 max-w-lg text-slate-400">
            We ship to many more destinations. Submit a request and we&apos;ll
            confirm availability and pricing for your location.
          </p>
          <Link
            href="/source"
            className="mt-6 inline-flex rounded-lg bg-gold-500 px-8 py-3 font-semibold text-navy-950 transition hover:bg-gold-400"
          >
            Request a Quote
          </Link>
        </div>
      </div>
    </div>
  );
}
