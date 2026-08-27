import { DashboardPageHeader } from "@/components/dashboard/dashboard-page-header";
import { TrackingForm } from "@/components/track/tracking-form";
import { Card, CardContent } from "@/components/ui/card";

export default async function DashboardTrackPage({
  searchParams,
}: {
  searchParams: Promise<{ id?: string }>;
}) {
  const { id } = await searchParams;

  return (
    <div className="space-y-4 sm:space-y-6">
      <DashboardPageHeader
        eyebrow="Shipments"
        title="Track shipment"
        description="Enter your tracking ID to see the latest status of your shipment from China to your destination."
      />
      <Card>
        <CardContent className="p-4 sm:p-6 lg:p-8">
          <TrackingForm initialTrackingId={id ?? ""} />
        </CardContent>
      </Card>
    </div>
  );
}
