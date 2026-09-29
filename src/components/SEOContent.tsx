import React from "react";
import { AdBanner } from "@/components/ads/AdBanner";
import { NativeAd } from "@/components/ads/NativeAd";

export function SEOContent({ children }: { children: React.ReactNode }) {
  const childrenArray = React.Children.toArray(children);
  
  const processedChildren: React.ReactNode[] = [];
  let adInserted = false;

  childrenArray.forEach((child) => {
    processedChildren.push(child);
    
    // Insert AdBanner after the first <h2> tag
    if (!adInserted && React.isValidElement(child) && child.type === 'h2') {
      processedChildren.push(
        <div key="seo-ad" className="my-6 flex justify-center w-full">
          <AdBanner size="320x50" />
        </div>
      );
      adInserted = true;
    }
  });

  // Append Native Ad at the end of the content
  processedChildren.push(
    <div key="native-ad-bottom">
      <NativeAd />
    </div>
  );

  return (
    <div className="mt-8 pt-4 max-w-4xl mx-auto">
      <div className="bg-white rounded-3xl p-5 md:p-8 shadow-sm border border-slate-200 prose prose-slate prose-sm md:prose-base prose-headings:text-slate-800 prose-h2:text-lg md:prose-h2:text-xl prose-h2:font-bold prose-h2:mt-6 prose-h2:mb-3 prose-h3:text-base md:prose-h3:text-lg prose-h3:font-bold prose-h3:mt-5 prose-h3:mb-2 prose-h4:text-sm md:prose-h4:text-base prose-h4:font-semibold prose-h4:mt-4 prose-h4:mb-2 prose-p:text-slate-600 prose-p:leading-relaxed prose-p:my-3 prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline prose-ul:my-3 prose-li:my-1 prose-strong:text-slate-700 max-w-none">
        {processedChildren}
      </div>
    </div>
  );
}
