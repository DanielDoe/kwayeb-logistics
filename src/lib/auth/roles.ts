import type { UserRole } from "@/lib/constants/logistics";

import {

  DEPARTMENT_HOME,

  type Department,

  getDepartmentForRole,

  hasPermission,

  type Permission,

} from "@/lib/auth/permissions";



export const STAFF_ROLES = [

  "admin",

  "operations",

  "warehouse",

  "finance",

  "support",

] as const;



export type StaffRole = (typeof STAFF_ROLES)[number];



export const CUSTOMER_ROLES = ["customer", "business"] as const;

export type CustomerRole = (typeof CUSTOMER_ROLES)[number];



export const STAFF_ROLE_LABELS: Record<StaffRole, string> = {

  admin: "Administrator",

  operations: "Operations",

  warehouse: "Warehouse",

  finance: "Finance",

  support: "Support",

};



/** Routes staff may access. Admin always has full access. */

export const ADMIN_ROUTE_ACCESS: Record<string, readonly StaffRole[]> = {

  "/admin": STAFF_ROLES,

  "/admin/operations": ["admin", "operations"],

  "/admin/warehouse": ["admin", "warehouse"],

  "/admin/finance": ["admin", "finance"],

  "/admin/support": ["admin", "support"],

  "/admin/settings": ["admin"],
  "/admin/customers": ["admin", "operations", "support", "finance"],

  // Legacy routes — redirect targets

  "/admin/quotes": ["admin", "operations"],

  "/admin/shipments": ["admin", "operations", "warehouse"],

  "/admin/invoices": ["admin", "finance"],

};



export interface AdminNavItemConfig {

  href: string;

  label: string;

  section?: string;

  roles: readonly StaffRole[];

  exact?: boolean;

  children?: Omit<AdminNavItemConfig, "children" | "roles">[];

}



function nav(

  items: Omit<AdminNavItemConfig, "roles">[],

  roles: readonly StaffRole[],

): AdminNavItemConfig[] {

  return items.map((item) => ({ ...item, roles }));

}



/** Admin superuser navigation — full system access grouped by domain. */
const ADMIN_NAV: AdminNavItemConfig[] = [
  { href: "/admin", label: "Overview", section: "Overview", roles: ["admin"], exact: true },
  ...nav(
    [
      { href: "/admin/operations", label: "Operations Center", section: "OPERATIONS" },
      { href: "/admin/operations/quotes", label: "Quotes" },
      { href: "/admin/operations/shipments", label: "Shipments" },
      { href: "/admin/operations/bookings", label: "Bookings" },
      { href: "/admin/operations/tracking", label: "Tracking" },
      { href: "/admin/operations/consolidations", label: "Consolidations" },
    ],
    ["admin"],
  ),
  ...nav(
    [
      { href: "/admin/warehouse", label: "Warehouse Control", section: "WAREHOUSE" },
      { href: "/admin/warehouse/warehouses", label: "Warehouses" },
      { href: "/admin/warehouse/inventory", label: "Inventory" },
      { href: "/admin/warehouse/receipts", label: "Receipts" },
      { href: "/admin/warehouse/packages", label: "Packages" },
      { href: "/admin/warehouse/receive", label: "Receive Cargo" },
      { href: "/admin/warehouse/locations", label: "Locations" },
    ],
    ["admin"],
  ),
  ...nav(
    [
      { href: "/admin/finance", label: "Finance Center", section: "FINANCE" },
      { href: "/admin/finance/invoices", label: "Invoices" },
      { href: "/admin/finance/payments", label: "Payments" },
      { href: "/admin/finance/refunds", label: "Refunds" },
      { href: "/admin/finance/statements", label: "Statements" },
    ],
    ["admin"],
  ),
  ...nav(
    [
      { href: "/admin/customers", label: "Customers", section: "CUSTOMERS" },
      { href: "/admin/customers/companies", label: "Companies" },
      { href: "/admin/customers/suppliers", label: "Suppliers" },
    ],
    ["admin"],
  ),
  ...nav(
    [
      { href: "/admin/support", label: "Inbox", section: "SUPPORT" },
      { href: "/admin/support/tickets", label: "Tickets" },
    ],
    ["admin"],
  ),
  ...nav(
    [
      { href: "/admin/settings/services", label: "Services", section: "CONFIGURATION" },
      { href: "/admin/settings/routes", label: "Routes" },
      { href: "/admin/settings/pricing", label: "Pricing" },
      { href: "/admin/settings/countries", label: "Countries" },
      { href: "/admin/settings/ports", label: "Ports" },
      { href: "/admin/settings/airports", label: "Airports" },
      { href: "/admin/settings/currencies", label: "Currencies" },
    ],
    ["admin"],
  ),
  ...nav(
    [
      { href: "/admin/settings/staff", label: "Staff", section: "SYSTEM" },
      { href: "/admin/settings/roles", label: "Roles & Permissions" },
      { href: "/admin/settings/integrations", label: "Integrations" },
      { href: "/admin/settings/notifications", label: "Notifications" },
      { href: "/admin/settings/website", label: "Website" },
      { href: "/admin/settings/audit-logs", label: "Audit Logs" },
      { href: "/admin/settings", label: "Settings", exact: true },
    ],
    ["admin"],
  ),
];



/** Operations workspace navigation. */

