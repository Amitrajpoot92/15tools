"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { LineChart } from "lucide-react";

export function SIPCalculator() {
  const [investment, setInvestment] = useState<string>("");
  const [rate, setRate] = useState<string>("");
  const [years, setYears] = useState<string>("");

  const calculateSIP = () => {
    const P = parseFloat(investment);
    const r = parseFloat(rate);
    const n = parseFloat(years) * 12;

    if (!isNaN(P) && !isNaN(r) && !isNaN(n) && P > 0 && r > 0 && n > 0) {
      const i = r / 12 / 100;
      
      const expectedAmount = P * ((Math.pow(1 + i, n) - 1) / i) * (1 + i);
      const totalInvested = P * n;
      const wealthGained = expectedAmount - totalInvested;

      return {
        expectedAmount: expectedAmount.toFixed(0),
        wealthGained: wealthGained.toFixed(0),
        totalInvested: totalInvested.toFixed(0)
      };
    }
    return { expectedAmount: "0", wealthGained: "0", totalInvested: "0" };
  };

  const results = calculateSIP();

  return (
    <div className="w-full md: relative overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-64 bg-rose-500/10 rounded-full blur-[80px] pointer-events-none" />
      
      <div className="relative z-10 space-y-6">
        <div className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700">Monthly Investment</label>
            <input
              type="number"
              value={investment}
              onChange={(e) => setInvestment(e.target.value)}
              placeholder="e.g. 5000"
              className="w-full bg-slate-50/80 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-rose-500/50 transition-all shadow-inner"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700">Expected Return Rate (% p.a.)</label>
            <input
              type="number"
              value={rate}
              onChange={(e) => setRate(e.target.value)}
              placeholder="e.g. 12"
              className="w-full bg-slate-50/80 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-rose-500/50 transition-all shadow-inner"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700">Time Period (Years)</label>
            <input
              type="number"
              value={years}
              onChange={(e) => setYears(e.target.value)}
              placeholder="e.g. 10"
              className="w-full bg-slate-50/80 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-rose-500/50 transition-all shadow-inner"
            />
          </div>
        </div>

        <div className="flex flex-col items-center justify-center p-6 md:p-8 bg-rose-100 rounded-2xl shadow-sm border border-rose-300">
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent" />
          
          <div className="p-3 bg-white rounded-xl shadow-sm mb-4">
            <LineChart className="w-8 h-8 text-rose-600" />
          </div>
          <p className="text-sm text-rose-800/70 mb-1 uppercase tracking-widest font-bold">Total Expected Amount</p>
          <motion.div 
            key={results.expectedAmount}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tighter drop-shadow-sm mb-6"
          >
            ₹{Number(results.expectedAmount).toLocaleString()}
          </motion.div>
          
          <div className="w-full space-y-3">
            <div className="bg-white shadow-sm backdrop-blur-md rounded-xl p-3 border border-slate-200 flex justify-between items-center">
              <span className="text-rose-800/70 text-sm font-medium">Invested Amount</span>
              <span className="text-slate-900 font-bold">₹{Number(results.totalInvested).toLocaleString()}</span>
            </div>
            <div className="bg-white shadow-sm backdrop-blur-md rounded-xl p-3 border border-white/30 flex justify-between items-center">
              <span className="text-rose-800/70 text-sm font-medium">Wealth Gained</span>
              <span className="text-slate-900 font-bold">₹{Number(results.wealthGained).toLocaleString()}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
