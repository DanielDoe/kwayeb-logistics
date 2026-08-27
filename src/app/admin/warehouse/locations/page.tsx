import { AdminDataTable } from "@/components/admin/admin-data-table";
import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { ADMIN_LOCATIONS } from "@/lib/admin/admin-catalog-data";

export default function AdminLocationsPage() {
  return (
    <>
      <AdminPageHeader />
      <AdminDataTable
        rows={ADMIN_LOCATIONS}
        getRowKey={(row) => row.id}
        columns={[
          { key: "warehouse", header: "Warehouse", render: (r) => r.warehouse },
          { key: "zone", header: "Zone", render: (r) => r.zone },
          { key: "rack", header: "Rack", render: (r) => r.rack },
          { key: "shelf", header: "Shelf", render: (r) => r.shelf },
          { key: "packages", header: "Packages", render: (r) => r.packages },
        ]}
      />
    </>
  );
}
