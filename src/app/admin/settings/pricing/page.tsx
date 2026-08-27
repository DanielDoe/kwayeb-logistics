import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { BASE_RATES_USD } from "@/lib/constants/logistics";

export default function AdminPricingPage() {
  const rates = Object.entries(BASE_RATES_USD);

  return (
    <>
      <AdminPageHeader
        eyebrow="Configuration"
        title="Pricing"
        description="Base freight rates used for estimates and quote preparation."
      />
      <div className="grid gap-4 sm:grid-cols-2">
        {rates.map(([method, rate]) => (
          <div key={method} className="rounded-xl border border-border bg-card p-5 shadow-sm">
            <h2 className="font-semibold capitalize text-foreground">{method.replace(/_/g, " ")}</h2>
            <pre className="mt-3 overflow-x-auto rounded-lg bg-surface p-3 text-xs text-muted">
              {JSON.stringify(rate, null, 2)}
            </pre>
          </div>
        ))}
      </div>
    </>
  );
}
