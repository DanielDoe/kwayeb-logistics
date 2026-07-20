import Link from "next/link";

export function CtaBanner() {
  return (
    <section className="bg-gradient-to-r from-gold-500 to-gold-600 py-16">
      <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-navy-950 sm:text-4xl">
          Ready to ship from China?
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-navy-900/80">
          Tell us what products you need or what you want to ship. Our team will
          respond with a quote and timeline within 24 hours.
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link
            href="/source"
            className="inline-flex rounded-lg bg-navy-950 px-8 py-3.5 text-base font-semibold text-white transition hover:bg-navy-900"
          >
            Submit Sourcing Request
          </Link>
          <Link
            href="/routes"
            className="inline-flex rounded-lg border-2 border-navy-950 px-8 py-3.5 text-base font-semibold text-navy-950 transition hover:bg-navy-950/10"
          >
            Explore Routes
          </Link>
        </div>
      </div>
    </section>
  );
}
