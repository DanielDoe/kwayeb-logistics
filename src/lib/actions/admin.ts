"use server";

import { isSupabaseConfigured } from "@/lib/auth/env";
import {
  ensureAdminDemoDataSeeded,
  getAdminDemoStats,
  getAllDemoInvoices,
  getAllDemoQuotes,
  getAllDemoShipments,
  getAllDemoSupportTickets,
} from "@/lib/auth/demo-data";
import { getDemoUsers } from "@/lib/auth/demo-session";
import { createAdminClient } from "@/lib/supabase/server";

async function getDemoUserMap() {
  const users = await getDemoUsers();
  return new Map(users.map((user) => [user.id, user]));
}

export async function fetchAdminStats() {
  if (!isSupabaseConfigured()) {
    return getAdminDemoStats();
  }

  const supabase = createAdminClient();
  const [quotes, shipments, tickets, invoices] = await Promise.all([
    supabase.from("kwayeb_quote_requests").select("id", { count: "exact", head: true }).eq("status", "SUBMITTED"),
    supabase.from("kwayeb_shipments").select("id", { count: "exact", head: true }).not("status", "eq", "delivered"),
    supabase.from("kwayeb_support_tickets").select("id", { count: "exact", head: true }).eq("status", "OPEN"),
    supabase.from("kwayeb_invoices").select("id", { count: "exact", head: true }).in("status", ["ISSUED", "OVERDUE"]),
  ]);

  return {
    newQuotes: quotes.count ?? 0,
    activeShipments: shipments.count ?? 0,
    openTickets: tickets.count ?? 0,
    unpaidInvoices: invoices.count ?? 0,
  };
}

export async function fetchAdminQuotes() {
  if (!isSupabaseConfigured()) {
    await ensureAdminDemoDataSeeded();
    const [quotes, userMap] = await Promise.all([getAllDemoQuotes(), getDemoUserMap()]);
    return quotes.map((quote) => {
      const user = userMap.get(quote.user_id);
      return {
        id: quote.id,
        quote_number: quote.quote_number,
        contact_name: user?.fullName ?? "Customer",
        contact_email: user?.email ?? "—",
        destination_country: quote.destination_country,
        freight_method: quote.freight_method,
        status: quote.status,
        created_at: quote.created_at,
      };
    });
  }

  const supabase = createAdminClient();
  const { data } = await supabase
    .from("kwayeb_quote_requests")
    .select("id, quote_number, contact_name, contact_email, destination_country, freight_method, status, created_at")
    .order("created_at", { ascending: false })
    .limit(50);

  return data ?? [];
}

export async function fetchAdminShipments() {
  if (!isSupabaseConfigured()) {
    await ensureAdminDemoDataSeeded();
    const [shipments, userMap] = await Promise.all([getAllDemoShipments(), getDemoUserMap()]);
    return shipments.map((shipment) => {
      const user = userMap.get(shipment.user_id);
      return {
        id: shipment.id,
        tracking_id: shipment.tracking_id,
        status: shipment.status,
        destination: shipment.destination,
        destination_country: shipment.destination_country,
        freight_type: shipment.freight_type,
        customer_name: user?.fullName ?? null,
        created_at: shipment.created_at,
      };
    });
  }

  const supabase = createAdminClient();
  const { data } = await supabase
    .from("kwayeb_shipments")
    .select("id, tracking_id, status, destination, destination_country, freight_type, customer_name, created_at")
    .order("created_at", { ascending: false })
    .limit(50);

  return data ?? [];
}

export async function fetchAdminQuoteById(id: string) {
  const demoQuote = (await import("@/lib/admin/workspace-demo-data")).getDemoAdminQuote(id);
  if (demoQuote) return demoQuote;

  if (!isSupabaseConfigured()) {
    await ensureAdminDemoDataSeeded();
    const [quotes, userMap] = await Promise.all([getAllDemoQuotes(), getDemoUserMap()]);
    const quote = quotes.find((item) => item.id === id);
    if (!quote) return null;
    const user = userMap.get(quote.user_id);
    return {
      id: quote.id,
      quoteNumber: quote.quote_number,
      status: quote.status.toLowerCase(),
      statusLabel: quote.status.replace(/_/g, " "),
      customer: user?.fullName ?? "Customer",
      contactEmail: user?.email ?? "—",
      origin: "China",
      destination: quote.destination_country,
      freightMethod: quote.freight_method ?? "—",
      cargoDescription: "Customer quote request awaiting operations review.",
      submittedAt: new Date(quote.created_at).toLocaleDateString(undefined, {
        month: "short",
        day: "numeric",
        year: "numeric",
      }),
      pendingIssue: quote.status === "SUBMITTED" ? "Quote awaiting preparation" : undefined,
    };
  }

  const supabase = createAdminClient();
  const { data } = await supabase
    .from("kwayeb_quote_requests")
    .select(
      "id, quote_number, contact_name, contact_email, destination_country, freight_method, status, created_at, origin_country, origin_city, destination_city, item_description",
    )
    .eq("id", id)
    .maybeSingle();

  if (!data) return null;

  return {
    id: data.id,
    quoteNumber: data.quote_number,
    status: data.status.toLowerCase(),
    statusLabel: data.status.replace(/_/g, " "),
    customer: data.contact_name ?? "Customer",
    contactEmail: data.contact_email ?? "—",
    origin: [data.origin_city, data.origin_country].filter(Boolean).join(", ") || "China",
    destination: [data.destination_city, data.destination_country].filter(Boolean).join(", "),
    freightMethod: data.freight_method ?? "—",
    cargoDescription: data.item_description ?? "Customer quote request awaiting operations review.",
    submittedAt: new Date(data.created_at).toLocaleDateString(undefined, {
      month: "short",
      day: "numeric",
      year: "numeric",
    }),
    pendingIssue: data.status === "SUBMITTED" ? "Quote awaiting preparation" : undefined,
  };
}

