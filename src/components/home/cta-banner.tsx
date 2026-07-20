import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Clock,
  Globe2,
  Headphones,
  Play,
  Send,
  Tag,
} from "lucide-react";
import { ScrollReveal } from "@/components/ui/scroll-reveal";

const FEATURE_PILLS = [
  { icon: Clock, label: "Fast Response" },
  { icon: Tag, label: "Transparent Pricing" },
  { icon: Globe2, label: "Worldwide Delivery" },
  { icon: Headphones, label: "Dedicated Support" },
] as const;

const FLAGS = [
  { emoji: "🇺🇸", label: "USA" },
  { emoji: "🇬🇧", label: "UK" },
  { emoji: "🇬🇭", label: "Ghana" },
  { emoji: "🇦🇺", label: "Australia" },
] as const;

export function CtaBanner() {
  return (
    <section className="bg-white py-12 sm:py-16 lg:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <ScrollReveal variant="scale">
          <div className="relative overflow-hidden rounded-[28px] shadow-[0_24px_80px_-24px_rgba(10,29,55,0.35)] sm:rounded-[36px] lg:rounded-[44px]">
            {/* Background photo — exact logistics scene */}
            <div className="absolute inset-0">
              <Image
                src="/images/hero-background.png"
                alt=""
                fill
                className="object-cover object-[78%_center]"
                sizes="100vw"
                priority={false}
              />
              {/* Soft white veil so content reads like the reference */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/82 via-white/58 to-white/20" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a1d37]/15 via-transparent to-white/30" />
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_75%_55%,transparent_10%,rgba(255,255,255,0.08)_45%,rgba(255,255,255,0.45)_100%)]" />
            </div>

            <div className="relative px-6 pb-8 pt-10 sm:px-10 sm:pb-10 sm:pt-14 lg:min-h-[480px] lg:px-14 lg:pb-14 lg:pt-16">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 rounded-full border border-[#ff6600]/25 bg-[#fff4ed]/90 px-3.5 py-1.5 backdrop-blur-sm">
                <Globe2 className="h-3.5 w-3.5 text-[#ff6600]" strokeWidth={2} />
                <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#ff6600]">
                  Start shipping
                </span>
              </div>

              <h2 className="mt-6 max-w-xl text-[1.85rem] font-bold leading-[1.15] tracking-tight text-[#0a1d37] sm:text-4xl lg:text-[2.75rem]">
                Ready to ship from <span className="text-[#ff6600]">China?</span>
              </h2>

              <p className="mt-4 max-w-lg text-[15px] leading-relaxed text-[#334155] sm:text-base lg:text-lg">
                Tell us what products you need or what you want to ship. Our team responds with a
                quote <span className="font-bold text-[#0a1d37]">within 24 hours.</span>
              </p>

              {/* Feature pills */}
              <div className="mt-7 flex flex-wrap gap-2.5 sm:gap-3">
                {FEATURE_PILLS.map((item) => (
                  <span
                    key={item.label}
                    className="inline-flex items-center gap-2 rounded-full border border-white/80 bg-white/75 px-3.5 py-2 text-[12px] font-semibold text-[#0a1d37] shadow-sm backdrop-blur-md sm:text-[13px]"
                  >
                    <item.icon className="h-3.5 w-3.5 text-[#0a1d37]" strokeWidth={2} />
                    {item.label}
                  </span>
                ))}
              </div>

              {/* CTAs */}
              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
                <Link
                  href="/source"
                  className="group inline-flex h-12 items-center justify-center gap-2.5 rounded-xl bg-[#ff6600] px-6 text-[15px] font-semibold text-white shadow-[0_12px_32px_-8px_rgba(255,102,0,0.55)] transition hover:bg-[#e55a00] sm:h-[52px] sm:px-7"
                >
                  <Send className="h-4 w-4" strokeWidth={2} />
                  Submit Sourcing Request
                  <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
                </Link>
                <Link
                  href="/routes"
                  className="group inline-flex h-12 items-center justify-center gap-2.5 rounded-xl border border-[#0a1d37]/20 bg-white/85 px-6 text-[15px] font-semibold text-[#0a1d37] backdrop-blur-md transition hover:bg-white sm:h-[52px] sm:px-7"
                >
                  <span className="flex h-5 w-5 items-center justify-center rounded-full border border-[#0a1d37]/30">
                    <Play className="h-2.5 w-2.5 fill-[#0a1d37] text-[#0a1d37]" />
                  </span>
                  Explore Routes
                  <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
                </Link>
              </div>

              {/* Floating glass partner card */}
              <div className="mt-10 w-full max-w-sm rounded-2xl border border-white/20 bg-[#0a1d37]/72 p-5 shadow-xl backdrop-blur-xl sm:mt-12 sm:ml-auto sm:p-6 lg:absolute lg:bottom-10 lg:right-10 lg:mt-0">
                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#ff6600] text-white shadow-lg shadow-orange-500/30">
                    <Globe2 className="h-5 w-5" strokeWidth={2} />
                  </div>
                  <div>
                    <p className="text-[15px] font-bold text-white">Your global logistics partner</p>
                    <p className="mt-1 text-sm text-white/70">
                      From China to every corner of the world
                    </p>
                  </div>
                </div>
                <div className="mt-4 flex items-center gap-2">
                  <div className="flex -space-x-2">
                    {FLAGS.map((f) => (
                      <span
                        key={f.label}
                        title={f.label}
                        className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-[#0a1d37]/50 bg-white text-sm shadow-sm"
                      >
                        {f.emoji}
                      </span>
                    ))}
                  </div>
                  <span className="rounded-full bg-[#0a1d37]/80 px-3 py-1.5 text-[11px] font-semibold text-white ring-1 ring-white/15">
                    +200 countries
                  </span>
                </div>
              </div>

              {/* Spacer so absolute card doesn't overlap CTAs on large screens */}
              <div className="hidden h-4 lg:block" aria-hidden />
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
