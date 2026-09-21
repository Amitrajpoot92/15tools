import type { Metadata } from "next";
import { DiscountCalculator } from "@/components/calculators/DiscountCalculator";
import { SEOContent } from "@/components/SEOContent";
import { Tag } from "lucide-react";

export const metadata: Metadata = {
  title: "Discount Calculator - Find Final Price and Savings | TopCalcBox",
  description: "Calculate exactly how much you'll save during sales and promotions. Our free online discount calculator shows the final price and amount saved instantly.",
};

export default function DiscountCalculatorPage() {
  return (
    <div className="pb-8">

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

    
      <div className="max-w-4xl mx-auto mb-10 bg-white rounded-3xl p-4 md:p-6 shadow-sm border border-slate-200 mt-2">
        {/* Ultra Compact Header */}
        <div className="flex flex-col items-center text-center bg-emerald-50 rounded-2xl p-4 md:p-6 mb-6 border border-emerald-200">
          <h1 className="text-xl md:text-2xl font-extrabold text-[#111827] tracking-tight mb-1">
            Discount Calculator
          </h1>
          <p className="text-slate-600 text-xs md:text-sm max-w-2xl font-medium leading-relaxed">
            Calculate your savings and final price after applying a discount.
          </p>
        </div>

        {/* Interactive Tool */}
        <div className="w-full">
          <DiscountCalculator />
        </div>
      </div>

      <SEOContent>
        <h2>What is a Discount Calculator?</h2>
        <p>
          A <strong>Discount Calculator</strong> is an essential financial and everyday shopping tool designed to help you determine the final price of an item after a promotional discount, markdown, or coupon is applied. In the modern retail environment, whether you are shopping online or in a physical store, percentages off are the most common way businesses attract customers. This tool accurately translates those abstract percentages into real, tangible dollar amounts, showing you exactly how much money you are keeping in your pocket and how much you will owe at the checkout counter.
        </p>
        <p>
          At <strong>TopCalcBox</strong>, our free discount calculator simplifies the often confusing math behind sales promotions. Instead of struggling with mental arithmetic while standing in a store aisle, you can instantly see the exact amount saved and the final price. This ensures you never overpay and can confidently assess whether a "deal" is actually as good as it seems.
        </p>
        
        <h2>How to Use the Discount Calculator</h2>
        <p>
          We have designed the TopCalcBox Discount Calculator to be as fast and intuitive as possible. Follow these simple steps to calculate your savings:
        </p>
        <ul>
          <li><strong>Step 1: Original Price:</strong> Look at the price tag of the item before any discounts are applied. Enter this starting price into the "Original Price" input field.</li>
          <li><strong>Step 2: Discount Percentage:</strong> Identify the promotional offer (e.g., 20% off, 50% clearance). Enter this number into the "Discount Percentage" field. You can also use the handy quick-select buttons for common discount tiers like 10%, 20%, or 50%.</li>
          <li><strong>Step 3: View Your Savings:</strong> The calculator instantly processes the data without requiring you to click a "Calculate" button. You will immediately see two figures: the <strong>Amount Saved</strong> (how much money stays in your wallet) and the <strong>Final Price</strong> (the amount you need to pay).</li>
        </ul>

        <h2>Calculation Formula</h2>
        <p>
          If you ever find yourself needing to calculate a discount manually without access to TopCalcBox, the mathematical formula is straightforward. It requires a two-step process:
        </p>
        <blockquote>
          <strong>Step 1 (Amount Saved):</strong> (Original Price × Discount Percentage) / 100<br />
          <strong>Step 2 (Final Price):</strong> Original Price - Amount Saved
        </blockquote>
        <p>
          <strong>Example:</strong> Imagine you are buying a new television. The original price tag says $800. The store is running a "Black Friday Sale" offering a 25% discount.
        </p>
        <ol>
          <li>First, calculate the savings: (800 × 25) / 100 = 20,000 / 100 = <strong>$200 saved</strong>.</li>
          <li>Second, calculate the final price: $800 - $200 = <strong>$600 final price</strong>.</li>
        </ol>

        <h2>Common Uses / Who Can Use It</h2>
        <p>
          The discount calculator is an incredibly versatile tool used by millions of people globally for both personal and professional reasons:
        </p>
        <ul>
          <li><strong>Savvy Shoppers & Bargain Hunters:</strong> Use the tool during Black Friday, Cyber Monday, Boxing Day, and seasonal clearance events to quickly check if a deal fits within your budget before reaching the cash register.</li>
          <li><strong>Online Shoppers using Promo Codes:</strong> When an e-commerce checkout page accepts a 15% off promo code, use the calculator to verify that the shopping cart is applying the discount correctly to your subtotal.</li>
          <li><strong>Retail Store Owners & Managers:</strong> If you are running a business, you need to price your inventory competitively. This tool helps managers figure out what the new price tags should say when marking down end-of-season apparel or electronics.</li>
          <li><strong>B2B Sales Professionals:</strong> Salespeople often negotiate bulk order discounts with clients. Quickly calculating a 5% or 12% bulk order discount allows for fast, transparent negotiations on the phone or in person.</li>
          <li><strong>Budget Planners:</strong> If you are planning a large purchase (like a car or furniture) and waiting for a specific holiday sale, you can calculate potential future costs to save the exact right amount of money.</li>
        </ul>

        <h2>Frequently Asked Questions (FAQ)</h2>
        
        <h3>1. Can I calculate multiple stacked discounts?</h3>
        <p>
          In retail, "stacking" discounts (like a 20% storewide sale plus a 10% coupon) does not mean you get 30% off. You must apply them sequentially. First, use our calculator to find the price after the 20% discount. Then, take that new final price, enter it as the new "Original Price," and calculate the 10% discount on that amount.
        </p>

        <h3>2. Does this calculator include sales tax?</h3>
        <p>
          No, this specific calculator only determines the price after the discount. Because sales tax varies wildly by city, state, and country, you must calculate tax separately on the final discounted price. You can use our GST Calculator for tax purposes.
        </p>

        <h3>3. Is a 50% discount the same as "Buy One, Get One Free"?</h3>
        <p>
          Yes and no. Mathematically, if two items cost exactly the same, buying one and getting the second free means you paid 50% of the total original price for the pair. However, retailers often apply the "free" discount to the lowest-priced item in your cart, which means your total discount is usually less than 50%.
        </p>

        <h3>4. Can I use decimals for the discount percentage?</h3>
        <p>
          Absolutely. TopCalcBox is designed for precision. If a store offers a highly specific discount, such as 12.5% off, you can enter decimals directly into the percentage field to get an exact calculation down to the penny.
        </p>

        <h3>5. How do I figure out the discount percentage if I only know the old and new price?</h3>
        <h3>1. How do I calculate a discount?</h3>
        <p>Multiply the original price by the discount percentage and divide by 100. Then subtract the discount amount from the original price to get the final price.</p>

        <h3>2. Can I calculate a flat discount?</h3>
        <p>Yes. You can calculate a fixed or flat discount by subtracting the discount amount from the original price.<br/>Example: ₹2,000 − ₹300 flat discount = ₹1,700.</p>

        <h3>3. How much money will I save with a discount?</h3>
        <p>Your savings depend on the discount percentage or flat discount you enter. The calculator shows the discount amount and final price, making it easy to see your total savings.</p>

        <h3>4. Can I use a discount calculator for online shopping?</h3>
        <p>Yes. You can use it to calculate sale prices, percentage discounts, flat discounts, coupon offers and final payable amounts before making a purchase.</p>

        <h3>5. Is a 20% discount followed by a 10% discount equal to 30% off?</h3>
        <p>
          No. Two discounts applied one after another are not equal to a 30% discount. The second discount is calculated on the price after the first discount.
        </p>
        <p>
          For example, ₹1,000 after a 20% discount becomes ₹800. A further 10% discount on ₹800 is ₹80, making the final price ₹720. The total saving is ₹280, which is equal to a 28% discount.
        </p>

        <h2>Related Calculators</h2>
        <ul>
          <li><a href="/percentage-calculator" className="text-emerald-600 hover:underline">Percentage Calculator</a></li>
          <li><a href="/wholesale-calculator" className="text-emerald-600 hover:underline">Wholesale Calculator</a></li>
          <li><a href="/profit-and-loss-calculator" className="text-emerald-600 hover:underline">Profit & Loss Calculator</a></li>
          <li><a href="/cost-per-item-calculator" className="text-emerald-600 hover:underline">Cost Per Item Calculator</a></li>
          <li><a href="/gst-calculator" className="text-emerald-600 hover:underline">GST Calculator</a></li>
          <li><a href="/emi-calculator" className="text-emerald-600 hover:underline">EMI Calculator</a></li>
        </ul>
      </SEOContent>
    </div>
  );
}
