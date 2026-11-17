import type { Metadata } from "next";
import { CalorieCalculator } from "@/components/calculators/CalorieCalculator";
import { SEOContent } from "@/components/SEOContent";
import { ToolHeaderBanner } from "@/components/ToolHeaderBanner";
import { Flame } from "lucide-react";

export const metadata: Metadata = {
  title: "Calorie Calculator – Estimate Daily Calorie Needs",
  description: "Calculate your estimated daily calorie needs based on your age, gender, height, weight, and activity level with our free calculator.",
  alternates: {
    canonical: "https://topcalcbox.com/calorie-calculator",
  },
  openGraph: {
    title: "Calorie Calculator – Estimate Daily Calorie Needs",
    description: "Calculate your estimated daily calorie needs based on your age, gender, height, weight, and activity level with our free calculator.",
    url: "https://topcalcbox.com/calorie-calculator",
    type: "website",
  },
};

export default function Page() {
  return (
    <div className="pb-2 sm:pb-4">

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

    
      <div className="max-w-4xl mx-auto mb-4 sm:mb-5 bg-white rounded-2xl sm:rounded-3xl p-3.5 sm:p-5 shadow-md shadow-slate-200/60 border-2 border-slate-200/90">
        {/* Compact Header */}
        <ToolHeaderBanner
          title="Calorie Calculator"
          description="Estimate your daily calorie needs based on your body and activity."
          color="emerald"
          icon={<Flame className="w-5 h-5" strokeWidth={2.5} />}
        />

        {/* Interactive Tool */}
        <div className="w-full">
          <CalorieCalculator />
        </div>
      </div>

      <SEOContent>
        <h2>About Calorie Calculator</h2>
        <p>
          The <strong>Calorie Calculator</strong> on TopCalcBox is a comprehensive nutritional and energy expenditure planning tool designed to compute your <strong>Basal Metabolic Rate (BMR)</strong> and <strong>Total Daily Energy Expenditure (TDEE)</strong>. According to the foundational first law of thermodynamics, human body composition is governed by the energy balance equation: <em>Energy In vs. Energy Out</em>. Consuming fewer calories than your body burns creates a caloric deficit, driving your body to mobilize stored adipose fat for fuel. Conversely, consuming a surplus provides the necessary surplus energy to synthesize new skeletal muscle tissue.
        </p>
        <p>
          Generic diet plans often fail because they assign arbitrary calorie caps (such as 1,200 or 1,500 kcal) without accounting for an individual&rsquo;s biological reality. Our calculator implements the clinically recognized <strong>Mifflin-St Jeor Equation</strong>&mdash;acknowledged by the Academy of Nutrition and Dietetics as the most accurate standard for non-obese and obese individuals alike. By entering your age, biological sex, height, current weight, and weekly activity habits, you receive customized caloric targets tailored for safe fat loss, lean muscle hypertrophy, or steady weight maintenance.
        </p>

        <h2>How to Use the Calorie Calculator</h2>
        <p>
          Determine your personalized nutritional targets in a few easy steps:
        </p>
        <ol>
          <li><strong>Select Measurement Unit:</strong> Choose between Metric (Kilograms &amp; Centimeters) or Imperial (Pounds &amp; Feet/Inches).</li>
          <li><strong>Select Biological Sex:</strong> Choose Male or Female (men have greater baseline lean muscle mass, which influences resting metabolic rate).</li>
          <li><strong>Enter Age:</strong> Input your current chronological age in years.</li>
          <li><strong>Input Current Weight &amp; Height:</strong> Enter your body mass and stature.</li>
          <li><strong>Choose Your Physical Activity Level:</strong> Select the descriptor that best mirrors your lifestyle:
            <ul>
              <li><em>Sedentary:</em> Desk job with little to no formal exercise.</li>
              <li><em>Lightly Active:</em> Light exercise or sports 1&ndash;3 days per week.</li>
              <li><em>Moderately Active:</em> Moderate exercise or gym workouts 3&ndash;5 days per week.</li>
              <li><em>Very Active:</em> Hard training or athletic sports 6&ndash;7 days per week.</li>
              <li><em>Extra / Extremely Active:</em> Heavy physical labor or two-a-day rigorous athletic training.</li>
            </ul>
          </li>
          <li><strong>Review Your Calorie Targets:</strong> The calculator outputs:
            <ul>
              <li><strong>Maintenance Calories (TDEE):</strong> Daily intake to maintain your exact current weight.</li>
              <li><strong>Weight Loss Target:</strong> A sustainable 500 kcal deficit designed for ~0.5 kg (1 lb) fat loss per week.</li>
              <li><strong>Weight Gain Target:</strong> A 500 kcal lean surplus designed for gradual muscular bulking.</li>
            </ul>
          </li>
          <li><strong>Copy or Reset:</strong> Save your nutritional macro baselines or recalculate as your body weight shifts.</li>
        </ol>

        <h2>Calorie Calculation Formulas &amp; Biophysical Energy Equations</h2>
        <p>
          Daily energy requirements are determined by first calculating your resting baseline (BMR) and then scaling it by your physical activity multiplier (TDEE):
        </p>

        <h3>1. Basal Metabolic Rate (BMR) &ndash; Mifflin-St Jeor Equation</h3>
        <p>
          <strong>For Men:</strong><br />
          <code>BMR = (10 × Weight in kg) + (6.25 × Height in cm) − (5 × Age in years) + 5</code>
        </p>
        <p>
          <strong>For Women:</strong><br />
          <code>BMR = (10 × Weight in kg) + (6.25 × Height in cm) − (5 × Age in years) − 161</code>
        </p>

        <h3>2. Total Daily Energy Expenditure (TDEE) Multipliers</h3>
        <p>
          To find total calories burned per day, multiply BMR by your Physical Activity Level (PAL) coefficient:
        </p>
        <ul>
          <li><strong>Sedentary (Little or no exercise):</strong> TDEE = BMR × 1.200</li>
          <li><strong>Lightly Active (1&ndash;3 days/week):</strong> TDEE = BMR × 1.375</li>
          <li><strong>Moderately Active (3&ndash;5 days/week):</strong> TDEE = BMR × 1.550</li>
          <li><strong>Very Active (6&ndash;7 days/week hard workout):</strong> TDEE = BMR × 1.725</li>
          <li><strong>Extremely Active (Hard physical job or athlete):</strong> TDEE = BMR × 1.900</li>
        </ul>

        <h3>3. The 3,500 Kilocalorie Fat Loss Rule</h3>
        <p>
          One pound (~0.454 kg) of stored human adipose fat represents approximately 3,500 kcal of chemical energy. Creating a daily deficit of 500 kcal results in:
        </p>
        <p>
          <code>500 kcal/day deficit × 7 days = 3,500 kcal deficit per week ≈ 0.45–0.50 kg fat lost</code>
        </p>

        <h2>Practical Real-World Caloric Target Examples</h2>

        <h3>Example 1: Sedentary Male Office Professional Aiming for Fat Loss</h3>
        <p>
          <strong>Profile:</strong> 32-year-old male, 82 kg, 175 cm, sedentary desk job.
        </p>
        <ul>
          <li><strong>BMR:</strong> (10 × 82) + (6.25 × 175) − (5 × 32) + 5 = 820 + 1,093.75 − 160 + 5 = <strong>1,758.75 kcal</strong>.</li>
          <li><strong>TDEE (Sedentary × 1.2):</strong> 1,758.75 × 1.2 = <strong>2,110.5 kcal/day</strong>.</li>
          <li><strong>Maintenance Target:</strong> 2,111 kcal/day.</li>
          <li><strong>Weight Loss Target (−500 kcal):</strong> <strong>1,611 kcal/day</strong> (Steady loss of ~2 kg of pure fat per month).</li>
        </ul>

        <h3>Example 2: Moderately Active Female Targeting Body Recomposition</h3>
        <p>
          <strong>Profile:</strong> 27-year-old female, 60 kg, 165 cm, works out at gym 4 days a week.
        </p>
        <ul>
          <li><strong>BMR:</strong> (10 × 60) + (6.25 × 165) − (5 × 27) − 161 = 600 + 1,031.25 − 135 − 161 = <strong>1,335.25 kcal</strong>.</li>
          <li><strong>TDEE (Moderate × 1.55):</strong> 1,335.25 × 1.55 = <strong>2,069.6 kcal/day</strong>.</li>
          <li><strong>Maintenance Target:</strong> 2,070 kcal/day.</li>
          <li><strong>Mild Fat Loss Deficit (−300 kcal):</strong> <strong>1,770 kcal/day</strong>.</li>
        </ul>

        <h3>Example 3: Young Athletic Lifter in a Muscle Hypertrophy Phase</h3>
        <p>
          <strong>Profile:</strong> 21-year-old male, 70 kg, 180 cm, trains with weights 6 days a week (Very Active).
        </p>
        <ul>
          <li><strong>BMR:</strong> (10 × 70) + (6.25 × 180) − (5 × 21) + 5 = 700 + 1,125 − 105 + 5 = 1,725 kcal.</li>
          <li><strong>TDEE (Very Active × 1.725):</strong> 1,725 × 1.725 = <strong>2,975.6 kcal/day</strong>.</li>
          <li><strong>Lean Bulking Target (+350 kcal):</strong> <strong>3,325 kcal/day</strong> with high protein intake.</li>
        </ul>

        <h3>Example 4: Crash Dieting Hazard &ndash; The Starvation Mode Trap</h3>
        <p>
          <strong>Scenario:</strong> Eating below your resting BMR (e.g., dropping to 1,000 kcal when BMR is 1,600 kcal) triggers adaptive thermogenesis, muscle catabolism, thyroid downregulation, and chronic fatigue. Sustainable fat loss requires eating <em>between</em> your BMR and your TDEE.
        </p>

        <h2>Who Can Use This Calculator?</h2>
        <p>
          The Calorie Calculator provides critical daily guidance across various health and athletic disciplines:
        </p>
        <ul>
          <li><strong>Weight Loss Seekers:</strong> Establish a realistic, non-starvation daily calorie ceiling to shed body fat permanently.</li>
          <li><strong>Bodybuilders &amp; Gym Lifters:</strong> Calibrate precise lean surpluses (+250 to +500 kcal) for muscle hypertrophy without excessive fat gain.</li>
          <li><strong>Endurance Athletes &amp; Runners:</strong> Ensure sufficient daily energy replenishment to prevent overtraining syndrome and athletic burnout.</li>
          <li><strong>Certified Nutritionists &amp; Personal Trainers:</strong> Establish scientific baseline meal planning targets for private coaching clients.</li>
          <li><strong>Individuals Managing Diabetes or PCOS:</strong> Structure portion control and macronutrient distributions to stabilize insulin sensitivity.</li>
        </ul>

        <h2>Frequently Asked Questions (FAQs)</h2>

        <h3>1. What is the difference between BMR and TDEE?</h3>
        <p>
          <strong>BMR (Basal Metabolic Rate)</strong> is the bare minimum energy your body requires to stay alive at complete rest (fueling your brain, heart, lungs, and cellular repair). <strong>TDEE (Total Daily Energy Expenditure)</strong> is your total daily calorie burn including BMR, the thermic effect of food (digestion), and all physical activities like walking, fidgeting, and exercising.
        </p>

        <h3>2. Can I lose weight without exercising just by eating in a calorie deficit?</h3>
        <p>
          Yes. Fat loss is fundamentally dictated by energy balance. Eating 500 calories below your maintenance TDEE will result in fat loss even without formal exercise. However, incorporating resistance exercise prevents muscle loss, preserving your metabolic rate and improving body aesthetics.
        </p>

        <h3>3. What should my macronutrient breakdown (protein, carbs, fat) look like?</h3>
        <p>
          A balanced dietary framework for fat loss typically incorporates:
        </p>
        <ul>
          <li><strong>Protein:</strong> 1.6 to 2.2 grams per kg of body weight (preserves lean muscle and increases satiety).</li>
          <li><strong>Fats:</strong> 20% to 30% of total daily calories (essential for hormonal balance and cellular health).</li>
          <li><strong>Carbohydrates:</strong> The remaining calorie balance (fuels high-intensity workouts and brain function).</li>
        </ul>

        <h3>4. Why have I stopped losing weight despite being on a diet?</h3>
        <p>
          Weight loss plateaus usually result from three common causes: (1) As you lose weight, your smaller body burns fewer calories, lowering your TDEE; (2) Unconscious calorie tracking errors (underestimating cooking oils, dressings, and snacks); or (3) Metabolic adaptation. Recalculating your calories every 5 kg lost will restore progress.
        </p>

        <h3>5. Why is the Mifflin-St Jeor equation preferred over Harris-Benedict?</h3>
        <p>
          The original Harris-Benedict equation was formulated over a century ago and tends to overestimate energy requirements by 5% to 15%. Modern validation studies consistently confirm that Mifflin-St Jeor provides the closest approximation to clinical indirect calorimetry.
        </p>

        <h3>6. How many calories are in 1 gram of protein, carbs, and fat?</h3>
        <p>
          Protein contains 4 kcal per gram; Carbohydrates contain 4 kcal per gram; Dietary Fat contains 9 kcal per gram; and Alcohol contains 7 kcal per gram.
        </p>

        <h2>Related Health &amp; Wellness Calculators</h2>
        <p>
          Optimize your total wellness journey with our companion fitness and lifestyle tools:
        </p>
        <ul>
          <li><a href="/bmi-calculator" className="text-emerald-600 hover:underline font-medium">BMI Calculator</a> &ndash; Check your Body Mass Index and international WHO weight classification.</li>
          <li><a href="/age-calculator-online" className="text-emerald-600 hover:underline font-medium">Age Calculator Online</a> &ndash; Calculate your exact biological age in years, months, and days.</li>
          <li><a href="/percentage-calculator" className="text-emerald-600 hover:underline font-medium">Percentage Calculator</a> &ndash; Calculate percentage drops in body fat and weight loss milestones.</li>
          <li><a href="/grocery-bill-calculator" className="text-emerald-600 hover:underline font-medium">Grocery Bill Calculator</a> &ndash; Plan healthy whole food grocery shopping lists within budget.</li>
          <li><a href="/love-calculator" className="text-emerald-600 hover:underline font-medium">Love Calculator</a> &ndash; Explore playful relationship and name compatibility metrics.</li>
        </ul>
      </SEOContent>
    </div>
  );
}
