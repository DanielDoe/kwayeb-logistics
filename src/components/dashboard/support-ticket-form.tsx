"use client";

import { useActionState } from "react";
import { submitDashboardSupportTicket } from "@/lib/actions/support";
import { Button } from "@/components/ui/button";

const CATEGORIES = [
  { value: "tracking", label: "Shipment tracking" },
  { value: "quotation", label: "Quotation" },
  { value: "payment", label: "Payment & invoices" },
  { value: "warehouse", label: "Warehouse" },
  { value: "customs", label: "Customs" },
  { value: "delivery", label: "Delivery" },
  { value: "account", label: "Account" },
  { value: "general", label: "General" },
] as const;

const initialState = { success: false, error: "", ticketNumber: "" };

export function SupportTicketForm() {
  const [state, action, pending] = useActionState(
    async (_prev: typeof initialState, formData: FormData) => {
      const result = await submitDashboardSupportTicket({
        category: formData.get("category") as (typeof CATEGORIES)[number]["value"],
        subject: String(formData.get("subject") ?? ""),
        message: String(formData.get("message") ?? ""),
      });

      if (!result.success) {
        return { success: false, error: result.error, ticketNumber: "" };
      }

      return {
        success: true,
        error: "",
        ticketNumber: result.ticketNumber ?? "",
      };
    },
    initialState,
  );

  if (state.success) {
    return (
      <div className="rounded-lg border border-emerald-500/25 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-800 dark:text-emerald-200">
        Ticket <span className="font-mono font-semibold">{state.ticketNumber}</span> created.
        Our team will respond by email shortly.
      </div>
    );
  }

  return (
    <form action={action} className="space-y-4">
      <div>
        <label htmlFor="category" className="text-sm font-medium text-foreground">
          Category
        </label>
        <select
          id="category"
          name="category"
          defaultValue="general"
          className="mt-1.5 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground"
        >
          {CATEGORIES.map((cat) => (
            <option key={cat.value} value={cat.value}>
              {cat.label}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="subject" className="text-sm font-medium text-foreground">
          Subject
        </label>
        <input
          id="subject"
          name="subject"
          required
          minLength={3}
          placeholder="Brief summary of your issue"
          className="mt-1.5 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground"
        />
      </div>
      <div>
        <label htmlFor="message" className="text-sm font-medium text-foreground">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          required
          minLength={10}
          rows={4}
          placeholder="Describe your question or issue in detail..."
          className="mt-1.5 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground"
        />
      </div>
      {state.error ? <p className="text-sm text-red-600">{state.error}</p> : null}
      <Button type="submit" size="sm" disabled={pending}>
        {pending ? "Submitting..." : "Submit ticket"}
      </Button>
    </form>
  );
}
