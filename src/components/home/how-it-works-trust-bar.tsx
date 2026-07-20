import { Clock, Globe2, Headphones, Shield } from "lucide-react";

const TRUST_ITEMS = [
  {
    icon: Shield,
    title: "Safe & Secure",
    caption: "Your cargo is in safe hands",
  },
  {
    icon: Globe2,
    title: "Global Coverage",
    caption: "Delivering to 200+ countries",
  },
  {
    icon: Clock,
    title: "Real-time Updates",
    caption: "Stay informed at every step",
  },
  {
    icon: Headphones,
    title: "Expert Support",
    caption: "Our team is always here for you",
  },
] as const;

export function HowItWorksTrustBar() {
  return (
    <div className="mt-10 rounded-[14px] border border-[#eef2f6] bg-white px-4 py-5 shadow-[0_6px_24px_-10px_rgba(10,29,55,0.1)] sm:mt-12 sm:px-6 sm:py-6 lg:px-8">
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:gap-3">
        {TRUST_ITEMS.map((item) => (
          <div key={item.title} className="flex items-center gap-3.5">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#0a1d37] text-white">
              <item.icon className="h-[18px] w-[18px]" strokeWidth={1.75} />
            </div>
            <div className="min-w-0 text-left">
              <p className="text-[13px] font-bold leading-tight text-[#0a1d37] sm:text-sm">
                {item.title}
              </p>
              <p className="mt-0.5 text-[11px] leading-snug text-[#64748b] sm:text-xs">
                {item.caption}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
