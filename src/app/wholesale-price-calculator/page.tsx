import type { Metadata } from "next";
import { WholesaleCalculator } from "@/components/calculators/WholesaleCalculator";
import { SEOContent } from "@/components/SEOContent";
import { ToolHeaderBanner } from "@/components/ToolHeaderBanner";
import { PieChart } from "lucide-react";

export const metadata: Metadata = {
  title: "Wholesale Pricing Calculator – Find Your Selling Price",
  description: "Free online wholesale price calculator to find your selling price, gross profit, and markup based on your cost and desired Wholesale.",
  alternates: {
    canonical: "https://topcalcbox.com/wholesale-price-calculator",
  },
  openGraph: {
    title: "Wholesale Pricing Calculator – Find Your Selling Price",
    description: "Free online wholesale price calculator to find your selling price, gross profit, and markup based on your cost and desired Wholesale.",
    url: "https://topcalcbox.com/wholesale-price-calculator",
    type: "website",
  },
};

export default function WholesalePage() {
  return (
    <div className="pb-2 sm:pb-4">

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

    
      <div className="max-w-4xl mx-auto mb-4 sm:mb-5 bg-white rounded-2xl sm:rounded-3xl p-3.5 sm:p-5 shadow-md shadow-slate-200/60 border-2 border-slate-200/90">
        {/* Compact Header */}
        <ToolHeaderBanner
          title="Wholesale Price Calculator"
          description="Calculate your wholesale price and target profit quickly."
          color="amber"
          icon={<PieChart className="w-5 h-5" strokeWidth={2.5} />}
        />

        {/* Interactive Tool */}
        <div className="w-full">
          <WholesaleCalculator />
        </div>
      </div>

      <SEOContent>
        <h2>About Wholesale Price Calculator</h2>
        <p>
          The <strong>Wholesale Price Calculator</strong> by TopCalcBox is a dedicated B2B pricing and margin strategy tool for manufacturers, brand creators, wholesale merchants, and distributors. It enables you to determine competitive per-unit wholesale prices, projected gross revenues, and target profit margins when selling merchandise in bulk volume to retail stockists.
        </p>
        <p>
          Wholesale pricing sits at the strategic center of the supply chain between direct cost of goods sold (COGS) and the recommended retail price (RRP). If your wholesale quote is too high, retail stores will not stock your products; if it is too low, your business will fail to cover production overhead, freight, and working capital interest. Our tool helps you balance volume discounts with sustainable commercial profitability.
        </p>

        <h2>How to Use Wholesale Price Calculator (Step-by-Step)</h2>
        <p>
          Calculating your bulk wholesale pricing is straightforward:
        </p>
        <ol>
          <li><strong>Enter Total Cost Price (COGS):</strong> Input the combined manufacturing, material, labor, and packaging expenditure for the entire production lot.</li>
          <li><strong>Set Target Profit Margin (%):</strong> Enter the wholesale profit margin percentage you require on this production run.</li>
          <li><strong>Specify Batch Quantity:</strong> Input the total number of finished units included in the bulk consignment.</li>
          <li><strong>Review Strategic Pricing Outputs:</strong> Instantly inspect Wholesale Price Per Unit, Unit Profit, Total Order Revenue, and Gross Earnings.</li>
          <li><strong>Copy or Export:</strong> Copy the quotation figures directly into client B2B proposals or commercial purchase invoices.</li>
        </ol>

        <h2>Wholesale Pricing Formulas &amp; Mathematical Logic</h2>
        <p>
          Our calculator uses established supply chain accounting formulas to establish fair bulk rates:
        </p>

        <h3>1. Total Production Cost Per Unit</h3>
        <p>
          <code>Unit Cost = Total Batch Production Cost ÷ Total Batch Quantity</code>
        </p>

        <h3>2. Wholesale Profit Determination</h3>
        <p>
          <code>Total Target Profit = Total Batch Cost × (Target Profit % ÷ 100)</code><br />
          <code>Total Order Revenue = Total Batch Cost + Total Target Profit</code>
        </p>

        <h3>3. Recommended Wholesale Unit Price</h3>
        <p>
          <code>Wholesale Price Per Unit = Total Order Revenue ÷ Total Batch Quantity</code><br />
          <code>Profit Margin Per Unit = Wholesale Price Per Unit − Unit Cost</code>
        </p>

        <h2>Practical Real-World Examples</h2>
        <p>
          Here are 4 realistic wholesale scenarios demonstrating bulk unit pricing:
        </p>
        <ul>
          <li>
            <strong>Example 1: Apparel Factory T-Shirt Run</strong><br />
            A textile workshop produces 500 premium cotton t-shirts with total production costs (fabric, stitching, labels, packing) of ₹1,00,000 (Unit Cost = ₹200). They target a 25% wholesale profit:<br />
            <code>Target Profit = (1,00,000 × 25) ÷ 100 = ₹25,000</code>.<br />
            <code>Total Wholesale Lot Price = ₹1,25,000</code>.<br />
            <code>Wholesale Price Per Shirt = 1,25,000 ÷ 500 = ₹250</code> (Retailers sell at ₹499 RRP).
          </li>
          <li>
            <strong>Example 2: Packaged Food / Snack Distributor</strong><br />
            A food manufacturer bakes 1,000 packs of artisanal cookies at a total factory cost of ₹40,000 (Unit Cost = ₹40). They apply a 15% wholesale margin for regional supermarkets:<br />
            <code>Total Revenue = 40,000 + 15% (₹6,000) = ₹46,000</code>.<br />
            <code>Wholesale Rate Per Pack = 46,000 ÷ 1,000 = ₹46</code> (Profit = ₹6/pack).
          </li>
          <li>
            <strong>Example 3: Handmade Soap &amp; Cosmetics Brand</strong><br />
            An artisan crafts 200 organic soap bars costing ₹12,000 total (₹60/bar). Targeting a 40% wholesale margin for boutique gift shops:<br />
            <code>Total Revenue = 12,000 + 40% (₹4,800) = ₹16,800</code>.<br />
            <code>Wholesale Rate = 16,800 ÷ 200 = ₹84 per bar</code>.
          </li>
          <li>
            <strong>Example 4: Mobile Accessories Importer Lot</strong><br />
            An importer lands 2,000 USB-C charging cables at a total landed cost (including customs duty and shipping) of ₹1,20,000 (Unit Cost = ₹60). They require an 18% profit margin:<br />
            <code>Total Required Revenue = 1,20,000 × 1.18 = ₹1,41,600</code>.<br />
            <code>Wholesale Unit Price = 1,41,600 ÷ 2,000 = ₹70.80 per cable</code>.
          </li>
        </ul>

        <h2>Who Can Use This Calculator?</h2>
        <p>
          The wholesale price calculator is engineered for B2B supply chain participants:
        </p>
        <ul>
          <li><strong>Product Manufacturers &amp; Factories:</strong> Establish baseline wholesale tiers from raw material and shop-floor operating budgets.</li>
          <li><strong>Distributors &amp; Stockists:</strong> Formulate multi-case volume discounts when supplying independent retailers and departmental chains.</li>
          <li><strong>Artisans &amp; D2C Brands:</strong> Transition from selling directly to consumers to pitching bulk orders to retail gift shops and marketplaces.</li>
          <li><strong>Retail Store Buyers:</strong> Evaluate supplier quotes to ensure wholesale unit costs leave adequate headroom for retail gross margins.</li>
        </ul>

        <h2>Frequently Asked Questions (FAQs)</h2>
        <h3>1. What is the standard ratio between Cost, Wholesale Price, and Retail Price (Keystone Pricing)?</h3>
        <p>
          A widely used industry benchmark is Keystone Pricing: Wholesale Price is typically 2× Cost Price (a 100% markup), and Retail Price (RRP/MRP) is typically 2× Wholesale Price. For example, if an item costs ₹100 to make, wholesale is ₹200, and retail is ₹400.
        </p>
        <h3>2. What is a healthy wholesale profit margin?</h3>
        <p>
          Typical wholesale margins range between 15% and 40% depending on the industry. Fast-moving consumer goods (FMCG) operate on leaner margins (10%–20%), whereas apparel, specialty cosmetics, and jewelry often sustain margins between 30% and 50%.
        </p>
        <h3>3. Should shipping and freight be included in the wholesale cost?</h3>
        <p>
          Yes. If you provide &quot;Free On Board&quot; (FOB) or delivered pricing, freight, palletizing, insurance, and handling charges must be added to your total baseline cost before applying your target margin.
        </p>
        <h3>4. How do minimum order quantities (MOQ) affect wholesale pricing?</h3>
        <p>
          Higher MOQs reduce unit manufacturing and packaging expenses through economies of scale. You can create tiered pricing where orders exceeding certain quantities receive lower wholesale unit rates.
        </p>
        <h3>5. How does this calculator differ from the Profit and Loss Calculator?</h3>
        <p>
          Our <a href="/profit-and-loss-calculator">Profit and Loss Calculator</a> evaluates individual product sales and existing revenue lines, whereas this tool specifically solves for the optimal per-unit selling price across a multi-unit bulk manufacturing lot.
        </p>
        <h3>6. Can I use this wholesale tool on mobile devices?</h3>
        <p>
          Yes, TopCalcBox is fully responsive, lightweight, and works seamlessly on mobile phones and tablets during vendor meetings and trade shows.
        </p>

        <h2>Explore Related Calculators</h2>
        <p>
          Optimize your commercial operations with our related business calculation tools:
        </p>
        <ul>
          <li><a href="/profit-and-loss-calculator">Profit and Loss Calculator</a> – Analyze product margins, markups, and net profit.</li>
          <li><a href="/cost-per-item-calculator">Cost Per Item Calculator</a> – Compare multi-unit purchase bundles and find unit costs.</li>
          <li><a href="/discount-calculator">Discount Calculator</a> – Calculate bulk trade discounts and client promotional markdowns.</li>
          <li><a href="/gst-calculator">GST Calculator</a> – Determine commercial invoice tax and inter-state IGST amounts.</li>
          <li><a href="/price-per-kg-calculator">Price Per Kg Calculator</a> – Calculate bulk kilogram rates into grams and custom packaging sizes.</li>
        </ul>
      </SEOContent>
    </div>
  );
}
