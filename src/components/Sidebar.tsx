"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { TOOLS } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { Calculator, Menu, X, Download } from "lucide-react";

export function Sidebar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);

  useEffect(() => {
    const handleBeforeInstallPrompt = (e: any) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };
    
    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    
    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === 'accepted') {
        setDeferredPrompt(null);
      }
    } else {
      alert("App installation is already completed or not supported on this device.");
    }
  };

  return (
    <>
      {/* Mobile Header (Only visible on small screens) */}
      <div className="md:hidden fixed top-0 left-0 right-0 h-16 bg-white border-b border-slate-200 flex items-center justify-between px-4 z-40 shadow-sm">
        <Link href="/" className="flex items-center space-x-2">
          <img src="/icon.png" alt="TopCalcBox Logo" className="w-8 h-8 rounded-[8px] shadow-sm" />
          <span className="font-extrabold text-slate-800 text-lg">TopCalcBox</span>
        </Link>
        <div className="flex items-center space-x-2">
          <button onClick={handleInstallClick} className="flex items-center space-x-1.5 bg-slate-900 text-white px-3 py-1.5 rounded-lg text-xs font-bold hover:bg-slate-800 transition-colors shadow-sm">
            <Download className="w-3.5 h-3.5" />
            <span>App</span>
          </button>
          <button 
            onClick={() => setIsOpen(true)}
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
            <img src="/icon.png" alt="TopCalcBox Logo" className="w-10 h-10 rounded-xl shadow-sm group-hover:scale-105 transition-transform duration-300" />
            <span className="text-xl font-extrabold text-slate-800 tracking-tight">TopCalcBox</span>
          </Link>
          <button 
            className="md:hidden p-1 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-md"
            onClick={() => setIsOpen(false)}
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
      
      {/* Sidebar Footer - Download App */}
      <div className="p-4 border-t border-slate-100 bg-slate-50/50">
        <button onClick={handleInstallClick} className="w-full flex items-center justify-center space-x-2 bg-slate-900 text-white px-4 py-2.5 rounded-xl text-sm font-bold hover:bg-slate-800 hover:shadow-md transition-all shadow-sm">
          <Download className="w-4 h-4" />
          <span>Download App</span>
        </button>
      </div>
      </aside>
    </>
  );
}
