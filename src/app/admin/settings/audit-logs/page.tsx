import { AdminDataTable } from "@/components/admin/admin-data-table";
import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { ADMIN_AUDIT_LOGS } from "@/lib/admin/admin-catalog-data";

export default function AdminAuditLogsPage() {
  return (
    <>
      <AdminPageHeader eyebrow="System" title="Audit Logs" description="System activity and staff action history." />
      <AdminDataTable
        rows={ADMIN_AUDIT_LOGS}
        getRowKey={(r) => r.id}
        columns={[
          { key: "action", header: "Action", render: (r) => r.action },
          { key: "user", header: "User", render: (r) => r.user },
          { key: "target", header: "Target", render: (r) => <span className="font-mono text-xs">{r.target}</span> },
          { key: "time", header: "Time", render: (r) => r.time },
        ]}
      />
    </>
  );
}
