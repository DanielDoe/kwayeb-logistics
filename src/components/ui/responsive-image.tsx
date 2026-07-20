import { getImageProps } from "next/image";
import { cn } from "@/lib/utils";

interface ArtDirectedBackgroundProps {
  alt?: string;
  className?: string;
  imgClassName?: string;
  priority?: boolean;
  /** Desktop / default landscape source */
  desktop: string;
  /** Portrait-friendly crop for phones */
  mobile: string;
  /** Optional mid-size landscape for tablets */
  tablet?: string;
}

/**
 * Art-directed full-bleed background: serves different crops per breakpoint
 * instead of relying on object-position alone.
 */
export function ArtDirectedBackground({
  alt = "",
  className,
  imgClassName,
  priority = false,
  desktop,
  mobile,
  tablet,
}: ArtDirectedBackgroundProps) {
  const common = {
    alt,
    sizes: "100vw",
    priority,
  } as const;

  const {
    props: { srcSet: mobileSrcSet },
  } = getImageProps({
    ...common,
    width: 900,
    height: 1200,
    src: mobile,
  });

  const tabletProps = tablet
    ? getImageProps({
        ...common,
        width: 1280,
        height: 853,
        src: tablet,
      })
    : null;

  const {
    props: { srcSet: desktopSrcSet, ...desktopRest },
  } = getImageProps({
    ...common,
    width: 1920,
    height: 1280,
    src: desktop,
  });

  return (
    <picture className={cn("absolute inset-0 block h-full w-full", className)}>
      <source media="(max-width: 639px)" srcSet={mobileSrcSet} sizes="100vw" />
      {tabletProps && (
        <source
          media="(min-width: 640px) and (max-width: 1023px)"
          srcSet={tabletProps.props.srcSet}
          sizes="100vw"
        />
      )}
      {/* eslint-disable-next-line @next/next/no-img-element -- art-directed via getImageProps */}
      <img
        {...desktopRest}
        srcSet={desktopSrcSet}
        alt={alt}
        className={cn("h-full w-full object-cover object-center", imgClassName)}
        style={{
          ...desktopRest.style,
          width: "100%",
          height: "100%",
          position: "absolute",
          inset: 0,
        }}
      />
    </picture>
  );
}

interface ResponsiveFillImageProps {
  src: string;
  alt: string;
  className?: string;
  sizes: string;
  priority?: boolean;
  /** Prefer center / left / right / top / bottom framing */
  position?: "center" | "left" | "right" | "top" | "bottom";
}

/**
 * Fill image inside an aspect-ratio / sized parent with stable object-fit.
 * Pass a .webp path when available so Next can optimize further.
 */
export function ResponsiveFillImage({
  src,
  alt,
  className,
  sizes,
  priority = false,
  position = "center",
}: ResponsiveFillImageProps) {
  const positionClass =
    position === "left"
      ? "object-left"
      : position === "right"
        ? "object-right"
        : position === "top"
          ? "object-top"
          : position === "bottom"
            ? "object-bottom"
            : "object-center";

  const { props } = getImageProps({
    src,
    alt,
    fill: true,
    sizes,
    priority,
  });

  // eslint-disable-next-line @next/next/no-img-element
  return (
    <img
      {...props}
      alt={alt}
      className={cn("object-cover", positionClass, className)}
    />
  );
}
