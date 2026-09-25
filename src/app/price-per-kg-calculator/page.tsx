import type { Metadata } from "next";
import { PricePerKgCalculator } from "@/components/calculators/PricePerKgCalculator";
import { SEOContent } from "@/components/SEOContent";
import { Scale } from "lucide-react";

export const metadata: Metadata = {
  title: "Price per Kg Calculator - Compare Costs Easily | TopCalcBox",
  description: "Calculate the exact price per kilogram to find the best deals while shopping. Compare products by price per kg instantly.",
};

export default function PricePerKgCalculatorPage() {
  return (
    <div className="pb-8">
      {/* Schema Markup for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            "name": "Price per Kg Calculator",
            "operatingSystem": "Any",
            "applicationCategory": "ShoppingApplication",
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
        {/* Ultra Compact Header */}
        <div className="flex flex-col items-center text-center bg-[#c3f6e1] rounded-2xl p-4 md:p-6 mb-6 border border-emerald-300">
          <h1 className="text-xl md:text-2xl font-extrabold text-[#111827] tracking-tight mb-1">
            Price Per Kg Calculator
          </h1>
          <p className="text-slate-600 text-xs md:text-sm max-w-2xl font-medium leading-relaxed">
            Calculate quantity in grams or total price from a price per kilogram.
          </p>
        </div>

        {/* Interactive Tool */}
        <div className="w-full">
          <PricePerKgCalculator />
        </div>
      </div>

      <SEOContent>
        <h2>What is a Price per Kg Calculator?</h2>
        <p>
          A <strong>Price per Kg Calculator</strong> is a specialized shopping tool designed to help consumers determine the exact value they are getting for their money. In retail and grocery stores, products are packaged in various sizes, making it difficult to compare prices at a glance. Our calculator breaks down the total cost into a standardized unit (price per kilogram), allowing for clear, apples-to-apples comparisons.
        </p>
        <p>
          Whether you're deciding between a bulk bag of flour and a smaller box, or trying to find the cheapest produce, the TopCalcBox Price per Kg Calculator instantly reveals which product gives you the best deal. 
        </p>
        
        <h2>How to Use the Price per Kg Calculator</h2>
        <p>
          Using this calculator is incredibly simple and perfectly suited for quick comparisons while shopping:
        </p>
        <ul>
          <li><strong>Step 1: Enter the Price.</strong> Type the total cost of the product into the first field.</li>
          <li><strong>Step 2: Enter the Weight.</strong> Input the total weight of the product (e.g., if it's a 500g bag, enter 500).</li>
          <li><strong>Step 3: Select the Unit.</strong> Choose whether you entered the weight in grams (g) or kilograms (kg) from the dropdown menu.</li>
          <li><strong>Step 4: View the Result.</strong> The calculator will instantly display the standardized price per kilogram in large, readable text.</li>
        </ul>

        <h2>Why is Unit Pricing Important?</h2>
        <p>
          Supermarkets frequently use clever packaging and sizing to obscure the true cost of items. A product that appears to be on sale might actually be more expensive per kg than a bulk alternative hidden on the bottom shelf. Unit pricing cuts through the marketing noise, revealing the core cost of the consumable material. 
        </p>

        <h2>Common Uses / Who Can Use It</h2>
        <ul>
          <li><strong>Grocery Shoppers:</strong> Finding the absolute best value across different brands and package sizes in the supermarket aisles.</li>
          <li><strong>Bulk Buyers:</strong> Determining if the "family size" or warehouse club bulk item is genuinely cheaper per kg than the standard retail size.</li>
          <li><strong>Small Business Owners:</strong> Calculating the exact material cost of ingredients per kilogram when scaling recipes or manufacturing goods.</li>
        </ul>
      </SEOContent>
    </div>
  );
}
