import type { Metadata } from "next";
import Script from "next/script";
import { Inter } from "next/font/google";
import "./globals.css";
import { Sidebar } from "@/components/Sidebar";
import { Footer } from "@/components/Footer";
import { CookieConsent } from "@/components/CookieConsent";
import { AdBanner } from "@/components/ads/AdBanner";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "TopCalcBox - Fast & Accurate Online Calculators",
  description: "A premium suite of online calculators for everyday mathematics and finance.",
  icons: {
    icon: "/icon.png",
    apple: "/icon.png",
  },
  openGraph: {
    type: "website",
    siteName: "TopCalcBox",
    title: "TopCalcBox - Fast & Accurate Online Calculators",
    description: "A premium suite of online calculators for everyday mathematics and finance.",
    images: [{ url: "https://topcalcbox.com/icon.png" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "TopCalcBox - Fast & Accurate Online Calculators",
    description: "A premium suite of online calculators for everyday mathematics and finance.",
    images: ["https://topcalcbox.com/icon.png"],
  },
  other: {
    monetag: "d5158a86fb9002057fbb3a8f6f37e1ba"
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-slate-50 text-slate-900 min-h-screen selection:bg-blue-500/20`}>
        <div className="flex h-screen overflow-hidden">
          <Script id="monetag-push" strategy="afterInteractive">
            {`(function(s){s.dataset.zone='11915714',s.src='https://nap5k.com/tag.min.js'})([document.documentElement, document.body].filter(Boolean).pop().appendChild(document.createElement('script')))`}
          </Script>
          <Script id="monetag-vignette" strategy="afterInteractive">
            {`(function(s){s.dataset.zone='11915722',s.src='https://n6wxm.com/vignette.min.js'})([document.documentElement, document.body].filter(Boolean).pop().appendChild(document.createElement('script')))`}
          </Script>
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
          <main className="flex-1 md:ml-64 h-full overflow-y-auto relative flex flex-col bg-white pt-16 md:pt-0">
            {/* Vibrant Colorful Background Glows */}
            <div className="fixed top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none opacity-60">
              <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-pink-300/30 rounded-full blur-[120px]" />
              <div className="absolute top-[20%] right-[-10%] w-[40%] h-[40%] bg-blue-300/30 rounded-full blur-[100px]" />
              <div className="absolute bottom-[-10%] left-[20%] w-[60%] h-[60%] bg-purple-300/20 rounded-full blur-[140px]" />
              <div className="absolute bottom-[10%] right-[10%] w-[30%] h-[30%] bg-yellow-200/30 rounded-full blur-[100px]" />
            </div>
            
            <div className="relative z-10 px-6 md:px-10 pt-6 md:pt-10 pb-0 max-w-7xl mx-auto flex-1 w-full">
              {children}

              {/* Adsterra Banner (300x250) - Bottom of Page */}
              <div className="mt-12 mb-6 flex justify-center w-full">
                <AdBanner size="300x250" />
              </div>
            </div>
            
            <div className="relative z-10">
              <Footer />
            </div>
            
            {/* AdSense Compliance */}
            <CookieConsent />
          </main>
        </div>
      </body>
    </html>
  );
}
