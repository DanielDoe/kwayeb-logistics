"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChevronRight } from "lucide-react";
import type { ReactNode } from "react";

interface DashboardDetailRowProps {
  href: string;
  children: ReactNode;
}

export function DashboardDetailRow({ href, children }: DashboardDetailRowProps) {
  const router = useRouter();

  return (
    <tr
      role="link"
      tabIndex={0}
      onClick={() => router.push(href)}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          router.push(href);
        }
      }}
      className="cursor-pointer border-b border-border last:border-0 transition hover:bg-surface/60 focus-visible:bg-surface/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[var(--accent-ring)]"
    >
      {children}
      <td className="px-4 py-3 text-right">
        <Link
          href={href}
          onClick={(event) => event.stopPropagation()}
          className="inline-flex items-center gap-1 text-xs font-semibold text-accent-text hover:underline"
        >
          View details
          <ChevronRight className="h-3.5 w-3.5" />
        </Link>
      </td>
    </tr>
  );
}
