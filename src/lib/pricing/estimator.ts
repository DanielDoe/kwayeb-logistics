import { BASE_RATES_USD, VOLUMETRIC_DIVISORS } from "@/lib/constants/logistics";

export interface EstimateInput {
  originCity: string;
  destinationCountry: string;
  destinationCity?: string;
  freightMethod: keyof typeof VOLUMETRIC_DIVISORS;
  actualWeight: number;
  lengthCm?: number;
  widthCm?: number;
  heightCm?: number;
  packageCount?: number;
  pickupRequired?: boolean;
  doorDeliveryRequired?: boolean;
}

export interface EstimateResult {
  volumetricWeight: number;
  chargeableWeight: number;
  estimatedMin: number;
  estimatedMax: number;
  currency: string;
  transitDaysMin: number;
  transitDaysMax: number;
  breakdown: { label: string; amount: number }[];
  disclaimer: string;
}

export function calculateShippingEstimate(input: EstimateInput): EstimateResult {
  const divisor = VOLUMETRIC_DIVISORS[input.freightMethod] ?? 6000;
  const packages = input.packageCount ?? 1;

  let volumetricWeight = 0;
  if (input.lengthCm && input.widthCm && input.heightCm) {
    const volume = input.lengthCm * input.widthCm * input.heightCm * packages;
    volumetricWeight =
      input.freightMethod === "sea" || input.freightMethod === "lcl" || input.freightMethod === "fcl"
        ? volume / 1_000_000
        : volume / divisor;
  }

  const chargeableWeight = Math.max(input.actualWeight * packages, volumetricWeight);
  const rates = BASE_RATES_USD[input.freightMethod] ?? BASE_RATES_USD.air;

  let baseFreight = 0;
  if ("perKg" in rates) {
    baseFreight = Math.max(chargeableWeight * rates.perKg, rates.minimum);
  } else if ("perCbm" in rates) {
    baseFreight = Math.max(chargeableWeight * rates.perCbm, rates.minimum);
  }

  const originHandling = 25;
  const documentation = 35;
  const fuelSurcharge = baseFreight * 0.12;
  const pickup = input.pickupRequired ? 45 : 0;
  const delivery = input.doorDeliveryRequired ? 55 : 0;

  const subtotal = baseFreight + originHandling + documentation + fuelSurcharge + pickup + delivery;
  const estimatedMin = Math.round(subtotal * 0.9);
  const estimatedMax = Math.round(subtotal * 1.15);

  const transitMap: Record<string, [number, number]> = {
    air: [5, 12],
    express: [3, 7],
    sea: [25, 45],
    fcl: [20, 40],
    lcl: [28, 50],
    rail: [15, 25],
    recommend: [7, 20],
  };
  const [transitDaysMin, transitDaysMax] = transitMap[input.freightMethod] ?? [7, 20];

  return {
    volumetricWeight: Math.round(volumetricWeight * 100) / 100,
    chargeableWeight: Math.round(chargeableWeight * 100) / 100,
    estimatedMin,
    estimatedMax,
    currency: "USD",
    transitDaysMin,
    transitDaysMax,
    breakdown: [
      { label: "Base freight", amount: Math.round(baseFreight) },
      { label: "Origin handling", amount: originHandling },
      { label: "Documentation", amount: documentation },
      { label: "Fuel surcharge", amount: Math.round(fuelSurcharge) },
      ...(pickup ? [{ label: "Supplier pickup", amount: pickup }] : []),
      ...(delivery ? [{ label: "Door delivery", amount: delivery }] : []),
    ],
    disclaimer:
      "This calculation is an initial estimate only. Final pricing may change after cargo inspection, verification of measurements, route confirmation, carrier availability, customs requirements, duties, taxes, and destination charges.",
  };
}

export function generateQuoteNumber(): string {
  const year = new Date().getFullYear();
  const seq = String(Date.now() % 100000).padStart(5, "0");
  return `KWQ-${year}-${seq}`;
}

export function generateTicketNumber(): string {
  const seq = String(Date.now() % 100000).padStart(5, "0");
  return `TKT-${seq}`;
}
