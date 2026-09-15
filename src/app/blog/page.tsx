import type { Metadata } from "next";
import { SEOContent } from "@/components/SEOContent";

export const metadata: Metadata = {
  title: "Blog | TopCalcBox",
  description: "Read our latest articles, guides, and updates.",
};

export default function BlogPage() {
  return (
    <div className="pb-8">
      <div className="flex flex-col items-center justify-center text-center mb-10 mt-6">
        <h1 className="text-4xl md:text-5xl font-bold text-slate-900 tracking-tight mb-4">
          TopCalcBox Blog
        </h1>
        <p className="text-slate-500 max-w-2xl text-lg">
          Insights, guides, and tips on mathematics, finance, and productivity.
        </p>
      </div>

      <SEOContent>

        <h2>Welcome to the TopCalcBox Blog</h2>
        <p>
          Welcome to the official blog of <strong>TopCalcBox</strong>! This space is dedicated to providing you with in-depth articles, tutorials, and mathematical tips to help you make the most out of your daily life and our calculator tools.
        </p>
        <p>
          Whether you are looking to understand the complex formulas behind profit margins, want to learn how to quickly calculate discounts in your head while shopping, or simply want to read about the history of mathematics and timekeeping, our blog is your go-to resource.
        </p>
        <h2>What to Expect</h2>
        <ul>
          <li><strong>Tutorials:</strong> Step-by-step guides on how to use our advanced calculators for complex scenarios.</li>
          <li><strong>Financial Tips:</strong> Articles designed to help you understand interest, margins, and taxes.</li>
          <li><strong>Educational Content:</strong> Helpful resources for students and teachers covering syllabus-based mathematical concepts.</li>
        </ul>
        <div className="mt-8 p-6 bg-slate-50 border border-slate-200 rounded-2xl text-center">
          <p className="text-slate-600 font-medium mb-0">Our editorial team is currently drafting high-quality articles. Check back soon for our first official post!</p>
        </div>

      </SEOContent>
    </div>
  );
}
