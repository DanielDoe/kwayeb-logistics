"use server";

import { isSupabaseConfigured } from "@/lib/auth/env";
import {
  ensureDemoDataSeeded,
  getDemoInvoices,
  getDemoInvoiceById,
} from "@/lib/auth/demo-data";
import { getDemoSession } from "@/lib/auth/demo-session";
import { isCustomerRole } from "@/lib/auth/roles";
import { createAdminClient } from "@/lib/supabase/server";
import { getSessionUser } from "@/lib/supabase/server-auth";

export type CustomerInvoice = {
  id: string;
  invoice_number: string;
  status: string;
  currency: string;
  total: number;
  due_date: string | null;
  created_at: string;
};

export async function getCustomerInvoices(): Promise<CustomerInvoice[]> {
  const user = await getSessionUser();
  if (!user) return [];

  if (!isSupabaseConfigured()) {
    const demo = await getDemoSession();
    if (demo && isCustomerRole(demo.role)) {
      await ensureDemoDataSeeded({
        userId: demo.id,
        email: demo.email,
        fullName: demo.fullName,
        role: demo.role,
      });
    }
    return getDemoInvoices(user.id);
  }

  const supabase = createAdminClient();
  const { data } = await supabase
    .from("kwayeb_invoices")
    .select("id, invoice_number, status, currency, total, due_date, created_at")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false })
    .limit(20);

  return (data ?? []).map((row) => ({
    id: row.id,
    invoice_number: row.invoice_number,
    status: row.status,
    currency: String(row.currency ?? "USD"),
    total: Number(row.total ?? 0),
    due_date: row.due_date ? String(row.due_date) : null,
    created_at: row.created_at,
  }));
}

export async function getCustomerInvoiceById(id: string): Promise<CustomerInvoice | null> {
  const user = await getSessionUser();
  if (!user) return null;

  if (!isSupabaseConfigured()) {
    const demo = await getDemoSession();
    if (demo && isCustomerRole(demo.role)) {
      await ensureDemoDataSeeded({
        userId: demo.id,
        email: demo.email,
        fullName: demo.fullName,
        role: demo.role,
      });
    }
    return getDemoInvoiceById(user.id, id);
  }

  const supabase = createAdminClient();
  const { data } = await supabase
    .from("kwayeb_invoices")
    .select("id, invoice_number, status, currency, total, due_date, created_at")
    .eq("id", id)
    .eq("user_id", user.id)
    .maybeSingle();

  if (!data) return null;

  return {
    id: data.id,
    invoice_number: data.invoice_number,
    status: data.status,
    currency: String(data.currency ?? "USD"),
    total: Number(data.total ?? 0),
    due_date: data.due_date ? String(data.due_date) : null,
    created_at: data.created_at,
  };
}
