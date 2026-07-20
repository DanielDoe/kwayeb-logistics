"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { ArrowRight, ChevronDown, Globe, Menu, Package, X } from "lucide-react";
import { Logo } from "@/components/brand/logo";
import { ThemePicker } from "@/components/theme/theme-picker";
import { cn } from "@/lib/utils";

const MAIN_NAV = [
  { href: "/services", label: "Services", dropdown: true },
  { href: "/services", label: "Solutions", dropdown: true },
  { href: "/routes", label: "Routes", dropdown: true },
  { href: "/faq", label: "Resources", dropdown: true },
  { href: "/#how-it-works", label: "How It Works", dropdown: false },
  { href: "/about", label: "About", dropdown: false },
] as const;

export function Header() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-3 px-4 sm:px-6 lg:px-8">
        <Link href="/" className="shrink-0" onClick={() => setIsOpen(false)}>
          <Logo size="sm" />
        </Link>

        <nav className="hidden min-w-0 flex-1 items-center justify-center gap-0.5 lg:flex">
          {MAIN_NAV.map((link) => {
            const isActive =
              pathname === link.href ||
              (link.href !== "/#how-it-works" && pathname.startsWith(link.href));
            return (
              <Link
                key={link.label}
                href={link.href}
                className={cn(
                  "inline-flex shrink-0 items-center gap-0.5 whitespace-nowrap rounded-md px-2 py-2 text-[13px] font-medium transition xl:gap-1 xl:px-2.5",
                  isActive ? "text-[#ff6600]" : "text-[#0a1d37] hover:text-[#ff6600]",
                )}
              >
                {link.label}
                {link.dropdown && <ChevronDown className="h-3.5 w-3.5 shrink-0 opacity-45" />}
              </Link>
            );
          })}
        </nav>

        <div className="hidden shrink-0 items-center gap-2 lg:flex">
          <div className="mx-0.5 hidden h-5 w-px bg-slate-200 xl:block" aria-hidden />

          <Link
            href="/track"
            className="inline-flex h-9 items-center gap-1.5 rounded-md border border-[#0a1d37]/25 bg-white px-3 text-[13px] font-semibold text-[#0a1d37] transition hover:bg-slate-50"
          >
            <Package className="h-3.5 w-3.5 shrink-0" strokeWidth={2} />
            <span className="hidden xl:inline">Track Shipment</span>
            <span className="xl:hidden">Track</span>
          </Link>

          <Link
            href="/login"
            className="inline-flex h-9 items-center rounded-md border border-[#0a1d37]/25 bg-white px-3 text-[13px] font-semibold text-[#0a1d37] transition hover:bg-slate-50"
          >
            Log In
          </Link>

          <Link
            href="/source"
            className="inline-flex h-9 items-center gap-1.5 rounded-md bg-[#ff6600] px-3.5 text-[13px] font-semibold text-white transition hover:bg-[#e55a00]"
          >
            <span className="hidden xl:inline">Get Free Quote</span>
            <span className="xl:hidden">Quote</span>
            <ArrowRight className="h-3.5 w-3.5 shrink-0" strokeWidth={2.25} />
          </Link>

          <button
            type="button"
            className="inline-flex h-9 items-center gap-1 rounded-md px-2 text-[13px] font-semibold text-[#0a1d37] transition hover:bg-slate-50"
            aria-label="Language"
          >
            <Globe className="h-3.5 w-3.5" strokeWidth={1.75} />
            <span>EN</span>
            <ChevronDown className="h-3 w-3 opacity-45" />
          </button>

          <ThemePicker />
        </div>

        <div className="flex items-center gap-1 lg:hidden">
          <Link href="/track" className="rounded-md p-2 text-[#0a1d37]" aria-label="Track shipment">
            <Package className="h-5 w-5" />
          </Link>
          <ThemePicker />
          <button
            type="button"
            className="rounded-md p-2 text-[#0a1d37]"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {isOpen && (
        <nav className="border-t border-slate-100 bg-white px-4 py-4 lg:hidden">
          {MAIN_NAV.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="block rounded-md px-3 py-2.5 text-sm font-medium text-[#0a1d37] hover:bg-slate-50"
            >
              {link.label}
            </Link>
          ))}
          <div className="mt-4 grid gap-2">
            <Link
              href="/track"
              onClick={() => setIsOpen(false)}
              className="inline-flex h-11 items-center justify-center gap-2 rounded-md border border-[#0a1d37]/25 text-sm font-semibold text-[#0a1d37]"
            >
              <Package className="h-4 w-4" />
              Track Shipment
            </Link>
            <Link
              href="/login"
              onClick={() => setIsOpen(false)}
              className="inline-flex h-11 items-center justify-center rounded-md border border-[#0a1d37]/25 text-sm font-semibold text-[#0a1d37]"
            >
              Log In
            </Link>
            <Link
              href="/source"
              onClick={() => setIsOpen(false)}
              className="inline-flex h-11 items-center justify-center gap-2 rounded-md bg-[#ff6600] text-sm font-semibold text-white"
            >
              Get Free Quote
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}
