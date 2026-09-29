"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

export function NativeAd({ className = "" }: { className?: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    if (!containerRef.current) return;

    // Clear previous ad on route change
    containerRef.current.innerHTML = '';

    // Create the required container for Adsterra native ad
    const adContainer = document.createElement('div');
    adContainer.id = 'container-33dbb52c468f4587f3a9ccb292f78ffa';
    containerRef.current.appendChild(adContainer);

    // Create and append the script
    const invokeScript = document.createElement('script');
    invokeScript.async = true;
    invokeScript.setAttribute('data-cfasync', 'false');
    invokeScript.src = "https://gentlemenwaspishunits.com/33dbb52c468f4587f3a9ccb292f78ffa/invoke.js";
    
    containerRef.current.appendChild(invokeScript);
  }, [pathname]);

  return (
    <div className={`flex justify-center items-center my-8 overflow-hidden w-full ${className}`}>
      <div ref={containerRef} className="w-full max-w-full overflow-x-hidden" />
    </div>
  );
}
