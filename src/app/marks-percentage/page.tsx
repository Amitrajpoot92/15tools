import type { Metadata } from "next";
import { MarksPercentageCalculator } from "@/components/calculators/MarksPercentageCalculator";
import { SEOContent } from "@/components/SEOContent";
import { GraduationCap } from "lucide-react";

export const metadata: Metadata = {
  title: "Marks Percentage Calculator - Convert Exam Scores to % | ToolZen",
  description: "Free online marks percentage calculator for students and teachers. Instantly convert exam scores to percentages and estimate your grade.",
};

export default function MarksPercentagePage() {
  return (
    <div className="pb-20">
      <div className="flex flex-col items-center justify-center text-center mb-10 mt-6">
        <div className="p-4 bg-rose-50 rounded-full mb-4 border border-rose-100 shadow-sm">
          <GraduationCap className="w-8 h-8 text-rose-600" />
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-4">
          Marks Percentage Calculator
        </h1>
        <p className="text-slate-500 max-w-2xl text-lg">
          Convert your exam scores into an exact percentage and find out your estimated letter grade.
        </p>
      </div>

      <div className="max-w-4xl mx-auto mb-16">
        <MarksPercentageCalculator />
      </div>

      <SEOContent>
        <h2>What is a Marks Percentage Calculator?</h2>
        <p>
          A <strong>Marks Percentage Calculator</strong> is a tool designed primarily for students, parents, and teachers. It takes the total marks a student obtained in an exam or assignment and calculates the exact percentage score based on the maximum possible marks.
        </p>
        
        <h3>How to Calculate Exam Percentages</h3>
        <p>
          If you want to calculate your percentage manually, the formula is straightforward:
        </p>
        <blockquote>
          <strong>Percentage = (Marks Obtained ÷ Total Marks) × 100</strong>
        </blockquote>
        <p>
          For example, if you scored 450 out of 500 on a final exam:
        </p>
        <blockquote>
          Percentage = (450 / 500) × 100 = 0.9 × 100 = <strong>90%</strong>
        </blockquote>

        <h3>Estimated Letter Grades</h3>
        <p>
          Along with your percentage, our tool provides a rough estimate of your letter grade. Grading systems vary widely between countries, states, and individual schools, but our tool uses a common standard academic scale:
        </p>
        <ul>
          <li><strong>A+ / A</strong> : 80% to 100%</li>
          <li><strong>B</strong> : 70% to 79%</li>
          <li><strong>C</strong> : 60% to 69%</li>
          <li><strong>D</strong> : 50% to 59%</li>
          <li><strong>F (Fail)</strong> : Below 40% - 50% depending on the region</li>
        </ul>

        <h3>Why use this tool?</h3>
        <p>
          Whether you are combining scores from multiple subjects to find your overall semester average, or you are a teacher quickly grading papers, this calculator removes the human error from the equation and gives you instant, accurate results.
        </p>
      </SEOContent>
    </div>
  );
}
