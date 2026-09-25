import type { Metadata } from "next";
import { NegativeMarkingCalculator } from "@/components/calculators/NegativeMarkingCalculator";
import { SEOContent } from "@/components/SEOContent";
import { TrendingDown } from "lucide-react";

export const metadata: Metadata = {
  title: "Negative Marking Calculator - Calculate Exam Scores | TopCalcBox",
  description: "Free online negative marking calculator for competitive exams. Instantly calculate your true score taking into account penalties for wrong answers.",
};

export default function NegativeMarkingPage() {
  return (
    <div className="pb-8">

      {/* Schema Markup for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            "name": "Negative Marking Calculator",
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
        <div className="flex flex-col items-center text-center bg-amber-50 rounded-2xl p-4 md:p-6 mb-6 border border-amber-200">
          <h1 className="text-xl md:text-2xl font-extrabold text-[#111827] tracking-tight mb-1">
            Negative Marking Calculator
          </h1>
          <p className="text-slate-600 text-xs md:text-sm max-w-2xl font-medium leading-relaxed">
            Instantly calculate your final score in competitive exams by factoring in penalties for incorrect answers.
          </p>
        </div>

        {/* Interactive Tool */}
        <div className="w-full">
          <NegativeMarkingCalculator />
        </div>
      </div>

      <SEOContent>
        <h2>What is a Negative Marking Calculator?</h2>
        <p>
          A Negative Marking Calculator is an online tool that helps you calculate your final exam score after applying negative marking for incorrect answers. It considers the total questions, attempted questions, correct answers, marks awarded for each correct answer, and penalty for each wrong answer.
        </p>
        <p>
          It is useful for competitive exams and entrance tests where marks are added for correct answers and deducted for incorrect answers. The calculator also shows your wrong answers, accuracy, unattempted questions, and total penalty deducted.
        </p>
        <p>
          For example, if you attempt 80 questions, get 70 correct, and each correct answer carries 1 mark with a 1-mark penalty for each wrong answer, your final score is 60 marks.
        </p>

        <h2>How to Use the Negative Marking Calculator</h2>
        <p>Enter your exam details to calculate your final score after negative marking.</p>
        <ol>
          <li><strong>Enter Total Questions in Exam:</strong> Add the total number of questions in the exam.</li>
          <li><strong>Enter Total Questions Attempted:</strong> Enter how many questions you attempted.</li>
          <li><strong>Enter Correct Answers:</strong> Add the number of questions you answered correctly.</li>
          <li><strong>Enter Marks for Correct (+ve):</strong> Enter the marks awarded for each correct answer.</li>
          <li><strong>Enter Penalty for Wrong (-ve):</strong> Enter the marks deducted for each wrong answer.</li>
          <li><strong>Get Your Result:</strong> The calculator shows your Final Score, Wrong Answers, Accuracy, Unattempted Questions, and Penalty Deducted.</li>
          <li><strong>Copy or Reset:</strong> Use Copy to copy the result or Reset to clear the details and calculate again.</li>
        </ol>

        <h2>Negative Marking Calculation Formula</h2>
        <p>The calculator finds the wrong answers, unattempted questions, marks earned, and penalty to calculate your final score.</p>
        <ul>
          <li><strong>Wrong Answers</strong> = Questions Attempted − Correct Answers</li>
          <li><strong>Unattempted Questions</strong> = Total Questions − Questions Attempted</li>
          <li><strong>Marks Earned</strong> = Correct Answers × Marks per Correct Answer</li>
          <li><strong>Penalty</strong> = Wrong Answers × Penalty per Wrong Answer</li>
        </ul>
        <blockquote>
          <strong>Final Score</strong> = Marks Earned − Penalty
        </blockquote>

        <h3>Example</h3>
        <p>Total Questions = 100<br />Questions Attempted = 80<br />Correct Answers = 70<br />Marks per Correct Answer = 1<br />Penalty per Wrong Answer = 1</p>
        <ul>
          <li>Wrong Answers = 80 − 70 = 10</li>
          <li>Unattempted = 100 − 80 = 20</li>
          <li>Marks Earned = 70 × 1 = 70</li>
          <li>Penalty = 10 × 1 = 10</li>
          <li><strong>Final Score = 70 − 10 = 60 marks</strong></li>
          <li>Accuracy = (70 ÷ 80) × 100 = 87.5%</li>
        </ul>

        <h2>Who Can Use a Negative Marking Calculator</h2>
        <p>
          A Negative Marking Calculator is useful for anyone who wants to estimate their final exam score after penalties for incorrect answers.
        </p>
        <ul>
          <li><strong>Competitive Exam Aspirants:</strong> Calculate expected scores in exams with negative marking.</li>
          <li><strong>Entrance Exam Students:</strong> Check scores after considering correct and incorrect answers.</li>
          <li><strong>Government Exam Aspirants:</strong> Estimate marks for exams that deduct marks for wrong answers.</li>
          <li><strong>School &amp; College Students:</strong> Calculate scores for tests that follow a negative marking system.</li>
          <li><strong>Mock Test Users:</strong> Analyse scores, wrong answers, accuracy, and penalties after practice tests.</li>
          <li><strong>Teachers &amp; Coaching Institutes:</strong> Quickly calculate and verify students' scores.</li>
          <li><strong>Students Comparing Attempts:</strong> Understand how incorrect answers affect the final score.</li>
        </ul>

        <h2>Frequently Asked Questions</h2>
        
        <h3>1. What is a Negative Marking Calculator?</h3>
        <p>It is an online tool that calculates your final exam score after adding marks for correct answers and deducting marks for incorrect answers.</p>

        <h3>2. If there is 1 mark negative marking, how much will be deducted?</h3>
        <p>If you have 10 wrong answers and the penalty is 1 mark per wrong answer, 10 marks will be deducted.</p>

        <h3>3. Can I use this calculator for competitive exams?</h3>
        <p>Yes. You can use it for competitive, entrance, government, and other exams that have negative marking.</p>

        <h3>4. Can I calculate scores with different negative marking rules?</h3>
        <p>Yes. Enter the marks for a correct answer and the penalty for a wrong answer according to your exam pattern.</p>

        <h3>5. Can negative marking reduce my score below zero?</h3>
        <p>It depends on the exam rules. Some exams may allow a negative score, while others may not allow the final score to go below zero.</p>

        <h2>Related Calculators</h2>
        <ul>
          <li><a href="/marks-percentage-calculator" className="text-amber-600 hover:underline font-medium">Marks Percentage Calculator</a></li>
          <li><a href="/attendance-percentage-calculator" className="text-amber-600 hover:underline font-medium">Attendance Percentage Calculator</a></li>
          <li><a href="/average-calculator" className="text-amber-600 hover:underline font-medium">Average Calculator</a></li>
          <li><a href="/bodmas-calculator" className="text-amber-600 hover:underline font-medium">BODMAS Calculator</a></li>
        </ul>
      </SEOContent>
    </div>
  );
}
