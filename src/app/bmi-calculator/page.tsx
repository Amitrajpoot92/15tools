import type { Metadata } from "next";
import { BMICalculator } from "@/components/calculators/BMICalculator";
import { SEOContent } from "@/components/SEOContent";
import { ToolHeaderBanner } from "@/components/ToolHeaderBanner";
import { Activity } from "lucide-react";

export const metadata: Metadata = {
  title: "BMI Calculator – Calculate Your Body Mass Index",
  description: "Calculate your Body Mass Index using your height and weight. Get your BMI result instantly with our free online BMI calculator.",
  alternates: {
    canonical: "https://topcalcbox.com/bmi-calculator",
  },
  openGraph: {
    title: "BMI Calculator – Calculate Your Body Mass Index",
    description: "Calculate your Body Mass Index using your height and weight. Get your BMI result instantly with our free online BMI calculator.",
    url: "https://topcalcbox.com/bmi-calculator",
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

    
      <div className="max-w-4xl mx-auto mb-4 sm:mb-5 bg-white rounded-2xl sm:rounded-3xl p-3.5 sm:p-5 shadow-md shadow-slate-200/60 border-2 border-slate-200/90">
        {/* Compact Header */}
        <ToolHeaderBanner
          title="BMI Calculator"
          description="Calculate your Body Mass Index (BMI) to check your health and fitness level."
          color="emerald"
          icon={<Activity className="w-5 h-5" strokeWidth={2.5} />}
        />

        {/* Interactive Tool */}
        <div className="w-full">
          <BMICalculator />
        </div>
      </div>

      <SEOContent>
        <h2>About BMI Calculator</h2>
        <p>
          The <strong>BMI Calculator (Body Mass Index)</strong> on TopCalcBox is a medically validated health screening tool based on standards established by the <strong>World Health Organization (WHO)</strong>. Originally formulated by Belgian polymath Adolphe Quetelet, Body Mass Index measures the statistical relationship between an individual&rsquo;s body weight and stature (height squared). It serves as a rapid, universally recognized indicator to assess whether a person is underweight, at a healthy weight, overweight, or clinically obese.
        </p>
        <p>
          While BMI does not measure visceral fat or lean muscle tissue directly, large-scale epidemiological studies consistently prove that high BMI scores correlate strongly with elevated risks of cardiovascular disease, hypertension, Type 2 diabetes, stroke, and sleep apnea. Our calculator supports both <strong>Metric (kg/cm)</strong> and <strong>US / Imperial (lbs/ft/in)</strong> units, providing an immediate numerical index, official WHO weight classifications, and healthy target weight ranges to guide your dietary and fitness milestones.
        </p>

        <h2>How to Use the BMI Calculator</h2>
        <p>
          Checking your Body Mass Index takes less than 15 seconds:
        </p>
        <ol>
          <li><strong>Select Preferred Measurement System:</strong>
            <ul>
              <li><strong>Metric:</strong> Weight in kilograms (kg) and height in centimeters (cm).</li>
              <li><strong>US / Imperial:</strong> Weight in pounds (lbs) and height in feet and inches (ft/in).</li>
            </ul>
          </li>
          <li><strong>Enter Your Weight:</strong> Input your current body mass measured without heavy footwear or outerwear.</li>
          <li><strong>Enter Your Height:</strong> Input your accurate standing vertical stature.</li>
          <li><strong>View Your Instant Health Profile:</strong> The calculator instantly computes:
            <ul>
              <li><strong>BMI Score:</strong> Your precise body mass index to one decimal place.</li>
              <li><strong>Weight Classification:</strong> A visual color-coded badge indicating your official health status (Underweight, Normal, Overweight, Obese).</li>
              <li><strong>Ideal Healthy Weight Range:</strong> The exact kilogram or pound boundaries corresponding to a healthy 18.5&ndash;24.9 BMI for your specific height.</li>
            </ul>
          </li>
          <li><strong>Copy or Reset:</strong> Save your metrics for personal fitness tracking or reset for family evaluations.</li>
        </ol>

        <h2>BMI Calculation Formulas &amp; International Standards</h2>
        <p>
          The mathematical relationship between mass and stature is defined by the following standard equations:
        </p>

        <h3>1. Metric BMI Formula</h3>
        <p>
          <code>BMI = Weight (kg) ÷ [Height (m)]²</code>
        </p>
        <p><em>(Note: Height in meters is height in centimeters divided by 100: Height in meters = Height in cm ÷ 100)</em></p>

        <h3>2. US / Imperial BMI Formula</h3>
        <p>
          <code>BMI = 703 × [Weight (lbs) ÷ (Height in inches)²]</code>
        </p>

        <h3>3. WHO &amp; Asian BMI Classification Standards</h3>
        <p>
          Clinical research shows that South Asian and East Asian populations have higher body fat percentages and elevated cardiometabolic risks at lower BMI thresholds. Here is how international and Asian guidelines compare:
        </p>

        <div className="overflow-x-auto my-4">
          <table className="min-w-full text-left text-sm border-collapse">
            <thead>
              <tr className="border-b border-slate-300 dark:border-slate-700 bg-emerald-50 dark:bg-emerald-950/30">
                <th className="py-2 px-3 font-semibold text-slate-800 dark:text-slate-200">Category</th>
                <th className="py-2 px-3 font-semibold text-slate-800 dark:text-slate-200">Standard WHO BMI</th>
                <th className="py-2 px-3 font-semibold text-slate-800 dark:text-slate-200">Asian / Indian Cutoff</th>
                <th className="py-2 px-3 font-semibold text-slate-800 dark:text-slate-200">Associated Health Risk</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
              <tr>
                <td className="py-2 px-3 font-medium text-blue-600">Underweight</td>
                <td className="py-2 px-3">&lt; 18.5</td>
                <td className="py-2 px-3">&lt; 18.5</td>
                <td className="py-2 px-3">Nutritional deficiency, osteoporosis</td>
              </tr>
              <tr>
                <td className="py-2 px-3 font-medium text-emerald-600">Normal / Healthy</td>
                <td className="py-2 px-3">18.5 &ndash; 24.9</td>
                <td className="py-2 px-3">18.5 &ndash; 22.9</td>
                <td className="py-2 px-3">Lowest cardiometabolic risk</td>
              </tr>
              <tr>
                <td className="py-2 px-3 font-medium text-amber-600">Overweight</td>
                <td className="py-2 px-3">25.0 &ndash; 29.9</td>
                <td className="py-2 px-3">23.0 &ndash; 24.9</td>
                <td className="py-2 px-3">Moderate risk of hypertension &amp; diabetes</td>
              </tr>
              <tr>
                <td className="py-2 px-3 font-medium text-rose-600">Obesity Class I</td>
                <td className="py-2 px-3">30.0 &ndash; 34.9</td>
                <td className="py-2 px-3">&ge; 25.0</td>
                <td className="py-2 px-3">High risk of heart disease, metabolic syndrome</td>
              </tr>
              <tr>
                <td className="py-2 px-3 font-medium text-rose-700">Obesity Class II &amp; III</td>
                <td className="py-2 px-3">&ge; 35.0</td>
                <td className="py-2 px-3">&ge; 30.0</td>
                <td className="py-2 px-3">Severe / Morbid risk requiring medical intervention</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h2>Practical Real-World BMI Examples</h2>

        <h3>Example 1: Healthy Normal Weight Individual</h3>
        <p>
          <strong>Profile:</strong> Adult female, weight = 58 kg, height = 165 cm (1.65 m).
        </p>
        <ul>
          <li><strong>Height Squared:</strong> 1.65 × 1.65 = 2.7225 m².</li>
          <li><strong>BMI Calculation:</strong> 58 ÷ 2.7225 = <strong>21.3</strong>.</li>
          <li><strong>Evaluation:</strong> Perfectly centered inside the healthy normal bracket (18.5–24.9).</li>
        </ul>

        <h3>Example 2: Overweight Male with Lifestyle Sedentariness</h3>
        <p>
          <strong>Profile:</strong> Corporate professional, weight = 86 kg, height = 172 cm (1.72 m).
        </p>
        <ul>
          <li><strong>Height Squared:</strong> 1.72 × 1.72 = 2.9584 m².</li>
          <li><strong>BMI Calculation:</strong> 86 ÷ 2.9584 = <strong>29.1</strong>.</li>
          <li><strong>Evaluation:</strong> High Overweight bracket (approaching Class I Obesity).</li>
          <li><strong>Target Normal Weight:</strong> For 1.72m, maximum normal weight (BMI 24.9) is 24.9 × 2.9584 = 73.6 kg. The user needs to shed roughly 12.4 kg.</li>
        </ul>

        <h3>Example 3: Underweight Young Adult</h3>
        <p>
          <strong>Profile:</strong> College student, weight = 45 kg, height = 168 cm (1.68 m).
        </p>
        <ul>
          <li><strong>Height Squared:</strong> 1.68 × 1.68 = 2.8224 m².</li>
          <li><strong>BMI Calculation:</strong> 45 ÷ 2.8224 = <strong>15.9</strong> (Severe thinness / Underweight).</li>
        </ul>

        <h3>Example 4: Muscular Athlete Limitation Case</h3>
        <p>
          <strong>Profile:</strong> Natural bodybuilder, weight = 92 kg, height = 180 cm (1.80 m), measured body fat = 10%.
        </p>
        <ul>
          <li><strong>BMI:</strong> 92 ÷ 3.24 = <strong>28.4</strong> (&ldquo;Overweight&rdquo; on paper).</li>
          <li><strong>Clinical Insight:</strong> BMI does not distinguish dense skeletal muscle from adipose fat tissue. Athletes with high muscle mass will show high BMI values despite excellent metabolic health.</li>
        </ul>

        <h2>Who Can Use This Calculator?</h2>
        <p>
          The BMI Calculator is widely utilized by health-conscious individuals and medical professionals:
        </p>
        <ul>
          <li><strong>Health-Conscious Adults:</strong> Monitor baseline weight changes and maintain cardiovascular well-being.</li>
          <li><strong>Gym Enthusiasts &amp; Fitness Trainers:</strong> Track initial client assessment metrics before prescribing strength and cardio regimens.</li>
          <li><strong>Dietitians &amp; Clinical Nutritionists:</strong> Determine baseline body mass before structuring caloric deficits or surpluses.</li>
          <li><strong>Medical Clinics &amp; Telehealth Apps:</strong> Conduct rapid non-invasive health triage during routine patient consultations.</li>
          <li><strong>Life &amp; Health Insurance Applicants:</strong> Understand standard underwriting BMI brackets that influence medical policy premiums.</li>
        </ul>

        <h2>Frequently Asked Questions (FAQs)</h2>

        <h3>1. What is considered a healthy BMI for men and women?</h3>
        <p>
          For adults aged 20 and older, a BMI between <strong>18.5 and 24.9</strong> is universally considered normal and healthy by the World Health Organization. Under Asian-specific criteria (Ministry of Health / WHO SEARO), <strong>18.5 to 22.9</strong> is considered the optimal healthy bracket.
        </p>

        <h3>2. Why does BMI not distinguish between fat and muscle?</h3>
        <p>
          BMI relies exclusively on gross total weight and vertical height. Dense muscle mass weighs more by volume than adipose fat. Consequently, elite athletes, powerlifters, and rugby players may be classified as &ldquo;overweight&rdquo; or &ldquo;obese&rdquo; by BMI algorithms despite having single-digit body fat levels.
        </p>

        <h3>3. Does this BMI calculator apply to children and adolescents?</h3>
        <p>
          No. Standard adult BMI equations do not apply to children and teens aged 2 to 19. For youth, pediatricians utilize <strong>BMI-for-Age Percentiles</strong>, which plot BMI against peer growth curves because body composition changes dynamically with puberty and physical development.
        </p>

        <h3>4. How much weight do I need to lose to reach a normal BMI?</h3>
        <p>
          To find your upper normal weight threshold in kilograms, multiply 24.9 by your height in meters squared: Target Max Weight = 24.9 × (Height in meters)². Subtract this figure from your current weight to determine your target fat loss goal.
        </p>

        <h3>5. What is the difference between BMI and Body Fat Percentage?</h3>
        <p>
          BMI is a quick height-to-weight ratio. Body Fat Percentage is the actual proportion of fat mass relative to total weight (bones, water, organs, and muscle). While body fat requires specialized tools (calipers, DEXA scans, or bioimpedance scales), BMI provides an immediate, zero-cost screening benchmark.
        </p>

        <h3>6. How often should I check my BMI?</h3>
        <p>
          Measuring once every 2 to 4 weeks is ideal. Daily weight fluctuates naturally due to water retention, sodium intake, and glycogen storage, which does not reflect genuine fat or muscle composition changes.
        </p>

        <h2>Related Health &amp; Lifestyle Calculators</h2>
        <p>
          Complement your fitness journey with our complete suite of health and wellness tools:
        </p>
        <ul>
          <li><a href="/calorie-calculator" className="text-emerald-600 hover:underline font-medium">Calorie Calculator</a> &ndash; Calculate BMR, TDEE, and daily caloric targets for fat loss or muscle gain.</li>
          <li><a href="/age-calculator-online" className="text-emerald-600 hover:underline font-medium">Age Calculator Online</a> &ndash; Calculate your exact chronological age in years, months, and days.</li>
          <li><a href="/love-calculator" className="text-emerald-600 hover:underline font-medium">Love Calculator</a> &ndash; Explore fun relationship and name compatibility metrics.</li>
          <li><a href="/percentage-calculator" className="text-emerald-600 hover:underline font-medium">Percentage Calculator</a> &ndash; Compute weight loss percentages and body composition changes.</li>
          <li><a href="/fuel-cost-calculator" className="text-emerald-600 hover:underline font-medium">Fuel Cost Calculator</a> &ndash; Calculate vehicle travel expenses for fitness and outdoor road trips.</li>
        </ul>
      </SEOContent>
    </div>
  );
}
