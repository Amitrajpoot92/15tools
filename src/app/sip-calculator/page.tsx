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
    
      {/* Compact Premium Header */}
      <div className="bg-slate-900 rounded-[2rem] p-6 md:p-8 mb-8 mt-2 shadow-xl border border-slate-800 text-center md:text-left overflow-hidden relative">
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-rose-500/20 rounded-full blur-[80px] pointer-events-none" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay pointer-events-none"></div>
        
        <div className="relative z-10 flex flex-col md:flex-row items-center md:items-center space-y-4 md:space-y-0 md:space-x-5 w-full">
          <div className="p-3.5 bg-white/10 rounded-2xl border border-white/10 shadow-sm backdrop-blur-md">
            <LineChart className="w-7 h-7 text-rose-400" />
          </div>
          <div className="flex-1">
            <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight mb-1">
              SIP Calculator
            </h1>
            <p className="text-slate-300 text-sm md:text-base max-w-xl font-medium">
              Calculate your wealth growth and expected returns for Mutual Fund SIPs.
            </p>
          </div>
        </div>
      </div>

      {/* Interactive Tool */}
      <div className="max-w-4xl mx-auto mb-10">
        <SIPCalculator />
      </div>

      {/* SEO Content Section */}
      <SEOContent>
        <h2>What is a SIP?</h2>
        <p>
          <strong>SIP (Systematic Investment Plan)</strong> is a popular investment strategy offered by Mutual Funds. It allows individuals to invest a fixed amount of money at regular intervals (such as monthly or quarterly) rather than making a single lump-sum investment. SIPs encourage disciplined investing and help in building wealth over the long term through the power of compounding.
        </p>
        
        <h2>How to Use the SIP Calculator</h2>
        <p>
          Our SIP Calculator is built to help you project the future value of your investments. Here is how you can use it:
        </p>
        <ul>
          <li><strong>Step 1: Enter your Monthly Investment.</strong> This is the amount you plan to invest every single month.</li>
          <li><strong>Step 2: Enter the Expected Return Rate.</strong> This is the annual percentage rate (p.a.) you expect your mutual fund to grow. Historically, equity mutual funds often project between 10% to 15%.</li>
          <li><strong>Step 3: Enter the Time Period.</strong> This is the number of years you plan to continue investing.</li>
          <li><strong>Step 4: View the Results.</strong> The calculator immediately displays the Total Expected Amount (maturity value), the total amount you invested out of pocket, and the Wealth Gained (your pure profit from compounding).</li>
        </ul>

        <h2>The Power of Compounding</h2>
        <p>
          The secret behind the success of SIPs is the power of compounding. Compounding happens when the returns on your investments start generating their own returns. The longer you stay invested, the more pronounced this effect becomes. This is why financial experts always recommend starting your SIPs as early in life as possible.
        </p>

        <h2>The Mathematical Formula for SIP Calculation</h2>
        <p>
          The future value of a SIP is calculated using the following mathematical formula:
        </p>
        <blockquote>
          <strong>M = P × ([(1 + i)^n - 1] / i) × (1 + i)</strong>
        </blockquote>
        <p>
          Where:
        </p>
        <ul>
          <li><strong>M</strong> is the maturity amount you receive at the end of the tenure.</li>
          <li><strong>P</strong> is the fixed amount you invest regularly.</li>
          <li><strong>n</strong> is the total number of payments you make (Years × 12).</li>
          <li><strong>i</strong> is the periodic rate of interest (Annual Rate / 12 / 100).</li>
        </ul>

        <h2>Why Use the TopCalcBox SIP Calculator?</h2>
        <p>
          Our calculator is 100% free, fast, and does not require you to sign up. It provides real-time updates as you adjust your monthly investment amounts or time periods, allowing you to easily experiment with different financial goals. Plan your retirement, a child's education, or a dream vacation by visualizing your financial future today!
        </p>
      </SEOContent>
    </div>
  );
}
