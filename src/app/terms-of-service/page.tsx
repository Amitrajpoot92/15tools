import type { Metadata } from "next";
import { SEOContent } from "@/components/SEOContent";

export const metadata: Metadata = {
  title: "Terms Of Service | ToolZen",
};

export default function Page() {
  return (
    <div className="pb-20">
      <div className="flex flex-col items-center justify-center text-center mb-10 mt-6">
        <h1 className="text-4xl md:text-5xl font-bold text-slate-900 tracking-tight mb-4">
          Terms Of Service
        </h1>
      </div>
      <SEOContent>
        <h2>Welcome to our Terms Of Service page</h2>
        <p>This page is currently a placeholder for SEO architecture.</p>
        <div className="h-64 flex items-center justify-center border-2 border-dashed border-slate-200 rounded-xl mt-8">
          <p className="text-slate-400 font-medium">Coming Soon</p>
        </div>
      </SEOContent>
    </div>
  );
}
