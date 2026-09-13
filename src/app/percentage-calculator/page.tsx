import type { Metadata } from "next";
import { PercentageCalculator } from "@/components/calculators/PercentageCalculator";
import { SEOContent } from "@/components/SEOContent";
import { Percent } from "lucide-react";

export const metadata: Metadata = {
  title: "Percentage Calculator - Fast & Accurate Online Tool | ToolZen",
  description: "Use our free online percentage calculator to quickly find the percentage of a number, calculate discounts, and figure out ratio percentages.",
};

export default function PercentageCalculatorPage() {
  return (
    <div className="pb-20">
      {/* Hero Section */}
      <div className="flex flex-col items-center justify-center text-center mb-10 mt-6">
        <div className="p-4 bg-orange-50 rounded-full mb-4 border border-orange-100 shadow-sm">
          <Percent className="w-8 h-8 text-orange-600" />
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-4">
          Percentage Calculator
        </h1>
        <p className="text-slate-500 max-w-2xl text-lg">
          Calculate percentages instantly and accurately. Enter your values below to see the results in real-time.
        </p>
      </div>

      {/* Interactive Tool */}
      <div className="max-w-4xl mx-auto mb-16">
        <PercentageCalculator />
      </div>

      {/* SEO Content Section */}
      <SEOContent>
        <h2>What is a Percentage Calculator?</h2>
        <p>
          A <strong>percentage calculator</strong> is a simple yet powerful mathematical tool designed to help you solve percentage-related problems instantly. Whether you need to figure out what percentage one number is of another, calculate a percentage increase or decrease, or determine the final price after a discount, our tool provides fast and accurate results.
        </p>
        
        <h3>How to use this tool?</h3>
        <ul>
          <li><strong>Step 1:</strong> Enter the partial value in the first input box.</li>
          <li><strong>Step 2:</strong> Enter the total value in the second input box.</li>
          <li><strong>Step 3:</strong> The tool will automatically calculate and display the percentage in real-time without needing to click any buttons.</li>
        </ul>

        <h3>Common Use Cases</h3>
        <p>Percentages are used everywhere in daily life. Here are some of the most common situations where you might need a percentage calculator:</p>
        <ul>
          <li><strong>Finance and Banking:</strong> Calculating interest rates on loans, mortgages, or savings accounts.</li>
          <li><strong>Shopping:</strong> Finding out the exact amount you save during a sale or calculating sales tax (GST/VAT).</li>
          <li><strong>Education:</strong> Converting test scores and exam marks into percentages.</li>
          <li><strong>Business:</strong> Determining profit margins, calculating growth rates, or evaluating market share.</li>
        </ul>

        <h3>The Formula for Percentage</h3>
        <p>
          If you want to calculate the percentage manually, the basic mathematical formula is:
        </p>
        <blockquote>
          <strong>Percentage = (Value / Total Value) × 100</strong>
        </blockquote>
        <p>
          For example, if you scored 45 marks out of a total of 60 in an exam, you would divide 45 by 60 to get 0.75, and then multiply by 100 to get <strong>75%</strong>.
        </p>
      </SEOContent>
    </div>
  );
}
