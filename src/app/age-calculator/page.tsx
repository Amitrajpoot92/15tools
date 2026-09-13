import type { Metadata } from "next";
import { AgeCalculator } from "@/components/calculators/AgeCalculator";
import { SEOContent } from "@/components/SEOContent";
import { CalendarDays } from "lucide-react";

export const metadata: Metadata = {
  title: "Age Calculator Online - Calculate Exact Age in Years, Months, Days | ToolZen",
  description: "Free online age calculator to find your exact age in years, months, and days from your date of birth to today.",
};

export default function AgeCalculatorPage() {
  return (
    <div className="pb-20">
      <div className="flex flex-col items-center justify-center text-center mb-10 mt-6">
        <div className="p-4 bg-rose-50 rounded-full mb-4 border border-rose-100 shadow-sm">
          <CalendarDays className="w-8 h-8 text-rose-600" />
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-4">
          Age Calculator
        </h1>
        <p className="text-slate-500 max-w-2xl text-lg">
          Find your exact age in years, months, and days based on your date of birth.
        </p>
      </div>

      <div className="max-w-4xl mx-auto mb-16">
        <AgeCalculator />
      </div>

      <SEOContent>
        <h2>What is an Age Calculator?</h2>
        <p>
          An <strong>Age Calculator</strong> is a tool that determines the exact time span between two dates. Most commonly, it is used to calculate a person's age from their date of birth up to the current date. It breaks down the duration into easily understandable units: Years, Months, and Days.
        </p>
        
        <h3>How does it work?</h3>
        <p>Our age calculator uses a standard calendar approach:</p>
        <ul>
          <li>It subtracts your birth year from the current year to get your base age.</li>
          <li>It adjusts the years based on whether your birthday has occurred yet this year by comparing months and days.</li>
          <li>Finally, it computes the exact remaining months and days, accounting for leap years and the varying number of days in each month.</li>
        </ul>

        <h3>Common Uses for Age Calculation</h3>
        <p>While checking your own age is fun, this tool has many practical applications:</p>
        <ul>
          <li><strong>Form Applications:</strong> Filling out official documents that require your exact age in years and months.</li>
          <li><strong>Medical Records:</strong> Doctors often need exact age for developmental milestones in children or for age-specific treatments.</li>
          <li><strong>Historical Dates:</strong> Figuring out how long ago a specific historical event happened.</li>
          <li><strong>Pet Ages:</strong> Calculating exactly how old your dog, cat, or other pet is.</li>
        </ul>

        <h3>Privacy First</h3>
        <p>
          We care about your privacy. The dates you enter into this calculator are processed entirely in your web browser. We do not store, save, or transmit your date of birth to any external servers.
        </p>
      </SEOContent>
    </div>
  );
}
