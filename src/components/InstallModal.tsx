"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { TOOLS } from "@/lib/constants";
import { 
  X, 
  Download, 
  Share2, 
  PlusSquare, 
  Sparkles, 
  CheckCircle2, 
  Smartphone, 
  Laptop, 
  Apple, 
  HelpCircle 
} from "lucide-react";

interface InstallModalProps {
  isOpen: boolean;
  onClose: () => void;
  deferredPrompt: any;
  onInstalled?: () => void;
}

export function InstallModal({ isOpen, onClose, deferredPrompt, onInstalled }: InstallModalProps) {
  const pathname = usePathname();
  const [deviceType, setDeviceType] = useState<"android" | "ios" | "desktop">("android");
  const [installing, setInstalling] = useState(false);

  // Detect current tool name
  const cleanSlug = pathname.replace(/^\//, "").split("?")[0];
  const currentTool = TOOLS.find(t => t.slug === cleanSlug);
  const toolName = currentTool ? currentTool.name : "TopCalcBox";

  useEffect(() => {
    if (typeof window !== "undefined") {
      const userAgent = window.navigator.userAgent.toLowerCase();
      if (/iphone|ipad|ipod/.test(userAgent)) {
        setDeviceType("ios");
      } else if (/android/.test(userAgent)) {
        setDeviceType("android");
      } else {
        setDeviceType("desktop");
      }
    }
  }, []);

  if (!isOpen) return null;

  const handleNativeInstall = async () => {
    if (deferredPrompt) {
      setInstalling(true);
      try {
        // Save the specific page as the primary target
        localStorage.setItem("pwa_installed_start_url", pathname);
        localStorage.setItem("pwa_installed_page_title", toolName);
        
        deferredPrompt.prompt();
        const { outcome } = await deferredPrompt.userChoice;
        if (outcome === "accepted") {
          if (onInstalled) onInstalled();
          onClose();
        }
      } catch (err) {
        console.error("Install prompt error:", err);
      } finally {
        setInstalling(false);
      }
    } else {
      // If no native prompt, record the target anyway so manual "Add to Home Screen" remembers it
      localStorage.setItem("pwa_installed_start_url", pathname);
      localStorage.setItem("pwa_installed_page_title", toolName);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="bg-white rounded-3xl max-w-md w-full overflow-hidden shadow-2xl border border-slate-100 flex flex-col relative animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header with decorative background */}
        <div className="relative bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-white p-6 pb-5">
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center space-x-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-orange-500 flex items-center justify-center text-white shadow-lg shadow-orange-500/30">
              <Download className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-orange-400">
                Install to Home Screen
              </span>
              <h2 className="text-xl font-bold text-white tracking-tight leading-snug">
                {currentTool ? `${currentTool.name} App` : "TopCalcBox App"}
              </h2>
            </div>
          </div>

          <p className="text-xs text-slate-300 font-medium mt-2 leading-relaxed">
            {currentTool ? (
              <>
                When installed, the app will open directly to <span className="text-orange-300 font-semibold">{currentTool.name}</span> on your phone!
              </>
            ) : (
              "Fast, 1-click access to all 15+ interactive calculators directly from your home screen."
            )}
          </p>
        </div>

        {/* Modal Content */}
        <div className="p-6 space-y-5">
          {/* Quick Info Badge */}
          <div className="flex items-center space-x-2.5 bg-emerald-50 border border-emerald-200/80 rounded-2xl p-3 text-emerald-900 text-xs font-medium">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>
              Primary Open Screen: <strong className="font-bold text-emerald-950">{toolName}</strong>
            </span>
          </div>

          {/* Native Install Action if supported */}
          {deferredPrompt ? (
            <div className="space-y-2">
              <button
                onClick={handleNativeInstall}
                disabled={installing}
                className="w-full flex items-center justify-center space-x-2 bg-gradient-to-r from-orange-500 to-rose-500 hover:from-orange-600 hover:to-rose-600 text-white font-bold py-3.5 px-5 rounded-2xl shadow-lg shadow-orange-500/25 active:scale-[0.98] transition-all text-sm"
              >
                <Download className="w-4 h-4" />
                <span>{installing ? "Installing..." : `Install ${toolName} Now`}</span>
              </button>
              <p className="text-center text-[11px] text-slate-500 font-medium">
                Instant install • Works offline • No store download required
              </p>
            </div>
          ) : (
            /* Platform Specific Instructions */
            <div className="space-y-4">
              {/* Platform Switcher Tabs */}
              <div className="flex bg-slate-100 p-1 rounded-xl gap-1 text-xs font-bold text-slate-600">
                <button
                  type="button"
                  onClick={() => setDeviceType("android")}
                  className={`flex-1 py-1.5 rounded-lg flex items-center justify-center gap-1.5 transition-all ${
                    deviceType === "android" ? "bg-white text-slate-900 shadow-sm" : "hover:text-slate-900"
                  }`}
                >
                  <Smartphone className="w-3.5 h-3.5" />
                  Android
                </button>
                <button
                  type="button"
                  onClick={() => setDeviceType("ios")}
                  className={`flex-1 py-1.5 rounded-lg flex items-center justify-center gap-1.5 transition-all ${
                    deviceType === "ios" ? "bg-white text-slate-900 shadow-sm" : "hover:text-slate-900"
                  }`}
                >
                  <Apple className="w-3.5 h-3.5" />
                  iPhone (iOS)
                </button>
                <button
                  type="button"
                  onClick={() => setDeviceType("desktop")}
                  className={`flex-1 py-1.5 rounded-lg flex items-center justify-center gap-1.5 transition-all ${
                    deviceType === "desktop" ? "bg-white text-slate-900 shadow-sm" : "hover:text-slate-900"
                  }`}
                >
                  <Laptop className="w-3.5 h-3.5" />
                  PC / Mac
                </button>
              </div>

              {/* Instructions per device */}
              {deviceType === "ios" && (
                <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200/80 space-y-3 text-xs text-slate-700">
                  <p className="font-bold text-slate-900 text-xs flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-orange-500" />
                    How to install on iPhone Safari:
                  </p>
                  <ol className="space-y-2.5 ml-1">
                    <li className="flex items-start gap-2.5">
                      <span className="w-5 h-5 rounded-full bg-slate-200 text-slate-800 font-bold flex items-center justify-center shrink-0 text-[11px]">1</span>
                      <span>Tap the <strong className="text-slate-900 font-bold">Share icon</strong> ( <Share2 className="w-3.5 h-3.5 inline text-blue-600" /> ) at the bottom of Safari.</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="w-5 h-5 rounded-full bg-slate-200 text-slate-800 font-bold flex items-center justify-center shrink-0 text-[11px]">2</span>
                      <span>Scroll down and tap <strong className="text-slate-900 font-bold">Add to Home Screen</strong> ( <PlusSquare className="w-3.5 h-3.5 inline text-slate-800" /> ).</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="w-5 h-5 rounded-full bg-slate-200 text-slate-800 font-bold flex items-center justify-center shrink-0 text-[11px]">3</span>
                      <span>Tap <strong className="text-blue-600 font-bold">Add</strong> at the top right.</span>
                    </li>
                  </ol>
                  <div className="pt-1 text-[11px] text-slate-500 italic">
                    ✨ Your iPhone will launch directly to {toolName} every time!
                  </div>
                </div>
              )}

              {deviceType === "android" && (
                <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200/80 space-y-3 text-xs text-slate-700">
                  <p className="font-bold text-slate-900 text-xs flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-orange-500" />
                    How to install on Android Chrome:
                  </p>
                  <ol className="space-y-2.5 ml-1">
                    <li className="flex items-start gap-2.5">
                      <span className="w-5 h-5 rounded-full bg-slate-200 text-slate-800 font-bold flex items-center justify-center shrink-0 text-[11px]">1</span>
                      <span>Tap the <strong className="text-slate-900 font-bold">Three dots (⋮)</strong> menu in Chrome.</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="w-5 h-5 rounded-full bg-slate-200 text-slate-800 font-bold flex items-center justify-center shrink-0 text-[11px]">2</span>
                      <span>Select <strong className="text-slate-900 font-bold">Install app</strong> or <strong className="text-slate-900 font-bold">Add to Home screen</strong>.</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="w-5 h-5 rounded-full bg-slate-200 text-slate-800 font-bold flex items-center justify-center shrink-0 text-[11px]">3</span>
                      <span>Confirm Install. It will open directly into {toolName}!</span>
                    </li>
                  </ol>
                </div>
              )}

              {deviceType === "desktop" && (
                <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200/80 space-y-3 text-xs text-slate-700">
                  <p className="font-bold text-slate-900 text-xs flex items-center gap-1.5">
                    <Laptop className="w-3.5 h-3.5 text-blue-500" />
                    How to install on PC / Mac (Chrome or Edge):
                  </p>
                  <ol className="space-y-2.5 ml-1">
                    <li className="flex items-start gap-2.5">
                      <span className="w-5 h-5 rounded-full bg-slate-200 text-slate-800 font-bold flex items-center justify-center shrink-0 text-[11px]">1</span>
                      <span>Look at the right side of the URL/address bar for the <strong className="text-slate-900 font-bold">Install App (⊕)</strong> icon.</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="w-5 h-5 rounded-full bg-slate-200 text-slate-800 font-bold flex items-center justify-center shrink-0 text-[11px]">2</span>
                      <span>Click <strong className="text-slate-900 font-bold">Install</strong> to create a dedicated standalone desktop app.</span>
                    </li>
                  </ol>
                </div>
              )}
            </div>
          )}

          {/* Footer note */}
          <div className="pt-1 text-center">
            <button
              onClick={onClose}
              className="text-xs font-semibold text-slate-500 hover:text-slate-800 transition-colors"
            >
              Maybe later
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
