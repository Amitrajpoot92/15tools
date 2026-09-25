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
        <div className="flex flex-col items-center text-center bg-[#c3f6e1] rounded-2xl p-4 md:p-6 mb-6 border border-emerald-300">
          <h1 className="text-xl md:text-2xl font-extrabold text-[#111827] tracking-tight mb-1">
            Tip Calculator
          </h1>
          <p className="text-slate-600 text-xs md:text-sm max-w-2xl font-medium leading-relaxed">
            Calculate tip, total bill and amount per person.
          </p>
        </div>

        {/* Interactive Tool */}
        <div className="w-full">
          <TipCalculator />
        </div>
      </div>

      <SEOContent>
        <h2>What is a Tip Calculator?</h2>
        <p>
          A <strong>Tip Calculator</strong> is a highly practical, everyday utility designed to instantly compute the exact gratuity amount on a restaurant bill, taxi fare, or salon service. In addition to determining the tip, a modern tip calculator also functions as a bill-splitting tool, allowing you to divide the total cost (including the tip) evenly among a group of people.
        </p>
        <p>
          When the waiter hands you the check at the end of a great meal, the last thing you want to do is perform mental arithmetic, especially if the bill is for a large party. The <strong>TopCalcBox Tip Calculator</strong> removes the stress of calculating percentages and dividing numbers. By simply entering your bill amount and selecting a tip percentage, you immediately receive a clear breakdown of the tip amount, the total bill, and exactly how much each person at the table needs to pay.
        </p>
        
        <h2>How to Use the Tip Calculator</h2>
        <p>
          Our interface is built for speed, making it perfect for use on a mobile phone right at the dinner table. Here is how you use it:
        </p>
        <ul>
          <li><strong>Step 1: Enter the Bill Amount.</strong> Type the total amount shown on your receipt into the "Bill Amount" input field before any tip is added.</li>
          <li><strong>Step 2: Select a Tip Percentage.</strong> Choose how much you want to tip. We provide quick-select buttons for standard gratuity rates (10%, 15%, 18%, 20%). You can also manually enter a custom percentage if you received exceptional service and want to tip higher.</li>
          <li><strong>Step 3: Number of People (Split).</strong> If you are dining alone or paying for the whole table, leave this at 1. If you are splitting the bill with friends, adjust the slider or type in the exact number of people in your party.</li>
          <li><strong>Step 4: Review the Breakdown.</strong> The calculator will instantly display the Tip Amount, the Total Bill (Bill + Tip), and the exact Per Person cost.</li>
        </ul>

        <h2>Standard Tipping Etiquette by Industry</h2>
        <p>
          Tipping culture can be incredibly confusing, as expectations vary wildly by industry and geographic location. In North America, tipping is customary and forms a significant portion of a service worker's income. Here is a general guide to standard tipping percentages:
        </p>
        <ul>
          <li><strong>Restaurants (Sit-down):</strong> 15% for average service, 18% for good service, and 20% to 25% for excellent service. If the service was poor, a 10% tip is generally considered the absolute minimum.</li>
          <li><strong>Bartenders:</strong> Typically $1 to $2 per drink, or 15% to 20% of the total bar tab.</li>
          <li><strong>Food Delivery (UberEats, DoorDash):</strong> 15% to 20% of the food total, with a minimum of $3 to $5 depending on the weather and distance traveled.</li>
          <li><strong>Hair Salons & Spas:</strong> 15% to 20% of the total service cost given directly to your stylist or massage therapist.</li>
          <li><strong>Taxi & Rideshare (Uber, Lyft):</strong> 15% to 20% of the fare.</li>
          <li><strong>Coffee Shops (Counter Service):</strong> Tipping is generally optional here, but leaving loose change or $1 in the tip jar is highly appreciated by baristas.</li>
        </ul>

        <h2>Calculation Formula: The Math Behind the Tip</h2>
        <p>
          If your phone battery dies and you need to calculate the tip manually on a napkin, the mathematical formula relies on basic percentages. Here is how you calculate the tip and the split:
        </p>
        
        <h3>1. Calculating the Tip Amount</h3>
        <blockquote>
          <strong>Tip Amount</strong> = (Bill Amount × Tip Percentage) / 100
        </blockquote>
        <p><em>Example:</em> Your bill is $85 and you want to tip 20%. The calculation is (85 × 20) / 100 = 1700 / 100 = <strong>$17.00 tip</strong>.</p>

        <h3>2. Calculating the Total Bill</h3>
        <blockquote>
          <strong>Total Bill</strong> = Bill Amount + Tip Amount
        </blockquote>
        <p><em>Example:</em> $85.00 + $17.00 = <strong>$102.00 Total</strong>.</p>

        <h3>3. Splitting the Bill Per Person</h3>
        <blockquote>
          <strong>Cost Per Person</strong> = Total Bill / Number of People
        </blockquote>
        <p><em>Example:</em> If you are splitting that $102.00 bill evenly among 3 friends: 102 / 3 = <strong>$34.00 per person</strong>.</p>

        <h2>Common Uses / Who Can Use It</h2>
        <p>
          A Tip Calculator is an everyday tool that virtually every consumer can benefit from. Here are some of the most common situations where it is utilized:
        </p>
        <ul>
          <li><strong>Group Dinners:</strong> Splitting a massive restaurant bill among 6 or 7 people without causing a disagreement over who owes what.</li>
          <li><strong>Corporate Expenses:</strong> Business travelers use it to calculate exact gratuities so they can accurately report their meal expenses to their accounting department.</li>
          <li><strong>Tourists and Travelers:</strong> When visiting a country with unfamiliar currency or different tipping customs, a calculator ensures you don't accidentally undertip or wildly overtip your servers.</li>
          <li><strong>Event Gratuities:</strong> Calculating the mandatory gratuity for catering staff, wedding bartenders, or large-party banquet servers.</li>
        </ul>

        <h2>Frequently Asked Questions (FAQ)</h2>
        
        <h3>1. Should I calculate the tip before or after tax?</h3>
        <p>
          This is a matter of personal preference and etiquette, but the standard practice is to calculate the tip based on the <strong>pre-tax subtotal</strong> of your bill. However, many people find it easier to simply calculate 15% or 20% on the final post-tax total, which results in a slightly higher tip for the server.
        </p>

        <h3>2. What should I do if the restaurant automatically added a gratuity?</h3>
        <p>
          Many restaurants automatically add an 18% or 20% gratuity to the bill for large parties (usually groups of 6 or more). Always check your receipt. If gratuity is already included, you do not need to add an additional tip, though you may leave extra if the service was phenomenal.
        </p>

        <h3>3. Does this tool round the numbers for me?</h3>
        <p>
          Yes, our TopCalcBox Tip Calculator automatically rounds the final output to two decimal places (e.g., $15.45) so it matches standard currency formats perfectly.
        </p>

        <h3>4. How do I tip if we ordered different items?</h3>
        <p>
          Our "Split the Bill" feature divides the total cost completely evenly. If one person ordered a $50 steak and another ordered a $15 salad, an even split is not fair. In that scenario, you should use the tool to find the Tip Amount, and then individuals should manually add their portion of the tip to their specific meal cost.
        </p>

        <h3>5. Is this calculator free to use on my phone?</h3>
        <p>
          Yes, TopCalcBox is entirely free and completely mobile-responsive. You can bookmark this page on your smartphone's browser to access the calculator instantly whenever you dine out.
        </p>

        <h2>Related Calculators</h2>
        <p>
          If you frequently find yourself doing mental math for daily finances, check out our other useful calculators:
        </p>
        <ul>
          <li><a href="/percentage-calculator" className="text-orange-600 hover:underline">Percentage Calculator</a> - For generalized percentage problems outside of the restaurant environment.</li>
          <li><a href="/discount-calculator" className="text-orange-600 hover:underline">Discount Calculator</a> - Find out exactly how much you are saving on retail purchases before you hit the checkout line.</li>
          <li><a href="/gst-calculator" className="text-orange-600 hover:underline">GST Calculator</a> - Quickly extract or add sales tax to a bill.</li>
        </ul>
      </SEOContent>
    </div>
  );
}
