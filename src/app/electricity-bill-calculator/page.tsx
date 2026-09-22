import type { Metadata } from "next";
import { ElectricityBillCalculator } from "@/components/calculators/ElectricityBillCalculator";
import { SEOContent } from "@/components/SEOContent";
import { Zap } from "lucide-react";

export const metadata: Metadata = {
  title: "Electricity Bill Calculator - Estimate Your Power Costs | TopCalcBox",
  description: "Calculate your monthly electricity bill based on your appliance power consumption in Watts, daily usage hours, and cost per unit (kWh).",
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
            "name": "Electricity Bill Calculator",
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
        <div className="flex flex-col items-center text-center bg-yellow-100 rounded-2xl p-4 md:p-6 mb-6 border border-yellow-300">
          <h1 className="text-xl md:text-2xl font-extrabold text-[#111827] tracking-tight mb-1">
            Electricity Bill
          </h1>
          <p className="text-slate-600 text-xs md:text-sm max-w-2xl font-medium leading-relaxed">
            Estimate your monthly power consumption cost based on your appliances.
          </p>
        </div>

        {/* Interactive Tool */}
        <div className="w-full">
          <ElectricityBillCalculator />
        </div>
      </div>

      <SEOContent>
        <h2>What is an Electricity Bill Calculator?</h2>
        <p>
          An <strong>Electricity Bill Calculator</strong> is a highly practical utility tool that helps you estimate the running cost of your household or office appliances. Whether you want to know how much your air conditioner costs to run overnight, or how much electricity your computer consumes in a month, this calculator gives you exact figures based on your local utility rates.
        </p>
        
        <h2>How to Use the Electricity Bill Calculator</h2>
        <p>
          Estimating your monthly power bill has never been easier. Follow these three simple steps:
        </p>
        <ul>
          <li><strong>Step 1: Enter Appliance Power.</strong> Find the power rating of your appliance (usually printed on a sticker on the back or bottom of the device) in Watts (W). Enter this number into the first field. For example, a standard space heater might be 1500 Watts.</li>
          <li><strong>Step 2: Enter Daily Usage.</strong> Estimate how many hours per day this appliance is turned on.</li>
          <li><strong>Step 3: Enter Cost per Unit.</strong> Check your recent electricity bill to find out how much you pay per kilowatt-hour (kWh). In many regions, this is simply referred to as the "Cost per Unit."</li>
        </ul>

        <h2>Understanding the Results</h2>
        <p>
          As soon as you enter the numbers, the calculator will generate three important metrics:
        </p>
        <ul>
          <li><strong>Daily Consumption (kWh):</strong> This is exactly how many units of electricity the appliance burns through in a single day.</li>
          <li><strong>Monthly Units (kWh):</strong> This projects the daily consumption over a standard 30-day billing cycle.</li>
          <li><strong>Estimated Monthly Bill:</strong> This translates those consumed units into real currency, showing you exactly how much money that specific appliance is adding to your monthly utility bill.</li>
        </ul>

        <h2>The Mathematical Formula for Power Consumption</h2>
        <p>
          Utility companies charge you based on kilowatt-hours (kWh). One kilowatt is equal to 1,000 Watts. Therefore, to calculate your cost, you must first convert Watts to Kilowatts.
        </p>
        <blockquote>
          <strong>Units (kWh) = (Watts × Hours) / 1000</strong>
        </blockquote>
        <p>
          Once you have your daily units, simply multiply by 30 to get your monthly units, and then multiply by your Cost per Unit to get the final bill amount.
        </p>
        <p>
          <strong>Example Calculation:</strong> If you run a 2000W Air Conditioner for 8 hours a day, the daily units would be (2000 × 8) / 1000 = 16 kWh. Over a 30-day month, that equals 480 kWh. If your electricity provider charges ₹7.5 per unit, your monthly cost for the AC alone would be 480 × 7.5 = ₹3,600.
        </p>

        <h2>Tips for Saving Electricity</h2>
        <p>
          By calculating the individual costs of your appliances, you can easily identify "energy hogs" in your home. To reduce your monthly bill, consider switching to LED lighting, upgrading to energy-efficient (5-star rated) appliances, and simply remembering to unplug devices that draw phantom power when not in use.
        </p>
      </SEOContent>
    </div>
  );
}
