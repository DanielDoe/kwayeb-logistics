import type { Metadata } from "next";
import { FAQ_ITEMS } from "@/lib/constants/logistics";
import { PageShell } from "@/components/layout/page-shell";
import { Card, CardContent } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "FAQ",
  description: "Frequently asked questions about shipping from China with Kwayeb Logistics.",
};

export default function FaqPage() {
  return (
    <PageShell title="FAQ" description="Common questions about shipping, quotes, and tracking.">
      <div className="space-y-4">
        {FAQ_ITEMS.map((item) => (
          <Card key={item.q}>
            <CardContent className="p-5">
              <h2 className="font-semibold text-foreground">{item.q}</h2>
              <p className="mt-2 text-sm leading-relaxed text-muted">{item.a}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </PageShell>
  );
}
