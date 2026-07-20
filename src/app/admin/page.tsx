import { AdminShell } from "@/components/admin/admin-shell";
import { getAdminStats } from "@/lib/actions/support";
import { Card, CardContent } from "@/components/ui/card";

export default async function AdminPage() {
  const stats = await getAdminStats();

  return (
    <AdminShell>
      <h1 className="text-2xl font-bold text-foreground">Operations Dashboard</h1>
      <p className="mt-1 text-muted">Manage quotes, shipments, and customer support.</p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { label: "New quote requests", value: stats.newQuotes },
          { label: "Active shipments", value: stats.activeShipments },
          { label: "Open support tickets", value: stats.openTickets },
          { label: "Unpaid invoices", value: stats.unpaidInvoices },
        ].map((s) => (
          <Card key={s.label}>
            <CardContent className="p-5">
              <p className="text-2xl font-bold text-foreground">{s.value}</p>
              <p className="text-sm text-muted">{s.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </AdminShell>
  );
}
