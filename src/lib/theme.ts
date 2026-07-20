import {
  getStoredColorScheme,
  isColorScheme,
  SCHEME_STORAGE_KEY,
  type ColorScheme,
} from "@/lib/color-schemes";

export type Theme = "light" | "dark";

export const THEME_STORAGE_KEY = "kwayeb-theme";

export function getStoredTheme(): Theme {
  if (typeof window === "undefined") return "light";
  const stored = localStorage.getItem(THEME_STORAGE_KEY);
  return stored === "dark" ? "dark" : "light";
}

export function applyTheme(theme: Theme) {
  document.documentElement.classList.toggle("dark", theme === "dark");
  localStorage.setItem(THEME_STORAGE_KEY, theme);
}

export function applyColorScheme(scheme: ColorScheme) {
  document.documentElement.setAttribute("data-scheme", scheme);
  localStorage.setItem(SCHEME_STORAGE_KEY, scheme);
}

export function applyAppearance(theme: Theme, scheme: ColorScheme) {
  applyTheme(theme);
  applyColorScheme(scheme);
}

export function initAppearanceFromStorage() {
  applyAppearance(getStoredTheme(), getStoredColorScheme());
}

export { getStoredColorScheme, isColorScheme, SCHEME_STORAGE_KEY, type ColorScheme };
