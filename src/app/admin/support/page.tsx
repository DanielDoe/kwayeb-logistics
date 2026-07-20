import { AdminShell } from "@/components/admin/admin-shell";
import { createAdminClient } from "@/lib/supabase/server";

export default async function AdminSupportPage() {
  const supabase = createAdminClient();
  const { data: tickets } = await supabase
    .from("kwayeb_support_tickets")
    .select("id, ticket_number, subject, category, priority, status, contact_email, created_at")
    .order("created_at", { ascending: false })
    .limit(50);

  return (
    <AdminShell>
      <h1 className="text-2xl font-bold text-foreground">Support Tickets</h1>
      <p className="mt-1 text-muted">Manage customer support requests.</p>

      {!tickets?.length ? (
        <p className="mt-8 text-muted">No support tickets yet.</p>
      ) : (
        <div className="mt-8 overflow-x-auto rounded-xl border border-border">
          <table className="w-full text-sm">
            <thead className="border-b border-border bg-surface">
              <tr>
                <th className="px-4 py-3 text-left text-muted">Ticket #</th>
                <th className="px-4 py-3 text-left text-muted">Subject</th>
                <th className="px-4 py-3 text-left text-muted">Priority</th>
                <th className="px-4 py-3 text-left text-muted">Status</th>
              </tr>
            </thead>
            <tbody>
              {tickets.map((t) => (
                <tr key={t.id} className="border-b border-border">
                  <td className="px-4 py-3 font-mono text-accent-text">{t.ticket_number}</td>
                  <td className="px-4 py-3 text-foreground">{t.subject}</td>
                  <td className="px-4 py-3 text-muted">{t.priority}</td>
                  <td className="px-4 py-3 text-muted">{t.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </AdminShell>
  );
}
