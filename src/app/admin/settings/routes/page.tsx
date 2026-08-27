import { AdminDataTable } from "@/components/admin/admin-data-table";
import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { ADMIN_ROUTES } from "@/lib/admin/admin-catalog-data";

export default function AdminRoutesPage() {
  return (
    <>
      <AdminPageHeader eyebrow="Configuration" title="Routes" description="Origin–destination shipping routes and transit times." />
      <AdminDataTable
        rows={ADMIN_ROUTES}
        getRowKey={(r) => r.id}
        columns={[
          { key: "origin", header: "Origin", render: (r) => r.origin },
          { key: "destination", header: "Destination", render: (r) => r.destination },
          { key: "modes", header: "Modes", render: (r) => r.modes },
          { key: "transit", header: "Transit (days)", render: (r) => r.transitDays },
        ]}
      />
    </>
  );
}
