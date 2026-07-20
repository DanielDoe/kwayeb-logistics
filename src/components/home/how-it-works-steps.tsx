import {
  ChevronRight,
  ClipboardPen,
  PackageCheck,
  Ship,
  Warehouse,
} from "lucide-react";
import { ScrollReveal } from "@/components/ui/scroll-reveal";

const STEP_ICONS = [ClipboardPen, Warehouse, Ship, PackageCheck] as const;

interface Step {
  step: string;
  title: string;
  description: string;
}

interface HowItWorksStepsProps {
  steps: readonly Step[];
}

export function HowItWorksSteps({ steps }: HowItWorksStepsProps) {
  return (
    <div className="mt-10 sm:mt-12 lg:mt-14">
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
        {steps.map((item, i) => (
          <div key={item.step} className="relative flex h-full items-stretch">
            <ScrollReveal className="min-w-0 flex-1" delay={i * 90} variant="fade-up">
              <StepCard item={item} icon={STEP_ICONS[i]} />
            </ScrollReveal>

            {i < steps.length - 1 && (
              <div
                className="absolute -right-2.5 top-1/2 z-10 hidden -translate-y-1/2 items-center lg:flex"
                aria-hidden
              >
                <div className="flex h-[22px] w-[22px] items-center justify-center rounded-full bg-[#ff6600] shadow-sm">
                  <ChevronRight className="h-3 w-3 text-white" strokeWidth={3} />
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function StepCard({
  item,
  icon: Icon,
}: {
  item: Step;
  icon: (typeof STEP_ICONS)[number];
}) {
  return (
    <div className="relative flex h-full flex-col items-center rounded-[14px] border border-[#eef2f6] bg-white px-4 pb-7 pt-7 text-center shadow-[0_6px_24px_-8px_rgba(10,29,55,0.1)] transition duration-300 hover:shadow-[0_12px_32px_-12px_rgba(10,29,55,0.16)] sm:px-5 sm:pt-8">
      <div className="flex h-[58px] w-[58px] items-center justify-center rounded-full bg-white shadow-[0_4px_14px_rgba(10,29,55,0.1)] ring-1 ring-[#f1f5f9]">
        <Icon className="h-[26px] w-[26px] text-[#ff6600]" strokeWidth={1.6} />
      </div>

      <p className="mt-4 text-[13px] font-bold tracking-wide text-[#ff6600]">{item.step}</p>

      <h3 className="mt-1.5 text-[15px] font-bold leading-snug text-[#0a1d37] sm:text-base">
        {item.title}
      </h3>

      <p className="mt-2.5 text-[13px] leading-[1.65] text-[#64748b]">{item.description}</p>

      <span className="absolute bottom-0 left-1/2 h-[3px] w-10 -translate-x-1/2 rounded-full bg-[#ff6600]" />
    </div>
  );
}
