import type { Metadata } from "next";
import { QuoteWizard } from "@/components/quote/quote-wizard";
import { PageShell } from "@/components/layout/page-shell";
import { Card, CardContent } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Source & Quote",
  description: "Request a freight quote or product sourcing from China. Multi-step quote wizard.",
};

export default function SourcePage() {
  return (
    <PageShell
      title="Request a Freight Quote"
      description="Tell us your route, cargo details, and services needed. Our team responds within 24 hours."
    >
      <Card>
        <CardContent className="p-6 sm:p-8">
          <QuoteWizard />
        </CardContent>
      </Card>
    </PageShell>
  );
}
