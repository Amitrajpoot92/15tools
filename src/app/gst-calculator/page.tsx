import type { Metadata } from "next";
import { GSTCalculator } from "@/components/calculators/GSTCalculator";
import { SEOContent } from "@/components/SEOContent";
import { Receipt } from "lucide-react";

export const metadata: Metadata = {
  title: "GST Calculator - Calculate Goods and Services Tax | ToolZen",
  description: "Free online GST calculator to easily add or remove Goods and Services Tax from your amounts. Supports 5%, 12%, 18%, and 28% GST rates.",
};

export default function GSTCalculatorPage() {
  return (
    <div className="pb-20">
      {/* Hero Section */}
      <div className="flex flex-col items-center justify-center text-center mb-10 mt-6">
        <div className="p-4 bg-purple-50 rounded-full mb-4 border border-purple-100 shadow-sm">
          <Receipt className="w-8 h-8 text-purple-600" />
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-4">
          GST Calculator
        </h1>
        <p className="text-slate-500 max-w-2xl text-lg">
          Add or remove GST from your prices instantly. See the net amount, GST amount, and total price broken down clearly.
        </p>
      </div>

      <div className="max-w-4xl mx-auto mb-16">
        <GSTCalculator />
      </div>

      <SEOContent>
        <h2>What is a GST Calculator?</h2>
        <p>
          A <strong>GST (Goods and Services Tax) Calculator</strong> is a simple financial utility that allows businesses, freelancers, and consumers to accurately calculate the amount of tax applied to a product or service. You can use it to either add GST to a base price or extract the GST amount from a total price.
        </p>
        
        <h3>Exclusive vs. Inclusive GST</h3>
        <p>Our calculator supports both types of GST calculations:</p>
        <ul>
          <li><strong>Add GST (Exclusive):</strong> Use this when you have a base price and you need to add the tax on top of it. For example, if you sell a service for $1000 and need to charge 18% GST, the tool will calculate the tax as $180, making the final bill $1180.</li>
          <li><strong>Remove GST (Inclusive):</strong> Use this when you have the final price that already includes the tax, and you want to find out what the original base price was and how much of the total is tax.</li>
        </ul>

        <h3>Common GST Rates</h3>
        <p>The standard tax slabs supported in our tool (frequently used in countries like India, Australia, etc.) include:</p>
        <ul>
          <li><strong>5%:</strong> Generally applied to essential goods and services.</li>
          <li><strong>12%:</strong> Standard rate for certain daily-use items.</li>
          <li><strong>18%:</strong> The most common rate applied to the majority of services and products.</li>
          <li><strong>28%:</strong> Applied to luxury items and premium goods.</li>
        </ul>

        <h3>How to calculate GST manually?</h3>
        <p>Here are the mathematical formulas behind our calculator:</p>
        <blockquote>
          <strong>Adding GST:</strong> <br />
          GST Amount = (Original Cost × GST Rate) / 100 <br />
          Net Price = Original Cost + GST Amount
        </blockquote>
        <br />
        <blockquote>
          <strong>Removing GST:</strong> <br />
          GST Amount = Total Cost - [Total Cost × (100 / (100 + GST Rate))] <br />
          Net Price = Total Cost - GST Amount
        </blockquote>
      </SEOContent>
    </div>
  );
}
