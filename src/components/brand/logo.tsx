import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  showText?: boolean;
  size?: "sm" | "md";
  variant?: "default" | "light";
}

export function Logo({ className, showText = true, size = "md", variant = "default" }: LogoProps) {
  const iconSize = size === "sm" ? "h-8 w-8" : "h-10 w-10";
  const textSize = size === "sm" ? "text-[15px]" : "text-xl";
  const isLight = variant === "light";

  return (
    <div className={cn("flex items-center gap-2.5", className)}>
      <div className={cn("relative shrink-0", iconSize)} aria-hidden>
        <svg viewBox="0 0 40 40" className="h-full w-full">
          {/* Stylized K — orange stem + navy wing */}
          <path
            d="M8 6h7.5v28H8V6Z"
            fill="#ff6600"
          />
          <path
            d="M18 20 L32 6h-8.5L15.5 20 23.5 34H32L18 20Z"
            fill={isLight ? "#ffffff" : "#0a1d37"}
          />
        </svg>
      </div>
      {showText && (
        <p
          className={cn(
            "font-bold leading-none tracking-tight",
            textSize,
            isLight ? "text-white" : "text-[#0a1d37]",
          )}
        >
          Kwayeb <span className="text-[#ff6600]">Logistics</span>
        </p>
      )}
    </div>
  );
}
