import { AdminDataTable, AdminStatusBadge } from "@/components/admin/admin-data-table";
import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { ADMIN_STATEMENTS } from "@/lib/admin/admin-catalog-data";

export default function AdminStatementsPage() {
  return (
    <>
      <AdminPageHeader />
      <AdminDataTable
        rows={ADMIN_STATEMENTS}
        getRowKey={(row) => row.id}
        columns={[
          { key: "customer", header: "Customer", render: (r) => r.customer },
          { key: "period", header: "Period", render: (r) => r.period },
          { key: "balance", header: "Balance", render: (r) => `$${r.balance.toLocaleString()}` },
          {
            key: "status",
            header: "Status",
            render: (r) => (
              <AdminStatusBadge label={r.status} tone={r.status === "Paid" ? "success" : "default"} />
            ),
          },
        ]}
      />
    </>
  );
}
