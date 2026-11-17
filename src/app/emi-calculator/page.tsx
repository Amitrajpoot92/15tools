import type { Metadata } from "next";
import { EMICalculator } from "@/components/calculators/EMICalculator";
import { SEOContent } from "@/components/SEOContent";
import { ToolHeaderBanner } from "@/components/ToolHeaderBanner";
import { CreditCard } from "lucide-react";

export const metadata: Metadata = {
  title: "EMI Calculator Online – Calculate Monthly Loan Payments",
  description: "Use our free EMI calculator to easily calculate your Equated Monthly Installments for home loans, car loans, and personal loans.",
  alternates: {
    canonical: "https://topcalcbox.com/emi-calculator",
  },
  openGraph: {
    title: "EMI Calculator Online – Calculate Monthly Loan Payments",
    description: "Use our free EMI calculator to easily calculate your Equated Monthly Installments for home loans, car loans, and personal loans.",
    url: "https://topcalcbox.com/emi-calculator",
    type: "website",
  },
};

export default function Page() {
  return (
    <div className="pb-2 sm:pb-4">

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

    
      <div className="max-w-4xl mx-auto mb-4 sm:mb-5 bg-white rounded-2xl sm:rounded-3xl p-3.5 sm:p-5 shadow-md shadow-slate-200/60 border-2 border-slate-200/90">
        {/* Compact Header */}
        <ToolHeaderBanner
          title="EMI Calculator"
          description="Plan your loans by calculating Equated Monthly Installments and interest."
          color="indigo"
          icon={<CreditCard className="w-5 h-5" strokeWidth={2.5} />}
        />

        {/* Interactive Tool */}
        <div className="w-full">
          <EMICalculator />
        </div>
      </div>

      <SEOContent>
        <h2>About EMI Calculator</h2>
        <p>
          The <strong>EMI Calculator</strong> by TopCalcBox is an advanced loan amortization and monthly repayment planning tool. Whether you are budgeting for a 20-year home loan, financing a new car, consolidating debt with a personal loan, or evaluating an education loan, this free online calculator gives you an instant, clear breakdown of your monthly installment (EMI), total interest payable, and the total lifetime repayment cost.
        </p>
        <p>
          An <strong>Equated Monthly Installment (EMI)</strong> is a fixed payment amount made by a borrower to a lender at a specified calendar date each month. Each EMI payment is split between the <em>principal loan balance</em> and the <em>accrued interest charge</em>. In the early tenure of a loan, a larger share goes toward interest, while in later years, the majority pays down the principal. Our tool visualizes this amortized cost structure with financial clarity.
        </p>

        <h2>How to Use EMI Calculator (Step-by-Step)</h2>
        <p>
          Estimating your monthly borrowing commitment is quick and intuitive:
        </p>
        <ol>
          <li><strong>Input Loan Amount (Principal):</strong> Enter the total borrowing amount you wish to finance after your down payment.</li>
          <li><strong>Specify Annual Interest Rate (%):</strong> Type in the bank or NBFC annual interest rate (e.g., 8.5% for housing, 12.0% for personal loans).</li>
          <li><strong>Select Repayment Tenure:</strong> Enter the loan duration in either <em>Years</em> (e.g., 5 to 30 years) or <em>Months</em> (e.g., 12 to 360 months).</li>
          <li><strong>Review Detailed Loan Metrics:</strong> Instantly inspect your exact Monthly EMI, Total Accrued Interest, and the Total Amount Payable over the life of the loan.</li>
          <li><strong>Copy or Reset:</strong> Copy the loan summary for financial budgeting, or adjust the tenure slider to see how shorter tenures reduce interest burden.</li>
        </ol>

        <h2>EMI Calculation Formula &amp; Mathematical Logic</h2>
        <p>
          Our EMI calculator uses the standard reducing balance mathematical formula recognized by the Reserve Bank of India (RBI) and global banking institutions:
        </p>
        <p>
          <code>EMI = [P × r × (1 + r)^n] ÷ [(1 + r)^n − 1]</code>
        </p>
        <p>
          Where:
        </p>
        <ul>
          <li><strong>P (Principal):</strong> The initial loan disbursement amount.</li>
          <li><strong>r (Periodic Monthly Rate):</strong> Annual Interest Rate divided by 12 months, then divided by 100 (<code>r = Annual Rate ÷ 12 ÷ 100</code>).</li>
          <li><strong>n (Tenure in Months):</strong> Total number of monthly installments over the loan lifecycle (<code>n = Years × 12</code>).</li>
        </ul>
        <p>
          <strong>Total Interest Payable:</strong> <code>Total Interest = (EMI × n) − P</code><br />
          <strong>Total Amount Payable:</strong> <code>Total Payable = P + Total Interest</code>
        </p>

        <h2>Practical Real-World Examples</h2>
        <p>
          Here are 4 realistic loan scenarios showing how tenure and interest rates impact monthly cash flow:
        </p>
        <ul>
          <li>
            <strong>Example 1: 20-Year Home Loan (Housing Finance)</strong><br />
            You take a home loan of ₹40,00,000 at an 8.5% annual interest rate for 20 years (240 months):<br />
            <code>Monthly EMI = ₹34,713</code>.<br />
            <code>Total Interest = ₹43,31,102</code>.<br />
            <code>Total Repayment = ₹83,31,102</code> (Total interest exceeds the original loan amount).
          </li>
          <li>
            <strong>Example 2: 5-Year New Car Loan (Automobile Finance)</strong><br />
            You finance a car for ₹8,00,000 at 9.0% annual interest over 5 years (60 months):<br />
            <code>Monthly EMI = ₹16,607</code>.<br />
            <code>Total Interest = ₹1,96,396</code>.<br />
            <code>Total Payable = ₹9,96,396</code>.
          </li>
          <li>
            <strong>Example 3: 3-Year Personal Loan (Unsecured Credit)</strong><br />
            A personal loan of ₹3,00,000 borrowed at 13.5% interest for 3 years (36 months):<br />
            <code>Monthly EMI = ₹10,183</code>.<br />
            <code>Total Interest = ₹66,575</code>.<br />
            <code>Total Payable = ₹3,66,575</code>.
          </li>
          <li>
            <strong>Example 4: Comparing Tenure (15 Years vs. 20 Years on ₹30 Lakh)</strong><br />
            For a ₹30,00,000 loan at 8.75%:<br />
            • <strong>20-Year Tenure:</strong> EMI is ₹26,511; Total Interest is ₹33,62,714.<br />
            • <strong>15-Year Tenure:</strong> EMI is ₹29,985 (₹3,474 higher/month); Total Interest is ₹23,97,294.<br />
            <em>Result: Choosing the 15-year tenure saves ₹9,65,420 in interest!</em>
          </li>
        </ul>

        <h2>Who Can Use This Calculator?</h2>
        <p>
          The EMI calculator is designed for borrowers, investors, and advisors:
        </p>
        <ul>
          <li><strong>Prospective Home Buyers:</strong> Check affordable loan amounts matching monthly household take-home salary.</li>
          <li><strong>Car &amp; Bike Shoppers:</strong> Determine realistic down payment amounts and choose manageable 3- to 7-year tenures.</li>
          <li><strong>Salaried Individuals:</strong> Plan personal loans for home renovations, weddings, or emergency expenses responsibly.</li>
          <li><strong>Business Owners:</strong> Plan equipment financing and working capital loan amortizations.</li>
          <li><strong>Chartered Accountants &amp; Financial Planners:</strong> Model client debt-to-income (DTI) ratios and prepayments.</li>
        </ul>

        <h2>Frequently Asked Questions (FAQs)</h2>
        <h3>1. How does tenure length affect my monthly EMI and total interest?</h3>
        <p>
          A longer loan tenure lowers your monthly EMI payment, making it easier on short-term cash flow, but significantly increases the total interest you pay over the life of the loan. A shorter tenure increases monthly payments but saves substantial money on total interest.
        </p>
        <h3>2. What is the difference between a fixed-rate and floating-rate loan?</h3>
        <p>
          A fixed-rate loan maintains the exact same interest rate and EMI throughout the tenure. A floating-rate loan is tied to benchmark lending rates (like the RBI Repo Rate), meaning your EMI or tenure can rise or fall when interest rates change.
        </p>
        <h3>3. What is the Debt-to-Income (DTI) ratio recommended for loan approvals?</h3>
        <p>
          Most banks and financial institutions recommend that your total monthly EMI obligations across all loans do not exceed 40% to 50% of your net monthly income.
        </p>
        <h3>4. How do prepayments and foreclosure help reduce loan cost?</h3>
        <p>
          Making partial prepayments directly reduces your outstanding principal loan balance. Because interest is charged on the reducing balance, early prepayments substantially cut future interest and shorten your loan term.
        </p>
        <h3>5. Does this calculator include processing fees or stamp duty?</h3>
        <p>
          This calculator computes pure financial loan amortization. Processing charges (typically 0.5%–2%), documentation fees, and insurance premiums are one-time lender fees that may be added to upfront disbursals.
        </p>
        <h3>6. Can I use this calculator offline?</h3>
        <p>
          Yes, TopCalcBox is a progressive web app. All financial formulas run directly inside your device browser with complete offline functionality.
        </p>

        <h2>Explore Related Calculators</h2>
        <p>
          Plan your investments, taxes, and monthly household expenses with our tools:
        </p>
        <ul>
          <li><a href="/sip-calculator">SIP Calculator</a> – Calculate mutual fund compounding growth and investment wealth.</li>
          <li><a href="/subscription-cost-calculator">Subscription Cost Calculator</a> – Tally recurring monthly streaming and service bills.</li>
          <li><a href="/percentage-calculator">Percentage Calculator</a> – Compute loan percentage rates, down payments, and margins.</li>
          <li><a href="/gst-calculator">GST Calculator</a> – Calculate invoice taxes, CGST, and SGST breakdowns.</li>
          <li><a href="/fuel-cost-calculator">Fuel Cost Calculator</a> – Estimate monthly vehicle commute and petrol/diesel expenses.</li>
        </ul>
      </SEOContent>
    </div>
  );
}
