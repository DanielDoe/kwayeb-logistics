import { fetchAdminStaff } from "@/lib/actions/admin";
import { AdminDataTable, AdminStatusBadge } from "@/components/admin/admin-data-table";
import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { getStaffRoleLabel } from "@/lib/auth/roles";

export default async function AdminStaffPage() {
  const staff = await fetchAdminStaff();

  return (
    <>
      <AdminPageHeader
        eyebrow="System"
        title="Staff"
        description="Kwayeb staff accounts and department assignments."
        actions={
          <button type="button" className="rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-[var(--btn-primary-fg)]">
            Invite Staff
          </button>
        }
      />
      <AdminDataTable
        rows={staff}
        getRowKey={(row) => row.id}
        columns={[
          { key: "name", header: "Name", render: (r) => r.full_name ?? "—" },
          { key: "email", header: "Email", render: (r) => r.email },
          { key: "company", header: "Company", render: (r) => r.company ?? "—" },
          {
            key: "role",
            header: "Role",
            render: (r) => <AdminStatusBadge label={getStaffRoleLabel(r.role)} />,
          },
        ]}
      />
    </>
  );
}
