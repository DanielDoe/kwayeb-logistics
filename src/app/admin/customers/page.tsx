import { AdminShell } from "@/components/admin/admin-shell";
import { Card, CardContent } from "@/components/ui/card";

export default function AdminCustomersPage() {
  return (
    <AdminShell>
      <h1 className="text-2xl font-bold text-foreground">Customers</h1>
      <p className="mt-1 text-muted">View registered customer accounts.</p>
      <Card className="mt-8"><CardContent className="p-6 text-muted">Customer management coming in the next phase.</CardContent></Card>
    </AdminShell>
  );
}
