import type { Metadata } from "next";
import { TrackingForm } from "@/components/track/tracking-form";

export const metadata: Metadata = {
  title: "Track Shipment",
  description: "Track your KWAYEB LOGISTICS shipment from China to your destination in real time.",
};

export default function TrackPage() {
  return (
    <div className="bg-slate-50 py-16 dark:bg-navy-900">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-navy-950 dark:text-white sm:text-4xl">
            Track Your Shipment
          </h1>
          <p className="mt-4 text-slate-600 dark:text-slate-400">
            Enter your tracking ID to see the latest status of your shipment
            from China to your destination.
          </p>
        </div>

        <div className="mt-10 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-navy-950 sm:p-8">
          <TrackingForm />
        </div>
      </div>
    </div>
  );
}
