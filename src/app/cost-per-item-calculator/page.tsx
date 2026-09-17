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
    
      {/* Compact Premium Header */}
      <div className="flex flex-col md:flex-row items-center md:items-start md:justify-between bg-slate-900 rounded-[2rem] p-5 md:p-8 mb-6 mt-2 shadow-xl border border-slate-800 text-center md:text-left overflow-hidden relative">
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-rose-500/20 rounded-full blur-[80px] pointer-events-none" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay pointer-events-none"></div>
        
        <div className="relative z-10 flex flex-col md:flex-row items-center md:items-center space-y-4 md:space-y-0 md:space-x-5 w-full">
          <div className="p-3.5 bg-white/10 rounded-2xl border border-white/10 shadow-sm backdrop-blur-md">
            <ShoppingCart className="w-7 h-7 text-rose-400" />
          </div>
          <div className="flex-1">
            <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight mb-1">
              Cost Per Item Calculator
            </h1>
            <p className="text-slate-300 text-sm md:text-base max-w-xl font-medium">
              Calculate the true price of a single unit when buying in bulk or packs.
            </p>
          </div>
        </div>
      </div>

      {/* Interactive Tool */}
      <div className="max-w-4xl mx-auto mb-10">
        <CostPerItemCalculator />
      </div>

      {/* SEO Content Section */}
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
