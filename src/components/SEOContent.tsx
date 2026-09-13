import React from "react";

export function SEOContent({ children }: { children: React.ReactNode }) {
  return (
    <div className="mt-16 pt-10 border-t border-slate-200 prose prose-slate prose-blue max-w-none">
      <div className="bg-white rounded-2xl p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100">
        {children}
      </div>
    </div>
  );
}
