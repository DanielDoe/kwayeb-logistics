import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Package, Plane, Ship } from "lucide-react";
import { SHIPPING_ROUTES } from "@/lib/constants";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { cn } from "@/lib/utils";

export function RoutesSection() {
  return (
    <section id="routes" className="relative overflow-hidden bg-[#f7f8fa] py-14 scroll-mt-20 sm:py-16 lg:py-20">
      {/* Map graphic behind header */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[420px]" aria-hidden>
        <Image
          src="/images/routes-map-bg.png"
          alt=""
          fill
          className="object-contain object-right-top opacity-90 sm:object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#f7f8fa] via-[#f7f8fa]/75 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#f7f8fa]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <ScrollReveal variant="fade-up">
          <div className="flex max-w-xl flex-col items-start">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#ff6600]">
              Global reach
            </p>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-[#0a1d37] sm:text-4xl lg:text-[2.5rem]">
              Shipping routes <span className="text-[#ff6600]">we cover</span>
            </h2>
            <p className="mt-5 text-base leading-relaxed text-[#52667a] sm:text-lg">
              From our warehouse in China, we deliver to Ghana, the USA, the UK, Australia, Germany,
              all of Europe, and every country across Africa.
            </p>
            <Link
              href="/routes"
              className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[#ff6600] transition hover:gap-3"
            >
              View all routes
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
        </ScrollReveal>

        {/* Top row: 4 cards */}
        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {SHIPPING_ROUTES.slice(0, 4).map((route, i) => (
            <ScrollReveal key={route.id} delay={i * 70} variant="fade-up">
              <RouteCard route={route} />
            </ScrollReveal>
          ))}
        </div>

        {/* Bottom row: 3 cards left-aligned like the reference */}
        <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {SHIPPING_ROUTES.slice(4).map((route, i) => (
            <ScrollReveal key={route.id} delay={i * 70} variant="fade-up">
              <RouteCard route={route} />
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

type Route = (typeof SHIPPING_ROUTES)[number];

function RouteCard({ route }: { route: Route }) {
  const isMint = "tint" in route && route.tint === "mint";

  return (
    <article
      className={cn(
        "group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-100 shadow-[0_10px_35px_-16px_rgba(10,29,55,0.14)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_18px_45px_-18px_rgba(10,29,55,0.2)]",
        isMint ? "bg-gradient-to-b from-[#eef8f3] to-white" : "bg-white",
      )}
    >
      <div className="flex flex-1 flex-col p-5 pb-4">
        <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-wide text-[#0a1d37]">
          <span aria-hidden>🇨🇳</span>
          <span>Guangzhou</span>
          <ArrowUpRight className="ml-auto h-3.5 w-3.5 text-[#ff6600]" />
        </div>

        <div className="mt-5 flex items-center gap-3">
          <span className="text-2xl leading-none" aria-hidden>
            {route.flag}
          </span>
          <div>
            <h3 className="text-lg font-bold text-[#0a1d37]">{route.destination}</h3>
            <p className="text-xs font-semibold text-[#ff6600]">{route.region}</p>
          </div>
        </div>

        <p className="mt-3 text-sm leading-relaxed text-[#52667a]">{route.description}</p>

        <div className="mt-5 flex flex-wrap gap-3 text-[10px] font-semibold uppercase tracking-wider text-[#94a3b8]">
          <span className="inline-flex items-center gap-1.5">
            <Plane className="h-3.5 w-3.5" strokeWidth={1.75} />
            Air
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Ship className="h-3.5 w-3.5" strokeWidth={1.75} />
            Sea
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Package className="h-3.5 w-3.5" strokeWidth={1.75} />
            Door-to-door
          </span>
        </div>
      </div>

      <div className="relative mx-3 mb-3 h-36 overflow-hidden rounded-xl sm:h-40">
        <Image
          src={route.image}
          alt={`${route.destination} landmark`}
          fill
          className="object-cover transition duration-500 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
        />
      </div>
    </article>
  );
}
