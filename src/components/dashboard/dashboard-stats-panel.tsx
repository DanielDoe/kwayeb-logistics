import Link from "next/link";
import { Clock, CreditCard, FileText, Package, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  MiniBarChart,
  MiniLineChart,
  type ChartPoint,
} from "@/components/dashboard/dashboard-mini-chart";
import { periodChange } from "@/lib/dashboard/stats-trends";

interface DashboardStatsPanelProps {
  activeQuotes: number;
  activeShipments: number;
  outstandingInvoices: number;
  quoteTrend: ChartPoint[];
  shipmentTrend: ChartPoint[];
  invoiceTrend: ChartPoint[];
  quoteUpdated: string;
  shipmentUpdated: string;
  invoiceUpdated: string;
}

interface MetricConfig {
  label: string;
  value: number;
  href: string;
  icon: LucideIcon;
  change: { label: string; positive: boolean };
}

interface ChartConfig {
  title: string;
  subtitle: string;
  href: string;
  updated: string;
  chart: "bar" | "line";
  color: string;
  trend: ChartPoint[];
}

function StatMetricCard({ metric, className }: { metric: MetricConfig; className?: string }) {
  return (
    <Link
      href={metric.href}
      className={cn(
        "flex flex-col overflow-hidden rounded-xl border border-border bg-card shadow-sm transition hover:shadow-md",
        className,
      )}
    >
      <div className="flex flex-1 flex-col gap-2 p-3 sm:flex-row sm:items-start sm:gap-4 sm:p-4">
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-foreground text-background shadow-sm sm:h-11 sm:w-11 sm:rounded-xl">
          <metric.icon className="h-4 w-4 sm:h-5 sm:w-5" strokeWidth={2} />
        </span>
        <div className="min-w-0 flex-1 sm:text-right">
          <p className="text-[11px] font-medium leading-tight text-muted sm:text-xs">{metric.label}</p>
          <p className="mt-0.5 text-2xl font-bold tabular-nums tracking-tight text-foreground sm:text-[1.75rem]">
            {metric.value}
          </p>
        </div>
      </div>
      <div className="border-t border-border/70 px-3 py-2 sm:px-4 sm:py-2.5">
        <p
          className={cn(
            "truncate text-[10px] font-medium sm:text-xs",
            metric.change.positive ? "text-emerald-600 dark:text-emerald-400" : "text-rose-600 dark:text-rose-400",
          )}
        >
          {metric.change.label}
        </p>
      </div>
    </Link>
  );
}

function StatChartCard({ chart, className }: { chart: ChartConfig; className?: string }) {
  return (
    <Link
      href={chart.href}
      className={cn(
        "flex flex-col overflow-hidden rounded-xl border border-border bg-card shadow-sm transition hover:shadow-md",
        className,
      )}
    >
      <div className="px-2 pt-3 pb-1 sm:px-3">
        {chart.chart === "bar" ? (
          <MiniBarChart data={chart.trend} color={chart.color} />
        ) : (
          <MiniLineChart data={chart.trend} color={chart.color} />
        )}
      </div>

      <div className="px-3 pb-2 sm:px-4 sm:pb-3">
        <h3 className="text-sm font-semibold text-foreground">{chart.title}</h3>
        <p className="mt-0.5 text-xs leading-relaxed text-muted">{chart.subtitle}</p>
      </div>

      <div className="mt-auto flex items-center gap-1.5 border-t border-border/70 px-3 py-2 text-[10px] text-muted sm:px-4 sm:py-2.5 sm:text-[11px]">
        <Clock className="h-3.5 w-3.5 shrink-0 opacity-70" />
        <span className="truncate">{chart.updated}</span>
      </div>
    </Link>
  );
}

export function DashboardStatsPanel({
  activeQuotes,
  activeShipments,
  outstandingInvoices,
  quoteTrend,
  shipmentTrend,
  invoiceTrend,
  quoteUpdated,
  shipmentUpdated,
  invoiceUpdated,
}: DashboardStatsPanelProps) {
  const metrics: MetricConfig[] = [
    {
      label: "Active quotes",
      value: activeQuotes,
      href: "/dashboard/quotes",
      icon: FileText,
      change: periodChange(quoteTrend),
    },
    {
      label: "Active shipments",
      value: activeShipments,
      href: "/dashboard/shipments",
      icon: Package,
      change: periodChange(shipmentTrend),
    },
    {
      label: "Outstanding invoices",
      value: outstandingInvoices,
      href: "/dashboard/invoices",
      icon: CreditCard,
      change: periodChange(invoiceTrend),
    },
  ];

  const charts: ChartConfig[] = [
    {
      title: "Quote activity",
      subtitle: "Last 7 days",
      href: "/dashboard/quotes",
      updated: quoteUpdated,
      chart: "bar",
      color: "#16a34a",
      trend: quoteTrend,
    },
    {
      title: "Shipment volume",
      subtitle: "Monthly cargo",
      href: "/dashboard/shipments",
      updated: shipmentUpdated,
      chart: "line",
      color: "#2563eb",
      trend: shipmentTrend,
    },
    {
      title: "Invoice trend",
      subtitle: "Outstanding billing",
      href: "/dashboard/invoices",
      updated: invoiceUpdated,
      chart: "line",
      color: "#059669",
      trend: invoiceTrend,
    },
  ];

  return (
    <section aria-label="Account overview" className="space-y-3 sm:space-y-4">
      <div className="grid grid-cols-2 gap-3 sm:gap-4 xl:grid-cols-3">
        {metrics.map((metric, index) => (
          <StatMetricCard
            key={metric.href}
            metric={metric}
            className={cn(index === 2 && "col-span-2 xl:col-span-1")}
          />
        ))}
      </div>

      <div className="grid grid-cols-2 gap-3 sm:gap-4 xl:grid-cols-3">
        {charts.map((chart, index) => (
          <StatChartCard
            key={chart.href}
            chart={chart}
            className={cn(index === 2 && "col-span-2 xl:col-span-1")}
          />
        ))}
      </div>
    </section>
  );
}
