import type { Metadata } from "next";
import { GroceryBillCalculator } from "@/components/calculators/GroceryBillCalculator";
import { SEOContent } from "@/components/SEOContent";
import { ShoppingCart } from "lucide-react";

export const metadata: Metadata = {
  title: "Grocery Bill Calculator - Estimate Your Shopping Total | TopCalcBox",
  description: "Calculate your grocery bill before checkout. Easily sum up item prices and quantities to stay within your shopping budget.",
};

export default function Page() {
  return (
    <div className="pb-8">

      {/* Schema Markup for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            "name": "Electricity Bill Calculator",
            "operatingSystem": "Any",
            "applicationCategory": "BusinessApplication",
            "browserRequirements": "Requires JavaScript",
            "offers": {
              "@type": "Offer",
              "price": "0",
              "priceCurrency": "USD"
            }
          })
        }}
      />

    
      <div className="max-w-4xl mx-auto mb-10 bg-white rounded-3xl p-4 md:p-6 shadow-sm border border-slate-200 mt-2">
        {/* Ultra Compact Header */}
        <div className="flex flex-col items-center text-center bg-orange-100/50 rounded-2xl p-4 md:p-6 mb-6 border border-orange-200">
          <h1 className="text-xl md:text-2xl font-extrabold text-[#111827] tracking-tight mb-1">
            Grocery Bill Calculator
          </h1>
          <p className="text-slate-600 text-xs md:text-sm max-w-2xl font-medium leading-relaxed">
            Estimate your total shopping bill to stay within budget.
          </p>
        </div>

        {/* Interactive Tool */}
        <div className="w-full">
          <GroceryBillCalculator />
        </div>
      </div>

      <SEOContent>
        <h2>What is a Grocery Bill Calculator?</h2>
        <p>
          A <strong>Grocery Bill Calculator</strong> is a simple yet effective tool designed to help you estimate your total shopping bill before you reach the checkout counter. By adding items along with their prices and quantities as you shop, you can easily keep track of your spending and ensure you never exceed your grocery budget.
        </p>
        
        <h2>How to Use the Grocery Bill Calculator</h2>
        <p>
          Keeping track of your grocery expenses is effortless. Follow these simple steps:
        </p>
        <ul>
          <li><strong>Step 1: Add Item Name (Optional).</strong> Enter the name of the item you're placing in your cart to keep your list organized.</li>
          <li><strong>Step 2: Enter Price.</strong> Input the price of a single unit or package.</li>
          <li><strong>Step 3: Enter Quantity.</strong> Specify how many of that particular item you are purchasing. The calculator will automatically multiply the price by the quantity.</li>
          <li><strong>Step 4: View Total.</strong> The calculator maintains a running total of all items, providing you with your exact estimated bill instantly.</li>
        </ul>

        <h2>Why Use a Shopping Calculator?</h2>
        <p>
          Using a grocery calculator prevents checkout surprises. It empowers you to make informed decisions while shopping, allowing you to easily swap out expensive brands for cheaper alternatives if you notice your running total getting too high.
        </p>
      </SEOContent>
    </div>
  );
}
