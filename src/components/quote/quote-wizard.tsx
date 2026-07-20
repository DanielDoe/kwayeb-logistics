"use client";

import { useState, useTransition } from "react";
import { CheckCircle2, ChevronLeft, ChevronRight, Loader2 } from "lucide-react";
import { SHIPPING_ROUTES, PRODUCT_CATEGORIES } from "@/lib/constants";
import { FREIGHT_METHODS } from "@/lib/constants/logistics";
import { submitQuoteRequest } from "@/lib/actions/quotes";
import type { QuoteWizardInput } from "@/lib/validations/quotes";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

const STEPS = ["Route", "Freight", "Cargo", "Supplier", "Services", "Contact", "Review"];
const SERVICE_OPTIONS = [
  "Cargo inspection", "Repacking", "Palletization", "Labeling",
  "Consolidation", "Insurance request", "Customs-support request", "Destination delivery",
];

const INITIAL: QuoteWizardInput = {
  originCountry: "China",
  originCity: "",
  destinationCountry: "",
  destinationCity: "",
  destinationPostal: "",
  pickupRequired: false,
  doorDeliveryRequired: false,
  freightMethod: "recommend",
  cargoCategory: "",
  itemDescription: "",
  packageCount: 1,
  packageType: "",
  actualWeight: 0,
  lengthCm: undefined,
  widthCm: undefined,
  heightCm: undefined,
  declaredValue: undefined,
  currency: "USD",
  cargoFlags: { batteries: false, liquids: false, magnets: false, food: false, cosmetics: false, branded: false, hazardous: false, fragile: false },
  supplierName: "",
  supplierContact: "",
  supplierPhone: "",
  supplierAddress: "",
  cargoReadyDate: "",
  purchaseOrder: "",
  pickupInstructions: "",
  requestedServices: [],
  contactName: "",
  contactEmail: "",
  contactPhone: "",
  contactWhatsapp: "",
  preferredContact: "email",
  company: "",
  sourcingType: "both",
  additionalNotes: "",
};

