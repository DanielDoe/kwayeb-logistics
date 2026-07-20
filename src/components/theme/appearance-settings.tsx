"use client";

import { Check, Moon, Sun } from "lucide-react";
import { COLOR_SCHEMES } from "@/lib/color-schemes";
import { useTheme } from "@/components/theme/theme-provider";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export function AppearanceSettings() {
  const { theme, colorScheme, setTheme, setColorScheme } = useTheme();

  return (
    <Card>
      <CardContent className="p-6 sm:p-8">
        <h2 className="text-lg font-semibold text-foreground">Appearance</h2>
        <p className="mt-1 text-sm text-muted">
          Choose light or dark mode and try different brand color schemes across the site.
        </p>

        <p className="mt-6 text-xs font-semibold uppercase tracking-[0.15em] text-muted">Mode</p>
        <div className="mt-3 flex max-w-xs gap-2 rounded-xl border border-border bg-surface p-1">
          {(["light", "dark"] as const).map((mode) => (
            <button
              key={mode}
              type="button"
              onClick={() => setTheme(mode)}
              className={cn(
                "flex flex-1 items-center justify-center gap-2 rounded-lg py-2.5 text-sm font-medium transition",
                theme === mode ? "bg-accent-soft text-accent-text" : "text-muted hover:text-foreground",
              )}
            >
              {mode === "light" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
              {mode === "light" ? "Light" : "Dark"}
            </button>
          ))}
        </div>

        <p className="mt-8 text-xs font-semibold uppercase tracking-[0.15em] text-muted">
          Color scheme
        </p>
        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {COLOR_SCHEMES.map((scheme) => {
            const active = colorScheme === scheme.id;
            return (
              <button
                key={scheme.id}
                type="button"
                onClick={() => setColorScheme(scheme.id)}
                className={cn(
                  "group relative overflow-hidden rounded-2xl border p-4 text-left transition duration-300",
                  active
                    ? "border-accent/40 bg-accent-soft shadow-[0_12px_40px_-20px_var(--accent-shadow)]"
                    : "border-border hover:border-accent/25 hover:bg-surface-hover",
                )}
              >
                <div
                  className="h-16 rounded-xl border border-border/60 shadow-inner"
                  style={{
                    background: `linear-gradient(135deg, ${scheme.swatch} 0%, ${scheme.swatchSecondary} 100%)`,
                  }}
                />
                <div className="mt-3 flex items-start justify-between gap-2">
                  <div>
                    <p className="font-semibold text-foreground">{scheme.label}</p>
                    <p className="mt-0.5 text-xs text-muted">{scheme.description}</p>
                  </div>
                  {active && (
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent text-[var(--btn-primary-fg)]">
                      <Check className="h-3.5 w-3.5" />
                    </span>
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
