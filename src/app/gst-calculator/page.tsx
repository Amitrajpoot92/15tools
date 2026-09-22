import type { Metadata } from "next";
import { GSTCalculator } from "@/components/calculators/GSTCalculator";
import { SEOContent } from "@/components/SEOContent";
import { Receipt } from "lucide-react";

export const metadata: Metadata = {
  title: "GST Calculator - Calculate Goods and Services Tax | TopCalcBox",
  description: "Free online GST calculator to easily add or remove Goods and Services Tax from your amounts. Supports 5%, 12%, 18%, and 28% GST rates.",
};

export default function GSTCalculatorPage() {
  return (
    <div className="pb-8">

      {/* Schema Markup for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            "name": "GST Calculator",
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
        <div className="flex flex-col items-center text-center bg-purple-100 rounded-2xl p-4 md:p-6 mb-6 border border-purple-300">
          <h1 className="text-xl md:text-2xl font-extrabold text-[#111827] tracking-tight mb-1">
            GST Calculator
          </h1>
          <p className="text-slate-600 text-xs md:text-sm max-w-2xl font-medium leading-relaxed">
            Add or remove GST from your price and see the GST amount and final price instantly.
          </p>
        </div>

        {/* Interactive Tool */}
        <div className="w-full">
          <GSTCalculator />
        </div>
      </div>

      <SEOContent>
        <h2>What is GST Calculator</h2>
        <p>GST (Goods and Services Tax) Calculator is an online tool that helps you quickly calculate the GST amount, total price including GST, and original price excluding GST. It makes GST calculations simple and saves you from doing the calculations manually. Just enter the amount and applicable GST rate to get the result instantly.</p>
        <p>You can use the calculator to add GST to a price or remove GST from a GST-inclusive amount. It can also show the applicable tax breakup, such as CGST + SGST for intra-state transactions or IGST for inter-state transactions. For example, if the price before GST is ₹1,000 and the GST rate is 18%, the GST amount is ₹180 and the final price is ₹1,180.</p>

        <h2>How to Use the GST Calculator</h2>
        <p>Using the GST Calculator is simple. Choose the type of calculation, enter the required details, and get the GST amount and final price instantly.</p>
        <ol>
          <li><strong>Select the calculation type:</strong> Choose Exclusive GST (Add GST) to add GST to an amount, or Inclusive GST (Remove GST) to find the amount before GST.</li>
          <li><strong>Enter the amount:</strong> Enter the product, service, or invoice amount you want to calculate GST on.</li>
          <li><strong>Select the GST rate %:</strong> Choose the applicable GST rate for your calculation.</li>
          <li><strong>Choose the GST type:</strong> Select Intra-State (CGST + SGST) or Inter-State (IGST) where applicable.</li>
          <li><strong>View the result:</strong> The calculator shows the GST amount, tax breakup, and final amount automatically.</li>
        </ol>
        <p>Use Copy to save the calculation or Reset to start a new one.</p>

        <h2>GST Calculation Formula</h2>
        <p>The GST Calculator uses different formulas depending on whether you want to add GST to an amount or remove GST from a GST-inclusive price.</p>

        <h3>1. Add GST — Exclusive GST</h3>
        <p>
          <strong>GST Amount</strong> = Net Amount × GST Rate (%) ÷ 100<br/>
          <strong>Total Amount</strong> = Net Amount + GST Amount
        </p>
        <p>
          <strong>Example:</strong><br/>
          ₹1,000 at 18% GST<br/>
          GST = ₹1,000 × 18 ÷ 100 = ₹180<br/>
          Total = ₹1,000 + ₹180 = ₹1,180
        </p>

        <h3>2. Remove GST — Inclusive GST</h3>
        <p>
          <strong>GST Amount</strong> = Inclusive Amount × GST Rate ÷ (100 + GST Rate)<br/>
          <strong>Net Amount</strong> = Inclusive Amount − GST Amount
        </p>
        <p>
          <strong>Example:</strong><br/>
          ₹1,180 including 18% GST<br/>
          GST = ₹1,180 × 18 ÷ 118 = ₹180<br/>
          Net Amount = ₹1,180 − ₹180 = ₹1,000
        </p>

        <h3>3. CGST + SGST</h3>
        <p>For an applicable Intra-State transaction, GST can be divided equally between CGST and SGST.</p>
        <p>
          <strong>CGST</strong> = Total GST ÷ 2<br/>
          <strong>SGST</strong> = Total GST ÷ 2
        </p>
        <p>
          <strong>Example:</strong> 18% GST on ₹1,000 = ₹180 GST<br/>
          CGST = ₹90 + SGST = ₹90
        </p>

        <h3>4. IGST</h3>
        <p>For an applicable Inter-State transaction:</p>
        <p>
          <strong>IGST</strong> = Net Amount × GST Rate ÷ 100
        </p>
        <p>
          <strong>Example:</strong> ₹1,000 at 18% GST = ₹180 IGST.
        </p>

        <h2>Who Can Use a GST Calculator</h2>
        <p>A GST Calculator can be useful for anyone who needs to calculate GST quickly and understand the actual tax amount or final price.</p>
        <ul>
          <li><strong>Business Owners & Shopkeepers:</strong> Calculate GST on products, services, sales, and purchases.</li>
          <li><strong>Sellers & Online Businesses:</strong> Find GST amounts and calculate GST-inclusive selling prices.</li>
          <li><strong>Freelancers & Service Providers:</strong> Calculate applicable GST amounts when preparing invoices.</li>
          <li><strong>Customers & Shoppers:</strong> Check how much GST is included in a product or service price.</li>
          <li><strong>Accountants & Finance Professionals:</strong> Quickly verify GST amounts and tax breakups.</li>
          <li><strong>Students & Learners:</strong> Understand GST calculations and practice real-world examples.</li>
        </ul>
        <p>Whether you need to add GST, remove GST, calculate CGST + SGST, or calculate IGST, the calculator makes the calculation quick and easy.</p>

        <h3>Frequently Asked Questions (FAQ)</h3>
        
        <h4>1. What is the difference between GST inclusive and GST exclusive?</h4>
        <p>GST exclusive means GST is not included in the displayed price and needs to be added. GST inclusive means the displayed price already includes GST.</p>

        <h4>2. How are CGST and SGST calculated?</h4>
        <p>For an applicable intra-state transaction, the total GST is divided between CGST and SGST. For example, an 18% GST rate can be 9% CGST + 9% SGST.</p>

        <h4>3. Can I calculate GST on a product price?</h4>
        <p>Yes. Enter the applicable product amount and select the relevant GST rate (%) to calculate the GST amount and final price.</p>

        <h4>4. Which GST Rate Should I Use?</h4>
        <p>Choose the GST rate applicable to your product or service. Select the correct rate, such as 5%, 12%, 18%, or 28%, to get the right calculation.</p>

        <h4>5. Can I remove GST from a product price?</h4>
        <p>Yes. Select Inclusive GST (Remove GST) and enter the GST-inclusive price. The calculator will show the GST amount and original price before GST.</p>

        <h2>Related Calculators</h2>
        <ul>
          <li><a href="/percentage-calculator" className="text-rose-600 hover:underline">Percentage Calculator</a></li>
          <li><a href="/discount-calculator" className="text-rose-600 hover:underline">Discount Calculator</a></li>
          <li><a href="/wholesale-calculator" className="text-rose-600 hover:underline">Wholesale Price Calculator</a></li>
          <li><a href="/profit-and-loss-calculator" className="text-rose-600 hover:underline">Profit and Loss Calculator</a></li>
          <li><a href="/emi-calculator" className="text-rose-600 hover:underline">EMI Calculator</a></li>
          <li><a href="/sip-calculator" className="text-rose-600 hover:underline">SIP Calculator</a></li>
        </ul>
      </SEOContent>
    </div>
  );
}
