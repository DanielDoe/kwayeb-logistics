"use client";

import { useState, useTransition } from "react";
import { CircleCheck, Loader2 } from "lucide-react";
import { trackShipment } from "@/lib/actions/tracking";

export function HeroTrackingForm() {
  const [trackingId, setTrackingId] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    startTransition(async () => {
      const response = await trackShipment(trackingId);
      if (response.success) {
        window.location.href = `/track?id=${encodeURIComponent(trackingId)}`;
      } else {
        setError(response.error);
      }
    });
  }

  return (
    <div>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3 sm:flex-row sm:items-stretch">
        <div className="relative flex-1">
          <CircleCheck className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[#94a3b8]" />
          <input
            value={trackingId}
            onChange={(e) => setTrackingId(e.target.value)}
            placeholder="Enter your tracking number"
            required
            className="h-[52px] w-full rounded-lg border border-slate-200 bg-white py-3 pl-12 pr-4 text-[#0a1d37] placeholder:text-[#94a3b8] focus:border-[#ff6600]/50 focus:outline-none focus:ring-2 focus:ring-[#ff6600]/15"
          />
        </div>
        <button
          type="submit"
          disabled={isPending}
          className="inline-flex h-[52px] min-w-[140px] items-center justify-center gap-2 rounded-lg bg-[#ff6600] px-8 text-[15px] font-semibold text-white transition hover:bg-[#e55a00] disabled:opacity-60"
        >
          {isPending ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Searching...
            </>
          ) : (
            "Track Now"
          )}
        </button>
      </form>

      <p className="mt-3 text-sm text-[#64748b]">
        Multiple tracking numbers can be separated by commas.
      </p>

      {error && (
        <p className="mt-3 rounded-lg border border-red-200 bg-red-50 px-4 py-2 text-sm text-red-600">
          {error}
        </p>
      )}
    </div>
  );
}
