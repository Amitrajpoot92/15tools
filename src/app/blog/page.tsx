import type { Metadata } from "next";
import { SEOContent } from "@/components/SEOContent";

export const metadata: Metadata = {
  title: "Blog | ToolZen",
  description: "Read our latest articles, guides, and updates.",
};

export default function BlogPage() {
  return (
    <div className="pb-20">
      <div className="flex flex-col items-center justify-center text-center mb-10 mt-6">
        <h1 className="text-4xl md:text-5xl font-bold text-slate-900 tracking-tight mb-4">
          ToolZen Blog
        </h1>
        <p className="text-slate-500 max-w-2xl text-lg">
          Insights, guides, and tips on mathematics, finance, and productivity.
        </p>
      </div>

      <SEOContent>
        <h2>Latest Articles</h2>
        <p>Our blog is currently under construction. Please check back later for exciting new content about how to maximize your productivity using our free online calculators.</p>
        <div className="h-64 flex items-center justify-center border-2 border-dashed border-slate-200 rounded-xl mt-8">
          <p className="text-slate-400 font-medium">Coming Soon</p>
        </div>
      </SEOContent>
    </div>
  );
}
