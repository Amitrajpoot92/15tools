import type { Metadata } from "next";
import { LoveCalculator } from "@/components/calculators/LoveCalculator";
import { SEOContent } from "@/components/SEOContent";
import { Heart } from "lucide-react";

export const metadata: Metadata = {
  title: "Love Calculator - Calculate Your Compatibility | TopCalcBox",
  description: "Free online Love Calculator. Test your love compatibility and find the percentage match between you and your crush instantly.",
};

export default function LoveCalculatorPage() {
  return (
    <div className="pb-8">
      {/* Schema Markup for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            "name": "Love Calculator",
            "operatingSystem": "Any",
            "applicationCategory": "EntertainmentApplication",
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
        <div className="flex flex-col items-center text-center bg-pink-100 rounded-2xl p-4 md:p-6 mb-6 border border-pink-300">
          <h1 className="text-xl md:text-2xl font-extrabold text-[#111827] tracking-tight mb-1">
            Love Calculator
          </h1>
          <p className="text-slate-600 text-xs md:text-sm max-w-2xl font-medium leading-relaxed">
            Find out the true compatibility percentage between you and your crush playfully and instantly.
          </p>
        </div>

        {/* Interactive Tool */}
        <div className="w-full">
          <LoveCalculator />
        </div>
      </div>

      <SEOContent>
        <h2>What is a Love Calculator?</h2>
        <p>
          The <strong>Love Calculator</strong> is a fun, entertaining tool designed to calculate a compatibility percentage between two people based on their names. Simply type your name and your crush's name, and our fun algorithm will generate a "love match" score from 0% to 100%.
        </p>
        
        <h2>How Does it Work?</h2>
        <p>
          Our Love Calculator uses a deterministic character-matching algorithm. This means it takes the letters in both of your names, converts them into numerical values, and hashes them together to produce a final percentage. It's designed to be purely for fun, entertainment, and a good laugh with friends.
        </p>
        
        <h2>How to Use the Love Calculator</h2>
        <ul>
          <li><strong>Step 1:</strong> Enter your full name or first name in the first text box.</li>
          <li><strong>Step 2:</strong> Enter your partner's or crush's name in the second text box.</li>
          <li><strong>Step 3:</strong> Click the "Calculate Love %" button.</li>
          <li><strong>Step 4:</strong> Watch the magic happen and see your final compatibility score and personalized message!</li>
        </ul>

        <h2>Is the Result Real?</h2>
        <p>
          While the algorithm produces consistent results for the same two names, it's strictly for entertainment purposes. Real love and relationships are built on communication, trust, and shared values—not just a fun algorithm! Use this tool to break the ice or have a fun moment, but don't base major life decisions on it.
        </p>
      </SEOContent>
    </div>
  );
}
