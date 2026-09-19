"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { CreditCard } from "lucide-react";

export function EMICalculator() {
  const [principal, setPrincipal] = useState<string>("");
  const [rate, setRate] = useState<string>("");
  const [tenure, setTenure] = useState<string>("");
  const [tenureType, setTenureType] = useState<"years" | "months">("years");

  const calculateEMI = () => {
    const p = parseFloat(principal);
    const r = parseFloat(rate);
    const t = parseFloat(tenure);

    if (!isNaN(p) && !isNaN(r) && !isNaN(t) && p > 0 && r > 0 && t > 0) {
      const months = tenureType === "years" ? t * 12 : t;
      const monthlyRate = r / 12 / 100;
      
      const emi = (p * monthlyRate * Math.pow(1 + monthlyRate, months)) / (Math.pow(1 + monthlyRate, months) - 1);
      const totalAmount = emi * months;
      const totalInterest = totalAmount - p;

      return {
        emi: emi.toFixed(0),
        totalInterest: totalInterest.toFixed(0),
        totalAmount: totalAmount.toFixed(0)
      };
    }
    return { emi: "0", totalInterest: "0", totalAmount: "0" };
  };

  const results = calculateEMI();

  return (
    <div className="w-full md: relative overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/10 rounded-full blur-[80px] pointer-events-none" />
      
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
        <div className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700">Loan Amount (Principal)</label>
            <input
              type="number"
              value={principal}
              onChange={(e) => setPrincipal(e.target.value)}
              placeholder="e.g. 500000"
              className="w-full bg-slate-50/80 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500/50 transition-all shadow-inner"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700">Interest Rate (% p.a.)</label>
            <input
              type="number"
              value={rate}
              onChange={(e) => setRate(e.target.value)}
              placeholder="e.g. 8.5"
              className="w-full bg-slate-50/80 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500/50 transition-all shadow-inner"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700">Loan Tenure</label>
            <div className="flex gap-2">
              <input
                type="number"
                value={tenure}
                onChange={(e) => setTenure(e.target.value)}
                placeholder={tenureType === "years" ? "e.g. 5" : "e.g. 60"}
                className="flex-1 bg-slate-50/80 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500/50 transition-all shadow-inner"
              />
              <select
                value={tenureType}
                onChange={(e) => setTenureType(e.target.value as "years" | "months")}
                className="bg-slate-50/80 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 font-medium focus:outline-none focus:ring-2 focus:ring-amber-500/50 transition-all"
              >
                <option value="years">Years</option>
                <option value="months">Months</option>
              </select>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center justify-center p-6 md:p-8 bg-gradient-to-br from-amber-500 to-amber-600 rounded-2xl h-full shadow-lg shadow-amber-500/30 border border-amber-400/30 relative overflow-hidden">
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent" />
          
          <div className="p-3 bg-white rounded-xl shadow-sm mb-4">
            <CreditCard className="w-8 h-8 text-amber-600" />
          </div>
          <p className="text-sm text-amber-100 mb-1 uppercase tracking-widest font-bold">Monthly EMI</p>
          <motion.div 
            key={results.emi}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="text-4xl md:text-5xl font-extrabold text-white tracking-tighter drop-shadow-sm mb-6"
          >
            ₹{Number(results.emi).toLocaleString()}
          </motion.div>
          
          <div className="w-full space-y-3">
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-3 border border-white/20 flex justify-between items-center">
              <span className="text-amber-100 text-sm font-medium">Total Interest</span>
              <span className="text-white font-bold">₹{Number(results.totalInterest).toLocaleString()}</span>
            </div>
            <div className="bg-white/20 backdrop-blur-md rounded-xl p-3 border border-white/30 flex justify-between items-center">
              <span className="text-amber-100 text-sm font-medium">Total Payable</span>
              <span className="text-white font-bold">₹{Number(results.totalAmount).toLocaleString()}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
