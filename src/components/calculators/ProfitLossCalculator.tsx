"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { TrendingUp, TrendingDown } from "lucide-react";

export function ProfitLossCalculator() {
  const [costPrice, setCostPrice] = useState<string>("");
  const [sellingPrice, setSellingPrice] = useState<string>("");

  const calculate = () => {
    const cp = parseFloat(costPrice);
    const sp = parseFloat(sellingPrice);
    
    if (!isNaN(cp) && !isNaN(sp) && cp >= 0 && sp >= 0) {
      if (sp >= cp) {
        const profit = sp - cp;
        const margin = cp > 0 ? (profit / cp) * 100 : 0;
        return { type: "profit", amount: profit.toFixed(2), margin: margin.toFixed(2) };
      } else {
        const loss = cp - sp;
        const lossMargin = cp > 0 ? (loss / cp) * 100 : 0;
        return { type: "loss", amount: loss.toFixed(2), margin: lossMargin.toFixed(2) };
      }
    }
    return { type: "none", amount: "0.00", margin: "0.00" };
  };

  const result = calculate();

  return (
    <div className="bg-white border border-slate-200 rounded-3xl p-6 md:p-10 shadow-2xl shadow-orange-900/5 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-64 bg-orange-500/10 rounded-full blur-[80px] pointer-events-none" />
      
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700">Cost Price (CP) $</label>
            <input
              type="number"
              value={costPrice}
              onChange={(e) => setCostPrice(e.target.value)}
              placeholder="e.g. 500"
              className="w-full bg-slate-50/80 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-500/50 transition-all shadow-inner"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700">Selling Price (SP) $</label>
            <input
              type="number"
              value={sellingPrice}
              onChange={(e) => setSellingPrice(e.target.value)}
              placeholder="e.g. 700"
              className="w-full bg-slate-50/80 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-500/50 transition-all shadow-inner"
            />
          </div>
        </div>

        <div className="flex flex-col items-center justify-center p-8 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl h-full min-h-[200px] shadow-lg shadow-orange-500/30 border border-orange-400/30 relative overflow-hidden">
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent" />
          
          <div className="p-3 bg-white rounded-xl shadow-sm mb-4">
            {result.type === "loss" ? (
              <TrendingDown className="w-8 h-8 text-rose-500" />
            ) : (
              <TrendingUp className="w-8 h-8 text-orange-600" />
            )}
          </div>
          
          <p className="text-sm text-orange-100 uppercase tracking-widest font-bold mb-1">
            {result.type === "loss" ? "Total Loss" : "Total Profit"}
          </p>
          
          <motion.div 
            key={result.amount}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="text-5xl md:text-6xl font-extrabold text-white tracking-tighter mb-4 drop-shadow-sm"
          >
            ${result.amount}
          </motion.div>

          <div className="mt-2 px-4 py-2 bg-white/10 rounded-full border border-white/10 backdrop-blur-sm">
            <p className="text-sm text-white font-medium">
              Margin: {result.margin}%
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
