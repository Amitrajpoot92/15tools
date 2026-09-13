"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Calculator } from "lucide-react";

export function PercentageCalculator() {
  const [value, setValue] = useState<string>("");
  const [total, setTotal] = useState<string>("");

  const calculatePercentage = () => {
    const v = parseFloat(value);
    const t = parseFloat(total);
    if (!isNaN(v) && !isNaN(t) && t !== 0) {
      return ((v / t) * 100).toFixed(2);
    }
    return "0.00";
  };

  return (
    <div className="bg-white border border-slate-200 rounded-3xl p-6 md:p-10 shadow-2xl shadow-orange-900/5 relative overflow-hidden">
      {/* Premium Background decoration */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-orange-500/10 rounded-full blur-[80px] pointer-events-none" />
      
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700">Value (e.g., 50)</label>
            <input
              type="number"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder="Enter value..."
              className="w-full bg-slate-50/80 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-500/50 transition-all shadow-inner"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700">Total (e.g., 200)</label>
            <input
              type="number"
              value={total}
              onChange={(e) => setTotal(e.target.value)}
              placeholder="Enter total..."
              className="w-full bg-slate-50/80 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-500/50 transition-all shadow-inner"
            />
          </div>
        </div>

        <div className="flex flex-col items-center justify-center p-8 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl h-full min-h-[200px] shadow-lg shadow-orange-500/30 border border-orange-400/30 relative overflow-hidden">
          {/* Subtle top inner glow for a premium 3D bevel effect */}
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent" />
          
          <div className="p-3 bg-white rounded-xl shadow-sm mb-4">
            <Calculator className="w-8 h-8 text-orange-600" />
          </div>
          <p className="text-sm text-orange-100 mb-2 uppercase tracking-widest font-bold">Result</p>
          <motion.div 
            key={calculatePercentage()}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="text-5xl md:text-6xl font-extrabold text-white tracking-tighter drop-shadow-sm"
          >
            {calculatePercentage()}<span className="text-orange-200 text-3xl ml-1">%</span>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
