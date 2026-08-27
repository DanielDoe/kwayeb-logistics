import { AdminDataTable, AdminStatusBadge } from "@/components/admin/admin-data-table";
import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { ADMIN_BOOKINGS } from "@/lib/admin/admin-catalog-data";

export default function AdminBookingsPage() {
  return (
    <>
      <AdminPageHeader />
      <AdminDataTable
        rows={ADMIN_BOOKINGS}
        getRowKey={(row) => row.id}
        columns={[
          { key: "ref", header: "Reference", render: (r) => <span className="font-mono text-xs font-medium">{r.reference}</span> },
          { key: "carrier", header: "Carrier", render: (r) => r.carrier },
          { key: "route", header: "Route", render: (r) => r.route },
          { key: "etd", header: "ETD", render: (r) => r.etd },
          {
            key: "status",
            header: "Status",
            render: (r) => (
              <AdminStatusBadge label={r.status} tone={r.status === "Confirmed" ? "success" : "warning"} />
            ),
          },
        ]}
      />
    </>
  );
}
