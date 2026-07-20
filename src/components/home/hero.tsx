import Image from "next/image";
import Link from "next/link";
import { Clock, Globe2, Headphones, ShieldCheck } from "lucide-react";
import { HeroTrackingWidget } from "@/components/home/hero-tracking-widget";

const FEATURES = [
  {
    icon: ShieldCheck,
    title: "Reliable & Secure",
    description: "End-to-end cargo protection",
  },
  {
    icon: Globe2,
    title: "Global Coverage",
    description: "Shipping to 200+ countries",
  },
  {
    icon: Clock,
    title: "Real-time Tracking",
    description: "Updates at every milestone",
  },
  {
    icon: Headphones,
    title: "Expert Support",
    description: "Dedicated logistics specialists",
  },
] as const;

export function Hero() {
  return (
    <section className="relative bg-white">
      <div className="relative overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/hero-background.png"
            alt="Air freight, sea freight, and land logistics at a global shipping port"
            fill
            priority
            /* Bias right so the cargo truck stays in frame on wide screens */
            className="object-cover object-[70%_40%] sm:object-[85%_42%] lg:object-[95%_42%]"
            sizes="100vw"
          />
          {/* Stronger veil on mobile for text contrast; softer on desktop so truck stays clear */}
          <div
            className="pointer-events-none absolute inset-0 lg:hidden"
            style={{
              background:
                "linear-gradient(180deg, rgba(255,255,255,0.92) 0%, rgba(255,255,255,0.78) 45%, rgba(255,255,255,0.55) 70%, rgba(255,255,255,0.35) 100%)",
            }}
          />
          <div
            className="pointer-events-none absolute inset-0 hidden lg:block"
            style={{
              background:
                "linear-gradient(90deg, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.88) 22%, rgba(255,255,255,0.5) 40%, rgba(255,255,255,0.12) 55%, transparent 68%)",
            }}
          />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-4 pb-24 pt-10 sm:px-6 sm:pb-28 sm:pt-12 lg:px-8 lg:pb-32 lg:pt-12">
          <div className="max-w-[540px]">
            <h1 className="hero-enter text-[2.05rem] font-bold leading-[1.15] tracking-tight text-[#0a1d37] sm:text-[2.65rem] lg:text-[3.15rem]">
              Reliable Shipping from China to{" "}
              <span className="text-[#ff6600]">Anywhere in the World</span>
            </h1>

            <p className="hero-enter hero-enter-delay-1 mt-4 max-w-[420px] text-[15px] leading-relaxed text-[#3d4f63] sm:text-base">
              Air freight, sea freight, express delivery, and door-to-door logistics solutions
              tailored for businesses and individuals.
            </p>

            <div className="hero-enter hero-enter-delay-2 mt-6 flex flex-col gap-3 sm:mt-7 sm:flex-row sm:items-center sm:gap-3.5">
              <Link
                href="/source"
                className="inline-flex h-11 items-center justify-center rounded-lg bg-[#ff6600] px-6 text-[15px] font-semibold text-white shadow-[0_8px_24px_-8px_rgba(255,102,0,0.5)] transition hover:bg-[#e55a00] sm:h-12 sm:px-7"
              >
                Get a Freight Quote
              </Link>
              <Link
                href="/track"
                className="inline-flex h-11 items-center justify-center rounded-lg border-2 border-[#0a1d37]/85 bg-white px-6 text-[15px] font-semibold text-[#0a1d37] transition hover:bg-slate-50 sm:h-12 sm:px-7"
              >
                Track a Shipment
              </Link>
            </div>

            <div className="hero-enter hero-enter-delay-3 mt-8 grid grid-cols-2 gap-x-4 gap-y-5 sm:mt-9 sm:grid-cols-4 sm:gap-5">
              {FEATURES.map((feature) => (
                <div key={feature.title} className="min-w-0">
                  <feature.icon className="h-6 w-6 text-[#0a1d37]" strokeWidth={1.7} />
                  <p className="mt-2 text-[13px] font-bold leading-snug text-[#0a1d37] sm:text-sm">
                    {feature.title}
                  </p>
                  <p className="mt-1 text-[11px] leading-snug text-[#64748b] sm:text-xs">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="relative z-20 -mt-12 sm:-mt-14 lg:-mt-16">
        <HeroTrackingWidget />
      </div>
    </section>
  );
}
