import { AdminDataTable, AdminStatusBadge } from "@/components/admin/admin-data-table";
import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { ADMIN_CURRENCIES } from "@/lib/admin/admin-catalog-data";

export default function AdminCurrenciesPage() {
  return (
    <>
      <AdminPageHeader eyebrow="Configuration" title="Currencies" description="Billing currencies accepted by Kwayeb." />
      <AdminDataTable
        rows={ADMIN_CURRENCIES}
        getRowKey={(r) => r.id}
        columns={[
          { key: "code", header: "Code", render: (r) => <span className="font-mono font-medium">{r.code}</span> },
          { key: "name", header: "Currency", render: (r) => r.name },
          { key: "symbol", header: "Symbol", render: (r) => r.symbol },
          { key: "default", header: "Default", render: (r) => <AdminStatusBadge label={r.default ? "Default" : "—"} tone={r.default ? "success" : "default"} /> },
        ]}
      />
    </>
  );
}
