import { DashboardNav } from "@/components/dashboard/dashboard-nav";
import { AppBreadcrumbs } from "@/components/layout/app-breadcrumbs";

interface DashboardProfile {
  full_name: string | null;
  email: string;
  role: string;
  company: string | null;
}

export function DashboardShell({
  children,
  profile,
}: {
  children: React.ReactNode;
  profile?: DashboardProfile | null;
}) {
  return (
    <div className="mx-auto max-w-7xl px-3 py-4 sm:px-6 sm:py-6 lg:px-8">
      <div className="flex flex-col gap-4 lg:flex-row lg:gap-8">
        <DashboardNav profile={profile} />
        <main className="relative z-10 min-w-0 flex-1 pb-6">
          <AppBreadcrumbs variant="dashboard" />
          {children}
        </main>
      </div>
    </div>
  );
}
