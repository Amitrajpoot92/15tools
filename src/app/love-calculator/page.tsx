import type { Metadata } from "next";
import { LoveCalculator } from "@/components/calculators/LoveCalculator";
import { SEOContent } from "@/components/SEOContent";
import { Heart } from "lucide-react";

export const metadata: Metadata = {
  title: "Love Calculator",
  description: "Enter two names and get a fun love compatibility percentage. Try our free online love calculator for an entertaining result.",
};

export default function LoveCalculatorPage() {
  return (
    <div className="pb-8">
      {/* Schema Markup for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            "name": "Love Calculator",
            "operatingSystem": "Any",
            "applicationCategory": "EntertainmentApplication",
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
        <div className="flex flex-col items-center text-center bg-blue-100 rounded-2xl p-4 md:p-6 mb-6 border border-blue-300">
          <h1 className="text-xl md:text-2xl font-extrabold text-rose-900 tracking-tight mb-2">
            Love Calculator
          </h1>
          <p className="text-slate-900 text-xs md:text-sm max-w-2xl font-medium leading-relaxed">
            Find out the true compatibility percentage between you and your crush playfully and instantly.
          </p>
        </div>

        {/* Interactive Tool */}
        <div className="w-full">
          <LoveCalculator />
        </div>
      </div>

      <SEOContent>
        <h2>What is a Love Calculator</h2>
        <p>A Love Calculator is a fun online tool that gives a playful love compatibility percentage between two names. Enter your full name and your crush or partner's name, then click Calculate Love % to get a percentage, star rating, and a fun compatibility message.</p>
        <p>It is designed for entertainment and sharing, whether you want to check your name compatibility with a crush, partner, friend, or someone special. The result is generated for fun and should not be considered a scientific or real measure of relationship compatibility.</p>

        <h2>How to Use the Love Calculator</h2>
        <p>The Love Calculator is simple to use. Enter two names and get a fun compatibility result instantly.</p>
        <ol>
          <li><strong>Enter Your Full Name</strong> – Type your name in the first field.</li>
          <li><strong>Enter Crush or Partner's Name</strong> – Add the name of your crush or partner.</li>
          <li><strong>Calculate Love %</strong> – Click the Calculate Love % button.</li>
          <li><strong>View Your Result</strong> – The calculator shows a love compatibility percentage, star rating, and a fun message.</li>
          <li><strong>Copy or Reset</strong> – Copy the result or reset the calculator to try another name combination.</li>
        </ol>

        <h2>How Does the Love Calculator Work</h2>
        <p>The Love Calculator works by taking the two names entered by the user and processing them through its built-in name-based algorithm. It then generates a playful love compatibility percentage, star rating, and a matching compatibility message.</p>
        <p>The result is created for fun and entertainment and is not based on scientific research or a proven method of measuring relationship compatibility. Different name combinations can produce different results.</p>

        <h2>Who Can Use a Love Calculator</h2>
        <p>A Love Calculator is a fun tool for anyone who wants to check playful name compatibility with someone special.</p>
        <ul>
          <li><strong>Couples</strong> – Try a fun compatibility check with your partner.</li>
          <li><strong>Crushes</strong> – Enter your name and your crush's name for a playful result.</li>
          <li><strong>Friends</strong> – Compare names and see what compatibility percentage you get.</li>
          <li><strong>Dating Partners</strong> – Use it as a light-hearted activity while getting to know each other.</li>
          <li><strong>Teenagers & Young Adults</strong> – Enjoy a simple and entertaining name compatibility game.</li>
          <li><strong>Couples Planning a Date</strong> – Use it as a fun conversation starter.</li>
          <li><strong>Friends & Groups</strong> – Try different name combinations for entertainment.</li>
          <li><strong>Anyone Curious</strong> – Check the compatibility result just for fun.</li>
        </ul>
        <p>Note: The result is for entertainment only and does not indicate actual relationship compatibility.</p>

        <h2>Frequently Asked Questions</h2>
        <h3>1. What is a Love Calculator?</h3>
        <p>A Love Calculator is a fun online tool that generates a playful love compatibility percentage based on two names.</p>
        <h3>2. Is the Love Calculator scientifically accurate?</h3>
        <p>No. The result is meant for fun and entertainment and is not a scientific measurement of love or relationship compatibility.</p>
        <h3>3. Does the Love Calculator need a date of birth?</h3>
        <p>No. The calculator uses the names entered by the user and does not require a date of birth.</p>
        <h3>4. What does the Love Compatibility percentage mean?</h3>
        <p>The percentage is a fun compatibility score generated by the calculator. It should not be interpreted as a real measurement of a relationship.</p>
        <h3>5. What does the star rating mean?</h3>
        <p>The star rating is a fun visual representation of the compatibility result generated by the calculator.</p>
        <h3>6. Can I share my Love Calculator result?</h3>
        <p>Yes, you can share the result with your friends, partner, or crush for entertainment.</p>

        <h2>Related Calculators</h2>
        <ul>
          <li><a href="/percentage-calculator" className="text-blue-600 hover:underline">Percentage Calculator</a></li>
          <li><a href="/discount-calculator" className="text-blue-600 hover:underline">Discount Calculator</a></li>
          <li><a href="/sip-calculator" className="text-blue-600 hover:underline">SIP Calculator</a></li>
          <li><a href="/bodmas-calculator" className="text-blue-600 hover:underline">BODMAS Calculator</a></li>
          <li><a href="/age-calculator-online" className="text-blue-600 hover:underline">Age Calculator Online</a></li>
          <li><a href="/age-difference-calculator" className="text-blue-600 hover:underline">Age Difference Calculator</a></li>
          <li><a href="/tip-calculator" className="text-blue-600 hover:underline">Tip Calculator</a></li>
          <li><a href="/bmi-calculator" className="text-blue-600 hover:underline">BMI Calculator</a></li>
        </ul>
      </SEOContent>
    </div>
  );
}
