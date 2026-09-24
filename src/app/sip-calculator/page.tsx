import type { Metadata } from "next";
import { SIPCalculator } from "@/components/calculators/SIPCalculator";
import { SEOContent } from "@/components/SEOContent";
import { LineChart } from "lucide-react";

export const metadata: Metadata = {
  title: "SIP Calculator - Mutual Fund Returns Calculator | TopCalcBox",
  description: "Calculate the future value of your Systematic Investment Plan (SIP) investments. Find out your expected returns and wealth gained over time.",
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
            "name": "SIP Calculator",
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
        {/* Ultra Compact Header */}
        <div className="flex flex-col items-center text-center bg-rose-50 rounded-2xl p-4 md:p-6 mb-6 border border-rose-200">
          <h1 className="text-xl md:text-2xl font-extrabold text-[#111827] tracking-tight mb-1">
            SIP Calculator
          </h1>
          <p className="text-slate-600 text-xs md:text-sm max-w-2xl font-medium leading-relaxed">
            Calculate your wealth growth and expected returns for Mutual Fund SIPs.
          </p>
        </div>

        {/* Interactive Tool */}
        <div className="w-full">
          <SIPCalculator />
        </div>
      </div>

      <SEOContent>
        <h2>What is a SIP Calculator</h2>
        <p>A SIP Calculator is an online tool that helps you estimate how your regular monthly investment may grow over time. It calculates the total invested amount, estimated returns, and total expected amount based on your monthly SIP, expected annual return rate, and investment period.</p>
        <p>It is useful for mutual fund investors and anyone planning long-term investments. By changing the monthly investment, expected return, or time period, you can compare different SIP investment scenarios easily.</p>
        <p><strong>Note:</strong> SIP returns are market-linked and the actual returns may be higher or lower than the estimated amount.</p>

        <h2>How to Use the SIP Calculator</h2>
        <p>Using the SIP Calculator is simple. Enter your investment details to estimate how your regular monthly investment may grow over time.</p>
        <ol>
          <li><strong>Enter Monthly Investment:</strong> Enter the amount you plan to invest every month.</li>
          <li><strong>Enter Expected Return Rate:</strong> Enter the expected annual return rate, such as 12% per year.</li>
          <li><strong>Enter Time Period:</strong> Enter how many years you plan to continue your SIP investment.</li>
          <li><strong>Get Your Result:</strong> The calculator shows the Total Expected Amount, Invested Amount, and Wealth Gained.</li>
          <li><strong>Copy or Reset:</strong> Use Copy to save or share the calculation, or Reset to clear the details and calculate again.</li>
        </ol>

        <h2>SIP Calculation Formula</h2>
        <p>The SIP maturity amount is calculated using the standard future value formula for monthly investments:</p>
        <p><strong>FV = P × [((1 + r)ⁿ − 1) ÷ r] × (1 + r)</strong></p>
        <p>Where:</p>
        <ul>
          <li><strong>FV</strong> = Total Expected Amount</li>
          <li><strong>P</strong> = Monthly Investment</li>
          <li><strong>r</strong> = Monthly Return Rate = Annual Return Rate ÷ 12 ÷ 100</li>
          <li><strong>n</strong> = Total Number of Monthly Investments = Total Months</li>
        </ul>
        <p>Total Invested Amount = Monthly Investment × Total Months</p>
        <p>Wealth Gained = Total Expected Amount − Total Invested Amount</p>
        
        <h3>Example</h3>
        <p>
          Monthly SIP = ₹5,000<br/>
          Expected Return = 12% p.a.<br/>
          Period = 10 years<br/>
          <br/>
          Total Invested = ₹6,00,000<br/>
          Wealth Gained ≈ ₹5,61,695<br/>
          Total Expected Amount ≈ ₹11,61,695
        </p>
        <p>Actual returns may vary because SIP returns are market-linked.</p>

        <h2>Who Can Use a SIP Calculator</h2>
        <p>A SIP Calculator is useful for anyone who wants to estimate the potential growth of regular monthly investments.</p>
        <ul>
          <li><strong>New Investors:</strong> Understand how SIP investments may grow over time.</li>
          <li><strong>Mutual Fund Investors:</strong> Estimate the future value of monthly SIP investments.</li>
          <li><strong>Long-Term Investors:</strong> Plan investments for future financial goals.</li>
          <li><strong>Goal Planners:</strong> Estimate the investment needed for goals like education, home, or retirement.</li>
          <li><strong>Working Professionals:</strong> Plan regular monthly investments based on their budget.</li>
          <li><strong>Students & Learners:</strong> Understand SIP, compounding, and investment calculations.</li>
        </ul>

        <h3>Frequently Asked Questions (FAQ)</h3>
        <h4>1. What is a SIP Calculator?</h4>
        <p>A SIP Calculator is an online tool that estimates the potential value of regular monthly investments based on the investment amount, expected return rate, and investment period.</p>

        <h4>2. How is SIP return calculated?</h4>
        <p>SIP returns are estimated using the monthly investment amount, expected annual return rate, and total number of investment months.</p>

        <h4>3. How much should I invest in SIP every month?</h4>
        <p>The monthly SIP amount depends on your income, budget, financial goals, and investment period. A SIP Calculator can help you estimate different monthly investment amounts.</p>

        <h4>4. Can I calculate SIP for 5, 10, or 20 years?</h4>
        <p>Yes. You can enter different investment periods to compare how the duration may affect the estimated total amount.</p>

        <h4>5. Is the SIP Calculator result guaranteed?</h4>
        <p>No. The result is an estimate based on the expected return rate. Mutual fund returns are market-linked and actual returns can be higher or lower.</p>

        <h2>Related Calculators</h2>
        <ul>
          <li><a href="/percentage-calculator" className="text-rose-600 hover:underline">Percentage Calculator</a></li>
          <li><a href="/discount-calculator" className="text-rose-600 hover:underline">Discount Calculator</a></li>
          <li><a href="/gst-calculator" className="text-rose-600 hover:underline">GST Calculator</a></li>
          <li><a href="/profit-and-loss-calculator" className="text-rose-600 hover:underline">Profit and Loss Calculator</a></li>
          <li><a href="/wholesale-calculator" className="text-rose-600 hover:underline">Wholesale Price Calculator</a></li>
          <li><a href="/emi-calculator" className="text-rose-600 hover:underline">EMI Calculator</a></li>
          <li><a href="/subscription-cost-calculator" className="text-rose-600 hover:underline">Subscription Cost Calculator</a></li>
        </ul>
      </SEOContent>
    </div>
  );
}
