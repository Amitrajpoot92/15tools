import type { Metadata } from "next";
import { EMICalculator } from "@/components/calculators/EMICalculator";
import { SEOContent } from "@/components/SEOContent";
import { CreditCard } from "lucide-react";

export const metadata: Metadata = {
  title: "EMI Calculator - Calculate Monthly Loan Installments | TopCalcBox",
  description: "Use our free EMI calculator to easily calculate your Equated Monthly Installments for home loans, car loans, and personal loans.",
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
            "name": "EMI Calculator",
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
        <div className="flex flex-col items-center text-center bg-indigo-50 rounded-2xl p-4 md:p-6 mb-6 border border-indigo-200">
          <h1 className="text-xl md:text-2xl font-extrabold text-indigo-800 tracking-tight mb-2">
            EMI Calculator
          </h1>
          <p className="text-slate-900 text-xs md:text-sm max-w-2xl font-medium leading-relaxed">
            Plan your loans by calculating Equated Monthly Installments and interest.
          </p>
        </div>

        {/* Interactive Tool */}
        <div className="w-full">
          <EMICalculator />
        </div>
      </div>

      <SEOContent>
        <h2>What is an EMI?</h2>
        <p>
          <strong>EMI (Equated Monthly Installment)</strong> is a fixed payment amount made by a borrower to a lender at a specified date each calendar month. EMIs are used to pay off both interest and principal each month so that over a specified number of years, the loan is fully paid off.
        </p>
        
        <h2>How to Use the EMI Calculator</h2>
        <p>
          Our EMI Calculator is designed to give you an accurate breakdown of your loan repayment schedule instantly. Here is how to use it:
        </p>
        <ul>
          <li><strong>Step 1: Enter the Loan Amount (Principal).</strong> This is the total amount of money you are borrowing from the bank.</li>
          <li><strong>Step 2: Enter the Interest Rate.</strong> Input the annual interest rate provided by your lender.</li>
          <li><strong>Step 3: Enter the Loan Tenure.</strong> You can input the duration of the loan in either Years or Months using the dropdown.</li>
          <li><strong>Step 4: View your Results.</strong> The calculator will instantly display your monthly EMI, the total interest you will pay over the loan period, and the total amount payable.</li>
        </ul>

        <h2>The EMI Calculation Formula</h2>
        <p>
          The mathematical formula used to calculate the Equated Monthly Installment is:
        </p>
        <blockquote>
          <strong>E = P × r × (1 + r)^n / ((1 + r)^n - 1)</strong>
        </blockquote>
        <p>
          Where:
        </p>
        <ul>
          <li><strong>E</strong> is the EMI.</li>
          <li><strong>P</strong> is the Principal Loan Amount.</li>
          <li><strong>r</strong> is the rate of interest calculated on a monthly basis (i.e., r = Annual rate / 12 / 100).</li>
          <li><strong>n</strong> is the loan tenure in months.</li>
        </ul>

        <h2>Why is calculating EMI important?</h2>
        <p>
          Calculating your EMI before committing to a loan is crucial for financial planning. It helps you understand exactly how much money you need to set aside each month. It also allows you to compare different loan offers by seeing exactly how much total interest you will end up paying across different interest rates and tenures.
        </p>
      </SEOContent>
    </div>
  );
}
