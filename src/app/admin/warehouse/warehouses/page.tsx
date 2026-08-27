import { AdminDataTable, AdminStatusBadge } from "@/components/admin/admin-data-table";
import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { ADMIN_WAREHOUSES } from "@/lib/admin/admin-catalog-data";

export default function AdminWarehousesPage() {
  return (
    <>
      <AdminPageHeader />
      <AdminDataTable
        rows={ADMIN_WAREHOUSES}
        getRowKey={(row) => row.id}
        columns={[
          { key: "code", header: "Code", render: (r) => <span className="font-mono font-medium">{r.code}</span> },
          { key: "name", header: "Name", render: (r) => r.name },
          { key: "city", header: "City", render: (r) => r.city },
          { key: "zones", header: "Zones", render: (r) => r.zones },
          {
            key: "capacity",
            header: "Capacity",
            render: (r) => (
              <AdminStatusBadge
                label={r.capacity}
                tone={parseInt(r.capacity) > 75 ? "warning" : "success"}
              />
            ),
          },
        ]}
      />
    </>
  );
}
