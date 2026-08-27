import { AdminDataTable } from "@/components/admin/admin-data-table";
import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { ADMIN_SUPPLIERS } from "@/lib/admin/admin-catalog-data";

export default function AdminSuppliersPage() {
  return (
    <>
      <AdminPageHeader />
      <AdminDataTable
        rows={ADMIN_SUPPLIERS}
        getRowKey={(row) => row.id}
        columns={[
          { key: "name", header: "Supplier", render: (r) => r.name },
          { key: "city", header: "City", render: (r) => r.city },
          { key: "contact", header: "Contact", render: (r) => r.contact },
          { key: "pickups", header: "Pickups (30d)", render: (r) => r.pickups },
        ]}
      />
    </>
  );
}
