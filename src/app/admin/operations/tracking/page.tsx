import { fetchAdminShipments } from "@/lib/actions/admin";
import { AdminDataTable, AdminStatusBadge, AdminTableLink } from "@/components/admin/admin-data-table";
import { AdminPageHeader } from "@/components/admin/admin-page-header";

export default async function AdminTrackingPage() {
  const shipments = await fetchAdminShipments();

  return (
    <>
      <AdminPageHeader />
      <AdminDataTable
        rows={shipments}
        getRowKey={(row) => row.id}
        columns={[
          {
            key: "tracking",
            header: "Tracking ID",
            render: (r) => (
              <AdminTableLink href={`/admin/operations/shipments/${r.tracking_id.toLowerCase()}`}>
                {r.tracking_id}
              </AdminTableLink>
            ),
          },
          { key: "customer", header: "Customer", render: (r) => r.customer_name ?? "—" },
          { key: "destination", header: "Destination", render: (r) => r.destination_country },
          { key: "freight", header: "Freight", render: (r) => r.freight_type ?? "—" },
          {
            key: "status",
            header: "Status",
            render: (r) => <AdminStatusBadge label={r.status.replace(/_/g, " ")} />,
          },
        ]}
      />
    </>
  );
}
