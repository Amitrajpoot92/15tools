"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { X, Cookie } from "lucide-react";

export function CookieConsent() {
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Only check and show if user has not consented yet
    try {
      const hasConsented = localStorage.getItem("cookieConsent");
      if (!hasConsented) {
        setMounted(true);
        // Small delay to allow initial paint before showing banner
        const timer = setTimeout(() => {
          setVisible(true);
        }, 2000);
        return () => clearTimeout(timer);
      }
    } catch {
      // Ignore localStorage errors (e.g. private mode)
    }
  }, []);

  const handleDismiss = () => {
    setVisible(false);
    setTimeout(() => setMounted(false), 300);
  };

  const handleAccept = () => {
    try {
      localStorage.setItem("cookieConsent", "true");
    } catch {
      // Ignore
    }
    handleDismiss();
  };

  if (!mounted) return null;

  return (
    <div
      role="region"
      aria-label="Cookie consent banner"
      className={`fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6 md:pb-8 flex justify-center transition-all duration-300 ease-out ${
        visible
          ? "opacity-100 translate-y-0 pointer-events-auto"
          : "opacity-0 translate-y-10 pointer-events-none"
      }`}
    >
      <div className="bg-slate-900 border border-slate-700 text-white p-5 rounded-2xl shadow-2xl shadow-slate-900/50 max-w-4xl w-full flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative overflow-hidden">
        <div className="absolute top-[-50%] right-[-10%] w-32 h-32 bg-orange-500/20 rounded-full blur-[40px] pointer-events-none" />

        <div className="flex items-start md:items-center gap-4">
          <div className="p-2.5 bg-slate-800 rounded-xl shrink-0 border border-slate-700">
            <Cookie className="w-6 h-6 text-orange-400" />
          </div>
          <div>
            <h3 className="font-bold text-base mb-1">We value your privacy</h3>
            <p className="text-sm text-slate-300 leading-relaxed max-w-2xl">
              TopCalcBox uses cookies to enhance your browsing experience, serve personalized ads, and analyze our traffic. 
              By clicking &quot;Accept All&quot;, you consent to our use of cookies as described in our{" "}
              <Link href="/privacy-policy" className="text-orange-400 hover:text-orange-300 underline underline-offset-2">
                Privacy Policy
              </Link>.
            </p>
          </div>
        </div>

        <div className="flex w-full md:w-auto items-center gap-3 shrink-0">
          <button 
            onClick={handleDismiss}
            type="button"
            aria-label="Decline cookies"
            className="flex-1 md:flex-none px-5 py-2.5 rounded-xl border border-slate-500 bg-slate-800 text-slate-100 hover:bg-slate-700 text-sm font-bold transition-colors shadow-sm cursor-pointer"
          >
            Decline
          </button>
          <button 
            onClick={handleAccept}
            type="button"
            aria-label="Accept all cookies"
            className="flex-1 md:flex-none px-6 py-2.5 rounded-xl bg-orange-700 hover:bg-orange-800 text-white text-sm font-bold shadow-sm transition-colors border border-orange-600 cursor-pointer"
          >
            Accept All
          </button>
        </div>

        {/* Mobile close button */}
        <button 
          onClick={handleDismiss}
          type="button"
          aria-label="Close cookie consent"
          className="absolute top-2 right-2 md:hidden p-2 text-slate-300 hover:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-white cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
