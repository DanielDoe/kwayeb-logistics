import { AdminDataTable } from "@/components/admin/admin-data-table";
import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { ADMIN_COMPANIES } from "@/lib/admin/admin-catalog-data";

export default function AdminCompaniesPage() {
  return (
    <>
      <AdminPageHeader
        eyebrow="Customers"
        title="Companies"
        description="Business accounts with multiple contacts and active shipments."
      />
      <AdminDataTable
        rows={ADMIN_COMPANIES}
        getRowKey={(row) => row.id}
        columns={[
          { key: "name", header: "Company", render: (r) => r.name },
          { key: "country", header: "Country", render: (r) => r.country },
          { key: "contacts", header: "Contacts", render: (r) => r.contacts },
          { key: "shipments", header: "Active Shipments", render: (r) => r.activeShipments },
        ]}
      />
    </>
  );
}
