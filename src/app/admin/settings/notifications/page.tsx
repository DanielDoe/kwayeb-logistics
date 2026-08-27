import { AdminDataTable, AdminStatusBadge } from "@/components/admin/admin-data-table";
import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { ADMIN_NOTIFICATIONS } from "@/lib/admin/admin-catalog-data";

export default function AdminNotificationsPage() {
  return (
    <>
      <AdminPageHeader eyebrow="System" title="Notifications" description="Alert rules for staff and customer events." />
      <AdminDataTable
        rows={ADMIN_NOTIFICATIONS}
        getRowKey={(r) => r.id}
        columns={[
          { key: "event", header: "Event", render: (r) => r.event },
          { key: "channel", header: "Channel", render: (r) => r.channel },
          { key: "enabled", header: "Status", render: (r) => <AdminStatusBadge label={r.enabled ? "Enabled" : "Disabled"} tone={r.enabled ? "success" : "default"} /> },
        ]}
      />
    </>
  );
}
