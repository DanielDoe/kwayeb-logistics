import { AdminDataTable, AdminStatusBadge } from "@/components/admin/admin-data-table";
import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { ADMIN_RECEIPTS } from "@/lib/admin/admin-catalog-data";

export default function AdminReceiptsPage() {
  return (
    <>
      <AdminPageHeader
        eyebrow="Warehouse"
        title="Receipts"
        description="Cargo received into warehouse with inspection records."
      />
      <AdminDataTable
        rows={ADMIN_RECEIPTS}
        getRowKey={(row) => row.id}
        columns={[
          { key: "package", header: "Package ID", render: (r) => <span className="font-mono text-xs font-medium">{r.packageId}</span> },
          { key: "shipment", header: "Shipment", render: (r) => r.shipment },
          { key: "received", header: "Received", render: (r) => r.receivedAt },
          { key: "staff", header: "Staff", render: (r) => r.staff },
          {
            key: "condition",
            header: "Condition",
            render: (r) => (
              <AdminStatusBadge label={r.condition} tone={r.condition === "Good" ? "success" : "danger"} />
            ),
          },
        ]}
      />
    </>
  );
}
