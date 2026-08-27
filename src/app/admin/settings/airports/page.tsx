import { AdminDataTable } from "@/components/admin/admin-data-table";
import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { ADMIN_AIRPORTS } from "@/lib/admin/admin-catalog-data";

export default function AdminAirportsPage() {
  return (
    <>
      <AdminPageHeader eyebrow="Configuration" title="Airports" description="Air cargo airports for express and air freight." />
      <AdminDataTable
        rows={ADMIN_AIRPORTS}
        getRowKey={(r) => r.id}
        columns={[
          { key: "code", header: "IATA", render: (r) => <span className="font-mono font-medium">{r.code}</span> },
          { key: "name", header: "Airport", render: (r) => r.name },
          { key: "country", header: "Country", render: (r) => r.country },
        ]}
      />
    </>
  );
}
