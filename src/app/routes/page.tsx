import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { SHIPPING_ROUTES } from "@/lib/constants";
import { SectionHeader } from "@/components/ui/section-header";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Shipping Routes",
  description:
    "KWAYEB LOGISTICS shipping routes from China to Ghana, USA, UK, Australia, Germany, all of Europe, and Africa.",
};

export default function RoutesPage() {
  return (
    <div className="relative py-16 sm:py-24">
      <div className="glow-orb left-1/4 top-0 h-80 w-80 bg-[var(--glow-secondary)]" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Global network"
          title="Our Shipping Routes"
          description="We ship from China to destinations worldwide. Air freight for speed, sea freight for volume — we help you choose the best option."
        />

        <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {SHIPPING_ROUTES.map((route) => (
            <Card
              key={route.id}
              className="group transition hover:-translate-y-1 hover:border-amber-500/30 hover:shadow-lg dark:hover:shadow-amber-500/5"
            >
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <span className="text-4xl">{route.flag}</span>
                  <div>
                    <h2 className="text-xl font-bold text-foreground">
                      China → {route.destination}
                    </h2>
                    <p className="text-sm font-medium text-accent-text">{route.region}</p>
                  </div>
                </div>
                <p className="mt-4 text-sm leading-relaxed text-muted">
                  {route.description}
                </p>
                <ul className="mt-5 space-y-2">
                  {["Air & sea freight", "Customs documentation", "Real-time tracking"].map(
                    (item) => (
                      <li key={item} className="flex items-center gap-2 text-sm text-muted">
                        <Check className="h-3.5 w-3.5 text-amber-500" />
                        {item}
                      </li>
                    ),
                  )}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="mt-16 overflow-hidden border-amber-500/20 bg-gradient-to-br from-accent-soft to-transparent">
          <CardContent className="p-10 text-center sm:p-14">
            <h2 className="text-2xl font-bold text-foreground sm:text-3xl">
              Don&apos;t see your country?
            </h2>
            <p className="mx-auto mt-3 max-w-lg text-muted">
              We ship to many more destinations. Submit a request and we&apos;ll confirm
              availability and pricing for your location.
            </p>
            <Link href="/source" className="mt-8 inline-block">
              <Button size="lg" className="group gap-2">
                Request a Quote
                <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
