import type { Metadata } from "next";
import { TipCalculator } from "@/components/calculators/TipCalculator";
import { SEOContent } from "@/components/SEOContent";
import { Banknote } from "lucide-react";

export const metadata: Metadata = {
  title: "Tip Calculator - Split the Bill and Calculate Gratuity | TopCalcBox",
  description: "Free online tip calculator. Easily calculate restaurant tips, split the final bill among friends, and see exact per-person costs.",
};

export default function TipCalculatorPage() {
  return (
    <div className="pb-8">

      {/* Schema Markup for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            "name": "Tip Calculator",
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
        <div className="flex flex-col items-center text-center bg-orange-100 rounded-2xl p-4 md:p-6 mb-6 border border-orange-300">
          <h1 className="text-xl md:text-2xl font-extrabold text-orange-900 tracking-tight mb-1">
            Tip Calculator
          </h1>
          <p className="text-slate-800 text-xs md:text-sm max-w-2xl font-medium leading-relaxed">
            Calculate tip, total bill and amount per person.
          </p>
        </div>

        {/* Interactive Tool */}
        <div className="w-full">
          <TipCalculator />
        </div>
      </div>

      <SEOContent>
        <h2>What is a Tip Calculator</h2>
        <p>A Tip Calculator is an online tool that helps you quickly calculate the tip amount, total bill including tip, and amount each person should pay. It is useful when dining at a restaurant, ordering food, or splitting a bill with friends, family, or colleagues.</p>
        <p>Simply enter the bill amount, choose or enter a tip percentage, and select the number of people. The calculator automatically works out the total tip, bill plus tip, tip per person, and total amount payable by each person.</p>
        <p>Example: If your bill is ₹10,000 and you add a 20% tip, the tip is ₹2,000 and the total bill becomes ₹12,000. If 2 people split the bill equally, each person pays ₹6,000.</p>
        <p>This makes it easier to calculate tips, split restaurant bills, and avoid manual calculations.</p>

        <h2>How to Use a Tip Calculator</h2>
        <p>A Tip Calculator makes it easy to calculate the tip, add it to your bill, and split the final amount between multiple people. You only need to enter your bill amount, choose the tip percentage, and select how many people are sharing the bill.</p>
        <ol>
          <li><strong>Select Currency:</strong> Choose your preferred currency, such as ₹ or $.</li>
          <li><strong>Enter Bill Amount:</strong> Enter the total restaurant or service bill.</li>
          <li><strong>Enter Tip Percentage:</strong> Add your desired tip percentage or choose a suggested rate such as 10%, 15%, 18%, or 20%.</li>
          <li><strong>Select Number of People:</strong> Use the + / − buttons to enter the number of people sharing the bill.</li>
          <li><strong>Check the Result:</strong> The calculator shows the total tip, bill + tip, tip per person, and total payable per person.</li>
          <li><strong>Copy or Reset:</strong> Copy the result or reset the calculator for a new calculation.</li>
        </ol>
        <p>Example: For a ₹10,000 bill with a 20% tip shared by 2 people, the total tip is ₹2,000, the final bill is ₹12,000, and each person pays ₹6,000.</p>

        <h2>Calculation Formula</h2>
        <p>The Tip Calculator uses simple formulas to calculate the tip, total bill, and amount per person.</p>
        
        <h3>1. Tip Amount</h3>
        <p>Tip = Bill Amount × Tip % ÷ 100</p>
        <p>Example: ₹10,000 × 20 ÷ 100 = ₹2,000</p>
        
        <h3>2. Bill + Tip</h3>
        <p>Total Bill = Bill Amount + Tip</p>
        <p>Example: ₹10,000 + ₹2,000 = ₹12,000</p>
        
        <h3>3. Amount Per Person</h3>
        <p>Amount Per Person = Total Bill ÷ Number of People</p>
        <p>Example: ₹12,000 ÷ 2 = ₹6,000 per person</p>
        
        <h3>4. Tip Per Person</h3>
        <p>Tip Per Person = Total Tip ÷ Number of People</p>
        <p>Example: ₹2,000 ÷ 2 = ₹1,000 per person</p>

        <h2>Who Can Use a Tip Calculator</h2>
        <p>A Tip Calculator is useful for anyone who wants to quickly calculate a tip, add it to the bill, or split the final amount between multiple people.</p>
        <ul>
          <li><strong>Restaurant Customers</strong> – Calculate the tip and final bill after dining out.</li>
          <li><strong>Friends & Groups</strong> – Easily split a restaurant bill among several people.</li>
          <li><strong>Families</strong> – Calculate the total amount and each person’s share when dining together.</li>
          <li><strong>Travelers</strong> – Quickly work out tips when eating at restaurants in different places.</li>
          <li><strong>CafÃ© & Food Customers</strong> – Calculate tips for cafÃ©s, food deliveries, and other services.</li>
          <li><strong>Event & Party Groups</strong> – Split a shared food or service bill without manual calculations.</li>
          <li><strong>Students & Friends</strong> – Divide bills fairly when eating or ordering food together.</li>
          <li><strong>Everyday Users</strong> – Quickly calculate any percentage-based tip and the final amount to pay.</li>
        </ul>

        <h2>Frequently Asked Questions</h2>
        <h3>1. What is a Tip Calculator?</h3>
        <p>A Tip Calculator helps you quickly calculate the tip amount, total bill including tip, and amount each person should pay.</p>
        <h3>2. How do I split a restaurant bill with a tip?</h3>
        <p>Enter the bill amount, tip percentage, and number of people. The calculator shows the total amount per person, including the tip.</p>
        <h3>3. Can I choose my own tip percentage?</h3>
        <p>Yes. You can enter the tip percentage you want instead of using the suggested tip options.</p>
        <h3>4. How much should I tip at a restaurant?</h3>
        <p>The appropriate tip percentage depends on the country, restaurant, service, and local tipping customs. You can enter the percentage you want to calculate.</p>
        <h3>5. Can I calculate a tip without splitting the bill?</h3>
        <p>Yes. Simply enter the bill amount and tip percentage. You can ignore the number of people if you are paying the bill yourself.</p>

        <h2>Related Calculators</h2>
        <ul>
          <li><a href="/profit-and-loss-calculator" className="text-blue-600 hover:underline">Profit and Loss Calculator</a></li>
          <li><a href="/discount-calculator" className="text-blue-600 hover:underline">Discount Calculator</a></li>
          <li><a href="/cost-per-item-calculator" className="text-blue-600 hover:underline">Cost Per Item Calculator</a></li>
          <li><a href="/price-per-kg-calculator" className="text-blue-600 hover:underline">Price per Kg Calculator</a></li>
          <li><a href="/fuel-cost-calculator" className="text-blue-600 hover:underline">Fuel Cost Calculator</a></li>
          <li><a href="/grocery-bill-calculator" className="text-blue-600 hover:underline">Grocery Bill Calculator</a></li>
        </ul>
      </SEOContent>
    </div>
  );
}
