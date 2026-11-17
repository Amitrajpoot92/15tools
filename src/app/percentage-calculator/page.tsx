import type { Metadata } from "next";
import { PercentageCalculator } from "@/components/calculators/PercentageCalculator";
import { SEOContent } from "@/components/SEOContent";
import { ToolHeaderBanner } from "@/components/ToolHeaderBanner";
import { Percent } from "lucide-react";

export const metadata: Metadata = {
  title: "Percentage Calculator – Find the Percentage of Any Number",
  description: "Use our free online percentage calculator to quickly find the percentage of a number, calculate discounts, and figure out ratio percentages.",
  alternates: {
    canonical: "https://topcalcbox.com/percentage-calculator",
  },
  openGraph: {
    title: "Percentage Calculator – Find the Percentage of Any Number",
    description: "Use our free online percentage calculator to quickly find the percentage of a number, calculate discounts, and figure out ratio percentages.",
    url: "https://topcalcbox.com/percentage-calculator",
    type: "website",
  },
};

export default function PercentageCalculatorPage() {
  return (
    <div className="pb-2 sm:pb-4">

      {/* Schema Markup for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            "name": "Percentage Calculator",
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
          title="Percentage Calculator"
          description="Calculate a percentage of any number, find percentage increases or decreases, and work out the percentage difference between values."
          color="indigo"
          icon={<Percent className="w-5 h-5" strokeWidth={2.5} />}
        />

        {/* Interactive Tool */}
        <div className="w-full">
          <PercentageCalculator />
        </div>
      </div>

      <SEOContent>
        <h2>About Percentage Calculator</h2>
        <p>
          The <strong>Percentage Calculator</strong> on TopCalcBox is a comprehensive, multi-purpose online math utility designed to solve every type of percentage problem in seconds. Whether you need to figure out a retail sale discount, assess an annual salary raise, compute tax surcharges, or determine academic exam grades, this tool eliminates manual arithmetic errors and delivers instant, accurate answers.
        </p>
        <p>
          Percentages represent fractional values expressed as hundredths (per centum, or &quot;out of 100&quot;). In modern daily life, financial transactions, business balance sheets, scientific data, and shopping receipts all rely on percentage figures. Our free online percentage calculator features three distinct calculation modules: <strong>What is X% of Y?</strong>, <strong>X is what % of Y?</strong>, and <strong>Percentage Change (Increase or Decrease)</strong>.
        </p>

        <h2>How to Use Percentage Calculator (Step-by-Step)</h2>
        <p>
          Calculating percentages with our tool is quick and intuitive. Follow these simple steps:
        </p>
        <ol>
          <li><strong>Select Your Calculation Mode:</strong> Choose between finding a fraction of a number, determining a ratio percentage, or comparing percentage difference between two values.</li>
          <li><strong>Input Your Values:</strong> Type your numbers into the designated fields. The tool accepts whole numbers, decimals, and large figures.</li>
          <li><strong>View Real-Time Results:</strong> The final percentage and breakdown are computed automatically as you type, without requiring a page refresh.</li>
          <li><strong>One-Click Copy or Reset:</strong> Click <em>Copy</em> to save the calculation directly to your clipboard, or click <em>Reset</em> to clear the inputs for your next calculation.</li>
        </ol>

        <h2>Percentage Calculation Formulas & Mathematical Logic</h2>
        <p>
          Behind every calculation is a clear, standard mathematical formula. Here is how each percentage mode works:
        </p>
        <h3>1. What is X% of Y?</h3>
        <p>
          This formula finds the portion of a total number corresponding to a given rate.
        </p>
        <p>
          <strong>Formula:</strong> <code>Result = (X ÷ 100) × Y</code><br />
          Where <em>X</em> is the percentage rate and <em>Y</em> is the base number.
        </p>

        <h3>2. X is What % of Y?</h3>
        <p>
          This formula calculates the ratio of a part (X) relative to a whole (Y), converted into a percentage.
        </p>
        <p>
          <strong>Formula:</strong> <code>Percentage (%) = (X ÷ Y) × 100</code>
        </p>

        <h3>3. Percentage Change (Increase or Decrease)</h3>
        <p>
          This formula measures relative growth or reduction from an original baseline to a new value.
        </p>
        <p>
          <strong>Formula:</strong> <code>Percentage Change (%) = [(New Value − Original Value) ÷ Original Value] × 100</code><br />
          A positive answer indicates a percentage increase, while a negative answer indicates a percentage decrease.
        </p>

        <h2>Practical Real-World Examples</h2>
        <p>
          Here are 4 realistic scenarios demonstrating how percentages work in everyday financial, educational, and shopping tasks:
        </p>
        <ul>
          <li>
            <strong>Example 1: Retail Discount (X% of Y)</strong><br />
            A winter jacket has an original price tag of ₹4,000 and is advertised at 25% off. To find the discount amount:<br />
            <code>(25 ÷ 100) × 4,000 = ₹1,000 discount</code>. The customer pays ₹3,000.
          </li>
          <li>
            <strong>Example 2: Exam Score Grading (X is What % of Y)</strong><br />
            A student scores 468 marks out of a total possible score of 600 in competitive exams:<br />
            <code>(468 ÷ 600) × 100 = 78.0%</code>.
          </li>
          <li>
            <strong>Example 3: Annual Salary Increment (Percentage Change)</strong><br />
            An employee&apos;s monthly salary increases from ₹35,000 to ₹42,000 upon annual review:<br />
            <code>[(42,000 − 35,000) ÷ 35,000] × 100 = (7,000 ÷ 35,000) × 100 = 20% salary hike</code>.
          </li>
          <li>
            <strong>Example 4: Price Drop on Fuel (Percentage Decrease)</strong><br />
            Petrol prices drop from ₹105 per litre to ₹98.70 per litre:<br />
            <code>[(98.70 − 105) ÷ 105] × 100 = (−6.30 ÷ 105) × 100 = −6.0% (6% reduction)</code>.
          </li>
        </ul>

        <h2>Who Can Use This Calculator?</h2>
        <p>
          Our online percentage tool is designed for anyone needing accurate numbers in daily life:
        </p>
        <ul>
          <li><strong>Students & Teachers:</strong> Calculate marks percentages, grading curves, test benchmarks, and academic attendance.</li>
          <li><strong>Shoppers & Consumers:</strong> Quickly verify store discounts, buy-one-get-one deals, cashback offers, and coupon savings.</li>
          <li><strong>Business Owners & Traders:</strong> Compute profit margins, trade discounts, GST breakdowns, and sales commissions.</li>
          <li><strong>Investors & Salaried Professionals:</strong> Track salary hikes, portfolio growth, mutual fund returns, and inflation adjustments.</li>
        </ul>

        <h2>Frequently Asked Questions (FAQs)</h2>
        <h3>1. What is the easiest way to calculate a percentage in your head?</h3>
        <p>
          To find 10% of any number, move the decimal point one place to the left (e.g., 10% of 250 is 25). For 5%, halve that amount (12.5). For 20%, double the 10% amount (50). Combine these benchmarks for quick mental math.
        </p>
        <h3>2. What is the difference between percentage and percentile?</h3>
        <p>
          Percentage represents a fraction of a whole out of 100 (e.g., 85% on a test means you got 85 out of 100 marks correct). Percentile reflects your relative standing compared to a group (e.g., the 85th percentile means you scored higher than 85% of test-takers).
        </p>
        <h3>3. Can a percentage increase be greater than 100%?</h3>
        <p>
          Yes. If a value doubles from 50 to 100, that is a 100% increase. If it triples from 50 to 150, that represents a 200% increase. Percentage increases have no upper limit.
        </p>
        <h3>4. Can percentage decrease exceed 100%?</h3>
        <p>
          No, for absolute quantities like prices, weight, or inventory, a value cannot drop below zero. A 100% decrease means the value has dropped to 0.
        </p>
        <h3>5. How does this calculator handle decimal numbers?</h3>
        <p>
          Our tool supports arbitrary decimal inputs and provides answers accurate to multiple decimal places for reliable, high-precision results.
        </p>
        <h3>6. Is this percentage calculator free to use offline?</h3>
        <p>
          Yes, all calculation logic runs directly inside your web browser. You can install TopCalcBox as a PWA app and run calculations without internet connectivity.
        </p>

        <h2>Explore Related Calculators</h2>
        <p>
          Need to calculate financial or educational figures? Try these specialized tools:
        </p>
        <ul>
          <li><a href="/discount-calculator">Discount Calculator</a> – Find sale prices, clearance markdowns, and total savings.</li>
          <li><a href="/marks-percentage-calculator">Marks Percentage Calculator</a> – Compute aggregate school or college exam grades.</li>
          <li><a href="/gst-calculator">GST Calculator</a> – Calculate inclusive and exclusive Goods and Services Tax amounts.</li>
          <li><a href="/profit-and-loss-calculator">Profit and Loss Calculator</a> – Determine business gross margins and markups.</li>
          <li><a href="/attendance-percentage-calculator">Attendance Percentage Calculator</a> – Check your classroom attendance and bunk limits.</li>
        </ul>
      </SEOContent>
    </div>
  );
}
