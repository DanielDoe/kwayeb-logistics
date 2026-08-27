"use client";

import { createContext, useContext, type ReactNode } from "react";
import { AppBreadcrumbs } from "@/components/layout/app-breadcrumbs";

interface AdminChromeContextValue {
  role: string;
}

const AdminChromeContext = createContext<AdminChromeContextValue | null>(null);

export function AdminChromeProvider({ role, children }: { role: string; children: ReactNode }) {
  return <AdminChromeContext.Provider value={{ role }}>{children}</AdminChromeContext.Provider>;
}

export function useAdminChrome() {
  return useContext(AdminChromeContext);
}

export function AdminPageBreadcrumbs() {
  const chrome = useAdminChrome();
  return <AppBreadcrumbs variant="admin" role={chrome?.role ?? "admin"} />;
}
