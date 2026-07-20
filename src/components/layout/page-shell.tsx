import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

interface PageShellProps {
  title: string;
  description: string;
  children: ReactNode;
  className?: string;
}

export function PageShell({ title, description, children, className }: PageShellProps) {
  return (
    <div className={cn("relative py-16 sm:py-24", className)}>
      <div className="glow-orb right-0 top-0 h-72 w-72 bg-[var(--glow)]" />
      <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">{title}</h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted">{description}</p>
        </div>
        <div className="mt-12">{children}</div>
      </div>
    </div>
  );
}
