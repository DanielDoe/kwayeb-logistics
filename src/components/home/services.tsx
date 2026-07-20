import Image from "next/image";
import Link from "next/link";
import {
  ArrowUpRight,
  FileCheck,
  Headphones,
  Package,
  Search,
  Shield,
  Ship,
  Warehouse,
} from "lucide-react";
import { SERVICES } from "@/lib/constants";
import { ScrollReveal } from "@/components/ui/scroll-reveal";

const ICONS = {
  search: Search,
  ship: Ship,
  track: Package,
  document: FileCheck,
  warehouse: Warehouse,
  payment: Shield,
  support: Headphones,
} as const;

export function Services() {
  const featured = SERVICES.find((s) => "featured" in s && s.featured) ?? SERVICES[0];
  const grid = SERVICES.filter((s) => s.title !== featured.title);

  return (
    <section id="services" className="relative overflow-hidden bg-white py-14 scroll-mt-20 sm:py-16 lg:py-20">
      {/* Map + pins background */}
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <Image
          src="/images/services-map-bg.png"
          alt=""
          fill
          className="object-cover object-top opacity-[0.55]"
          sizes="100vw"
          priority={false}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-white/40 via-white/70 to-white" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <ScrollReveal variant="fade-up">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mx-auto mb-3 flex h-8 w-8 items-center justify-center text-[#ff6600]">
              <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor" aria-hidden>
                <circle cx="12" cy="12" r="2.5" />
                <circle cx="6" cy="10" r="1.5" opacity="0.7" />
                <circle cx="18" cy="10" r="1.5" opacity="0.7" />
                <circle cx="8" cy="16" r="1.5" opacity="0.55" />
                <circle cx="16" cy="16" r="1.5" opacity="0.55" />
                <path
                  d="M6 10c2-1 4-1.5 6-1.5S16 9 18 10M8 16c1.5-1.5 3.5-2.5 4-2.5s2.5 1 4 2.5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.2"
                  opacity="0.5"
                />
              </svg>
            </div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#ff6600]">
              What we offer
            </p>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-[#0a1d37] sm:text-4xl lg:text-[2.5rem]">
              More than shipping —{" "}
              <span className="text-[#ff6600]">full China logistics</span>
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-[#52667a] sm:text-lg">
              Tell us what you need. We source products from China, handle logistics, and deliver to
              your country — all in one place.
            </p>
          </div>
        </ScrollReveal>

        <div className="mt-14 grid gap-5 lg:grid-cols-12 lg:gap-6">
          {/* Featured navy card */}
          <ScrollReveal className="lg:col-span-4" variant="fade-up">
            <article className="relative flex h-full min-h-[520px] flex-col overflow-hidden rounded-2xl bg-[#0a1d37] shadow-[0_16px_50px_-20px_rgba(10,29,55,0.45)]">
              <div className="relative z-10 flex flex-1 flex-col p-7 sm:p-8">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#ff6600] text-white shadow-lg shadow-orange-500/30">
                    <Search className="h-5 w-5" strokeWidth={2} />
                  </div>
                  <span className="rounded-full bg-[#ff6600] px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-[#0a1d37]">
                    Core service
                  </span>
                </div>

                <h3 className="mt-8 text-2xl font-bold text-white sm:text-3xl">{featured.title}</h3>
                <span className="mt-3 block h-1 w-12 rounded-full bg-[#ff6600]" />
                <p className="mt-5 text-sm leading-relaxed text-white/80 sm:text-[15px]">
                  {featured.description}
                </p>

                <Link
                  href="/source"
                  className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-white transition hover:gap-3"
                >
                  Start a request
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
              </div>

              <div className="relative mt-auto h-48 w-full sm:h-56">
                <Image
                  src={featured.image}
                  alt={featured.title}
                  fill
                  className="object-cover object-center"
                  sizes="(max-width: 1024px) 100vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-transparent via-transparent to-[#0a1d37]/40" />
              </div>
            </article>
          </ScrollReveal>

          {/* 6 small cards */}
          <div className="grid gap-5 sm:grid-cols-2 lg:col-span-8 lg:grid-cols-3 lg:gap-5">
            {grid.map((service, i) => {
              const Icon = ICONS[service.icon as keyof typeof ICONS] ?? Package;
              const num = String(i + 2).padStart(2, "0");

              return (
                <ScrollReveal key={service.title} delay={i * 60} variant="fade-up">
                  <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-[0_8px_30px_-14px_rgba(10,29,55,0.12)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_16px_40px_-16px_rgba(10,29,55,0.18)]">
                    <div className="flex flex-1 flex-col p-5 pb-4">
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#fff4ed] text-[#ff6600]">
                          <Icon className="h-5 w-5" strokeWidth={1.75} />
                        </div>
                        <span className="font-mono text-xs font-medium text-slate-300">{num}</span>
                      </div>
                      <h3 className="mt-4 text-base font-bold text-[#0a1d37]">{service.title}</h3>
                      <p className="mt-2 flex-1 text-sm leading-relaxed text-[#52667a]">
                        {service.description}
                      </p>
                      {"comingSoon" in service && service.comingSoon && (
                        <span className="mt-3 inline-flex w-fit rounded-full bg-[#fff4ed] px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-[#ff6600]">
                          Coming soon
                        </span>
                      )}
                    </div>
                    <div className="relative mx-3 mb-3 h-28 overflow-hidden rounded-xl sm:h-32">
                      <Image
                        src={service.image}
                        alt={service.title}
                        fill
                        className="object-cover transition duration-500 group-hover:scale-105"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      />
                    </div>
                  </article>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
