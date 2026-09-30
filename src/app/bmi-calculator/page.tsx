import type { Metadata } from "next";
import { BMICalculator } from "@/components/calculators/BMICalculator";
import { SEOContent } from "@/components/SEOContent";
import { Activity } from "lucide-react";

export const metadata: Metadata = {
  title: "BMI Calculator",
  description: "Calculate your Body Mass Index using your height and weight. Get your BMI result instantly with our free online BMI calculator.",
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
        {/* Ultra Compact Header */}
        <div className="flex flex-col items-center text-center bg-blue-100 rounded-2xl p-4 md:p-6 mb-6 border border-blue-300">
          <h1 className="text-xl md:text-2xl font-extrabold text-blue-900 tracking-tight mb-2">
            BMI Calculator
          </h1>
          <p className="text-slate-900 text-xs md:text-sm max-w-2xl font-medium leading-relaxed">
            Calculate your Body Mass Index (BMI) to check your health and fitness level.
          </p>
        </div>

        {/* Interactive Tool */}
        <div className="w-full">
          <BMICalculator />
        </div>
      </div>

      <SEOContent>
        <h2>What is a BMI Calculator</h2>
        <p>A BMI Calculator is an online tool that helps you quickly calculate your Body Mass Index (BMI) using your weight and height. Simply enter your details to get your BMI score and understand which general adult BMI category your result falls into.</p>
        <p>Our calculator supports both Metric (kg/cm) and US (lb/ft) units, so you can use the measurement system you are comfortable with. For adults, the commonly used BMI ranges are Underweight, Healthy Weight, Overweight, and Obesity.</p>
        <p>For example, if your weight is 70 kg and your height is 175 cm, the calculator uses these values to calculate your BMI. BMI is a useful screening measure, but it does not directly measure body fat or provide a medical diagnosis.</p>

        <h2>How to Use the BMI Calculator</h2>
        <p>The BMI Calculator makes it easy to check your BMI using your height and weight. Select your preferred unit system and enter the required details to get your result instantly.</p>
        <ol>
          <li><strong>Select Unit System</strong> – Choose Metric (kg/cm) or US (lb/ft).</li>
          <li><strong>Enter Weight</strong> – Enter your current weight in the selected unit.</li>
          <li><strong>Enter Height</strong> – Enter your height in the selected unit.</li>
          <li><strong>Check Your BMI</strong> – The calculator automatically calculates and displays your BMI.</li>
          <li><strong>View BMI Category</strong> – Check the general adult BMI category and healthy BMI range shown below the result.</li>
          <li><strong>Copy or Reset</strong> – Copy your result or reset the calculator to make a new calculation.</li>
        </ol>

        <h2>Understanding Your BMI Categories</h2>
        <p>Once you have your BMI score, you can compare it against the standard categories established by the World Health Organization (WHO):</p>
        <ul>
          <li><strong>Underweight (Below 18.5):</strong> This indicates that your weight is lower than what is considered healthy for your height. You may need to gain weight safely.</li>
          <li><strong>Normal Weight (18.5 – 24.9):</strong> This is the ideal health range. Maintaining this weight is associated with a lower risk of serious health conditions.</li>
          <li><strong>Overweight (25.0 – 29.9):</strong> This indicates you are carrying excess weight. Losing weight through diet and exercise may be beneficial.</li>
          <li><strong>Obesity (30.0 and Above):</strong> This category suggests a high amount of excess body fat, which is linked to a much higher risk of cardiovascular diseases, diabetes, and other health complications.</li>
        </ul>

        <h2>BMI Calculation Formula</h2>
        <p>A BMI Calculator uses your weight and height to calculate your Body Mass Index. The formula depends on whether you use the Metric or US unit system.</p>
        
        <h3>Metric Units (kg/cm)</h3>
        <p>The standard BMI formula uses weight in kilograms and height in metres:</p>
        <p>BMI = Weight (kg) ÷ [Height (m)]²</p>
        <p>Example Calculation: If you weigh 70 kg and your height is 1.75 meters (175 cm), you multiply 1.75 by 1.75 to get 3.0625. Then, divide 70 by 3.0625, giving you a BMI of exactly 22.9 (which falls into the Normal Weight category).</p>

        <h3>US / Imperial Units (lb/ft)</h3>
        <p>For the US unit system, BMI is calculated using weight in pounds and height in inches:</p>
        <p>BMI = 703 × [Weight (lb) ÷ Height (in)²]</p>
        <p>Example Calculation: If you weigh 155 lbs and your height is 5 feet 9 inches (69 inches), you multiply 69 by 69 to get 4,761. Then, divide 155 by 4,761 to get 0.032556, and multiply that by 703, giving you a BMI of exactly 22.9 (which falls into the Normal Weight category).</p>

        <h2>Who Can Use a BMI Calculator</h2>
        <p>A BMI Calculator can be useful for adults who want to quickly check their BMI based on their height and weight.</p>
        <ul>
          <li><strong>Adults</strong> – Check their BMI and understand the general weight category.</li>
          <li><strong>Fitness Enthusiasts</strong> – Track BMI as part of their overall fitness routine.</li>
          <li><strong>Gym Users</strong> – Monitor changes in weight and BMI over time.</li>
          <li><strong>Weight Management Users</strong> – Keep track of BMI while working toward personal weight goals.</li>
          <li><strong>Health-Conscious People</strong> – Get a quick BMI estimate without manual calculations.</li>
          <li><strong>Students</strong> – Learn how BMI is calculated using height and weight.</li>
          <li><strong>Parents</strong> – Check BMI for themselves or understand how BMI calculations work.</li>
        </ul>
        <p>Note: BMI categories for adults should not be used for children and teenagers, as their BMI is interpreted differently based on age and sex.</p>

        <h2>Frequently Asked Questions</h2>
        <h3>1. What is a BMI Calculator?</h3>
        <p>A BMI Calculator is an online tool that calculates your Body Mass Index using your weight and height.</p>
        <h3>2. What is a healthy BMI for adults?</h3>
        <p>For adults, a BMI between 18.5 and 24.9 is generally classified as the Healthy Weight range.</p>
        <h3>3. Can I calculate BMI in pounds and feet?</h3>
        <p>Yes. Select US / Imperial Units (lb/ft) and enter your weight in pounds and height in feet and inches.</p>
        <h3>4. Does BMI directly measure body fat?</h3>
        <p>No. BMI is calculated from height and weight and does not directly measure body fat. It is mainly used as a screening measure.</p>
        <h3>5. Can I use the BMI Calculator for children?</h3>
        <p>The adult BMI categories should not be used for children and teenagers. Their BMI is interpreted using age- and sex-specific growth charts.</p>

        <h2>Related Calculators</h2>
        <ul>
          <li><a href="/percentage-calculator" className="text-blue-600 hover:underline">Percentage Calculator</a></li>
          <li><a href="/discount-calculator" className="text-blue-600 hover:underline">Discount Calculator</a></li>
          <li><a href="/age-calculator-online" className="text-blue-600 hover:underline">Age Calculator Online</a></li>
          <li><a href="/fuel-cost-calculator" className="text-blue-600 hover:underline">Fuel Cost Calculator</a></li>
          <li><a href="/calorie-calculator" className="text-blue-600 hover:underline">Calorie Calculator</a></li>
          <li><a href="/love-calculator" className="text-blue-600 hover:underline">Love Calculator</a></li>
        </ul>
      </SEOContent>
    </div>
  );
}
