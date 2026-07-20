"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Package, FileText, CreditCard, MessageSquare, Settings, LogOut } from "lucide-react";
import { signOut } from "@/lib/actions/auth";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const LINKS = [
  { href: "/dashboard", label: "Overview", icon: LayoutDashboard },
  { href: "/dashboard/shipments", label: "Shipments", icon: Package },
  { href: "/dashboard/quotes", label: "Quotes", icon: FileText },
  { href: "/dashboard/invoices", label: "Invoices", icon: CreditCard },
  { href: "/dashboard/support", label: "Support", icon: MessageSquare },
  { href: "/dashboard/settings", label: "Settings", icon: Settings },
];

export function DashboardNav() {
  const pathname = usePathname();

  return (
    <aside className="w-full shrink-0 border-b border-border lg:w-56 lg:border-b-0 lg:border-r">
      <nav className="flex gap-1 overflow-x-auto p-4 lg:flex-col lg:overflow-visible">
        {LINKS.map((link) => {
          const active = pathname === link.href;
          return (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "flex items-center gap-2 whitespace-nowrap rounded-lg px-3 py-2 text-sm font-medium transition",
                active ? "bg-accent-soft text-accent-text" : "text-muted hover:bg-surface-hover hover:text-foreground",
              )}
            >
              <link.icon className="h-4 w-4" />
              {link.label}
            </Link>
          );
        })}
        <form action={signOut} className="lg:mt-4">
          <Button type="submit" variant="ghost" className="w-full justify-start gap-2 text-muted">
            <LogOut className="h-4 w-4" /> Sign out
          </Button>
        </form>
      </nav>
    </aside>
  );
}
