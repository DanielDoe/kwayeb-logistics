import { AdminDataTable, AdminStatusBadge } from "@/components/admin/admin-data-table";
import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { ADMIN_COUNTRIES } from "@/lib/admin/admin-catalog-data";

export default function AdminCountriesPage() {
  return (
    <>
      <AdminPageHeader eyebrow="Configuration" title="Countries" description="Supported destination countries and regions." />
      <AdminDataTable
        rows={ADMIN_COUNTRIES}
        getRowKey={(r) => r.id}
        columns={[
          { key: "code", header: "Code", render: (r) => <span className="font-mono font-medium">{r.code}</span> },
          { key: "name", header: "Country", render: (r) => r.name },
          { key: "region", header: "Region", render: (r) => r.region },
          { key: "active", header: "Status", render: (r) => <AdminStatusBadge label={r.active ? "Active" : "Inactive"} tone={r.active ? "success" : "default"} /> },
        ]}
      />
    </>
  );
}
