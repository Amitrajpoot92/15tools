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
        <h2>What is an EMI Calculator</h2>
        <p>An EMI Calculator is an online tool that helps you calculate the monthly installment you need to pay for a loan. It uses the loan amount, interest rate, and loan tenure to calculate your estimated monthly EMI, total interest, and total amount payable.</p>
        <p>You can use it for home loans, personal loans, car loans, education loans, and other monthly installment-based loans. It makes it easier to understand your monthly payment and overall loan cost before choosing a loan.</p>

        <h2>How to Use the EMI Calculator</h2>
        <p>Using the EMI Calculator is simple. Enter your loan details to quickly estimate your monthly payment and understand the overall cost of the loan.</p>
        <ol>
          <li><strong>Enter Loan Amount:</strong> Enter the total amount you want to borrow.</li>
          <li><strong>Enter Interest Rate %:</strong> Add the annual interest rate charged on the loan, such as 8.5% per year.</li>
          <li><strong>Select Loan Tenure:</strong> Choose Years or Months and enter your repayment period.</li>
          <li><strong>Get Your EMI:</strong> The calculator instantly shows your Monthly EMI, Total Interest, and Total Payable Amount.</li>
          <li><strong>Copy or Reset:</strong> Use the Copy button to copy your calculation or Reset to clear the details and calculate again.</li>
        </ol>

        <h2>EMI Calculation Formula</h2>
        <p>The EMI formula is used to calculate the monthly loan installment based on the loan amount, interest rate, and repayment tenure.</p>
        <p><strong>EMI = P × r × (1 + r)ⁿ ÷ [(1 + r)ⁿ − 1]</strong></p>
        <p>Where:</p>
        <ul>
          <li><strong>P</strong> = Principal Loan Amount</li>
          <li><strong>r</strong> = Monthly Interest Rate = Annual Rate ÷ 12 ÷ 100</li>
          <li><strong>n</strong> = Total Number of Monthly Payments = Tenure × 12</li>
        </ul>
        <h3>Example</h3>
        <p>
          Loan Amount = ₹5,00,000<br/>
          Interest Rate = 8.5% per year<br/>
          Loan Tenure = 5 years<br/>
          <br/>
          Monthly Rate = 8.5 ÷ 12 ÷ 100<br/>
          Total Payments = 5 × 12 = 60 months<br/>
          <br/>
          Monthly EMI = ₹10,258<br/>
          Total Interest = ₹1,15,496<br/>
          Total Payable = ₹6,15,496
        </p>
        <p>The actual EMI may vary depending on the lender's terms, fees, and calculation method.</p>

        <h2>What Does the EMI Calculator Show</h2>
        <ul>
          <li><strong>Monthly EMI</strong> – Estimated amount to pay every month</li>
          <li><strong>Total Interest</strong> – Total interest payable over the loan tenure</li>
          <li><strong>Total Payable</strong> – Principal amount + total interest</li>
        </ul>

        <h2>Who Can Use an EMI Calculator</h2>
        <p>An EMI Calculator is useful for anyone who wants to estimate monthly loan payments and understand the total cost of borrowing.</p>
        <ul>
          <li><strong>Home Loan Borrowers:</strong> Calculate estimated monthly home loan EMIs.</li>
          <li><strong>Car Buyers:</strong> Check the monthly payment for a car or vehicle loan.</li>
          <li><strong>Personal Loan Borrowers:</strong> Estimate EMI before applying for a personal loan.</li>
          <li><strong>Education Loan Applicants:</strong> Calculate expected monthly payments for an education loan.</li>
          <li><strong>Business Owners:</strong> Estimate repayments for business or working-capital loans.</li>
          <li><strong>Loan Planners:</strong> Compare different loan amounts, interest rates, and repayment tenures.</li>
          <li><strong>Students & Learners:</strong> Understand how loan EMI and interest calculations work.</li>
        </ul>

        <h3>Frequently Asked Questions (FAQ)</h3>
        <h4>1. What is an EMI?</h4>
        <p>EMI stands for Equated Monthly Instalment. It is the amount you pay every month towards repaying a loan, including principal and interest.</p>

        <h4>2. How is EMI calculated?</h4>
        <p>EMI is calculated using the loan amount, monthly interest rate, and total number of monthly payments.</p>

        <h4>3. What is the EMI formula?</h4>
        <p>The standard EMI formula is: EMI = P × r × (1 + r)ⁿ ÷ [(1 + r)ⁿ − 1], where P is the loan amount, r is the monthly interest rate, and n is the number of monthly payments.</p>

        <h4>4. How much EMI can I afford for a loan?</h4>
        <p>Your affordable EMI depends on your monthly income, regular expenses, existing EMIs, and other financial commitments. Use the calculator to compare different loan amounts and tenures.</p>

        <h4>5. Is the EMI Calculator result exact?</h4>
        <p>The result is an estimate based on the details entered. Actual EMI and total repayment may vary depending on the lender's terms, fees, charges, and calculation method.</p>

        <h2>Related Calculators</h2>
        <ul>
          <li><a href="/percentage-calculator" className="text-indigo-600 hover:underline">Percentage Calculator</a></li>
          <li><a href="/discount-calculator" className="text-indigo-600 hover:underline">Discount Calculator</a></li>
          <li><a href="/gst-calculator" className="text-indigo-600 hover:underline">GST Calculator</a></li>
          <li><a href="/profit-and-loss-calculator" className="text-indigo-600 hover:underline">Profit and Loss Calculator</a></li>
          <li><a href="/wholesale-calculator" className="text-indigo-600 hover:underline">Wholesale Price Calculator</a></li>
          <li><a href="/sip-calculator" className="text-indigo-600 hover:underline">SIP Calculator</a></li>
          <li><a href="/subscription-cost-calculator" className="text-indigo-600 hover:underline">Subscription Cost Calculator</a></li>
        </ul>
      </SEOContent>
    </div>
  );
}
