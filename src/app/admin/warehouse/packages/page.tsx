import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { WarehouseInventoryGrid } from "@/components/admin/admin-workspace-widgets";
import { WAREHOUSE_PACKAGES } from "@/lib/admin/workspace-demo-data";

export default function AdminPackagesPage() {
  return (
    <>
      <AdminPageHeader />
      <WarehouseInventoryGrid packages={WAREHOUSE_PACKAGES} />
    </>
  );
}
