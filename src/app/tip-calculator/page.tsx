import type { Metadata } from "next";
import { TipCalculator } from "@/components/calculators/TipCalculator";
import { SEOContent } from "@/components/SEOContent";
import { Banknote } from "lucide-react";

export const metadata: Metadata = {
  title: "Tip Calculator - Split the Bill and Calculate Gratuity | ToolZen",
  description: "Free online tip calculator. Easily calculate restaurant tips, split the final bill among friends, and see exact per-person costs.",
};

export default function TipCalculatorPage() {
  return (
    <div className="pb-20">
      <div className="flex flex-col items-center justify-center text-center mb-10 mt-6">
        <div className="p-4 bg-orange-50 rounded-full mb-4 border border-orange-100 shadow-sm">
          <Banknote className="w-8 h-8 text-orange-600" />
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-4">
          Tip Calculator
        </h1>
        <p className="text-slate-500 max-w-2xl text-lg">
          Calculate the perfect tip and instantly split the final bill with your friends.
        </p>
      </div>

      <div className="max-w-4xl mx-auto mb-16">
        <TipCalculator />
      </div>

      <SEOContent>
        <h2>What is a Tip Calculator?</h2>
        <p>
          A <strong>Tip Calculator</strong> is a quick mathematical tool designed to help you figure out exactly how much gratuity to leave on a bill, and how to evenly split the total cost among a group of people. Whether you are dining at a restaurant, taking a cab, or getting a haircut, tipping is a standard practice, and this tool takes the mental math out of it.
        </p>
        
        <h3>Standard Tipping Practices</h3>
        <p>While tipping culture varies by country, in the United States and Canada, standard tipping rates are generally:</p>
        <ul>
          <li><strong>15%</strong> - Standard service</li>
          <li><strong>18%</strong> - Good service</li>
          <li><strong>20% to 25%</strong> - Excellent service</li>
        </ul>

        <h3>How is the Tip Calculated?</h3>
        <p>
          Calculating a tip manually involves finding a percentage of the total bill. If your bill is $100 and you want to leave a 20% tip, the math is:
        </p>
        <blockquote>
          <strong>Tip Amount = (Bill Amount × Tip Percentage) / 100</strong><br />
          Tip = (100 × 20) / 100 = $20
        </blockquote>
        <p>To find the total amount you will pay, you add the tip to the original bill:</p>
        <blockquote>
          <strong>Total Amount = Bill + Tip</strong><br />
          Total = 100 + 20 = $120
        </blockquote>

        <h3>Splitting the Bill</h3>
        <p>
          One of the best features of this tool is the bill-splitting function. If you went out to dinner with 3 other friends (4 people total), calculating who owes what can be frustrating. Our tool takes the <strong>Total Amount</strong> and simply divides it by the <strong>Number of People</strong>, ensuring everyone pays an equal, fair share.
        </p>
      </SEOContent>
    </div>
  );
}
