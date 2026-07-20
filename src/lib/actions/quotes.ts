"use server";

import { createAdminClient } from "@/lib/supabase/server";
import { createAuthClient } from "@/lib/supabase/server-auth";
import { generateQuoteNumber } from "@/lib/pricing/estimator";
import { quoteWizardSchema, type QuoteWizardInput } from "@/lib/validations/quotes";

export type ActionResult =
  | { success: true; quoteNumber: string; id: string }
  | { success: false; error: string };

export async function submitQuoteRequest(input: QuoteWizardInput): Promise<ActionResult> {
  const parsed = quoteWizardSchema.safeParse(input);
  if (!parsed.success) {
    return { success: false, error: parsed.error.issues[0]?.message ?? "Invalid input" };
  }

  const data = parsed.data;
  const quoteNumber = generateQuoteNumber();

  try {
    const authClient = await createAuthClient();
    const { data: { user } } = await authClient.auth.getUser();
    const supabase = createAdminClient();

    const { data: row, error } = await supabase
      .from("kwayeb_quote_requests")
      .insert({
        quote_number: quoteNumber,
        user_id: user?.id ?? null,
        status: "SUBMITTED",
        origin_country: data.originCountry,
        origin_city: data.originCity,
        destination_country: data.destinationCountry,
        destination_city: data.destinationCity ?? null,
        destination_postal: data.destinationPostal ?? null,
        pickup_required: data.pickupRequired,
        door_delivery_required: data.doorDeliveryRequired,
        freight_method: data.freightMethod,
        cargo_category: data.cargoCategory ?? null,
        item_description: data.itemDescription,
        package_count: data.packageCount,
        package_type: data.packageType ?? null,
        actual_weight: data.actualWeight,
        length_cm: data.lengthCm ?? null,
        width_cm: data.widthCm ?? null,
        height_cm: data.heightCm ?? null,
        declared_value: data.declaredValue ?? null,
        currency: data.currency,
        cargo_flags: data.cargoFlags ?? {},
        supplier_name: data.supplierName ?? null,
        supplier_contact: data.supplierContact ?? null,
        supplier_phone: data.supplierPhone ?? null,
        supplier_address: data.supplierAddress ?? null,
        cargo_ready_date: data.cargoReadyDate || null,
        purchase_order: data.purchaseOrder ?? null,
        pickup_instructions: data.pickupInstructions ?? null,
        requested_services: data.requestedServices,
        contact_name: data.contactName,
        contact_email: data.contactEmail,
        contact_phone: data.contactPhone ?? null,
        contact_whatsapp: data.contactWhatsapp ?? null,
        preferred_contact: data.preferredContact ?? null,
        company: data.company ?? null,
        sourcing_type: data.sourcingType,
        additional_notes: data.additionalNotes ?? null,
      })
      .select("id, quote_number")
      .single();

    if (error) {
      if (error.code === "42P01") {
        return { success: false, error: "Database not set up. Please run the latest migration." };
      }
      return { success: false, error: error.message };
    }

    return { success: true, quoteNumber: row.quote_number, id: row.id };
  } catch {
    return { success: false, error: "Unable to submit quote request." };
  }
}

export async function getCustomerQuotes() {
  const authClient = await createAuthClient();
  const { data: { user } } = await authClient.auth.getUser();
  if (!user) return [];

  const supabase = createAdminClient();
  const { data } = await supabase
    .from("kwayeb_quote_requests")
    .select("id, quote_number, status, destination_country, freight_method, created_at")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false })
    .limit(20);

  return data ?? [];
}

export async function getCustomerShipments() {
  const authClient = await createAuthClient();
  const { data: { user } } = await authClient.auth.getUser();
  if (!user) return [];

  const supabase = createAdminClient();
  const { data } = await supabase
    .from("kwayeb_shipments")
    .select("id, tracking_id, status, destination, destination_country, freight_type, estimated_delivery, created_at")
    .eq("customer_email", user.email!)
    .order("created_at", { ascending: false })
    .limit(20);

  return data ?? [];
}

export async function getDashboardStats() {
  const authClient = await createAuthClient();
  const { data: { user } } = await authClient.auth.getUser();
  if (!user) return null;

  const supabase = createAdminClient();
  const [quotes, shipments, invoices] = await Promise.all([
    supabase.from("kwayeb_quote_requests").select("id", { count: "exact", head: true }).eq("user_id", user.id),
    supabase.from("kwayeb_shipments").select("id", { count: "exact", head: true }).eq("customer_email", user.email!),
    supabase.from("kwayeb_invoices").select("id", { count: "exact", head: true }).eq("user_id", user.id).in("status", ["ISSUED", "PARTIALLY_PAID", "OVERDUE"]),
  ]);

  return {
    activeQuotes: quotes.count ?? 0,
    activeShipments: shipments.count ?? 0,
    outstandingInvoices: invoices.count ?? 0,
  };
}
