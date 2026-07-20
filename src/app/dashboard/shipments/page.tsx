import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { getCustomerShipments } from "@/lib/actions/quotes";
import Link from "next/link";

export default async function ShipmentsPage() {
  const shipments = await getCustomerShipments();

  return (
    <DashboardShell>
      <h1 className="text-2xl font-bold text-foreground">Shipments</h1>
      <p className="mt-1 text-muted">View and track all your shipments.</p>

      {shipments.length === 0 ? (
        <p className="mt-8 text-muted">No shipments found. Submit a quote request to get started.</p>
      ) : (
        <div className="mt-8 overflow-x-auto rounded-xl border border-border">
          <table className="w-full text-sm">
            <thead className="border-b border-border bg-surface">
              <tr>
                <th className="px-4 py-3 text-left font-medium text-muted">Tracking ID</th>
                <th className="px-4 py-3 text-left font-medium text-muted">Destination</th>
                <th className="px-4 py-3 text-left font-medium text-muted">Status</th>
                <th className="px-4 py-3 text-left font-medium text-muted">Method</th>
              </tr>
            </thead>
            <tbody>
              {shipments.map((s) => (
                <tr key={s.id} className="border-b border-border">
                  <td className="px-4 py-3"><Link href="/track" className="font-mono text-accent-text hover:underline">{s.tracking_id}</Link></td>
                  <td className="px-4 py-3 text-foreground">{s.destination}</td>
                  <td className="px-4 py-3 text-muted">{s.status}</td>
                  <td className="px-4 py-3 text-muted">{s.freight_type ?? "—"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </DashboardShell>
  );
}
