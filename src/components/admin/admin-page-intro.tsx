interface AdminPageIntroProps {
  children: React.ReactNode;
}

/** Title block for overview/home pages only — no breadcrumbs. */
export function AdminPageIntro({ children }: AdminPageIntroProps) {
  return <div className="mb-6">{children}</div>;
}
