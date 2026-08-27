import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import type { ReactNode } from "react";

interface RecordDetailShellProps {
  backHref: string;
  backLabel: string;
  children: ReactNode;
}

export function RecordDetailShell({ backHref, backLabel, children }: RecordDetailShellProps) {
  return (
    <div className="space-y-6">
      <Link
        href={backHref}
        className="inline-flex items-center gap-1.5 text-sm font-medium text-muted transition hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" />
        {backLabel}
      </Link>
      {children}
    </div>
  );
}

interface DetailFieldProps {
  label: string;
  value: ReactNode;
}

export function DetailField({ label, value }: DetailFieldProps) {
  return (
    <div>
      <p className="text-xs font-medium uppercase tracking-wide text-muted">{label}</p>
      <p className="mt-1 text-sm font-medium text-foreground">{value}</p>
    </div>
  );
}
