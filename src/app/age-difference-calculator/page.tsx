import type { Metadata } from "next";
import { AgeDifferenceCalculator } from "@/components/calculators/AgeDifferenceCalculator";
import { SEOContent } from "@/components/SEOContent";
import { Clock } from "lucide-react";

export const metadata: Metadata = {
  title: "Age Difference Calculator - Compare Ages Instantly | TopCalcBox",
  description: "Free online age difference calculator. Compare the dates of birth of two individuals to find the exact age gap in years, months, and days.",
};

export default function AgeDifferencePage() {
  return (
    <div className="pb-8">

      {/* Schema Markup for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            "name": "Age Difference Calculator",
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
        <div className="flex flex-col items-center text-center bg-indigo-50 rounded-2xl p-4 md:p-6 mb-6 border border-indigo-200">
          <h1 className="text-xl md:text-2xl font-extrabold text-amber-900 tracking-tight mb-1">
            Age Difference Calculator
          </h1>
          <p className="text-indigo-800/70 text-xs md:text-sm max-w-2xl font-medium leading-relaxed">
            Easily calculate the exact age gap between two people in years, months, and days.
          </p>
        </div>

        {/* Interactive Tool */}
        <div className="w-full">
          <AgeDifferenceCalculator />
        </div>
      </div>

      <SEOContent>
        <h2>What is an Age Difference Calculator</h2>
        <p>An Age Difference Calculator is an online tool that helps you find the exact age gap between two people. Simply enter the Date of Birth (DOB) of both people, and the calculator compares the two dates to show who is older and the exact difference in years, months, and days.</p>
        <p>It also shows the total absolute gap in days, making it easy to understand the difference between two birth dates. For example, if Person 1 was born on 15 June 2004 and Person 2 was born on 1 October 2026, the age difference is 22 years, 3 months, and 16 days, with a total gap of 8,143 days.</p>
        <p>Whether you want to compare the age of siblings, friends, couples, family members, or any two people, this calculator makes the comparison quick and easy.</p>

        <h2>How to Use an Age Difference Calculator</h2>
        <p>Use the Age Difference Calculator to compare the exact age gap between two people.</p>
        <ol>
          <li><strong>Enter First Person’s DOB:</strong> Enter the first person’s date of birth in DD/MM/YYYY format.</li>
          <li><strong>Enter Second Person’s DOB:</strong> Enter the second person’s date of birth in the same format.</li>
          <li><strong>View the Comparison:</strong> The calculator shows who is older and the exact age difference in years, months, and days.</li>
          <li><strong>Check Total Gap:</strong> You can also see the total difference in days between both dates.</li>
          <li><strong>Copy or Reset:</strong> Copy the comparison summary or reset the calculator to compare another two dates.</li>
        </ol>

        <h2>How Age Difference is Calculated</h2>
        <p>The Age Difference Calculator compares the two dates of birth and calculates the exact gap between them.</p>
        <ol>
          <li><strong>Compare the Dates:</strong> The calculator identifies which date is earlier and which is later.</li>
          <li><strong>Calculate Full Years:</strong> It calculates the completed years between the two dates. If the later date has not reached the same month and day, one year is adjusted.</li>
          <li><strong>Calculate Remaining Months:</strong> After completed years, it calculates the remaining full months.</li>
          <li><strong>Calculate Remaining Days:</strong> Finally, it calculates the remaining days based on the actual length of each month, including leap years.</li>
        </ol>
        <p><strong>Example:</strong><br />15 June 2004 → 1 October 2026<br />Age Difference = 22 years, 3 months, 16 days<br />Total Difference = 8,143 days.</p>

        <h2>Who Can Use an Age Difference Calculator</h2>
        <p>An Age Difference Calculator is useful for anyone who wants to quickly understand the exact age gap between two people. It can be used for personal comparisons, family relationships, or simply out of curiosity.</p>
        <ul>
          <li><strong>Couples & Partners</strong> – Find the exact age difference between two partners in years, months, and days.</li>
          <li><strong>Parents & Children</strong> – Check the precise age gap between a parent and child.</li>
          <li><strong>Siblings</strong> – Calculate the exact difference between brothers and sisters.</li>
          <li><strong>Friends & Classmates</strong> – Compare the age difference between two friends or classmates.</li>
          <li><strong>Family Members</strong> – Compare the ages of grandparents, parents, children, or other relatives.</li>
          <li><strong>Students & Learners</strong> – Use it for age-related questions, assignments, or date calculations.</li>
          <li><strong>Everyday Users</strong> – Compare any two dates of birth and quickly see who is older and by exactly how much.</li>
        </ul>

        <h2>Frequently Asked Questions</h2>
        <h3>1. What is an Age Difference Calculator?</h3>
        <p>An Age Difference Calculator compares two dates of birth and shows the exact age gap between them in years, months, and days.</p>
        <h3>2. How is the age difference between two people calculated?</h3>
        <p>The calculator compares both dates of birth, identifies the earlier and later date, and calculates the exact calendar difference between them.</p>
        <h3>3. Can I find out who is older?</h3>
        <p>Yes. After entering both dates of birth, the calculator shows which person is older and the exact age gap.</p>
        <h3>4. Can I see the total age difference in days?</h3>
        <p>Yes. The calculator also shows the total absolute gap in days between the two dates.</p>
        <h3>5. What date format should I use?</h3>
        <p>Enter both dates in the DD/MM/YYYY format.<br />Example: 15/06/2004</p>
        <h3>6. Can I calculate the age difference between any two people?</h3>
        <p>Yes. You can enter the Date of Birth of any two people to find their exact age difference, whether they are family members, friends, partners, or others.</p>

        <h2>Related Calculators</h2>
        <p>If you are working with age, birthdays, or date calculations, these related calculators may also be useful:</p>
        <ul>
          <li><a href="/age-calculator-online" className="text-blue-600 hover:underline">Age Calculator Online</a> – Calculate your exact age in years, months, and days using your date of birth.</li>
          <li><a href="/date-difference-calculator" className="text-blue-600 hover:underline">Date Difference Calculator</a> – Find the exact difference between two dates, including total days, weeks, working days, and weekend days.</li>
          <li><a href="/birthday-countdown" className="text-blue-600 hover:underline">Birthday Countdown</a> – See exactly how much time is left until your next birthday in days, hours, minutes, and seconds.</li>
        </ul>
      </SEOContent>
    </div>
  );
}
