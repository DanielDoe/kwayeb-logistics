import Link from "next/link";
import { AdminPageHeader } from "@/components/admin/admin-page-header";

const SECTIONS = [
  { title: "Staff", href: "/admin/settings/staff", desc: "Manage staff accounts and access" },
  { title: "Roles & Permissions", href: "/admin/settings/roles", desc: "Department roles and permission sets" },
  { title: "Services", href: "/admin/settings/services", desc: "Freight services offered by Kwayeb" },
  { title: "Routes", href: "/admin/settings/routes", desc: "Origin–destination route configuration" },
  { title: "Pricing", href: "/admin/settings/pricing", desc: "Base rates and pricing rules" },
  { title: "Countries", href: "/admin/settings/countries", desc: "Supported destination countries" },
  { title: "Ports", href: "/admin/settings/ports", desc: "Sea port directory" },
  { title: "Airports", href: "/admin/settings/airports", desc: "Air cargo airport directory" },
  { title: "Currencies", href: "/admin/settings/currencies", desc: "Billing currencies" },
  { title: "Integrations", href: "/admin/settings/integrations", desc: "Third-party service connections" },
  { title: "Notifications", href: "/admin/settings/notifications", desc: "Email and in-app alert rules" },
  { title: "Website", href: "/admin/settings/website", desc: "Public site content and pages" },
  { title: "Audit Logs", href: "/admin/settings/audit-logs", desc: "System activity and change history" },
];

export default function AdminSettingsPage() {
  return (
    <>
      <AdminPageHeader />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {SECTIONS.map((section) => (
          <Link
            key={section.href}
            href={section.href}
            className="rounded-xl border border-border bg-card p-5 shadow-sm transition hover:border-accent-text/30 hover:shadow-md"
          >
            <h2 className="font-semibold text-foreground">{section.title}</h2>
            <p className="mt-2 text-sm text-muted">{section.desc}</p>
            <span className="mt-4 inline-block text-sm font-semibold text-accent-text">Manage →</span>
          </Link>
        ))}
      </div>
    </>
  );
}
