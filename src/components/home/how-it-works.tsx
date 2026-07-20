import { HOW_IT_WORKS } from "@/lib/constants";

export function HowItWorks() {
  return (
    <section className="bg-slate-50 py-20 dark:bg-navy-900">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-gold-600">
            How we work
          </p>
          <h2 className="mt-2 text-3xl font-bold text-navy-950 dark:text-white sm:text-4xl">
            From China to your country in 4 simple steps
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-slate-600 dark:text-slate-400">
            Whether you need products sourced or goods shipped, we handle the
            entire journey — so you can focus on growing your business.
          </p>
        </div>

        <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {HOW_IT_WORKS.map((item, index) => (
            <div key={item.step} className="relative">
              {index < HOW_IT_WORKS.length - 1 && (
                <div className="absolute left-1/2 top-8 hidden h-px w-full bg-gold-300 lg:block" />
              )}
              <div className="relative rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-navy-950">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-gold-500 text-sm font-bold text-navy-950">
                  {item.step}
                </span>
                <h3 className="mt-4 text-lg font-semibold text-navy-950 dark:text-white">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
