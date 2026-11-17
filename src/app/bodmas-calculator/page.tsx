import type { Metadata } from "next";
import { BODMASCalculator } from "@/components/calculators/BODMASCalculator";
import { SEOContent } from "@/components/SEOContent";
import { ToolHeaderBanner } from "@/components/ToolHeaderBanner";
import { Calculator } from "lucide-react";

export const metadata: Metadata = {
  title: "BODMAS Calculator – Solve Maths Expressions Online",
  description: "Free online BODMAS calculator to solve complex mathematical expressions instantly using correct order of operations (Brackets, Orders, Division, Multiplication, Addition, Subtraction).",
  alternates: {
    canonical: "https://topcalcbox.com/bodmas-calculator",
  },
  openGraph: {
    title: "BODMAS Calculator – Solve Maths Expressions Online",
    description: "Free online BODMAS calculator to solve complex mathematical expressions instantly using correct order of operations (Brackets, Orders, Division, Multiplication, Addition, Subtraction).",
    url: "https://topcalcbox.com/bodmas-calculator",
    type: "website",
  },
};

export default function BODMASCalculatorPage() {
  return (
    <div className="pb-2 sm:pb-4">
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

    
      <div className="max-w-4xl mx-auto mb-4 sm:mb-5 bg-white rounded-2xl sm:rounded-3xl p-3.5 sm:p-5 shadow-md shadow-slate-200/60 border-2 border-slate-200/90">
        {/* Compact Header */}
        <ToolHeaderBanner
          title="BODMAS Calculator"
          description="Solve complex math equations step-by-step instantly using the correct order of operations."
          color="amber"
          icon={<Calculator className="w-5 h-5" strokeWidth={2.5} />}
        />

        {/* Interactive Tool */}
        <div className="w-full">
          <BODMASCalculator />
        </div>
      </div>

      <SEOContent>
        <h2>About BODMAS Calculator</h2>
        <p>
          The <strong>BODMAS Calculator</strong> on TopCalcBox is an interactive mathematical solver designed to compute complex arithmetic expressions following the universally recognized order of operations. Without standard operational rules, mathematical equations can yield conflicting, ambiguous answers. For instance, the simple expression <code>6 + 4 &times; 3</code> could be evaluated as 30 if calculated left-to-right, or 18 if multiplication is prioritized. BODMAS establishes the authoritative mathematical framework that ensures every expression resolves to a single correct truth.
        </p>
        <p>
          In India, the UK, Australia, and Commonwealth nations, this convention is known as <strong>BODMAS</strong> (Brackets, Orders, Division, Multiplication, Addition, Subtraction), while in the United States and North America it is widely taught as <strong>PEMDAS</strong> (Parentheses, Exponents, Multiplication, Division, Addition, Subtraction). Our calculator faithfully adheres to modern mathematical standards, showing complete intermediate steps so students, educators, and exam candidates can master the exact sequence of algebraic reduction.
        </p>

        <h2>How to Use the BODMAS Calculator</h2>
        <p>
          Solving multi-operator expressions with complete step-by-step transparency is simple:
        </p>
        <ol>
          <li><strong>Enter the Expression:</strong> Type or paste your mathematical formula into the input field. You can use standard keyboard symbols:
            <ul>
              <li><code>+</code> for Addition and <code>&minus;</code> for Subtraction</li>
              <li><code>*</code> or <code>&times;</code> for Multiplication</li>
              <li><code>/</code> or <code>&divide;</code> for Division</li>
              <li><code>( )</code>, <code>[ ]</code>, or <code>&#123; &#125;</code> for Grouping Brackets</li>
              <li><code>^</code> for Exponents and Powers (e.g., <code>2^3</code> for \(2^3\))</li>
            </ul>
          </li>
          <li><strong>Automatic Syntax Validation:</strong> The calculator automatically verifies bracket pairing and mathematical syntax in real time.</li>
          <li><strong>View Step-by-Step Breakdown:</strong> Examine each intermediate operational reduction from innermost brackets down to the final scalar result.</li>
          <li><strong>Copy or Reset:</strong> Easily copy the full equation and answer for homework, or clear the screen to input a new problem.</li>
        </ol>

        <h2>The BODMAS Order of Precedence Hierarchy</h2>
        <p>
          Operations are executed in strict descending order of precedence from highest to lowest:
        </p>

        <div className="overflow-x-auto my-4">
          <table className="min-w-full text-left text-sm border-collapse">
            <thead>
              <tr className="border-b border-slate-300 dark:border-slate-700 bg-amber-50 dark:bg-amber-950/30">
                <th className="py-2 px-3 font-semibold text-slate-800 dark:text-slate-200">Letter</th>
                <th className="py-2 px-3 font-semibold text-slate-800 dark:text-slate-200">Meaning</th>
                <th className="py-2 px-3 font-semibold text-slate-800 dark:text-slate-200">Symbols / Examples</th>
                <th className="py-2 px-3 font-semibold text-slate-800 dark:text-slate-200">Priority Level</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
              <tr>
                <td className="py-2 px-3 font-bold text-amber-600">B</td>
                <td className="py-2 px-3 font-medium">Brackets</td>
                <td className="py-2 px-3"><code>( )</code>, <code>[ ]</code>, <code>&#123; &#125;</code> (Innermost evaluated first)</td>
                <td className="py-2 px-3">1st (Highest)</td>
              </tr>
              <tr>
                <td className="py-2 px-3 font-bold text-amber-600">O</td>
                <td className="py-2 px-3 font-medium">Orders / Powers / Roots</td>
                <td className="py-2 px-3">2³, √16, exponents, indices</td>
                <td className="py-2 px-3">2nd</td>
              </tr>
              <tr>
                <td className="py-2 px-3 font-bold text-amber-600">D &amp; M</td>
                <td className="py-2 px-3 font-medium">Division &amp; Multiplication</td>
                <td className="py-2 px-3">÷, /, ×, * (Equal precedence: Left to Right)</td>
                <td className="py-2 px-3">3rd</td>
              </tr>
              <tr>
                <td className="py-2 px-3 font-bold text-amber-600">A &amp; S</td>
                <td className="py-2 px-3 font-medium">Addition &amp; Subtraction</td>
                <td className="py-2 px-3">+, − (Equal precedence: Left to Right)</td>
                <td className="py-2 px-3">4th (Lowest)</td>
              </tr>
            </tbody>
          </table>
        </div>

        <blockquote>
          <strong>Crucial Left-to-Right Rule:</strong> Division and Multiplication share equal priority, as do Addition and Subtraction. When operators of equal rank appear sequentially, you must evaluate them strictly from <strong>left to right</strong>.
        </blockquote>

        <h2>Practical Step-by-Step Math Examples</h2>

        <h3>Example 1: The Famous Internet Viral Problem</h3>
        <p>
          <strong>Expression:</strong> <code>8 ÷ 2(2 + 2)</code>
        </p>
        <ul>
          <li><strong>Step 1 (Brackets):</strong> Simplify inside parentheses: (2 + 2) = 4. Expression becomes: 8 ÷ 2 × 4.</li>
          <li><strong>Step 2 (Division &amp; Multiplication Left-to-Right):</strong> Division appears first from the left: 8 ÷ 2 = 4. Expression becomes: 4 × 4.</li>
          <li><strong>Step 3 (Multiplication):</strong> 4 × 4 = <strong>16</strong>.</li>
          <li><strong>Note on Common Misconceptions:</strong> Some erroneously multiply 2 × 4 first to get 1, but according to modern algebraic standards, division and multiplication have equal precedence and must be solved left-to-right.</li>
        </ul>

        <h3>Example 2: Nested Brackets and Mixed Operators</h3>
        <p>
          <strong>Expression:</strong> <code>15 + 3 × [12 − (4 + 2)]</code>
        </p>
        <ul>
          <li><strong>Step 1 (Innermost Parentheses):</strong> (4 + 2) = 6. Expression becomes: 15 + 3 × [12 − 6].</li>
          <li><strong>Step 2 (Outer Square Brackets):</strong> [12 − 6] = 6. Expression becomes: 15 + 3 × 6.</li>
          <li><strong>Step 3 (Multiplication over Addition):</strong> 3 × 6 = 18. Expression becomes: 15 + 18.</li>
          <li><strong>Step 4 (Addition):</strong> 15 + 18 = <strong>33</strong>.</li>
        </ul>

        <h3>Example 3: Exponents, Orders, and Division</h3>
        <p>
          <strong>Expression:</strong> <code>4² + 18 ÷ 3 × 2 − 5</code>
        </p>
        <ul>
          <li><strong>Step 1 (Orders / Powers):</strong> 4² = 16. Expression: 16 + 18 ÷ 3 × 2 − 5.</li>
          <li><strong>Step 2 (Division):</strong> 18 ÷ 3 = 6. Expression: 16 + 6 × 2 − 5.</li>
          <li><strong>Step 3 (Multiplication):</strong> 6 × 2 = 12. Expression: 16 + 12 − 5.</li>
          <li><strong>Step 4 (Addition &amp; Subtraction Left-to-Right):</strong> 16 + 12 = 28, then 28 − 5 = <strong>23</strong>.</li>
        </ul>

        <h3>Example 4: Everyday Financial Tally with Multiple Batches</h3>
        <p>
          <strong>Scenario:</strong> Purchasing 3 notebooks at ₹40 each and 5 pens at ₹15 each with a ₹25 flat discount coupon: (3 × 40) + (5 × 15) − 25.
        </p>
        <ul>
          <li><strong>Step 1:</strong> Evaluate brackets: 120 + 75 − 25.</li>
          <li><strong>Step 2:</strong> Left-to-right addition &amp; subtraction: 195 − 25 = <strong>₹170</strong>.</li>
        </ul>

        <h2>Who Can Use This Calculator?</h2>
        <p>
          The BODMAS Calculator is an essential resource across multiple user domains:
        </p>
        <ul>
          <li><strong>Primary &amp; Middle School Students:</strong> Learn and verify foundational order-of-operations homework exercises.</li>
          <li><strong>Competitive Exam Aspirants (UGC NET, SSC CGL, RRB NTPC, CSAT):</strong> Practice rapid quantitative aptitude and numerical simplification questions where operator traps are common.</li>
          <li><strong>Mathematics Teachers &amp; Tutors:</strong> Generate classroom demonstrations showing exact intermediate calculation milestones.</li>
          <li><strong>Computer Science &amp; Programming Learners:</strong> Understand compiler parsing logic, abstract syntax trees (ASTs), and operator precedence in languages like Python, C++, and JavaScript.</li>
          <li><strong>Parents Assisting with Homework:</strong> Instantly check children&rsquo;s math solutions with complete certainty.</li>
        </ul>

        <h2>Frequently Asked Questions (FAQs)</h2>

        <h3>1. What is the difference between BODMAS and PEMDAS?</h3>
        <p>
          BODMAS and PEMDAS are mathematically identical systems. BODMAS stands for Brackets, Orders, Division, Multiplication, Addition, Subtraction (used across India, UK, and Commonwealth). PEMDAS stands for Parentheses, Exponents, Multiplication, Division, Addition, Subtraction (used predominantly in the US). In both systems, division and multiplication share equal precedence, and addition and subtraction share equal precedence.
        </p>

        <h3>2. Why is multiplication not always performed before division?</h3>
        <p>
          Multiplication and division are inverse operations of identical mathematical rank. If an expression contains both without grouping brackets, they must be solved strictly in the order they appear from left to right.
        </p>

        <h3>3. What are &ldquo;Orders&rdquo; in BODMAS?</h3>
        <p>
          &ldquo;Orders&rdquo; refers to powers, exponents, indices, and roots (such as 3², 5³, √49, or cube roots). They are evaluated immediately after brackets are resolved.
        </p>

        <h3>4. How do nested brackets like <code>[ &#123; ( ) &#125; ]</code> work?</h3>
        <p>
          Always solve nested brackets from the <strong>innermost</strong> pair outwards. First evaluate parentheses <code>( )</code>, then curly braces <code>&#123; &#125;</code>, and finally square brackets <code>[ ]</code>.
        </p>

        <h3>5. What happens if I forget parentheses when writing an equation?</h3>
        <p>
          Omitting brackets changes how operators bind to numbers. For example, (5 + 3) × 2 = 16, but writing 5 + 3 × 2 equals 5 + 6 = 11. Brackets are essential whenever you want addition or subtraction to precede multiplication or division.
        </p>

        <h3>6. Can the BODMAS calculator handle negative numbers?</h3>
        <p>
          Yes. Unary negative signs (e.g., <code>-5 + (-3) * 4</code>) are correctly parsed according to mathematical sign multiplication rules: negative times positive yields negative, and negative times negative yields positive.
        </p>

        <h2>Related Computational &amp; Academic Calculators</h2>
        <p>
          Explore these additional calculation tools to support your educational and daily mathematical needs:
        </p>
        <ul>
          <li><a href="/average-calculator" className="text-amber-600 hover:underline font-medium">Average Calculator</a> &ndash; Calculate arithmetic mean, median, sum, and count of numerical datasets.</li>
          <li><a href="/percentage-calculator" className="text-amber-600 hover:underline font-medium">Percentage Calculator</a> &ndash; Compute percentage values, percentage changes, and fractions.</li>
          <li><a href="/marks-percentage-calculator" className="text-amber-600 hover:underline font-medium">Marks Percentage Calculator</a> &ndash; Calculate exam percentages and academic grade classifications.</li>
          <li><a href="/negative-marking-calculator" className="text-amber-600 hover:underline font-medium">Negative Marking Calculator</a> &ndash; Factor negative marking penalties into competitive exam scores.</li>
          <li><a href="/discount-calculator" className="text-amber-600 hover:underline font-medium">Discount Calculator</a> &ndash; Calculate promotional markdowns, flat discounts, and coupon savings.</li>
        </ul>
      </SEOContent>
    </div>
  );
}
