import { DashboardPageBreadcrumbs } from "@/components/dashboard/dashboard-page-breadcrumbs";

interface DashboardPageHeaderProps {
  title: string;
  description: string;
}

/** Title block for the customer dashboard home only. Sub-pages use DashboardSubpageHeader. */
export function DashboardPageHeader({ title, description }: DashboardPageHeaderProps) {
  return (
    <div className="mb-6 rounded-2xl border border-border bg-[linear-gradient(135deg,color-mix(in_srgb,var(--accent)_8%,transparent),transparent)] p-4 sm:p-6">
      <h1 className="text-xl font-bold tracking-tight text-foreground sm:text-3xl">{title}</h1>
      <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted">{description}</p>
    </div>
  );
}

export function DashboardSubpageHeader() {
  return (
    <div className="mb-6">
      <DashboardPageBreadcrumbs />
    </div>
  );
}
