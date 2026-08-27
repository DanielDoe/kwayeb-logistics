"use client";

import { usePathname } from "next/navigation";
import {
  AlertTriangle,
  Anchor,
  Bell,
  CreditCard,
  FileText,
  Globe,
  Inbox,
  LayoutDashboard,
  MessageSquare,
  Package,
  Plane,
  Radio,
  ScanLine,
  Settings,
  Shield,
  Truck,
  Users,
  Warehouse,
  type LucideIcon,
} from "lucide-react";
import { useDashboardChrome } from "@/components/dashboard/dashboard-chrome";
import { DashboardMobileDrawer } from "@/components/dashboard/dashboard-mobile-drawer";
import { DashboardNavLink } from "@/components/dashboard/dashboard-nav-link";
import {
  type AdminNavItemConfig,
  getAdminNavItemsForRole,
} from "@/lib/auth/roles";

interface AdminNavProps {
  profile: {
    full_name: string | null;
    email: string;
    role: string;
    company: string | null;
  };
}

function isActive(pathname: string, href: string, exact?: boolean) {
  const baseHref = href.split("?")[0];
  if (exact) return pathname === baseHref;
  return pathname === baseHref || pathname.startsWith(`${baseHref}/`);
}

function getNavIcon(href: string): LucideIcon {
  const path = href.split("?")[0];
  if (path === "/admin") return LayoutDashboard;
  if (path.endsWith("/operations")) return Radio;
  if (path.endsWith("/warehouse")) return Warehouse;
  if (path.endsWith("/finance")) return CreditCard;
  if (path.endsWith("/support")) return Inbox;
  if (path.includes("bookings")) return Truck;
  if (path.includes("tracking")) return Package;
  if (path.includes("consolidations")) return Package;
  if (path.includes("warehouses")) return Warehouse;
  if (path.includes("receipts")) return ScanLine;
  if (path.includes("packages")) return Package;
  if (path.includes("locations")) return Warehouse;
  if (path.includes("refunds")) return CreditCard;
  if (path.includes("statements")) return CreditCard;
  if (path.includes("companies")) return Users;
  if (path.includes("suppliers")) return Users;
  if (path.includes("tickets")) return MessageSquare;
  if (path.includes("/settings/staff")) return Users;
  if (path.includes("/settings/roles")) return Shield;
  if (path.includes("/settings/services")) return FileText;
  if (path.includes("/settings/routes")) return Truck;
  if (path.includes("/settings/pricing")) return CreditCard;
  if (path.includes("/settings/countries")) return Globe;
  if (path.includes("/settings/ports")) return Anchor;
  if (path.includes("/settings/airports")) return Plane;
  if (path.includes("/settings/currencies")) return CreditCard;
  if (path.includes("/settings/integrations")) return Settings;
  if (path.includes("/settings/notifications")) return Bell;
  if (path.includes("/settings/website")) return LayoutDashboard;
  if (path.includes("/settings/audit")) return FileText;
  if (path.includes("/customers")) return Users;
  if (path.includes("quotes")) return FileText;
  if (path.includes("shipments")) return Package;
  if (path.includes("customers")) return Users;
  if (path.includes("receive")) return ScanLine;
  if (path.includes("inventory")) return Warehouse;
  if (path.includes("dispatch")) return Truck;
  if (path.includes("exceptions")) return AlertTriangle;
  if (path.includes("invoices") || path.includes("payments") || path.includes("finance")) return CreditCard;
  if (path.includes("support")) return MessageSquare;
  if (path.includes("settings")) return Settings;
  return Inbox;
}

function groupBySection(items: AdminNavItemConfig[]) {
  const groups: { section: string; items: AdminNavItemConfig[] }[] = [];
  for (const item of items) {
    const section = item.section ?? "Workspace";
    const existing = groups.find((g) => g.section === section);
    if (existing) {
      existing.items.push(item);
    } else {
      groups.push({ section, items: [item] });
    }
  }
  return groups;
}

function flattenNavItems(items: AdminNavItemConfig[]): AdminNavItemConfig[] {
  const flat: AdminNavItemConfig[] = [];
  for (const item of items) {
    if (item.children?.length) {
      flat.push(item);
      const parentPath = item.href.split("?")[0];
      for (const child of item.children) {
        const childPath = child.href.split("?")[0];
        if (childPath !== parentPath || child.label !== item.label) {
          flat.push({ ...child, section: item.section, roles: item.roles });
        }
      }
    } else {
      flat.push(item);
    }
  }
  return flat;
}

function SidebarContent({
  profile,
  pathname,
  onNavigate,
}: AdminNavProps & { pathname: string; onNavigate?: () => void }) {
  const navItems = flattenNavItems(getAdminNavItemsForRole(profile.role));
  const groups = groupBySection(navItems);

  return (
    <div className="flex min-h-0 flex-1 flex-col overflow-hidden">
      <div className="flex-1 space-y-6 overflow-y-auto p-3">
        {groups.map((group) => (
          <div key={group.section}>
            <p className="mb-2 px-3 text-[11px] font-semibold uppercase tracking-wider text-muted">
              {group.section}
            </p>
            <div className="space-y-1">
              {group.items.map((item) => (
                <DashboardNavLink
                  key={`${item.href}-${item.label}`}
                  href={item.href}
                  label={item.label}
                  icon={getNavIcon(item.href)}
                  active={isActive(pathname, item.href, item.exact)}
                  onNavigate={onNavigate}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function AdminNav({ profile }: AdminNavProps) {
  const pathname = usePathname();
  const chrome = useDashboardChrome();
  const mobileOpen = chrome?.mobileNavOpen ?? false;
  const setMobileOpen = chrome?.setMobileNavOpen ?? (() => {});
  const closeDrawer = () => setMobileOpen(false);

  return (
    <>
      <DashboardMobileDrawer open={mobileOpen} onClose={closeDrawer} eyebrow="Staff portal" title="Navigation">
        <SidebarContent profile={profile} pathname={pathname} onNavigate={closeDrawer} />
      </DashboardMobileDrawer>

      <aside className="hidden w-72 shrink-0 lg:block">
        <div className="sticky top-24 flex max-h-[calc(100vh-7rem)] flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
          <SidebarContent profile={profile} pathname={pathname} />
        </div>
      </aside>
    </>
  );
}
