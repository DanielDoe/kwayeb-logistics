import { cn } from "@/lib/utils";
import type { ShipmentDetail } from "@/lib/admin/workspace-demo-data";

interface AdminShipmentTimelineProps {
  steps: ShipmentDetail["timeline"];
}

export function AdminShipmentTimeline({ steps }: AdminShipmentTimelineProps) {
  return (
    <div className="rounded-xl border border-border bg-white p-5 shadow-sm">
      <div className="space-y-0">
        {steps.map((step, index) => (
          <div key={step.label} className="flex gap-4">
            <div className="flex flex-col items-center">
              <div
                className={cn(
                  "flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-bold",
                  step.state === "done" && "bg-emerald-500 text-white",
                  step.state === "current" && "bg-[#ff6600] text-white ring-4 ring-[#ff6600]/20",
                  step.state === "pending" && "border-2 border-border bg-white text-muted",
                )}
              >
                {step.state === "done" ? "✓" : step.state === "current" ? "●" : "○"}
              </div>
              {index < steps.length - 1 ? (
                <div
                  className={cn(
                    "my-1 w-0.5 flex-1 min-h-[2rem]",
                    step.state === "done" ? "bg-emerald-500" : "bg-border",
                  )}
                />
              ) : null}
            </div>
            <div className={cn("pb-6", index === steps.length - 1 && "pb-0")}>
              <p
                className={cn(
                  "text-sm font-semibold",
                  step.state === "pending" ? "text-muted" : "text-foreground",
                  step.state === "current" && "text-[#ff6600]",
                )}
              >
                {step.label}
                {step.state === "current" ? (
                  <span className="ml-2 text-xs font-normal text-muted">Current</span>
                ) : null}
              </p>
              {step.date ? <p className="mt-0.5 text-xs text-muted">{step.date}</p> : null}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
