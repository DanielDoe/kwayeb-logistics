"use server";

import { createAdminClient } from "@/lib/supabase/server";
import { calculateShippingEstimate } from "@/lib/pricing/estimator";
import { estimateSchema, pickupSchema, type EstimateInput, type PickupInput } from "@/lib/validations/quotes";

export async function calculateAndSaveEstimate(input: EstimateInput) {
  const parsed = estimateSchema.safeParse(input);
  if (!parsed.success) {
    return { success: false as const, error: parsed.error.issues[0]?.message ?? "Invalid input" };
  }

  const data = parsed.data;
  const result = calculateShippingEstimate({
    originCity: data.originCity,
    destinationCountry: data.destinationCountry,
    destinationCity: data.destinationCity,
    freightMethod: data.freightMethod,
    actualWeight: data.actualWeight,
    lengthCm: data.lengthCm,
    widthCm: data.widthCm,
    heightCm: data.heightCm,
    packageCount: data.packageCount,
    pickupRequired: data.pickupRequired,
    doorDeliveryRequired: data.doorDeliveryRequired,
  });

  try {
    const supabase = createAdminClient();
    await supabase.from("kwayeb_estimates").insert({
      origin_city: data.originCity,
      destination_country: data.destinationCountry,
      destination_city: data.destinationCity ?? null,
      freight_method: data.freightMethod,
      cargo_type: data.cargoType ?? null,
      actual_weight: data.actualWeight,
      length_cm: data.lengthCm ?? null,
      width_cm: data.widthCm ?? null,
      height_cm: data.heightCm ?? null,
      package_count: data.packageCount,
      pickup_required: data.pickupRequired,
      door_delivery_required: data.doorDeliveryRequired,
      volumetric_weight: result.volumetricWeight,
      chargeable_weight: result.chargeableWeight,
      estimated_min: result.estimatedMin,
      estimated_max: result.estimatedMax,
      currency: result.currency,
      breakdown: result.breakdown,
      contact_email: data.contactEmail ?? null,
    });
  } catch {
    // Non-blocking — still return estimate even if save fails
  }

  return { success: true as const, result };
}

export async function submitPickupRequest(input: PickupInput) {
  const parsed = pickupSchema.safeParse(input);
  if (!parsed.success) {
    return { success: false as const, error: parsed.error.issues[0]?.message ?? "Invalid input" };
  }

  try {
    const supabase = createAdminClient();
    const { error } = await supabase.from("kwayeb_pickup_requests").insert({
      supplier_city: parsed.data.supplierCity,
      pickup_address: parsed.data.pickupAddress,
      contact_name: parsed.data.contactName,
      contact_phone: parsed.data.contactPhone,
      preferred_date: parsed.data.preferredDate || null,
      notes: parsed.data.notes ?? null,
    });

    if (error) {
      if (error.code === "42P01") {
        return { success: false as const, error: "Database not set up. Please run the latest migration." };
      }
      return { success: false as const, error: error.message };
    }

    return { success: true as const };
  } catch {
    return { success: false as const, error: "Unable to submit pickup request." };
  }
}
