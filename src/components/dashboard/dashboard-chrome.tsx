"use client";

import { createContext, useContext, useMemo, useState, type ReactNode } from "react";

interface DashboardChromeContextValue {
  mobileNavOpen: boolean;
  setMobileNavOpen: (open: boolean) => void;
}

const DashboardChromeContext = createContext<DashboardChromeContextValue | null>(null);

export function DashboardChromeProvider({ children }: { children: ReactNode }) {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  const value = useMemo(
    () => ({ mobileNavOpen, setMobileNavOpen }),
    [mobileNavOpen],
  );

  return <DashboardChromeContext.Provider value={value}>{children}</DashboardChromeContext.Provider>;
}

export function useDashboardChrome() {
  return useContext(DashboardChromeContext);
}
