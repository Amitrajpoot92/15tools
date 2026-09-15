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
    
      {/* Compact Premium Header */}
      <div className="bg-slate-900 rounded-[2rem] p-6 md:p-8 mb-8 mt-2 shadow-xl border border-slate-800 text-center md:text-left overflow-hidden relative">
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-orange-500/20 rounded-full blur-[80px] pointer-events-none" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay pointer-events-none"></div>
        
        <div className="relative z-10 flex flex-col md:flex-row items-center md:items-center space-y-4 md:space-y-0 md:space-x-5 w-full">
          <div className="p-3.5 bg-white/10 rounded-2xl border border-white/10 shadow-sm backdrop-blur-md">
            <Activity className="w-7 h-7 text-orange-400" />
          </div>
          <div className="flex-1">
            <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight mb-1">
              BMI Calculator
            </h1>
            <p className="text-slate-300 text-sm md:text-base max-w-xl font-medium">
              Calculate your Body Mass Index (BMI) to check your health and fitness level.
            </p>
          </div>
        </div>
      </div>

      {/* Interactive Tool */}
      <div className="max-w-4xl mx-auto mb-10">
        <BMICalculator />
      </div>

      {/* SEO Content Section */}
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
