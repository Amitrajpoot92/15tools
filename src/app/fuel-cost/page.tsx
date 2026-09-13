import type { Metadata } from "next";
import { FuelCostCalculator } from "@/components/calculators/FuelCostCalculator";
import { SEOContent } from "@/components/SEOContent";
import { Fuel } from "lucide-react";

export const metadata: Metadata = {
  title: "Fuel Cost Calculator - Estimate Trip Expenses | ToolZen",
  description: "Free online fuel cost calculator. Plan your road trip budget by calculating exactly how much gas you will need and what it will cost.",
};

export default function FuelCostPage() {
  return (
    <div className="pb-20">
      <div className="flex flex-col items-center justify-center text-center mb-10 mt-6">
        <div className="p-4 bg-amber-50 rounded-full mb-4 border border-amber-100 shadow-sm">
          <Fuel className="w-8 h-8 text-amber-600" />
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-4">
          Fuel Cost Calculator
        </h1>
        <p className="text-slate-500 max-w-2xl text-lg">
          Estimate the fuel cost for your upcoming road trip based on distance, efficiency, and gas prices.
        </p>
      </div>

      <div className="max-w-4xl mx-auto mb-16">
        <FuelCostCalculator />
      </div>

      <SEOContent>
        <h2>What is a Fuel Cost Calculator?</h2>
        <p>
          A <strong>Fuel Cost Calculator</strong> is a simple yet powerful tool for planning road trips, daily commutes, or corporate travel budgets. By entering the distance of your trip, the fuel efficiency of your vehicle, and the current price of gas, it tells you exactly how much money you will spend on fuel.
        </p>
        
        <h3>How to use this tool</h3>
        <ul>
          <li><strong>Trip Distance:</strong> Enter the total distance you plan to travel. You can use miles or kilometers, as long as you match it with your efficiency metric.</li>
          <li><strong>Fuel Efficiency:</strong> Enter your car's MPG (Miles Per Gallon) or km/L (Kilometers per Liter). You can usually find this in your car's dashboard or owner's manual.</li>
          <li><strong>Fuel Price:</strong> The cost of gas per gallon or per liter at the pump.</li>
        </ul>

        <h3>The Math Behind It</h3>
        <p>
          Calculating your trip cost is a simple two-step process:
        </p>
        <blockquote>
          <strong>Fuel Needed = Distance / Fuel Efficiency</strong><br />
          <strong>Total Cost = Fuel Needed × Fuel Price</strong>
        </blockquote>
        <p>For example, if you are driving 300 miles, your car gets 25 MPG, and gas costs $3.50 per gallon:</p>
        <blockquote>
          Fuel Needed = 300 / 25 = 12 gallons<br />
          Total Cost = 12 × $3.50 = $42.00
        </blockquote>

        <h3>Tips for saving fuel on your road trip</h3>
        <ul>
          <li><strong>Check Tire Pressure:</strong> Under-inflated tires can lower your gas mileage by up to 3%.</li>
          <li><strong>Reduce Weight:</strong> Don't keep heavy, unnecessary items in your trunk.</li>
          <li><strong>Drive Smoothly:</strong> Rapid acceleration and heavy braking waste fuel. Use cruise control on the highway to maintain a steady speed.</li>
        </ul>
      </SEOContent>
    </div>
  );
}
