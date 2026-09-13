import type { Metadata } from "next";
import { BirthdayCountdown } from "@/components/calculators/BirthdayCountdown";
import { SEOContent } from "@/components/SEOContent";
import { Timer } from "lucide-react";

export const metadata: Metadata = {
  title: "Birthday Countdown - How many days until my birthday? | ToolZen",
  description: "Free online birthday countdown timer. Find out exactly how many days, hours, minutes, and seconds are left until your next birthday.",
};

export default function BirthdayCountdownPage() {
  return (
    <div className="pb-20">
      <div className="flex flex-col items-center justify-center text-center mb-10 mt-6">
        <div className="p-4 bg-orange-50 rounded-full mb-4 border border-orange-100 shadow-sm">
          <Timer className="w-8 h-8 text-orange-600" />
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-4">
          Birthday Countdown
        </h1>
        <p className="text-slate-500 max-w-2xl text-lg">
          Excited for your special day? Start a live countdown to see exactly how much time is left.
        </p>
      </div>

      <div className="max-w-4xl mx-auto mb-16">
        <BirthdayCountdown />
      </div>

      <SEOContent>
        <h2>What is a Birthday Countdown?</h2>
        <p>
          A <strong>Birthday Countdown</strong> is a fun, interactive timer that shows you exactly how much time remains until your next birthday. It breaks down the wait into days, hours, minutes, and even seconds, updating live on your screen.
        </p>
        
        <h3>Why use a countdown timer?</h3>
        <ul>
          <li><strong>Build Excitement:</strong> Watching the seconds tick down is a great way to build anticipation for a party or celebration.</li>
          <li><strong>Party Planning:</strong> If you are planning a surprise party for a friend or family member, knowing exactly how many days you have left is crucial for booking venues, sending invites, and ordering cake.</li>
          <li><strong>Goal Setting:</strong> Many people use their birthday as a milestone to achieve personal goals (like "lose 10 lbs before I turn 30"). A countdown helps keep you motivated.</li>
        </ul>

        <h3>How does our timer work?</h3>
        <p>
          Our countdown timer takes the date you provide and compares it to the current time on your device. If your birthday has already passed this year, the timer automatically sets its sights on your birthday <em>next year</em>. The math is simple but effective:
        </p>
        <ul>
          <li>1 Day = 24 Hours</li>
          <li>1 Hour = 60 Minutes</li>
          <li>1 Minute = 60 Seconds</li>
        </ul>

        <h3>Celebrate Every Second!</h3>
        <p>
          Birthdays only come once a year! Use our live countdown to savor the anticipation and get ready for your big day.
        </p>
      </SEOContent>
    </div>
  );
}
