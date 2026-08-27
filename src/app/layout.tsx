import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { DashboardChromeProvider } from "@/components/dashboard/dashboard-chrome";
import { ThemeProvider } from "@/components/theme/theme-provider";
import { getUserProfile } from "@/lib/supabase/server-auth";
import { SITE } from "@/lib/constants";
import { THEME_STORAGE_KEY, SCHEME_STORAGE_KEY } from "@/lib/theme";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: `${SITE.name} | China to World Shipping & Sourcing`,
    template: `%s | ${SITE.name}`,
  },
  description:
    "KWAYEB LOGISTICS connects international customers with reliable shipping and product sourcing from China to Ghana, USA, UK, Europe, Africa, and Australia.",
  keywords: [
    "China shipping",
    "logistics",
    "product sourcing",
    "China to Ghana",
    "China to Europe",
    "China to Africa",
    "freight forwarding",
  ],
  openGraph: {
    title: SITE.name,
    description: SITE.tagline,
    url: `https://${SITE.domain}`,
    siteName: SITE.name,
    type: "website",
  },
};

const themeScript = `(function(){try{var m=localStorage.getItem("${THEME_STORAGE_KEY}");if(m==="dark")document.documentElement.classList.add("dark");var s=localStorage.getItem("${SCHEME_STORAGE_KEY}");document.documentElement.setAttribute("data-scheme",s||"navy")}catch(e){document.documentElement.setAttribute("data-scheme","navy")}})()`;

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const profile = await getUserProfile();

  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} h-full`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="min-h-full flex flex-col bg-background text-foreground antialiased">
        <div className="pointer-events-none fixed inset-0 grid-bg opacity-30 dark:opacity-25" aria-hidden />
        <ThemeProvider>
          <DashboardChromeProvider>
            <Header
              user={
                profile
                  ? {
                      fullName: profile.full_name,
                      email: profile.email,
                      role: profile.role,
                      company: profile.company,
                    }
                  : null
              }
            />
            <main className="relative flex-1">{children}</main>
            <Footer />
          </DashboardChromeProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
