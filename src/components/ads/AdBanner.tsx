"use client";

import { useEffect, useRef } from "react";

type AdSize = "320x50" | "300x250" | "468x60" | "728x90";

interface AdBannerProps {
  size: AdSize;
  className?: string;
}

export function AdBanner({ size, className = "" }: AdBannerProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Clear previous ad if any (to prevent duplicates on re-renders)
    containerRef.current.innerHTML = '';

    const createAd = () => {
      let key = "";
      let width = 0;
      let height = 0;

      switch (size) {
        case "320x50":
          key = "bc5af90a91a82526e27a21589abc26df";
          width = 320;
          height = 50;
          break;
        case "300x250":
          key = "33f6d6170a7c1427554b6bc301502848";
          width = 300;
          height = 250;
          break;
        case "468x60":
          key = "cd6ea8cc8abb135dd74e6c2a290d0bdf";
          width = 468;
          height = 60;
          break;
        case "728x90":
          key = "7da732de1bc2b7db08aa040f4f0b9a73";
          width = 728;
          height = 90;
          break;
      }

      // 1. Setup options object script
      const confScript = document.createElement('script');
      confScript.type = 'text/javascript';
      confScript.innerHTML = `
        var atOptions = {
          'key' : '${key}',
          'format' : 'iframe',
          'height' : ${height},
          'width' : ${width},
          'params' : {}
        };
      `;

      // 2. Setup invoke script
      const invokeScript = document.createElement('script');
      invokeScript.type = 'text/javascript';
      invokeScript.src = \`https://gentlemenwaspishunits.com/\${key}/invoke.js\`;
      
      // Append scripts to container
      if (containerRef.current) {
        containerRef.current.appendChild(confScript);
        containerRef.current.appendChild(invokeScript);
      }
    };

    createAd();
  }, [size]);

  return (
    <div className={\`flex justify-center items-center my-6 overflow-hidden \${className}\`}>
      <div ref={containerRef} />
    </div>
  );
}
