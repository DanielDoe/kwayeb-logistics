import { AdminShell } from "@/components/admin/admin-shell";
import { createAdminClient } from "@/lib/supabase/server";

export default async function AdminShipmentsPage() {
  const supabase = createAdminClient();
  const { data: shipments } = await supabase
    .from("kwayeb_shipments")
    .select("id, tracking_id, status, destination, destination_country, freight_type, customer_name, created_at")
    .order("created_at", { ascending: false })
    .limit(50);

  return (
    <AdminShell>
      <h1 className="text-2xl font-bold text-foreground">Shipments</h1>
      <p className="mt-1 text-muted">Manage shipment tracking and milestones.</p>

      {!shipments?.length ? (
        <p className="mt-8 text-muted">No shipments yet.</p>
      ) : (
        <div className="mt-8 overflow-x-auto rounded-xl border border-border">
          <table className="w-full text-sm">
            <thead className="border-b border-border bg-surface">
              <tr>
                <th className="px-4 py-3 text-left text-muted">Tracking ID</th>
                <th className="px-4 py-3 text-left text-muted">Customer</th>
                <th className="px-4 py-3 text-left text-muted">Destination</th>
                <th className="px-4 py-3 text-left text-muted">Status</th>
              </tr>
            </thead>
            <tbody>
              {shipments.map((s) => (
                <tr key={s.id} className="border-b border-border">
                  <td className="px-4 py-3 font-mono text-accent-text">{s.tracking_id}</td>
                  <td className="px-4 py-3 text-foreground">{s.customer_name ?? "—"}</td>
                  <td className="px-4 py-3 text-muted">{s.destination}</td>
                  <td className="px-4 py-3 text-muted">{s.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </AdminShell>
  );
}
