export type ColorScheme = "amber" | "navy" | "ocean" | "emerald" | "violet";

export const SCHEME_STORAGE_KEY = "kwayeb-scheme";

export interface ColorSchemeOption {
  id: ColorScheme;
  label: string;
  description: string;
  swatch: string;
  swatchSecondary: string;
}

export const COLOR_SCHEMES: ColorSchemeOption[] = [
  {
    id: "amber",
    label: "Amber",
    description: "Warm gold — current default",
    swatch: "#f59e0b",
    swatchSecondary: "#0ea5e9",
  },
  {
    id: "navy",
    label: "Navy & Orange",
    description: "Official Kwayeb brand palette",
    swatch: "#0a1d37",
    swatchSecondary: "#ff6600",
  },
  {
    id: "ocean",
    label: "Ocean",
    description: "Cool cyan — maritime & global",
    swatch: "#0891b2",
    swatchSecondary: "#0284c7",
  },
  {
    id: "emerald",
    label: "Emerald",
    description: "Fresh green — reliable & clean",
    swatch: "#059669",
    swatchSecondary: "#10b981",
  },
  {
    id: "violet",
    label: "Violet",
    description: "Modern premium logistics",
    swatch: "#7c3aed",
    swatchSecondary: "#a78bfa",
  },
];

export function isColorScheme(value: string | null): value is ColorScheme {
  return COLOR_SCHEMES.some((s) => s.id === value);
}

export function getStoredColorScheme(): ColorScheme {
  if (typeof window === "undefined") return "navy";
  const stored = localStorage.getItem(SCHEME_STORAGE_KEY);
  return isColorScheme(stored) ? stored : "navy";
}
