import type { Metadata } from "next";
import { ProfitLossCalculator } from "@/components/calculators/ProfitLossCalculator";
import { SEOContent } from "@/components/SEOContent";
import { TrendingUp } from "lucide-react";

export const metadata: Metadata = {
  title: "Profit and Loss Calculator - Calculate Margins & Revenues | TopCalcBox",
  description: "Free online profit and loss calculator to easily find your business profit, loss amounts, and percentage margins.",
};

export default function ProfitLossPage() {
  return (
    <div className="pb-8">

      {/* Schema Markup for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            "name": "Profit and Loss Calculator",
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
        <div className="flex flex-col items-center text-center bg-emerald-50 rounded-2xl p-4 md:p-6 mb-6 border border-emerald-200">
          <h1 className="text-xl md:text-2xl font-extrabold text-emerald-800 tracking-tight mb-2">
            Profit & Loss Calculator
          </h1>
          <p className="text-slate-900 text-xs md:text-sm max-w-2xl font-medium leading-relaxed">
            Determine your profit margins, gross profit, and total loss instantly. Enter your cost and selling prices below.
          </p>
        </div>

        {/* Interactive Tool */}
        <div className="w-full">
          <ProfitLossCalculator />
        </div>
      </div>

      <SEOContent>
        <h2>What is a Profit and Loss Calculator?</h2>
        <p>
          A <strong>Profit and Loss Calculator</strong> is an indispensable financial tool built for business owners, e-commerce sellers, retail managers, and independent entrepreneurs. At its core, business is about generating value, and that value is measured through profit. This specialized calculator allows you to instantly determine the financial success or failure of a specific product, service, or overall business operation by calculating the exact difference between your Cost Price (what you paid) and your Selling Price (what you charged).
        </p>
        <p>
          With the <strong>TopCalcBox Profit and Loss Calculator</strong>, you no longer need to rely on complex Excel spreadsheets or manual arithmetic. Simply input two numbers, and our dynamic algorithm will immediately display your gross profit, total loss, and most importantly, your profit margin percentage. Tracking these metrics accurately is the first and most crucial step toward building a sustainable and highly lucrative business.
        </p>
        
        <h2>How to Use the Profit and Loss Calculator</h2>
        <p>
          We have streamlined the interface of our calculator to ensure it is user-friendly for both seasoned accountants and first-time entrepreneurs. Follow these simple steps to analyze your financial metrics:
        </p>
        <ul>
          <li><strong>Step 1: Determine your Cost Price (CP).</strong> This is the total amount of money you spent to acquire, manufacture, or produce the item. Ensure you include all related expenses like shipping, materials, and labor if you want an accurate net profit calculation. Enter this number in the "Cost Price" field.</li>
          <li><strong>Step 2: Determine your Selling Price (SP).</strong> This is the final amount of money the customer pays you for the product or service. Enter this number in the "Selling Price" field.</li>
          <li><strong>Step 3: Analyze the Output.</strong> As soon as you type the numbers, the TopCalcBox calculator will process the data in real-time. The results panel will clearly state whether you have made a <strong>Profit</strong> (highlighted in green) or incurred a <strong>Loss</strong> (highlighted in red). It will display the exact monetary amount of the profit/loss, as well as the percentage margin.</li>
        </ul>

        <h2>Calculation Formula</h2>
        <p>
          Understanding the mathematical principles behind profit and loss is fundamental to business literacy. Here are the standard formulas that our digital calculator uses to process your inputs:
        </p>
        
        <h3>1. Calculating Profit (When Selling Price &gt; Cost Price)</h3>
        <p>If you sell an item for more than it cost you, you have generated a profit.</p>
        <blockquote>
          <strong>Profit Amount</strong> = Selling Price (SP) - Cost Price (CP) <br />
          <strong>Profit Margin (%)</strong> = (Profit Amount / Cost Price) × 100
        </blockquote>
        <p><em>Example:</em> You buy a wholesale chair for $40 and sell it for $100. Your profit amount is $100 - $40 = $60. Your profit margin is (60 / 40) × 100 = 150%.</p>

        <h3>2. Calculating Loss (When Cost Price &gt; Selling Price)</h3>
        <p>If you sell an item for less than it cost you, you have incurred a loss.</p>
        <blockquote>
          <strong>Loss Amount</strong> = Cost Price (CP) - Selling Price (SP) <br />
          <strong>Loss Margin (%)</strong> = (Loss Amount / Cost Price) × 100
        </blockquote>
        <p><em>Example:</em> You buy a stock for $200, but its value drops and you are forced to sell it for $150. Your loss amount is $200 - $150 = $50. Your loss margin is (50 / 200) × 100 = 25% loss.</p>

        <h2>Common Uses / Who Can Use It</h2>
        <p>
          The TopCalcBox Profit and Loss Calculator is utilized daily by thousands of professionals across various industries:
        </p>
        <ul>
          <li><strong>E-commerce Sellers & Dropshippers:</strong> If you are selling on Amazon, Shopify, or eBay, you need to constantly monitor your margins. You must ensure that your selling price covers the product cost, shipping fees, platform fees, and advertising spend while still leaving a healthy profit.</li>
          <li><strong>Day Traders & Investors:</strong> Stock market traders and cryptocurrency investors use this tool to calculate their exact percentage gains or losses on specific trades to analyze their portfolio performance over time.</li>
          <li><strong>Retail Store Owners:</strong> When deciding how to price new inventory, store managers can use this tool to test different selling prices and immediately see what the resulting profit margin would be.</li>
          <li><strong>Freelancers & Consultants:</strong> Service providers use this calculator by entering their operational costs (software subscriptions, hourly rate base) as the Cost Price to determine how much profit they make on a specific client contract.</li>
          <li><strong>Accounting Students:</strong> A fantastic educational resource for students learning the fundamentals of corporate finance, accounting principles, and business administration.</li>
        </ul>

        <h2>Frequently Asked Questions (FAQ)</h2>
        
        <h3>1. What is the difference between Gross Profit and Net Profit?</h3>
        <p>
          Gross Profit is calculated by subtracting only the direct costs of goods sold (COGS) from your revenue. Net Profit goes a step further by subtracting all other operating expenses, such as rent, marketing, taxes, and payroll. You can use our calculator for both; simply adjust your "Cost Price" input to include either just COGS or all operating expenses.
        </p>

        <h3>2. What is a "good" profit margin?</h3>
        <p>
          A "good" profit margin varies drastically by industry. A grocery store might operate successfully on a 2% to 3% net profit margin due to massive volume, whereas a software-as-a-service (SaaS) company might expect margins of 70% to 80%. Generally, a 10% net profit margin is considered average, 20% is high, and 5% is low across most retail sectors.
        </p>

        <h3>3. Does this calculator account for sales tax or GST?</h3>
        <p>
          No, this specific tool strictly calculates the difference between Cost Price and Selling Price. If your Selling Price includes collected taxes that you must remit to the government, you should first extract those taxes using our GST Calculator to find your true Net Selling Price before calculating your profit.
        </p>

        <h3>4. Why is my Profit Margin over 100%? Is that possible?</h3>
        <p>
          Yes, a profit margin over 100% (when calculated as a Markup on Cost) is entirely possible and quite common. If you buy a product for $10 and sell it for $30, your profit is $20. (20 / 10) × 100 = a 200% profit margin based on cost.
        </p>

        <h3>5. Is my financial data kept private?</h3>
        <p>
          Absolutely. TopCalcBox processes all mathematical operations locally within your own browser. We do not transmit, save, or store your Cost Prices or Selling Prices on any external servers. Your business metrics remain strictly confidential.
        </p>

        <h2>Related Calculators</h2>
        <p>
          To gain a holistic view of your business's financial health, we highly recommend utilizing our other enterprise-grade calculators:
        </p>
        <ul>
          <li><a href="/margin-calculator" className="text-orange-600 hover:underline">Margin Calculator</a> - specifically tailored for retail markups, helping you set the perfect selling price based on your desired percentage margin.</li>
          <li><a href="/discount-calculator" className="text-orange-600 hover:underline">Discount Calculator</a> - Calculate how running a storewide sale will impact your final selling price (and subsequently, your profit).</li>
          <li><a href="/gst-calculator" className="text-orange-600 hover:underline">GST Calculator</a> - Accurately extract sales tax from your gross revenue to find your true net sales.</li>
          <li><a href="/percentage-calculator" className="text-orange-600 hover:underline">Percentage Calculator</a> - Measure your month-over-month or year-over-year business growth as a percentage.</li>
        </ul>
      </SEOContent>
    </div>
  );
}
