"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import { Calculator, MapPin, PackageSearch } from "lucide-react";
import { submitPickupRequest } from "@/lib/actions/estimates";
import { TrackingForm } from "@/components/track/tracking-form";
import { ShippingEstimator } from "@/components/calculator/shipping-estimator";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { cn } from "@/lib/utils";

const TABS = [
  { id: "track", label: "Track", icon: PackageSearch },
  { id: "estimate", label: "Get Estimate", icon: Calculator },
  { id: "pickup", label: "Request Pickup", icon: MapPin },
] as const;

export function QuickActions() {
  const [tab, setTab] = useState<(typeof TABS)[number]["id"]>("track");
  const [pickupDone, setPickupDone] = useState(false);
  const [pickupError, setPickupError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const activeIndex = TABS.findIndex((t) => t.id === tab);

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
    <section className="relative -mt-4 pb-4 pt-2">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <ScrollReveal variant="scale">
          <div className="premium-card group relative overflow-hidden rounded-3xl shadow-xl shadow-amber-500/5">
            <div className="relative overflow-hidden rounded-3xl border border-border/80 bg-card/95 backdrop-blur-xl">
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-amber-500/40 to-transparent" />

              <div className="border-b border-border/80 p-6 pb-0 sm:p-8 sm:pb-0">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent-text">
                  Quick tools
                </p>
                <div className="relative mt-4 flex gap-1 overflow-x-auto pb-4">
                  <div
                    className="tab-indicator absolute bottom-4 h-9 rounded-xl bg-accent-soft"
                    style={{
                      width: `${100 / TABS.length}%`,
                      transform: `translateX(${activeIndex * 100}%)`,
                    }}
                    aria-hidden
                  />
                  {TABS.map((t) => (
                    <button
                      key={t.id}
                      type="button"
                      onClick={() => setTab(t.id)}
                      className={cn(
                        "relative z-10 flex flex-1 items-center justify-center gap-2 whitespace-nowrap rounded-xl px-4 py-2.5 text-sm font-medium transition-colors duration-300",
                        tab === t.id ? "text-accent-text" : "text-muted hover:text-foreground",
                      )}
                    >
                      <t.icon className="h-4 w-4" />
                      {t.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="p-6 sm:p-8">
                <div
                  key={tab}
                  className="animate-[hero-fade-up_0.4s_cubic-bezier(0.22,1,0.36,1)_both]"
                >
                  {tab === "track" && <TrackingForm />}
                  {tab === "estimate" && <ShippingEstimator />}
                  {tab === "pickup" &&
                    (pickupDone ? (
                      <div className="py-8 text-center">
                        <p className="font-medium text-foreground">Pickup request submitted!</p>
                        <p className="mt-2 text-sm text-muted">Our team will contact you to confirm.</p>
                      </div>
                    ) : (
                      <form onSubmit={handlePickup} className="grid gap-4 sm:grid-cols-2">
                        {pickupError && (
                          <p className="text-sm text-red-500 sm:col-span-2">{pickupError}</p>
                        )}
                        <Input id="supplierCity" name="supplierCity" label="Supplier city *" required />
                        <Input id="contactName" name="contactName" label="Contact name *" required />
                        <Input id="contactPhone" name="contactPhone" label="Contact phone *" required />
                        <Input id="preferredDate" name="preferredDate" label="Preferred date" type="date" />
                        <div className="sm:col-span-2">
                          <Textarea
                            id="pickupAddress"
                            name="pickupAddress"
                            label="Pickup address *"
                            rows={2}
                            required
                          />
                        </div>
                        <div className="flex gap-3 sm:col-span-2">
                          <Button type="submit" disabled={isPending}>
                            {isPending ? "Submitting..." : "Submit Pickup Request"}
                          </Button>
                          <Link href="/login">
                            <Button type="button" variant="secondary">
                              Sign in for faster booking
                            </Button>
                          </Link>
                        </div>
                      </form>
                    ))}
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
