import Link from "next/link";
import { SITE } from "@/lib/constants";

export function Footer() {
  return (
    <footer className="mt-auto border-t border-white/10 bg-navy-950">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-4">
          <div className="md:col-span-2">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gold-500 font-bold text-navy-950">
                KL
              </div>
              <p className="text-lg font-bold text-white">{SITE.name}</p>
            </div>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-slate-400">
              Connecting international customers with reliable shipping and product
              sourcing from China. We serve Europe, Africa, the Americas, and beyond.
            </p>
            <p className="mt-4 text-sm text-gold-400">{SITE.domain}</p>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white">
              Quick Links
            </h3>
            <ul className="mt-4 space-y-2">
              {[
                { href: "/routes", label: "Shipping Routes" },
                { href: "/source", label: "Source & Quote" },
                { href: "/track", label: "Track Shipment" },
                { href: "/payments", label: "Payments" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-slate-400 transition hover:text-gold-400"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white">
              Contact
            </h3>
            <ul className="mt-4 space-y-2 text-sm text-slate-400">
              <li>{SITE.email}</li>
              <li>{SITE.phone}</li>
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-white/10 pt-6 text-center text-xs text-slate-500">
          © {new Date().getFullYear()} {SITE.name}. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
