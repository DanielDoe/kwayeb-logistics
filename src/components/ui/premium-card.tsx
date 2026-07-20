import { cn } from "@/lib/utils";
import type { HTMLAttributes, ReactNode } from "react";

type PremiumCardVariant = "default" | "featured" | "route" | "step" | "stat";

interface PremiumCardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: PremiumCardVariant;
  accent?: "amber" | "sky" | "emerald" | "violet";
  children: ReactNode;
}

const accentMap = {
  amber: "from-amber-500/40 via-amber-400/10 to-transparent",
  sky: "from-sky-500/35 via-sky-400/10 to-transparent",
  emerald: "from-emerald-500/35 via-emerald-400/10 to-transparent",
  violet: "from-violet-500/35 via-violet-400/10 to-transparent",
};

const glowMap = {
  amber: "group-hover:shadow-[0_20px_60px_-20px_rgba(245,158,11,0.35)]",
  sky: "group-hover:shadow-[0_20px_60px_-20px_rgba(14,165,233,0.3)]",
  emerald: "group-hover:shadow-[0_20px_60px_-20px_rgba(16,185,129,0.3)]",
  violet: "group-hover:shadow-[0_20px_60px_-20px_rgba(139,92,246,0.3)]",
};

export function PremiumCard({
  variant = "default",
  accent = "amber",
  className,
  children,
  ...props
}: PremiumCardProps) {
  return (
    <div
      className={cn(
        "group relative",
        variant !== "stat" && "premium-card",
        glowMap[accent],
        className,
      )}
      {...props}
    >
      <div
        className={cn(
          "relative h-full overflow-hidden rounded-2xl border border-border/80 bg-card/90 backdrop-blur-sm transition-all duration-500",
          "dark:bg-card/60",
          variant === "featured" && "rounded-3xl p-8 sm:p-10",
          variant === "default" && "p-6",
          variant === "route" && "p-5",
          variant === "step" && "p-6",
          variant === "stat" &&
            "rounded-2xl border border-border/70 bg-card/80 p-6 shadow-sm backdrop-blur-md transition duration-500 hover:-translate-y-1 hover:border-[color-mix(in_srgb,var(--accent)_30%,transparent)]",
          "group-hover:border-[color-mix(in_srgb,var(--accent)_25%,transparent)] group-hover:-translate-y-1",
        )}
      >
        <div
          className={cn(
            "pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100",
            "bg-gradient-to-br",
            accentMap[accent],
          )}
          aria-hidden
        />
        <div
          className="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full bg-amber-500/5 blur-2xl transition group-hover:bg-amber-500/10"
          aria-hidden
        />
        <div className="relative">{children}</div>
      </div>
    </div>
  );
}

interface PremiumCardIconProps {
  children: ReactNode;
  className?: string;
}

export function PremiumCardIcon({ children, className }: PremiumCardIconProps) {
  return (
    <div
      className={cn(
        "flex h-12 w-12 items-center justify-center rounded-xl border border-amber-500/15 bg-gradient-to-br from-accent-soft to-transparent text-accent-text shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] transition duration-500 group-hover:scale-105 group-hover:border-amber-500/30",
        className,
      )}
    >
      {children}
    </div>
  );
}
