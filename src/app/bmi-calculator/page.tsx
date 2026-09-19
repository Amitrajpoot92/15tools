import type { Metadata } from "next";
import { BMICalculator } from "@/components/calculators/BMICalculator";
import { SEOContent } from "@/components/SEOContent";
import { Activity } from "lucide-react";

export const metadata: Metadata = {
  title: "BMI Calculator - Check Your Body Mass Index | TopCalcBox",
  description: "Calculate your Body Mass Index (BMI) instantly. Find out if you are underweight, normal, overweight, or obese using our free online health calculator.",
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
            "name": "BMI Calculator",
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
        <div className="flex items-center gap-4 md:gap-6 bg-rose-50/50 rounded-2xl p-4 md:p-6 mb-6 border border-rose-100/50">
          <div className="hidden sm:flex flex-shrink-0 items-center justify-center w-16 h-16 bg-rose-600 rounded-2xl shadow-sm shadow-rose-600/20">
            <Activity className="w-8 h-8 text-white" />
          </div>
          <div>
            <h2 className="text-[10px] md:text-xs font-bold text-rose-600 uppercase tracking-wider mb-1">BMI</h2>
            <h1 className="text-xl md:text-2xl font-extrabold text-slate-900 tracking-tight mb-1">
              BMI Calculator
            </h1>
            <p className="text-slate-600 text-xs md:text-sm max-w-2xl font-medium leading-relaxed">
              Calculate your Body Mass Index (BMI) to check your health and fitness level.
            </p>
          </div>
        </div>

        {/* Interactive Tool */}
        <div className="w-full">
          <BMICalculator />
        </div>
      </div>

      <SEOContent>
        <h2>What is a BMI Calculator?</h2>
        <p>
          A <strong>BMI (Body Mass Index) Calculator</strong> is a widely used health tool designed to estimate whether you have a healthy body weight for your height. By mathematically comparing your weight to your height, the BMI calculator provides a numerical score that places you into specific health categories. It is an excellent starting point for anyone looking to assess their general health and fitness.
        </p>
        
        <h2>How to Use the BMI Calculator</h2>
        <p>
          Using the TopCalcBox BMI Calculator is extremely simple. Follow these steps for an instant result:
        </p>
        <ul>
          <li><strong>Step 1: Enter your Weight.</strong> Type your body weight in kilograms (kg) into the first input field.</li>
          <li><strong>Step 2: Enter your Height.</strong> Type your height in centimeters (cm) into the second input field.</li>
          <li><strong>Step 3: View your Result.</strong> The calculator will instantly display your BMI score and identify your health category without requiring you to click any buttons.</li>
        </ul>

        <h2>Understanding Your BMI Categories</h2>
        <p>
          Once you have your BMI score, you can compare it against the standard categories established by the World Health Organization (WHO):
        </p>
        <ul>
          <li><strong>Underweight (Below 18.5):</strong> This indicates that your weight is lower than what is considered healthy for your height. You may need to gain weight safely.</li>
          <li><strong>Normal Weight (18.5 – 24.9):</strong> This is the ideal health range. Maintaining this weight is associated with a lower risk of serious health conditions.</li>
          <li><strong>Overweight (25.0 – 29.9):</strong> This indicates you are carrying excess weight. Losing weight through diet and exercise may be beneficial.</li>
          <li><strong>Obese (30.0 and Above):</strong> This category suggests a high amount of excess body fat, which is linked to a much higher risk of cardiovascular diseases, diabetes, and other health complications.</li>
        </ul>

        <h2>The Mathematical Formula for BMI</h2>
        <p>
          If you want to calculate your BMI manually, the formula is universally standard. It involves dividing your weight in kilograms by your height in meters squared.
        </p>
        <blockquote>
          <strong>BMI = Weight (kg) / [Height (m)]²</strong>
        </blockquote>
        <p>
          <strong>Example Calculation:</strong> If you weigh 70 kg and your height is 1.75 meters (175 cm), you multiply 1.75 by 1.75 to get 3.0625. Then, divide 70 by 3.0625, giving you a BMI of exactly 22.8 (which falls into the Normal Weight category).
        </p>

        <h2>Limitations of BMI</h2>
        <p>
          While BMI is a fantastic screening tool, it has limitations. It does not directly measure body fat percentage. Athletes with high muscle mass may be classified as "overweight" because muscle weighs more than fat. Similarly, it may underestimate body fat in older adults who have lost muscle mass. Always consult with a healthcare professional for a complete health assessment.
        </p>

        <h3>Disclaimer</h3>
        <p>
          The TopCalcBox BMI Calculator is for informational purposes only. It should not be used as a substitute for professional medical advice, diagnosis, or treatment.
        </p>
      </SEOContent>
    </div>
  );
}
