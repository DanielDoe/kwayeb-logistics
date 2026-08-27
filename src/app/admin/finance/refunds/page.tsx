import { AdminDataTable, AdminStatusBadge } from "@/components/admin/admin-data-table";
import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { ADMIN_REFUNDS } from "@/lib/admin/admin-catalog-data";

export default function AdminRefundsPage() {
  return (
    <>
      <AdminPageHeader />
      <AdminDataTable
        rows={ADMIN_REFUNDS}
        getRowKey={(row) => row.id}
        columns={[
          { key: "ref", header: "Reference", render: (r) => <span className="font-mono text-xs font-medium">{r.reference}</span> },
          { key: "customer", header: "Customer", render: (r) => r.customer },
          { key: "invoice", header: "Invoice", render: (r) => r.invoice },
          { key: "amount", header: "Amount", render: (r) => `$${r.amount}` },
          {
            key: "status",
            header: "Status",
            render: (r) => (
              <AdminStatusBadge label={r.status} tone={r.status === "Approved" ? "success" : "warning"} />
            ),
          },
        ]}
      />
    </>
  );
}
