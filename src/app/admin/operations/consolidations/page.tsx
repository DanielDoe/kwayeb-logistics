import { AdminDataTable, AdminStatusBadge } from "@/components/admin/admin-data-table";
import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { ADMIN_CONSOLIDATIONS } from "@/lib/admin/admin-catalog-data";

export default function AdminConsolidationsPage() {
  return (
    <>
      <AdminPageHeader />
      <AdminDataTable
        rows={ADMIN_CONSOLIDATIONS}
        getRowKey={(row) => row.id}
        columns={[
          { key: "ref", header: "Reference", render: (r) => <span className="font-mono text-xs font-medium">{r.reference}</span> },
          { key: "destination", header: "Destination", render: (r) => r.destination },
          { key: "packages", header: "Packages", render: (r) => r.packages },
          { key: "weight", header: "Weight", render: (r) => `${r.weightKg} kg` },
          {
            key: "status",
            header: "Status",
            render: (r) => (
              <AdminStatusBadge
                label={r.status}
                tone={r.status === "Ready" ? "success" : r.status === "Loading" ? "warning" : "default"}
              />
            ),
          },
        ]}
      />
    </>
  );
}
