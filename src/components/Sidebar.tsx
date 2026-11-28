"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { TOOLS, PLAY_STORE_URL } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { Calculator, Menu, X, Download, ArrowUpRight } from "lucide-react";

export function Sidebar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);

  useEffect(() => {
    const handleBeforeInstallPrompt = (e: any) => {
      e.preventDefault();
      setDeferredPrompt(e);
      (window as any).pwaDeferredPrompt = e;
    };
    
    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    
    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = async () => {
    if (typeof window !== "undefined") {
      localStorage.setItem("pwa_installed_start_url", pathname);
      const cleanSlug = pathname.replace(/^\//, "").split("?")[0];
      const matchedTool = TOOLS.find((t) => t.slug === cleanSlug);
      localStorage.setItem("pwa_installed_page_title", matchedTool ? matchedTool.name : "TopCalcBox");

      const promptToUse = deferredPrompt || (window as any).pwaDeferredPrompt;
      if (promptToUse) {
        try {
          promptToUse.prompt();
          const { outcome } = await promptToUse.userChoice;
          if (outcome === 'accepted') {
            setDeferredPrompt(null);
            (window as any).pwaDeferredPrompt = null;
          }
        } catch {
          window.dispatchEvent(new CustomEvent("open-pwa-install-modal"));
        }
      } else {
        window.dispatchEvent(new CustomEvent("open-pwa-install-modal"));
      }
    }
  };

  return (
    <>
      {/* Mobile Header (Only visible on small screens) */}
      <div className="md:hidden fixed top-0 left-0 right-0 h-16 bg-white border-b border-slate-200 flex items-center justify-between px-4 z-40 shadow-sm">
        <Link href="/" className="flex items-center space-x-2.5">
          <img 
            src="/topcalcbox-logo-96.webp" 
            alt="TopCalcBox Logo" 
            width="34" 
            height="34" 
            loading="eager"
            decoding="async" 
            className="w-[34px] h-[34px] rounded-full shadow-sm shrink-0" 
          />
          <div className="flex flex-col leading-tight">
            <span className="font-extrabold text-slate-900 text-base tracking-tight">TopCalcBox</span>
            <span className="text-[10px] sm:text-[11px] font-semibold text-slate-600 tracking-tight">Free Online Calculators</span>
          </div>
        </Link>
        <div className="flex items-center space-x-2">
          <a
            href={PLAY_STORE_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Get on Google Play"
            className="flex items-center space-x-1.5 bg-slate-900 text-white px-2.5 py-1.5 rounded-lg text-xs font-bold hover:bg-slate-800 transition-colors shadow-sm"
          >
            <svg className="w-3.5 h-3.5 text-orange-400 shrink-0" viewBox="0 0 24 24" fill="currentColor">
              <path d="M3.609 1.814L13.793 12 3.61 22.186a2.372 2.372 0 0 1-.3-.388c-.198-.337-.31-.73-.31-1.155V3.357c0-.425.112-.818.31-1.155.086-.147.188-.278.3-.388zM15.207 13.414l2.747 2.747-11.83 6.83 9.083-9.577zm0-2.828L6.124.979l11.83 6.85-2.747 2.757zm1.414 1.414l3.197-1.847c.806-.465.806-1.228 0-1.693l-3.197-1.847-1.414 1.414 1.414 1.414 1.414 1.414-1.414 1.414-1.414 1.414 1.414 1.414 3.197-1.847z" />
            </svg>
            <span>Play Store</span>
          </a>
          <button 
            onClick={() => setIsOpen(true)}
            aria-label="Open menu"
            aria-expanded={isOpen}
            className="p-2 text-slate-600 hover:bg-slate-100 rounded-md"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Backdrop for mobile */}
      {isOpen && (
        <div 
          className="md:hidden fixed inset-0 bg-slate-900/50 z-40 backdrop-blur-sm" 
          onClick={() => setIsOpen(false)} 
        />
      )}

      {/* Sidebar (Always visible on md, slides in on mobile) */}
      <aside 
        className={cn(
          "w-64 h-screen bg-white border-r border-slate-200 flex flex-col fixed left-0 top-0 shadow-sm z-50 overflow-hidden transition-transform duration-300 ease-in-out",
          isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        )}
      >
        <div className="p-6 border-b border-slate-100 bg-white flex justify-between items-center">
          <Link href="/" className="flex items-center space-x-3 group" onClick={() => setIsOpen(false)}>
            <img 
              src="/topcalcbox-logo-96.webp" 
              alt="TopCalcBox Logo" 
              width="40" 
              height="40" 
              decoding="async" 
              className="w-10 h-10 rounded-full shadow-sm group-hover:scale-105 transition-transform duration-300 shrink-0" 
            />
            <div className="flex flex-col leading-tight">
              <span className="text-xl font-extrabold text-slate-800 tracking-tight group-hover:text-orange-600 transition-colors">TopCalcBox</span>
              <span className="text-[11px] font-semibold text-slate-500 tracking-tight">Free Online Calculators</span>
            </div>
          </Link>
          <button 
            className="md:hidden p-1 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-md"
            onClick={() => setIsOpen(false)}
            aria-label="Close menu"
            aria-expanded={isOpen}
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      
      <div className="flex-1 overflow-y-auto py-4 px-3 space-y-1 scrollbar-thin scrollbar-thumb-slate-200">
          <Link
            href="/"
            onClick={() => setIsOpen(false)}
            className={cn(
              "flex items-center px-3 py-2.5 rounded-xl text-sm font-bold transition-all duration-300",
              pathname === "/"
                ? "bg-gradient-to-r from-blue-50 to-indigo-50/50 text-blue-700 shadow-sm shadow-blue-900/5 border border-blue-100/50"
                : "text-slate-500 hover:text-slate-900 hover:bg-slate-50"
            )}
          >
          Dashboard
        </Link>
        <div className="pt-5 pb-2">
          <p className="px-3 text-[11px] font-extrabold text-slate-400 uppercase tracking-widest">
            Calculators
          </p>
        </div>
        {TOOLS.map((tool) => {
          const Icon = tool.icon;
          const isActive = pathname === `/${tool.slug}`;
          const baseColor = tool.color.split('-')[1] || "blue"; // Will be blue, violet, or emerald
          
          const activeStyle = isActive ? {
            backgroundColor: `var(--color-${baseColor}-500)`,
            color: '#ffffff',
            boxShadow: `0 4px 14px 0 var(--color-${baseColor}-500, rgba(0,0,0,0.2))`
          } : {};

          return (
            <Link
              key={tool.slug}
              href={`/${tool.slug}`}
              onClick={() => setIsOpen(false)}
              style={activeStyle}
              className={cn(
                "flex items-center px-3 py-2.5 rounded-xl text-sm transition-all duration-300 group border",
                isActive
                  ? "font-bold border-transparent"
                  : "border-transparent text-slate-600 hover:text-slate-900 hover:bg-slate-100"
              )}
            >
              <div 
                className={cn(
                "p-1.5 rounded-lg mr-3 transition-all duration-300",
                isActive 
                  ? "bg-white text-slate-900 shadow-sm" 
                  : "text-slate-400 group-hover:bg-slate-200 group-hover:text-slate-600"
              )}>
                <Icon className={cn("w-4 h-4", isActive ? `text-${baseColor}-600` : "")} />
              </div>
              <span className="truncate">{tool.name}</span>
            </Link>
          );
        })}
      </div>
      
      {/* Sidebar Footer - Get App on Google Play */}
      <div className="p-3.5 border-t border-slate-100 bg-slate-50/70 space-y-2">
        <a 
          href={PLAY_STORE_URL}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Get it on Google Play"
          className="w-full flex items-center justify-between px-3.5 py-2.5 bg-slate-900 text-white rounded-xl text-xs font-bold hover:bg-slate-800 transition-all shadow-sm group"
        >
          <div className="flex items-center space-x-2">
            <svg className="w-4 h-4 text-orange-400 shrink-0" viewBox="0 0 24 24" fill="currentColor">
              <path d="M3.609 1.814L13.793 12 3.61 22.186a2.372 2.372 0 0 1-.3-.388c-.198-.337-.31-.73-.31-1.155V3.357c0-.425.112-.818.31-1.155.086-.147.188-.278.3-.388zM15.207 13.414l2.747 2.747-11.83 6.83 9.083-9.577zm0-2.828L6.124.979l11.83 6.85-2.747 2.757zm1.414 1.414l3.197-1.847c.806-.465.806-1.228 0-1.693l-3.197-1.847-1.414 1.414 1.414 1.414 1.414 1.414-1.414 1.414-1.414 1.414 1.414 1.414 3.197-1.847z" />
            </svg>
            <div className="text-left">
              <span className="text-[9px] text-slate-400 block leading-none font-semibold">GET IT ON</span>
              <span className="text-[12px] text-white font-extrabold leading-none mt-0.5">Google Play</span>
            </div>
          </div>
          <ArrowUpRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-white transition-colors" />
        </a>

        <button 
          onClick={handleInstallClick} 
          aria-label="Install Web App"
          className="w-full flex items-center justify-center space-x-1.5 py-1 text-slate-500 hover:text-slate-800 text-[11px] font-semibold transition-colors"
        >
          <Download className="w-3 h-3 text-slate-400" />
          <span>Add to Home Screen (PWA)</span>
        </button>
      </div>
      </aside>
    </>
  );
}
