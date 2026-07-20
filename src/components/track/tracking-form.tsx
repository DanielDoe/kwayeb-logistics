"use client";

import { useState, useTransition } from "react";
import { Loader2, MapPin, Package, Search } from "lucide-react";
import { trackShipment } from "@/lib/actions/tracking";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

type TrackingData = {
  trackingId: string;
  status: string;
  origin: string;
  destination: string;
  estimatedDelivery: string | null;
  events: { date: string; location: string; status: string }[];
};

export function TrackingForm({ initialTrackingId = "" }: { initialTrackingId?: string }) {
  const [trackingId, setTrackingId] = useState(initialTrackingId);
  const [result, setResult] = useState<TrackingData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setResult(null);

    startTransition(async () => {
      const response = await trackShipment(trackingId);

      if (response.success) {
        setResult(response.shipment);
      } else {
        setError(response.error);
      }
    });
  }

  return (
    <div>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 sm:flex-row">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
          <Input
            value={trackingId}
            onChange={(e) => setTrackingId(e.target.value)}
            placeholder="Enter tracking ID (e.g. KWY-2026-001)"
            className="pl-11"
            required
          />
        </div>
        <Button type="submit" disabled={isPending} className="sm:min-w-[140px]">
          {isPending ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Searching...
            </>
          ) : (
            "Track"
          )}
        </Button>
      </form>

      <p className="mt-3 text-sm text-muted">
        Demo: try{" "}
        <button
          type="button"
          onClick={() => setTrackingId("KWY-2026-001")}
          className="rounded bg-surface px-2 py-0.5 font-mono text-accent-text hover:bg-surface-hover"
        >
          KWY-2026-001
        </button>
      </p>

      {error && (
        <div className="mt-6 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-600 dark:text-red-300">
          {error}
        </div>
      )}

      {result && (
        <Card className="mt-8 overflow-hidden">
          <CardContent className="p-0">
            <div className="border-b border-border bg-gradient-to-r from-accent-soft to-transparent p-6">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <p className="text-xs font-medium uppercase tracking-widest text-muted">
                    Tracking ID
                  </p>
                  <p className="mt-1 font-mono text-lg font-bold text-foreground">
                    {result.trackingId}
                  </p>
                </div>
                <Badge variant="amber">{result.status}</Badge>
              </div>

              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <div className="flex items-start gap-3">
                  <MapPin className="mt-0.5 h-4 w-4 text-amber-500" />
                  <div>
                    <p className="text-xs text-muted">Origin</p>
                    <p className="font-medium text-foreground">{result.origin}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Package className="mt-0.5 h-4 w-4 text-amber-500" />
                  <div>
                    <p className="text-xs text-muted">Destination</p>
                    <p className="font-medium text-foreground">{result.destination}</p>
                  </div>
                </div>
              </div>

              {result.estimatedDelivery && (
                <p className="mt-4 text-sm text-emerald-600 dark:text-emerald-400">
                  Est. delivery: {result.estimatedDelivery}
                </p>
              )}
            </div>

            <div className="p-6">
              <h3 className="text-xs font-semibold uppercase tracking-widest text-muted">
                Shipment Timeline
              </h3>
              <ol className="mt-6 space-y-0">
                {result.events.map((event, i) => (
                  <li key={i} className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div
                        className={`h-3 w-3 rounded-full ring-4 ring-background ${
                          i === result.events.length - 1
                            ? "bg-amber-500 shadow-lg shadow-amber-500/50"
                            : "bg-border"
                        }`}
                      />
                      {i < result.events.length - 1 && (
                        <div className="w-px flex-1 bg-gradient-to-b from-border to-transparent py-1" style={{ minHeight: "2rem" }} />
                      )}
                    </div>
                    <div className="pb-8">
                      <p className="font-medium text-foreground">{event.status}</p>
                      <p className="mt-0.5 text-xs text-muted">
                        {event.date} · {event.location}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
