import type { Metadata } from "next";
import { WholesaleCalculator } from "@/components/calculators/WholesaleCalculator";
import { SEOContent } from "@/components/SEOContent";
import { PieChart } from "lucide-react";

export const metadata: Metadata = {
  title: "Wholesale Price Calculator - Calculate Retail Prices & Gross Profit | TopCalcBox",
  description: "Free online wholesale price calculator to find your selling price, gross profit, and markup based on your cost and desired Wholesale.",
};

export default function WholesalePage() {
  return (
    <div className="pb-8">

      {/* Schema Markup for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            "name": "Wholesale Price Calculator",
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
        <div className="flex flex-col items-center text-center bg-amber-100 rounded-2xl p-4 md:p-6 mb-6 border border-amber-300">
          <h1 className="text-xl md:text-2xl font-extrabold text-slate-900 tracking-tight mb-1">
            Wholesale Price Calculator
          </h1>
          <p className="text-slate-600 text-xs md:text-sm max-w-2xl font-medium leading-relaxed">
            Calculate your wholesale price and target profit quickly.
          </p>
        </div>

        {/* Interactive Tool */}
        <div className="w-full">
          <WholesaleCalculator />
        </div>
      </div>

      <SEOContent>
        <h2>What is Wholesale Price Calculator</h2>
        <p>A Wholesale Price Calculator is an online tool that helps you work out the right wholesale selling price for products sold in bulk. It uses your total cost, target profit percentage, and quantity to calculate how much you should charge while keeping your desired profit.</p>
        <p>It is useful for wholesalers, manufacturers, distributors, retailers, resellers, and small business owners who need to set prices for bulk orders. The calculator can show the wholesale price per unit, profit per unit, total profit, and total revenue, making pricing decisions easier.</p>
        <p><strong>Example:</strong> Suppose your Total Cost Price is ₹1,000, your Target Profit is 10%, and you have 10 units. Your target profit is ₹100, making the required revenue ₹1,100. The wholesale price would be ₹110 per unit, giving you a ₹100 total profit.</p>

        <h2>How to Use Wholesale Price Calculator</h2>
        <p>Using the Wholesale Price Calculator is simple. Enter your cost, target profit, and quantity to get the recommended wholesale price.</p>
        <ol>
          <li><strong>Enter the Total Cost Price:</strong> Add the complete cost of all the products.</li>
          <li><strong>Enter the Target Profit (%):</strong> Enter the profit percentage you want to earn.</li>
          <li><strong>Enter the Quantity:</strong> Add the total number of units in the order.</li>
          <li><strong>Get your result:</strong> The calculator instantly shows the wholesale price per unit, profit per unit, total profit, and total revenue.</li>
        </ol>
        <p>Use Copy to save the result or Reset to start a new calculation.</p>

        <h2>Wholesale Price Calculation Formula</h2>
        <p>The Wholesale Price Calculator uses your total cost, target profit, and quantity to work out the selling price you should charge per unit.</p>
        
        <p>
          <strong>Target Profit</strong> = Total Cost × Target Profit % ÷ 100<br/>
          <strong>Example:</strong> ₹1,000 × 10 ÷ 100 = ₹100
        </p>
        <p>
          <strong>Total Revenue</strong> = Total Cost + Target Profit<br/>
          <strong>Example:</strong> ₹1,000 + ₹100 = ₹1,100
        </p>
        <p>
          <strong>Wholesale Price Per Unit</strong> = Total Revenue ÷ Quantity<br/>
          <strong>Example:</strong> ₹1,100 ÷ 10 = ₹110 per unit
        </p>
        <p>
          <strong>Profit Per Unit</strong> = Wholesale Price Per Unit − Cost Per Unit<br/>
          <strong>Example:</strong> ₹110 − ₹100 = ₹10 profit per unit
        </p>
        <p>
          <strong>Final Result:</strong> ₹110 wholesale price per unit | ₹10 profit per unit | ₹100 total profit
        </p>

        <h2>Who Can Use a Wholesale Price Calculator</h2>
        <p>A Wholesale Price Calculator is useful for anyone who sells products in bulk and wants to set a price that covers the total cost while keeping a target profit.</p>
        <ul>
          <li><strong>Wholesalers:</strong> Set profitable prices for bulk orders and large quantities.</li>
          <li><strong>Manufacturers:</strong> Calculate selling prices based on production and other costs.</li>
          <li><strong>Distributors:</strong> Work out suitable prices when supplying products to retailers.</li>
          <li><strong>Retailers:</strong> Compare wholesale costs and calculate expected earnings on bulk purchases.</li>
          <li><strong>Resellers:</strong> Set a selling price after considering purchase costs and desired profit.</li>
          <li><strong>Online Sellers:</strong> Calculate prices for bulk enquiries and wholesale orders.</li>
          <li><strong>Small Business Owners:</strong> Quickly work out per-unit pricing, total revenue, and expected profit.</li>
        </ul>

        <h3>Frequently Asked Questions (FAQ)</h3>
        
        <h4>1. What is a wholesale price?</h4>
        <p>A wholesale price is the amount charged when products are sold in bulk, usually at a lower per-unit price than the retail price.</p>

        <h4>2. How much profit should I add to a wholesale price?</h4>
        <p>The profit percentage depends on your product, costs, market conditions, competition, and business goals. Use your target profit percentage to calculate the required wholesale price.</p>

        <h4>3. What is the difference between wholesale price and retail price?</h4>
        <p>Wholesale price is generally used for bulk sales, while retail price is the amount charged to individual customers. Retail prices are usually higher because they may include additional selling and operating costs.</p>

        <h4>4. Does wholesale price include other expenses?</h4>
        <p>It can. Costs such as packaging, transportation, production, platform fees, or other business expenses should be included in the total cost if they apply to the order.</p>

        <h4>5. Can I use a wholesale price calculator for reselling?</h4>
        <p>Yes. Resellers can include their purchase cost, additional expenses, quantity, and target profit to work out a suitable wholesale selling price.</p>

        <h4>6. Can I use a wholesale price calculator for small businesses?</h4>
        <p>Yes. Small business owners can use it to quickly calculate per-unit prices, expected profit, total revenue, and pricing for bulk orders.</p>

        <h2>Related Calculators</h2>
        <ul>
          <li><a href="/percentage-calculator" className="text-amber-600 hover:underline">Percentage Calculator</a></li>
          <li><a href="/discount-calculator" className="text-amber-600 hover:underline">Discount Calculator</a></li>
          <li><a href="/gst-calculator" className="text-amber-600 hover:underline">GST Calculator</a></li>
          <li><a href="/profit-and-loss-calculator" className="text-amber-600 hover:underline">Profit and Loss Calculator</a></li>
          <li><a href="/emi-calculator" className="text-amber-600 hover:underline">EMI Calculator</a></li>
          <li><a href="/sip-calculator" className="text-amber-600 hover:underline">SIP Calculator</a></li>
          <li><a href="/subscription-cost-calculator" className="text-amber-600 hover:underline">Subscription Cost Calculator</a></li>
        </ul>
      </SEOContent>
    </div>
  );
}
