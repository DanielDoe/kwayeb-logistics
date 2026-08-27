import { AdminDataTable, AdminStatusBadge } from "@/components/admin/admin-data-table";
import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { ADMIN_SERVICES } from "@/lib/admin/admin-catalog-data";

export default function AdminServicesPage() {
  return (
    <>
      <AdminPageHeader eyebrow="Configuration" title="Services" description="Freight and logistics services offered by Kwayeb." />
      <AdminDataTable
        rows={ADMIN_SERVICES}
        getRowKey={(r) => r.id}
        columns={[
          { key: "name", header: "Service", render: (r) => r.name },
          { key: "slug", header: "Slug", render: (r) => <span className="font-mono text-xs">{r.slug}</span> },
          { key: "rate", header: "Base Rate", render: (r) => r.baseRate },
          { key: "active", header: "Status", render: (r) => <AdminStatusBadge label={r.active ? "Active" : "Inactive"} tone={r.active ? "success" : "default"} /> },
        ]}
      />
    </>
  );
}
