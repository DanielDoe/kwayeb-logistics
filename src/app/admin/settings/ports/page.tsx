import { AdminDataTable } from "@/components/admin/admin-data-table";
import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { ADMIN_PORTS } from "@/lib/admin/admin-catalog-data";

export default function AdminPortsPage() {
  return (
    <>
      <AdminPageHeader />
      <AdminDataTable
        rows={ADMIN_PORTS}
        getRowKey={(r) => r.id}
        columns={[
          { key: "code", header: "Code", render: (r) => <span className="font-mono text-xs">{r.code}</span> },
          { key: "name", header: "Port", render: (r) => r.name },
          { key: "country", header: "Country", render: (r) => r.country },
          { key: "type", header: "Type", render: (r) => r.type },
        ]}
      />
    </>
  );
}
