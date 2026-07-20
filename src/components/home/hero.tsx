import Link from "next/link";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-navy-950">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-gold-500/10 via-transparent to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold-500/30 to-transparent" />

      <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8 lg:py-32">
        <div className="max-w-3xl">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-gold-500/30 bg-gold-500/10 px-4 py-1.5 text-sm text-gold-400">
            <span className="h-2 w-2 rounded-full bg-gold-400 animate-pulse" />
            China → Ghana · USA · UK · Europe · Africa · Australia
          </div>

          <h1 className="text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
            Ship from China.{" "}
            <span className="text-gold-400">Anywhere in the world.</span>
          </h1>

          <p className="mt-6 text-lg leading-relaxed text-slate-300 sm:text-xl">
            KWAYEB LOGISTICS connects international customers — especially across
            Europe and Africa — with reliable shipping, product sourcing, and
            shipment tracking from China to your doorstep.
          </p>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <Link
              href="/source"
              className="inline-flex items-center justify-center rounded-lg bg-gold-500 px-8 py-3.5 text-base font-semibold text-navy-950 transition hover:bg-gold-400"
            >
              Request a Quote
            </Link>
            <Link
              href="/track"
              className="inline-flex items-center justify-center rounded-lg border border-white/20 px-8 py-3.5 text-base font-semibold text-white transition hover:border-gold-500/50 hover:bg-white/5"
            >
              Track Your Shipment
            </Link>
          </div>
        </div>

        <div className="mt-16 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {[
            { value: "50+", label: "Countries served" },
            { value: "24/7", label: "Shipment tracking" },
            { value: "100%", label: "Sourcing support" },
            { value: "Air & Sea", label: "Freight options" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="rounded-xl border border-white/10 bg-white/5 p-4 text-center backdrop-blur-sm"
            >
              <p className="text-2xl font-bold text-gold-400">{stat.value}</p>
              <p className="mt-1 text-xs text-slate-400">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
