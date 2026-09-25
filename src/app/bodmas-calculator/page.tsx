import type { Metadata } from "next";
import { BODMASCalculator } from "@/components/calculators/BODMASCalculator";
import { SEOContent } from "@/components/SEOContent";
import { Calculator } from "lucide-react";

export const metadata: Metadata = {
  title: "BODMAS Calculator - Solve Math Expressions Online | TopCalcBox",
  description: "Free online BODMAS calculator to solve complex mathematical expressions instantly using correct order of operations (Brackets, Orders, Division, Multiplication, Addition, Subtraction).",
};

export default function BODMASCalculatorPage() {
  return (
    <div className="pb-8">
      {/* Schema Markup for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            "name": "BODMAS Calculator",
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
        <div className="flex flex-col items-center text-center bg-amber-100 rounded-2xl p-4 md:p-6 mb-6 border border-amber-300">
          <h1 className="text-xl md:text-2xl font-extrabold text-[#111827] tracking-tight mb-1">
            BODMAS Calculator
          </h1>
          <p className="text-slate-600 text-xs md:text-sm max-w-2xl font-medium leading-relaxed">
            Solve complex math equations step-by-step instantly using the correct order of operations.
          </p>
        </div>

        {/* Interactive Tool */}
        <div className="w-full">
          <BODMASCalculator />
        </div>
      </div>

      <SEOContent>
        <h2>What is a BODMAS Calculator?</h2>
        <p>
          A BODMAS Calculator is an online tool that solves mathematical expressions using the correct order of operations. BODMAS stands for:
        </p>
        <ul>
          <li><strong>B</strong> – Brackets ( )</li>
          <li><strong>O</strong> – Orders ^ (Powers, Roots)</li>
          <li><strong>D</strong> – Division ÷ or /</li>
          <li><strong>M</strong> – Multiplication × or *</li>
          <li><strong>A</strong> – Addition +</li>
          <li><strong>S</strong> – Subtraction −</li>
        </ul>
        <p>The calculator follows these rules step by step to give the correct answer.</p>
        <p>For example:</p>
        <ul>
          <li>(6 + 4) ÷ 2 × 3</li>
          <li>(10) ÷ 2 × 3 → 5 × 3 → 15</li>
          <li>So, the final answer is <strong>15</strong>.</li>
        </ul>
        <p>
          It is useful for students, teachers, exam preparation, and anyone who wants to solve mathematical expressions quickly and understand the calculation step by step.
        </p>

        <h2>How to Use a BODMAS Calculator</h2>
        <p>Use the BODMAS Calculator to solve mathematical expressions step by step using the correct order of operations.</p>
        <ol>
          <li><strong>Enter Expression:</strong> Enter your math expression using numbers, brackets, and operators such as +, −, × (*), and ÷ (/).</li>
          <li><strong>Solve Automatically:</strong> The calculator applies the BODMAS rule in the correct order.</li>
          <li><strong>View Steps:</strong> Check the step-by-step calculation to understand how the answer was reached.</li>
          <li><strong>Get Final Answer:</strong> View the final result instantly.</li>
          <li><strong>Copy or Reset:</strong> Copy the result or reset the calculator for a new expression.</li>
        </ol>
        <p><strong>Fix errors:</strong> If you miss a bracket or enter an invalid character, the calculator will instantly alert you.</p>

        <h2>BODMAS Calculation Formula</h2>
        <p>A BODMAS Calculator does not use one single formula. It follows the BODMAS order of operations to solve an expression correctly.</p>
        <ul>
          <li><strong>B → Brackets:</strong> Solve expressions inside ( ) first.</li>
          <li><strong>O → Orders:</strong> Solve powers ^ and roots.</li>
          <li><strong>D → Division:</strong> Perform ÷ or /.</li>
          <li><strong>M → Multiplication:</strong> Perform × or *.</li>
          <li><strong>A → Addition:</strong> Perform +.</li>
          <li><strong>S → Subtraction:</strong> Perform −.</li>
        </ul>

        <h3>Example</h3>
        <p>10 + 6 × (8 − 3) ÷ 2</p>
        <ul>
          <li><strong>Step 1: Brackets</strong> → 8 − 3 = 5</li>
          <li><strong>Step 2: Multiplication</strong> → 6 × 5 = 30</li>
          <li><strong>Step 3: Division</strong> → 30 ÷ 2 = 15</li>
          <li><strong>Step 4: Addition</strong> → 10 + 15 = 25</li>
        </ul>
        <p><strong>Final Answer = 25</strong></p>

        <h2>Who Can Use a BODMAS Calculator</h2>
        <p>A BODMAS Calculator is useful for anyone who needs to solve mathematical expressions accurately and understand the correct order of operations.</p>
        <ul>
          <li><strong>School Students:</strong> Solve arithmetic expressions and practice BODMAS questions.</li>
          <li><strong>College &amp; University Students:</strong> Solve equations and calculations involving multiple operations.</li>
          <li><strong>Teachers:</strong> Create examples and explain the order of operations to students.</li>
          <li><strong>Competitive Exam Aspirants:</strong> Practice quantitative aptitude and numerical questions.</li>
          <li><strong>Parents:</strong> Help children understand and practice mathematical calculations.</li>
          <li><strong>Teachers &amp; Tutors:</strong> Demonstrate step-by-step solutions during lessons.</li>
          <li><strong>Everyday Users:</strong> Quickly solve complex calculations without doing them manually.</li>
        </ul>

        <h2>Frequently Asked Questions</h2>
        
        <h3>1. What is a BODMAS Calculator?</h3>
        <p>A BODMAS Calculator is an online tool that solves mathematical expressions according to the correct order of operations: Brackets, Orders, Division, Multiplication, Addition, and Subtraction.</p>

        <h3>2. Which operation should be performed first in BODMAS?</h3>
        <p>Brackets are solved first. After that, solve Orders, followed by Division and Multiplication, and then Addition and Subtraction.</p>

        <h3>3. Does BODMAS include powers and roots?</h3>
        <p>Yes. Orders include mathematical operations such as powers and roots, which are solved before division and multiplication.</p>

        <h3>4. Why do we use the BODMAS rule?</h3>
        <p>BODMAS provides a consistent order for solving mathematical expressions, helping ensure that the same expression produces the correct result.</p>

        <h3>5. Does a BODMAS Calculator show step-by-step calculations?</h3>
        <p>Yes, a BODMAS Calculator shows the calculation step by step, helping you understand how each operation is performed according to the BODMAS rule before displaying the final answer.</p>

        <h2>Related Calculators</h2>
        <ul>
          <li><a href="/marks-percentage-calculator" className="text-amber-600 hover:underline font-medium">Marks Percentage Calculator</a></li>
          <li><a href="/attendance-percentage-calculator" className="text-amber-600 hover:underline font-medium">Attendance Percentage Calculator</a></li>
          <li><a href="/negative-marking-calculator" className="text-amber-600 hover:underline font-medium">Negative Marking Calculator</a></li>
          <li><a href="/average-calculator" className="text-amber-600 hover:underline font-medium">Average Calculator</a></li>
        </ul>
      </SEOContent>
    </div>
  );
}
