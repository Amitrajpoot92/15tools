"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { X, Cookie } from "lucide-react";

export function CookieConsent() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    // Check if user has already consented
    const hasConsented = localStorage.getItem("cookieConsent");
    if (!hasConsented) {
      // Small delay so it doesn't pop up instantly on first paint
      const timer = setTimeout(() => setShow(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("cookieConsent", "true");
    setShow(false);
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6 md:pb-8 pointer-events-none flex justify-center"
        >
          <div className="bg-slate-900 border border-slate-700 text-white p-5 rounded-2xl shadow-2xl shadow-slate-900/50 max-w-4xl w-full flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pointer-events-auto relative overflow-hidden">
            <div className="absolute top-[-50%] right-[-10%] w-32 h-32 bg-orange-500/20 rounded-full blur-[40px] pointer-events-none" />
            
            <div className="flex items-start md:items-center gap-4">
              <div className="p-2.5 bg-slate-800 rounded-xl shrink-0 border border-slate-700">
                <Cookie className="w-6 h-6 text-orange-400" />
              </div>
              <div>
                <h3 className="font-bold text-base mb-1">We value your privacy</h3>
                <p className="text-sm text-slate-300 leading-relaxed max-w-2xl">
                  TopCalcBox uses cookies to enhance your browsing experience, serve personalized ads, and analyze our traffic. 
                  By clicking "Accept All", you consent to our use of cookies as described in our{" "}
                  <Link href="/privacy-policy" className="text-orange-400 hover:text-orange-300 underline underline-offset-2">
                    Privacy Policy
                  </Link>.
                </p>
              </div>
            </div>
            
            <div className="flex w-full md:w-auto items-center gap-3 shrink-0">
              <button 
                onClick={() => setShow(false)}
                className="flex-1 md:flex-none px-5 py-2.5 rounded-xl border border-slate-600 text-slate-300 hover:bg-slate-800 text-sm font-bold transition-colors"
              >
                Decline
              </button>
              <button 
                onClick={handleAccept}
                className="flex-1 md:flex-none px-6 py-2.5 rounded-xl bg-orange-500 hover:bg-orange-600 text-white text-sm font-bold shadow-sm transition-colors border border-orange-600"
              >
                Accept All
              </button>
            </div>
            
            {/* Mobile close button (absolute) */}
            <button 
              onClick={() => setShow(false)}
              className="absolute top-2 right-2 md:hidden p-2 text-slate-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
