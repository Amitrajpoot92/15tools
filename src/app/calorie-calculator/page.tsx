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

    
      <div className="max-w-4xl mx-auto mb-10 bg-white rounded-3xl p-4 md:p-6 shadow-sm border border-slate-200 mt-2">
        {/* Ultra Compact Header */}
        <div className="flex items-center gap-4 md:gap-6 bg-red-50/50 rounded-2xl p-4 md:p-6 mb-6 border border-red-100/50">
          <div className="hidden sm:flex flex-shrink-0 items-center justify-center w-16 h-16 bg-red-600 rounded-2xl shadow-sm shadow-red-600/20">
            <Flame className="w-8 h-8 text-white" />
          </div>
          <div>
            <h2 className="text-[10px] md:text-xs font-bold text-red-600 uppercase tracking-wider mb-1">CALORIE</h2>
            <h1 className="text-xl md:text-2xl font-extrabold text-slate-900 tracking-tight mb-1">
              Calorie Calculator
            </h1>
            <p className="text-slate-600 text-xs md:text-sm max-w-2xl font-medium leading-relaxed">
              Determine your daily calorie needs for weight loss, gain, or maintenance.
            </p>
          </div>
        </div>

        {/* Interactive Tool */}
        <div className="w-full">
          <CalorieCalculator />
        </div>
      </div>

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
