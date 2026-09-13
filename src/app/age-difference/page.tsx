import type { Metadata } from "next";
import { AgeDifferenceCalculator } from "@/components/calculators/AgeDifferenceCalculator";
import { SEOContent } from "@/components/SEOContent";
import { Clock } from "lucide-react";

export const metadata: Metadata = {
  title: "Age Difference Calculator - Compare Ages Instantly | ToolZen",
  description: "Free online age difference calculator. Compare the dates of birth of two individuals to find the exact age gap in years, months, and days.",
};

export default function AgeDifferencePage() {
  return (
    <div className="pb-20">
      <div className="flex flex-col items-center justify-center text-center mb-10 mt-6">
        <div className="p-4 bg-amber-50 rounded-full mb-4 border border-amber-100 shadow-sm">
          <Clock className="w-8 h-8 text-amber-600" />
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-4">
          Age Difference Calculator
        </h1>
        <p className="text-slate-500 max-w-2xl text-lg">
          Easily calculate the exact age gap between two people in years, months, and days.
        </p>
      </div>

      <div className="max-w-4xl mx-auto mb-16">
        <AgeDifferenceCalculator />
      </div>

      <SEOContent>
        <h2>What is an Age Difference Calculator?</h2>
        <p>
          An <strong>Age Difference Calculator</strong> is a specialized tool designed to tell you exactly how much older one person is compared to another. Instead of manually counting years and figuring out leap years and months, you simply enter two dates of birth, and the tool does the math instantly.
        </p>
        
        <h3>Why Calculate Age Differences?</h3>
        <ul>
          <li><strong>Relationships:</strong> Couples often want to know their exact age gap down to the day.</li>
          <li><strong>Family Planning & Siblings:</strong> Parents use it to track the exact age difference between their children.</li>
          <li><strong>Genealogy & History:</strong> Comparing the lifespans or overlapping eras of historical figures or ancestors.</li>
          <li><strong>Just for Fun:</strong> Finding out exactly how much older you are than your favorite celebrity or younger sibling!</li>
        </ul>

        <h3>How is the gap calculated?</h3>
        <p>
          Calculating age difference isn't as simple as subtracting two years. Because months have different lengths and leap years happen every four years, manually counting days can lead to errors. Our algorithm compares the two dates, calculates the full years between them, then adds the remaining full months, and finally the exact number of days remaining.
        </p>

        <h3>Does the order of dates matter?</h3>
        <p>
          No! Our calculator is smart enough to figure out which date is older (the person born first) and which is younger. You can enter the dates in any order, and we will still output the correct positive age difference.
        </p>
      </SEOContent>
    </div>
  );
}
