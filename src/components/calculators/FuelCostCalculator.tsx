"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Fuel } from "lucide-react";

export function FuelCostCalculator() {
  const [distance, setDistance] = useState<string>("");
  const [efficiency, setEfficiency] = useState<string>("");
  const [price, setPrice] = useState<string>("");

  const calculate = () => {
    const d = parseFloat(distance);
    const e = parseFloat(efficiency);
    const p = parseFloat(price);

    if (!isNaN(d) && !isNaN(e) && !isNaN(p) && e > 0) {
      const fuelNeeded = d / e;
      const totalCost = fuelNeeded * p;

      return {
        needed: fuelNeeded.toFixed(2),
        cost: totalCost.toFixed(2),
      };
    }

    return { needed: "0.00", cost: "0.00" };
  };

  const result = calculate();

  return (
    <div className="bg-white border border-slate-200 rounded-3xl p-6 md:p-10 shadow-2xl shadow-amber-900/5 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/10 rounded-full blur-[80px] pointer-events-none" />
      
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700">Trip Distance (miles/km)</label>
            <input
              type="number"
              value={distance}
              onChange={(e) => setDistance(e.target.value)}
              placeholder="e.g. 300"
              className="w-full bg-slate-50/80 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500/50 transition-all shadow-inner"
            />
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700">Fuel Efficiency (mpg / km/l)</label>
            <input
              type="number"
              value={efficiency}
              onChange={(e) => setEfficiency(e.target.value)}
              placeholder="e.g. 25"
              className="w-full bg-slate-50/80 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500/50 transition-all shadow-inner"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700">Fuel Price (per unit)</label>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="e.g. 3.50"
              className="w-full bg-slate-50/80 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500/50 transition-all shadow-inner"
            />
          </div>
        </div>

        <div className="flex flex-col items-center justify-center p-8 bg-gradient-to-br from-amber-500 to-amber-600 rounded-2xl h-full min-h-[300px] shadow-lg shadow-amber-500/30 border border-amber-400/30 relative overflow-hidden">
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent" />
          
          <div className="p-3 bg-white rounded-xl shadow-sm mb-4">
            <Fuel className="w-8 h-8 text-amber-600" />
          </div>
          
          <p className="text-sm text-amber-100 uppercase tracking-widest font-bold mb-1">
            Total Fuel Cost
          </p>
          
          <motion.div 
            key={result.cost}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="text-5xl md:text-6xl font-extrabold text-white tracking-tighter mb-4 drop-shadow-sm"
          >
            ${result.cost}
          </motion.div>

          <div className="w-full border-t border-amber-400/50 my-3" />

          <div className="w-full flex justify-center text-sm mt-2">
            <span className="text-amber-100 font-medium mr-2">Fuel Required:</span>
            <span className="text-white font-bold">{result.needed} units</span>
          </div>
        </div>
      </div>
    </div>
  );
}
