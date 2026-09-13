"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { PieChart } from "lucide-react";

export function MarginCalculator() {
  const [cost, setCost] = useState<string>("");
  const [margin, setMargin] = useState<string>("");

  const calculate = () => {
    const c = parseFloat(cost);
    const m = parseFloat(margin);
    
    if (!isNaN(c) && !isNaN(m) && m < 100) {
      // Margin = (Revenue - Cost) / Revenue
      // Revenue = Cost / (1 - Margin)
      const revenue = c / (1 - (m / 100));
      const grossProfit = revenue - c;
      const markup = (grossProfit / c) * 100;

      return {
        revenue: revenue.toFixed(2),
        profit: grossProfit.toFixed(2),
        markup: markup.toFixed(2)
      };
    }
    return { revenue: "0.00", profit: "0.00", markup: "0.00" };
  };

  const result = calculate();

  return (
    <div className="bg-white border border-slate-200 rounded-3xl p-6 md:p-10 shadow-2xl shadow-amber-900/5 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/10 rounded-full blur-[80px] pointer-events-none" />
      
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700">Cost to produce/buy ($)</label>
            <input
              type="number"
              value={cost}
              onChange={(e) => setCost(e.target.value)}
              placeholder="e.g. 50"
              className="w-full bg-slate-50/80 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500/50 transition-all shadow-inner"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700">Desired Gross Margin (%)</label>
            <input
              type="number"
              value={margin}
              onChange={(e) => setMargin(e.target.value)}
              placeholder="e.g. 30"
              className="w-full bg-slate-50/80 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500/50 transition-all shadow-inner"
            />
          </div>
        </div>

        <div className="flex flex-col items-center justify-center p-8 bg-gradient-to-br from-amber-500 to-amber-600 rounded-2xl h-full min-h-[200px] shadow-lg shadow-amber-500/30 border border-amber-400/30 relative overflow-hidden">
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent" />
          
          <div className="p-3 bg-white rounded-xl shadow-sm mb-4">
            <PieChart className="w-8 h-8 text-amber-600" />
          </div>
          
          <p className="text-sm text-amber-100 uppercase tracking-widest font-bold mb-1">
            Selling Price (Revenue)
          </p>
          
          <motion.div 
            key={result.revenue}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="text-5xl md:text-6xl font-extrabold text-white tracking-tighter mb-4 drop-shadow-sm"
          >
            ${result.revenue}
          </motion.div>

          <div className="w-full border-t border-amber-400/50 my-2" />

          <div className="w-full flex justify-between text-sm mt-2">
            <span className="text-amber-100 font-medium">Gross Profit:</span>
            <span className="text-white font-bold">${result.profit}</span>
          </div>
          <div className="w-full flex justify-between text-sm mt-1">
            <span className="text-amber-100 font-medium">Markup:</span>
            <span className="text-white font-bold">{result.markup}%</span>
          </div>
        </div>
      </div>
    </div>
  );
}
