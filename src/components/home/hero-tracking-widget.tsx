"use client";

import { useState, useTransition } from "react";
import { Calculator, HandHelping, Package } from "lucide-react";
import { submitPickupRequest } from "@/lib/actions/estimates";
import { HeroTrackingForm } from "@/components/track/hero-tracking-form";
import { ShippingEstimator } from "@/components/calculator/shipping-estimator";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

const TABS = [
  { id: "track", label: "Track Shipment", icon: Package },
  { id: "estimate", label: "Get an Estimate", icon: Calculator },
  { id: "pickup", label: "Request Pickup", icon: HandHelping },
] as const;

export function HeroTrackingWidget() {
  const [tab, setTab] = useState<(typeof TABS)[number]["id"]>("track");
  const [pickupDone, setPickupDone] = useState(false);
  const [pickupError, setPickupError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  function handlePickup(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setPickupError(null);
    const fd = new FormData(e.currentTarget);
    startTransition(async () => {
      const res = await submitPickupRequest({
        supplierCity: fd.get("supplierCity") as string,
        pickupAddress: fd.get("pickupAddress") as string,
        contactName: fd.get("contactName") as string,
        contactPhone: fd.get("contactPhone") as string,
        preferredDate: (fd.get("preferredDate") as string) || undefined,
        notes: (fd.get("notes") as string) || undefined,
      });
      if (res.success) setPickupDone(true);
      else setPickupError(res.error);
    });
  }

  return (
    <div className="relative z-20 mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
      <div className="overflow-hidden rounded-t-[22px] rounded-b-2xl border border-slate-200/80 bg-white shadow-[0_24px_60px_-20px_rgba(10,29,55,0.3)]">
        <div className="flex overflow-x-auto">
          {TABS.map((t, i) => {
            const active = tab === t.id;
            const isFirst = i === 0;
            const isLast = i === TABS.length - 1;
            return (
              <button
                key={t.id}
                type="button"
                onClick={() => setTab(t.id)}
                className={cn(
                  "relative flex flex-1 items-center justify-center gap-2 whitespace-nowrap px-3 py-4 text-sm font-semibold transition sm:px-6",
                  active
                    ? "bg-white text-[#0a1d37]"
                    : "bg-[#eef1f5] text-[#0a1d37] hover:bg-[#e8ecf1]",
                  !active && !isLast && "border-r border-slate-200/80",
                  isFirst && "rounded-tl-[21px]",
                  isLast && "rounded-tr-[21px]",
                )}
              >
                <t.icon
                  className={cn("h-4 w-4 shrink-0", active ? "text-[#ff6600]" : "text-[#0a1d37]")}
                  strokeWidth={2}
                />
                <span className={cn("truncate", active && "font-bold")}>
                  <span className="sm:hidden">
                    {t.id === "track" ? "Track" : t.id === "estimate" ? "Estimate" : "Pickup"}
                  </span>
                  <span className="hidden sm:inline">{t.label}</span>
                </span>
                {active && (
                  <span className="absolute inset-x-4 bottom-0 h-[3px] rounded-t-full bg-[#ff6600] sm:inset-x-10" />
                )}
              </button>
            );
          })}
        </div>

        <div className="border-t border-slate-100 bg-white p-5 sm:p-6 lg:px-8 lg:py-7">
          <div key={tab} className="animate-[hero-fade-up_0.35s_cubic-bezier(0.22,1,0.36,1)_both]">
            {tab === "track" && <HeroTrackingForm />}
            {tab === "estimate" && <ShippingEstimator />}
            {tab === "pickup" &&
              (pickupDone ? (
                <div className="py-6 text-center">
                  <p className="font-semibold text-[#0a1d37]">Pickup request submitted!</p>
                  <p className="mt-2 text-sm text-[#52667a]">Our team will contact you to confirm.</p>
                </div>
              ) : (
                <form onSubmit={handlePickup} className="grid gap-4 sm:grid-cols-2">
                  {pickupError && (
                    <p className="text-sm text-red-500 sm:col-span-2">{pickupError}</p>
                  )}
                  <Input id="hw-supplierCity" name="supplierCity" label="Supplier city *" required />
                  <Input id="hw-contactName" name="contactName" label="Contact name *" required />
                  <Input id="hw-contactPhone" name="contactPhone" label="Contact phone *" required />
                  <Input id="hw-preferredDate" name="preferredDate" label="Preferred date" type="date" />
                  <div className="sm:col-span-2">
                    <Textarea
                      id="hw-pickupAddress"
                      name="pickupAddress"
                      label="Pickup address *"
                      rows={2}
                      required
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <Button
                      type="submit"
                      disabled={isPending}
                      className="rounded-lg bg-[#ff6600] hover:bg-[#e55a00]"
                    >
                      {isPending ? "Submitting..." : "Submit Pickup Request"}
                    </Button>
                  </div>
                </form>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
