import { fetchAdminCustomers } from "@/lib/actions/admin";
import { AdminDataTable, AdminStatusBadge } from "@/components/admin/admin-data-table";
import { AdminPageHeader } from "@/components/admin/admin-page-header";

export default async function AdminCustomersPage() {
  const customers = await fetchAdminCustomers();

  return (
    <>
      <AdminPageHeader />
      <AdminDataTable
        rows={customers}
        getRowKey={(row) => row.id}
        columns={[
          { key: "name", header: "Name", render: (r) => r.full_name ?? "—" },
          { key: "email", header: "Email", render: (r) => r.email },
          { key: "company", header: "Company", render: (r) => r.company ?? "—" },
          {
            key: "type",
            header: "Type",
            render: (r) => <AdminStatusBadge label={r.role} tone={r.role === "business" ? "default" : "success"} />,
          },
        ]}
      />
    </>
  );
}
