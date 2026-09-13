import type { Metadata } from "next";
import { ProfitLossCalculator } from "@/components/calculators/ProfitLossCalculator";
import { SEOContent } from "@/components/SEOContent";
import { TrendingUp } from "lucide-react";

export const metadata: Metadata = {
  title: "Profit and Loss Calculator - Calculate Margins & Revenues | ToolZen",
  description: "Free online profit and loss calculator to easily find your business profit, loss amounts, and percentage margins.",
};

export default function ProfitLossPage() {
  return (
    <div className="pb-20">
      <div className="flex flex-col items-center justify-center text-center mb-10 mt-6">
        <div className="p-4 bg-orange-50 rounded-full mb-4 border border-orange-100 shadow-sm">
          <TrendingUp className="w-8 h-8 text-orange-600" />
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-4">
          Profit & Loss Calculator
        </h1>
        <p className="text-slate-500 max-w-2xl text-lg">
          Determine your profit margins, gross profit, and total loss instantly. Enter your cost and selling prices below.
        </p>
      </div>

      <div className="max-w-4xl mx-auto mb-16">
        <ProfitLossCalculator />
      </div>

      <SEOContent>
        <h2>What is a Profit and Loss Calculator?</h2>
        <p>
          A <strong>Profit and Loss Calculator</strong> is an essential tool for business owners, traders, and entrepreneurs to determine the financial success of a product or a service. It calculates the difference between the Cost Price (the amount you paid to manufacture or purchase the item) and the Selling Price (the amount you sold it for).
        </p>
        
        <h3>Understanding the Terms</h3>
        <ul>
          <li><strong>Cost Price (CP):</strong> The total cost incurred to produce or buy an item.</li>
          <li><strong>Selling Price (SP):</strong> The price at which the item is sold to the customer.</li>
          <li><strong>Profit:</strong> This occurs when the Selling Price is greater than the Cost Price.</li>
          <li><strong>Loss:</strong> This occurs when the Cost Price is greater than the Selling Price.</li>
        </ul>

        <h3>How is Profit and Loss Calculated?</h3>
        <p>If you want to understand the math behind our calculator, here are the formulas we use:</p>
        <blockquote>
          <strong>Profit = Selling Price (SP) - Cost Price (CP)</strong><br />
          <strong>Profit Margin (%) = (Profit / Cost Price) × 100</strong>
        </blockquote>
        <br />
        <blockquote>
          <strong>Loss = Cost Price (CP) - Selling Price (SP)</strong><br />
          <strong>Loss Margin (%) = (Loss / Cost Price) × 100</strong>
        </blockquote>

        <h3>Why is tracking profit margins important?</h3>
        <p>
          Monitoring your profit margins is critical to ensuring your business is sustainable. High sales volume doesn't mean much if your profit margin is too low to cover operational costs. Use this tool regularly to price your products correctly and maintain healthy margins.
        </p>
      </SEOContent>
    </div>
  );
}
