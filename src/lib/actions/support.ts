"use server";

import { createAdminClient } from "@/lib/supabase/server";
import { generateTicketNumber } from "@/lib/pricing/estimator";
import { contactSchema, type ContactInput } from "@/lib/validations/quotes";

export async function submitContactForm(input: ContactInput) {
  const parsed = contactSchema.safeParse(input);
  if (!parsed.success) {
    return { success: false as const, error: parsed.error.issues[0]?.message ?? "Invalid input" };
  }

  try {
    const supabase = createAdminClient();
    const { error } = await supabase.from("kwayeb_support_tickets").insert({
      ticket_number: generateTicketNumber(),
      category: "general",
      subject: parsed.data.subject,
      message: parsed.data.message,
      contact_email: parsed.data.email,
      contact_name: parsed.data.name,
      priority: "NORMAL",
      status: "OPEN",
    });

    if (error) {
      if (error.code === "42P01") {
        return { success: false as const, error: "Database not set up. Please run the latest migration." };
      }
      return { success: false as const, error: error.message };
    }

    return { success: true as const };
  } catch {
    return { success: false as const, error: "Unable to send message." };
  }
}

export async function getAdminStats() {
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
