import React from "react";

export function SEOContent({ children }: { children: React.ReactNode }) {
  return (
    <div className="mt-8 pt-4 max-w-4xl mx-auto">
      <div className="bg-white rounded-3xl p-5 md:p-8 shadow-sm border border-slate-200 prose prose-slate prose-sm md:prose-base prose-headings:text-slate-800 prose-h2:text-xl md:prose-h2:text-2xl prose-h2:font-bold prose-h2:mt-6 prose-h2:mb-3 prose-h3:text-lg prose-h3:font-semibold prose-h3:mt-5 prose-h3:mb-2 prose-p:text-slate-600 prose-p:leading-relaxed prose-p:my-3 prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline prose-ul:my-3 prose-li:my-1 prose-strong:text-slate-700 max-w-none">
        {children}
      </div>
    </div>
  );
}
