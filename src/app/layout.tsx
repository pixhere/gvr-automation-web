import type { Metadata } from "next";
// Self-hosted via @fontsource (no runtime request to Google Fonts —
// better performance than next/font/google's CDN fetch, and works
// identically in every deployment environment).
import "@fontsource/manrope/500.css";
import "@fontsource/manrope/600.css";
import "@fontsource/manrope/700.css";
import "@fontsource/manrope/800.css";
import "@fontsource/inter/400.css";
import "@fontsource/inter/500.css";
import "@fontsource/inter/600.css";
import "@fontsource/inter/700.css";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CookieBanner } from "@/components/layout/CookieBanner";
import { OrganizationSchema } from "@/components/seo/OrganizationSchema";
import { Analytics } from "@/components/seo/Analytics";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: "GVR Automation | AI Growth Platform for Local Service Businesses",
    template: "%s | GVR Automation",
  },
  description:
    "GVR Automation helps local service businesses capture more leads, respond faster, and automate repetitive work — so you can focus on growing your business, not managing it.",
  openGraph: {
    title: "GVR Automation | AI Growth Platform for Local Service Businesses",
    description:
      "Capture more leads, automate repetitive work, and free up your time. Take the free Business Growth Assessment.",
    url: siteConfig.url,
    siteName: siteConfig.name,
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "GVR Automation | AI Growth Platform for Local Service Businesses",
    description:
      "Capture more leads, automate repetitive work, and free up your time. Take the free Business Growth Assessment.",
  },
  icons: {
    icon: "/icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <OrganizationSchema />
      </head>
      <body className="flex min-h-screen flex-col">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-btn focus:bg-navy focus:px-4 focus:py-3 focus:text-white"
        >
          Skip to main content
        </a>
        <Header />
        <main id="main-content" className="flex-1">
          {children}
        </main>
        <Footer />
        <CookieBanner />
        <Analytics />
      </body>
    </html>
  );
}
