import type { Metadata } from "next";
import { AttendanceCalculator } from "@/components/calculators/AttendanceCalculator";
import { SEOContent } from "@/components/SEOContent";
import { ClipboardCheck } from "lucide-react";

export const metadata: Metadata = {
  title: "Attendance Percentage Calculator - Check Bunking Status | TopCalcBox",
  description: "Free online attendance percentage calculator. Find out your current attendance and exactly how many classes you can bunk or need to attend.",
};

export default function AttendancePage() {
  return (
    <div className="pb-8">

      {/* Schema Markup for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            "name": "Attendance Percentage Calculator",
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
        <div className="flex flex-col items-center text-center bg-orange-50 rounded-2xl p-4 md:p-6 mb-6 border border-orange-200">
          <h1 className="text-xl md:text-2xl font-extrabold text-[#111827] tracking-tight mb-1">
            Attendance Percentage Calculator
          </h1>
          <p className="text-slate-600 text-xs md:text-sm max-w-2xl font-medium leading-relaxed">
            Calculate your current attendance percentage and see how many classes you need to attend or can afford to skip.
          </p>
        </div>

        {/* Interactive Tool */}
        <div className="w-full">
          <AttendanceCalculator />
        </div>
      </div>

      <SEOContent>
        <h2>What is an Attendance Percentage Calculator?</h2>
        <p>
          An Attendance Percentage Calculator is an online tool that helps you quickly calculate your current attendance based on the total classes held and classes attended. It also shows how many more classes you may need to attend to reach your target attendance.
        </p>
        <p>
          You can enter your target attendance percentage to understand whether you need to attend more classes or how many classes you can miss while staying above your target. This makes attendance planning easier for students.
        </p>
        <p>
          For example, if you attended 70 out of 100 classes, your current attendance is 70%. If your target is 75%, you need to attend 20 more consecutive classes to reach 75%.
        </p>

        <h2>How to Use the Attendance Percentage Calculator</h2>
        <p>Enter your class attendance details to check your current percentage and attendance requirement.</p>
        <ul>
          <li><strong>Enter Classes Held:</strong> Enter the total number of classes conducted.</li>
          <li><strong>Enter Classes Attended:</strong> Enter the number of classes you attended.</li>
          <li><strong>Enter Target Attendance:</strong> Add the attendance percentage you want to maintain, such as 75%.</li>
          <li><strong>Get Your Result:</strong> The calculator shows your Current Attendance and tells you how many classes you need to attend or can skip.</li>
          <li><strong>Copy or Reset:</strong> Use Copy to copy the result or Reset to clear the values and calculate again.</li>
        </ul>

        <h2>Attendance Percentage Calculation Formula</h2>
        <p>The basic attendance percentage is calculated using:</p>
        <blockquote>
          <strong>Attendance Percentage</strong> = (Classes Attended ÷ Classes Held) × 100
        </blockquote>

        <h3>Example</h3>
        <p>Classes Held = 100<br />Classes Attended = 80</p>
        <ul>
          <li>Attendance = (80 ÷ 100) × 100 = 80%</li>
        </ul>

        <p>To calculate the additional classes needed to reach a target:</p>
        <blockquote>
          <strong>Required Classes</strong> = (Target % × Total Classes − 100 × Classes Attended) ÷ (100 − Target %)
        </blockquote>

        <h3>Example:</h3>
        <p>Total Classes = 100<br />Classes Attended = 70<br />Target = 75%</p>
        <ul>
          <li>Required Classes = (75 × 100 − 100 × 70) ÷ (100 − 75)</li>
          <li>= (7,500 − 7,000) ÷ 25</li>
          <li><strong>= 20 classes</strong></li>
        </ul>
        <p>So, you need to attend 20 more consecutive classes to reach 75% attendance.</p>

        <h2>Who Can Use an Attendance Percentage Calculator</h2>
        <p>
          An Attendance Percentage Calculator is useful for students and anyone who needs to track class attendance and meet a required attendance percentage.
        </p>
        <ul>
          <li><strong>School Students:</strong> Check attendance and maintain the required percentage.</li>
          <li><strong>College Students:</strong> Find out how many classes are needed to reach the target attendance.</li>
          <li><strong>University Students:</strong> Track attendance requirements before exams.</li>
          <li><strong>Competitive Exam Students:</strong> Monitor attendance in coaching or training classes.</li>
          <li><strong>Parents:</strong> Quickly check and understand a student's attendance.</li>
          <li><strong>Teachers:</strong> Verify attendance percentages and required classes.</li>
          <li><strong>Students Planning Leave:</strong> Check how missing upcoming classes may affect attendance.</li>
        </ul>

        <h2>Frequently Asked Questions</h2>
        
        <h3>1. What is the attendance percentage formula?</h3>
        <p>Attendance Percentage = (Classes Attended ÷ Total Classes) × 100.</p>

        <h3>2. How many classes do I need to attend to reach 75% attendance?</h3>
        <p>It depends on your current classes held and classes attended. Enter both values and set the target to 75% to calculate the required classes.</p>

        <h3>3. How many classes do I need to attend to reach 80% attendance?</h3>
        <p>Enter your current attendance details and set the target to 80%. The calculator will show how many consecutive classes you need to attend.</p>

        <h3>4. Can I calculate attendance for college?</h3>
        <p>Yes. You can use the calculator for school, college, university, coaching classes, and other regular classes.</p>

        <h3>5. Is the Attendance Percentage Calculator accurate?</h3>
        <p>The calculation is mathematically accurate based on the numbers entered. However, your institution may have specific attendance rules for practicals, labs, or other classes.</p>

        <h2>Related Calculators</h2>
        <ul>
          <li><a href="/marks-percentage-calculator" className="text-orange-600 hover:underline font-medium">Marks Percentage Calculator</a></li>
          <li><a href="/negative-marking-calculator" className="text-orange-600 hover:underline font-medium">Negative Marking Calculator</a></li>
          <li><a href="/average-calculator" className="text-orange-600 hover:underline font-medium">Average Calculator</a></li>
          <li><a href="/bodmas-calculator" className="text-orange-600 hover:underline font-medium">BODMAS Calculator</a></li>
        </ul>
      </SEOContent>
    </div>
  );
}
