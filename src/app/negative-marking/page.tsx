import type { Metadata } from "next";
import { NegativeMarkingCalculator } from "@/components/calculators/NegativeMarkingCalculator";
import { SEOContent } from "@/components/SEOContent";
import { TrendingDown } from "lucide-react";

export const metadata: Metadata = {
  title: "Negative Marking Calculator - Calculate Exam Scores | ToolZen",
  description: "Free online negative marking calculator for competitive exams. Instantly calculate your true score taking into account penalties for wrong answers.",
};

export default function NegativeMarkingPage() {
  return (
    <div className="pb-20">
      <div className="flex flex-col items-center justify-center text-center mb-10 mt-6">
        <div className="p-4 bg-amber-50 rounded-full mb-4 border border-amber-100 shadow-sm">
          <TrendingDown className="w-8 h-8 text-amber-600" />
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-4">
          Negative Marking Calculator
        </h1>
        <p className="text-slate-500 max-w-2xl text-lg">
          Instantly calculate your final score in competitive exams by factoring in penalties for incorrect answers.
        </p>
      </div>

      <div className="max-w-4xl mx-auto mb-16">
        <NegativeMarkingCalculator />
      </div>

      <SEOContent>
        <h2>What is a Negative Marking Calculator?</h2>
        <p>
          A <strong>Negative Marking Calculator</strong> is a specialized tool used by students preparing for competitive exams (like the SAT, GRE, JEE, NEET, or civil service exams). In these exams, you don't just get points for correct answers—you also lose points for incorrect ones. This tool helps you quickly calculate your true final score based on the exam's specific penalty rules.
        </p>
        
        <h3>How Does Negative Marking Work?</h3>
        <p>
          To discourage students from randomly guessing on multiple-choice questions, examining boards implement negative marking. 
          For example, a correct answer might give you 4 points, but an incorrect answer might deduct 1 point from your total.
        </p>
        
        <h3>How to Calculate Your Score</h3>
        <p>If you want to understand the math behind the calculator, here is the formula we use:</p>
        <blockquote>
          <strong>Total Positive Score = Correct Answers × Marks per Correct Answer</strong><br />
          <strong>Total Penalty = Wrong Answers × Penalty per Wrong Answer</strong><br />
          <strong>Final Score = Total Positive Score - Total Penalty</strong>
        </blockquote>
        <p>
          For example, if you attempt 100 questions, get 75 correct, and the marking scheme is +4 for correct and -1 for wrong:
        </p>
        <ul>
          <li>Correct Answers: 75</li>
          <li>Wrong Answers: 25 (100 - 75)</li>
          <li>Positive Score: 75 × 4 = 300</li>
          <li>Penalty: 25 × 1 = 25</li>
          <li><strong>Final Score: 300 - 25 = 275</strong></li>
        </ul>

        <h3>Should you guess on exams with negative marking?</h3>
        <p>
          Generally, if you can eliminate at least one or two of the incorrect options, the statistical probability tilts in your favor and it is mathematically advantageous to guess. However, if you have absolutely no idea, random guessing can severely hurt your score in a negative marking system.
        </p>
      </SEOContent>
    </div>
  );
}