const OPERATIONS_NAV: AdminNavItemConfig[] = [

  { href: "/admin/operations", label: "Overview", section: "Overview", roles: ["admin", "operations"], exact: true },

  {

    href: "/admin/operations/quotes",

    label: "Quotes",

    section: "Quotes",

    roles: ["admin", "operations"],

    children: [

      { href: "/admin/operations/quotes", label: "Quote Requests" },

      { href: "/admin/operations/quotes?status=draft", label: "Draft Quotes" },

      { href: "/admin/operations/quotes?status=awaiting", label: "Awaiting Customer" },

    ],

  },

  {

    href: "/admin/operations/shipments",

    label: "Shipments",

    section: "Shipments",

    roles: ["admin", "operations"],

    children: [

      { href: "/admin/operations/shipments", label: "All Shipments" },

      { href: "/admin/operations/shipments?status=ready", label: "Ready to Ship" },

      { href: "/admin/operations/shipments?status=transit", label: "In Transit" },

      { href: "/admin/operations/shipments?status=customs", label: "Customs" },

      { href: "/admin/operations/shipments?status=exceptions", label: "Exceptions" },

    ],

  },

  { href: "/admin/operations/customers", label: "Customers", section: "Customers", roles: ["admin", "operations"] },

];



/** Warehouse workspace navigation. */

const WAREHOUSE_NAV: AdminNavItemConfig[] = [

  { href: "/admin/warehouse", label: "Warehouse Overview", section: "Overview", roles: ["admin", "warehouse"], exact: true },

  { href: "/admin/warehouse/receive", label: "Receive Cargo", section: "Receive", roles: ["admin", "warehouse"] },

  { href: "/admin/warehouse/inventory", label: "Warehouse Inventory", section: "Inventory", roles: ["admin", "warehouse"] },

  { href: "/admin/warehouse/dispatch", label: "Ready for Dispatch", section: "Dispatch", roles: ["admin", "warehouse"] },

  { href: "/admin/warehouse/exceptions", label: "Exceptions", section: "Exceptions", roles: ["admin", "warehouse"] },

];



/** Finance workspace navigation. */

const FINANCE_NAV: AdminNavItemConfig[] = [

  { href: "/admin/finance", label: "Finance Overview", section: "Overview", roles: ["admin", "finance"], exact: true },

  { href: "/admin/finance/invoices", label: "Invoices", section: "Invoices", roles: ["admin", "finance"] },

  { href: "/admin/finance/payments", label: "Payment Verification", section: "Payments", roles: ["admin", "finance"] },

  { href: "/admin/finance/customers", label: "Customer Balances", section: "Customers", roles: ["admin", "finance"] },

];



/** Support workspace navigation. */

const SUPPORT_NAV: AdminNavItemConfig[] = [

  { href: "/admin/support", label: "Inbox", section: "Inbox", roles: ["admin", "support"], exact: true },

  { href: "/admin/support?filter=mine", label: "My Tickets", section: "Tickets", roles: ["admin", "support"] },

  { href: "/admin/support?filter=unassigned", label: "Unassigned", section: "Tickets", roles: ["admin", "support"] },

  { href: "/admin/support?filter=urgent", label: "Urgent", section: "Tickets", roles: ["admin", "support"] },

  { href: "/admin/support/customers", label: "Customers", section: "Customers", roles: ["admin", "support"] },

];



export function isStaffRole(role: string): role is StaffRole {

  return (STAFF_ROLES as readonly string[]).includes(role);

}



export function isCustomerRole(role: string): role is CustomerRole {

  return (CUSTOMER_ROLES as readonly string[]).includes(role);

}



export function isValidDemoRole(role: string): role is Exclude<UserRole, "guest"> {

  return isStaffRole(role) || isCustomerRole(role);

}



export function getStaffRoleLabel(role: string) {

  if (isStaffRole(role)) return STAFF_ROLE_LABELS[role];

  return role;

}



export function canAccessAdminPath(role: string, path: string): boolean {

  if (!isStaffRole(role)) return false;

  if (role === "admin") return true;



  const match = Object.keys(ADMIN_ROUTE_ACCESS)

    .filter((route) => path === route || path.startsWith(`${route}/`))

    .sort((a, b) => b.length - a.length)[0];



  if (!match) {

    const dept = getDepartmentForRole(role);

    if (dept) {

      const home = DEPARTMENT_HOME[dept];

      return path === home || path.startsWith(`${home}/`);

    }

    return false;

  }

  return ADMIN_ROUTE_ACCESS[match].includes(role);

}



export function getAdminNavItemsForRole(role: string): AdminNavItemConfig[] {

  if (role === "admin") return ADMIN_NAV;

  if (!isStaffRole(role)) return [];



  switch (role) {

    case "operations":

      return OPERATIONS_NAV;

    case "warehouse":

      return WAREHOUSE_NAV;

    case "finance":

      return FINANCE_NAV;

    case "support":

      return SUPPORT_NAV;

    default:

      return [];

  }

}



export function getDefaultStaffRedirect(role: string): string {

  const dept = getDepartmentForRole(role);

  if (dept) return DEPARTMENT_HOME[dept];

  return "/admin";

}



export function getStaffHomePath(role: string): string {

  return getDefaultStaffRedirect(role);

}



export function canPerform(role: string, permission: Permission): boolean {

  return hasPermission(role, permission);

}



export { type Department, DEPARTMENT_HOME, getDepartmentForRole };


