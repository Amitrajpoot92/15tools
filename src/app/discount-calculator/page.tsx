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
    <div className="pb-20">
      {/* Hero Section */}
      <div className="flex flex-col items-center justify-center text-center mb-10 mt-6">
        <div className="p-4 bg-amber-50 rounded-full mb-4 border border-amber-100 shadow-sm">
          <Tag className="w-8 h-8 text-amber-600" />
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-4">
          Discount Calculator
        </h1>
        <p className="text-slate-500 max-w-2xl text-lg">
          Find out exactly how much you are saving and the final price you have to pay after a discount is applied.
        </p>
      </div>

      {/* Interactive Tool */}
      <div className="max-w-4xl mx-auto mb-16">
        <DiscountCalculator />
      </div>

      {/* SEO Content Section */}
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
        <p>
          If you know the item was $100 and is now $80, and you want to know what the percentage off is, you can use our standard Percentage Calculator tool. The formula is: ((Original Price - New Price) / Original Price) × 100.
        </p>

        <h2>Related Calculators</h2>
        <p>
          Maximize your financial literacy and shopping efficiency by checking out our other related calculators:
        </p>
        <ul>
          <li><a href="/percentage-calculator" className="text-amber-600 hover:underline">Percentage Calculator</a> - Solve any general percentage problem, find ratios, or calculate percentage increases and decreases.</li>
          <li><a href="/gst-calculator" className="text-amber-600 hover:underline">GST Calculator</a> - Add or remove sales tax from your final discounted purchase price.</li>
          <li><a href="/profit-and-loss-calculator" className="text-amber-600 hover:underline">Profit and Loss Calculator</a> - For business owners wanting to ensure their promotional discounts don't result in a net loss.</li>
          <li><a href="/margin-calculator" className="text-amber-600 hover:underline">Margin Calculator</a> - Determine your exact retail margins before applying storewide discounts.</li>
        </ul>
      </SEOContent>
    </div>
  );
}
