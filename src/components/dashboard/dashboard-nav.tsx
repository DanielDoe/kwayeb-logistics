"use client";

import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Package,
  FileText,
  CreditCard,
  MessageSquare,
  Settings,
  Plus,
  Search,
} from "lucide-react";
import { useDashboardChrome } from "@/components/dashboard/dashboard-chrome";
import { DashboardMobileDrawer } from "@/components/dashboard/dashboard-mobile-drawer";
import { DashboardNavLink } from "@/components/dashboard/dashboard-nav-link";

const MAIN_LINKS = [
  { href: "/dashboard", label: "Overview", description: "Summary & activity", icon: LayoutDashboard, exact: true },
  { href: "/dashboard/shipments", label: "Shipments", description: "Your cargo list", icon: Package },
  { href: "/dashboard/quotes", label: "Quotes", description: "Freight requests", icon: FileText },
  { href: "/dashboard/invoices", label: "Invoices", description: "Billing & payments", icon: CreditCard },
] as const;

const ACTION_LINKS = [
  { href: "/dashboard/quotes/new", label: "New quote", description: "Request freight pricing", icon: Plus },
  { href: "/dashboard/track", label: "Track shipment", description: "Look up by tracking ID", icon: Search },
] as const;

const SUPPORT_LINKS = [
  { href: "/dashboard/support", label: "Support", description: "Help & tickets", icon: MessageSquare },
  { href: "/dashboard/settings", label: "Settings", description: "Account & theme", icon: Settings },
] as const;

interface DashboardNavProps {
  profile?: {
    full_name: string | null;
    email: string;
    role: string;
    company: string | null;
  } | null;
}

function isActive(pathname: string, href: string, exact?: boolean) {
  if (exact) return pathname === href;
  if (href === "/dashboard/quotes") {
    return pathname === href || (pathname.startsWith(`${href}/`) && !pathname.startsWith("/dashboard/quotes/new"));
  }
  return pathname === href || pathname.startsWith(`${href}/`);
}

function SidebarContent({
  pathname,
  onNavigate,
}: {
  pathname: string;
  onNavigate?: () => void;
}) {
  return (
    <div className="flex min-h-0 flex-1 flex-col overflow-hidden">
      <div className="flex-1 space-y-6 overflow-y-auto p-3">
        <div>
          <p className="mb-2 px-3 text-[11px] font-semibold uppercase tracking-wider text-muted">Workspace</p>
          <div className="space-y-1">
            {MAIN_LINKS.map((link) => (
              <DashboardNavLink
                key={link.href}
                href={link.href}
                label={link.label}
                description={link.description}
                icon={link.icon}
                active={isActive(pathname, link.href, "exact" in link ? link.exact : false)}
                onNavigate={onNavigate}
              />
            ))}
          </div>
        </div>

        <div>
          <p className="mb-2 px-3 text-[11px] font-semibold uppercase tracking-wider text-muted">Actions</p>
          <div className="space-y-1">
            {ACTION_LINKS.map((link) => (
              <DashboardNavLink
                key={link.href}
                href={link.href}
                label={link.label}
                description={link.description}
                icon={link.icon}
                active={isActive(pathname, link.href)}
                onNavigate={onNavigate}
              />
            ))}
          </div>
        </div>

        <div>
          <p className="mb-2 px-3 text-[11px] font-semibold uppercase tracking-wider text-muted">Account</p>
          <div className="space-y-1">
            {SUPPORT_LINKS.map((link) => (
              <DashboardNavLink
                key={link.href}
                href={link.href}
                label={link.label}
                description={link.description}
                icon={link.icon}
                active={isActive(pathname, link.href)}
                onNavigate={onNavigate}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export function DashboardNav({ profile }: DashboardNavProps) {
  const pathname = usePathname();
  const chrome = useDashboardChrome();
  const mobileOpen = chrome?.mobileNavOpen ?? false;
  const setMobileOpen = chrome?.setMobileNavOpen ?? (() => {});

  const closeDrawer = () => setMobileOpen(false);

  return (
    <>
      <DashboardMobileDrawer open={mobileOpen} onClose={closeDrawer}>
        <SidebarContent pathname={pathname} onNavigate={closeDrawer} />
      </DashboardMobileDrawer>

      <aside className="hidden w-72 shrink-0 lg:block">
        <div className="sticky top-24 flex max-h-[calc(100vh-7rem)] flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
          <SidebarContent pathname={pathname} />
        </div>
      </aside>
    </>
  );
}
