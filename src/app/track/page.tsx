import type { Metadata } from "next";
import { TrackingForm } from "@/components/track/tracking-form";
import { PageShell } from "@/components/layout/page-shell";
import { Card, CardContent } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Track Shipment",
  description: "Track your KWAYEB LOGISTICS shipment from China to your destination in real time.",
};

export default async function TrackPage({
  searchParams,
}: {
  searchParams: Promise<{ id?: string }>;
}) {
  const { id } = await searchParams;

  return (
    <PageShell
      title="Track Your Shipment"
      description="Enter your tracking ID to see the latest status of your shipment from China to your destination."
    >
      <Card>
        <CardContent className="p-6 sm:p-8">
          <TrackingForm initialTrackingId={id ?? ""} />
        </CardContent>
      </Card>
    </PageShell>
  );
}
