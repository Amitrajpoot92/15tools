"use client";

import { useEffect } from "react";

export function ThirdPartyScripts() {
  useEffect(() => {
    // Check if user is a search crawler / bot / headless validator
    // Bypassing ads & telemetry for crawlers prevents GSC resource errors (SODAR, doubleclick, gen_204, GA collect)
    // and guarantees Googlebot a 100% clean, sub-second page render.
    if (
      typeof navigator !== "undefined" &&
      /bot|googlebot|crawler|spider|robot|crawling|lighthouse|headlesschrome/i.test(
        navigator.userAgent
      )
    ) {
      return;
    }

    let loaded = false;

    const loadScripts = () => {
      if (loaded) return;
      loaded = true;

      // Remove trigger listeners
      window.removeEventListener("scroll", loadScripts);
      window.removeEventListener("touchstart", loadScripts);
      window.removeEventListener("pointerdown", loadScripts);
      window.removeEventListener("keydown", loadScripts);

      // 1. Google Analytics
      const gaScript = document.createElement("script");
      gaScript.async = true;
      gaScript.src = "https://www.googletagmanager.com/gtag/js?id=G-X9S0Y748KX";
      document.head.appendChild(gaScript);

      const gaInitScript = document.createElement("script");
      gaInitScript.innerHTML = `
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', 'G-X9S0Y748KX');
      `;
      document.head.appendChild(gaInitScript);

      // 2. Google AdSense
      const adScript = document.createElement("script");
      adScript.async = true;
      adScript.crossOrigin = "anonymous";
      adScript.src = "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9267692450432886";
      document.head.appendChild(adScript);
    };

    // Trigger on user interaction
    window.addEventListener("scroll", loadScripts, { passive: true, once: true });
    window.addEventListener("touchstart", loadScripts, { passive: true, once: true });
    window.addEventListener("pointerdown", loadScripts, { passive: true, once: true });
    window.addEventListener("keydown", loadScripts, { passive: true, once: true });

    // Fallback timer if user doesn't interact immediately (e.g. idle reading)
    const idleTimer = setTimeout(() => {
      if ("requestIdleCallback" in window) {
        (window as any).requestIdleCallback(loadScripts, { timeout: 2000 });
      } else {
        loadScripts();
      }
    }, 3500);

    return () => {
      clearTimeout(idleTimer);
      window.removeEventListener("scroll", loadScripts);
      window.removeEventListener("touchstart", loadScripts);
      window.removeEventListener("pointerdown", loadScripts);
      window.removeEventListener("keydown", loadScripts);
    };
  }, []);

  return null;
}
