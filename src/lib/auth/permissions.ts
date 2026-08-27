import type { StaffRole } from "@/lib/auth/roles";

/** Departments map to operational workspaces — distinct from job titles. */
export const DEPARTMENTS = [
  "operations",
  "warehouse",
  "finance",
  "support",
  "admin",
] as const;

export type Department = (typeof DEPARTMENTS)[number];

export const DEPARTMENT_LABELS: Record<Department, string> = {
  operations: "Operations",
  warehouse: "Warehouse",
  finance: "Finance",
  support: "Support",
  admin: "Administration",
};

/** Granular permissions — roles grant subsets; expandable without schema changes. */
export const PERMISSIONS = [
  "operations.quotes.view",
  "operations.quotes.manage",
  "operations.shipments.view",
  "operations.shipments.manage",
  "operations.customers.view",
  "warehouse.receive",
  "warehouse.inspect",
  "warehouse.inventory.view",
  "warehouse.dispatch",
  "finance.invoices.view",
  "finance.invoices.manage",
  "finance.payments.verify",
  "finance.refunds",
  "support.inbox.view",
  "support.tickets.manage",
  "support.customers.view",
  "admin.settings",
  "admin.staff.manage",
  "admin.audit.view",
] as const;

export type Permission = (typeof PERMISSIONS)[number];

/** Default permission sets per staff role (managers would get superset later). */
export const ROLE_PERMISSIONS: Record<StaffRole, readonly Permission[]> = {
  admin: PERMISSIONS,
  operations: [
    "operations.quotes.view",
    "operations.quotes.manage",
    "operations.shipments.view",
    "operations.shipments.manage",
    "operations.customers.view",
    "support.customers.view",
  ],
  warehouse: [
    "warehouse.receive",
    "warehouse.inspect",
    "warehouse.inventory.view",
    "warehouse.dispatch",
    "operations.shipments.view",
    "operations.customers.view",
  ],
  finance: [
    "finance.invoices.view",
    "finance.invoices.manage",
    "finance.payments.verify",
    "finance.refunds",
    "operations.customers.view",
    "operations.shipments.view",
  ],
  support: [
    "support.inbox.view",
    "support.tickets.manage",
    "support.customers.view",
    "operations.shipments.view",
    "finance.invoices.view",
  ],
};

export const ROLE_DEPARTMENT: Record<StaffRole, Department> = {
  admin: "admin",
  operations: "operations",
  warehouse: "warehouse",
  finance: "finance",
  support: "support",
};

export const DEPARTMENT_HOME: Record<Department, string> = {
  admin: "/admin",
  operations: "/admin/operations",
  warehouse: "/admin/warehouse",
  finance: "/admin/finance",
  support: "/admin/support",
};

export function getDepartmentForRole(role: string): Department | null {
  if (role in ROLE_DEPARTMENT) return ROLE_DEPARTMENT[role as StaffRole];
  return null;
}

export function getPermissionsForRole(role: string): readonly Permission[] {
  if (role in ROLE_PERMISSIONS) return ROLE_PERMISSIONS[role as StaffRole];
  return [];
}

export function hasPermission(role: string, permission: Permission): boolean {
  if (role === "admin") return true;
  return getPermissionsForRole(role).includes(permission);
}

export function hasAnyPermission(role: string, permissions: readonly Permission[]): boolean {
  return permissions.some((p) => hasPermission(role, p));
}
