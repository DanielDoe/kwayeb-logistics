"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useState } from "react";
import { ArrowRight, ChevronDown, Globe, LayoutGrid, Menu, Package, X } from "lucide-react";
import { Logo } from "@/components/brand/logo";
import { useDashboardChrome } from "@/components/dashboard/dashboard-chrome";
import { ThemePicker } from "@/components/theme/theme-picker";
import { UserProfileMenu } from "@/components/layout/user-profile-menu";
import { getDefaultStaffRedirect, isStaffRole } from "@/lib/auth/roles";
import { cn } from "@/lib/utils";

interface HeaderUser {
  fullName: string | null;
  email: string;
  role: string;
  company: string | null;
}

interface HeaderProps {
  user?: HeaderUser | null;
}

const MAIN_NAV = [
  { href: "/services", label: "Services", dropdown: true },
  { href: "/services", label: "Solutions", dropdown: true },
  { href: "/routes", label: "Routes", dropdown: true },
  { href: "/faq", label: "Resources", dropdown: true },
  { href: "/#how-it-works", label: "How It Works", dropdown: false },
  { href: "/about", label: "About", dropdown: false },
] as const;

export function Header({ user = null }: HeaderProps) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const menuId = useId();
  const dashboardChrome = useDashboardChrome();
  const isLoggedIn = Boolean(user);
  const isStaff = user ? isStaffRole(user.role) : false;
  const isDashboardRoute = pathname.startsWith("/dashboard");
  const isAdminRoute = pathname.startsWith("/admin");
  const isAppShellRoute = isDashboardRoute || isAdminRoute;
  const showPublicNav = !isLoggedIn;
  const staffHome = user && isStaff ? getDefaultStaffRedirect(user.role) : "/admin";
  const homeHref = isStaff ? staffHome : isLoggedIn ? "/dashboard" : "/";
  const closeDashboardNav = dashboardChrome?.setMobileNavOpen;

  useEffect(() => {
    setIsOpen(false);
    closeDashboardNav?.(false);
  }, [pathname, closeDashboardNav]);

  useEffect(() => {
    if (!isOpen) return;

    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") setIsOpen(false);
    }

    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 border-b bg-white",
        (isAppShellRoute || isLoggedIn) && dashboardChrome?.mobileNavOpen && "z-[110]",
        isAppShellRoute || isLoggedIn
          ? "border-border/80 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80 lg:border-slate-200/80 lg:bg-white"
          : "border-slate-200/80",
      )}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-3 px-4 sm:px-6 lg:px-8">
        <Link
          href={isAdminRoute ? staffHome : isDashboardRoute ? "/dashboard" : homeHref}
          className="min-w-0 shrink-0"
          onClick={() => {
            setIsOpen(false);
            dashboardChrome?.setMobileNavOpen(false);
          }}
        >
          <Logo size="sm" />
        </Link>

        {showPublicNav ? (
          <nav className="hidden min-w-0 flex-1 items-center justify-center xl:flex" aria-label="Primary">
            {MAIN_NAV.map((link) => {
              const isActive =
                pathname === link.href ||
                (link.href !== "/#how-it-works" && pathname.startsWith(link.href));
              return (
                <Link
                  key={link.label}
                  href={link.href}
                  className={cn(
                    "inline-flex shrink-0 items-center gap-0.5 whitespace-nowrap rounded-md px-2 py-2 text-[13px] font-medium transition",
                    "2xl:gap-1 2xl:px-2.5",
                    isActive ? "text-[#ff6600]" : "text-[#0a1d37] hover:text-[#ff6600]",
                  )}
                >
                  {link.label}
                  {link.dropdown ? <ChevronDown className="h-3.5 w-3.5 shrink-0 opacity-45" /> : null}
                </Link>
              );
            })}
          </nav>
        ) : (
          <div className="hidden min-w-0 flex-1 xl:block" aria-hidden />
        )}

        <div className="hidden shrink-0 items-center gap-2 xl:flex">
          {showPublicNav ? (
            <>
              <Link
                href="/track"
                className="inline-flex h-9 items-center gap-1.5 rounded-md border border-[#0a1d37]/25 bg-white px-3 text-[13px] font-semibold text-[#0a1d37] transition hover:bg-slate-50"
              >
                <Package className="h-3.5 w-3.5 shrink-0" strokeWidth={2} />
                <span className="2xl:hidden">Track</span>
                <span className="hidden 2xl:inline">Track Shipment</span>
              </Link>

              <Link
                href="/login"
                className="inline-flex h-9 items-center rounded-md px-3 text-[13px] font-semibold text-[#0a1d37] transition hover:bg-slate-50"
              >
                Log In
              </Link>

              <Link
                href="/source"
                className="inline-flex h-9 items-center gap-1.5 rounded-md bg-[#ff6600] px-3.5 text-[13px] font-semibold text-white transition hover:bg-[#e55a00]"
              >
                <span className="2xl:hidden">Quote</span>
                <span className="hidden 2xl:inline">Get Free Quote</span>
                <ArrowRight className="h-3.5 w-3.5 shrink-0" strokeWidth={2.25} />
              </Link>

              <button
                type="button"
                className="inline-flex h-9 items-center gap-1 rounded-md px-2 text-[13px] font-semibold text-[#0a1d37] transition hover:bg-slate-50"
                aria-label="Language"
              >
                <Globe className="h-3.5 w-3.5" strokeWidth={1.75} />
                <span>EN</span>
                <ChevronDown className="h-3 w-3 opacity-45" />
              </button>
            </>
          ) : (
            <>
              <UserProfileMenu
                fullName={user!.fullName}
                email={user!.email}
                role={user!.role}
                company={user!.company}
              />
            </>
          )}

          <ThemePicker />
        </div>

        <div className="flex shrink-0 items-center gap-1.5 xl:hidden">
          {isAppShellRoute ? (
            <button
              type="button"
              className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-border bg-card text-foreground shadow-sm transition hover:bg-surface-hover lg:hidden"
              onClick={() => dashboardChrome?.setMobileNavOpen(!dashboardChrome.mobileNavOpen)}
              aria-expanded={dashboardChrome?.mobileNavOpen ?? false}
              aria-label={dashboardChrome?.mobileNavOpen ? "Close menu" : "Open menu"}
            >
              {dashboardChrome?.mobileNavOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <LayoutGrid className="h-5 w-5" />
              )}
            </button>
          ) : isLoggedIn ? (
            <>
              <UserProfileMenu
                fullName={user!.fullName}
                email={user!.email}
                role={user!.role}
                company={user!.company}
              />
              <ThemePicker />
            </>
          ) : (
            <>
              <Link
                href="/source"
                className="inline-flex h-9 items-center rounded-md bg-[#ff6600] px-3 text-[13px] font-semibold text-white transition hover:bg-[#e55a00]"
              >
                Quote
              </Link>
              <ThemePicker />
              <button
                type="button"
                className="inline-flex h-9 w-9 items-center justify-center rounded-md text-[#0a1d37] transition hover:bg-slate-50"
                onClick={() => setIsOpen((open) => !open)}
                aria-expanded={isOpen}
                aria-controls={menuId}
                aria-label={isOpen ? "Close menu" : "Open menu"}
              >
                {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </>
          )}
        </div>
      </div>

      {isOpen && showPublicNav && !isAppShellRoute ? (
        <nav
          id={menuId}
          className="max-h-[calc(100dvh-4rem)] overflow-y-auto border-t border-slate-100 bg-white px-4 py-4 xl:hidden"
          aria-label="Mobile"
        >
          <div className="mx-auto max-w-7xl">
            {MAIN_NAV.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="block rounded-md px-3 py-2.5 text-sm font-medium text-[#0a1d37] hover:bg-slate-50"
              >
                {link.label}
              </Link>
            ))}
            <div className="mt-4 grid gap-2">
              <Link
                href="/track"
                onClick={() => setIsOpen(false)}
                className="inline-flex h-11 items-center justify-center gap-2 rounded-md border border-[#0a1d37]/25 text-sm font-semibold text-[#0a1d37]"
              >
                <Package className="h-4 w-4" />
                Track Shipment
              </Link>
              <Link
                href="/login"
                onClick={() => setIsOpen(false)}
                className="inline-flex h-11 items-center justify-center rounded-md border border-[#0a1d37]/25 text-sm font-semibold text-[#0a1d37]"
              >
                Log In
              </Link>
              <Link
                href="/source"
                onClick={() => setIsOpen(false)}
                className="inline-flex h-11 items-center justify-center gap-2 rounded-md bg-[#ff6600] text-sm font-semibold text-white"
              >
                Get Free Quote
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </nav>
      ) : null}
    </header>
  );
}
