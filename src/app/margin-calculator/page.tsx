import type { Metadata } from "next";
import { MarginCalculator } from "@/components/calculators/MarginCalculator";
import { SEOContent } from "@/components/SEOContent";
import { PieChart } from "lucide-react";

export const metadata: Metadata = {
  title: "Wholesale Price Calculator - Calculate Retail Prices & Gross Profit | TopCalcBox",
  description: "Free online wholesale price calculator to find your selling price, gross profit, and markup based on your cost and desired margin.",
};

export default function MarginPage() {
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
        <div className="flex items-center gap-4 md:gap-6 bg-cyan-50/50 rounded-2xl p-4 md:p-6 mb-6 border border-cyan-100/50">
          <div className="hidden sm:flex flex-shrink-0 items-center justify-center w-16 h-16 bg-cyan-600 rounded-2xl shadow-sm shadow-cyan-600/20">
            <PieChart className="w-8 h-8 text-white" />
          </div>
          <div>
            <h2 className="text-[10px] md:text-xs font-bold text-cyan-600 uppercase tracking-wider mb-1">WHOLESALE PRICE</h2>
            <h1 className="text-xl md:text-2xl font-extrabold text-slate-900 tracking-tight mb-1">
              Wholesale Price Calculator
            </h1>
            <p className="text-slate-600 text-xs md:text-sm max-w-2xl font-medium leading-relaxed">
              Find out exactly what your selling price should be to achieve your desired profit margin.
            </p>
          </div>
        </div>

        {/* Interactive Tool */}
        <div className="w-full">
          <MarginCalculator />
        </div>
      </div>

      <SEOContent>
        <h2>What is a Margin Calculator?</h2>
        <p>
          A <strong>Margin Calculator</strong> is an essential, professional-grade financial utility used by retail store managers, e-commerce sellers, manufacturers, and corporate accountants. Its primary function is to determine the exact selling price you must charge for a product in order to achieve a specific, predetermined profit margin. By simply inputting your raw cost of goods and the percentage of profit you wish to make, the calculator instantly outputs the required retail price.
        </p>
        <p>
          Pricing strategy is often the deciding factor between a business thriving or facing bankruptcy. If you price your products too low, your gross margin will not be sufficient to cover your overhead operating costs (such as employee salaries, rent, and marketing). If you price them too high without justification, you will lose sales to competitors. The <strong>TopCalcBox Margin Calculator</strong> removes the mathematical guesswork from this delicate balancing act. It ensures that every product on your shelf or website is priced mathematically to guarantee your business remains profitable.
        </p>
        
        <h2>How to Use the Margin Calculator</h2>
        <p>
          We have designed the interface to be intuitive and fast, allowing business owners to price hundreds of inventory items efficiently. Here is how you use the tool:
        </p>
        <ul>
          <li><strong>Step 1: Enter the Cost Price.</strong> In the first input field, type the total cost you incurred to acquire or manufacture the product. For the most accurate margin calculation, this number should include the wholesale price of the item plus any direct costs associated with acquiring it (such as freight, shipping, or raw materials). This is known as your Cost of Goods Sold (COGS).</li>
          <li><strong>Step 2: Enter Your Desired Margin.</strong> In the second field, type the Gross Margin Percentage you want to achieve on this specific sale. (For example, if you want 40% of the final sale price to be pure profit, type "40").</li>
          <li><strong>Step 3: Analyze the Results.</strong> The calculator will process the inputs instantly. The results panel will clearly display three critical numbers:
            <ul>
              <li><strong>Selling Price:</strong> The exact dollar amount you must charge the customer.</li>
              <li><strong>Gross Profit:</strong> The actual monetary amount you will earn on the sale.</li>
              <li><strong>Markup Percentage:</strong> The percentage by which the cost was increased to reach the selling price.</li>
            </ul>
          </li>
        </ul>

        <h2>Margin vs. Markup: Understanding the Crucial Difference</h2>
        <p>
          One of the most common and devastating mistakes new entrepreneurs make is confusing Margin with Markup. While both deal with profit, they measure that profit from two entirely different baselines. If you confuse the two, you will end up pricing your products much lower than intended, severely damaging your cash flow.
        </p>
        
        <h3>1. Margin (Gross Margin)</h3>
        <p>
          <strong>Margin</strong> is your profit expressed as a percentage of the <strong>Selling Price</strong> (Revenue). It answers the question: <em>"For every dollar of revenue I make, how much of it is profit?"</em>
        </p>
        <ul>
          <li><em>Formula:</em> Margin = (Gross Profit / Selling Price) × 100</li>
          <li><em>Example:</em> You buy a shirt for $50 and sell it for $100. Your profit is $50. Your Margin is ($50 / $100) × 100 = <strong>50%</strong>. Half of your revenue is profit.</li>
        </ul>

        <h3>2. Markup</h3>
        <p>
          <strong>Markup</strong> is your profit expressed as a percentage of the <strong>Cost</strong>. It answers the question: <em>"By what percentage did I increase the cost price to arrive at the selling price?"</em>
        </p>
        <ul>
          <li><em>Formula:</em> Markup = (Gross Profit / Cost) × 100</li>
          <li><em>Example:</em> You buy a shirt for $50 and sell it for $100. Your profit is $50. Your Markup is ($50 / $50) × 100 = <strong>100%</strong>. You marked up the cost by 100%.</li>
        </ul>
        <p>
          <strong>The Golden Rule:</strong> Markup is always a higher percentage number than Margin. If you want a 50% Margin, you must apply a 100% Markup!
        </p>

        <h2>Calculation Formula: How the Tool Finds Your Price</h2>
        <p>
          If you need to calculate your selling price manually on a calculator or in an Excel spreadsheet, you cannot simply multiply the cost by the margin percentage. That is calculating a markup. To find the correct selling price based on a desired margin, you must divide the cost by the inverse of the margin. Here is the exact formula our digital tool uses:
        </p>
        
        <blockquote>
          <strong>Selling Price</strong> = Cost / [1 - (Desired Margin % / 100)]
        </blockquote>
        
        <p><strong>Let's break down an example:</strong></p>
        <p>You own a tech store. You purchase a batch of headphones from a wholesale distributor for $60 each (Cost). Your business model requires a 40% gross margin on electronics to cover store rent and employee wages. What should the selling price be?</p>
        <ol>
          <li>Convert the margin to a decimal: 40 / 100 = 0.40</li>
          <li>Subtract the margin decimal from 1: 1 - 0.40 = 0.60</li>
          <li>Divide the cost by that number: $60 / 0.60 = <strong>$100.00</strong></li>
        </ol>
        <p>You must sell the headphones for $100. (Your profit is $40, which is exactly 40% of the $100 selling price. Perfect!).</p>

        <h2>Common Uses / Who Can Use It</h2>
        <p>
          The TopCalcBox Margin Calculator is an everyday driver for professionals across the commercial spectrum:
        </p>
        <ul>
          <li><strong>Retail Managers & Boutique Owners:</strong> Setting the "sticker price" for new seasonal inventory shipments to ensure the store maintains its target 50% gross margin ("Keystone Pricing").</li>
          <li><strong>E-commerce Sellers (Shopify, Amazon):</strong> Dropshippers and Amazon FBA sellers use this tool to calculate their base selling price before factoring in complex platform fees and shipping costs.</li>
          <li><strong>Wholesalers & Manufacturers:</strong> Manufacturers who sell B2B (Business to Business) use this calculator to generate their price sheets for distributors, often operating on thinner margins like 15% or 20%.</li>
          <li><strong>Freelancers & Agencies:</strong> Service-based businesses use margin calculations to determine their hourly billing rates. If a graphic designer wants a 60% margin on a project that costs them $200 in software and asset fees, they use this tool to calculate the client's final invoice.</li>
        </ul>

        <h2>Frequently Asked Questions (FAQ)</h2>
        
        <h3>1. What is a "good" profit margin?</h3>
        <p>
          A "good" margin is entirely dependent on your industry and sales volume. Grocery stores operate on massive volume and can survive on razor-thin net margins of 1% to 3%. A high-end jewelry store might sell fewer items but requires gross margins of 60% to 80% to survive. Software (SaaS) companies often boast margins exceeding 80% because the cost of replicating digital goods is essentially zero.
        </p>

        <h3>2. What is "Keystone Pricing"?</h3>
        <p>
          Keystone pricing is a historic retail standard where a merchant simply doubles the wholesale cost of a product to determine the retail price. Doubling the cost is a 100% Markup, which equates to exactly a 50% Gross Margin.
        </p>

        <h3>3. Does this tool calculate Net Profit Margin?</h3>
        <p>
          No, this tool calculates Gross Margin (Revenue minus Cost of Goods Sold). Net Profit Margin is a much more complex calculation that involves deducting all operating expenses (taxes, interest, rent, payroll, marketing) from your gross profit.
        </p>

        <h3>4. Can my margin be 100%?</h3>
        <p>
          Mathematically, a 100% gross margin is only possible if your Cost of Goods Sold is exactly $0.00 (which is virtually impossible for physical goods, but sometimes applicable in specific digital or consulting scenarios). If you pay $1 for an item and sell it for $1,000,000, your margin approaches 99.9%, but it never quite reaches 100%. (However, your Markup can easily be 100%, 200%, or 1000%!).
        </p>

        <h2>Related Calculators</h2>
        <p>
          Mastering your business finances requires looking at your numbers from multiple angles. We highly recommend using these related calculators alongside the Margin tool:
        </p>
        <ul>
          <li><a href="/profit-and-loss-calculator" className="text-amber-600 hover:underline">Profit and Loss Calculator</a> - Enter your final selling price and cost to get a detailed breakdown of your profit or loss amounts.</li>
          <li><a href="/discount-calculator" className="text-amber-600 hover:underline">Discount Calculator</a> - Planning a Black Friday sale? Calculate your discounted selling price to see how it will affect your margins.</li>
          <li><a href="/gst-calculator" className="text-amber-600 hover:underline">GST Calculator</a> - Ensure you extract sales tax from your revenue before calculating your true margins.</li>
          <li><a href="/percentage-calculator" className="text-amber-600 hover:underline">Percentage Calculator</a> - A standard math utility for calculating general percentage increases and decreases in your operating expenses.</li>
        </ul>
      </SEOContent>
    </div>
  );
}
