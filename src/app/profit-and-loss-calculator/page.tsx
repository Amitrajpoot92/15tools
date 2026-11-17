import type { Metadata } from "next";
import { ProfitLossCalculator } from "@/components/calculators/ProfitLossCalculator";
import { SEOContent } from "@/components/SEOContent";
import { ToolHeaderBanner } from "@/components/ToolHeaderBanner";
import { TrendingUp } from "lucide-react";

export const metadata: Metadata = {
  title: "Profit and Loss Calculator – Calculate Profit or Loss",
  description: "Free online profit and loss calculator to easily find your business profit, loss amounts, and percentage margins.",
  alternates: {
    canonical: "https://topcalcbox.com/profit-and-loss-calculator",
  },
  openGraph: {
    title: "Profit and Loss Calculator – Calculate Profit or Loss",
    description: "Free online profit and loss calculator to easily find your business profit, loss amounts, and percentage margins.",
    url: "https://topcalcbox.com/profit-and-loss-calculator",
    type: "website",
  },
};

export default function ProfitLossPage() {
  return (
    <div className="pb-2 sm:pb-4">

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

    
      <div className="max-w-4xl mx-auto mb-4 sm:mb-5 bg-white rounded-2xl sm:rounded-3xl p-3.5 sm:p-5 shadow-md shadow-slate-200/60 border-2 border-slate-200/90">
        {/* Compact Header */}
        <ToolHeaderBanner
          title="Profit & Loss Calculator"
          description="Calculate your profit or loss, total cost, and profit on cost from your selling price."
          color="emerald"
          icon={<TrendingUp className="w-5 h-5" strokeWidth={2.5} />}
        />

        {/* Interactive Tool */}
        <div className="w-full">
          <ProfitLossCalculator />
        </div>
      </div>

      <SEOContent>
        <h2>About Profit and Loss Calculator</h2>
        <p>
          The <strong>Profit and Loss Calculator</strong> on TopCalcBox is a comprehensive business finance and unit economics tool built for merchants, online sellers, retail traders, and entrepreneurs. It calculates your exact gross profit, net earnings, profit margin, markup percentage, and break-even thresholds after accounting for base purchase costs and auxiliary expenses like packaging, shipping, marketing, and commissions.
        </p>
        <p>
          In commerce, comparing only the initial purchase price with the retail sale price creates a false impression of profitability. Overlooking secondary operational expenditures (freight, platform fees, payment gateway cuts, and inventory holding) frequently turns seemingly profitable sales into net losses. Our profit and loss calculator gives you a complete financial picture by incorporating total landed costs into every calculation.
        </p>

        <h2>How to Use Profit and Loss Calculator (Step-by-Step)</h2>
        <p>
          Evaluating your commercial profitability with our tool is quick and reliable:
        </p>
        <ol>
          <li><strong>Enter Cost Price (CP):</strong> Input the original manufacturing cost or wholesale procurement price per unit.</li>
          <li><strong>Enter Selling Price (SP):</strong> Input the final retail revenue or client billing price.</li>
          <li><strong>Add Overhead &amp; Incidental Expenses:</strong> Enter any secondary costs including packaging, courier delivery, marketing spend, or merchant fees.</li>
          <li><strong>Analyze Key Performance Metrics:</strong> View your Total Landed Cost, Net Profit or Loss in cash, Profit Percentage on Cost (Markup), and Profit Margin on Selling Price.</li>
          <li><strong>Copy or Reset:</strong> Copy the full financial summary to your clipboard for your accounting ledger or inventory spreadsheet.</li>
        </ol>

        <h2>Profit and Loss Formulas &amp; Financial Logic</h2>
        <p>
          Our calculator uses core accounting formulas to deliver standard commercial metrics:
        </p>

        <h3>1. Total Landed Cost</h3>
        <p>
          <code>Total Cost = Cost Price (CP) + Overhead &amp; Incidental Expenses</code>
        </p>

        <h3>2. Net Profit or Loss</h3>
        <p>
          <code>Net Profit = Selling Price (SP) − Total Cost</code> (when SP &gt; Total Cost)<br />
          <code>Net Loss = Total Cost − Selling Price (SP)</code> (when Total Cost &gt; SP)
        </p>

        <h3>3. Profit Percentage on Cost (Markup %)</h3>
        <p>
          Markup shows the percentage added above the total cost to arrive at the selling price:
        </p>
        <p>
          <code>Markup (%) = (Net Profit ÷ Total Cost) × 100</code>
        </p>

        <h3>4. Profit Margin Percentage (Margin %)</h3>
        <p>
          Margin reflects the percentage of final revenue that is kept as pure profit:
        </p>
        <p>
          <code>Profit Margin (%) = (Net Profit ÷ Selling Price) × 100</code>
        </p>

        <h2>Practical Real-World Examples</h2>
        <p>
          Here are 4 realistic commercial scenarios demonstrating profit and loss calculations:
        </p>
        <ul>
          <li>
            <strong>Example 1: E-commerce Product Reselling</strong><br />
            You buy wireless earbuds for ₹800 (CP) and spend ₹60 on custom packaging and ₹90 on courier delivery. Total cost is <code>800 + 60 + 90 = ₹950</code>. You sell them on Amazon for ₹1,499 (SP):<br />
            <code>Net Profit = 1,499 − 950 = ₹549</code>.<br />
            <code>Markup = (549 ÷ 950) × 100 = 57.79%</code>.<br />
            <code>Profit Margin = (549 ÷ 1,499) × 100 = 36.62%</code>.
          </li>
          <li>
            <strong>Example 2: Retail Apparel Clearance (Loss Scenario)</strong><br />
            A boutique buys a seasonal dress for ₹1,500 with ₹100 inbound transport (Total Cost = ₹1,600). To clear outdated stock, they sell it for ₹1,200:<br />
            <code>Net Loss = 1,600 − 1,200 = ₹400 loss</code>.<br />
            <code>Loss Percentage = (400 ÷ 1,600) × 100 = 25.0% loss on cost</code>.
          </li>
          <li>
            <strong>Example 3: Bakery / Food Catering Batch</strong><br />
            A home baker produces a specialty cake with ₹350 in baking ingredients, ₹70 in cake box packaging, and ₹80 in electricity/gas (Total Cost = ₹500). The cake sells for ₹1,100:<br />
            <code>Net Profit = 1,100 − 500 = ₹600</code>.<br />
            <code>Profit Margin = (600 ÷ 1,100) × 100 = 54.55%</code>.
          </li>
          <li>
            <strong>Example 4: Freelance Agency Project</strong><br />
            An agency quotes ₹80,000 for a website development contract. Subcontractor design costs are ₹25,000 and software asset licenses cost ₹10,000 (Total Cost = ₹35,000):<br />
            <code>Gross Profit = 80,000 − 35,000 = ₹45,000</code>.<br />
            <code>Project Margin = (45,000 ÷ 80,000) × 100 = 56.25%</code>.
          </li>
        </ul>

        <h2>Who Can Use This Calculator?</h2>
        <p>
          The profit and loss calculator serves diverse professional and commercial workflows:
        </p>
        <ul>
          <li><strong>E-commerce &amp; Marketplace Sellers:</strong> Model pricing on Amazon, Flipkart, Shopify, and Etsy after deducting platform commissions and logistics.</li>
          <li><strong>Retail Shopkeepers &amp; Distributors:</strong> Determine competitive retail selling prices while preserving healthy gross margins.</li>
          <li><strong>Manufacturers &amp; Craftsmen:</strong> Price raw material batches, factoring in production labor and overhead.</li>
          <li><strong>Commerce &amp; Accounting Students:</strong> Practice academic exercises involving cost price, markup, selling price, and gross profit.</li>
        </ul>

        <h2>Frequently Asked Questions (FAQs)</h2>
        <h3>1. What is the fundamental difference between markup and profit margin?</h3>
        <p>
          Markup is profit expressed as a percentage of your <em>cost price</em>, whereas profit margin is profit expressed as a percentage of your <em>selling price</em>. For example, if cost is ₹100 and selling price is ₹150, profit is ₹50. The markup is 50% (50 ÷ 100), but the margin is 33.33% (50 ÷ 150).
        </p>
        <h3>2. Why is my net profit lower than my gross profit?</h3>
        <p>
          Gross profit only subtracts the direct cost of purchasing or manufacturing the goods. Net profit accounts for all supplementary expenses such as marketing, packaging, shipping, platform commissions, rent, and taxes.
        </p>
        <h3>3. Can a profit margin ever exceed 100%?</h3>
        <p>
          No, profit margin cannot exceed 100% because profit is a fraction of the selling price. However, markup percentage has no ceiling and can easily exceed 100%, 200%, or more for high-margin products.
        </p>
        <h3>4. How do I find the break-even selling price?</h3>
        <p>
          Your break-even price equals your total landed cost (Cost Price + All Overhead Expenses). Selling at this exact number yields ₹0 profit and ₹0 loss.
        </p>
        <h3>5. How do I calculate profit when GST is involved?</h3>
        <p>
          Always calculate profit on pre-tax amounts. GST collected from customers is a tax liability owed to the government and does not count as business profit. Use our <a href="/gst-calculator">GST Calculator</a> to extract the pre-tax base.
        </p>
        <h3>6. Is this profit calculator free to use without an account?</h3>
        <p>
          Yes, all calculation tools on TopCalcBox are 100% free, private, and do not require user registration or software downloads.
        </p>

        <h2>Explore Related Calculators</h2>
        <p>
          Strengthen your business decision-making with these complementary financial tools:
        </p>
        <ul>
          <li><a href="/wholesale-price-calculator">Wholesale Price Calculator</a> – Structure bulk order tiered pricing and wholesale trade discounts.</li>
          <li><a href="/discount-calculator">Discount Calculator</a> – Plan sales markdowns and coupon promotions without eroding margins.</li>
          <li><a href="/gst-calculator">GST Calculator</a> – Determine applicable Goods and Services Tax splits for commercial invoices.</li>
          <li><a href="/percentage-calculator">Percentage Calculator</a> – Compute general business growth ratios and percentage changes.</li>
          <li><a href="/cost-per-item-calculator">Cost Per Item Calculator</a> – Determine unit economics across bulk manufacturing packs.</li>
        </ul>
      </SEOContent>
    </div>
  );
}
