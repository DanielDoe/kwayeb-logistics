import { DashboardNav } from "@/components/dashboard/dashboard-nav";

export function DashboardShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto flex max-w-7xl flex-col gap-0 px-4 py-8 lg:flex-row lg:gap-8 sm:px-6 lg:px-8">
      <DashboardNav />
      <div className="min-w-0 flex-1">{children}</div>
    </div>
  );
}
