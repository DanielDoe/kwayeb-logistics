import Link from "next/link";
import { SHIPPING_ROUTES } from "@/lib/constants";

export function RoutesSection() {
  return (
    <section className="bg-navy-950 py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-gold-400">
              Global reach
            </p>
            <h2 className="mt-2 text-3xl font-bold text-white sm:text-4xl">
              Shipping routes we cover
            </h2>
            <p className="mt-4 max-w-xl text-slate-400">
              From our warehouse in China, we deliver to Ghana, the USA, the UK,
              Australia, Germany, all of Europe, and every country across Africa.
            </p>
          </div>
          <Link
            href="/routes"
            className="shrink-0 rounded-lg border border-gold-500/40 px-5 py-2.5 text-sm font-semibold text-gold-400 transition hover:bg-gold-500/10"
          >
            View all routes →
          </Link>
        </div>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {SHIPPING_ROUTES.map((route) => (
            <div
              key={route.id}
              className="group rounded-xl border border-white/10 bg-white/5 p-5 transition hover:border-gold-500/40 hover:bg-white/10"
            >
              <div className="flex items-center gap-3">
                <span className="text-3xl">{route.flag}</span>
                <div>
                  <h3 className="font-semibold text-white">{route.destination}</h3>
                  <p className="text-xs text-gold-400">{route.region}</p>
                </div>
              </div>
              <p className="mt-3 text-sm text-slate-400">{route.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
