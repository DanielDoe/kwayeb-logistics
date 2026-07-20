"use client";

import { createContext, useContext, useEffect, useState } from "react";
import {
  applyAppearance,
  getStoredColorScheme,
  getStoredTheme,
  type ColorScheme,
  type Theme,
} from "@/lib/theme";

interface ThemeContextValue {
  theme: Theme;
  colorScheme: ColorScheme;
  setTheme: (theme: Theme) => void;
  setColorScheme: (scheme: ColorScheme) => void;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>("light");
  const [colorScheme, setColorSchemeState] = useState<ColorScheme>("amber");

  useEffect(() => {
    const storedTheme = getStoredTheme();
    const storedScheme = getStoredColorScheme();
    setThemeState(storedTheme);
    setColorSchemeState(storedScheme);
    applyAppearance(storedTheme, storedScheme);
  }, []);

  function setTheme(next: Theme) {
    setThemeState(next);
    applyAppearance(next, colorScheme);
  }

  function setColorScheme(next: ColorScheme) {
    setColorSchemeState(next);
    applyAppearance(theme, next);
  }

  function toggleTheme() {
    setTheme(theme === "light" ? "dark" : "light");
  }

  return (
    <ThemeContext.Provider
      value={{ theme, colorScheme, setTheme, setColorScheme, toggleTheme }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within ThemeProvider");
  }
  return context;
}
