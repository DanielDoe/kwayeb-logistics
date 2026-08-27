"use server";

import { revalidatePath } from "next/cache";
import { isSupabaseConfigured } from "@/lib/auth/env";
import {
  addDemoSupportTicket,
  ensureDemoDataSeeded,
  getDemoSupportTickets,
} from "@/lib/auth/demo-data";
import { getDemoSession } from "@/lib/auth/demo-session";
import { isCustomerRole } from "@/lib/auth/roles";
import { createAdminClient } from "@/lib/supabase/server";
import { getSessionUser, getUserProfile } from "@/lib/supabase/server-auth";
import { generateTicketNumber } from "@/lib/pricing/estimator";
import { contactSchema, type ContactInput } from "@/lib/validations/quotes";
import { z } from "zod";

const dashboardTicketSchema = z.object({
  category: z.enum([
    "quotation",
    "tracking",
    "payment",
    "warehouse",
    "damage",
    "customs",
    "delivery",
    "account",
    "technical",
    "general",
  ]),
  subject: z.string().min(3, "Subject is required"),
  message: z.string().min(10, "Please provide more detail"),
});

export type DashboardTicketInput = z.infer<typeof dashboardTicketSchema>;

async function ensureDemoSeed() {
  const demo = await getDemoSession();
  if (!demo || !isCustomerRole(demo.role)) return;
  await ensureDemoDataSeeded({
    userId: demo.id,
    email: demo.email,
    fullName: demo.fullName,
    role: demo.role,
  });
}

export async function submitContactForm(input: ContactInput) {
  const parsed = contactSchema.safeParse(input);
  if (!parsed.success) {
    return { success: false as const, error: parsed.error.issues[0]?.message ?? "Invalid input" };
  }

  if (!isSupabaseConfigured()) {
    const user = await getSessionUser();
    if (user) {
      await addDemoSupportTicket(user.id, {
        subject: parsed.data.subject,
        message: parsed.data.message,
        category: "general",
        contact_email: parsed.data.email,
        contact_name: parsed.data.name,
      });
    }
    return { success: true as const };
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

export async function submitDashboardSupportTicket(input: DashboardTicketInput) {
  const parsed = dashboardTicketSchema.safeParse(input);
  if (!parsed.success) {
    return { success: false as const, error: parsed.error.issues[0]?.message ?? "Invalid input" };
  }

  const profile = await getUserProfile();
  if (!profile) {
    return { success: false as const, error: "You must be signed in to open a ticket." };
  }

  if (!isSupabaseConfigured()) {
    const ticket = await addDemoSupportTicket(profile.id, {
      subject: parsed.data.subject,
      message: parsed.data.message,
      category: parsed.data.category,
      contact_email: profile.email,
      contact_name: profile.full_name,
    });
    revalidatePath("/dashboard/support");
    return { success: true as const, ticketNumber: ticket.ticket_number };
  }

  try {
    const supabase = createAdminClient();
    const ticketNumber = generateTicketNumber();
    const { error } = await supabase.from("kwayeb_support_tickets").insert({
      ticket_number: ticketNumber,
      user_id: profile.id,
      category: parsed.data.category,
      subject: parsed.data.subject,
      message: parsed.data.message,
      contact_email: profile.email,
      contact_name: profile.full_name,
      priority: "NORMAL",
      status: "OPEN",
    });

    if (error) {
      return { success: false as const, error: error.message };
    }

    revalidatePath("/dashboard/support");
    return { success: true as const, ticketNumber };
  } catch {
    return { success: false as const, error: "Unable to create support ticket." };
  }
}

export async function getCustomerSupportTickets() {
  const user = await getSessionUser();
  if (!user) return [];

  if (!isSupabaseConfigured()) {
    await ensureDemoSeed();
    return getDemoSupportTickets(user.id);
  }

  const supabase = createAdminClient();
  const { data } = await supabase
    .from("kwayeb_support_tickets")
    .select("id, ticket_number, subject, category, priority, status, created_at")
    .eq("contact_email", user.email!)
    .order("created_at", { ascending: false })
    .limit(20);

  return data ?? [];
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
