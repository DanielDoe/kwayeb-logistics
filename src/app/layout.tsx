import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { SITE } from "@/lib/constants";
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} h-full`}>
      <body className="min-h-full flex flex-col bg-white text-navy-950 antialiased dark:bg-navy-950 dark:text-white">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
