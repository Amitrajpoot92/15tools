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
    
      {/* Compact Premium Header */}
      <div className="flex flex-col md:flex-row items-center md:items-start md:justify-between bg-slate-900 rounded-[2rem] p-5 md:p-8 mb-6 mt-2 shadow-xl border border-slate-800 text-center md:text-left overflow-hidden relative">
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-amber-500/20 rounded-full blur-[80px] pointer-events-none" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay pointer-events-none"></div>
        
        <div className="relative z-10 flex flex-col md:flex-row items-center md:items-center space-y-4 md:space-y-0 md:space-x-5 w-full">
          <div className="p-3.5 bg-white/10 rounded-2xl border border-white/10 shadow-sm backdrop-blur-md">
            <Scale className="w-7 h-7 text-amber-400" />
          </div>
          <div className="flex-1">
            <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight mb-1">
              Price per Kg Calculator
            </h1>
            <p className="text-slate-300 text-sm md:text-base max-w-xl font-medium">
              Calculate the true cost of items per kilogram to make the smartest grocery shopping decisions.
            </p>
          </div>
        </div>
      </div>

      {/* Interactive Tool */}
      <div className="max-w-4xl mx-auto mb-10">
        <PricePerKgCalculator />
      </div>

      {/* SEO Content Section */}
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
