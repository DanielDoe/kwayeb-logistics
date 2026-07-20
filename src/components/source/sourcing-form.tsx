"use client";

import { useState } from "react";
import { PRODUCT_CATEGORIES, SHIPPING_ROUTES } from "@/lib/constants";

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
  const [isSubmitting, setIsSubmitting] = useState(false);

  function update(field: keyof FormData, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setSubmitted(true);
      setIsSubmitting(false);
    }, 1000);
  }

  if (submitted) {
    return (
      <div className="rounded-2xl border border-green-200 bg-green-50 p-8 text-center dark:border-green-900 dark:bg-green-950">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/30">
          <svg className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="mt-4 text-xl font-bold text-navy-950 dark:text-white">
          Request received!
        </h3>
        <p className="mt-2 text-slate-600 dark:text-slate-400">
          Thank you, {form.fullName}. Our team will review your request and
          respond within 24 hours with a quote and next steps.
        </p>
        <button
          type="button"
          onClick={() => {
            setSubmitted(false);
            setForm(INITIAL);
          }}
          className="mt-6 text-sm font-medium text-gold-600 hover:text-gold-500"
        >
          Submit another request
        </button>
      </div>
    );
  }

  const inputClass =
    "w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-navy-950 placeholder:text-slate-400 focus:border-gold-500 focus:outline-none focus:ring-2 focus:ring-gold-500/20 dark:border-white/20 dark:bg-navy-900 dark:text-white";
  const labelClass = "mb-1.5 block text-sm font-medium text-navy-950 dark:text-slate-200";

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="fullName" className={labelClass}>Full Name *</label>
          <input id="fullName" required value={form.fullName} onChange={(e) => update("fullName", e.target.value)} className={inputClass} />
        </div>
        <div>
          <label htmlFor="email" className={labelClass}>Email *</label>
          <input id="email" type="email" required value={form.email} onChange={(e) => update("email", e.target.value)} className={inputClass} />
        </div>
        <div>
          <label htmlFor="phone" className={labelClass}>Phone / WhatsApp</label>
          <input id="phone" type="tel" value={form.phone} onChange={(e) => update("phone", e.target.value)} className={inputClass} />
        </div>
        <div>
          <label htmlFor="country" className={labelClass}>Destination Country *</label>
          <select id="country" required value={form.country} onChange={(e) => update("country", e.target.value)} className={inputClass}>
            <option value="">Select destination</option>
            {SHIPPING_ROUTES.map((r) => (
              <option key={r.id} value={r.destination}>{r.flag} {r.destination}</option>
            ))}
            <option value="Other">Other country</option>
          </select>
        </div>
      </div>

      <div>
        <label className={labelClass}>What do you need? *</label>
        <div className="mt-2 flex flex-wrap gap-3">
          {([
            { value: "sourcing", label: "Product Sourcing Only" },
            { value: "shipping", label: "Shipping Only" },
            { value: "both", label: "Sourcing + Shipping" },
          ] as const).map((opt) => (
            <label
              key={opt.value}
              className={`cursor-pointer rounded-lg border px-4 py-2.5 text-sm font-medium transition ${
                form.requestType === opt.value
                  ? "border-gold-500 bg-gold-500/10 text-gold-700 dark:text-gold-400"
                  : "border-slate-300 text-slate-600 hover:border-slate-400 dark:border-white/20 dark:text-slate-400"
              }`}
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
        <div>
          <label htmlFor="category" className={labelClass}>Product Category</label>
          <select id="category" value={form.category} onChange={(e) => update("category", e.target.value)} className={inputClass}>
            <option value="">Select category</option>
            {PRODUCT_CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="quantity" className={labelClass}>Estimated Quantity</label>
          <input id="quantity" placeholder="e.g. 500 units" value={form.quantity} onChange={(e) => update("quantity", e.target.value)} className={inputClass} />
        </div>
      </div>

      <div>
        <label htmlFor="productDescription" className={labelClass}>
          Describe what you need *{" "}
          <span className="font-normal text-slate-500">(product name, specs, links, photos if available)</span>
        </label>
        <textarea
          id="productDescription"
          required
          rows={4}
          value={form.productDescription}
          onChange={(e) => update("productDescription", e.target.value)}
          className={inputClass}
          placeholder="Tell us exactly what you're looking for. Include product links from Alibaba, 1688, or describe your requirements..."
        />
      </div>

      <div>
        <label htmlFor="budget" className={labelClass}>Budget Range (optional)</label>
        <input id="budget" placeholder="e.g. $2,000 - $5,000 USD" value={form.budget} onChange={(e) => update("budget", e.target.value)} className={inputClass} />
      </div>

      <div>
        <label htmlFor="additionalNotes" className={labelClass}>Additional Notes</label>
        <textarea
          id="additionalNotes"
          rows={3}
          value={form.additionalNotes}
          onChange={(e) => update("additionalNotes", e.target.value)}
          className={inputClass}
          placeholder="Delivery timeline, special requirements, preferred shipping method..."
        />
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full rounded-lg bg-gold-500 py-3.5 text-base font-semibold text-navy-950 transition hover:bg-gold-400 disabled:opacity-60 sm:w-auto sm:px-12"
      >
        {isSubmitting ? "Submitting..." : "Submit Request"}
      </button>
    </form>
  );
}
