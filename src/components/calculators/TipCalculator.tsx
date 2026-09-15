"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Banknote } from "lucide-react";

export function TipCalculator() {
  const [bill, setBill] = useState<string>("");
  const [tipPercent, setTipPercent] = useState<string>("15");
  const [people, setPeople] = useState<string>("1");

  const calculate = () => {
    const b = parseFloat(bill);
    const t = parseFloat(tipPercent);
    const p = parseInt(people);

    if (!isNaN(b) && !isNaN(t) && !isNaN(p) && p > 0) {
      const tipAmount = (b * t) / 100;
      const totalAmount = b + tipAmount;
      const perPerson = totalAmount / p;

      return {
        tip: tipAmount.toFixed(2),
        total: totalAmount.toFixed(2),
        split: perPerson.toFixed(2),
      };
    }

    return { tip: "0.00", total: "0.00", split: "0.00" };
  };

  const result = calculate();

  return (
    <div className="bg-white border border-slate-200 rounded-3xl p-5 md:p-6 shadow-2xl shadow-orange-900/5 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-64 bg-orange-500/10 rounded-full blur-[80px] pointer-events-none" />
      
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
        <div className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700">Bill Amount ($)</label>
            <input
              type="number"
              value={bill}
              onChange={(e) => setBill(e.target.value)}
              placeholder="e.g. 150"
              className="w-full bg-slate-50/80 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 focus:outline-none focus:ring-2 focus:ring-orange-500/50 transition-all shadow-inner"
            />
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700">Tip Percentage (%)</label>
            <div className="flex space-x-2">
              {[10, 15, 18, 20].map((preset) => (
                <button
                  key={preset}
                  onClick={() => setTipPercent(preset.toString())}
                  className={`flex-1 py-2 text-sm font-bold rounded-lg transition-all ${
                    tipPercent === preset.toString() ? "bg-orange-500 text-white shadow-md" : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                  }`}
                >
                  {preset}%
                </button>
              ))}
            </div>
            <input
              type="number"
              value={tipPercent}
              onChange={(e) => setTipPercent(e.target.value)}
              placeholder="Custom %"
              className="w-full mt-2 bg-slate-50/80 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 focus:outline-none focus:ring-2 focus:ring-orange-500/50 transition-all shadow-inner"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700">Number of People</label>
            <input
              type="number"
              value={people}
              onChange={(e) => setPeople(e.target.value)}
              min="1"
              className="w-full bg-slate-50/80 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 focus:outline-none focus:ring-2 focus:ring-orange-500/50 transition-all shadow-inner"
            />
          </div>
        </div>

        <div className="flex flex-col items-center justify-center p-8 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl h-full min-h-[300px] shadow-lg shadow-orange-500/30 border border-orange-400/30 relative overflow-hidden">
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent" />
          
          <div className="p-3 bg-white rounded-xl shadow-sm mb-4">
            <Banknote className="w-8 h-8 text-orange-600" />
          </div>
          
          <p className="text-sm text-orange-100 uppercase tracking-widest font-bold mb-1">
            Total Per Person
          </p>
          
          <motion.div 
            key={result.split}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="text-5xl md:text-6xl font-extrabold text-white tracking-tighter mb-4 drop-shadow-sm"
          >
            ${result.split}
          </motion.div>

          <div className="w-full border-t border-orange-400/50 my-3" />

          <div className="w-full flex justify-between text-sm mt-2">
            <span className="text-orange-100 font-medium">Total Tip:</span>
            <span className="text-white font-bold">${result.tip}</span>
          </div>
          <div className="w-full flex justify-between text-sm mt-1">
            <span className="text-orange-100 font-medium">Total Bill + Tip:</span>
            <span className="text-white font-bold">${result.total}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
