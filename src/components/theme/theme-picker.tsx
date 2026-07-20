"use client";

import { useEffect, useRef, useState } from "react";
import { Check, Moon, Palette, Sun } from "lucide-react";
import { COLOR_SCHEMES } from "@/lib/color-schemes";
import { useTheme } from "@/components/theme/theme-provider";
import { cn } from "@/lib/utils";

interface ThemePickerProps {
  className?: string;
}

export function ThemePicker({ className }: ThemePickerProps) {
  const { theme, colorScheme, setTheme, setColorScheme } = useTheme();
  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;

    function handleClick(e: MouseEvent) {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }

    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }

    document.addEventListener("mousedown", handleClick);
    document.addEventListener("keydown", handleKey);
    return () => {
      document.removeEventListener("mousedown", handleClick);
      document.removeEventListener("keydown", handleKey);
    };
  }, [open]);

  return (
    <div ref={panelRef} className={cn("relative", className)}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label="Appearance settings"
        aria-expanded={open}
        className={cn(
          "inline-flex h-9 w-9 items-center justify-center rounded-md border border-[#0a1d37]/20 bg-white text-[#0a1d37] transition-colors",
          "hover:bg-slate-50",
          open && "border-[#ff6600]/40 bg-[#fff4ed] text-[#ff6600]",
        )}
      >
        <Palette className="h-4 w-4" />
      </button>

      {open && (
        <div
          className={cn(
            "absolute right-0 top-full z-50 mt-2 w-72 overflow-hidden rounded-2xl border border-border bg-card p-4 shadow-xl",
            "animate-[hero-fade-up_0.25s_cubic-bezier(0.22,1,0.36,1)_both]",
          )}
        >
          <p className="text-xs font-semibold uppercase tracking-[0.15em] text-muted">Appearance</p>

          <div className="mt-3 flex gap-2 rounded-xl border border-border bg-surface p-1">
            {(["light", "dark"] as const).map((mode) => (
              <button
                key={mode}
                type="button"
                onClick={() => setTheme(mode)}
                className={cn(
                  "flex flex-1 items-center justify-center gap-2 rounded-lg py-2 text-sm font-medium transition",
                  theme === mode
                    ? "bg-accent-soft text-accent-text"
                    : "text-muted hover:text-foreground",
                )}
              >
                {mode === "light" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
                {mode === "light" ? "Light" : "Dark"}
              </button>
            ))}
          </div>

          <p className="mt-4 text-xs font-semibold uppercase tracking-[0.15em] text-muted">
            Color scheme
          </p>

          <div className="mt-3 space-y-2">
            {COLOR_SCHEMES.map((scheme) => {
              const active = colorScheme === scheme.id;
              return (
                <button
                  key={scheme.id}
                  type="button"
                  onClick={() => setColorScheme(scheme.id)}
                  className={cn(
                    "flex w-full items-center gap-3 rounded-xl border px-3 py-2.5 text-left transition",
                    active
                      ? "border-accent/40 bg-accent-soft"
                      : "border-border hover:border-accent/20 hover:bg-surface-hover",
                  )}
                >
                  <span className="relative flex shrink-0">
                    <span
                      className="h-8 w-8 rounded-lg border border-border/80 shadow-sm"
                      style={{
                        background: `linear-gradient(135deg, ${scheme.swatch} 50%, ${scheme.swatchSecondary} 50%)`,
                      }}
                    />
                    {active && (
                      <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-accent text-[10px] text-[var(--btn-primary-fg)]">
                        <Check className="h-2.5 w-2.5" />
                      </span>
                    )}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-sm font-semibold text-foreground">{scheme.label}</span>
                    <span className="block truncate text-xs text-muted">{scheme.description}</span>
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
