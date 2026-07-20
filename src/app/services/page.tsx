import type { Metadata } from "next";
import Link from "next/link";
import { LOGISTICS_SERVICES } from "@/lib/constants/logistics";
import { PageShell } from "@/components/layout/page-shell";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Services",
  description: "Air freight, sea freight, FCL, LCL, consolidation, warehousing, and door-to-door shipping from China.",
};

export default function ServicesPage() {
  return (
    <PageShell
      title="Our Services"
      description="Complete China logistics — from supplier pickup to door-to-door delivery worldwide."
    >
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {LOGISTICS_SERVICES.map((s) => (
          <Card key={s.slug}>
            <CardContent className="p-5">
              <h2 className="font-semibold text-foreground">{s.title}</h2>
              <p className="mt-2 text-sm text-muted">{s.desc}</p>
            </CardContent>
          </Card>
        ))}
      </div>
      <div className="mt-10 text-center">
        <Link href="/source"><Button>Request a Quote</Button></Link>
      </div>
    </PageShell>
  );
}