export function QuoteWizard() {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<QuoteWizardInput>(INITIAL);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<{ quoteNumber: string } | null>(null);
  const [isPending, startTransition] = useTransition();

  function update<K extends keyof QuoteWizardInput>(key: K, value: QuoteWizardInput[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function toggleService(s: string) {
    setForm((prev) => ({
      ...prev,
      requestedServices: prev.requestedServices.includes(s)
        ? prev.requestedServices.filter((x) => x !== s)
        : [...prev.requestedServices, s],
    }));
  }

  function handleSubmit() {
    setError(null);
    startTransition(async () => {
      const res = await submitQuoteRequest(form);
      if (res.success) setResult({ quoteNumber: res.quoteNumber });
      else setError(res.error);
    });
  }

  if (result) {
    return (
      <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-10 text-center">
        <CheckCircle2 className="mx-auto h-12 w-12 text-emerald-500" />
        <h3 className="mt-4 text-xl font-bold text-foreground">Quote request submitted!</h3>
        <p className="mt-2 font-mono text-accent-text">{result.quoteNumber}</p>
        <p className="mt-2 text-muted">We&apos;ll respond within 24 hours with a formal quotation.</p>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8 flex flex-wrap gap-2">
        {STEPS.map((label, i) => (
          <button
            key={label}
            type="button"
            onClick={() => i < step && setStep(i)}
            className={cn(
              "rounded-full px-3 py-1 text-xs font-medium transition",
              i === step ? "bg-accent-soft text-accent-text" : i < step ? "bg-surface text-muted" : "text-muted/50",
            )}
          >
            {i + 1}. {label}
          </button>
        ))}
      </div>

      {error && (
        <div className="mb-4 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-600 dark:text-red-300">{error}</div>
      )}

      {step === 0 && (
        <div className="grid gap-4 sm:grid-cols-2">
          <Input id="originCity" label="Origin city *" value={form.originCity} onChange={(e) => update("originCity", e.target.value)} placeholder="Guangzhou" required />
          <Select id="destinationCountry" label="Destination country *" value={form.destinationCountry} onChange={(e) => update("destinationCountry", e.target.value)} required>
            <option value="">Select destination</option>
            {SHIPPING_ROUTES.map((r) => <option key={r.id} value={r.destination}>{r.flag} {r.destination}</option>)}
            <option value="Other">Other</option>
          </Select>
          <Input id="destinationCity" label="Destination city" value={form.destinationCity} onChange={(e) => update("destinationCity", e.target.value)} />
          <Input id="destinationPostal" label="Postal code" value={form.destinationPostal} onChange={(e) => update("destinationPostal", e.target.value)} />
          <label className="flex items-center gap-2 text-sm text-foreground"><input type="checkbox" checked={form.pickupRequired} onChange={(e) => update("pickupRequired", e.target.checked)} /> Supplier pickup required</label>
          <label className="flex items-center gap-2 text-sm text-foreground"><input type="checkbox" checked={form.doorDeliveryRequired} onChange={(e) => update("doorDeliveryRequired", e.target.checked)} /> Door delivery required</label>
        </div>
      )}

      {step === 1 && (
        <div className="grid gap-3 sm:grid-cols-2">
          {FREIGHT_METHODS.map((m) => (
            <label key={m.value} className={cn("cursor-pointer rounded-xl border p-4 transition", form.freightMethod === m.value ? "border-amber-500/50 bg-accent-soft" : "border-border")}>
              <input type="radio" name="freight" value={m.value} checked={form.freightMethod === m.value} onChange={() => update("freightMethod", m.value as QuoteWizardInput["freightMethod"])} className="sr-only" />
              <span className="text-sm font-medium text-foreground">{m.label}</span>
            </label>
          ))}
        </div>
      )}

      {step === 2 && (
        <div className="space-y-4">
          <Select id="cargoCategory" label="Cargo category" value={form.cargoCategory} onChange={(e) => update("cargoCategory", e.target.value)}>
            <option value="">Select category</option>
            {PRODUCT_CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
          </Select>
          <Textarea id="itemDescription" label="Item description *" required rows={3} value={form.itemDescription} onChange={(e) => update("itemDescription", e.target.value)} />
          <div className="grid gap-4 sm:grid-cols-3">
            <Input id="packageCount" label="Packages" type="number" min={1} value={form.packageCount} onChange={(e) => update("packageCount", Number(e.target.value))} />
            <Input id="actualWeight" label="Weight (kg) *" type="number" step="0.1" value={form.actualWeight || ""} onChange={(e) => update("actualWeight", Number(e.target.value))} />
            <Input id="declaredValue" label="Declared value" type="number" value={form.declaredValue ?? ""} onChange={(e) => update("declaredValue", Number(e.target.value))} />
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            <Input id="lengthCm" label="Length (cm)" type="number" value={form.lengthCm ?? ""} onChange={(e) => update("lengthCm", Number(e.target.value))} />
            <Input id="widthCm" label="Width (cm)" type="number" value={form.widthCm ?? ""} onChange={(e) => update("widthCm", Number(e.target.value))} />
            <Input id="heightCm" label="Height (cm)" type="number" value={form.heightCm ?? ""} onChange={(e) => update("heightCm", Number(e.target.value))} />
          </div>
          <div className="flex flex-wrap gap-3">
            {(["fragile", "batteries", "liquids", "hazardous"] as const).map((flag) => (
              <label key={flag} className="flex items-center gap-2 text-sm text-muted">
                <input
                  type="checkbox"
                  checked={form.cargoFlags?.[flag] ?? false}
                  onChange={(e) =>
                    update("cargoFlags", {
                      batteries: false,
                      liquids: false,
                      magnets: false,
                      food: false,
                      cosmetics: false,
                      branded: false,
                      hazardous: false,
                      fragile: false,
                      ...form.cargoFlags,
                      [flag]: e.target.checked,
                    })
                  }
                />
                {flag.charAt(0).toUpperCase() + flag.slice(1)}
              </label>
            ))}
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="grid gap-4 sm:grid-cols-2">
          <Input id="supplierName" label="Supplier name" value={form.supplierName} onChange={(e) => update("supplierName", e.target.value)} />
          <Input id="supplierContact" label="Supplier contact" value={form.supplierContact} onChange={(e) => update("supplierContact", e.target.value)} />
          <Input id="supplierPhone" label="Phone / WeChat" value={form.supplierPhone} onChange={(e) => update("supplierPhone", e.target.value)} />
          <Input id="cargoReadyDate" label="Cargo-ready date" type="date" value={form.cargoReadyDate} onChange={(e) => update("cargoReadyDate", e.target.value)} />
          <div className="sm:col-span-2">
            <Textarea id="supplierAddress" label="Supplier address" rows={2} value={form.supplierAddress} onChange={(e) => update("supplierAddress", e.target.value)} />
          </div>
          <div className="sm:col-span-2">
            <Textarea id="pickupInstructions" label="Pickup instructions" rows={2} value={form.pickupInstructions} onChange={(e) => update("pickupInstructions", e.target.value)} />
          </div>
        </div>
      )}

      {step === 4 && (
        <div className="flex flex-wrap gap-3">
          {SERVICE_OPTIONS.map((s) => (
            <label key={s} className={cn("cursor-pointer rounded-xl border px-4 py-2 text-sm transition", form.requestedServices.includes(s) ? "border-amber-500/50 bg-accent-soft text-accent-text" : "border-border text-muted")}>
              <input type="checkbox" checked={form.requestedServices.includes(s)} onChange={() => toggleService(s)} className="sr-only" />
              {s}
            </label>
          ))}
        </div>
      )}

      {step === 5 && (
        <div className="grid gap-4 sm:grid-cols-2">
          <Input id="contactName" label="Your name *" required value={form.contactName} onChange={(e) => update("contactName", e.target.value)} />
          <Input id="contactEmail" label="Email *" type="email" required value={form.contactEmail} onChange={(e) => update("contactEmail", e.target.value)} />
          <Input id="contactPhone" label="Phone" value={form.contactPhone} onChange={(e) => update("contactPhone", e.target.value)} />
          <Input id="company" label="Company" value={form.company} onChange={(e) => update("company", e.target.value)} />
          <div className="sm:col-span-2">
            <p className="mb-2 text-sm font-medium text-foreground">What do you need?</p>
            <div className="flex flex-wrap gap-3">
              {(["sourcing", "shipping", "both"] as const).map((t) => (
                <label key={t} className={cn("cursor-pointer rounded-xl border px-4 py-2 text-sm", form.sourcingType === t ? "border-amber-500/50 bg-accent-soft text-accent-text" : "border-border text-muted")}>
                  <input type="radio" name="sourcingType" checked={form.sourcingType === t} onChange={() => update("sourcingType", t)} className="sr-only" />
                  {t === "both" ? "Sourcing + Shipping" : t.charAt(0).toUpperCase() + t.slice(1)}
                </label>
              ))}
            </div>
          </div>
          <div className="sm:col-span-2">
            <Textarea id="additionalNotes" label="Additional notes" rows={3} value={form.additionalNotes} onChange={(e) => update("additionalNotes", e.target.value)} />
          </div>
        </div>
      )}

      {step === 6 && (
        <div className="space-y-3 text-sm">
          <p><span className="text-muted">Route:</span> <span className="text-foreground">{form.originCity}, {form.originCountry} → {form.destinationCountry}</span></p>
          <p><span className="text-muted">Freight:</span> <span className="text-foreground">{form.freightMethod}</span></p>
          <p><span className="text-muted">Cargo:</span> <span className="text-foreground">{form.itemDescription} ({form.actualWeight} kg)</span></p>
          <p><span className="text-muted">Contact:</span> <span className="text-foreground">{form.contactName} · {form.contactEmail}</span></p>
          {form.requestedServices.length > 0 && (
            <p><span className="text-muted">Services:</span> <span className="text-foreground">{form.requestedServices.join(", ")}</span></p>
          )}
          <p className="mt-4 rounded-lg bg-surface p-3 text-xs text-muted">
            By submitting, you confirm the cargo details are accurate. Final pricing will be provided after review.
          </p>
        </div>
      )}

      <div className="mt-8 flex justify-between">
        <Button type="button" variant="secondary" disabled={step === 0} onClick={() => setStep((s) => s - 1)}>
          <ChevronLeft className="h-4 w-4" /> Back
        </Button>
        {step < STEPS.length - 1 ? (
          <Button type="button" onClick={() => setStep((s) => s + 1)}>
            Next <ChevronRight className="h-4 w-4" />
          </Button>
        ) : (
          <Button type="button" disabled={isPending} onClick={handleSubmit}>
            {isPending ? <><Loader2 className="h-4 w-4 animate-spin" /> Submitting...</> : "Submit Quote Request"}
          </Button>
        )}
      </div>
    </div>
  );
}
