import type { Metadata } from "next";
import { CalorieCalculator } from "@/components/calculators/CalorieCalculator";
import { SEOContent } from "@/components/SEOContent";
import { Flame } from "lucide-react";

export const metadata: Metadata = {
  title: "Calorie Calculator",
  description: "Calculate your estimated daily calorie needs based on your age, gender, height, weight, and activity level with our free calculator.",
};

export default function Page() {
  return (
    <div className="pb-8">

      {/* Schema Markup for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            "name": "Calorie Calculator",
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
        {/* Compact Header */}
        <div className="flex flex-col items-center text-center bg-emerald-50/70 rounded-2xl p-4 md:p-6 mb-6 border border-emerald-200/80">
          <h1 className="text-xl md:text-2xl font-extrabold text-emerald-950 tracking-tight mb-1">
            Calorie Calculator
          </h1>
          <p className="text-emerald-900/75 text-xs md:text-sm max-w-2xl font-medium leading-relaxed">
            Estimate your daily calorie needs based on your body and activity.
          </p>
        </div>

        {/* Interactive Tool */}
        <div className="w-full">
          <CalorieCalculator />
        </div>
      </div>

      <SEOContent>
        <h2>What is a Calorie Calculator</h2>
        <p>A Calorie Calculator is an online tool that helps estimate how many calories you may need each day based on your age, sex, weight, height, and activity level. It gives you an estimated daily calorie target for maintaining your current weight.</p>
        <p>You can choose between Metric and Imperial units, select your sex, enter your body details, and choose your activity level such as sedentary, lightly active, or moderately active. The calculator then provides estimated calorie targets for weight maintenance, weight loss, and weight gain.</p>
        <p>Calorie needs are estimates because actual energy requirements can vary from person to person. Physical activity, body composition, health conditions, lifestyle, and other factors can affect daily calorie needs.</p>

        <h2>How to Use the Calorie Calculator</h2>
        <p>The Calorie Calculator uses your basic body details and activity level to estimate your daily calorie needs. Enter the required information and get your calorie targets instantly.</p>
        <ol>
          <li><strong>Select Unit System</strong> – Choose Metric or Imperial.</li>
          <li><strong>Select Gender</strong> – Choose Male or Female.</li>
          <li><strong>Enter Age</strong> – Enter your age in years.</li>
          <li><strong>Enter Weight</strong> – Add your current weight in kg or lb.</li>
          <li><strong>Enter Height</strong> – Enter your height in cm or feet and inches.</li>
          <li><strong>Select Activity Level</strong> – Choose the option that best matches your usual physical activity.</li>
          <li><strong>Check Your Results</strong> – View your estimated calories for maintaining, losing, or gaining weight.</li>
          <li><strong>Copy or Reset</strong> – Copy the result or reset the calculator for a new calculation.</li>
        </ol>

        <h2>Understanding the Results</h2>
        <p>After entering your details, the calculator provides estimated daily calorie targets based on your age, sex, weight, height, and activity level. The results help you understand the approximate calories associated with maintaining, losing, or gaining weight.</p>
        <p><strong>Maintain Weight:</strong> This is your estimated daily calorie target for maintaining your current weight based on the information you entered.</p>
        <p><strong>Weight Loss (-0.5 kg/week):</strong> This shows an estimated daily calorie target designed around a gradual weight-loss goal of approximately 0.5 kg per week.</p>
        <p><strong>Weight Gain (+0.5 kg/week):</strong> This shows an estimated daily calorie target designed around a gradual weight-gain goal of approximately 0.5 kg per week.</p>
        <p>These values are estimates, not exact calorie requirements. Actual results can vary depending on activity, body composition, health, lifestyle, and other individual factors.</p>

        <h2>Calorie Calculation Formula</h2>
        <p>The Calorie Calculator first calculates your Basal Metabolic Rate (BMR) using the Mifflin-St Jeor Equation. BMR is the estimated number of calories your body needs at rest to perform basic functions such as breathing, circulation, and maintaining body temperature.</p>
        
        <h3>Mifflin-St Jeor Equation</h3>
        <p>Where:<br />W = Weight in kg<br />H = Height in cm<br />A = Age in years</p>
        <p>For Men BMR = 10W + 6.25H - 5A + 5</p>
        <p>For Women BMR = 10W + 6.25H - 5A - 161</p>

        <h2>Who Can Use a Calorie Calculator</h2>
        <p>A Calorie Calculator can be useful for adults who want to estimate their daily calorie needs based on their personal details and activity level.</p>
        <ul>
          <li><strong>People Managing Their Weight</strong> – Estimate daily calories for maintaining, losing, or gaining weight.</li>
          <li><strong>Fitness Enthusiasts</strong> – Get an approximate calorie target to support their fitness routine.</li>
          <li><strong>Gym Users</strong> – Understand their estimated daily energy needs based on activity level.</li>
          <li><strong>People Planning Their Diet</strong> – Use calorie estimates when planning daily food intake.</li>
          <li><strong>Athletes & Active Individuals</strong> – Get a general estimate of calorie requirements based on physical activity.</li>
          <li><strong>Busy Professionals</strong> – Quickly check their estimated daily calorie needs without manual calculations.</li>
          <li><strong>Students & Learners</strong> – Understand how BMR, activity level, and calorie needs are calculated.</li>
        </ul>
        <p>Note: Calorie results are estimates and should not be treated as personalised medical or dietary advice.</p>

        <h2>Frequently Asked Questions</h2>
        <h3>1. What is a Calorie Calculator?</h3>
        <p>A Calorie Calculator estimates your daily calorie needs using details such as age, sex, weight, height, and activity level.</p>
        <h3>2. Does activity level affect calorie requirements?</h3>
        <p>Yes. A higher activity level generally results in a higher estimated daily calorie requirement.</p>
        <h3>3. What does Weight Loss (-0.5 kg/week) mean?</h3>
        <p>It is an estimated calorie target designed around a gradual weight-loss goal of approximately 0.5 kg per week.</p>
        <h3>4. Can I use pounds and feet?</h3>
        <p>Yes. Select Imperial to enter your weight in pounds and height in feet and inches.</p>
        <h3>5. How accurate are the calorie estimates from this calculator?</h3>
        <p>The results provide an estimated daily calorie requirement based on your age, sex, weight, height, and activity level. Your actual calorie needs may be different because factors such as body composition, daily activity, metabolism, lifestyle, and overall health can affect how many calories your body uses.</p>

        <h2>Related Calculators</h2>
        <ul>
          <li><a href="/percentage-calculator" className="text-blue-600 hover:underline">Percentage Calculator</a></li>
          <li><a href="/discount-calculator" className="text-blue-600 hover:underline">Discount Calculator</a></li>
          <li><a href="/age-calculator-online" className="text-blue-600 hover:underline">Age Calculator Online</a></li>
          <li><a href="/fuel-cost-calculator" className="text-blue-600 hover:underline">Fuel Cost Calculator</a></li>
          <li><a href="/bmi-calculator" className="text-blue-600 hover:underline">BMI Calculator</a></li>
          <li><a href="/love-calculator" className="text-blue-600 hover:underline">Love Calculator</a></li>
        </ul>
      </SEOContent>
    </div>
  );
}
