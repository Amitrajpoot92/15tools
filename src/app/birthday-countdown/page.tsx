import type { Metadata } from "next";
import { BirthdayCountdown } from "@/components/calculators/BirthdayCountdown";
import { SEOContent } from "@/components/SEOContent";
import { Timer } from "lucide-react";

export const metadata: Metadata = {
  title: "Birthday Countdown - How many days until my birthday? | TopCalcBox",
  description: "Free online birthday countdown timer. Find out exactly how many days, hours, minutes, and seconds are left until your next birthday.",
};

export default function BirthdayCountdownPage() {
  return (
    <div className="pb-8">

      {/* Schema Markup for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            "name": "Birthday Countdown",
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
          <h1 className="text-xl md:text-2xl font-extrabold text-indigo-950 tracking-tight mb-1">
            Birthday Countdown
          </h1>
          <p className="text-indigo-800/70 text-xs md:text-sm max-w-2xl font-medium leading-relaxed">
            Excited for your special day? Start a live countdown to see exactly how much time is left.
          </p>
        </div>

        {/* Interactive Tool */}
        <div className="w-full">
          <BirthdayCountdown />
        </div>
      </div>

      <SEOContent>
        <h2>What is a Birthday Countdown</h2>
        <p>A Birthday Countdown is an online tool that shows exactly how much time is left until your next birthday. Simply enter your name (optional) and date of birth, and the countdown automatically displays the remaining days, hours, minutes, and seconds.</p>
        <p>If your birthday is today, it also shows a birthday celebration message. Otherwise, it shows your next birthday milestone, such as the age you will turn, along with the live countdown.</p>
        <p>For example, if your Date of Birth is 01 January 2000, the calculator can show that your next birthday is when you turn 27 years old, with the remaining time displayed in days, hours, minutes, and seconds.</p>
        
        <h2>How to Use a Birthday Countdown</h2>
        <p>Use the Birthday Countdown to see exactly how much time is left until your next birthday.</p>
        <ol>
          <li><strong>Enter Your Name:</strong> Add your name if you want it to appear in the birthday result. This is optional.</li>
          <li><strong>Enter Date of Birth:</strong> Enter your birth date in DD/MM/YYYY format.</li>
          <li><strong>Start Countdown:</strong> The calculator automatically calculates your next birthday.</li>
          <li><strong>View Time Left:</strong> See the remaining days, hours, minutes, and seconds.</li>
          <li><strong>Check Birthday Message:</strong> If today is your birthday, the calculator shows a special celebration message.</li>
          <li><strong>Share or Reset:</strong> Share your birthday countdown or reset it to enter another date.</li>
        </ol>

        <h2>Birthday Calculation Formula</h2>
        <p>A Birthday Countdown calculates the time between now and your next birthday.</p>
        <blockquote>Time Remaining = Next Birthday Date & Time − Current Date & Time</blockquote>
        <p>The remaining time is then converted into days, hours, minutes, and seconds.</p>
        <p><strong>Example:</strong><br />If your next birthday is 01 January 2027, the calculator continuously updates the countdown until that date and time.</p>

        <h2>Who Can Use a Birthday Countdown</h2>
        <p>A Birthday Countdown is useful for anyone who wants to track an upcoming birthday and know exactly how much time is left.</p>
        <ul>
          <li><strong>Birthday Celebrants</strong> – Track the countdown to your own birthday in days, hours, minutes, and seconds.</li>
          <li><strong>Friends & Family</strong> – Keep track of a loved one’s birthday and plan wishes, gifts, or surprises.</li>
          <li><strong>Parents</strong> – Count down to a child’s birthday and prepare for the celebration in advance.</li>
          <li><strong>Couples</strong> – Keep track of each other’s birthdays and plan a special day together.</li>
          <li><strong>Students & Friends</strong> – Share a birthday countdown and keep track of upcoming birthdays in your group.</li>
          <li><strong>Party Planners</strong> – Use the countdown to plan decorations, invitations, food, and other arrangements.</li>
          <li><strong>Anyone Planning a Celebration</strong> – Know exactly how much time is left and share the countdown with others.</li>
        </ul>

        <h2>Frequently Asked Questions</h2>
        <h3>1. What is a Birthday Countdown?</h3>
        <p>A Birthday Countdown is an online tool that shows how much time is left until your next birthday in days, hours, minutes, and seconds.</p>
        <h3>2. What happens if today is my birthday?</h3>
        <p>If today is your birthday, the calculator displays a birthday celebration message instead of a countdown to the same day.</p>
        <h3>3. What date format should I use?</h3>
        <p>Enter your Date of Birth in the DD/MM/YYYY format.<br />Example: 19/06/2000</p>
        <h3>4. What time zone does the countdown use?</h3>
        <p>The Birthday Countdown uses your device’s local time zone to calculate the remaining time until your next birthday. This keeps the countdown accurate for your current location.</p>
        <h3>5. Can I share my Birthday Countdown?</h3>
        <p>Yes. You can share your countdown with friends, family, or others and let them know how much time is left until the birthday.</p>

        <h2>Related Calculators</h2>
        <p>If you are working with birthdays, age, or calendar dates, these related calculators can also help:</p>
        <ul>
          <li><a href="/age-calculator-online" className="text-blue-600 hover:underline">Age Calculator Online</a> – Calculate your exact age in years, months, and days using your date of birth.</li>
          <li><a href="/age-difference-calculator" className="text-blue-600 hover:underline">Age Difference Calculator</a> – Compare two dates of birth to find the exact age difference in years, months, and days.</li>
          <li><a href="/date-difference-calculator" className="text-blue-600 hover:underline">Date Difference Calculator</a> – Calculate the exact difference between two dates, including days, weeks, working days, and weekend days.</li>
        </ul>
      </SEOContent>
    </div>
  );
}
