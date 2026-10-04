import type { Metadata } from "next";
import { PricePerKgCalculator } from "@/components/calculators/PricePerKgCalculator";
import { SEOContent } from "@/components/SEOContent";
import { Scale } from "lucide-react";

export const metadata: Metadata = {
  title: "Price per Kg Calculator - Compare Costs Easily | TopCalcBox",
  description: "Calculate the exact price per kilogram to find the best deals while shopping. Compare products by price per kg instantly.",
};

export default function PricePerKgCalculatorPage() {
  return (
    <div className="pb-8">
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

    
      <div className="max-w-4xl mx-auto mb-10 bg-white rounded-3xl p-4 md:p-6 shadow-sm border border-slate-200 mt-2">
        {/* Compact Header */}
        {/* Compact Header */}
        <div className="flex flex-col items-center text-center bg-amber-50/70 rounded-2xl p-4 md:p-6 mb-6 border border-amber-200/80">
          <h1 className="text-xl md:text-2xl font-extrabold text-amber-950 tracking-tight mb-1">
            Price Per Kg Calculator
          </h1>
          <p className="text-amber-900/75 text-xs md:text-sm max-w-2xl font-medium leading-relaxed">
            Calculate quantity in grams or total price from a price per kilogram.
          </p>
        </div>

        {/* Interactive Tool */}
        <div className="w-full">
          <PricePerKgCalculator />
        </div>
      </div>

      <SEOContent>
        <h2>What is a Price Per Kilogram Calculator</h2>
        <p>A Price Per Kilogram Calculator is an online tool that helps you quickly calculate how much a specific quantity of a product costs when the rate is given per kilogram. It can also calculate how much quantity you can get for a specific amount of money.</p>
        <p>You can use it in two ways:</p>
        <ul>
          <li><strong>Find Quantity:</strong> Enter the price per kilogram and your budget to find how many grams you can buy.</li>
          <li><strong>Find Price:</strong> Enter the price per kilogram and the quantity in grams to calculate the exact price.</li>
        </ul>
        <p>Example: If a product costs ₹200 per kg, you can get 250 grams for ₹50. Similarly, 250 grams of the same product will cost ₹50.</p>
        <p>This calculator is useful for groceries, vegetables, fruits, grains, spices, dry fruits, wholesale products, and everyday shopping where prices are commonly given per kilogram.</p>

        <h2>How to Use a Price Per Kilogram Calculator</h2>
        <ol>
          <li><strong>Choose Calculation Type:</strong> Select Find Quantity to know how much you can buy for a certain amount, or Find Price to calculate the cost of a given quantity.</li>
          <li><strong>Enter Price Per Kilogram:</strong> Enter the product's rate per kilogram, such as ₹200/kg.</li>
          <li><strong>Enter the Required Value:</strong>
            <ul>
              <li>For Find Quantity, enter your budget, such as ₹50.</li>
              <li>For Find Price, enter the quantity in grams, such as 250 grams.</li>
            </ul>
          </li>
          <li><strong>View the Result:</strong> The calculator instantly shows the quantity you can buy or the exact price.</li>
          <li><strong>Copy or Reset:</strong> Copy the calculation or reset the tool to make a new calculation.</li>
        </ol>
        <p>Example: At ₹200 per kg, ₹50 gives 250 grams. Similarly, 250 grams costs ₹50.</p>

        <h2>Calculation Formula</h2>
        <p>The Price Per Kilogram Calculator uses simple proportional formulas to calculate either the price or quantity.</p>
        
        <h3>1. Find Quantity</h3>
        <p>Quantity (grams) = (Amount ÷ Price per kg) × 1000</p>
        <p>Example:<br />₹50 ÷ ₹200 × 1000 = 250 grams</p>
        
        <h3>2. Find Price</h3>
        <p>Price = (Price per kg × Quantity in grams) ÷ 1000</p>
        <p>Example:<br />₹200 × 250 ÷ 1000 = ₹50</p>

        <h2>Who Can Use a Price Per Kilogram Calculator</h2>
        <p>A Price Per Kilogram Calculator is useful for anyone who needs to quickly calculate product prices or quantities based on a per-kilogram rate.</p>
        <ul>
          <li><strong>Shoppers & Consumers</strong> – Find out how much quantity you can buy within a fixed budget.</li>
          <li><strong>Grocery Buyers</strong> – Calculate the price of rice, flour, sugar, pulses, vegetables, fruits, and other items sold by weight.</li>
          <li><strong>Shopkeepers & Retailers</strong> – Quickly calculate prices for customers buying different quantities.</li>
          <li><strong>Wholesalers</strong> – Calculate the cost of bulk quantities from a per-kg wholesale rate.</li>
          <li><strong>Farmers & Agricultural Buyers</strong> – Work out prices for grains, seeds, produce, and other products sold by weight.</li>
          <li><strong>Resellers & Small Businesses</strong> – Calculate product costs accurately before setting selling prices.</li>
          <li><strong>Market Vendors</strong> – Quickly calculate the price for 100g, 250g, 500g, or other quantities.</li>
          <li><strong>Students & Everyday Users</strong> – Practice or solve everyday weight-and-price calculations without doing the maths manually.</li>
        </ul>

        <h2>Frequently Asked Questions</h2>
        <h3>1. What is a Price Per Kilogram Calculator?</h3>
        <p>A Price Per Kilogram Calculator helps you calculate the price of a specific quantity or the quantity you can buy for a specific amount when the product rate is given per kilogram.</p>
        <h3>2. How much quantity can I get for ₹50?</h3>
        <p>Enter the price per kilogram and ₹50 as your amount. For example, at ₹200/kg, ₹50 gives you 250 grams.</p>
        <h3>3. Can I calculate quantity for any amount?</h3>
        <p>Yes. Enter your price per kilogram and the amount you want to spend, and the calculator shows the corresponding quantity in grams.</p>
        <h3>4. Can I calculate the price for different quantities?</h3>
        <p>Yes. You can calculate the price for 100g, 250g, 500g, 750g, 1kg, or any other quantity in grams.</p>
        <h3>5. Can I use different currencies?</h3>
        <p>Yes. You can select an available currency such as ₹ or $ and calculate the price using that currency.</p>

        <h2>Related Calculators</h2>
        <ul>
          <li><a href="/profit-and-loss-calculator" className="text-blue-600 hover:underline">Profit and Loss Calculator</a></li>
          <li><a href="/wholesale-price-calculator" className="text-blue-600 hover:underline">Wholesale Price Calculator</a></li>
          <li><a href="/cost-per-item-calculator" className="text-blue-600 hover:underline">Cost Per Item Calculator</a></li>
          <li><a href="/tip-calculator" className="text-blue-600 hover:underline">Tip Calculator</a></li>
          <li><a href="/fuel-cost-calculator" className="text-blue-600 hover:underline">Fuel Cost Calculator</a></li>
          <li><a href="/grocery-bill-calculator" className="text-blue-600 hover:underline">Grocery Bill Calculator</a></li>
        </ul>
      </SEOContent>
    </div>
  );
}
