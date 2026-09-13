import type { Metadata } from "next";
import { DiscountCalculator } from "@/components/calculators/DiscountCalculator";
import { SEOContent } from "@/components/SEOContent";
import { Tag } from "lucide-react";

export const metadata: Metadata = {
  title: "Discount Calculator - Find Final Price and Savings | ToolZen",
  description: "Calculate exactly how much you'll save during sales and promotions. Our free online discount calculator shows the final price and amount saved instantly.",
};

export default function DiscountCalculatorPage() {
  return (
    <div className="pb-20">
      {/* Hero Section */}
      <div className="flex flex-col items-center justify-center text-center mb-10 mt-6">
        <div className="p-4 bg-green-50 rounded-full mb-4 border border-green-100 shadow-sm">
          <Tag className="w-8 h-8 text-green-600" />
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-4">
          Discount Calculator
        </h1>
        <p className="text-slate-500 max-w-2xl text-lg">
          Find out exactly how much you are saving and the final price you have to pay after a discount is applied.
        </p>
      </div>

      {/* Interactive Tool */}
      <div className="max-w-4xl mx-auto mb-16">
        <DiscountCalculator />
      </div>

      {/* SEO Content Section */}
      <SEOContent>
        <h2>What is a Discount Calculator?</h2>
        <p>
          A <strong>discount calculator</strong> is a practical everyday tool used by shoppers and businesses to determine the final price of an item after a markdown or promotional discount is applied. It also accurately tells you exactly how much money you are keeping in your pocket.
        </p>
        
        <h3>How to use our Discount Calculator?</h3>
        <ul>
          <li><strong>Original Price:</strong> Enter the starting price of the product or service before any coupons or sales are applied.</li>
          <li><strong>Discount Percentage (%):</strong> Enter the percentage off that is being offered (e.g., 20 for a 20% off sale).</li>
          <li><strong>Final Price & Savings:</strong> The tool instantly calculates the new price you need to pay, alongside the exact dollar amount you saved.</li>
        </ul>

        <h3>When to use this tool?</h3>
        <p>This calculator comes in handy in numerous everyday situations:</p>
        <ul>
          <li><strong>Black Friday & Holiday Sales:</strong> Quickly check if that deal is actually worth it before reaching the checkout counter.</li>
          <li><strong>Coupon Codes:</strong> See your final total when applying a 15% off promo code on your favorite e-commerce site.</li>
          <li><strong>Business Pricing:</strong> If you are a store owner, use this to figure out what your sale prices should be when running a store-wide clearance.</li>
        </ul>

        <h3>How is the discount calculated manually?</h3>
        <p>
          If you want to do the math yourself, the formula is straightforward:
        </p>
        <blockquote>
          <strong>Amount Saved = (Original Price × Discount Percentage) / 100</strong>
          <br />
          <strong>Final Price = Original Price - Amount Saved</strong>
        </blockquote>
        <p>
          For instance, if a pair of shoes costs $80 and there is a 25% discount, you calculate the savings as (80 × 25) / 100 = $20. You subtract $20 from $80 to get a final price of $60.
        </p>
      </SEOContent>
    </div>
  );
}
