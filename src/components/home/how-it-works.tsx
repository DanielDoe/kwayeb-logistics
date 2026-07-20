import Image from "next/image";
import { HOW_IT_WORKS } from "@/lib/constants";
import { HowItWorksSteps } from "@/components/home/how-it-works-steps";
import { HowItWorksTrustBar } from "@/components/home/how-it-works-trust-bar";
import { ScrollReveal } from "@/components/ui/scroll-reveal";

export function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="relative overflow-hidden bg-white py-14 scroll-mt-20 sm:py-16 lg:py-20"
    >
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <Image
          src="/images/how-it-works-map-bg.png"
          alt=""
          fill
          className="object-cover object-center opacity-[0.55] sm:opacity-[0.62]"
          sizes="100vw"
          priority={false}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-white/35 via-white/20 to-white/75" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <ScrollReveal variant="fade-up">
          <div className="mx-auto w-full max-w-3xl text-center">
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#ff6600] sm:text-xs">
              How we work
            </p>

            <h2 className="mt-3 text-center text-[1.75rem] font-bold leading-tight tracking-tight text-[#0a1d37] sm:mt-4 sm:text-4xl lg:text-[2.375rem]">
              From China to your country in{" "}
              <span className="text-[#ff6600]">4 simple steps</span>
            </h2>

            <p className="mx-auto mt-4 max-w-2xl text-center text-[15px] leading-[1.7] text-[#64748b] sm:mt-5 sm:text-base">
              Whether you need products sourced or goods shipped, we handle the entire journey — so
              you can focus on growing your business.
            </p>
          </div>
        </ScrollReveal>

        <HowItWorksSteps steps={HOW_IT_WORKS} />

        <ScrollReveal variant="fade-up" delay={150}>
          <HowItWorksTrustBar />
        </ScrollReveal>
      </div>
    </section>
  );
}
