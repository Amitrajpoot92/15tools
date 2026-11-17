import type { Metadata } from "next";
import { DiscountCalculator } from "@/components/calculators/DiscountCalculator";
import { SEOContent } from "@/components/SEOContent";
import { ToolHeaderBanner } from "@/components/ToolHeaderBanner";
import { Tag } from "lucide-react";

export const metadata: Metadata = {
  title: "Discount Calculator – Find Final Price and Savings",
  description: "Calculate exactly how much you'll save during sales and promotions. Our free online discount calculator shows the final price and amount saved instantly.",
  alternates: {
    canonical: "https://topcalcbox.com/discount-calculator",
  },
  openGraph: {
    title: "Discount Calculator – Find Final Price and Savings",
    description: "Calculate exactly how much you'll save during sales and promotions. Our free online discount calculator shows the final price and amount saved instantly.",
    url: "https://topcalcbox.com/discount-calculator",
    type: "website",
  },
};

export default function DiscountCalculatorPage() {
  return (
    <div className="pb-2 sm:pb-4">

      {/* Schema Markup for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            "name": "Discount Calculator",
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
          title="Discount Calculator"
          description="Calculate your savings and final price after applying a discount."
          color="emerald"
          icon={<Tag className="w-5 h-5" strokeWidth={2.5} />}
        />

        {/* Interactive Tool */}
        <div className="w-full">
          <DiscountCalculator />
        </div>
      </div>

      <SEOContent>
        <h2>About Discount Calculator</h2>
        <p>
          The <strong>Discount Calculator</strong> by TopCalcBox is a powerful shopping and retail utility created to help consumers and business merchants instantly compute final discounted prices, cash savings, and stacked promotional deals. Whether you are navigating Black Friday mega-sales, Diwali festival promotions, e-commerce flash deals, or clearance racks, this free online tool eliminates guesswork and ensures you know the exact final payable amount.
        </p>
        <p>
          Discounts are typically offered in two major forms: <strong>Percentage Off (%)</strong> (such as 30% off apparel) and <strong>Flat Cash Off (₹ / $)</strong> (such as ₹500 off on orders above ₹2,000). Many modern retailers also allow stacking coupon promo codes on top of existing marked-down prices. Our discount calculator handles both primary discount modes and stacked coupon codes effortlessly in real time.
        </p>

        <h2>How to Use Discount Calculator (Step-by-Step)</h2>
        <p>
          Finding your savings with our discount calculator takes only a few seconds:
        </p>
        <ol>
          <li><strong>Enter the Original Price:</strong> Input the regular retail list price or MRP before any reductions.</li>
          <li><strong>Select Discount Mode:</strong> Choose between <em>Percentage (%)</em> discount or <em>Flat Amount</em> cash discount.</li>
          <li><strong>Enter Primary Discount Rate:</strong> Input the discount percentage or exact cash reduction amount.</li>
          <li><strong>Add Extra Coupon Code (Optional):</strong> If you hold an additional promo voucher or bank card cashback, enter the additional percentage.</li>
          <li><strong>Inspect Your Net Savings:</strong> View the detailed breakdown showing the discount value, additional coupon deduction, total money saved, and final price to pay.</li>
        </ol>

        <h2>Discount Calculation Formulas & Working Method</h2>
        <p>
          Our calculator uses standard accounting principles to determine reductions accurately:
        </p>

        <h3>1. Standard Percentage Discount Formula</h3>
        <p>
          When an item has a percentage reduction off its original price:
        </p>
        <p>
          <code>Discount Amount = (Original Price × Discount Rate) ÷ 100</code><br />
          <code>Final Price = Original Price − Discount Amount</code>
        </p>

        <h3>2. Flat Cash Discount Formula</h3>
        <p>
          When an item receives a fixed dollar or rupee markdown:
        </p>
        <p>
          <code>Final Price = Original Price − Flat Discount Amount</code><br />
          <code>Effective Savings Percentage = (Flat Discount ÷ Original Price) × 100</code>
        </p>

        <h3>3. Stacked / Compounded Coupon Discount Formula</h3>
        <p>
          When an additional promotional coupon is applied after the primary sale discount, it applies to the already discounted subtotal, not the original MRP:
        </p>
        <p>
          <code>Subtotal = Original Price − Primary Discount</code><br />
          <code>Coupon Savings = (Subtotal × Coupon Rate) ÷ 100</code><br />
          <code>Final Payable Price = Subtotal − Coupon Savings</code><br />
          <code>Total Savings = Primary Discount + Coupon Savings</code>
        </p>

        <h2>Practical Real-World Examples</h2>
        <p>
          Here are 4 everyday shopping scenarios showing how discount math works:
        </p>
        <ul>
          <li>
            <strong>Example 1: End-of-Season Clothing Sale (Percentage Off)</strong><br />
            A designer jacket priced at ₹5,000 is marked down by 40%:<br />
            <code>Discount = (5,000 × 40) ÷ 100 = ₹2,000</code>.<br />
            The customer pays ₹3,000 and saves ₹2,000.
          </li>
          <li>
            <strong>Example 2: Supermarket Grocery Voucher (Flat Off)</strong><br />
            A grocery cart total comes to ₹3,450, and you apply a flat ₹500 off supermarket voucher:<br />
            <code>Final Bill = 3,450 − 500 = ₹2,950</code>.<br />
            Your effective savings rate is <code>(500 ÷ 3,450) × 100 = 14.49%</code>.
          </li>
          <li>
            <strong>Example 3: Stacked Online Sale + Credit Card Coupon</strong><br />
            A smartphone listed at ₹20,000 has a 15% platform discount, plus an extra 10% instant bank card discount:<br />
            Step 1 (Platform): <code>20,000 − 15% (₹3,000) = ₹17,000</code>.<br />
            Step 2 (Bank Coupon): <code>17,000 − 10% (₹1,700) = ₹15,300 final price</code>.<br />
            Total money saved = <code>₹3,000 + ₹1,700 = ₹4,700 (23.5% effective total savings)</code>.
          </li>
          <li>
            <strong>Example 4: Clearance Markdown vs. Original Price</strong><br />
            A pair of running shoes originally tagged at ₹4,200 is sold on clearance for ₹2,310:<br />
            Total discount amount = <code>4,200 − 2,310 = ₹1,890</code>.<br />
            Discount percentage = <code>(1,890 ÷ 4,200) × 100 = 45% off</code>.
          </li>
        </ul>

        <h2>Who Can Use This Calculator?</h2>
        <p>
          The discount calculator is an essential everyday financial companion for:
        </p>
        <ul>
          <li><strong>Everyday Shoppers:</strong> Check whether in-store flash sales and clearance racks offer genuine savings.</li>
          <li><strong>Online Shoppers:</strong> Verify stacked voucher codes, promo coupons, and bank card cashbacks on Amazon, Flipkart, or Myntra.</li>
          <li><strong>Retail Shopkeepers & Merchants:</strong> Quickly provide customer quotes, clear seasonal inventory, and calculate promotional margins.</li>
          <li><strong>Budget-Conscious Families:</strong> Plan festival shopping, back-to-school purchases, and holiday gifts within budget.</li>
        </ul>

        <h2>Frequently Asked Questions (FAQs)</h2>
        <h3>1. Is 50% + 50% discount the same as 100% free?</h3>
        <p>
          No! When retailers advertise &quot;50% off plus an extra 50% off&quot;, the second 50% applies to the remaining balance. If an item costs ₹1,000, 50% off makes it ₹500. The extra 50% off on ₹500 saves ₹250, making the final price ₹250 (a total 75% discount, not free).
        </p>
        <h3>2. How do I calculate a 20% discount in my head?</h3>
        <p>
          Find 10% of the price by moving the decimal point one place to the left, then double that number. For instance, for ₹800, 10% is ₹80, and doubling it gives ₹160 discount. Subtract ₹160 from ₹800 to get ₹640.
        </p>
        <h3>3. Does this calculator consider GST or sales tax?</h3>
        <p>
          This tool computes the discounted base price. If your purchase incurs additional sales tax or GST, you can pass the discounted total into our <a href="/gst-calculator">GST Calculator</a> to see the post-tax invoice amount.
        </p>
        <h3>4. Can I calculate flat discounts in any currency?</h3>
        <p>
          Yes. The math works universally for Indian Rupees (₹), US Dollars ($), Euros (€), British Pounds (£), or any other local currency.
        </p>
        <h3>5. What is the difference between markup and discount?</h3>
        <p>
          Markup is the percentage added to the cost price to determine selling price, whereas discount is the percentage deducted from the marked retail price to arrive at the final payable sum.
        </p>
        <h3>6. Can I use this discount calculator on my mobile phone offline?</h3>
        <p>
          Yes, TopCalcBox is fully responsive and functions as a progressive web app (PWA) with complete offline calculation capabilities.
        </p>

        <h2>Explore Related Calculators</h2>
        <p>
          Maximize your purchasing power with our related shopping and money calculators:
        </p>
        <ul>
          <li><a href="/percentage-calculator">Percentage Calculator</a> – Compute general ratios, increases, and fractional percentages.</li>
          <li><a href="/gst-calculator">GST Calculator</a> – Calculate 5%, 12%, 18%, and 28% GST inclusive and exclusive rates.</li>
          <li><a href="/cost-per-item-calculator">Cost Per Item Calculator</a> – Compare unit prices across multipacks to find true value.</li>
          <li><a href="/price-per-kg-calculator">Price Per Kg Calculator</a> – Convert bulk kilogram rates into grams and custom packaging prices.</li>
          <li><a href="/grocery-bill-calculator">Grocery Bill Calculator</a> – Tally multiple shopping items into an organized household budget.</li>
        </ul>
      </SEOContent>
    </div>
  );
}
