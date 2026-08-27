import { AdminPageBreadcrumbs } from "@/components/admin/admin-chrome";

interface AdminPageHeaderProps {
  actions?: React.ReactNode;
}

/** Breadcrumbs for sub-pages. Overview pages use AdminPageIntro instead. */
export function AdminPageHeader({ actions }: AdminPageHeaderProps) {
  if (!actions) {
    return (
      <div className="mb-6">
        <AdminPageBreadcrumbs />
      </div>
    );
  }

  return (
    <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
      <AdminPageBreadcrumbs />
      <div className="flex flex-wrap gap-2">{actions}</div>
    </div>
  );
}
