import Link from "next/link";
import { AdminPageHeader } from "@/components/admin/admin-page-header";

const PAGES = [
  { title: "Homepage", href: "/", desc: "Hero, services, and CTA sections" },
  { title: "Services", href: "/services", desc: "Freight service listings" },
  { title: "Routes", href: "/routes", desc: "Shipping route information" },
  { title: "FAQ", href: "/faq", desc: "Frequently asked questions" },
  { title: "About", href: "/about", desc: "Company information" },
  { title: "Contact", href: "/contact", desc: "Contact form and details" },
];

export default function AdminWebsitePage() {
  return (
    <>
      <AdminPageHeader />
      <div className="grid gap-4 sm:grid-cols-2">
        {PAGES.map((page) => (
          <Link
            key={page.href}
            href={page.href}
            target="_blank"
            className="rounded-xl border border-border bg-card p-5 shadow-sm transition hover:border-accent-text/30"
          >
            <h2 className="font-semibold text-foreground">{page.title}</h2>
            <p className="mt-1 text-sm text-muted">{page.desc}</p>
            <span className="mt-3 inline-block text-xs font-mono text-muted">{page.href}</span>
          </Link>
        ))}
      </div>
    </>
  );
}
