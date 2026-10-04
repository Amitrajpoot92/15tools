import type { Metadata } from "next";
import { AgeCalculator } from "@/components/calculators/AgeCalculator";
import { SEOContent } from "@/components/SEOContent";
import { CalendarDays } from "lucide-react";

export const metadata: Metadata = {
  title: "Age Calculator Online - Calculate Exact Age in Years, Months, Days | TopCalcBox",
  description: "Free online age calculator to find your exact age in years, months, and days from your date of birth to today.",
};

export default function AgeCalculatorPage() {
  return (
    <div className="pb-8">

      {/* Schema Markup for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            "name": "Age Calculator Online",
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
        {/* Compact Header */}
        <div className="flex flex-col items-center text-center bg-indigo-50/70 rounded-2xl p-4 md:p-6 mb-6 border border-indigo-200/80">
          <h1 className="text-xl md:text-2xl font-extrabold text-indigo-950 tracking-tight mb-1">
            Age Calculator Online
          </h1>
          <p className="text-indigo-900/75 text-xs md:text-sm max-w-2xl font-medium leading-relaxed">
            Find your exact age in years, months, and days based on your date of birth.
          </p>
        </div>

        {/* Interactive Tool */}
        <div className="w-full">
          <AgeCalculator />
        </div>
      </div>

      <SEOContent>
        <h2>What is an Age Calculator Online</h2>
        <p>An Age Calculator Online is a simple tool that helps you find your exact age from your date of birth. Enter your Date of Birth and select the date on which you want to calculate your age. The calculator then shows your age in years, months, and days.</p>
        <p>Along with your exact age, the calculator also provides useful information such as your day of birth, next birthday countdown, total months, and total days. This makes it useful for checking your current age as well as your age on a specific date.</p>
        <p>For example, if your Date of Birth is 19 June 2000 and the Age at Date is 28 September 2026, the result is 26 years, 3 months, and 9 days. It also shows that the birth day was Monday, the next birthday is 264 days away, with 315 total months and 9,597 total days.</p>
        <p>Whether you want to know your exact age, check age for a form or application, find your age on a specific date, or see your upcoming birthday, an online age calculator gives you all the details quickly and accurately.</p>
        
        <h2>How to Use an Age Calculator Online</h2>
        <p>Use the Age Calculator to find your exact age and other useful date details in just a few steps.</p>
        <ol>
          <li><strong>Enter Date of Birth:</strong> Enter your birth date in the DD/MM/YYYY format.</li>
          <li><strong>Select Age at Date:</strong> Choose the date on which you want to calculate your age.</li>
          <li><strong>View Your Age:</strong> The calculator instantly shows your age in years, months, and days.</li>
          <li><strong>Check Age Details:</strong> View your day of birth, next birthday, total months, and total days.</li>
          <li><strong>Copy or Reset:</strong> Copy the result or reset the calculator to calculate another age.</li>
        </ol>

        <h2>How Age is Calculated</h2>
        <p>An Age Calculator finds the exact difference between your Date of Birth and the selected calculation date.</p>
        <ol>
          <li><strong>Calculate Years:</strong> First, the birth year is subtracted from the calculation year. If your birthday has not occurred yet in that year, one year is subtracted.</li>
          <li><strong>Calculate Months:</strong> After completed years are calculated, the calculator finds the number of complete months since your last birthday.</li>
          <li><strong>Calculate Days:</strong> Finally, it calculates the remaining days. It considers the actual number of days in each month, including leap years and February's 29 days when applicable.</li>
        </ol>
        <p><strong>Example:</strong><br />19 June 2000 → 28 September 2026<br />Exact Age = 26 Years, 3 Months, 9 Days.</p>

        <h2>Who Can Use an Age Calculator</h2>
        <p>An Age Calculator is useful for anyone who needs to know their exact age, age on a specific date, or upcoming birthday.</p>
        <ul>
          <li><strong>Students</strong> – Check age for school, college admissions, scholarships, and application forms.</li>
          <li><strong>Job Applicants</strong> – Calculate exact age when filling out job applications or checking age requirements.</li>
          <li><strong>Exam Aspirants</strong> – Check age for competitive exams and age-limit requirements.</li>
          <li><strong>Parents</strong> – Find a child’s exact age for school admission, documents, or other requirements.</li>
          <li><strong>Professionals</strong> – Calculate age for official forms, registrations, and applications.</li>
          <li><strong>Everyday Users</strong> – Check exact age in years, months, and days, find the day of birth, or see the next birthday.</li>
          <li><strong>Birthday Planning</strong> – Find how many days are left until the next birthday or calculate age on a future date.</li>
        </ul>

        <h2>Frequently Asked Questions</h2>
        <h3>1. How can I calculate my exact age?</h3>
        <p>Enter your Date of Birth and select the date you want to calculate your age on. The calculator will show your exact age in years, months, and days.</p>
        
        <h3>2. Can I calculate my age on any date?</h3>
        <p>Yes. You can select a past, present, or future date to find your exact age on that particular date.</p>

        <h3>3. How many days until my next birthday?</h3>
        <p>After entering your Date of Birth, the calculator shows your next birthday and the number of days remaining until it.</p>

        <h3>4. Is an online Age Calculator useful for forms and applications?</h3>
        <p>Yes. It can help you quickly check your exact age when filling out school, college, job, exam, or other application forms.</p>

        <h3>5. Does the calculator consider leap years?</h3>
        <p>Yes. The calculation takes leap years and the different number of days in each month into account.</p>

        <h3>6. What format should I use for entering dates?</h3>
        <p>Enter the date in the DD/MM/YYYY format.</p>
        <p><strong>Example:</strong><br />Date of Birth: 19/06/2000<br />Age at Date: 28/09/2026</p>

        <h2>Related Calculators</h2>
        <p>If you are working with age, dates, or birthdays, these related calculators can also be useful:</p>
        <ul>
          <li><a href="/birthday-countdown" className="text-blue-600 hover:underline">Birthday Countdown</a> – Find out exactly how many days are left until your next birthday.</li>
          <li><a href="/age-difference-calculator" className="text-blue-600 hover:underline">Age Difference Calculator</a> – Compare two dates of birth and find the exact age difference in years, months, and days.</li>
          <li><a href="/date-difference-calculator" className="text-blue-600 hover:underline">Date Difference Calculator</a> – Calculate the difference between two dates, including total days, weeks, working days, and weekend days.</li>
        </ul>
      </SEOContent>
    </div>
  );
}
