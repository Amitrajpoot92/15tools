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
          <h1 className="text-xl md:text-2xl font-extrabold text-[#111827] tracking-tight mb-1">
            Profit & Loss Calculator
          </h1>
          <p className="text-slate-600 text-xs md:text-sm max-w-2xl font-medium leading-relaxed">
            Calculate your profit or loss, total cost, and profit on cost from your selling price.
          </p>
        </div>

        {/* Interactive Tool */}
        <div className="w-full">
          <ProfitLossCalculator />
        </div>
      </div>

      <SEOContent>
        <h2>Profit and Loss Calculator</h2>
        <p>A Profit and Loss Calculator helps you quickly calculate your profit or loss, total cost, selling price, and profit or loss percentage. It is useful for checking how much you earn or lose after considering the cost of a product and any additional expenses.</p>
        <p>You can enter the Cost Price (CP), Selling Price (SP), and Other Costs/Expenses to get a clear breakdown of your actual profit or loss. The calculator can be used for individual products, small businesses, reselling, retail, and everyday buying and selling calculations.</p>
        <p>For example, if the Cost Price is ₹500, Selling Price is ₹600, and there are no additional expenses, your profit is ₹100. If you have ₹50 in other expenses, your total cost becomes ₹550 and your actual profit becomes ₹50.</p>

        <h2>How to Use Profit and Loss Calculator</h2>
        <p>Using the Profit and Loss Calculator is simple. Enter your costs and selling price to find your actual profit or loss.</p>
        <ol>
          <li><strong>Enter the Cost Price:</strong> Add the amount you paid to buy or produce the item.</li>
          <li><strong>Enter the Selling Price:</strong> Add the price at which you sold or plan to sell the item.</li>
          <li><strong>Add Other Costs/Expenses:</strong> Enter additional costs such as delivery, packaging, commission, or other expenses, if any.</li>
          <li><strong>Get your result:</strong> The calculator instantly shows the Total Cost, Profit or Loss, and Profit/Loss Percentage.</li>
        </ol>
        <p>Use Copy to save the result or Reset to start a new calculation.</p>

        <h2>Profit and Loss Calculation Formula</h2>
        <p>The Profit and Loss Calculator uses the following formulas to calculate your total cost, profit or loss, and percentage:</p>
        <ul>
          <li><strong>Total Cost</strong> = Cost Price + Other Costs/Expenses</li>
          <li><strong>Profit</strong> = Selling Price − Total Cost</li>
          <li><strong>Loss</strong> = Total Cost − Selling Price</li>
          <li><strong>Profit %</strong> = (Profit ÷ Total Cost) × 100</li>
          <li><strong>Loss %</strong> = (Loss ÷ Total Cost) × 100</li>
        </ul>
        <p>
          <strong>Example:</strong><br/>
          Cost Price = ₹1,000<br/>
          Other Expenses = ₹100<br/>
          Selling Price = ₹1,320<br/>
          <br/>
          Total Cost = ₹1,000 + ₹100 = ₹1,100<br/>
          Profit = ₹1,320 − ₹1,100 = ₹220<br/>
          Profit % = (₹220 ÷ ₹1,100) × 100 = 20%
        </p>
        <p>So, the profit is ₹220 and profit percentage is 20%.</p>

        <h2>Who Can Use a Profit & Loss Calculator</h2>
        <p>A Profit & Loss Calculator is useful for anyone who buys and sells products or provides services and wants to know how much they are actually earning after costs and expenses.</p>
        <ul>
          <li><strong>Shopkeepers:</strong> Quickly check the profit on each product after considering the buying price and other expenses.</li>
          <li><strong>Small Business Owners:</strong> Understand whether a product, order, or sale is giving a profit or causing a loss.</li>
          <li><strong>Online Sellers:</strong> Include costs such as packaging, delivery, platform charges, or commission to get a more realistic profit figure.</li>
          <li><strong>Resellers:</strong> Find out the actual earning after buying a product and spending money on shipping or other related costs.</li>
          <li><strong>Wholesalers & Retailers:</strong> Compare purchase and selling prices and check the profit percentage on their sales.</li>
          <li><strong>Freelancers & Service Providers:</strong> Calculate how much is left after deducting the expenses involved in completing a project or service.</li>
          <li><strong>Students:</strong> Learn profit, loss, and percentage calculations with simple real-life examples.</li>
        </ul>
        <p>It is especially helpful when the selling price alone doesn't show the complete picture. By adding other costs and expenses, you can get a clearer idea of your actual profit or loss.</p>

        <h3>Frequently Asked Questions (FAQ)</h3>
        
        <h4>1. What is a Profit and Loss Calculator?</h4>
        <p>A Profit and Loss Calculator is an online tool that calculates your profit or loss by comparing the selling price with the total cost.</p>

        <h4>2. What is the difference between cost price and selling price?</h4>
        <p>Cost Price (CP) is the amount paid to buy or produce an item, while Selling Price (SP) is the amount received when the item is sold.</p>

        <h4>3. How do I calculate profit?</h4>
        <p>Profit is calculated by subtracting the total cost from the selling price.<br/>Profit = Selling Price - Total Cost</p>

        <h4>4. Can I calculate profit after expenses?</h4>
        <p>Yes. Enter the Cost Price, Selling Price, and Other Costs/Expenses to calculate the actual profit after expenses.</p>

        <h4>5. Can I use this calculator for business?</h4>
        <p>Yes. It can be used for retail, wholesale, reselling, online selling, and small businesses to quickly check profit or loss.</p>

        <h2>Related Calculators</h2>
        <ul>
          <li><a href="/percentage-calculator" className="text-orange-600 hover:underline">Percentage Calculator</a></li>
          <li><a href="/discount-calculator" className="text-orange-600 hover:underline">Discount Calculator</a></li>
          <li><a href="/gst-calculator" className="text-orange-600 hover:underline">GST Calculator</a></li>
          <li><a href="/wholesale-calculator" className="text-orange-600 hover:underline">Wholesale Price Calculator</a></li>
          <li><a href="/emi-calculator" className="text-orange-600 hover:underline">EMI Calculator</a></li>
          <li><a href="/sip-calculator" className="text-orange-600 hover:underline">SIP Calculator</a></li>
          <li><a href="/subscription-cost-calculator" className="text-orange-600 hover:underline">Subscription Cost Calculator</a></li>
        </ul>
      </SEOContent>
    </div>
  );
}
