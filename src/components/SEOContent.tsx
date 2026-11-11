import React from "react";

export function SEOContent({ children }: { children: React.ReactNode }) {
  return (
    <div className="mt-4 sm:mt-5 max-w-4xl mx-auto">
      <div className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-7 shadow-sm border-2 border-slate-200/90 prose prose-slate prose-sm md:prose-base prose-headings:text-slate-900 prose-headings:font-extrabold prose-h2:text-lg md:prose-h2:text-xl prose-h2:mt-4 prose-h2:mb-2 prose-h3:text-base md:prose-h3:text-lg prose-h3:mt-3 prose-h3:mb-1.5 prose-h4:text-sm md:prose-h4:text-base prose-h4:font-bold prose-h4:mt-2.5 prose-h4:mb-1 prose-p:text-slate-700 prose-p:leading-relaxed prose-p:my-2 prose-a:text-blue-600 prose-a:font-semibold prose-a:no-underline hover:prose-a:underline prose-ul:my-2 prose-ol:my-2 prose-li:my-0.5 prose-li:text-slate-700 prose-strong:text-slate-900 max-w-none">
        {children}
      </div>
    </div>
  );
}
