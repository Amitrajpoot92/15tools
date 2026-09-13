import type { Metadata } from "next";
import { MarginCalculator } from "@/components/calculators/MarginCalculator";
import { SEOContent } from "@/components/SEOContent";
import { PieChart } from "lucide-react";

export const metadata: Metadata = {
  title: "Margin Calculator - Calculate Retail Prices & Gross Profit | ToolZen",
  description: "Free online margin calculator to find your selling price, gross profit, and markup based on your cost and desired margin.",
};

export default function MarginPage() {
  return (
    <div className="pb-20">
      <div className="flex flex-col items-center justify-center text-center mb-10 mt-6">
        <div className="p-4 bg-amber-50 rounded-full mb-4 border border-amber-100 shadow-sm">
          <PieChart className="w-8 h-8 text-amber-600" />
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-4">
          Margin Calculator
        </h1>
        <p className="text-slate-500 max-w-2xl text-lg">
          Find out exactly what your selling price should be to achieve your desired profit margin.
        </p>
      </div>

      <div className="max-w-4xl mx-auto mb-16">
        <MarginCalculator />
      </div>

      <SEOContent>
        <h2>What is a Margin Calculator?</h2>
        <p>
          A <strong>Margin Calculator</strong> is a vital business tool used mostly in retail and manufacturing to determine the optimal selling price for a product. By inputting the cost of producing or buying an item and your desired profit margin percentage, it tells you exactly how much you need to sell the item for.
        </p>
        
        <h3>Margin vs. Markup: What's the difference?</h3>
        <p>Many business owners confuse margin and markup, but they are two very different concepts:</p>
        <ul>
          <li><strong>Margin (Gross Margin):</strong> This is profit expressed as a percentage of the <em>Selling Price</em> (Revenue).</li>
          <li><strong>Markup:</strong> This is profit expressed as a percentage of the <em>Cost</em>.</li>
        </ul>
        <p>
          For example, if you buy a product for $50 and sell it for $100, your profit is $50. Your <strong>markup is 100%</strong> (profit is 100% of the cost), but your <strong>margin is 50%</strong> (profit is 50% of the revenue).
        </p>

        <h3>How is Margin Calculated?</h3>
        <p>Our calculator uses standard accounting formulas to determine your selling price based on margin:</p>
        <blockquote>
          <strong>Selling Price (Revenue) = Cost / (1 - (Margin / 100))</strong><br />
          <strong>Gross Profit = Selling Price - Cost</strong>
        </blockquote>
        <p>
          If you are calculating markup manually, you can use:
        </p>
        <blockquote>
          <strong>Markup = (Gross Profit / Cost) × 100</strong>
        </blockquote>

        <h3>Why do you need this tool?</h3>
        <p>
          Setting the right price is crucial to the success of your business. If your margin is too low, you might struggle to cover overhead expenses like rent, salaries, and marketing. Using a Margin Calculator ensures that you are pricing your goods profitably without undercutting yourself.
        </p>
      </SEOContent>
    </div>
  );
}
