import type { Metadata } from "next";
import { DateDifferenceCalculator } from "@/components/calculators/DateDifferenceCalculator";
import { SEOContent } from "@/components/SEOContent";
import { CalendarRange } from "lucide-react";

export const metadata: Metadata = {
  title: "Date Difference Calculator - Days Between Two Dates | TopCalcBox",
  description: "Free online date difference calculator. Find out exactly how many days, weeks, months, or years exist between any two dates.",
};

export default function DateDifferencePage() {
  return (
    <div className="pb-8">

      {/* Schema Markup for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            "name": "Date Difference Calculator",
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
          <h1 className="text-xl md:text-2xl font-extrabold text-rose-900 tracking-tight mb-1">
            Date Difference Calculator
          </h1>
          <p className="text-indigo-800/70 text-xs md:text-sm max-w-2xl font-medium leading-relaxed">
            Calculate the exact number of days, weeks, months, and years between any two calendar dates.
          </p>
        </div>

        {/* Interactive Tool */}
        <div className="w-full">
          <DateDifferenceCalculator />
        </div>
      </div>

      <SEOContent>
        <h2>What is a Date Difference Calculator</h2>
        <p>A Date Difference Calculator is an online tool that helps you find the exact difference between two calendar dates. Enter a Start Date and an End Date, and the calculator shows the total time between them in days and weeks.</p>
        <p>It also provides a useful breakdown of working days (Monday–Friday) and weekend days (Saturday–Sunday). This makes it helpful for calculating project durations, work periods, deadlines, leave periods, event planning, and other date-based tasks.</p>
        <p>For example, from 15 June 2004 to 1 October 2026, the difference is 8,143 days, which equals 1,163 weeks and 2 days. The same period contains 5,817 working days and 2,326 weekend days.</p>

        <h2>How to Use a Date Difference Calculator</h2>
        <p>Use the Date Difference Calculator to quickly find the exact duration between two dates.</p>
        <ol>
          <li><strong>Enter Start Date:</strong> Enter the beginning date in DD/MM/YYYY format.</li>
          <li><strong>Enter End Date:</strong> Enter the date up to which you want to calculate the duration.</li>
          <li><strong>View Total Days:</strong> The calculator instantly shows the total number of days between the two dates.</li>
          <li><strong>Check Weeks:</strong> See the duration in weeks and remaining days for easier understanding.</li>
          <li><strong>Check Working & Weekend Days:</strong> View the number of working days (Monday–Friday) and weekend days (Saturday–Sunday) separately.</li>
          <li><strong>Copy or Reset:</strong> Copy the complete result or reset the calculator to enter another set of dates.</li>
        </ol>
        <p>This makes it easy to calculate the duration between dates for work, projects, deadlines, leave periods, events, or personal planning.</p>

        <h2>Calculation Formula</h2>
        <p>A Date Difference Calculator finds the duration between the Start Date and End Date.</p>
        <ul>
          <li><strong>Total Days</strong> = End Date − Start Date</li>
          <li><strong>Total Weeks</strong> = Total Days ÷ 7</li>
          <li><strong>Working Days</strong> = Monday–Friday days between the dates</li>
          <li><strong>Weekend Days</strong> = Saturday + Sunday days between the dates</li>
        </ul>
        <p><strong>Example:</strong><br />15 June 2004 → 1 October 2026<br />Total Days = 8,143<br />Weeks = 1,163 weeks and 2 days<br />Working Days = 5,817<br />Weekend Days = 2,326</p>
        <p>Working Days + Weekend Days = Total Days<br />5,817 + 2,326 = 8,143 days</p>

        <h2>Who Can Use a Date Difference Calculator</h2>
        <p>A Date Difference Calculator is useful for anyone who needs to find the exact duration between two dates. It can help with work, studies, planning, deadlines, events, and everyday date calculations.</p>
        <ul>
          <li><strong>Students</strong> – Calculate the number of days between exams, semesters, assignments, holidays, or important dates.</li>
          <li><strong>Employees & Professionals</strong> – Find the duration of work periods, leave days, project timelines, and deadlines.</li>
          <li><strong>Project Managers</strong> – Calculate how many days a project has taken or how much time is available between two important dates.</li>
          <li><strong>Business Owners</strong> – Track business periods, contracts, payment dates, delivery schedules, and other time-based activities.</li>
          <li><strong>HR & Office Teams</strong> – Calculate working days between dates for leave, attendance, joining periods, and work schedules.</li>
          <li><strong>Event Planners</strong> – Find the number of days remaining or the duration between important event dates.</li>
          <li><strong>Travelers</strong> – Calculate trip duration and the number of days between departure and return dates.</li>
          <li><strong>Researchers & Historians</strong> – Find the exact number of days or weeks between historical dates and events.</li>
          <li><strong>Anyone Planning Dates</strong> – Calculate the duration between two dates for personal plans, deadlines, appointments, or important milestones.</li>
        </ul>

        <h2>Frequently Asked Questions</h2>
        <h3>1. What is a Date Difference Calculator?</h3>
        <p>A Date Difference Calculator finds the exact duration between two dates and shows the result in days, weeks, working days, and weekend days.</p>
        <h3>2. How do I calculate the number of days between two dates?</h3>
        <p>Enter the Start Date and End Date, and the calculator automatically shows the total number of days between them.</p>
        <h3>3. Can I calculate the difference between past and future dates?</h3>
        <p>Yes. You can enter dates from the past, present, or future to calculate the duration between them.</p>
        <h3>4. Does the Date Difference Calculator include leap years?</h3>
        <p>Yes. Leap years are taken into account when calculating the number of days between two dates.</p>
        <h3>5. What date format should I use?</h3>
        <p>Enter both dates in the DD/MM/YYYY format.<br />Example: 15/06/2004</p>

        <h2>Related Calculators</h2>
        <p>If you are working with dates, age, or birthdays, these related calculators can also help:</p>
        <ul>
          <li><a href="/age-difference-calculator" className="text-blue-600 hover:underline">Age Difference Calculator</a> – Compare two dates of birth to find the exact age gap between two people in years, months, and days.</li>
          <li><a href="/age-calculator-online" className="text-blue-600 hover:underline">Age Calculator Online</a> – Enter your date of birth to calculate your exact age in years, months, and days, along with other age details.</li>
          <li><a href="/birthday-countdown" className="text-blue-600 hover:underline">Birthday Countdown</a> – Track the time remaining until your next birthday in days, hours, minutes, and seconds.</li>
        </ul>
      </SEOContent>
    </div>
  );
}
