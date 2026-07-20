import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CheckCircle2, Globe2, Mail, Shield } from "lucide-react";
import { Logo } from "@/components/brand/logo";
import { FooterNewsletter } from "@/components/layout/footer-newsletter";
import { SITE } from "@/lib/constants";

const SERVICES = [
  { href: "/source", label: "Product Sourcing" },
  { href: "/services", label: "International Shipping" },
  { href: "/services", label: "Warehousing" },
  { href: "/services", label: "Customs Support" },
  { href: "/shipping-calculator", label: "Shipping Calculator" },
  { href: "/track", label: "Shipment Tracking" },
];

const COMPANY = [
  { href: "/about", label: "About Us" },
  { href: "/#how-it-works", label: "Our Process" },
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "Contact" },
  { href: "/login", label: "Customer Portal" },
];

const ROUTES = [
  "China → Ghana",
  "China → USA & UK",
  "China → Europe",
  "China → Africa",
  "China → Australia",
];

const SOCIALS = [
  {
    label: "LinkedIn",
    href: "#",
    path: "M6.94 6.5H3.75v12h3.19v-12zm.2-3.47a1.85 1.85 0 11-3.7 0 1.85 1.85 0 013.7 0zM20.25 12.5c0-3.3-1.76-4.84-4.11-4.84-1.9 0-2.75 1.05-3.22 1.78V7.5H9.75c.04.9 0 12 0 12h3.17v-6.7c0-.36.03-.72.13-1 .29-.72.95-1.47 2.06-1.47 1.45 0 2.03 1.1 2.03 2.72V19.5h3.11v-7z",
  },
  {
    label: "Facebook",
    href: "#",
    path: "M14 8.5h2.5V5.75H14c-2.07 0-3.5 1.34-3.5 3.6v1.9H8.25V14H10.5v6.5h3.25V14h2.35l.55-2.75H13.75V9.5c0-.55.2-1 1.25-1z",
  },
  {
    label: "X",
    href: "#",
    path: "M17.5 4.5h2.2l-4.8 5.5 5.65 7.5h-4.42l-3.46-4.53-3.96 4.53H6.5l5.14-5.88L6.2 4.5h4.53l3.12 4.14L17.5 4.5zm-.77 11.7h1.22L8.35 5.7H7.04l9.69 10.5z",
  },
  {
    label: "Instagram",
    href: "#",
    path: "M12 7.6A4.4 4.4 0 1016.4 12 4.4 4.4 0 0012 7.6zm0 7.25A2.85 2.85 0 1114.85 12 2.85 2.85 0 0112 14.85zM17.7 7.43a1.03 1.03 0 11-1.03-1.03 1.03 1.03 0 011.03 1.03zM20.5 8.45a5.66 5.66 0 00-1.55-4 5.72 5.72 0 00-4-1.55c-1.58-.07-6.31-.07-7.89 0a5.7 5.7 0 00-4 1.55 5.66 5.66 0 00-1.55 4c-.07 1.58-.07 6.31 0 7.89a5.66 5.66 0 001.55 4 5.74 5.74 0 004 1.56c1.58.07 6.31.07 7.89 0a5.72 5.72 0 004-1.56 5.66 5.66 0 001.55-4c.07-1.58.07-6.3 0-7.89zm-1.74 9.57a3.32 3.32 0 01-1.87 1.87c-1.3.51-4.37.4-5.8.4s-4.51.11-5.8-.4a3.32 3.32 0 01-1.87-1.87c-.51-1.3-.4-4.37-.4-5.8s-.11-4.51.4-5.8a3.32 3.32 0 011.87-1.87c1.3-.51 4.37-.4 5.8-.4s4.51-.11 5.8.4a3.32 3.32 0 011.87 1.87c.51 1.3.4 4.37.4 5.8s.12 4.51-.4 5.8z",
  },
  {
    label: "YouTube",
    href: "#",
    path: "M21.6 8.2a2.6 2.6 0 00-1.83-1.84C18.1 6 12 6 12 6s-6.1 0-7.77.36A2.6 2.6 0 002.4 8.2 27.3 27.3 0 002 12a27.3 27.3 0 00.4 3.8 2.6 2.6 0 001.83 1.84C5.9 18 12 18 12 18s6.1 0 7.77-.36a2.6 2.6 0 001.83-1.84A27.3 27.3 0 0022 12a27.3 27.3 0 00-.4-3.8zM10.2 14.7V9.3L14.9 12l-4.7 2.7z",
  },
];

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-[#071526] text-white">
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <Image
          src="/images/routes-map-bg.webp"
          alt=""
          fill
          className="scale-110 object-contain object-right-bottom opacity-[0.22] brightness-200 contrast-125 saturate-150"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#071526] via-[#071526]/92 to-[#071526]/55" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#071526] via-transparent to-[#071526]/40" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 pb-8 pt-16 sm:px-6 lg:px-8 lg:pt-20">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-12 lg:gap-8">
          <div className="sm:col-span-2 lg:col-span-4">
            <Logo size="sm" variant="light" />
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-slate-400">
              Connecting international customers with reliable shipping and product sourcing from
              China. We serve Europe, Africa, the Americas, and beyond.
            </p>

            <div className="mt-5 flex flex-wrap gap-2">
              {[
                { icon: Shield, label: "Secure" },
                { icon: CheckCircle2, label: "Reliable" },
                { icon: Globe2, label: "Global" },
              ].map((item) => (
                <span
                  key={item.label}
                  className="inline-flex items-center gap-1.5 rounded-full bg-white/5 px-3 py-1.5 text-[11px] font-semibold text-slate-300 ring-1 ring-white/10"
                >
                  <item.icon className="h-3 w-3 text-[#ff6600]" />
                  {item.label}
                </span>
              ))}
            </div>

            <div className="mt-6 flex items-center gap-2.5">
              {SOCIALS.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-white/5 text-slate-300 ring-1 ring-white/10 transition hover:bg-[#ff6600] hover:text-white hover:ring-[#ff6600]"
                >
                  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden>
                    <path d={s.path} />
                  </svg>
                </a>
              ))}
            </div>
          </div>

          <div className="lg:col-span-2">
            <h3 className="text-sm font-bold text-white">Services</h3>
            <ul className="mt-4 space-y-2.5">
              {SERVICES.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-sm text-slate-400 transition hover:text-[#ff6600]">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h3 className="text-sm font-bold text-white">Company</h3>
            <ul className="mt-4 space-y-2.5">
              {COMPANY.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-sm text-slate-400 transition hover:text-[#ff6600]">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h3 className="text-sm font-bold text-white">Popular Routes</h3>
            <ul className="mt-4 space-y-2.5">
              {ROUTES.map((route) => (
                <li key={route}>
                  <Link
                    href="/routes"
                    className="group inline-flex items-center gap-1.5 text-sm text-slate-400 transition hover:text-[#ff6600]"
                  >
                    {route}
                    <ArrowRight className="h-3 w-3 opacity-0 transition group-hover:opacity-100" />
                  </Link>
                </li>
              ))}
            </ul>
            <Link
              href="/routes"
              className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-[#ff6600] transition hover:gap-2"
            >
              View all routes
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          <div className="sm:col-span-2 lg:col-span-2">
            <h3 className="text-sm font-bold text-white">Stay Updated</h3>
            <p className="mt-4 text-sm leading-relaxed text-slate-400">
              Get shipping tips and rate updates from China to the world.
            </p>
            <FooterNewsletter />
            <a
              href={`mailto:${SITE.email}`}
              className="mt-4 inline-flex items-center gap-2 text-sm text-slate-400 transition hover:text-white"
            >
              <Mail className="h-3.5 w-3.5 text-[#ff6600]" />
              {SITE.email}
            </a>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-6 text-xs text-slate-500 sm:flex-row">
          <p>
            © {new Date().getFullYear()} {SITE.name}. All rights reserved.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1">
            <Link href="/privacy" className="transition hover:text-white">
              Privacy Policy
            </Link>
            <span className="text-white/20">|</span>
            <Link href="/terms" className="transition hover:text-white">
              Terms of Service
            </Link>
            <span className="text-white/20">|</span>
            <Link href="/cookies" className="transition hover:text-white">
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
