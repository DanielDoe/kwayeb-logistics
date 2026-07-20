import type { Metadata } from "next";
import Link from "next/link";
import { CreditCard, ArrowRight } from "lucide-react";
import { PageShell } from "@/components/layout/page-shell";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = {
  title: "Payments",
  description: "Secure payment options for KWAYEB LOGISTICS sourcing and shipping services.",
};

const PAYMENT_METHODS = [
  "Bank transfer (international wire)",
  "Mobile money (Ghana & Africa)",
  "PayPal & card payments",
  "Escrow for large orders",
];

export default function PaymentsPage() {
  return (
    <PageShell
      title="Secure Payments"
      description="We're building a secure payment portal so you can pay for sourcing and shipping directly online."
    >
      <Card className="overflow-hidden">
        <CardContent className="p-8 text-center sm:p-12">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-2xl bg-accent-soft ring-1 ring-amber-500/20">
            <CreditCard className="h-10 w-10 text-accent-text" />
          </div>

          <Badge variant="amber" className="mt-6">Coming Soon</Badge>

          <p className="mx-auto mt-4 max-w-lg text-muted">
            For now, our team will share payment instructions when you receive your quote.
          </p>

          <div className="mt-8 grid gap-3 text-left sm:grid-cols-2">
            {PAYMENT_METHODS.map((method) => (
              <div
                key={method}
                className="flex items-center gap-3 rounded-xl border border-border bg-surface p-4"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />
                <span className="text-sm text-foreground">{method}</span>
              </div>
            ))}
          </div>

          <Link href="/source" className="mt-8 inline-block">
            <Button size="lg" className="group gap-2">
              Get a Quote First
              <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
            </Button>
          </Link>
        </CardContent>
      </Card>
    </PageShell>
  );
}
