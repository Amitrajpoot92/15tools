import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Sidebar } from "@/components/Sidebar";
import { Footer } from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "TopCalcBox - Fast & Accurate Online Calculators",
  description: "A premium suite of online calculators for everyday mathematics and finance.",
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
          <Sidebar />
          <main className="flex-1 md:ml-64 h-full overflow-y-auto relative flex flex-col bg-white">
            {/* Vibrant Colorful Background Glows */}
            <div className="fixed top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none opacity-60">
              <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-pink-300/30 rounded-full blur-[120px]" />
              <div className="absolute top-[20%] right-[-10%] w-[40%] h-[40%] bg-blue-300/30 rounded-full blur-[100px]" />
              <div className="absolute bottom-[-10%] left-[20%] w-[60%] h-[60%] bg-purple-300/20 rounded-full blur-[140px]" />
              <div className="absolute bottom-[10%] right-[10%] w-[30%] h-[30%] bg-yellow-200/30 rounded-full blur-[100px]" />
            </div>
            
            <div className="relative z-10 p-6 md:p-10 max-w-7xl mx-auto flex-1 w-full">
              {children}
            </div>
            
            <div className="relative z-10">
              <Footer />
            </div>
          </main>
        </div>
      </body>
    </html>
  );
}
