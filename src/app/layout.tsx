import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Sidebar } from "@/components/Sidebar";
import { Footer } from "@/components/Footer";
import { CookieConsent } from "@/components/CookieConsent";
import { PwaHandler } from "@/components/PwaHandler";
import { ThirdPartyScripts } from "@/components/ThirdPartyScripts";

const inter = Inter({ subsets: ["latin"], display: "swap", preload: true });

export const viewport: Viewport = {
  themeColor: "#ffffff",
  colorScheme: "light",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: "TopCalcBox - Free Online Calculators",
  description: "Use free online calculators for finance, math, education, age, dates, health, shopping, and everyday calculations. Get fast and accurate results.",
  icons: {
    icon: "/icon-96.webp",
    apple: "/icon-96.webp",
  },
  openGraph: {
    type: "website",
    siteName: "TopCalcBox",
    title: "TopCalcBox - Free Online Calculators",
    description: "Use free online calculators for finance, math, education, age, dates, health, shopping, and everyday calculations. Get fast and accurate results.",
    images: [{ url: "https://topcalcbox.com/icon.webp" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "TopCalcBox - Free Online Calculators",
    description: "Use free online calculators for finance, math, education, age, dates, health, shopping, and everyday calculations. Get fast and accurate results.",
    images: ["https://topcalcbox.com/icon.webp"],
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "TopCalcBox",
  },
  other: {
    "google-adsense-account": "ca-pub-9267692450432886",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-slate-50 text-slate-900 min-h-screen selection:bg-blue-500/20 antialiased`}>
        <div className="min-h-screen flex flex-col md:flex-row">
          {/* Deferred non-blocking Analytics & AdSense */}
          <ThirdPartyScripts />

          {/* Structured Data */}
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "WebSite",
                "name": "TopCalcBox",
                "url": "https://topcalcbox.com",
                "potentialAction": {
                  "@type": "SearchAction",
                  "target": "https://topcalcbox.com/search?q={search_term_string}",
                  "query-input": "required name=search_term_string"
                }
              })
            }}
          />
          <Sidebar />
          <main className="flex-1 md:ml-64 min-h-screen relative flex flex-col bg-white pt-16 md:pt-0">
            {/* GPU-efficient subtle background ambiance (zero CPU/blur re-rasterization) */}
            <div 
              aria-hidden="true"
              className="fixed inset-0 -z-10 pointer-events-none opacity-40 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(244,114,182,0.12),rgba(255,255,255,0)),radial-gradient(ellipse_60%_60%_at_100%_50%,rgba(147,197,253,0.12),rgba(255,255,255,0))]" 
            />
            
            <div className="relative z-10 px-4 sm:px-6 md:px-10 pt-4 sm:pt-6 md:pt-10 pb-0 max-w-7xl mx-auto flex-1 w-full">
              {children}
            </div>
            
            <div className="relative z-10">
              <Footer />
            </div>
            
            {/* AdSense Compliance */}
            <CookieConsent />
            
            {/* Dynamic PWA Installer & Launch Handler */}
            <PwaHandler />
          </main>
        </div>
      </body>
    </html>
  );
}
