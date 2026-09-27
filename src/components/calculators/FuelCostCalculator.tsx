"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Copy, RotateCcw } from "lucide-react";

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
  const effHelper = unitSystem === 'metric' ? 'mileage' : 'MPG';
  const distLabelSingle = unitSystem === 'metric' ? 'KM' : 'Mile';

  return (
    <div className="w-full space-y-3">
      {/* Input Section */}
      <div className="bg-[#e2faec] border border-[#bbf2d7] rounded-3xl p-4 md:p-5 relative">
        
        {/* Unit System Toggle */}
        <div className="mb-4">
          <div className="flex bg-[#d1f4e0] p-1.5 rounded-2xl border border-[#bbf2d7]">
            <button
              onClick={() => setUnitSystem("metric")}
              className={`flex-1 py-2 px-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                unitSystem === "metric" ? "bg-white text-emerald-800 shadow-sm" : "text-emerald-700/60 hover:text-emerald-800"
              }`}
            >
              Metric (KM / Liters)
            </button>
            <button
              onClick={() => setUnitSystem("us")}
              className={`flex-1 py-2 px-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                unitSystem === "us" ? "bg-white text-emerald-800 shadow-sm" : "text-emerald-700/60 hover:text-emerald-800"
              }`}
            >
              US (Miles / Gallons)
            </button>
          </div>
        </div>

        <div className="space-y-4">
          {/* Trip Distance */}
          <div className="space-y-1.5">
            <label className="text-sm font-bold text-slate-800">Trip Distance ({distanceLabel})</label>
            <input
              type="number"
              value={distance}
              onChange={(e) => setDistance(e.target.value)}
              placeholder="240"
              className="w-full bg-white border border-emerald-100/50 rounded-2xl px-4 py-2.5 text-lg text-slate-900 font-bold placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-400 transition-all shadow-sm"
            />
          </div>
          
          {/* Fuel Efficiency */}
          <div className="space-y-1.5">
            <label className="text-sm font-bold text-slate-800">Efficiency / Mileage ({effLabel})</label>
            <input
              type="number"
              value={efficiency}
              onChange={(e) => setEfficiency(e.target.value)}
              placeholder="60"
              className="w-full bg-white border border-emerald-100/50 rounded-2xl px-4 py-2.5 text-lg text-slate-900 font-bold placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-400 transition-all shadow-sm"
            />
          </div>

          {/* Fuel Price */}
          <div className="space-y-1.5">
            <label className="text-sm font-bold text-slate-800">Price Per {priceLabel} ({currencySymbol})</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <span className="text-slate-600 font-bold text-lg">{currencySymbol}</span>
              </div>
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="100"
                className="w-full bg-white border border-emerald-100/50 rounded-2xl pl-10 pr-4 py-2.5 text-lg text-slate-900 font-bold placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-400 transition-all shadow-sm"
              />
            </div>
          </div>

          {/* Result Box */}
          <div className="bg-[#b3f2d6] rounded-3xl p-5 relative shadow-sm border border-[#96e3c2] mt-5">
            <div className="absolute top-3 right-3 flex gap-2">
              <button 
                onClick={() => {
                  const text = `Fuel Cost Calculator
Trip Distance: ${distance || 0} ${distanceLabel}
Fuel Efficiency: ${efficiency || 0} ${effLabel}
Fuel Price: ${currencySymbol}${price || 0} per ${priceLabel}
Total Fuel Cost: ${formatCurrency(cost)}
Fuel Required: ${needed.toFixed(2)} ${volUnit}
Cost Per ${distLabelSingle}: ${formatCurrency(costPerUnit)}

Calculate Online: https://topcalcbox.com/fuel-cost-calculator`;
                  copyToClipboard(text);
                }} 
                className="flex items-center justify-center px-3 py-1.5 bg-white rounded-xl text-xs font-bold text-emerald-800 hover:bg-emerald-50 transition-colors shadow-sm"
              >
                {copied ? "Copied" : "Copy"}
              </button>
              <button 
                onClick={reset}
                className="flex items-center justify-center w-8 h-8 bg-white rounded-xl text-emerald-800 hover:bg-emerald-50 transition-colors shadow-sm"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>
            
            <div className="flex flex-col items-center mt-8 mb-2 text-center">
              <p className="text-emerald-950 text-xs font-black uppercase tracking-[0.2em] mb-1 drop-shadow-sm">
                Total Fuel Cost
              </p>
              <motion.div 
                key={cost}
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="text-4xl md:text-5xl font-black text-emerald-950 tracking-tight mb-2 drop-shadow-sm truncate w-full px-2"
              >
                {formatCurrency(cost)}
              </motion.div>
              <div className="bg-[#9ae4c5] text-emerald-950 px-3 py-1 rounded-full text-xs font-bold mt-1 shadow-sm">
                {needed.toFixed(2)} {volUnit} Fuel Needed
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 mt-4">
              <div className="bg-white rounded-2xl p-4 text-center shadow-sm">
                <p className="text-slate-500 font-bold text-xs sm:text-sm mb-1">Fuel Required</p>
                <p className="text-xl sm:text-2xl font-extrabold text-slate-800">{needed.toFixed(2)} {volUnit}</p>
              </div>
              <div className="bg-white rounded-2xl p-4 text-center shadow-sm">
                <p className="text-slate-500 font-bold text-xs sm:text-sm mb-1">Cost Per {distLabelSingle}</p>
                <p className="text-xl sm:text-2xl font-extrabold text-slate-800">{formatCurrency(costPerUnit)}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
