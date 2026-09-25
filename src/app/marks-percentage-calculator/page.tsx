import type { Metadata } from "next";
import { MarksPercentageCalculator } from "@/components/calculators/MarksPercentageCalculator";
import { SEOContent } from "@/components/SEOContent";
import { GraduationCap } from "lucide-react";

export const metadata: Metadata = {
  title: "Marks Percentage Calculator - Convert Exam Scores to % | TopCalcBox",
  description: "Free online marks percentage calculator for students and teachers. Instantly convert exam scores to percentages and estimate your grade.",
};

export default function MarksPercentagePage() {
  return (
    <div className="pb-8">

      {/* Schema Markup for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            "name": "Marks Percentage Calculator",
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
            Marks Percentage Calculator
          </h1>
          <p className="text-slate-600 text-xs md:text-sm max-w-2xl font-medium leading-relaxed">
            Convert your exam scores into an exact percentage and find out your estimated letter grade.
          </p>
        </div>

        {/* Interactive Tool */}
        <div className="w-full">
          <MarksPercentageCalculator />
        </div>
      </div>

      <SEOContent>
        <h2>What is a Marks Percentage Calculator?</h2>
        <p>
          A Marks Percentage Calculator is an online tool that helps you quickly calculate your exam percentage using the marks obtained and total or maximum marks. It makes percentage calculations simple and saves time by doing the calculation automatically.
        </p>
        <p>
          You can use it for school exams, college exams, tests, assignments, and competitive exams. The calculator can also show an estimated grade based on the calculated percentage.
        </p>
        <p>
          For example, if you score 450 out of 500 marks, your percentage is 90%. This makes it easy to understand your exam performance without calculating the percentage manually.
        </p>

        <h2>How to Use the Marks Percentage Calculator</h2>
        <p>Enter your exam marks to quickly calculate your percentage and estimated grade.</p>
        <ol>
          <li><strong>Enter Marks Obtained:</strong> Add the marks you scored in the exam.</li>
          <li><strong>Enter Total / Maximum Marks:</strong> Enter the maximum marks of the exam.</li>
          <li><strong>Get Your Result:</strong> Your Final Percentage and Estimated Grade will be displayed instantly.</li>
          <li><strong>Copy or Reset:</strong> Use Copy to copy the result or Reset to clear the values and calculate again.</li>
        </ol>

        <h2>Marks Percentage Calculation Formula</h2>
        <p>
          The marks percentage formula is used to find out what percentage of the total marks you have scored. It works for a single subject as well as for the overall marks of multiple subjects.
        </p>
        <blockquote>
          <strong>Percentage</strong> = (Marks Obtained ÷ Total Marks) × 100
        </blockquote>
        
        <h3>Example</h3>
        <p>Marks Obtained = 450<br />Total Marks = 500</p>
        <ul>
          <li>Percentage = (450 ÷ 500) × 100 = 90%</li>
          <li><strong>Final Percentage = 90%</strong></li>
        </ul>

        <h2>Estimated Grade</h2>
        <p>
          The Estimated Grade is based on the calculated percentage and gives a quick idea of the student's performance. Since grading systems can vary between schools, colleges, and boards, the grade shown should be treated as an estimate.
        </p>
        
        <h3>Example Grade Scale:</h3>
        <div className="overflow-x-auto my-6">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-100">
                <th className="border p-3 font-bold text-slate-700">Percentage</th>
                <th className="border p-3 font-bold text-slate-700">Estimated Grade</th>
              </tr>
            </thead>
            <tbody>
              <tr><td className="border p-3">90% – 100%</td><td className="border p-3 font-bold">A+</td></tr>
              <tr><td className="border p-3">80% – 89%</td><td className="border p-3 font-bold">A</td></tr>
              <tr><td className="border p-3">70% – 79%</td><td className="border p-3 font-bold">B+</td></tr>
              <tr><td className="border p-3">60% – 69%</td><td className="border p-3 font-bold">B</td></tr>
              <tr><td className="border p-3">50% – 59%</td><td className="border p-3 font-bold">C</td></tr>
              <tr><td className="border p-3">40% – 49%</td><td className="border p-3 font-bold">D</td></tr>
              <tr><td className="border p-3">Below 40%</td><td className="border p-3 font-bold text-rose-600">F</td></tr>
            </tbody>
          </table>
        </div>
        <p><em>Note: This is a general grading scale. Actual grades and passing requirements may differ by institution.</em></p>

        <h2>Who Can Use a Marks Percentage Calculator</h2>
        <p>
          A Marks Percentage Calculator is useful for students, parents, teachers, and anyone who needs to quickly calculate exam percentages.
        </p>
        <ul>
          <li><strong>School Students:</strong> Calculate percentages for tests, exams, and assessments.</li>
          <li><strong>College Students:</strong> Check semester and examination percentages.</li>
          <li><strong>Competitive Exam Students:</strong> Convert marks into a percentage for quick score analysis.</li>
          <li><strong>Parents:</strong> Check and understand their child's exam performance.</li>
          <li><strong>Teachers:</strong> Quickly verify students' percentage calculations.</li>
          <li><strong>Students Applying for Courses:</strong> Check their percentage against admission or eligibility requirements.</li>
        </ul>

        <h2>Frequently Asked Questions</h2>
        
        <h3>1. How do I calculate percentage from marks?</h3>
        <p>Divide the marks obtained by the total marks and multiply the result by 100.</p>

        <h3>2. How do I calculate overall percentage for multiple subjects?</h3>
        <p>Add the marks obtained in all subjects, add their maximum marks, and use: (Total Marks Obtained ÷ Total Maximum Marks) × 100.</p>

        <h3>3. How is the estimated grade calculated?</h3>
        <p>The estimated grade is determined from the calculated percentage using the grading scale provided by the calculator. Actual grading rules may vary by institution.</p>

        <h3>4. Is 35% a passing percentage?</h3>
        <p>Passing requirements depend on the school, college, board, or examination. Some institutions may use 35% as the minimum, while others may require a different percentage.</p>

        <h3>5. Can I calculate my percentage for school and college exams?</h3>
        <p>Yes. The calculator can be used for school exams, college exams, tests, assignments, and other marks-based assessments.</p>

        <h2>Related Calculators</h2>
        <ul>
          <li><a href="/attendance-percentage-calculator" className="text-rose-600 hover:underline font-medium">Attendance Percentage Calculator</a></li>
          <li><a href="/negative-marking-calculator" className="text-rose-600 hover:underline font-medium">Negative Marking Calculator</a></li>
          <li><a href="/average-calculator" className="text-rose-600 hover:underline font-medium">Average Calculator</a></li>
          <li><a href="/bodmas-calculator" className="text-rose-600 hover:underline font-medium">BODMAS Calculator</a></li>
        </ul>
      </SEOContent>
    </div>
  );
}
