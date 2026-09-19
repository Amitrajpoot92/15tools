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
        <div className="flex items-center gap-4 md:gap-6 bg-amber-50/50 rounded-2xl p-4 md:p-6 mb-6 border border-amber-100/50">
          <div className="hidden sm:flex flex-shrink-0 items-center justify-center w-16 h-16 bg-amber-600 rounded-2xl shadow-sm shadow-amber-600/20">
            <Calculator className="w-8 h-8 text-white" />
          </div>
          <div>
            <h2 className="text-[10px] md:text-xs font-bold text-amber-600 uppercase tracking-wider mb-1">BODMAS</h2>
            <h1 className="text-xl md:text-2xl font-extrabold text-slate-900 tracking-tight mb-1">
              BODMAS Calculator
            </h1>
            <p className="text-slate-600 text-xs md:text-sm max-w-2xl font-medium leading-relaxed">
              Solve complex math equations step-by-step instantly using the correct order of operations.
            </p>
          </div>
        </div>

        {/* Interactive Tool */}
        <div className="w-full">
          <BODMASCalculator />
        </div>
      </div>

      <SEOContent>
        <h2>What is the BODMAS Rule?</h2>
        <p>
          <strong>BODMAS</strong> is an acronym used in mathematics to remember the correct order of operations when solving an expression that has multiple operations (like addition, subtraction, multiplication, etc.). It stands for:
        </p>
        <ul>
          <li><strong>B</strong> - Brackets <code>()</code> <code>[]</code> <code>{"{}"}</code></li>
          <li><strong>O</strong> - Orders or Of (Roots and Exponents like <code>x²</code>)</li>
          <li><strong>D</strong> - Division <code>÷</code></li>
          <li><strong>M</strong> - Multiplication <code>×</code></li>
          <li><strong>A</strong> - Addition <code>+</code></li>
          <li><strong>S</strong> - Subtraction <code>-</code></li>
        </ul>
        <p>
          Without following this strict rule, a single math equation could have multiple different, incorrect answers. For example, in the expression <code>5 + 2 × 3</code>, you must multiply before you add. The correct answer is <code>11</code>, not <code>21</code>.
        </p>
        
        <h2>How to Use the BODMAS Calculator</h2>
        <p>
          Our online BODMAS Calculator is designed for students and professionals to instantly verify their math work:
        </p>
        <ul>
          <li><strong>Type your expression:</strong> Enter your full equation in the text box using standard keyboard symbols (e.g., <code>(10 + 5) * 2 / 5</code>).</li>
          <li><strong>Get instant results:</strong> As you type, the engine evaluates the expression securely and displays the final answer following the BODMAS hierarchy.</li>
          <li><strong>Fix errors:</strong> If you miss a bracket or enter an invalid character, the calculator will instantly alert you.</li>
        </ul>

        <h2>Why Use an Online BODMAS Calculator?</h2>
        <p>
          While basic calculators evaluate equations sequentially from left to right, they often fail to respect brackets or multiplication priority. Our advanced calculator acts just like a scientific calculator, parsing the entire string and applying operations in the mathematically correct order.
        </p>

        <h2>Common Examples</h2>
        <ul>
          <li><code>8 + 2 * (5 - 3)</code> = <code>12</code></li>
          <li><code>10 / 2 + 3 * 4</code> = <code>17</code></li>
          <li><code>(6 + 4) / 2 * 3</code> = <code>15</code> (Division and Multiplication are evaluated left to right)</li>
        </ul>
      </SEOContent>
    </div>
  );
}
