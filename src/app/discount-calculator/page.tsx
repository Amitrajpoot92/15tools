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
        <h2>What is Discount Calculator</h2>
        <p>A Discount Calculator is an online tool that helps you quickly calculate the discount amount, total savings, and final price of a product. It makes discount calculations easier by allowing you to calculate percentage discounts as well as flat discounts without doing the maths manually. It is useful when you want to know exactly how much you will save and how much you need to pay after the discount.</p>
        <p>For example, if a product costs ₹1,000 and has a 20% discount, you save ₹200 and pay ₹800.</p>
        <p>For a flat discount, you can enter a fixed amount instead. For example, if the original price is ₹1,000 and the flat discount is ₹150, the final price will be ₹850.</p>
        <p>A Discount Calculator is useful for checking shopping offers, sale prices, coupon discounts and promotional deals. It can help you compare different offers, understand your actual savings, and quickly calculate the final payable price before making a purchase. Whether you are shopping online or in a store, you can use it to make discount calculations simple and accurate.</p>

        <h2>How to Use Discount Calculator</h2>
        <p>Using the Discount Calculator is quick and easy. Follow these simple steps:</p>
        <ol>
          <li><strong>Enter the original price:</strong> Add the product’s original price.</li>
          <li><strong>Choose the discount type:</strong> Select Percentage (%) or Flat (₹) discount.</li>
          <li><strong>Enter the discount:</strong> Add the discount percentage or fixed amount.</li>
          <li><strong>Add coupon discount:</strong> If you have an extra coupon, enter its discount value.</li>
          <li><strong>Get your result:</strong> The calculator instantly shows the discount amount, total savings, and final price.</li>
        </ol>

        <h2>Discount Calculation Formula</h2>
        <p>The Discount Calculator uses simple formulas to calculate the discount amount, savings, and final price. It supports percentage discount, flat discount, and additional coupon discount.</p>

        <h3>1. Percentage Discount</h3>
        <p>
          <strong>Discount Amount</strong> = Original Price × Discount Percentage ÷ 100<br/>
          <strong>Final Price</strong> = Original Price − Discount Amount
        </p>
        <p>
          <strong>Example:</strong><br/>
          Original Price = ₹2,000<br/>
          Discount = 20%<br/>
          <br/>
          ₹2,000 × 20 ÷ 100 = ₹400 discount<br/>
          ₹2,000 − ₹400 = ₹1,600 final price
        </p>

        <h3>2. Flat Discount</h3>
        <p>
          For a fixed-amount discount, the calculation is:<br/>
          <strong>Final Price</strong> = Original Price − Flat Discount
        </p>
        <p>
          <strong>Example:</strong><br/>
          Original Price = ₹2,000<br/>
          Flat Discount = ₹300<br/>
          <br/>
          ₹2,000 − ₹300 = ₹1,700 final price
        </p>

        <h3>3. Additional Coupon Discount</h3>
        <p>
          If an additional coupon is applied after the first discount, the coupon is calculated on the discounted price:<br/>
          <strong>Coupon Amount</strong> = Discounted Price × Coupon Percentage ÷ 100<br/>
          <strong>Final Price</strong> = Discounted Price − Coupon Amount
        </p>
        <p>
          <strong>Example:</strong><br/>
          Original Price = ₹2,000<br/>
          First Discount = 20%<br/>
          <br/>
          ₹2,000 − ₹400 = ₹1,600<br/>
          <br/>
          Additional Coupon = 10%<br/>
          <br/>
          ₹1,600 × 10 ÷ 100 = ₹160<br/>
          <br/>
          ₹1,600 − ₹160 = ₹1,440 final price<br/>
          Total Savings = ₹2,000 − ₹1,440 = ₹560
        </p>

        <h2>Who Can Use a Discount Calculator</h2>
        <p>A Discount Calculator is useful for anyone who wants to quickly understand a discount, calculate savings, or find the final price of a product.</p>
        <ul>
          <li><strong>Shoppers:</strong> Calculate sale prices, percentage discounts, and flat discounts before buying.</li>
          <li><strong>Online Buyers:</strong> Check the actual price after applying a discount and an additional coupon.</li>
          <li><strong>Shopkeepers & Sellers:</strong> Quickly calculate discounted prices for customers and promotional offers.</li>
          <li><strong>Business Owners:</strong> Work out discounts, special offers, and selling prices more easily.</li>
          <li><strong>Students & Learners:</strong> Practice and verify discount calculations using real-world examples.</li>
          <li><strong>Everyday Users:</strong> Compare different deals and understand how much they can save.</li>
        </ul>

        <h3>Frequently Asked Questions (FAQ)</h3>
        
        <h4>1. How do I calculate a discount?</h4>
        <p>Multiply the original price by the discount percentage and divide by 100. Then subtract the discount amount from the original price to get the final price.</p>

        <h4>2. Can I calculate a flat discount?</h4>
        <p>Yes. You can calculate a fixed or flat discount by subtracting the discount amount from the original price.<br/>Example: ₹2,000 − ₹300 flat discount = ₹1,700.</p>

        <h4>3. How much money will I save with a discount?</h4>
        <p>Your savings depend on the discount percentage or flat discount you enter. The calculator shows the discount amount and final price, making it easy to see your total savings.</p>

        <h4>4. Can I use a discount calculator for online shopping?</h4>
        <p>Yes. You can use it to calculate sale prices, percentage discounts, flat discounts, coupon offers and final payable amounts before making a purchase.</p>

        <h4>5. Is a 20% discount followed by a 10% discount equal to 30% off?</h4>
        <p>No. Two discounts applied one after another are not equal to a 30% discount. The second discount is calculated on the price after the first discount.</p>
        <p>For example, ₹1,000 after a 20% discount becomes ₹800. A further 10% discount on ₹800 is ₹80, making the final price ₹720. The total saving is ₹280, which is equal to a 28% discount.</p>

        <h2>Related Calculators</h2>
        <ul>
          <li><a href="/percentage-calculator" className="text-emerald-600 hover:underline">Percentage Calculator</a></li>
          <li><a href="/wholesale-calculator" className="text-emerald-600 hover:underline">Wholesale Price Calculator</a></li>
          <li><a href="/profit-and-loss-calculator" className="text-emerald-600 hover:underline">Profit and Loss Calculator</a></li>
          <li><a href="/cost-per-item-calculator" className="text-emerald-600 hover:underline">Cost Per Item Calculator</a></li>
          <li><a href="/gst-calculator" className="text-emerald-600 hover:underline">GST Calculator</a></li>
          <li><a href="/emi-calculator" className="text-emerald-600 hover:underline">EMI Calculator</a></li>
        </ul>
      </SEOContent>
    </div>
  );
}
