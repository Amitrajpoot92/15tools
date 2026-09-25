import type { Metadata } from "next";
import { AverageCalculator } from "@/components/calculators/AverageCalculator";
import { SEOContent } from "@/components/SEOContent";
import { Sigma } from "lucide-react";

export const metadata: Metadata = {
  title: "Average Calculator - Mean, Median & Sum | TopCalcBox",
  description: "Calculate the average (mean), median, sum, and count for any dataset. A free and fast online average calculator for students, teachers, and data analysis.",
};

export default function AverageCalculatorPage() {
  return (
    <div className="pb-8">
      {/* Schema Markup for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            "name": "Average Calculator",
            "operatingSystem": "Any",
            "applicationCategory": "EducationalApplication",
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
        <div className="flex flex-col items-center text-center bg-orange-100 rounded-2xl p-4 md:p-6 mb-6 border border-orange-300">
          <h1 className="text-xl md:text-2xl font-extrabold text-[#111827] tracking-tight mb-1">
            Average Calculator
          </h1>
          <p className="text-slate-600 text-xs md:text-sm max-w-2xl font-medium leading-relaxed">
            Calculate the mean, median, sum, and count of your numbers instantly. Paste your dataset below.
          </p>
        </div>

        {/* Interactive Tool */}
        <div className="w-full">
          <AverageCalculator />
        </div>
      </div>

      <SEOContent>
        <h2>What is an Average Calculator?</h2>
        <p>
          An Average Calculator is an online tool that helps you quickly calculate the average (mean) of a set of numbers. It can also show the median, sum, and count of the numbers you enter.
        </p>
        <p>
          Simply enter your numbers separated by commas or spaces, and the calculator gives the results instantly. It is useful for calculating the average of marks, test scores, prices, expenses, sales, ratings, and other numerical data.
        </p>
        <p>
          For example, if you enter 10, 20, 30, 40, 50, 60, 70, the average is 40, the median is 40, the sum is 280, and the count is 7.
        </p>

        <h2>How to Use an Average Calculator</h2>
        <p>Use the Average Calculator to quickly find the average, median, sum, and count of any set of numbers.</p>
        <ol>
          <li><strong>Enter Your Numbers:</strong> Enter the numbers you want to calculate, separated by commas or spaces.<br />Example: 10, 20, 30, 40, 50</li>
          <li><strong>Get Your Results:</strong> The calculator instantly shows the Average (Mean), Median, Sum, and Count.</li>
          <li><strong>Check the Results:</strong> Use the results to understand your data quickly.</li>
          <li><strong>Copy or Reset:</strong> Copy the calculation or reset the calculator to enter a new set of numbers.</li>
        </ol>

        <h2>Calculation Formula</h2>
        <p>The Average Calculator uses simple formulas to calculate the average, median, sum, and count of your numbers.</p>
        
        <h3>1. Average (Mean)</h3>
        <blockquote>
          <strong>Average</strong> = Sum of All Numbers ÷ Total Number of Values
        </blockquote>
        <p>Example:<br />10, 20, 30, 40, 50<br />Average = 150 ÷ 5 = 30</p>

        <h3>2. Median</h3>
        <p>Arrange the numbers from smallest to largest, then find the middle value.</p>
        <p>Example:<br />10, 20, 30, 40, 50<br />Median = 30</p>
        <p>For an even number of values, take the average of the two middle numbers.</p>
        <p>Example:<br />10, 20, 30, 40, 50, 60<br />Median = (30 + 40) ÷ 2 = 35</p>

        <h3>3. Sum</h3>
        <blockquote>
          <strong>Sum</strong> = Addition of All Numbers
        </blockquote>
        <p>Example:<br />10 + 20 + 30 + 40 + 50 = 150</p>

        <h3>4. Count</h3>
        <blockquote>
          <strong>Count</strong> = Total Number of Values
        </blockquote>
        <p>Example:<br />10, 20, 30, 40, 50 → Count = 5</p>

        <h2>Who Can Use an Average Calculator</h2>
        <p>An Average Calculator is useful for anyone who needs to quickly calculate the average or understand a set of numbers.</p>
        <ul>
          <li><strong>Students:</strong> Calculate average marks, test scores, and grades.</li>
          <li><strong>Teachers:</strong> Find average scores of students or classes.</li>
          <li><strong>Gamers &amp; Sports Players:</strong> Calculate average scores, runs, points, goals, or match performance.</li>
          <li><strong>Businesses &amp; Shopkeepers:</strong> Calculate average sales, prices, or expenses.</li>
          <li><strong>Employees &amp; Professionals:</strong> Analyze salaries, working hours, or performance data.</li>
          <li><strong>Researchers &amp; Analysts:</strong> Quickly calculate averages from numerical data.</li>
          <li><strong>Everyday Users:</strong> Calculate average expenses, ratings, prices, or other values.</li>
        </ul>

        <h2>Frequently Asked Questions</h2>
        
        <h3>1. What is an Average Calculator?</h3>
        <p>An Average Calculator is an online tool that calculates the average (mean) of a set of numbers. It can also show the median, sum, and count.</p>

        <h3>2. How is an average calculated?</h3>
        <p>Average is calculated by adding all the numbers and dividing the total by the number of values.</p>

        <h3>3. What is the difference between average and median?</h3>
        <p>The average is found by dividing the sum by the number of values. The median is the middle value after arranging the numbers from smallest to largest.</p>

        <h3>4. What happens if the same number is entered multiple times?</h3>
        <p>Each value is counted separately. For example, 10, 10, and 20 have a sum of 40 and an average of 13.33.</p>

        <h3>5. Does the order of numbers affect the average?</h3>
        <p>No. Changing the order of the numbers does not change the average. The same values will always give the same average.</p>

        <h2>Related Calculators</h2>
        <ul>
          <li><a href="/marks-percentage-calculator" className="text-orange-600 hover:underline font-medium">Marks Percentage Calculator</a></li>
          <li><a href="/attendance-percentage-calculator" className="text-orange-600 hover:underline font-medium">Attendance Percentage Calculator</a></li>
          <li><a href="/negative-marking-calculator" className="text-orange-600 hover:underline font-medium">Negative Marking Calculator</a></li>
          <li><a href="/bodmas-calculator" className="text-orange-600 hover:underline font-medium">BODMAS Calculator</a></li>
        </ul>
      </SEOContent>
    </div>
  );
}
