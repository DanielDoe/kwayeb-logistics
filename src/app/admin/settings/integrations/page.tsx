import { AdminDataTable, AdminStatusBadge } from "@/components/admin/admin-data-table";
import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { ADMIN_INTEGRATIONS } from "@/lib/admin/admin-catalog-data";

export default function AdminIntegrationsPage() {
  return (
    <>
      <AdminPageHeader eyebrow="System" title="Integrations" description="Third-party services connected to Kwayeb." />
      <AdminDataTable
        rows={ADMIN_INTEGRATIONS}
        getRowKey={(r) => r.id}
        columns={[
          { key: "name", header: "Service", render: (r) => r.name },
          { key: "category", header: "Category", render: (r) => r.category },
          {
            key: "status",
            header: "Status",
            render: (r) => (
              <AdminStatusBadge label={r.status} tone={r.status === "Connected" ? "success" : "warning"} />
            ),
          },
        ]}
      />
    </>
  );
}
