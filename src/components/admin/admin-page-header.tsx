interface AdminPageHeaderProps {
  title: string;
  description?: string;
  eyebrow?: string;
  actions?: React.ReactNode;
}

export function AdminPageHeader({ title, description, eyebrow, actions }: AdminPageHeaderProps) {
  return (
    <div className="mb-6 flex flex-wrap items-start justify-between gap-4">
      <div>
        {eyebrow ? (
          <p className="text-sm font-medium text-accent-text">{eyebrow}</p>
        ) : null}
        <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">{title}</h1>
        {description ? <p className="mt-1 max-w-2xl text-sm text-muted">{description}</p> : null}
      </div>
      {actions ? <div className="flex flex-wrap gap-2">{actions}</div> : null}
    </div>
  );
}
