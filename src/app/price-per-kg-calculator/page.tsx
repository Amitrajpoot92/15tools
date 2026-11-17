import type { Metadata } from "next";
import { PricePerKgCalculator } from "@/components/calculators/PricePerKgCalculator";
import { SEOContent } from "@/components/SEOContent";
import { ToolHeaderBanner } from "@/components/ToolHeaderBanner";
import { Scale } from "lucide-react";

export const metadata: Metadata = {
  title: "Price per Kg Calculator – Compare Product Costs",
  description: "Calculate the exact price per kilogram to find the best deals while shopping. Compare products by price per kg instantly.",
  alternates: {
    canonical: "https://topcalcbox.com/price-per-kg-calculator",
  },
  openGraph: {
    title: "Price per Kg Calculator – Compare Product Costs",
    description: "Calculate the exact price per kilogram to find the best deals while shopping. Compare products by price per kg instantly.",
    url: "https://topcalcbox.com/price-per-kg-calculator",
    type: "website",
  },
};

export default function PricePerKgCalculatorPage() {
  return (
    <div className="pb-2 sm:pb-4">
      {/* Schema Markup for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            "name": "Price per Kg Calculator",
            "operatingSystem": "Any",
            "applicationCategory": "ShoppingApplication",
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
          title="Price Per Kg Calculator"
          description="Calculate quantity in grams or total price from a price per kilogram."
          color="amber"
          icon={<Scale className="w-5 h-5" strokeWidth={2.5} />}
        />

        {/* Interactive Tool */}
        <div className="w-full">
          <PricePerKgCalculator />
        </div>
      </div>

      <SEOContent>
        <h2>About Price Per Kilogram Calculator</h2>
        <p>
          The <strong>Price Per Kilogram Calculator</strong> on TopCalcBox is an essential daily shopping and retail utility designed to convert per-kilogram wholesale or retail rates into accurate portion prices and exact gram quantities. In daily local markets, supermarkets, and sabzi mandis (produce bazaars), commodities like fresh vegetables, fruits, pulses (dal), cooking grains, paneer, meats, dry fruits, and spices are uniformly priced per kilogram. However, shoppers frequently buy customized portions such as 150 grams, 250 grams (ek pao), 400 grams, or simply ask for a round rupee budget like &ldquo;₹50 ki sabzi&rdquo;.
        </p>
        <p>
          Mental math at the checkout counter often leads to estimation errors, vendor rounding discrepancies, or overpaying for packaged goods. This dual-mode calculator provides immediate mathematical accuracy. Whether you want to discover <em>how much a custom weight in grams will cost</em> or <em>how many grams you receive for a fixed cash payment</em>, this tool computes your exact financial transaction in milliseconds.
        </p>

        <h2>How to Use the Price Per Kilogram Calculator</h2>
        <p>
          Choose between two versatile calculation modes depending on your shopping scenario:
        </p>
        <ol>
          <li><strong>Select Calculation Mode:</strong>
            <ul>
              <li><strong>Find Price (Cost for Weight):</strong> Use this when you know the item weight in grams and want to know what to pay at the counter.</li>
              <li><strong>Find Quantity (Weight for Budget):</strong> Use this when you have a fixed banknote (e.g., ₹20, ₹50, or ₹100) and want to know the exact grams the vendor owes you.</li>
            </ul>
          </li>
          <li><strong>Enter Price Per Kilogram (₹/kg):</strong> Input the standard rate per kilogram displayed on the board or shelf (e.g., ₹180/kg).</li>
          <li><strong>Enter Weight or Budget:</strong>
            <ul>
              <li>In &ldquo;Find Price&rdquo; mode, enter the target grams (e.g., <code>350</code> for 350g).</li>
              <li>In &ldquo;Find Quantity&rdquo; mode, enter your budget (e.g., <code>₹50</code>).</li>
            </ul>
          </li>
          <li><strong>View Instant Result:</strong> The tool immediately calculates the exact monetary cost or weight in grams, accompanied by unit breakdown costs.</li>
          <li><strong>Copy or Reset:</strong> Save the calculation or clear fields to evaluate the next grocery item on your shopping list.</li>
        </ol>

        <h2>Price Per Kilogram Formulas &amp; Unit Conversion Mathematics</h2>
        <p>
          The metric system defines 1 kilogram as precisely equal to 1,000 grams (1 kg = 1,000 g). Using this constant ratio, our calculator executes standard proportional mathematics:
        </p>

        <h3>1. Calculate Total Price for Given Grams</h3>
        <p>
          <code>Total Cost (₹) = (Price per Kilogram × Weight in Grams) ÷ 1000</code>
        </p>
        <p>
          Alternatively, find the unit price per single gram (Price per Gram = Price per Kilogram ÷ 1000), then multiply by total grams:
          <code>Total Cost = Price per Gram × Weight in Grams</code>.
        </p>

        <h3>2. Calculate Quantity (Grams) for Fixed Cash Budget</h3>
        <p>
          <code>Quantity in Grams = (Budget Paid ÷ Price per Kilogram) × 1000</code>
        </p>

        <h3>3. Quick Unit Price Benchmarks</h3>
        <ul>
          <li><strong>Price per 100 grams:</strong> Rate per kg ÷ 10</li>
          <li><strong>Price per 250 grams (1 Pao / Quarter kg):</strong> Rate per kg ÷ 4</li>
          <li><strong>Price per 500 grams (Half kg):</strong> Rate per kg ÷ 2</li>
        </ul>

        <h2>Practical Real-World Shopping Examples</h2>

        <h3>Example 1: Buying Fresh Paneer (Cottage Cheese)</h3>
        <p>
          <strong>Scenario:</strong> Premium fresh dairy paneer is sold at ₹440 per kg. You need exactly 350 grams for a family recipe.
        </p>
        <ul>
          <li><strong>Calculation:</strong> Cost = (440 × 350) ÷ 1000 = 154,000 ÷ 1000 = <strong>₹154.00</strong>.</li>
          <li><strong>Verification:</strong> 250g is ₹110, 100g is ₹44. Total for 350g = ₹110 + ₹44 = ₹154.</li>
        </ul>

        <h3>Example 2: Fixed Cash Produce Purchase in a Vegetable Market</h3>
        <p>
          <strong>Scenario:</strong> Green chillies or fresh ginger cost ₹160 per kilogram. You only want to spend a ₹20 coin.
        </p>
        <ul>
          <li><strong>Calculation:</strong> Grams = (20 ÷ 160) × 1000 = 0.125 × 1000 = <strong>125 grams</strong>.</li>
          <li><strong>Outcome:</strong> The vendor must weigh exactly 125 grams onto their digital weighing scale.</li>
        </ul>

        <h3>Example 3: Gourmet Dry Fruits (Cashews &amp; Almonds)</h3>
        <p>
          <strong>Scenario:</strong> Roasted California almonds cost ₹960 per kilogram. You want to purchase 750 grams.
        </p>
        <ul>
          <li><strong>Calculation:</strong> Cost = (960 × 750) ÷ 1000 = 720,000 ÷ 1000 = <strong>₹720.00</strong>.</li>
        </ul>

        <h3>Example 4: Luxury Spices (Green Cardamom / Elaichi)</h3>
        <p>
          <strong>Scenario:</strong> Whole green cardamom sells at a wholesale price of ₹3,400 per kg. A home cook purchases 40 grams.
        </p>
        <ul>
          <li><strong>Calculation:</strong> Price per gram = 3400 ÷ 1000 = ₹3.40 per gram.</li>
          <li><strong>Total Price:</strong> 40 × ₹3.40 = <strong>₹136.00</strong>.</li>
        </ul>

        <h2>Who Can Use This Calculator?</h2>
        <p>
          The Price Per Kilogram Calculator is beneficial across retail, domestic, and commercial environments:
        </p>
        <ul>
          <li><strong>Household Grocery Buyers:</strong> Verify vegetable cart bills, dry fruit purchases, and butcher weighing scales instantly on your smartphone.</li>
          <li><strong>Market Vendors &amp; Street Hawkers:</strong> Rapidly quote exact amounts when customers ask for odd weights (like 175g or 650g) without reaching for scratch paper.</li>
          <li><strong>Chefs, Bakers &amp; Commercial Kitchens:</strong> Calculate precise ingredient batch food costs for menu recipe engineering.</li>
          <li><strong>Supermarket Shoppers:</strong> Compare pre-packaged shrink-wrapped pulses against loose bin items to find the genuine lower price per kilogram.</li>
          <li><strong>Sweet Shop &amp; Mithai Owners:</strong> Determine billing for custom mixed sweet boxes containing varying weights of kaju katli, laddoo, and gulab jamun.</li>
        </ul>

        <h2>Frequently Asked Questions (FAQs)</h2>

        <h3>1. How do I quickly calculate the price of 100 grams from a 1 kg rate?</h3>
        <p>
          Simply divide the price per kilogram by 10 (or move the decimal point one place to the left). For example, if cashew nuts are ₹850/kg, 100 grams will cost exactly ₹85.00.
        </p>

        <h3>2. How much is 250 grams in terms of a kilogram?</h3>
        <p>
          250 grams is exactly one quarter (1/4th) of a kilogram, commonly referred to as &ldquo;ek pao&rdquo; across South Asia. To find its cost, simply divide the kilogram price by 4. If apples cost ₹160/kg, 250 grams costs \(₹160 / 4 = ₹40\).
        </p>

        <h3>3. How does this calculator help defeat shrinkflation?</h3>
        <p>
          Manufacturers often reduce package sizes (e.g., from 500g down to 420g) while keeping the retail price unchanged. By entering the package weight and shelf price into our <a href="/cost-per-item-calculator" className="text-blue-600 hover:underline">Cost Per Item Calculator</a> or normalizing to per-kg rates, you can spot subtle price-per-gram inflation immediately.
        </p>

        <h3>4. Can I use this calculator for other weight units like pounds or ounces?</h3>
        <p>
          While the default arithmetic operates on 1,000 grams per kilogram, the proportional logic is identical for any unit divided into 1,000 subdivisions (such as metric tonnes divided into kilograms).
        </p>

        <h3>5. Why do vendors round up loose vegetable weights?</h3>
        <p>
          Vendors frequently round odd totals (like ₹43.70 up to ₹45) due to physical coin shortage. Knowing the exact mathematical total gives you the confidence to adjust weights or pay using UPI QR codes for exact penny precision.
        </p>

        <h3>6. Does this calculator include sales tax or GST?</h3>
        <p>
          Unbranded, loose agricultural produce (such as fresh fruits, vegetables, grains, and milk) is GST-exempt in India. For branded or packaged processed goods where GST applies, you can check tax breakdowns with our <a href="/gst-calculator" className="text-blue-600 hover:underline">GST Calculator</a>.
        </p>

        <h2>Related Shopping &amp; Retail Calculators</h2>
        <p>
          Streamline your grocery budgeting and trade economics with these companion calculators:
        </p>
        <ul>
          <li><a href="/cost-per-item-calculator" className="text-blue-600 hover:underline font-medium">Cost Per Item Calculator</a> &ndash; Compare bulk multi-packs and single-unit packaging to maximize savings.</li>
          <li><a href="/grocery-bill-calculator" className="text-blue-600 hover:underline font-medium">Grocery Bill Calculator</a> &ndash; Tally your supermarket basket items, taxes, and cumulative discounts.</li>
          <li><a href="/wholesale-price-calculator" className="text-blue-600 hover:underline font-medium">Wholesale Price Calculator</a> &ndash; Calculate volume purchase prices, distributor markups, and lot costs.</li>
          <li><a href="/profit-and-loss-calculator" className="text-blue-600 hover:underline font-medium">Profit and Loss Calculator</a> &ndash; Compute merchant cost prices, selling margins, and retail profits.</li>
          <li><a href="/discount-calculator" className="text-blue-600 hover:underline font-medium">Discount Calculator</a> &ndash; Calculate promotional percentage markdowns and clearance sale deals.</li>
        </ul>
      </SEOContent>
    </div>
  );
}
