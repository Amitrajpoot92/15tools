import type { Metadata } from "next";
import { SubscriptionCostCalculator } from "@/components/calculators/SubscriptionCostCalculator";
import { SEOContent } from "@/components/SEOContent";
import { Calculator } from "lucide-react";

export const metadata: Metadata = {
  title: "Subscription Cost Calculator - Track Monthly & Yearly Expenses | TopCalcBox",
  description: "Free online subscription cost calculator. Add up all your monthly and yearly subscriptions to see exactly how much you are spending on services.",
};

export default function SubscriptionCostPage() {
  return (
    <div className="pb-8">

      {/* Schema Markup for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            "name": "Subscription Cost Calculator",
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
        {/* Ultra Compact Header */}
        <div className="flex flex-col items-center text-center bg-rose-50 rounded-2xl p-4 md:p-6 mb-6 border border-rose-200">
          <h1 className="text-xl md:text-2xl font-extrabold text-[#111827] tracking-tight mb-1">
            Subscription Cost Calculator
          </h1>
          <p className="text-slate-600 text-xs md:text-sm max-w-2xl font-medium leading-relaxed">
            Add up all your digital subscriptions to see your true monthly and yearly expenses.
          </p>
        </div>

        {/* Interactive Tool */}
        <div className="w-full">
          <SubscriptionCostCalculator />
        </div>
      </div>

      <SEOContent>
        <h2>What is a Subscription Cost Calculator</h2>
        <p>A Subscription Cost Calculator is an online tool that helps you calculate how much you spend on recurring subscriptions every month and year. You can add multiple subscriptions, enter their prices, and select whether they are billed monthly or yearly.</p>
        <p>It is useful for tracking expenses on streaming services, music apps, software, memberships, cloud storage, and other recurring services. By seeing your total subscription cost in one place, you can easily understand how much you are spending on subscriptions.</p>

        <h2>How to Use the Subscription Cost Calculator</h2>
        <p>Using the Subscription Cost Calculator is simple. Add your recurring subscriptions to see your total monthly and yearly spending.</p>
        <ol>
          <li><strong>Add Subscription:</strong> Enter the name of your subscription.</li>
          <li><strong>Enter Cost:</strong> Add the subscription price.</li>
          <li><strong>Select Billing Frequency:</strong> Choose Monthly or Yearly.</li>
          <li><strong>Add More Subscriptions:</strong> Tap Add New to include other subscriptions.</li>
          <li><strong>Get Your Result:</strong> See your Total Monthly Cost and Total Yearly Cost.</li>
          <li><strong>Copy or Reset:</strong> Use Copy to copy your calculation or Reset to clear the details and start again.</li>
        </ol>

        <h2>Subscription Cost Calculation Formula</h2>
        <p>The Subscription Cost Calculator adds the cost of your recurring subscriptions and shows how much you spend each month and year.</p>
        <ul>
          <li><strong>Total Monthly Cost</strong> = Sum of All Monthly Subscription Costs</li>
          <li><strong>Total Yearly Cost</strong> = Total Monthly Cost × 12</li>
        </ul>
        
        <h3>Example</h3>
        <p>Suppose you have 3 monthly subscriptions:</p>
        <ul>
          <li>Netflix = ₹299/month</li>
          <li>Spotify = ₹119/month</li>
          <li>Cloud Storage = ₹130/month</li>
        </ul>
        <p>Total Monthly Cost = ₹299 + ₹119 + ₹130 = ₹548</p>
        <p>Total Yearly Cost = ₹548 × 12 = ₹6,576</p>
        <p>So, your total subscription expense is ₹548 per month and ₹6,576 per year. For yearly subscriptions, the yearly price is converted into a monthly equivalent when calculating the total monthly cost.</p>

        <h2>Who Can Use a Subscription Cost Calculator</h2>
        <p>A Subscription Cost Calculator is useful for anyone who wants to track and manage recurring subscription expenses.</p>
        <ul>
          <li><strong>Everyday Users:</strong> Track monthly spending on different subscriptions.</li>
          <li><strong>Streaming Users:</strong> Calculate costs for Netflix, Spotify, YouTube, and similar services.</li>
          <li><strong>Students:</strong> Keep subscription expenses within a monthly budget.</li>
          <li><strong>Families:</strong> Track multiple subscriptions used by family members.</li>
          <li><strong>Freelancers:</strong> Calculate expenses for software and online tools.</li>
          <li><strong>Small Businesses:</strong> Track recurring costs for business software and services.</li>
          <li><strong>Budget Planners:</strong> Understand total monthly and yearly subscription spending.</li>
        </ul>

        <h3>Frequently Asked Questions (FAQ)</h3>
        <h4>1. What is a Subscription Cost Calculator?</h4>
        <p>A Subscription Cost Calculator helps you calculate your total spending on recurring subscriptions on a monthly and yearly basis.</p>

        <h4>2. How do I calculate yearly subscription cost?</h4>
        <p>Add your monthly subscription costs and multiply the total by 12 to calculate the yearly cost.</p>

        <h4>3. Can I calculate the cost of multiple subscriptions?</h4>
        <p>Yes. You can add multiple subscriptions and calculate their combined monthly and yearly expenses.</p>

        <h4>4. Can I include both monthly and yearly subscriptions?</h4>
        <p>Yes. You can add subscriptions with different billing frequencies to calculate their overall cost.</p>

        <h4>5. Can I use this calculator for streaming subscriptions?</h4>
        <p>Yes. You can use it for streaming, music, gaming, cloud storage, software, memberships, and other recurring services.</p>

        <h2>Related Calculators</h2>
        <ul>
          <li><a href="/percentage-calculator" className="text-rose-600 hover:underline">Percentage Calculator</a></li>
          <li><a href="/cost-per-item-calculator" className="text-rose-600 hover:underline">Cost Per Item Calculator</a></li>
          <li><a href="/emi-calculator" className="text-rose-600 hover:underline">EMI Calculator</a></li>
        </ul>
      </SEOContent>
    </div>
  );
}
