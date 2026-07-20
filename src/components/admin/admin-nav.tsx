"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, FileText, Package, Users, MessageSquare } from "lucide-react";
import { cn } from "@/lib/utils";

const LINKS = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/quotes", label: "Quote Requests", icon: FileText },
  { href: "/admin/shipments", label: "Shipments", icon: Package },
  { href: "/admin/customers", label: "Customers", icon: Users },
  { href: "/admin/support", label: "Support", icon: MessageSquare },
];

export function AdminNav() {
  const pathname = usePathname();

  return (
    <aside className="w-full shrink-0 border-b border-border lg:w-56 lg:border-b-0 lg:border-r">
      <p className="hidden px-4 pt-4 text-xs font-semibold uppercase tracking-widest text-muted lg:block">Admin</p>
      <nav className="flex gap-1 overflow-x-auto p-4 lg:flex-col">
        {LINKS.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={cn(
              "flex items-center gap-2 whitespace-nowrap rounded-lg px-3 py-2 text-sm font-medium transition",
              pathname === link.href ? "bg-accent-soft text-accent-text" : "text-muted hover:bg-surface-hover",
            )}
          >
            <link.icon className="h-4 w-4" />
            {link.label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
