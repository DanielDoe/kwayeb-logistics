import { AdminShell } from "@/components/admin/admin-shell";
import { createAdminClient } from "@/lib/supabase/server";

export default async function AdminQuotesPage() {
  const supabase = createAdminClient();
  const { data: quotes } = await supabase
    .from("kwayeb_quote_requests")
    .select("id, quote_number, contact_name, contact_email, destination_country, freight_method, status, created_at")
    .order("created_at", { ascending: false })
    .limit(50);

  return (
    <AdminShell>
      <h1 className="text-2xl font-bold text-foreground">Quote Requests</h1>
      <p className="mt-1 text-muted">Review and respond to customer quote requests.</p>

      {!quotes?.length ? (
        <p className="mt-8 text-muted">No quote requests yet.</p>
      ) : (
        <div className="mt-8 overflow-x-auto rounded-xl border border-border">
          <table className="w-full text-sm">
            <thead className="border-b border-border bg-surface">
              <tr>
                <th className="px-4 py-3 text-left text-muted">Quote #</th>
                <th className="px-4 py-3 text-left text-muted">Customer</th>
                <th className="px-4 py-3 text-left text-muted">Destination</th>
                <th className="px-4 py-3 text-left text-muted">Status</th>
              </tr>
            </thead>
            <tbody>
              {quotes.map((q) => (
                <tr key={q.id} className="border-b border-border">
                  <td className="px-4 py-3 font-mono text-accent-text">{q.quote_number}</td>
                  <td className="px-4 py-3 text-foreground">{q.contact_name}<br /><span className="text-xs text-muted">{q.contact_email}</span></td>
                  <td className="px-4 py-3 text-muted">{q.destination_country}</td>
                  <td className="px-4 py-3 text-muted">{q.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </AdminShell>
  );
}
