"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { TrendingUp, TrendingDown, DollarSign, IndianRupee } from "lucide-react";

export function ProfitLossCalculator() {
  const [costPrice, setCostPrice] = useState<string>("");
  const [sellingPrice, setSellingPrice] = useState<string>("");
  const [expenses, setExpenses] = useState<string>("");
  const [currency, setCurrency] = useState<"$" | "₹">("$");

  const calculate = () => {
    const cp = parseFloat(costPrice) || 0;
    const sp = parseFloat(sellingPrice) || 0;
    const exp = parseFloat(expenses) || 0;
    const totalCost = cp + exp;
    
    if (totalCost >= 0 && sp >= 0 && (costPrice || sellingPrice)) {
      if (sp >= totalCost) {
        const profit = sp - totalCost;
        const margin = totalCost > 0 ? (profit / totalCost) * 100 : 0;
        return { type: "profit", amount: profit.toFixed(2), margin: margin.toFixed(2), totalCost: totalCost.toFixed(2) };
      } else {
        const loss = totalCost - sp;
        const lossMargin = totalCost > 0 ? (loss / totalCost) * 100 : 0;
        return { type: "loss", amount: loss.toFixed(2), margin: lossMargin.toFixed(2), totalCost: totalCost.toFixed(2) };
      }
    }
    return { type: "none", amount: "0.00", margin: "0.00", totalCost: "0.00" };
  };

  const result = calculate();

  return (
    <div className="w-full relative overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-[80px] pointer-events-none" />
      
      {/* Currency Toggle */}
      <div className="flex justify-end mb-4">
        <div className="bg-slate-100 p-1 rounded-lg flex items-center">
          <button 
            onClick={() => setCurrency("$")}
            className={`p-1.5 rounded-md transition-all ${currency === "$" ? "bg-white shadow-sm text-emerald-600" : "text-slate-500 hover:text-slate-700"}`}
          >
            <DollarSign className="w-4 h-4" />
          </button>
          <button 
            onClick={() => setCurrency("₹")}
            className={`p-1.5 rounded-md transition-all ${currency === "₹" ? "bg-white shadow-sm text-emerald-600" : "text-slate-500 hover:text-slate-700"}`}
          >
            <IndianRupee className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700 flex justify-between">
              Cost Price (CP)
              <span className="text-slate-400 font-medium">{currency}</span>
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-lg text-slate-400 font-bold">{currency}</span>
              <input
                type="number"
                value={costPrice}
                onChange={(e) => setCostPrice(e.target.value)}
                placeholder="e.g. 500"
                className="w-full bg-slate-50/80 border border-slate-200 rounded-xl pl-10 pr-4 py-3 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all shadow-inner"
              />
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700 flex justify-between">
              Other Costs / Expenses
              <span className="text-slate-400 font-medium">{currency}</span>
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-lg text-slate-400 font-bold">{currency}</span>
              <input
                type="number"
                value={expenses}
                onChange={(e) => setExpenses(e.target.value)}
                placeholder="e.g. 50"
                className="w-full bg-slate-50/80 border border-slate-200 rounded-xl pl-10 pr-4 py-3 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all shadow-inner"
              />
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700 flex justify-between">
              Selling Price (SP)
              <span className="text-slate-400 font-medium">{currency}</span>
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-lg text-slate-400 font-bold">{currency}</span>
              <input
                type="number"
                value={sellingPrice}
                onChange={(e) => setSellingPrice(e.target.value)}
                placeholder="e.g. 700"
                className="w-full bg-slate-50/80 border border-slate-200 rounded-xl pl-10 pr-4 py-3 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all shadow-inner"
              />
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center justify-center p-8 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl h-full min-h-[250px] shadow-lg shadow-emerald-500/30 border border-emerald-400/30 relative overflow-hidden">
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent" />
          
          <div className="p-3 bg-white rounded-xl shadow-sm mb-4">
            {result.type === "loss" ? (
              <TrendingDown className="w-8 h-8 text-rose-500" />
            ) : (
              <TrendingUp className="w-8 h-8 text-emerald-600" />
            )}
          </div>
          
          <p className="text-sm text-emerald-100 uppercase tracking-widest font-bold mb-1">
            {result.type === "loss" ? "Total Loss" : "Total Profit"}
          </p>
          
          <motion.div 
            key={result.amount}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="text-5xl md:text-6xl font-extrabold text-white tracking-tighter mb-4 drop-shadow-sm flex items-center"
          >
            <span className="text-3xl opacity-80 mr-1">{currency}</span>
            {result.amount}
          </motion.div>

          <div className="w-full grid grid-cols-2 gap-2 mt-2 pt-4 border-t border-emerald-400/50">
            <div className="text-center">
              <p className="text-[10px] text-emerald-200 uppercase tracking-wider mb-0.5">Total Cost</p>
              <p className="text-sm text-white font-bold">{currency}{result.totalCost}</p>
            </div>
            <div className="text-center border-l border-emerald-400/50">
              <p className="text-[10px] text-emerald-200 uppercase tracking-wider mb-0.5">Margin</p>
              <p className="text-sm text-white font-bold">{result.margin}%</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
