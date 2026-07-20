import type { Metadata } from "next";
import { SourcingForm } from "@/components/source/sourcing-form";

export const metadata: Metadata = {
  title: "Source & Quote",
  description:
    "Tell us what you need from China. KWAYEB LOGISTICS sources products and handles shipping to your country.",
};

export default function SourcePage() {
  return (
    <div className="bg-slate-50 py-16 dark:bg-navy-900">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-navy-950 dark:text-white sm:text-4xl">
            What do you need from China?
          </h1>
          <p className="mt-4 text-slate-600 dark:text-slate-400">
            Tell us what products you&apos;re looking for and where you need them
            shipped. We&apos;ll source from verified suppliers and handle the
            logistics.
          </p>
        </div>

        <div className="mt-10 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-navy-950 sm:p-8">
          <SourcingForm />
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          {[
            { title: "Free quote", desc: "No obligation pricing within 24 hours" },
            { title: "Verified suppliers", desc: "Quality-checked manufacturers in China" },
            { title: "End-to-end service", desc: "From sourcing to your doorstep" },
          ].map((item) => (
            <div
              key={item.title}
              className="rounded-xl border border-slate-200 bg-white p-4 text-center dark:border-white/10 dark:bg-navy-950"
            >
              <p className="font-semibold text-navy-950 dark:text-white">{item.title}</p>
              <p className="mt-1 text-sm text-slate-500">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
