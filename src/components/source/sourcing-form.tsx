"use client";

import { useState, useTransition } from "react";
import { CheckCircle2, Loader2 } from "lucide-react";
import { PRODUCT_CATEGORIES, SHIPPING_ROUTES } from "@/lib/constants";
import { submitSourcingRequest } from "@/lib/actions/sourcing";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

type FormData = {
  fullName: string;
  email: string;
  phone: string;
  country: string;
  requestType: "sourcing" | "shipping" | "both";
  category: string;
  productDescription: string;
  quantity: string;
  budget: string;
  additionalNotes: string;
};

const INITIAL: FormData = {
  fullName: "",
  email: "",
  phone: "",
  country: "",
  requestType: "both",
  category: "",
  productDescription: "",
  quantity: "",
  budget: "",
  additionalNotes: "",
};

export function SourcingForm() {
  const [form, setForm] = useState<FormData>(INITIAL);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  function update(field: keyof FormData, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    startTransition(async () => {
      const result = await submitSourcingRequest(form);

      if (result.success) {
        setSubmitted(true);
      } else {
        setError(result.error);
      }
    });
  }

  if (submitted) {
    return (
      <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-10 text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/15">
          <CheckCircle2 className="h-8 w-8 text-emerald-400" />
        </div>
        <h3 className="mt-5 text-xl font-bold text-foreground">Request received!</h3>
        <p className="mt-2 text-muted">
          Thank you, {form.fullName}. Our team will review your request and respond
          within 24 hours with a quote and next steps.
        </p>
        <button
          type="button"
          onClick={() => {
            setSubmitted(false);
            setForm(INITIAL);
          }}
          className="mt-6 text-sm font-medium text-accent-text hover:text-amber-600 dark:hover:text-amber-300"
        >
          Submit another request
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-600 dark:text-red-300">
          {error}
        </div>
      )}

      <div className="grid gap-6 sm:grid-cols-2">
        <Input
          id="fullName"
          label="Full Name *"
          required
          value={form.fullName}
          onChange={(e) => update("fullName", e.target.value)}
        />
        <Input
          id="email"
          label="Email *"
          type="email"
          required
          value={form.email}
          onChange={(e) => update("email", e.target.value)}
        />
        <Input
          id="phone"
          label="Phone / WhatsApp"
          type="tel"
          value={form.phone}
          onChange={(e) => update("phone", e.target.value)}
        />
        <Select
          id="country"
          label="Destination Country *"
          required
          value={form.country}
          onChange={(e) => update("country", e.target.value)}
        >
          <option value="">Select destination</option>
          {SHIPPING_ROUTES.map((r) => (
            <option key={r.id} value={r.destination}>
              {r.flag} {r.destination}
            </option>
          ))}
          <option value="Other">Other country</option>
        </Select>
      </div>

      <div>
        <p className="mb-3 text-sm font-medium text-foreground">What do you need? *</p>
        <div className="flex flex-wrap gap-3">
          {([
            { value: "sourcing", label: "Product Sourcing" },
            { value: "shipping", label: "Shipping Only" },
            { value: "both", label: "Sourcing + Shipping" },
          ] as const).map((opt) => (
            <label
              key={opt.value}
              className={cn(
                "cursor-pointer rounded-xl border px-4 py-2.5 text-sm font-medium transition",
                form.requestType === opt.value
                  ? "border-amber-500/50 bg-accent-soft text-accent-text"
                  : "border-border text-muted hover:border-amber-500/30",
              )}
            >
              <input
                type="radio"
                name="requestType"
                value={opt.value}
                checked={form.requestType === opt.value}
                onChange={() => update("requestType", opt.value)}
                className="sr-only"
              />
              {opt.label}
            </label>
          ))}
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <Select
          id="category"
          label="Product Category"
          value={form.category}
          onChange={(e) => update("category", e.target.value)}
        >
          <option value="">Select category</option>
          {PRODUCT_CATEGORIES.map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </Select>
        <Input
          id="quantity"
          label="Estimated Quantity"
          placeholder="e.g. 500 units"
          value={form.quantity}
          onChange={(e) => update("quantity", e.target.value)}
        />
      </div>

      <Textarea
        id="productDescription"
        label="Describe what you need *"
        hint="(product name, specs, links)"
        required
        rows={4}
        value={form.productDescription}
        onChange={(e) => update("productDescription", e.target.value)}
        placeholder="Tell us exactly what you're looking for. Include Alibaba/1688 links or describe your requirements..."
      />

      <Input
        id="budget"
        label="Budget Range (optional)"
        placeholder="e.g. $2,000 - $5,000 USD"
        value={form.budget}
        onChange={(e) => update("budget", e.target.value)}
      />

      <Textarea
        id="additionalNotes"
        label="Additional Notes"
        rows={3}
        value={form.additionalNotes}
        onChange={(e) => update("additionalNotes", e.target.value)}
        placeholder="Delivery timeline, special requirements, preferred shipping method..."
      />

      <Button type="submit" disabled={isPending} className="w-full sm:w-auto sm:min-w-[200px]">
        {isPending ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Submitting...
          </>
        ) : (
          "Submit Request"
        )}
      </Button>
    </form>
  );
}
