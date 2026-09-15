import type { Metadata } from "next";
import { AttendanceCalculator } from "@/components/calculators/AttendanceCalculator";
import { SEOContent } from "@/components/SEOContent";
import { ClipboardCheck } from "lucide-react";

export const metadata: Metadata = {
  title: "Attendance Percentage Calculator - Check Bunking Status | TopCalcBox",
  description: "Free online attendance percentage calculator. Find out your current attendance and exactly how many classes you can bunk or need to attend.",
};

export default function AttendancePage() {
  return (
    <div className="pb-8">

      {/* Schema Markup for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            "name": "Attendance Percentage Calculator",
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
    
      <div className="flex flex-col items-center justify-center text-center mb-10 mt-6">
        <div className="p-4 bg-orange-50 rounded-full mb-4 border border-orange-100 shadow-sm">
          <ClipboardCheck className="w-8 h-8 text-orange-600" />
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-4">
          Attendance Percentage Calculator
        </h1>
        <p className="text-slate-500 max-w-2xl text-lg">
          Calculate your current attendance percentage and see how many classes you need to attend or can afford to skip.
        </p>
      </div>

      <div className="max-w-4xl mx-auto mb-16">
        <AttendanceCalculator />
      </div>

      {/* SEO Content Section */}
      <SEOContent>
        <h2>What is an Attendance Percentage Calculator?</h2>
        <p>
          An <strong>Attendance Percentage Calculator</strong> is a highly specialized, stress-relieving academic tool built specifically for high school and college students. In most modern educational institutions, maintaining a minimum attendance threshold—most commonly 75%, 80%, or 85%—is a strict requirement to be eligible to sit for final semester exams. Failing to meet this threshold often results in academic penalties or failing the course entirely.
        </p>
        <p>
          The <strong>TopCalcBox Attendance Calculator</strong> is designed to help students mathematically manage their busy schedules. Balancing academics, part-time jobs, extracurricular activities, and personal health is difficult. Sometimes, skipping (or "bunking") a class is necessary for your mental well-being or to study for a harder subject. Our tool removes the guesswork by telling you exactly what your current percentage is, precisely how many classes you can afford to safely skip, or exactly how many consecutive classes you must attend to pull yourself out of the danger zone.
        </p>
        
        <h2>How to Use the Attendance Calculator</h2>
        <p>
          We have designed the interface to be fast, clear, and perfectly tailored for a student on the go. You only need three basic numbers to get a comprehensive breakdown of your academic standing:
        </p>
        <ul>
          <li><strong>Step 1: Enter Total Classes Held.</strong> Type the number of classes, lectures, or labs that have taken place since the beginning of the semester into the first input field.</li>
          <li><strong>Step 2: Enter Classes Attended.</strong> Type the number of classes where you were actually present. Ensure this number is lower than or equal to the total classes held.</li>
          <li><strong>Step 3: Set Your Target Percentage.</strong> Adjust the slider or type in the minimum attendance requirement mandated by your school (e.g., 75%).</li>
          <li><strong>Step 4: Analyze Your Status.</strong> The calculator will instantly display your current percentage. More importantly, it will present a color-coded message indicating either how many upcoming classes you can safely skip (green) or how many upcoming classes you must attend in a row to reach your target (red).</li>
        </ul>

        <h2>Calculation Formula: How the "Bunking" Logic Works</h2>
        <p>
          Calculating your current percentage is simple arithmetic. However, calculating future projections requires a programmatic simulation. Here is the mathematical logic our calculator uses to give you perfect advice:
        </p>
        
        <h3>1. Calculating Current Percentage</h3>
        <blockquote>
          <strong>Current %</strong> = (Classes Attended / Classes Held) × 100
        </blockquote>

        <h3>2. Simulating Safe Skips (If you are above the target)</h3>
        <p>
          If your current attendance is 85% and your target is 75%, you have a buffer. The algorithm runs a loop, virtually "skipping" future classes (adding 1 to Total Classes Held, but adding 0 to Classes Attended) and recalculating your percentage each time. It stops exactly when the simulated percentage drops below your 75% target, telling you the exact number of classes you can skip before crossing the threshold.
        </p>
        <p><em>Example:</em> You have attended 40 out of 50 classes (80%). Your target is 75%. If you skip the next 3 classes, your record becomes 40 out of 53 (75.47%). If you skip a 4th class, your record becomes 40 out of 54 (74.07% - Danger!). Therefore, you can safely skip 3 classes.</p>

        <h3>3. Simulating Required Attendance (If you are below the target)</h3>
        <p>
          If your current attendance is 65% and your target is 75%, you are in the danger zone. The algorithm runs a loop, virtually "attending" future classes (adding 1 to both Total Classes Held and Classes Attended) and recalculating. It stops when the simulated percentage finally reaches or exceeds 75%.
        </p>
        <p><em>Example:</em> You have attended 30 out of 50 classes (60%). To reach 75%, you must attend the next 30 classes consecutively (60 / 80 = 75%).</p>

        <h2>Common Uses / Who Can Use It</h2>
        <p>
          While primarily branded for students, this tool is highly useful across various domains where strict quotas must be met:
        </p>
        <ul>
          <li><strong>College and University Students:</strong> Especially engineering, medical, and law students who face incredibly strict 75% or 80% mandates and need to strategically plan which lectures to attend while balancing lab work and internships.</li>
          <li><strong>High School Students:</strong> Planning doctor's appointments, family vacations, or college visits without violating district truancy policies.</li>
          <li><strong>Teachers & Administrators:</strong> Faculty members use this tool when counseling students, quickly showing a struggling student exactly how many days they need to show up to pass the semester.</li>
          <li><strong>Corporate Employees:</strong> Employees in companies with strict hourly requirements or specific "in-office" days (hybrid work models) can use this logic to calculate if they are meeting their HR quotas.</li>
        </ul>

        <h2>Pro Tips for Managing Attendance</h2>
        <p>
          Knowing the numbers is only half the battle. Here are a few tips to ensure you stay above your target percentage throughout the semester:
        </p>
        <ul>
          <li><strong>Build a Buffer Early:</strong> Do not skip classes in the first month of the semester! Attend every single class early on so you build a massive buffer. You will need those "safe skips" later in the semester when you are sick or overwhelmed with final projects.</li>
          <li><strong>Don't Skip Consecutively:</strong> If the calculator says you can skip 4 classes, do not take a whole week off. Spread them out to ensure you don't miss a massive sequential chunk of the curriculum.</li>
          <li><strong>Keep Manual Records:</strong> Professors make mistakes. Keep your own log of days you attended so you can cross-reference it if the university portal shows a lower percentage than you expect.</li>
        </ul>

        <h2>Frequently Asked Questions (FAQ)</h2>
        
        <h3>1. What if my calculator says I need to attend 150 classes to reach 75%?</h3>
        <p>
          If you missed a massive portion of the early semester, the mathematical mountain to climb becomes very steep. If the calculator says you need to attend more classes than are physically left in the semester, it is mathematically impossible to reach your target. In this case, you must speak with your professor immediately about medical exemptions or extra credit.
        </p>

        <h3>2. Does the calculator account for half-days or lab hours?</h3>
        <p>
          This calculator uses whole units (1 class = 1 unit). If your university weights a 3-hour lab heavier than a 1-hour lecture, you should calculate those specific courses separately, or convert your inputs into "hours" rather than "classes" (e.g., 40 hours attended out of 50 hours held).
        </p>

        <h3>3. Is my school's target always exactly 75%?</h3>
        <p>
          75% is the most common standard globally, but some rigorous institutions require 80%, 85%, or even 90%. Our tool includes an adjustable slider so you can customize the calculation to match your exact university policy.
        </p>

        <h3>4. Can I use this for multiple subjects at once?</h3>
        <p>
          Yes. To calculate your overall aggregate attendance, simply add the total classes held across all your subjects and enter it as one large number, then do the same for your attended classes.
        </p>

        <h2>Related Calculators</h2>
        <p>
          TopCalcBox provides a full suite of tools to help students manage their academic life. Check them out below:
        </p>
        <ul>
          <li><a href="/marks-percentage-calculator" className="text-orange-600 hover:underline">Marks Percentage Calculator</a> - Convert your raw test scores (like 42/50) into an exact percentage and estimated letter grade.</li>
          <li><a href="/negative-marking-calculator" className="text-orange-600 hover:underline">Negative Marking Calculator</a> - Calculate your final competitive exam score after accounting for points lost due to incorrect guesses.</li>
          <li><a href="/percentage-calculator" className="text-orange-600 hover:underline">Percentage Calculator</a> - The perfect tool for solving complex percentage-based math homework.</li>
        </ul>
      </SEOContent>
    </div>
  );
}
