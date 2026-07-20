"use client";

import { MapPin, Package, Plane, Ship } from "lucide-react";

const destinations = [
  { label: "Accra", x: "18%", y: "62%", delay: "0s" },
  { label: "London", x: "46%", y: "28%", delay: "0.4s" },
  { label: "Houston", x: "22%", y: "38%", delay: "0.8s" },
  { label: "Sydney", x: "78%", y: "72%", delay: "1.2s" },
];

export function HeroVisual() {
  return (
    <div className="relative mx-auto w-full max-w-lg lg:max-w-none">
      <div className="hero-visual-ring absolute inset-4 rounded-[2rem] border border-amber-500/10" aria-hidden />
      <div className="hero-visual-ring absolute inset-8 rounded-[1.75rem] border border-border/50" aria-hidden />

      <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] border border-border/80 bg-gradient-to-br from-card via-card to-accent-soft/30 p-6 shadow-2xl shadow-amber-500/5 backdrop-blur-xl sm:aspect-square lg:aspect-[5/6]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(245,158,11,0.12),transparent_45%),radial-gradient(circle_at_80%_70%,rgba(14,165,233,0.08),transparent_40%)]" />

        <svg
          viewBox="0 0 400 400"
          className="absolute inset-0 h-full w-full opacity-60 dark:opacity-40"
          aria-hidden
        >
          <path
            d="M 120 280 Q 200 120 280 140"
            fill="none"
            stroke="url(#routeGrad)"
            strokeWidth="2"
            strokeDasharray="6 8"
            className="route-path"
          />
          <path
            d="M 120 280 Q 160 200 200 110"
            fill="none"
            stroke="url(#routeGrad)"
            strokeWidth="1.5"
            strokeDasharray="4 10"
            className="route-path route-path-delayed"
          />
          <path
            d="M 120 280 Q 240 260 320 300"
            fill="none"
            stroke="url(#routeGrad)"
            strokeWidth="1.5"
            strokeDasharray="4 10"
            className="route-path route-path-delayed-2"
          />
          <defs>
            <linearGradient id="routeGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.2" />
              <stop offset="50%" stopColor="#f59e0b" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#0ea5e9" stopOpacity="0.4" />
            </linearGradient>
          </defs>
        </svg>

        {destinations.map((d) => (
          <div
            key={d.label}
            className="absolute flex items-center gap-1.5"
            style={{ left: d.x, top: d.y, animationDelay: d.delay }}
          >
            <span className="route-pulse h-2 w-2 rounded-full bg-amber-500 shadow-[0_0_12px_rgba(245,158,11,0.8)]" />
            <span className="rounded-md bg-background/80 px-2 py-0.5 text-[10px] font-medium text-foreground backdrop-blur-sm">
              {d.label}
            </span>
          </div>
        ))}

        <div className="absolute left-[28%] top-[68%] flex items-center gap-2 rounded-full border border-amber-500/30 bg-background/90 px-3 py-1.5 text-xs font-medium backdrop-blur-md">
          <MapPin className="h-3.5 w-3.5 text-amber-500" />
          Guangzhou, CN
        </div>

        <div className="animate-float absolute bottom-6 left-4 right-4 rounded-2xl border border-border/80 bg-background/85 p-4 backdrop-blur-xl">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-widest text-muted">Live status</p>
              <p className="mt-1 text-sm font-semibold text-foreground">KWY-2026-001</p>
            </div>
            <span className="rounded-full bg-emerald-500/15 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-emerald-600 dark:text-emerald-400">
              In transit
            </span>
          </div>
          <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-border">
            <div className="progress-bar h-full rounded-full bg-gradient-to-r from-amber-500 to-amber-400" />
          </div>
          <p className="mt-2 text-xs text-muted">Departed Shenzhen · Est. arrival Accra</p>
        </div>

        <div className="animate-float absolute right-4 top-6 flex items-center gap-2 rounded-xl border border-border/70 bg-background/80 px-3 py-2 backdrop-blur-md [animation-delay:1.5s]">
          <Plane className="h-4 w-4 text-sky-500" />
          <span className="text-xs font-medium">Air freight</span>
        </div>

        <div className="animate-float absolute left-4 top-10 flex items-center gap-2 rounded-xl border border-border/70 bg-background/80 px-3 py-2 backdrop-blur-md [animation-delay:3s]">
          <Ship className="h-4 w-4 text-accent-text" />
          <span className="text-xs font-medium">Sea · FCL</span>
        </div>

        <div className="animate-float absolute right-6 top-[38%] rounded-xl border border-border/70 bg-background/80 p-2.5 backdrop-blur-md [animation-delay:2s]">
          <Package className="h-4 w-4 text-accent-text" />
        </div>
      </div>
    </div>
  );
}
