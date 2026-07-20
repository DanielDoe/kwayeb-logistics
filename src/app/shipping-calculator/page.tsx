import type { Metadata } from "next";
import { PageShell } from "@/components/layout/page-shell";
import { ShippingEstimator } from "@/components/calculator/shipping-estimator";
import { Card, CardContent } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Shipping Calculator",
  description: "Estimate shipping costs from China. Get an initial freight estimate before requesting a formal quote.",
};

export default function ShippingCalculatorPage() {
  return (
    <PageShell
      title="Shipping Cost Estimator"
      description="Get an initial estimate for air, sea, express, FCL, or LCL freight from China."
    >
      <Card>
        <CardContent className="p-6 sm:p-8">
          <ShippingEstimator />
        </CardContent>
      </Card>
    </PageShell>
  );
}
