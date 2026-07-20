"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import { Loader2 } from "lucide-react";
import { SHIPPING_ROUTES } from "@/lib/constants";
import { FREIGHT_METHODS } from "@/lib/constants/logistics";
import { calculateAndSaveEstimate } from "@/lib/actions/estimates";
import type { EstimateResult } from "@/lib/pricing/estimator";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";

export function ShippingEstimator() {
  const [result, setResult] = useState<EstimateResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    const fd = new FormData(e.currentTarget);

    startTransition(async () => {
      const res = await calculateAndSaveEstimate({
        originCity: fd.get("originCity") as string,
        destinationCountry: fd.get("destinationCountry") as string,
        destinationCity: (fd.get("destinationCity") as string) || undefined,
        freightMethod: fd.get("freightMethod") as "air",
        actualWeight: Number(fd.get("actualWeight")),
        lengthCm: Number(fd.get("lengthCm")) || undefined,
        widthCm: Number(fd.get("widthCm")) || undefined,
        heightCm: Number(fd.get("heightCm")) || undefined,
        packageCount: Number(fd.get("packageCount")) || 1,
        pickupRequired: fd.get("pickupRequired") === "on",
        doorDeliveryRequired: fd.get("doorDeliveryRequired") === "on",
      });

      if (res.success) setResult(res.result);
      else setError(res.error);
    });
  }

  return (
    <div>
      <form onSubmit={handleSubmit} className="grid gap-4 sm:grid-cols-2">
        <Input id="originCity" name="originCity" label="Origin city *" defaultValue="Guangzhou" required />
        <Select id="destinationCountry" name="destinationCountry" label="Destination *" required>
          <option value="">Select</option>
          {SHIPPING_ROUTES.map((r) => <option key={r.id} value={r.destination}>{r.destination}</option>)}
        </Select>
        <Select id="freightMethod" name="freightMethod" label="Shipping method *" required>
          {FREIGHT_METHODS.map((m) => <option key={m.value} value={m.value}>{m.label}</option>)}
        </Select>
        <Input id="actualWeight" name="actualWeight" label="Weight (kg) *" type="number" step="0.1" required />
        <Input id="packageCount" name="packageCount" label="Packages" type="number" defaultValue={1} min={1} />
        <Input id="lengthCm" name="lengthCm" label="Length (cm)" type="number" />
        <Input id="widthCm" name="widthCm" label="Width (cm)" type="number" />
        <Input id="heightCm" name="heightCm" label="Height (cm)" type="number" />
        <label className="flex items-center gap-2 text-sm text-foreground"><input type="checkbox" name="pickupRequired" /> Pickup required</label>
        <label className="flex items-center gap-2 text-sm text-foreground"><input type="checkbox" name="doorDeliveryRequired" /> Door delivery</label>
        <div className="sm:col-span-2">
          <Button type="submit" disabled={isPending} className="w-full sm:w-auto">
            {isPending ? <><Loader2 className="h-4 w-4 animate-spin" /> Calculating...</> : "Calculate Estimate"}
          </Button>
        </div>
      </form>

      {error && <p className="mt-4 text-sm text-red-500">{error}</p>}

      {result && (
        <Card className="mt-8">
          <CardContent className="p-6">
            <p className="text-2xl font-bold text-foreground">
              ${result.estimatedMin} – ${result.estimatedMax} <span className="text-base font-normal text-muted">{result.currency}</span>
            </p>
            <p className="mt-1 text-sm text-muted">
              Transit: {result.transitDaysMin}–{result.transitDaysMax} days · Chargeable: {result.chargeableWeight} kg
            </p>
            <ul className="mt-4 space-y-1 border-t border-border pt-4">
              {result.breakdown.map((b) => (
                <li key={b.label} className="flex justify-between text-sm">
                  <span className="text-muted">{b.label}</span>
                  <span className="text-foreground">${b.amount}</span>
                </li>
              ))}
            </ul>
            <p className="mt-4 text-xs text-muted">{result.disclaimer}</p>
            <Link href="/source" className="mt-4 inline-block">
              <Button size="sm">Request Formal Quote</Button>
            </Link>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
