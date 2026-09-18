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
    
      {/* Ultra Compact Header */}
      <div className="flex items-center gap-4 md:gap-6 bg-blue-50/50 rounded-2xl p-4 md:p-6 mb-6 mt-2 border border-blue-100/50">
        <div className="hidden sm:flex flex-shrink-0 items-center justify-center w-16 h-16 bg-blue-600 rounded-2xl shadow-sm shadow-blue-600/20">
          <Receipt className="w-8 h-8 text-white" />
        </div>
        <div>
          <h2 className="text-[10px] md:text-xs font-bold text-blue-600 uppercase tracking-wider mb-1">GST CALCULATOR</h2>
          <h1 className="text-xl md:text-2xl font-extrabold text-slate-900 tracking-tight mb-1">
            GST Calculator
          </h1>
          <p className="text-slate-600 text-xs md:text-sm max-w-2xl font-medium leading-relaxed">
            Add or remove GST from your prices instantly. See the net amount, GST amount, and total price broken down clearly.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto mb-16">
        <GSTCalculator />
      </div>

      {/* SEO Content Section */}
      <SEOContent>
        <h2>What is a GST Calculator?</h2>
        <p>
          A <strong>GST (Goods and Services Tax) Calculator</strong> is a specialized financial utility utilized by business owners, freelancers, accountants, and everyday consumers to accurately compute the amount of tax applied to a specific product or service. Introduced in various countries as a comprehensive, multi-stage, destination-based tax, GST has simplified indirect taxation by replacing multiple cascading taxes. However, calculating the exact amount of GST to add to an invoice or extracting the exact GST component from a final inclusive price can still be mathematically tedious and prone to human error.
        </p>
        <p>
          The <strong>TopCalcBox GST Calculator</strong> is designed to completely eliminate this friction. It allows you to perform both "Exclusive" and "Inclusive" GST calculations with a single click. By instantly providing you with the Net Price, the GST Amount, and the Total Gross Price, our tool ensures that your invoices are legally compliant and mathematically flawless.
        </p>
        
        <h2>How to Use the GST Calculator</h2>
        <p>
          Using our GST tool is incredibly straightforward. It has been built with an intuitive interface that caters to both seasoned accountants and small business owners generating their very first invoice.
        </p>
        <ul>
          <li><strong>Step 1: Enter the Base Amount.</strong> Type the numerical value of your product or service into the "Initial Amount" input field.</li>
          <li><strong>Step 2: Select the GST Rate.</strong> Choose the appropriate tax slab for your industry or product category. We provide quick-select buttons for the most common global GST rates (5%, 12%, 18%, and 28%). You can also manually enter a custom percentage if your regional tax laws dictate a different rate.</li>
          <li><strong>Step 3: Choose 'Add' or 'Remove'.</strong> 
            <ul>
              <li>Click <strong>Add GST (+GST)</strong> if your initial amount is the base price and you need to calculate the tax to add on top of it.</li>
              <li>Click <strong>Remove GST (-GST)</strong> if your initial amount is the final price paid by a customer, and you need to reverse-calculate to find out how much of that total was tax.</li>
            </ul>
          </li>
          <li><strong>Step 4: Review Your Breakdown.</strong> The calculator will instantly display a detailed receipt-style breakdown showing the Net Amount (price before tax), the exact GST Amount (tax collected), and the Gross Amount (final price).</li>
        </ul>

        <h2>Calculation Formula</h2>
        <p>
          If you ever need to manually calculate Goods and Services Tax without access to our digital tool, you can use the standard accounting formulas below. Let's break down the math for both scenarios:
        </p>
        
        <h3>Adding GST (Exclusive Calculation)</h3>
        <p>Use this formula when you have a base price and need to charge tax on top of it.</p>
        <blockquote>
          <strong>GST Amount</strong> = (Original Cost × GST Rate) / 100 <br />
          <strong>Net Price</strong> = Original Cost + GST Amount
        </blockquote>
        <p><em>Example:</em> You sell a consulting service for $1,000 and must charge 18% GST. The GST amount is (1000 × 18) / 100 = $180. Your final invoice amount will be $1,180.</p>

        <h3>Removing GST (Inclusive Calculation)</h3>
        <p>Use this formula when you have a final receipt total and need to extract the tax portion to record your actual revenue.</p>
        <blockquote>
          <strong>GST Amount</strong> = Total Cost - [Total Cost × (100 / (100 + GST Rate))] <br />
          <strong>Net Price</strong> = Total Cost - GST Amount
        </blockquote>
        <p><em>Example:</em> A customer pays you a total of $1,180 which already includes an 18% GST. The GST amount is 1180 - [1180 × (100 / 118)] = 1180 - [1180 × 0.8474] = $180. Your actual net revenue is $1,000.</p>

        <h2>Common Uses / Who Can Use It</h2>
        <p>
          The TopCalcBox GST Calculator is a daily driver for millions of professionals across the globe. Here are the most common scenarios where this tool is indispensable:
        </p>
        <ul>
          <li><strong>Small Business Owners & Freelancers:</strong> When generating monthly invoices for clients, business owners must accurately calculate the GST component to ensure they collect the right amount of tax to remit to the government.</li>
          <li><strong>Accountants and Bookkeepers:</strong> During tax season or month-end reconciliations, accountants frequently need to extract the GST from hundreds of inclusive receipts (like restaurant bills or office supplies) to claim input tax credits.</li>
          <li><strong>E-commerce Sellers:</strong> Online sellers need to configure their store pricing. If you want to sell a product for exactly $99 including tax, this tool helps you reverse-calculate what the base price in your database should be.</li>
          <li><strong>Consumers & Shoppers:</strong> When making large purchases like electronics or vehicles, consumers often want to know exactly how much of their hard-earned money is going toward taxes versus the actual product value.</li>
          <li><strong>Procurement Managers:</strong> When comparing quotes from different vendors where some have quoted inclusive prices and others exclusive, this tool helps normalize the data for a fair comparison.</li>
        </ul>

        <h2>Frequently Asked Questions (FAQ)</h2>
        
        <h3>1. What is the difference between GST, VAT, and Sales Tax?</h3>
        <p>
          While the terminology differs by country, the mathematical calculation is identical. GST (Goods and Services Tax) and VAT (Value Added Tax) are both multi-stage destination-based taxes applied at every point of sale. Standard Sales Tax is usually a single-stage tax collected only at the final point of purchase by the end consumer. You can use this calculator for all three.
        </p>

        <h3>2. What are the standard GST slabs?</h3>
        <p>
          While rates vary globally, countries that utilize a multi-tiered GST system (like India) typically use four main slabs: 5% (essential goods), 12% (standard goods), 18% (standard services and most products), and 28% (luxury items and "sin" goods).
        </p>

        <h3>3. Does this calculator work for CGST and SGST splits?</h3>
        <p>
          Yes. In federal systems where GST is split equally between the central government (CGST) and state government (SGST), you simply take the final GST Amount provided by our calculator and divide it by 2. For example, an 18% GST consists of 9% CGST and 9% SGST.
        </p>

        <h3>4. How do I claim an Input Tax Credit (ITC)?</h3>
        <p>
          When you purchase supplies for your business, the inclusive receipts contain GST that you have paid. You use the "Remove GST" function on our calculator to determine exactly how much tax was in that receipt, which you can then claim back as an Input Tax Credit when filing your returns.
        </p>

        <h3>5. Can I enter a custom decimal GST rate?</h3>
        <p>
          Absolutely. If your local municipality has a highly specific tax rate (e.g., 7.25%), simply type that exact decimal into the custom rate field, and the calculator will process it with pinpoint accuracy.
        </p>

        <h2>Related Calculators</h2>
        <p>
          Managing your business finances requires more than just tax calculations. Explore our other financial tools below:
        </p>
        <ul>
          <li><a href="/profit-and-loss-calculator" className="text-rose-600 hover:underline">Profit and Loss Calculator</a> - Determine your exact gross profit and net loss margins after tax deductions.</li>
          <li><a href="/margin-calculator" className="text-rose-600 hover:underline">Margin Calculator</a> - Find out what your base selling price should be to maintain a healthy profit margin.</li>
          <li><a href="/percentage-calculator" className="text-rose-600 hover:underline">Percentage Calculator</a> - The standard tool for calculating general numerical ratios and growth metrics.</li>
          <li><a href="/discount-calculator" className="text-rose-600 hover:underline">Discount Calculator</a> - Calculate sale prices before applying the final GST to the customer's cart.</li>
        </ul>
      </SEOContent>
    </div>
  );
}
