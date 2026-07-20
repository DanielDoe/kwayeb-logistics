import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function SupportPage() {
  return (
    <DashboardShell>
      <h1 className="text-2xl font-bold text-foreground">Support</h1>
      <p className="mt-1 text-muted">Get help with shipments, quotes, and payments.</p>
      <Card className="mt-8">
        <CardContent className="p-6">
          <p className="text-muted">Open a support ticket or contact our team.</p>
          <Link href="/contact" className="mt-4 inline-block">
            <Button size="sm">Contact Support</Button>
          </Link>
        </CardContent>
      </Card>
    </DashboardShell>
  );
}
