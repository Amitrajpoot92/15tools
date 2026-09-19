import type { Metadata } from "next";
import { CostPerItemCalculator } from "@/components/calculators/CostPerItemCalculator";
import { SEOContent } from "@/components/SEOContent";
import { ShoppingCart } from "lucide-react";

export const metadata: Metadata = {
  title: "Cost Per Item Calculator - Find Unit Price Instantly | TopCalcBox",
  description: "Calculate the exact cost per single item when buying in bulk. Compare bulk pricing easily with our free cost per item calculator.",
};

export default function CostPerItemCalculatorPage() {
  return (
    <div className="pb-8">
      {/* Schema Markup for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            "name": "Cost Per Item Calculator",
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
        <div className="flex items-center gap-4 md:gap-6 bg-emerald-50/50 rounded-2xl p-4 md:p-6 mb-6 border border-emerald-100/50">
          <div className="hidden sm:flex flex-shrink-0 items-center justify-center w-16 h-16 bg-emerald-600 rounded-2xl shadow-sm shadow-emerald-600/20">
            <ShoppingCart className="w-8 h-8 text-white" />
          </div>
          <div>
            <h2 className="text-[10px] md:text-xs font-bold text-emerald-600 uppercase tracking-wider mb-1">COST PER ITEM</h2>
            <h1 className="text-xl md:text-2xl font-extrabold text-slate-900 tracking-tight mb-1">
              Cost Per Item Calculator
            </h1>
            <p className="text-slate-600 text-xs md:text-sm max-w-2xl font-medium leading-relaxed">
              Calculate the true price of a single unit when buying in bulk or packs.
            </p>
          </div>
        </div>

        {/* Interactive Tool */}
        <div className="w-full">
          <CostPerItemCalculator />
        </div>
      </div>

      <SEOContent>
        <h2>What is a Cost Per Item Calculator?</h2>
        <p>
          A <strong>Cost Per Item Calculator</strong> is a specialized tool that helps consumers determine the exact value of a single product when it is sold in bulk or in packs. Often, retailers bundle products to encourage bulk purchasing, but it can be confusing to know exactly how much you are paying for each individual unit inside the box.
        </p>
        <p>
          Whether you're shopping for office supplies, household goods, or deciding if a warehouse club membership is actually saving you money, the Cost Per Item Calculator instantly breaks down the total price by the quantity to reveal the true unit cost.
        </p>
        
        <h2>How to Use the Cost Per Item Calculator</h2>
        <p>
          Using this calculator is incredibly fast and intuitive:
        </p>
        <ul>
          <li><strong>Step 1: Enter Total Price.</strong> Type the total cost you are paying for the bulk package or bundle.</li>
          <li><strong>Step 2: Enter Total Quantity.</strong> Input the number of individual items contained within the package.</li>
          <li><strong>Step 3: View the Result.</strong> The calculator instantly displays the price per single item in real-time.</li>
        </ul>

        <h2>Why Calculate Unit Price?</h2>
        <p>
          Retailers frequently rely on the assumption that "bulk is always cheaper." However, promotional pricing on smaller sizes can sometimes make them a better deal per item than the large, bulk package. By calculating the unit price, you cut through the marketing tricks and make purely data-driven shopping choices.
        </p>

        <h2>Common Uses</h2>
        <ul>
          <li><strong>Warehouse Club Shoppers:</strong> Verifying if bulk purchases actually provide savings over regular supermarket prices.</li>
          <li><strong>Event Planners:</strong> Budgeting the exact cost per guest for favors, beverages, or supplies.</li>
          <li><strong>Business Owners:</strong> Determining the raw material cost per item when purchasing inventory or supplies in large quantities.</li>
        </ul>
      </SEOContent>
    </div>
  );
}
