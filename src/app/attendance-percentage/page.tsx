import type { Metadata } from "next";
import { AttendanceCalculator } from "@/components/calculators/AttendanceCalculator";
import { SEOContent } from "@/components/SEOContent";
import { ClipboardCheck } from "lucide-react";

export const metadata: Metadata = {
  title: "Attendance Percentage Calculator - Check Bunking Status | ToolZen",
  description: "Free online attendance percentage calculator. Find out your current attendance and exactly how many classes you can bunk or need to attend.",
};

export default function AttendancePage() {
  return (
    <div className="pb-20">
      <div className="flex flex-col items-center justify-center text-center mb-10 mt-6">
        <div className="p-4 bg-orange-50 rounded-full mb-4 border border-orange-100 shadow-sm">
          <ClipboardCheck className="w-8 h-8 text-orange-600" />
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-4">
          Attendance Calculator
        </h1>
        <p className="text-slate-500 max-w-2xl text-lg">
          Calculate your current attendance percentage and see how many classes you need to attend or can afford to skip.
        </p>
      </div>

      <div className="max-w-4xl mx-auto mb-16">
        <AttendanceCalculator />
      </div>

      <SEOContent>
        <h2>What is an Attendance Calculator?</h2>
        <p>
          An <strong>Attendance Calculator</strong> is a life-saving tool for high school and college students who need to maintain a strict minimum attendance requirement (usually 75% or 80%) to be eligible for final exams. It helps you mathematically plan your schedule and decide if you can afford to skip ("bunk") a class.
        </p>
        
        <h3>How to use this tool</h3>
        <ul>
          <li><strong>Classes Held (Total):</strong> The total number of classes that have taken place so far in the semester.</li>
          <li><strong>Classes Attended:</strong> The number of classes you were actually present for.</li>
          <li><strong>Target Attendance:</strong> The minimum percentage required by your school or college (e.g., 75%).</li>
        </ul>

        <h3>How does it calculate if you can bunk?</h3>
        <p>
          If your current attendance is exactly at or above your target (say 80%, with a target of 75%), the calculator runs a simulation. It adds future classes where you are marked "absent" and checks when your total percentage drops below 75%. The number of classes it takes to drop below the threshold is the number of classes you can safely skip!
        </p>
        <p>
          Conversely, if your attendance is critically low (e.g., 60%), it calculates exactly how many consecutive future classes you must attend without missing a single one in order to drag your average back up to 75%.
        </p>

        <h3>Why do students use this?</h3>
        <p>
          Managing academic life, extracurriculars, and personal health can be difficult. Sometimes missing a class is unavoidable. This tool gives you the exact numbers you need so you don't have to guess or risk failing a course due to low attendance.
        </p>
      </SEOContent>
    </div>
  );
}
