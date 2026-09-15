import type { Metadata } from "next";
import { CalorieCalculator } from "@/components/calculators/CalorieCalculator";
import { SEOContent } from "@/components/SEOContent";
import { Flame } from "lucide-react";

export const metadata: Metadata = {
  title: "Calorie Calculator - Calculate Daily Caloric Needs | TopCalcBox",
  description: "Find out exactly how many calories you need to eat per day to maintain your weight, lose weight, or build muscle based on your age, height, and activity level.",
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
    
      {/* Compact Premium Header */}
      <div className="bg-slate-900 rounded-[2rem] p-6 md:p-8 mb-8 mt-2 shadow-xl border border-slate-800 text-center md:text-left overflow-hidden relative">
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-amber-500/20 rounded-full blur-[80px] pointer-events-none" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay pointer-events-none"></div>
        
        <div className="relative z-10 flex flex-col md:flex-row items-center md:items-center space-y-4 md:space-y-0 md:space-x-5 w-full">
          <div className="p-3.5 bg-white/10 rounded-2xl border border-white/10 shadow-sm backdrop-blur-md">
            <Flame className="w-7 h-7 text-amber-400" />
          </div>
          <div className="flex-1">
            <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight mb-1">
              Calorie Calculator
            </h1>
            <p className="text-slate-300 text-sm md:text-base max-w-xl font-medium">
              Determine your daily calorie needs for weight loss, gain, or maintenance.
            </p>
          </div>
        </div>
      </div>

      {/* Interactive Tool */}
      <div className="max-w-4xl mx-auto mb-10">
        <CalorieCalculator />
      </div>

      {/* SEO Content Section */}
      <SEOContent>
        <h2>What is a Calorie Calculator?</h2>
        <p>
          A <strong>Calorie Calculator</strong> is a specialized health tool that determines your Total Daily Energy Expenditure (TDEE). This is the exact number of calories your body burns in a 24-hour period while performing basic life-sustaining functions (like breathing and circulating blood) plus any physical activity you engage in. Knowing your TDEE is the cornerstone of any successful diet or fitness plan.
        </p>
        
        <h2>How to Use the Calorie Calculator</h2>
        <p>
          To get the most accurate results, you need to provide the calculator with some basic biological metrics. Follow these steps:
        </p>
        <ul>
          <li><strong>Step 1: Enter your Age and Gender.</strong> Metabolism changes with age and differs between men and women.</li>
          <li><strong>Step 2: Enter your Weight and Height.</strong> These metrics define your body mass.</li>
          <li><strong>Step 3: Select your Activity Level.</strong> Be honest here. If you sit at a desk all day and don't exercise, select "Sedentary." If you hit the gym 4 times a week, select "Moderately active."</li>
        </ul>

        <h2>Understanding the Results</h2>
        <p>
          Once you have inputted your data, the calculator will generate three important numbers based on the highly accurate Mifflin-St Jeor Equation:
        </p>
        <ul>
          <li><strong>Maintain Weight:</strong> This is your maintenance calorie target. If you eat this exact amount of calories every day, your body weight will remain exactly the same.</li>
          <li><strong>Mild Weight Loss:</strong> This target puts you in a small caloric deficit (usually around 250 calories below maintenance). This is a slow, steady, and highly sustainable way to lose weight.</li>
          <li><strong>Weight Loss (-0.5kg/week):</strong> This target puts you in a 500-calorie deficit. Because one pound of body fat is roughly equivalent to 3,500 calories, eating at a 500-calorie deficit every day will result in about 1 pound (or 0.45 kg) of weight loss per week.</li>
        </ul>

        <h2>The Importance of a Caloric Deficit</h2>
        <p>
          In the world of nutrition and weight loss, thermodynamics rules supreme. No matter what specific diet you follow—whether it is Keto, Paleo, Vegan, or Intermittent Fasting—you will not lose body fat unless you are in a caloric deficit. Our calculator helps you find the exact ceiling of calories you can consume to ensure you stay in that fat-burning zone.
        </p>

        <h3>Disclaimer</h3>
        <p>
          The TopCalcBox Calorie Calculator provides a highly educated estimate based on population averages. Individual metabolisms can vary. If you have medical conditions like thyroid issues, or if you are pregnant, please consult with a registered dietitian or doctor before making drastic changes to your diet.
        </p>
      </SEOContent>
    </div>
  );
}
