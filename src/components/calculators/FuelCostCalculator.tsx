"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Copy, RotateCcw, Check } from "lucide-react";

export function FuelCostCalculator() {
  const [unitSystem, setUnitSystem] = useState<"metric" | "us">("metric");
  const [distance, setDistance] = useState<string>("");
  const [efficiency, setEfficiency] = useState<string>("");
  const [price, setPrice] = useState<string>("");
  const [copied, setCopied] = useState(false);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const calculate = () => {
    const d = parseFloat(distance);
    const e = parseFloat(efficiency);
    const p = parseFloat(price);

    if (!isNaN(d) && !isNaN(e) && !isNaN(p) && e > 0) {
      const fuelNeeded = d / e;
      const totalCost = fuelNeeded * p;
      const costPerDistance = d > 0 ? totalCost / d : 0;

      return {
        needed: fuelNeeded,
        cost: totalCost,
        costPerUnit: costPerDistance
      };
    }
    return { needed: 0, cost: 0, costPerUnit: 0 };
  };

  const { needed, cost, costPerUnit } = calculate();

  const reset = () => {
    setDistance("");
    setEfficiency("");
    setPrice("");
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: unitSystem === 'metric' ? 'INR' : 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(amount).replace('INR', '₹').replace('USD', '$');
  };

  const currencySymbol = unitSystem === 'metric' ? '₹' : '$';
  const distanceLabel = unitSystem === 'metric' ? 'KM' : 'Miles';
  const effLabel = unitSystem === 'metric' ? 'KM/L' : 'MPG';
  const priceLabel = unitSystem === 'metric' ? 'Litre' : 'Gallon';
  const volUnit = unitSystem === 'metric' ? 'L' : 'gal';
  const distLabelSingle = unitSystem === 'metric' ? 'KM' : 'Mile';

  return (
    <div className="w-full">
      {/* Tabs */}
      <div className="bg-slate-50 p-1.5 rounded-2xl grid grid-cols-1 sm:grid-cols-2 gap-1 mb-5">
        <button
          onClick={() => setUnitSystem("metric")}
          className={`py-2 px-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
            unitSystem === "metric" ? "bg-white text-slate-900 shadow-sm border border-slate-200/50" : "text-slate-900 hover:text-slate-700"
          }`}
        >
          Metric (KM / Liters)
        </button>
        <button
          onClick={() => setUnitSystem("us")}
          className={`py-2 px-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
            unitSystem === "us" ? "bg-white text-slate-900 shadow-sm border border-slate-200/50" : "text-slate-900 hover:text-slate-700"
          }`}
        >
          US (Miles / Gallons)
        </button>
      </div>

      <div className="space-y-5 bg-indigo-50/50 border border-indigo-100/50 p-5 md:p-6 rounded-2xl">
        <div className="space-y-4">
          {/* Trip Distance */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-900 uppercase tracking-wider">Trip Distance ({distanceLabel})</label>
            <input
              type="number"
              value={distance}
              onChange={(e) => setDistance(e.target.value)}
              placeholder="240"
              className="w-full text-xl font-bold bg-white border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/10 transition-all"
            />
          </div>
          
          {/* Fuel Efficiency */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-900 uppercase tracking-wider">Efficiency / Mileage ({effLabel})</label>
            <input
              type="number"
              value={efficiency}
              onChange={(e) => setEfficiency(e.target.value)}
              placeholder="60"
              className="w-full text-xl font-bold bg-white border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/10 transition-all"
            />
          </div>

          {/* Fuel Price */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-900 uppercase tracking-wider">Price Per {priceLabel} ({currencySymbol})</label>
            <div className="relative">
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="100"
                className="w-full text-xl font-bold bg-white border border-slate-200 rounded-xl px-4 py-3 pl-12 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/10 transition-all"
              />
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-lg text-slate-800 font-bold">{currencySymbol}</span>
            </div>
          </div>
        </div>

        {/* Result Box */}
        <div className="bg-blue-100 border border-blue-300 rounded-2xl p-5 md:p-6 mt-4 relative overflow-hidden shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-slate-900">Total Fuel Cost</span>
            <div className="flex items-center gap-1.5">
              <button onClick={() => {
                const text = `Fuel Cost Calculator
Trip Distance: ${distance || 0} ${distanceLabel}
Fuel Efficiency: ${efficiency || 0} ${effLabel}
Fuel Price: ${currencySymbol}${price || 0} per ${priceLabel}
Total Fuel Cost: ${formatCurrency(cost)}
Fuel Required: ${needed.toFixed(2)} ${volUnit}
Cost Per ${distLabelSingle}: ${formatCurrency(costPerUnit)}

Calculate Online: https://topcalcbox.com/fuel-cost-calculator`;
                copyToClipboard(text);
              }} className="flex items-center gap-1 px-2.5 py-1.5 bg-white border border-slate-200 rounded-md text-xs font-bold text-slate-900 hover:bg-indigo-50 transition-colors shadow-sm">
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                {copied ? "Copied" : "Copy"}
              </button>
              <button onClick={reset} className="p-1.5 text-slate-800 hover:text-slate-900 transition-colors">
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>
          </div>
          
          <div className="flex items-baseline mb-3">
            <span className="text-4xl md:text-5xl font-extrabold tracking-tight text-[#1e1b4b]">
              {formatCurrency(cost)}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-3 mt-4">
            <div className="bg-white/60 rounded-xl p-3 text-center">
              <p className="text-slate-600 font-bold text-[10px] sm:text-xs uppercase tracking-wider mb-1">Fuel Required</p>
              <p className="text-lg sm:text-xl font-extrabold text-slate-900">{needed.toFixed(2)} {volUnit}</p>
            </div>
            <div className="bg-white/60 rounded-xl p-3 text-center">
              <p className="text-slate-600 font-bold text-[10px] sm:text-xs uppercase tracking-wider mb-1">Cost Per {distLabelSingle}</p>
              <p className="text-lg sm:text-xl font-extrabold text-slate-900">{formatCurrency(costPerUnit)}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
