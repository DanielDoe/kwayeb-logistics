import { AdminPageBreadcrumbs } from "@/components/admin/admin-chrome";

interface AdminPageIntroProps {
  children: React.ReactNode;
}

/** Title block with breadcrumbs directly below — page content follows as normal siblings. */
export function AdminPageIntro({ children }: AdminPageIntroProps) {
  return (
    <div className="mb-6">
      {children}
      <div className="mt-4">
        <AdminPageBreadcrumbs />
      </div>
    </div>
  );
}
