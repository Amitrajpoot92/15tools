"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { InstallModal } from "./InstallModal";
import { TOOLS } from "@/lib/constants";

export function PwaHandler() {
  const pathname = usePathname();
  const router = useRouter();
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // 1. Dynamic Manifest & Meta tags updater on Route Change
  useEffect(() => {
    if (typeof window === "undefined") return;

    const cleanSlug = pathname.replace(/^\//, "").split("?")[0];
    const matchedTool = TOOLS.find((t) => t.slug === cleanSlug);
    const appTitle = matchedTool ? `${matchedTool.name} - TopCalcBox` : "TopCalcBox";

    // Track current page as potential preferred start URL
    if (pathname && pathname !== "/") {
      localStorage.setItem("pwa_preferred_start_url", pathname);
    }

    // Dynamic Manifest link injection/update
    let manifestLink = document.querySelector<HTMLLinkElement>("link[rel='manifest']");
    const manifestUrl = `/manifest.webmanifest?start_url=${encodeURIComponent(pathname)}`;

    if (!manifestLink) {
      manifestLink = document.createElement("link");
      manifestLink.rel = "manifest";
      manifestLink.id = "dynamic-pwa-manifest";
      document.head.appendChild(manifestLink);
    }
    manifestLink.href = manifestUrl;

    // Update Apple Mobile Web App Title
    let appleTitleMeta = document.querySelector<HTMLMetaElement>("meta[name='apple-mobile-web-app-title']");
    if (!appleTitleMeta) {
      appleTitleMeta = document.createElement("meta");
      appleTitleMeta.name = "apple-mobile-web-app-title";
      document.head.appendChild(appleTitleMeta);
    }
    appleTitleMeta.content = matchedTool ? matchedTool.name : "TopCalcBox";

    // Ensure status bar theme-color is neutral white (no orange color)
    let themeColorMeta = document.querySelector<HTMLMetaElement>("meta[name='theme-color']");
    if (!themeColorMeta) {
      themeColorMeta = document.createElement("meta");
      themeColorMeta.name = "theme-color";
      document.head.appendChild(themeColorMeta);
    }
    themeColorMeta.content = "#ffffff";
  }, [pathname]);

  // 2. Standalone App Launch Detection & Redirection (Cold Start)
  useEffect(() => {
    if (typeof window === "undefined") return;

    const isStandalone = 
      window.matchMedia("(display-mode: standalone)").matches ||
      (window.navigator as any).standalone === true ||
      document.referrer.includes("android-app://");

    if (isStandalone) {
      const sessionInitialized = sessionStorage.getItem("pwa_session_initialized");

      // Only perform automatic start-page redirect on initial cold start of the standalone session
      if (!sessionInitialized) {
        sessionStorage.setItem("pwa_session_initialized", "true");

        const savedStartUrl = 
          localStorage.getItem("pwa_installed_start_url") || 
          localStorage.getItem("pwa_preferred_start_url");

        // If user installed from /love-calculator and the standalone app opens on '/', redirect to /love-calculator
        if (savedStartUrl && savedStartUrl !== "/" && pathname === "/") {
          router.replace(savedStartUrl);
        }
      }
    }
  }, [pathname, router]);

  // 3. Listen for browser's beforeinstallprompt event
  useEffect(() => {
    if (typeof window === "undefined") return;

    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
      (window as any).pwaDeferredPrompt = e;
      window.dispatchEvent(new CustomEvent("pwa-prompt-ready", { detail: e }));
    };

    const handleOpenModal = () => {
      setIsModalOpen(true);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    window.addEventListener("open-pwa-install-modal", handleOpenModal);

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
      window.removeEventListener("open-pwa-install-modal", handleOpenModal);
    };
  }, []);

  return (
    <InstallModal
      isOpen={isModalOpen}
      onClose={() => setIsModalOpen(false)}
      deferredPrompt={deferredPrompt}
      onInstalled={() => {
        setDeferredPrompt(null);
        (window as any).pwaDeferredPrompt = null;
      }}
    />
  );
}
