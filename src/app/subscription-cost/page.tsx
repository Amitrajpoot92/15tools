import type { Metadata } from "next";
import { SubscriptionCostCalculator } from "@/components/calculators/SubscriptionCostCalculator";
import { SEOContent } from "@/components/SEOContent";
import { Calculator } from "lucide-react";

export const metadata: Metadata = {
  title: "Subscription Cost Calculator - Track Monthly & Yearly Expenses | ToolZen",
  description: "Free online subscription cost calculator. Add up all your monthly and yearly subscriptions to see exactly how much you are spending on services.",
};

export default function SubscriptionCostPage() {
  return (
    <div className="pb-20">
      <div className="flex flex-col items-center justify-center text-center mb-10 mt-6">
        <div className="p-4 bg-rose-50 rounded-full mb-4 border border-rose-100 shadow-sm">
          <Calculator className="w-8 h-8 text-rose-600" />
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-4">
          Subscription Cost Calculator
        </h1>
        <p className="text-slate-500 max-w-2xl text-lg">
          Add up all your digital subscriptions to see your true monthly and yearly expenses.
        </p>
      </div>

      <div className="max-w-4xl mx-auto mb-16">
        <SubscriptionCostCalculator />
      </div>

      <SEOContent>
        <h2>What is a Subscription Cost Calculator?</h2>
        <p>
          A <strong>Subscription Cost Calculator</strong> is a personal finance tool designed to help you track the creeping costs of digital subscriptions. In the modern era of streaming, software-as-a-service, and recurring gym memberships, it is incredibly easy to lose track of how much money is leaving your bank account every month.
        </p>
        
        <h3>The "Subscription Fatigue" Problem</h3>
        <p>
          Did you know that the average consumer spends over $200 a month on recurring subscriptions? Between Netflix, Spotify, Amazon Prime, cloud storage, software licenses, and gym memberships, these small $10/month charges add up to massive yearly expenses.
        </p>
        
        <h3>How to audit your subscriptions</h3>
        <p>We recommend doing a subscription audit every 6 months using this tool:</p>
        <ol>
          <li>Open your bank and credit card statements from the last month.</li>
          <li>Enter every single recurring charge into the calculator.</li>
          <li>Look at the <strong>Total Yearly Cost</strong>.</li>
          <li>Ask yourself: <em>"Am I really getting $X worth of value from these services every year?"</em></li>
        </ol>

        <h3>How it Normalizes Frequencies</h3>
        <p>
          One of the trickiest parts of budgeting subscriptions is that some bill weekly, some monthly, and some yearly. Our calculator takes care of this by normalizing everything to a monthly and yearly standard:
        </p>
        <ul>
          <li><strong>Weekly:</strong> Multiplied by 4.33 for the monthly cost, and by 52 for the yearly cost.</li>
          <li><strong>Monthly:</strong> Kept as is for the monthly cost, multiplied by 12 for the yearly cost.</li>
          <li><strong>Yearly:</strong> Divided by 12 for the monthly cost, kept as is for the yearly cost.</li>
        </ul>
      </SEOContent>
    </div>
  );
}
