"use client";

import { useState } from "react";

const DEMO_TRACKING = {
  "KWY-2026-001": {
    status: "In Transit",
    origin: "Guangzhou, China",
    destination: "Accra, Ghana",
    estimatedDelivery: "July 28, 2026",
    events: [
      { date: "Jul 15, 2026", location: "Guangzhou Warehouse", status: "Order received & consolidated" },
      { date: "Jul 17, 2026", location: "Guangzhou Port", status: "Departed via sea freight" },
      { date: "Jul 19, 2026", location: "Indian Ocean", status: "In transit" },
    ],
  },
};

export function TrackingForm() {
  const [trackingId, setTrackingId] = useState("");
  const [result, setResult] = useState<(typeof DEMO_TRACKING)[keyof typeof DEMO_TRACKING] | null>(null);
  const [notFound, setNotFound] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsLoading(true);
    setNotFound(false);
    setResult(null);

    setTimeout(() => {
      const normalized = trackingId.trim().toUpperCase();
      const data = DEMO_TRACKING[normalized as keyof typeof DEMO_TRACKING];
      if (data) {
        setResult(data);
      } else {
        setNotFound(true);
      }
      setIsLoading(false);
    }, 800);
  }

  return (
    <div>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 sm:flex-row">
        <input
          type="text"
          value={trackingId}
          onChange={(e) => setTrackingId(e.target.value)}
          placeholder="Enter tracking ID (e.g. KWY-2026-001)"
          className="flex-1 rounded-lg border border-slate-300 bg-white px-4 py-3 text-navy-950 placeholder:text-slate-400 focus:border-gold-500 focus:outline-none focus:ring-2 focus:ring-gold-500/20 dark:border-white/20 dark:bg-navy-900 dark:text-white"
          required
        />
        <button
          type="submit"
          disabled={isLoading}
          className="rounded-lg bg-gold-500 px-8 py-3 font-semibold text-navy-950 transition hover:bg-gold-400 disabled:opacity-60"
        >
          {isLoading ? "Searching..." : "Track"}
        </button>
      </form>

      <p className="mt-3 text-sm text-slate-500">
        Demo: try tracking ID <code className="rounded bg-slate-100 px-1.5 py-0.5 text-gold-700 dark:bg-navy-800">KWY-2026-001</code>
      </p>

      {notFound && (
        <div className="mt-6 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700 dark:border-red-900 dark:bg-red-950 dark:text-red-300">
          No shipment found with that tracking ID. Please check and try again, or contact support.
        </div>
      )}

      {result && (
        <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 dark:border-white/10 dark:bg-navy-950">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-sm text-slate-500">Status</p>
              <p className="text-xl font-bold text-gold-600">{result.status}</p>
            </div>
            <div className="rounded-full bg-green-100 px-4 py-1.5 text-sm font-medium text-green-700 dark:bg-green-900/30 dark:text-green-400">
              {result.estimatedDelivery}
            </div>
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div>
              <p className="text-xs uppercase tracking-wider text-slate-500">Origin</p>
              <p className="font-medium text-navy-950 dark:text-white">{result.origin}</p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-wider text-slate-500">Destination</p>
              <p className="font-medium text-navy-950 dark:text-white">{result.destination}</p>
            </div>
          </div>

          <div className="mt-8">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-500">
              Shipment Timeline
            </h3>
            <ol className="mt-4 space-y-4">
              {result.events.map((event, i) => (
                <li key={i} className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className="h-3 w-3 rounded-full bg-gold-500" />
                    {i < result.events.length - 1 && (
                      <div className="mt-1 w-px flex-1 bg-slate-200 dark:bg-white/20" />
                    )}
                  </div>
                  <div className="pb-4">
                    <p className="text-sm font-medium text-navy-950 dark:text-white">{event.status}</p>
                    <p className="text-xs text-slate-500">
                      {event.date} · {event.location}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      )}
    </div>
  );
}
