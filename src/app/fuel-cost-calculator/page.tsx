import type { Metadata } from "next";
import { FuelCostCalculator } from "@/components/calculators/FuelCostCalculator";
import { SEOContent } from "@/components/SEOContent";
import { Fuel } from "lucide-react";

export const metadata: Metadata = {
  title: "Fuel Cost Calculator",
  description: "Calculate your fuel cost for a trip using distance, mileage, and fuel price. Estimate your travel expenses quickly and easily.",
};

export default function FuelCostPage() {
  return (
    <div className="pb-8">

      {/* Schema Markup for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            "name": "Fuel Cost Calculator",
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

    
      <div className="max-w-4xl mx-auto mb-6 bg-white rounded-3xl p-3 md:p-6 shadow-sm border border-slate-200 mt-2">
        {/* Ultra Compact Header */}
        <div className="flex flex-col items-center text-center bg-blue-100 rounded-2xl p-4 md:p-6 mb-6 border border-blue-300">
          <h1 className="text-xl md:text-2xl font-extrabold text-amber-900 tracking-tight mb-2">
            Fuel Cost Calculator
          </h1>
          <p className="text-slate-900 text-xs md:text-sm max-w-2xl font-medium leading-relaxed">
            Calculate your trip fuel cost quickly and easily.
          </p>
        </div>

        {/* Interactive Tool */}
        <div className="w-full">
          <FuelCostCalculator />
        </div>
      </div>

      <SEOContent>
        <h2>What is a Fuel Cost Calculator</h2>
        <p>A Fuel Cost Calculator is an online tool that helps you calculate how much fuel you will need for a trip and how much the trip will cost. Enter your trip distance, vehicle mileage, and fuel price to get the estimated fuel required and total fuel cost.</p>
        <p>You can use the calculator in Metric (KM / Liters) or US (Miles / Gallons) mode. It also shows the cost per kilometer or mile, making it easier to estimate your travel expenses.</p>
        <p>For example, if your trip is 240 km, your vehicle gives 60 km/L, and fuel costs ₹100 per litre, you will need 4 litres of fuel and the estimated fuel cost will be ₹400.</p>
        
        <h2>How to Use the Fuel Cost Calculator</h2>
        <p>Using the Fuel Cost Calculator is simple. Just enter your trip details and get the result instantly.</p>
        <ol>
          <li><strong>Select Unit</strong> – Choose Metric (KM/Liters) or US (Miles/Gallons).</li>
          <li><strong>Enter Trip Distance</strong> – Enter the total distance you plan to travel.</li>
          <li><strong>Enter Mileage</strong> – Add your vehicle's fuel efficiency, such as KM/L or MPG.</li>
          <li><strong>Enter Fuel Price</strong> – Enter the current price per litre or gallon.</li>
          <li><strong>Check the Result</strong> – The calculator shows fuel required, total fuel cost, and cost per KM/mile.</li>
          <li><strong>Copy or Reset</strong> – Copy the result or reset the calculator for a new calculation.</li>
        </ol>

        <h2>Fuel Cost Calculation Formula</h2>
        <p>Metric (KM / Liters)</p>
        <ul>
          <li>Fuel Required = Trip Distance ÷ Mileage</li>
          <li>Fuel Cost = Fuel Required × Price Per Litre</li>
          <li>Cost Per KM = Fuel Cost ÷ Trip Distance</li>
        </ul>
        <p>Example:<br />240 KM ÷ 60 KM/L = 4 Liters<br />4 × ₹100 = ₹400 Total Fuel Cost</p>
        
        <p>US (Miles / Gallons)</p>
        <ul>
          <li>Fuel Required = Trip Distance ÷ MPG</li>
          <li>Fuel Cost = Fuel Required × Price Per Gallon</li>
          <li>Cost Per Mile = Fuel Cost ÷ Trip Distance</li>
        </ul>
        <p>Example:<br />240 Miles ÷ 60 MPG = 4 Gallons<br />4 × $100 = $400 Total Fuel Cost</p>

        <h2>Who Can Use a Fuel Cost Calculator</h2>
        <p>A Fuel Cost Calculator is useful for anyone who wants to estimate fuel consumption and travel expenses before or during a journey.</p>
        <ul>
          <li><strong>Car Owners</strong> – Estimate the fuel cost for daily travel, highway trips, or long journeys.</li>
          <li><strong>Bike & Scooter Riders</strong> – Calculate fuel needed based on distance and mileage.</li>
          <li><strong>Road Trip Travelers</strong> – Plan an approximate fuel budget before starting a trip.</li>
          <li><strong>Taxi & Cab Drivers</strong> – Calculate fuel expenses and cost per kilometre or mile.</li>
          <li><strong>Delivery Drivers</strong> – Estimate fuel costs for regular delivery routes.</li>
          <li><strong>Daily Commuters</strong> – Check how much fuel a daily or weekly journey may cost.</li>
          <li><strong>Business Owners</strong> – Estimate vehicle fuel expenses for business travel.</li>
          <li><strong>Fleet Managers</strong> – Compare estimated fuel costs across different vehicles and routes.</li>
          <li><strong>Anyone Planning a Trip</strong> – Quickly calculate fuel requirements and expected travel costs.</li>
        </ul>

        <h2>Frequently Asked Questions</h2>
        <h3>1. What is a Fuel Cost Calculator?</h3>
        <p>A Fuel Cost Calculator helps you estimate the fuel required and total fuel cost for a trip using distance, vehicle mileage, and fuel price.</p>
        <h3>2. How do I calculate fuel cost per kilometre?</h3>
        <p>Divide the total fuel cost by the total distance. For example, ₹400 ÷ 240 km = ₹1.67 per km.</p>
        <h3>3. Can I calculate fuel cost in miles and gallons?</h3>
        <p>Yes. Select US (Miles / Gallons) mode and enter the trip distance, MPG, and price per gallon.</p>
        <h3>4. Can I use this calculator for cars and bikes?</h3>
        <p>Yes. It can be used for cars, bikes, scooters, taxis, vans, and other vehicles.</p>
        <h3>5. Is the calculated fuel cost exact?</h3>
        <p>It is an estimate based on the mileage, distance, and fuel price you enter. Actual fuel consumption can vary due to traffic, road conditions, driving style, and vehicle load.</p>

        <h2>Related Calculators</h2>
        <ul>
          <li><a href="/profit-and-loss-calculator" className="text-blue-600 hover:underline">Profit and Loss Calculator</a></li>
          <li><a href="/percentage-calculator" className="text-blue-600 hover:underline">Percentage Calculator</a></li>
          <li><a href="/discount-calculator" className="text-blue-600 hover:underline">Discount Calculator</a></li>
          <li><a href="/price-per-kg-calculator" className="text-blue-600 hover:underline">Price per Kg Calculator</a></li>
          <li><a href="/tip-calculator" className="text-blue-600 hover:underline">Tip Calculator</a></li>
          <li><a href="/grocery-bill-calculator" className="text-blue-600 hover:underline">Grocery Bill Calculator</a></li>
        </ul>
      </SEOContent>
    </div>
  );
}
