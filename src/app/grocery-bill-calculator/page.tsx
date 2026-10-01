import type { Metadata } from "next";
import { GroceryBillCalculator } from "@/components/calculators/GroceryBillCalculator";
import { SEOContent } from "@/components/SEOContent";
import { ShoppingCart } from "lucide-react";

export const metadata: Metadata = {
  title: "Grocery Bill Calculator",
  description: "Calculate your total grocery bill by adding product names and prices. Easily add items, check the total cost, and manage your grocery shopping expenses.",
};

export default function Page() {
  return (
    <div className="pb-8">

      {/* Schema Markup for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            "name": "Electricity Bill Calculator",
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

    
      <div className="max-w-4xl mx-auto mb-6 bg-white rounded-3xl p-3 md:p-6 shadow-sm border border-slate-200 mt-2">
        {/* Ultra Compact Header */}
        <div className="flex flex-col items-center text-center bg-blue-100 rounded-2xl p-4 md:p-6 mb-6 border border-blue-300">
          <h1 className="text-xl md:text-2xl font-extrabold text-orange-900 tracking-tight mb-2">
            Grocery Bill Calculator
          </h1>
          <p className="text-slate-900 text-xs md:text-sm max-w-2xl font-medium leading-relaxed">
            Estimate your total shopping bill to stay within budget.
          </p>
        </div>

        {/* Interactive Tool */}
        <div className="w-full">
          <GroceryBillCalculator />
        </div>
      </div>

      <SEOContent>
        <h2>What is a Grocery Bill Calculator</h2>
        <p>A Grocery Bill Calculator is an online tool that helps you quickly calculate the total cost of your grocery shopping. Add each product with its name, price, and quantity, and the calculator automatically calculates the total bill and total number of items.</p>
        <p>It is useful for everyday grocery shopping, making a shopping list, checking your estimated bill, and keeping your spending within budget. You can also choose between ₹ and $ depending on the currency you want to use.</p>
        <p>For example, if you buy 2 Milk at ₹50 each, 1 Bread at ₹40, and 12 Eggs at ₹7 each, your total grocery bill is ₹224 for 15 items.</p>
        
        <h2>How to Use the Grocery Bill Calculator</h2>
        <p>The Grocery Bill Calculator makes it easy to estimate your shopping bill. Add each grocery item with its price and quantity, and the total bill is calculated automatically.</p>
        <ol>
          <li><strong>Select Currency</strong> – Choose ₹ or $ based on your requirement.</li>
          <li><strong>Add an Item</strong> – Enter the product name, such as Milk, Bread, or Eggs.</li>
          <li><strong>Enter Price</strong> – Add the price of one unit of the item.</li>
          <li><strong>Enter Quantity</strong> – Enter how many units you want to buy.</li>
          <li><strong>Add More Items</strong> – Tap + Add to include other grocery products.</li>
          <li><strong>Check Total Bill</strong> – The calculator automatically shows your Total Bill and Total Items.</li>
          <li><strong>Copy or Reset</strong> – Copy the bill or reset the calculator to start a new shopping list.</li>
        </ol>

        <h2>Grocery Bill Calculation Formula</h2>
        <p>The Grocery Bill Calculator calculates the cost of each product based on its price and quantity, then adds all item totals to find the final shopping bill. It also adds the quantities to show the total number of items.</p>
        <p>Item Total = Price Per Item × Quantity</p>
        <p>Total Bill = Sum of All Item Totals</p>
        <p>Total Items = Sum of All Quantities</p>
        <p>Example:<br />Milk: ₹50 × 2 = ₹100<br />Bread: ₹40 × 1 = ₹40<br />Eggs: ₹7 × 12 = ₹84</p>
        <p>Total Bill = ₹100 + ₹40 + ₹84 = ₹224<br />Total Items = 2 + 1 + 12 = 15</p>

        <h2>Who Can Use a Grocery Bill Calculator</h2>
        <p>A Grocery Bill Calculator is useful for anyone who wants to quickly estimate their shopping expenses and keep track of the total bill.</p>
        <ul>
          <li><strong>Families & Households</strong> – Calculate the total cost of regular grocery shopping.</li>
          <li><strong>Daily Shoppers</strong> – Check the expected bill before going to the store.</li>
          <li><strong>Budget-Conscious Shoppers</strong> – Keep grocery spending within a planned budget.</li>
          <li><strong>Students & Hostel Residents</strong> – Calculate the cost of food and household items.</li>
          <li><strong>Shopkeepers</strong> – Quickly calculate item totals based on price and quantity.</li>
          <li><strong>Small Businesses</strong> – Estimate grocery and regular supply expenses.</li>
          <li><strong>Meal Planners</strong> – Calculate the approximate cost of ingredients for meals.</li>
          <li><strong>Anyone Making a Shopping List</strong> – Add products and quantities to estimate the total bill before purchasing.</li>
        </ul>

        <h2>Frequently Asked Questions</h2>
        <h3>1. What is a Grocery Bill Calculator?</h3>
        <p>A Grocery Bill Calculator helps you calculate the total cost of your grocery shopping by adding the price and quantity of each item.</p>
        <h3>2. Can I add multiple grocery items?</h3>
        <p>Yes. You can add multiple products such as milk, bread, rice, vegetables, fruits, and other grocery items to calculate the total bill.</p>
        <h3>3. Can I calculate the quantity of each grocery item?</h3>
        <p>Yes. Enter the quantity you want for each product, and the calculator includes it in the item total and overall bill.</p>
        <h3>4. Can I calculate a grocery bill in dollars?</h3>
        <p>Yes. You can select $ (US Dollar) if you want to calculate the bill in dollars.</p>
        <h3>5. Can I use this calculator before shopping?</h3>
        <p>Yes. Add the products and quantities you plan to buy to estimate your total grocery expense before shopping.</p>
        <h3>6. Can I use it for monthly grocery shopping?</h3>
        <p>Yes. You can add your regular monthly grocery items and quantities to estimate your expected shopping cost.</p>

        <h2>Related Calculators</h2>
        <ul>
          <li><a href="/discount-calculator" className="text-blue-600 hover:underline">Discount Calculator</a></li>
          <li><a href="/wholesale-calculator" className="text-blue-600 hover:underline">Wholesale Price Calculator</a></li>
          <li><a href="/cost-per-item-calculator" className="text-blue-600 hover:underline">Cost Per Item Calculator</a></li>
          <li><a href="/price-per-kg-calculator" className="text-blue-600 hover:underline">Price per Kg Calculator</a></li>
          <li><a href="/tip-calculator" className="text-blue-600 hover:underline">Tip Calculator</a></li>
          <li><a href="/fuel-cost-calculator" className="text-blue-600 hover:underline">Fuel Cost Calculator</a></li>
          <li><a href="/love-calculator" className="text-blue-600 hover:underline">Love Calculator</a></li>
        </ul>
      </SEOContent>
    </div>
  );
}