export type AdminInvoiceRow = {
  id: string;
  invoice_number: string;
  status: string;
  currency: string;
  total: number;
  due_date: string | null;
  contact_name: string;
  contact_email: string;
  created_at: string;
};

export async function fetchAdminInvoices(): Promise<AdminInvoiceRow[]> {
  if (!isSupabaseConfigured()) {
    await ensureAdminDemoDataSeeded();
    const [invoices, userMap] = await Promise.all([getAllDemoInvoices(), getDemoUserMap()]);
    return invoices.map((invoice) => {
      const user = userMap.get(invoice.user_id);
      return {
        id: invoice.id,
        invoice_number: invoice.invoice_number,
        status: invoice.status,
        currency: invoice.currency,
        total: invoice.total,
        due_date: invoice.due_date,
        contact_name: user?.fullName ?? "Customer",
        contact_email: user?.email ?? "—",
        created_at: invoice.created_at,
      };
    });
  }

  const supabase = createAdminClient();
  const { data } = await supabase
    .from("kwayeb_invoices")
    .select("id, invoice_number, status, currency, total, due_date, created_at, user_id")
    .order("created_at", { ascending: false })
    .limit(50);

  return (data ?? []).map((invoice) => ({
    id: String(invoice.id),
    invoice_number: String(invoice.invoice_number),
    status: String(invoice.status),
    currency: String(invoice.currency ?? "USD"),
    total: Number(invoice.total ?? 0),
    due_date: invoice.due_date ? String(invoice.due_date) : null,
    contact_name: "Customer",
    contact_email: "—",
    created_at: String(invoice.created_at),
  }));
}

export async function fetchAdminSupportTickets() {
  if (!isSupabaseConfigured()) {
    await ensureAdminDemoDataSeeded();
    const tickets = await getAllDemoSupportTickets();
    return tickets.map((ticket) => ({
      id: ticket.id,
      ticket_number: ticket.ticket_number,
      subject: ticket.subject,
      category: ticket.category,
      priority: ticket.priority,
      status: ticket.status,
      contact_email: ticket.contact_email,
      created_at: ticket.created_at,
    }));
  }

  const supabase = createAdminClient();
  const { data } = await supabase
    .from("kwayeb_support_tickets")
    .select("id, ticket_number, subject, category, priority, status, contact_email, created_at")
    .order("created_at", { ascending: false })
    .limit(50);

  return data ?? [];
}

export async function fetchAdminCustomers() {
  if (!isSupabaseConfigured()) {
    await ensureAdminDemoDataSeeded();
    const users = await getDemoUsers();
    return users
      .filter((user) => user.role === "customer" || user.role === "business")
      .map((user) => ({
        id: user.id,
        full_name: user.fullName,
        email: user.email,
        company: user.company,
        role: user.role,
      }));
  }

  const supabase = createAdminClient();
  const { data } = await supabase
    .from("kwayeb_profiles")
    .select("id, full_name, email, company, role")
    .in("role", ["customer", "business"])
    .order("created_at", { ascending: false })
    .limit(50);

  return data ?? [];
}

export async function fetchAdminStaff() {
  if (!isSupabaseConfigured()) {
    const { DEMO_SEED_USERS } = await import("@/lib/auth/demo-staff-users");
    const { STAFF_ROLES } = await import("@/lib/auth/roles");
    return DEMO_SEED_USERS.filter((u) => (STAFF_ROLES as readonly string[]).includes(u.role)).map((user) => ({
      id: user.email,
      full_name: user.fullName,
      email: user.email,
      company: user.company,
      role: user.role,
    }));
  }

  const supabase = createAdminClient();
  const { data } = await supabase
    .from("kwayeb_profiles")
    .select("id, full_name, email, company, role")
    .in("role", ["admin", "operations", "warehouse", "finance", "support"])
    .order("created_at", { ascending: false });

  return data ?? [];
}
