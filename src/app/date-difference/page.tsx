import type { Metadata } from "next";
import { DateDifferenceCalculator } from "@/components/calculators/DateDifferenceCalculator";
import { SEOContent } from "@/components/SEOContent";
import { CalendarRange } from "lucide-react";

export const metadata: Metadata = {
  title: "Date Difference Calculator - Days Between Two Dates | ToolZen",
  description: "Free online date difference calculator. Find out exactly how many days, weeks, months, or years exist between any two dates.",
};

export default function DateDifferencePage() {
  return (
    <div className="pb-20">
      <div className="flex flex-col items-center justify-center text-center mb-10 mt-6">
        <div className="p-4 bg-rose-50 rounded-full mb-4 border border-rose-100 shadow-sm">
          <CalendarRange className="w-8 h-8 text-rose-600" />
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-4">
          Date Difference Calculator
        </h1>
        <p className="text-slate-500 max-w-2xl text-lg">
          Calculate the exact number of days, weeks, months, and years between any two calendar dates.
        </p>
      </div>

      <div className="max-w-4xl mx-auto mb-16">
        <DateDifferenceCalculator />
      </div>

      <SEOContent>
        <h2>What is a Date Difference Calculator?</h2>
        <p>
          A <strong>Date Difference Calculator</strong> is a utility that allows you to calculate the exact duration between a start date and an end date. Instead of looking at a calendar and manually counting the days or weeks, this tool does it instantly and accurately.
        </p>
        
        <h3>Why is it useful?</h3>
        <ul>
          <li><strong>Project Management:</strong> Calculate how many days you have to complete a sprint or deliverable.</li>
          <li><strong>Event Planning:</strong> Figure out how many weeks are left until a wedding, graduation, or vacation.</li>
          <li><strong>Financial Calculations:</strong> Determine the exact number of days for calculating daily interest rates on loans or savings.</li>
          <li><strong>Personal Milestones:</strong> Find out exactly how many days you and your partner have been together!</li>
        </ul>

        <h3>How it Calculates the Difference</h3>
        <p>
          The tool works by converting both dates into Unix timestamps (which represent the total number of milliseconds that have passed since January 1, 1970). It then subtracts the smaller timestamp from the larger one, giving the absolute difference in milliseconds.
        </p>
        <p>From there, the math is simple:</p>
        <ul>
          <li><strong>Days:</strong> Divide the milliseconds by <code>(1000 * 60 * 60 * 24)</code>.</li>
          <li><strong>Weeks:</strong> Divide the total days by 7.</li>
          <li><strong>Months:</strong> Divide the total days by 30.44 (the average number of days in a month across a 4-year leap cycle).</li>
          <li><strong>Years:</strong> Divide the total days by 365.25.</li>
        </ul>

        <h3>Does order matter?</h3>
        <p>
          No. Whether you enter the past date first and the future date second, or vice versa, the tool will always calculate the absolute difference between them, ensuring you never get a negative number of days.
        </p>
      </SEOContent>
    </div>
  );
}
