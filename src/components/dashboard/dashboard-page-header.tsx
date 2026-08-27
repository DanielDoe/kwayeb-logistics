interface DashboardPageHeaderProps {
  title: string;
  description: string;
  eyebrow?: string;
}

export function DashboardPageHeader({ title, description, eyebrow }: DashboardPageHeaderProps) {
  return (
    <div className="rounded-2xl border border-border bg-[linear-gradient(135deg,color-mix(in_srgb,var(--accent)_8%,transparent),transparent)] p-4 sm:p-6">
      {eyebrow ? (
        <p className="text-[11px] font-semibold uppercase tracking-wider text-accent-text sm:text-xs">
          {eyebrow}
        </p>
      ) : null}
      <h1 className="mt-1 text-xl font-bold tracking-tight text-foreground sm:text-3xl">{title}</h1>
      <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted">{description}</p>
    </div>
  );
}
