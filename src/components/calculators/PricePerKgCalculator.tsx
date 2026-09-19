"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Scale } from "lucide-react";

export function PricePerKgCalculator() {
  const [price, setPrice] = useState<string>("");
  const [weight, setWeight] = useState<string>("");
  const [unit, setUnit] = useState<string>("g"); // default to grams

  const calculatePricePerKg = () => {
    const p = parseFloat(price);
    const w = parseFloat(weight);
    
    if (!isNaN(p) && !isNaN(w) && w !== 0) {
      // Convert weight to kg
      const weightInKg = unit === "g" ? w / 1000 : w;
      return (p / weightInKg).toFixed(2);
    }
    return "0.00";
  };

  return (
    <div className="w-full md: relative overflow-hidden">
      {/* Premium Background decoration */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/10 rounded-full blur-[80px] pointer-events-none" />
      
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
        <div className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700">Price</label>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="Total price..."
              className="w-full bg-slate-50/80 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500/50 transition-all shadow-inner"
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700">Weight</label>
              <input
                type="number"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                placeholder="Total weight..."
                className="w-full bg-slate-50/80 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500/50 transition-all shadow-inner"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700">Unit</label>
              <select
                value={unit}
                onChange={(e) => setUnit(e.target.value)}
                className="w-full bg-slate-50/80 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500/50 transition-all shadow-inner"
              >
                <option value="g">Grams (g)</option>
                <option value="kg">Kilograms (kg)</option>
              </select>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center justify-center p-8 bg-gradient-to-br from-amber-500 to-amber-600 rounded-2xl h-full min-h-[200px] shadow-lg shadow-amber-500/30 border border-amber-400/30 relative overflow-hidden">
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent" />
          
          <div className="p-3 bg-white rounded-xl shadow-sm mb-4">
            <Scale className="w-8 h-8 text-amber-600" />
          </div>
          <p className="text-sm text-amber-100 mb-2 uppercase tracking-widest font-bold">Price per Kg</p>
          <motion.div 
            key={calculatePricePerKg()}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="text-4xl md:text-5xl font-extrabold text-white tracking-tighter drop-shadow-sm flex items-end gap-1"
          >
            {calculatePricePerKg()} <span className="text-amber-200 text-2xl mb-1 font-medium">/kg</span>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
