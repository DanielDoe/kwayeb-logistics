"use server";

import { createAdminClient } from "@/lib/supabase/server";
import { sourcingRequestSchema, type SourcingRequestInput } from "@/lib/validations";

export type ActionResult =
  | { success: true; id: string }
  | { success: false; error: string };

export async function submitSourcingRequest(
  input: SourcingRequestInput,
): Promise<ActionResult> {
  const parsed = sourcingRequestSchema.safeParse(input);

  if (!parsed.success) {
    return { success: false, error: parsed.error.issues[0]?.message ?? "Invalid input" };
  }

  const data = parsed.data;

  try {
    const supabase = createAdminClient();

    const { data: row, error } = await supabase
      .from("kwayeb_sourcing_requests")
      .insert({
        full_name: data.fullName,
        email: data.email,
        phone: data.phone || null,
        destination_country: data.country,
        request_type: data.requestType,
        category: data.category || null,
        product_description: data.productDescription,
        quantity: data.quantity || null,
        budget: data.budget || null,
        additional_notes: data.additionalNotes || null,
      })
      .select("id")
      .single();

    if (error) {
      if (error.code === "42P01") {
        return {
          success: false,
          error: "Database not set up yet. Please run the migration in Supabase.",
        };
      }
      return { success: false, error: error.message };
    }

    return { success: true, id: row.id };
  } catch {
    return { success: false, error: "Unable to submit request. Please try again." };
  }
}
