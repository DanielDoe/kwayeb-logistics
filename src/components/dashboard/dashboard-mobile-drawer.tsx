"use client";

import { useEffect, useState, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

interface DashboardMobileDrawerProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  eyebrow?: string;
  children: ReactNode;
}

export function DashboardMobileDrawer({
  open,
  onClose,
  title = "Menu",
  eyebrow = "Customer portal",
  children,
}: DashboardMobileDrawerProps) {
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!open) {
      setVisible(false);
      return;
    }

    const frame = requestAnimationFrame(() => setVisible(true));
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
    }

    document.addEventListener("keydown", onKey);

    return () => {
      cancelAnimationFrame(frame);
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  if (!mounted || !open) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-[100] lg:hidden"
      role="dialog"
      aria-modal="true"
      aria-label={title}
    >
      <div
        className={cn(
          "absolute inset-0 bg-black/50 transition-opacity duration-300",
          visible ? "opacity-100" : "opacity-0",
        )}
        onClick={onClose}
        aria-hidden="true"
      />

      <aside
        className={cn(
          "absolute inset-y-0 left-0 flex w-[min(88vw,20rem)] flex-col bg-card shadow-2xl transition-transform duration-300 ease-out",
          visible ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="flex items-center justify-between border-b border-border px-4 py-3">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-wide text-muted">{eyebrow}</p>
            <p className="font-semibold text-foreground">{title}</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="inline-flex h-9 w-9 items-center justify-center rounded-lg hover:bg-surface-hover"
            aria-label="Close menu"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        <div className="flex min-h-0 flex-1 flex-col overflow-hidden">{children}</div>
      </aside>
    </div>,
    document.body,
  );
}
