import { DashboardPageHeader } from "@/components/dashboard/dashboard-page-header";
import { QuoteWizard } from "@/components/quote/quote-wizard";
import { getUserProfile } from "@/lib/supabase/server-auth";
import { Card, CardContent } from "@/components/ui/card";

export default async function DashboardNewQuotePage() {
  const profile = await getUserProfile();

  return (
    <div className="space-y-4 sm:space-y-6">
      <DashboardPageHeader
        eyebrow="Quotes"
        title="New quote request"
        description="Tell us your route, cargo details, and services needed. Our team responds within 24 hours."
      />
      <Card>
        <CardContent className="p-4 sm:p-6 lg:p-8">
          <QuoteWizard
            prefillContact={{
              fullName: profile?.full_name ?? undefined,
              email: profile?.email ?? undefined,
              company: profile?.company ?? undefined,
            }}
            quotesListHref="/dashboard/quotes"
          />
        </CardContent>
      </Card>
    </div>
  );
}
