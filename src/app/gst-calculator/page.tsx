import type { Metadata } from "next";
import { GSTCalculator } from "@/components/calculators/GSTCalculator";
import { SEOContent } from "@/components/SEOContent";
import { ToolHeaderBanner } from "@/components/ToolHeaderBanner";
import { Receipt } from "lucide-react";

export const metadata: Metadata = {
  title: "GST Calculator Online – Add or Remove GST Amount",
  description: "Free online GST calculator to easily add or remove Goods and Services Tax from your amounts. Supports 5%, 12%, 18%, and 28% GST rates.",
  alternates: {
    canonical: "https://topcalcbox.com/gst-calculator",
  },
  openGraph: {
    title: "GST Calculator Online – Add or Remove GST Amount",
    description: "Free online GST calculator to easily add or remove Goods and Services Tax from your amounts. Supports 5%, 12%, 18%, and 28% GST rates.",
    url: "https://topcalcbox.com/gst-calculator",
    type: "website",
  },
};

export default function GSTCalculatorPage() {
  return (
    <div className="pb-2 sm:pb-4">

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

    
      <div className="max-w-4xl mx-auto mb-4 sm:mb-5 bg-white rounded-2xl sm:rounded-3xl p-3.5 sm:p-5 shadow-md shadow-slate-200/60 border-2 border-slate-200/90">
        {/* Compact Header */}
        <ToolHeaderBanner
          title="GST Calculator"
          description="Add or remove GST from your price and see the GST amount and final price instantly."
          color="purple"
          icon={<Receipt className="w-5 h-5" strokeWidth={2.5} />}
        />

        {/* Interactive Tool */}
        <div className="w-full">
          <GSTCalculator />
        </div>
      </div>

      <SEOContent>
        <h2>About GST Calculator</h2>
        <p>
          The <strong>GST Calculator</strong> by TopCalcBox is an all-in-one financial tax tool designed to quickly compute Goods and Services Tax (GST) for commercial invoices, retail purchases, and accounting reports. Whether you need to add GST to a pre-tax baseline (GST Exclusive) or extract the embedded tax from a final invoice total (GST Inclusive), this tool delivers instant, error-free results.
        </p>
        <p>
          Under the Indian and global GST taxation frameworks, goods and services are categorized into standard tax brackets (typically <strong>0%, 5%, 12%, 18%, and 28%</strong>). Transactions within the same state (Intra-state) are divided equally between <strong>CGST</strong> (Central GST) and <strong>SGST</strong> (State GST), whereas sales between different states (Inter-state) are charged as a single <strong>IGST</strong> (Integrated GST). Our online calculator automatically calculates and displays these exact tax splits.
        </p>

        <h2>How to Use GST Calculator (Step-by-Step)</h2>
        <p>
          Calculating invoice tax with our tool takes just three quick steps:
        </p>
        <ol>
          <li><strong>Select Calculation Mode:</strong> Choose <em>Exclusive GST (Add Tax)</em> if your price is pre-tax, or <em>Inclusive GST (Remove Tax)</em> if you have a final billing amount and need to find the base value and tax portion.</li>
          <li><strong>Enter the Amount:</strong> Input your net invoice total or retail cost.</li>
          <li><strong>Pick the GST Rate (%):</strong> Select from standard tax slabs (5%, 12%, 18%, 28%) or enter a custom percentage.</li>
          <li><strong>Specify Transaction Type:</strong> Select <em>Intra-State (CGST + SGST)</em> or <em>Inter-State (IGST)</em> to inspect statutory tax splits.</li>
          <li><strong>Copy or Reset:</strong> Instantly copy the calculated values for your billing paperwork or reset to start afresh.</li>
        </ol>

        <h2>GST Calculation Formulas & Working Method</h2>
        <p>
          GST calculations depend on whether tax is being added to a base price or extracted from a gross total:
        </p>

        <h3>1. GST Exclusive Formula (Adding Tax to Base Amount)</h3>
        <p>
          Used by vendors and service providers when generating an invoice from a pre-tax quotation:
        </p>
        <p>
          <code>GST Amount = (Net Base Amount × GST Rate) ÷ 100</code><br />
          <code>Total Gross Price = Net Base Amount + GST Amount</code>
        </p>

        <h3>2. GST Inclusive Formula (Removing Embedded Tax from Total)</h3>
        <p>
          Used by consumers, accountants, and buyers to determine the pre-tax cost of an item bought at an all-inclusive price:
        </p>
        <p>
          <code>GST Amount = Gross Amount − [Gross Amount × (100 ÷ (100 + GST Rate))]</code><br />
          <code>Base Net Price = Gross Amount ÷ (1 + (GST Rate ÷ 100))</code>
        </p>

        <h3>3. Intra-State Split (CGST &amp; SGST)</h3>
        <p>
          For domestic supply within the same state, tax revenue is divided 50:50 between state and central governments:
        </p>
        <p>
          <code>CGST = Total GST Amount ÷ 2</code><br />
          <code>SGST = Total GST Amount ÷ 2</code>
        </p>

        <h2>Practical Real-World Examples</h2>
        <p>
          Here are 4 practical commercial scenarios illustrating GST calculations:
        </p>
        <ul>
          <li>
            <strong>Example 1: Freelance Consulting Invoice (18% Exclusive GST)</strong><br />
            A digital marketer bills a client ₹50,000 for monthly services with 18% GST:<br />
            <code>GST Amount = (50,000 × 18) ÷ 100 = ₹9,000</code>.<br />
            Invoice Total = <code>₹50,000 + ₹9,000 = ₹59,000</code> (CGST = ₹4,500, SGST = ₹4,500).
          </li>
          <li>
            <strong>Example 2: Restaurant Bill Analysis (5% Inclusive GST)</strong><br />
            You pay a restaurant bill of ₹2,100 that is inclusive of 5% GST:<br />
            <code>Pre-Tax Food Cost = 2,100 ÷ 1.05 = ₹2,000</code>.<br />
            Total GST Paid = <code>2,100 − 2,000 = ₹100</code> (CGST ₹50 + SGST ₹50).
          </li>
          <li>
            <strong>Example 3: Electronics Purchase Reverse Tax (18% Inclusive GST)</strong><br />
            A retail customer buys a laptop for ₹64,900 inclusive of 18% GST:<br />
            <code>Base Price = 64,900 ÷ 1.18 = ₹55,000</code>.<br />
            GST Component = <code>64,900 − 55,000 = ₹9,900</code>.
          </li>
          <li>
            <strong>Example 4: Inter-State Wholesale Hardware (28% IGST)</strong><br />
            A manufacturer in Maharashtra ships machinery worth ₹1,20,000 to a buyer in Gujarat with 28% GST:<br />
            <code>IGST = (1,20,000 × 28) ÷ 100 = ₹33,600</code>.<br />
            Final Interstate B2B Invoice = <code>₹1,53,600</code>.
          </li>
        </ul>

        <h2>Who Can Use This Calculator?</h2>
        <p>
          The GST calculator is tailored for businesses, professionals, and individual consumers:
        </p>
        <ul>
          <li><strong>Small Business Owners & Traders:</strong> Prepare customer billing, verify purchase orders, and record input tax credits (ITC).</li>
          <li><strong>Freelancers & Agencies:</strong> Add legal tax line-items to client invoices across IT, design, and consulting projects.</li>
          <li><strong>Accountants & Tax Consultants:</strong> Reconcile GSTR-1, GSTR-3B, and invoice registers without calculation discrepancies.</li>
          <li><strong>Everyday Consumers:</strong> Understand how much tax is built into retail MRP prices on smartphones, appliances, and restaurant bills.</li>
        </ul>

        <h2>Frequently Asked Questions (FAQs)</h2>
        <h3>1. What is the difference between CGST, SGST, and IGST?</h3>
        <p>
          CGST (Central Goods and Services Tax) and SGST (State Goods and Services Tax) are levied equally on sales made within the same state. IGST (Integrated Goods and Services Tax) is charged on interstate transactions where the seller and buyer are in different states.
        </p>
        <h3>2. How do I extract GST from an all-inclusive MRP price?</h3>
        <p>
          Divide the total MRP by <code>(1 + (GST Rate ÷ 100))</code>. For example, for a ₹1,180 item with 18% GST, divide 1,180 by 1.18 to get the pre-tax base cost of ₹1,000, meaning ₹180 is the tax amount.
        </p>
        <h3>3. What are the current GST tax slabs in India?</h3>
        <p>
          The primary GST tax slabs are 0% (essential food grains, books), 5% (packaged food, basic garments, economy transport), 12% (processed foods, business software), 18% (most IT services, consumer electronics), and 28% (luxury automobiles, tobacco, gaming).
        </p>
        <h3>4. Can input tax credit (ITC) be calculated with this tool?</h3>
        <p>
          Yes. Business owners can calculate the exact GST paid on incoming raw materials and subtract it from the GST collected on outgoing sales to find their net tax liability.
        </p>
        <h3>5. Does this calculator work for both goods and services?</h3>
        <p>
          Yes. The statutory tax calculation logic applies uniformly whether you are billing physical products or professional services.
        </p>
        <h3>6. Is this GST tool free and accurate for official bookkeeping?</h3>
        <p>
          Yes, all arithmetic strictly adheres to Central Board of Indirect Taxes and Customs (CBIC) rounding standards, making it completely reliable for official quotes and estimates.
        </p>

        <h2>Explore Related Calculators</h2>
        <p>
          Manage your business finances with our suite of commercial calculators:
        </p>
        <ul>
          <li><a href="/profit-and-loss-calculator">Profit and Loss Calculator</a> – Determine business gross margins, markups, and net profit.</li>
          <li><a href="/discount-calculator">Discount Calculator</a> – Calculate sale markdowns, clearance deals, and customer savings.</li>
          <li><a href="/wholesale-price-calculator">Wholesale Price Calculator</a> – Calculate distributor volume margins and wholesale markups.</li>
          <li><a href="/percentage-calculator">Percentage Calculator</a> – General percentage increases, decreases, and fractions.</li>
          <li><a href="/emi-calculator">EMI Calculator</a> – Estimate monthly loan installments and repayment interest schedules.</li>
        </ul>
      </SEOContent>
    </div>
  );
}
