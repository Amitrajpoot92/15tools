import type { Metadata } from "next";
import { NormalCalculator } from "@/components/calculators/NormalCalculator";
import { SEOContent } from "@/components/SEOContent";
import { Calculator } from "lucide-react";

export const metadata: Metadata = {
  title: "Normal Calculator – Free Online Basic & Scientific Calculator",
  description:
    "Free online normal calculator for daily math, basic calculations, and advanced scientific formulas. Supports addition, subtraction, multiplication, division, powers, trigonometry, and memory functions.",
};

export default function NormalCalculatorPage() {
  return (
    <div className="pb-8">
      {/* Schema Markup for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            "name": "Normal Calculator",
            "operatingSystem": "Any",
            "applicationCategory": "EducationalApplication",
            "offers": {
              "@type": "Offer",
              "price": "0",
              "priceCurrency": "USD",
            },
          }),
        }}
      />

      <div className="max-w-4xl mx-auto mb-10 bg-white rounded-3xl p-4 md:p-6 shadow-sm border border-slate-200 mt-2">
        {/* Compact Header */}
        <div className="flex flex-col items-center text-center bg-sky-50/80 rounded-2xl p-4 md:p-6 mb-6 border border-sky-200/80">
          <div className="inline-flex items-center space-x-2 text-sky-800 text-xs font-bold uppercase tracking-wider mb-2">
            <Calculator className="w-4 h-4 text-sky-600" />
            <span>Standard Math Tool</span>
          </div>
          <h1 className="text-xl md:text-2xl font-extrabold text-slate-900 tracking-tight mb-1">
            Normal Calculator
          </h1>
          <p className="text-slate-600 text-xs md:text-sm max-w-2xl font-medium leading-relaxed">
            Free online basic and scientific calculator for quick calculations, everyday math, and advanced functions.
          </p>
        </div>

        {/* Interactive Tool */}
        <div className="w-full">
          <NormalCalculator />
        </div>
      </div>

      <SEOContent>
        <h2>What is a Normal Calculator?</h2>
        <p>
          A <strong>Normal Calculator</strong> is a simple, intuitive, and reliable digital calculator designed for everyday math operations. Whether you are doing quick shopping calculations, balancing household expenses, solving school homework, or working with scientific equations, this tool provides instant and accurate results.
        </p>
        <p>
          Our Normal Calculator offers both <strong>Basic</strong> and <strong>Scientific</strong> modes, inspired by classic desktop and handheld digital calculators.
        </p>

        <h2>Key Features of the Normal Calculator</h2>
        <ul>
          <li><strong>Basic Mode:</strong> Quick access to addition (+), subtraction (−), multiplication (×), division (/), plus/minus (±), percentage (%), and square roots.</li>
          <li><strong>Scientific Mode:</strong> Advanced functions including Trigonometry (sin, cos, tan, arcsin, arccos, arctan), Logarithms (log, ln), Powers (xʸ, x²), Factorial (x!), and mathematical constants (π, e).</li>
          <li><strong>Degree / Radian Toggle:</strong> Switch between degrees (DEG) and radians (RAD) effortlessly for trigonometric functions.</li>
          <li><strong>Memory Functions (M+, M−, MR, MC):</strong> Store numbers in memory, add or subtract running totals, and recall them anytime.</li>
          <li><strong>Calculation History:</strong> Review your recent calculation history so you never lose track of past numbers.</li>
          <li><strong>Keyboard Support:</strong> Type naturally on your computer keyboard using number keys, +, −, *, /, Enter, and Backspace.</li>
        </ul>

        <h2>How to Use the Calculator Buttons</h2>
        <table>
          <thead>
            <tr>
              <th>Button</th>
              <th>Name</th>
              <th>Function</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>AC</strong></td>
              <td>All Clear</td>
              <td>Resets the current calculation display to zero.</td>
            </tr>
            <tr>
              <td><strong>Back</strong></td>
              <td>Backspace</td>
              <td>Deletes the last entered character or operator.</td>
            </tr>
            <tr>
              <td><strong>Ans</strong></td>
              <td>Last Answer</td>
              <td>Inserts the result from your previous calculation into the current formula.</td>
            </tr>
            <tr>
              <td><strong>M+</strong></td>
              <td>Memory Add</td>
              <td>Adds the current displayed number to the memory register.</td>
            </tr>
            <tr>
              <td><strong>M−</strong></td>
              <td>Memory Subtract</td>
              <td>Subtracts the current displayed number from the memory register.</td>
            </tr>
            <tr>
              <td><strong>MR</strong></td>
              <td>Memory Recall</td>
              <td>Recalls the value stored in memory to the display.</td>
            </tr>
            <tr>
              <td><strong>±</strong></td>
              <td>Plus / Minus</td>
              <td>Toggles the sign of the current number between positive and negative.</td>
            </tr>
            <tr>
              <td><strong>RND</strong></td>
              <td>Random Number</td>
              <td>Generates a random decimal value between 0 and 1.</td>
            </tr>
            <tr>
              <td><strong>EXP</strong></td>
              <td>Scientific Notation</td>
              <td>Inserts exponential notation (e.g. 2e+3 = 2000).</td>
            </tr>
          </tbody>
        </table>

        <h2>Who Can Use This Normal Calculator?</h2>
        <p>
          This calculator is built for students, teachers, office professionals, retail shopkeepers, accountants, and anyone who needs a clean, distraction-free, ad-friendly calculator that loads in milliseconds on any mobile phone or computer.
        </p>
      </SEOContent>
    </div>
  );
}
