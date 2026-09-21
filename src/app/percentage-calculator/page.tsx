import type { Metadata } from "next";
import { PercentageCalculator } from "@/components/calculators/PercentageCalculator";
import { SEOContent } from "@/components/SEOContent";
import { Percent } from "lucide-react";

export const metadata: Metadata = {
  title: "Percentage Calculator - Fast & Accurate Online Tool | TopCalcBox",
  description: "Use our free online percentage calculator to quickly find the percentage of a number, calculate discounts, and figure out ratio percentages.",
};

export default function PercentageCalculatorPage() {
  return (
    <div className="pb-8">

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

    
      <div className="max-w-4xl mx-auto mb-10 bg-white rounded-3xl p-4 md:p-6 shadow-sm border border-slate-200 mt-2">
        {/* Ultra Compact Header */}
        <div className="flex flex-col items-center text-center bg-blue-50 rounded-2xl p-4 md:p-6 mb-6 border border-blue-200">
          <h1 className="text-xl md:text-2xl font-extrabold text-blue-800 tracking-tight mb-2">
            Percentage Calculator
          </h1>
          <p className="text-slate-900 text-xs md:text-sm max-w-2xl font-medium leading-relaxed">
            Calculate a percentage of any number, find percentage increases or decreases, and work out the percentage difference between values.
          </p>
        </div>

        {/* Interactive Tool */}
        <div className="w-full">
          <PercentageCalculator />
        </div>
      </div>

      <SEOContent>
        <h2>What is Percentage Calculator?</h2>
        <p>
          Percentage Calculator is a simple online tool that helps you calculate percentages quickly and accurately. Whether you want to find what percentage of a number, calculate what percentage one number is of another, or check the percentage increase or decrease, this calculator can give you the result instantly.
        </p>
        <p>
          Percentage is used in many situations in daily life. Students use percentages to calculate exam marks, businesses use them to calculate discounts and profits, and shoppers use them to understand price reductions. Percentages are also useful for comparing numbers, calculating salary increases, checking expenses and understanding financial calculations.
        </p>
        <p>
          With this online percentage calculator, you do not need to remember complicated calculations. Enter your numbers, choose the type of percentage calculation you need, and get the result instantly.
        </p>

        <h2>How to Use Percentage Calculator</h2>
        <p>
          Using our Percentage Calculator is quick and easy. Choose the type of calculation, enter your values, and get the result instantly.
        </p>
        <ol>
          <li><strong>Choose a calculation:</strong> Select from What is X% of Y?, X is what % of Y?, or % Change (Increase/Decrease).</li>
          <li><strong>Enter the values:</strong> Add the numbers required for your selected calculation.</li>
          <li><strong>Get your result:</strong> Your percentage is calculated and displayed instantly.</li>
          <li><strong>Copy or reset:</strong> Copy the result or reset the calculator for a new calculation.</li>
        </ol>
        <p>
          Example: To calculate 15% of 100, enter 15 and 100. The answer is 15.
        </p>

        <h2>Percentage Calculation Formula</h2>
        <p>
          Our Percentage Calculator supports three common types of percentage calculations. Here are the formulas with simple examples:
        </p>
        
        <h3>1. What is X% of Y?</h3>
        <p>
          <strong>Formula:</strong> Result = (X ÷ 100) × Y<br/>
          <strong>Example:</strong> 20% of 500 = (20 ÷ 100) × 500 = 100
        </p>

        <h3>2. X is What % of Y?</h3>
        <p>
          <strong>Formula:</strong> Percentage = (X ÷ Y) × 100<br/>
          <strong>Example:</strong> 50 is what % of 200? (50 ÷ 200) × 100 = 25%
        </p>

        <h3>3. Percentage Change (Increase/Decrease)</h3>
        <p>
          <strong>Formula:</strong> Percentage Change = [(New Value − Original Value) ÷ Original Value] × 100
        </p>
        <p>
          <strong>Example:</strong><br/>
          Original Value = 500<br/>
          New Value = 600<br/>
          [(600 − 500) ÷ 500] × 100 = 20% increase
        </p>
        <p>
          These three formulas cover the most common percentage calculations used in everyday life.
        </p>

        <h2>Who Can Use a Percentage Calculator?</h2>
        <p>
          A Percentage Calculator is useful for many everyday calculations. Depending on the type of calculation, you can use it for:
        </p>
        <ul>
          <li><strong>What is X% of Y?</strong> — Useful for calculating discounts, GST/tax amounts, tips, commissions, profits and a percentage of any number.</li>
          <li><strong>X is What % of Y?</strong> — Useful for calculating exam marks, attendance, sales targets, completion rates and comparing one value with another.</li>
          <li><strong>Percentage Change</strong> — Useful for checking price increases or decreases, salary changes, sales growth, expenses and other changes between two values.</li>
        </ul>
        <p>
          Whether you are a student, teacher, shopper, employee, business owner or general user, the calculator can help you solve percentage calculations quickly.
        </p>

        <h2>Frequently Asked Questions (FAQ)</h2>
        
        <h3>1. What is a percentage calculator?</h3>
        <p>A percentage calculator is an online tool that helps you quickly calculate percentages, find a percentage of a number, and calculate percentage increases or decreases.</p>

        <h3>2. How do I calculate a percentage of a number?</h3>
        <p>Use the formula (Percentage ÷ 100) × Number. For example, 20% of 500 is 100.</p>

        <h3>3. How do I find what percentage one number is of another?</h3>
        <p>Use (Part ÷ Total) × 100. For example, 50 is 25% of 200.</p>

        <h3>4. How do I calculate percentage increase or decrease?</h3>
        <p>Enter the original value and new value in the percentage change calculator. It will show the percentage increase or decrease.</p>

        <h3>5. Can I use this percentage calculator for exam marks?</h3>
        <p>Yes. You can calculate your exam percentage by entering your obtained marks and total marks.</p>

        <h3>6. Can I calculate discounts with a percentage calculator?</h3>
        <p>Yes. You can use it to find the percentage amount of a product price, such as calculating 10%, 20%, or 50% of a price.</p>

        <h2>Related Calculators</h2>
        <ul>
          <li><a href="/discount-calculator" className="text-blue-600 hover:underline">Discount Calculator</a></li>
          <li><a href="/marks-percentage-calculator" className="text-blue-600 hover:underline">Marks Percentage Calculator</a></li>
          <li><a href="/margin-calculator" className="text-blue-600 hover:underline">Margin Calculator</a></li>
          <li><a href="/tip-calculator" className="text-blue-600 hover:underline">Tip Calculator</a></li>
          <li><a href="/gst-calculator" className="text-blue-600 hover:underline">GST Calculator</a></li>
          <li><a href="/profit-and-loss-calculator" className="text-blue-600 hover:underline">Profit & Loss Calculator</a></li>
          <li><a href="/attendance-percentage-calculator" className="text-blue-600 hover:underline">Attendance Percentage Calculator</a></li>
        </ul>
      </SEOContent>
    </div>
  );
}
