import type { LucideIcon } from "lucide-react";
import {
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
  Plus,
  Radio,
  Search,
  Settings,
  Shield,
  Truck,
  Users,
  Warehouse,
} from "lucide-react";
import { getDefaultStaffRedirect, getStaffRoleLabel } from "@/lib/auth/roles";
import { getDemoAdminQuote, getDemoShipment } from "@/lib/admin/workspace-demo-data";

export interface BreadcrumbItem {
  label: string;
  href?: string;
  icon?: LucideIcon;
  current?: boolean;
}

const ADMIN_SEGMENT_LABELS: Record<string, string> = {
  operations: "Operations",
  warehouse: "Warehouse",
  finance: "Finance",
  support: "Support",
  customers: "Customers",
  settings: "Settings",
  quotes: "Quotes",
  shipments: "Shipments",
  bookings: "Bookings",
  tracking: "Tracking",
  consolidations: "Consolidations",
  warehouses: "Warehouses",
  inventory: "Inventory",
  receipts: "Receipts",
  packages: "Packages",
  receive: "Receive Cargo",
  locations: "Locations",
  dispatch: "Dispatch",
  exceptions: "Exceptions",
  invoices: "Invoices",
  payments: "Payments",
  refunds: "Refunds",
  statements: "Statements",
  companies: "Companies",
  suppliers: "Suppliers",
  tickets: "Tickets",
  services: "Services",
  routes: "Routes",
  pricing: "Pricing",
  countries: "Countries",
  ports: "Ports",
  airports: "Airports",
  currencies: "Currencies",
  staff: "Staff",
  roles: "Roles & Permissions",
  integrations: "Integrations",
  notifications: "Notifications",
  website: "Website",
  "audit-logs": "Audit Logs",
  new: "New",
};

const ADMIN_SEGMENT_ICONS: Record<string, LucideIcon> = {
  operations: Radio,
  warehouse: Warehouse,
  finance: CreditCard,
  support: Inbox,
  customers: Users,
  settings: Settings,
  quotes: FileText,
  shipments: Package,
  bookings: Truck,
  tracking: Search,
  consolidations: Package,
  warehouses: Warehouse,
  inventory: Warehouse,
  receipts: FileText,
  packages: Package,
  receive: Package,
  locations: Warehouse,
  invoices: CreditCard,
  payments: CreditCard,
  refunds: CreditCard,
  statements: CreditCard,
  companies: Users,
  suppliers: Users,
  tickets: MessageSquare,
  services: FileText,
  routes: Truck,
  pricing: CreditCard,
  countries: Globe,
  ports: Anchor,
  airports: Plane,
  currencies: CreditCard,
  staff: Users,
  roles: Shield,
  integrations: Settings,
  notifications: Bell,
  website: LayoutDashboard,
  "audit-logs": FileText,
};

const DASHBOARD_SEGMENT_LABELS: Record<string, string> = {
  quotes: "Quotes",
  shipments: "Shipments",
  invoices: "Invoices",
  settings: "Settings",
  support: "Support",
  track: "Track Shipment",
  new: "New Quote",
};

const DASHBOARD_SEGMENT_ICONS: Record<string, LucideIcon> = {
  quotes: FileText,
  shipments: Package,
  invoices: CreditCard,
  settings: Settings,
  support: MessageSquare,
  track: Search,
  new: Plus,
};

function isDynamicSegment(segment: string) {
  if (ADMIN_SEGMENT_LABELS[segment] || DASHBOARD_SEGMENT_LABELS[segment]) return false;
  if (/^[0-9a-f-]{36}$/i.test(segment)) return true;
  return /^(kwy|inv|apex|q)-/i.test(segment);
}

function formatDynamicLabel(segment: string) {
  const demoQuote = getDemoAdminQuote(segment);
  if (demoQuote) return demoQuote.quoteNumber;

  const demoShipment = getDemoShipment(segment);
  if (demoShipment) return demoShipment.trackingId;

  if (/^[0-9a-f-]{36}$/i.test(segment)) return "Details";
  if (/^kwy-/i.test(segment)) return segment.replace(/-/g, " ").toUpperCase().replace("KWY ", "KWY-");
  if (/^inv-/i.test(segment)) return segment.toUpperCase();
  return segment
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

function getDepartmentOverviewLabel(segment: string) {
  switch (segment) {
    case "operations":
      return "Operations Center";
    case "warehouse":
      return "Warehouse Control";
    case "finance":
      return "Finance Center";
    case "support":
      return "Inbox";
    default:
      return ADMIN_SEGMENT_LABELS[segment] ?? segment;
  }
}

export function buildAdminBreadcrumbs(pathname: string, role: string): BreadcrumbItem[] {
  const segments = pathname.split("/").filter(Boolean);
  if (segments[0] !== "admin") return [];

  const rootHref = getDefaultStaffRedirect(role);
  const rootLabel = role === "admin" ? "Staff portal" : getStaffRoleLabel(role);

  if (segments.length === 1) {
    return [{ label: "Overview", href: "/admin", icon: LayoutDashboard, current: true }];
  }

  const items: BreadcrumbItem[] = [{ label: rootLabel, href: rootHref, icon: LayoutDashboard }];
  let cumulative = "/admin";

  for (let index = 1; index < segments.length; index++) {
    const segment = segments[index];
    cumulative += `/${segment}`;
    const isLast = index === segments.length - 1;

    let label: string;
    if (isDynamicSegment(segment)) {
      label = formatDynamicLabel(segment);
    } else if (["operations", "warehouse", "finance", "support"].includes(segment)) {
      label = getDepartmentOverviewLabel(segment);
    } else {
      label = ADMIN_SEGMENT_LABELS[segment] ?? segment.charAt(0).toUpperCase() + segment.slice(1);
    }

    items.push({
      label,
      href: isLast ? undefined : cumulative,
      icon: ADMIN_SEGMENT_ICONS[segment],
      current: isLast,
    });
  }

  return items;
}

export function buildDashboardBreadcrumbs(pathname: string): BreadcrumbItem[] {
  const segments = pathname.split("/").filter(Boolean);
  if (segments[0] !== "dashboard") return [];

  if (segments.length === 1) {
    return [{ label: "Overview", href: "/dashboard", icon: LayoutDashboard, current: true }];
  }

  const items: BreadcrumbItem[] = [{ label: "Customer portal", href: "/dashboard", icon: LayoutDashboard }];
  let cumulative = "/dashboard";

  for (let index = 1; index < segments.length; index++) {
    const segment = segments[index];
    cumulative += `/${segment}`;
    const isLast = index === segments.length - 1;

    const label = isDynamicSegment(segment)
      ? formatDynamicLabel(segment)
      : DASHBOARD_SEGMENT_LABELS[segment] ?? segment.charAt(0).toUpperCase() + segment.slice(1);

    items.push({
      label,
      href: isLast ? undefined : cumulative,
      icon: DASHBOARD_SEGMENT_ICONS[segment],
      current: isLast,
    });
  }

  return items;
}
