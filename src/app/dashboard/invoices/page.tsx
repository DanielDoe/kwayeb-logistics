import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { Card, CardContent } from "@/components/ui/card";

export default function InvoicesPage() {
  return (
    <DashboardShell>
      <h1 className="text-2xl font-bold text-foreground">Invoices</h1>
      <p className="mt-1 text-muted">View and pay your shipping invoices.</p>
      <Card className="mt-8">
        <CardContent className="p-6 text-center text-muted">
          No invoices yet. Invoices will appear here once a quote is accepted and billing is issued.
        </CardContent>
      </Card>
    </DashboardShell>
  );
}
