import { fetchAdminSupportTickets } from "@/lib/actions/admin";
import { AdminDataTable, AdminStatusBadge } from "@/components/admin/admin-data-table";
import { AdminPageHeader } from "@/components/admin/admin-page-header";

export default async function AdminSupportTicketsPage() {
  const tickets = await fetchAdminSupportTickets();

  return (
    <>
      <AdminPageHeader />
      <AdminDataTable
        rows={tickets}
        getRowKey={(row) => row.id}
        columns={[
          { key: "ticket", header: "Ticket #", render: (r) => <span className="font-mono text-xs font-medium">{r.ticket_number}</span> },
          { key: "subject", header: "Subject", render: (r) => r.subject },
          { key: "category", header: "Category", render: (r) => r.category },
          {
            key: "priority",
            header: "Priority",
            render: (r) => (
              <AdminStatusBadge label={r.priority} tone={r.priority === "urgent" ? "danger" : "default"} />
            ),
          },
          {
            key: "status",
            header: "Status",
            render: (r) => (
              <AdminStatusBadge label={r.status} tone={r.status === "OPEN" ? "warning" : "success"} />
            ),
          },
        ]}
      />
    </>
  );
}
