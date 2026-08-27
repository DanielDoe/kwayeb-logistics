"use client";

import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";
import { Building2, ChevronDown, LayoutDashboard, LogOut, Settings, Shield, User } from "lucide-react";
import { signOut } from "@/lib/actions/auth";
import { getDefaultStaffRedirect, getStaffRoleLabel, isStaffRole } from "@/lib/auth/roles";
import { cn } from "@/lib/utils";

export interface UserProfileMenuProps {
  fullName: string | null;
  email: string;
  role: string;
  company: string | null;
  className?: string;
}

function getInitials(name: string | null, email: string) {
  if (name) {
    const parts = name.trim().split(/\s+/);
    if (parts.length >= 2) return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase();
    return name.slice(0, 2).toUpperCase();
  }
  return email.slice(0, 2).toUpperCase();
}

export function UserProfileMenu({ fullName, email, role, company, className }: UserProfileMenuProps) {
  const [open, setOpen] = useState(false);
  const menuId = useId();
  const rootRef = useRef<HTMLDivElement>(null);
  const isStaff = isStaffRole(role);
  const isAdmin = role === "admin";
  const isBusiness = role === "business";
  const displayName = fullName ?? email.split("@")[0];

  useEffect(() => {
    if (!open) return;

    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }

    function onPointerDown(event: MouseEvent) {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    }

    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onPointerDown);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onPointerDown);
    };
  }, [open]);

  const settingsHref = isAdmin ? "/admin/settings" : isStaff ? null : "/dashboard/settings";

  return (
    <div ref={rootRef} className={cn("relative", className)}>
      <button
        type="button"
        className="flex items-center gap-2 rounded-xl border border-border bg-card py-1 pl-1 pr-2.5 shadow-sm transition hover:bg-surface-hover"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        aria-haspopup="menu"
        aria-controls={menuId}
      >
        <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent text-xs font-bold text-[var(--btn-primary-fg)] shadow-sm">
          {getInitials(fullName, email)}
        </span>
        <span className="hidden max-w-[120px] truncate text-sm font-semibold text-foreground sm:block">
          {displayName}
        </span>
        <ChevronDown className={cn("h-4 w-4 text-muted transition", open && "rotate-180")} />
      </button>

      {open ? (
        <div
          id={menuId}
          role="menu"
          className="absolute right-0 top-[calc(100%+0.5rem)] z-[120] w-72 overflow-hidden rounded-xl border border-border bg-card shadow-lg"
        >
          <div className="border-b border-border p-4">
            <div className="flex items-center gap-3">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-accent text-sm font-bold text-[var(--btn-primary-fg)] shadow-md shadow-[var(--accent-shadow)]">
                {getInitials(fullName, email)}
              </span>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold text-foreground">{displayName}</p>
                <p className="truncate text-xs text-muted">{email}</p>
              </div>
            </div>
            <div className="mt-3 flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1 rounded-full bg-accent-soft px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-accent-text">
                {isStaff ? <Shield className="h-3 w-3" /> : isBusiness ? <Building2 className="h-3 w-3" /> : <User className="h-3 w-3" />}
                {isStaff ? getStaffRoleLabel(role) : isBusiness ? "Business" : "Customer"}
              </span>
              {company ? <span className="truncate text-xs text-muted">{company}</span> : null}
            </div>
          </div>

          <div className="p-1.5">
            {settingsHref ? (
              <Link
                href={settingsHref}
                role="menuitem"
                className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-foreground transition hover:bg-surface-hover"
                onClick={() => setOpen(false)}
              >
                <Settings className="h-4 w-4 text-muted" />
                Settings
              </Link>
            ) : null}

            {isStaff ? (
              <>
                <Link
                  href={getDefaultStaffRedirect(role)}
                  role="menuitem"
                  className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-foreground transition hover:bg-surface-hover"
                  onClick={() => setOpen(false)}
                >
                  <LayoutDashboard className="h-4 w-4 text-muted" />
                  Staff portal
                </Link>
                <Link
                  href="/dashboard"
                  role="menuitem"
                  className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-foreground transition hover:bg-surface-hover"
                  onClick={() => setOpen(false)}
                >
                  <User className="h-4 w-4 text-muted" />
                  Customer portal
                </Link>
              </>
            ) : null}

            <form action={signOut}>
              <button
                type="submit"
                role="menuitem"
                className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm font-medium text-red-600 transition hover:bg-red-500/5 dark:text-red-400"
              >
                <LogOut className="h-4 w-4" />
                Sign out
              </button>
            </form>
          </div>
        </div>
      ) : null}
    </div>
  );
}
