import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { getCustomerQuotes } from "@/lib/actions/quotes";

export default async function QuotesPage() {
  const quotes = await getCustomerQuotes();

  return (
    <DashboardShell>
      <h1 className="text-2xl font-bold text-foreground">Quote Requests</h1>
      <p className="mt-1 text-muted">Track the status of your freight quotations.</p>

      {quotes.length === 0 ? (
        <p className="mt-8 text-muted">No quote requests yet.</p>
      ) : (
        <div className="mt-8 overflow-x-auto rounded-xl border border-border">
          <table className="w-full text-sm">
            <thead className="border-b border-border bg-surface">
              <tr>
                <th className="px-4 py-3 text-left font-medium text-muted">Quote #</th>
                <th className="px-4 py-3 text-left font-medium text-muted">Destination</th>
                <th className="px-4 py-3 text-left font-medium text-muted">Method</th>
                <th className="px-4 py-3 text-left font-medium text-muted">Status</th>
                <th className="px-4 py-3 text-left font-medium text-muted">Date</th>
              </tr>
            </thead>
            <tbody>
              {quotes.map((q) => (
                <tr key={q.id} className="border-b border-border">
                  <td className="px-4 py-3 font-mono text-accent-text">{q.quote_number}</td>
                  <td className="px-4 py-3 text-foreground">{q.destination_country}</td>
                  <td className="px-4 py-3 text-muted">{q.freight_method ?? "—"}</td>
                  <td className="px-4 py-3 text-muted">{q.status}</td>
                  <td className="px-4 py-3 text-muted">{new Date(q.created_at).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </DashboardShell>
  );
}
