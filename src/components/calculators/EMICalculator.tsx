"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { CreditCard, Copy, Check } from "lucide-react";

export function EMICalculator() {
  const [principal, setPrincipal] = useState<string>("");
  const [rate, setRate] = useState<string>("");
  const [tenure, setTenure] = useState<string>("");
  const [tenureType, setTenureType] = useState<"years" | "months">("years");
  const [copied, setCopied] = useState(false);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

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
    <div className="w-full relative overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-[80px] pointer-events-none" />
      
      <div className="relative z-10 space-y-6">
        <div className="space-y-4 bg-indigo-50/50 border border-indigo-100/50 p-5 md:p-6 rounded-2xl">
          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700">Loan Amount (Principal)</label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-lg text-slate-800 font-bold">₹</span>
              <input
                type="number"
                value={principal}
                onChange={(e) => setPrincipal(e.target.value)}
                placeholder="e.g. 500000"
                className="w-full bg-slate-50/80 border border-slate-200 rounded-xl pl-10 pr-4 py-3 text-slate-900 placeholder:text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all shadow-inner"
              />
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700">Interest Rate (% p.a.)</label>
            <div className="relative">
              <input
                type="number"
                value={rate}
                onChange={(e) => setRate(e.target.value)}
                placeholder="e.g. 8.5"
                className="w-full bg-slate-50/80 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 placeholder:text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all shadow-inner pr-10"
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-base text-slate-800 font-bold">%</span>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label className="text-sm font-bold text-slate-700">Loan Tenure</label>
              <div className="flex items-center bg-slate-100/80 p-1 rounded-lg border border-slate-200/50">
                <button 
                  onClick={() => setTenureType("years")}
                  className={`px-3 py-1 text-xs font-bold rounded-md transition-all ${tenureType === "years" ? "bg-white text-indigo-600 shadow-sm border border-slate-200/50" : "text-slate-600 hover:text-slate-900"}`}
                >
                  Years
                </button>
                <button 
                  onClick={() => setTenureType("months")}
                  className={`px-3 py-1 text-xs font-bold rounded-md transition-all ${tenureType === "months" ? "bg-white text-indigo-600 shadow-sm border border-slate-200/50" : "text-slate-600 hover:text-slate-900"}`}
                >
                  Months
                </button>
              </div>
            </div>
            <div className="relative">
              <input
                type="number"
                value={tenure}
                onChange={(e) => setTenure(e.target.value)}
                placeholder={tenureType === "years" ? "e.g. 5" : "e.g. 60"}
                className="w-full bg-slate-50/80 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 placeholder:text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all shadow-inner pr-20"
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-slate-500 font-bold">
                {tenureType === "years" ? "Years" : "Months"}
              </span>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center justify-center p-6 md:p-8 bg-indigo-100 rounded-2xl border border-indigo-300 relative overflow-hidden">
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent" />
          
          <button onClick={() => {
            const text = `EMI Calculator
Loan Amount: ₹${principal || 0}
Interest Rate: ${rate || 0}%
Loan Tenure: ${tenure || 0} ${tenureType === 'years' ? 'Years' : 'Months'}
Monthly EMI: ₹${Number(results.emi).toLocaleString()}
Total Interest: ₹${Number(results.totalInterest).toLocaleString()}
Total Payment: ₹${Number(results.totalAmount).toLocaleString()}

Calculate Online: https://topcalcbox.com/emi-calculator/`;
            copyToClipboard(text);
          }} className="absolute top-4 right-4 flex items-center gap-1 px-3 py-1.5 bg-white border border-indigo-200 rounded-lg text-[11px] font-bold text-indigo-700 hover:bg-indigo-50 transition-colors shadow-sm z-10">
            <span className="inline">{copied ? "Copied" : "Copy"}</span>
          </button>
          
          <div className="p-3 bg-white rounded-xl shadow-sm mb-4">
            <CreditCard className="w-8 h-8 text-indigo-600" />
          </div>
          <p className="text-sm text-indigo-800/70 mb-1 uppercase tracking-widest font-bold">Monthly EMI</p>
          <motion.div 
            key={results.emi}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tighter mb-6 flex items-center"
          >
            <span className="text-3xl opacity-80 mr-1">₹</span>
            {Number(results.emi).toLocaleString()}
          </motion.div>
          
          <div className="w-full space-y-2">
            <div className="bg-white rounded-xl p-3 border border-indigo-100 flex justify-between items-center shadow-sm">
              <span className="text-slate-700 text-sm font-bold">Total Interest</span>
              <span className="text-slate-900 font-bold">₹{Number(results.totalInterest).toLocaleString()}</span>
            </div>
            <div className="bg-white rounded-xl p-3 border border-indigo-100 flex justify-between items-center shadow-sm">
              <span className="text-slate-700 text-sm font-bold">Total Payable</span>
              <span className="text-slate-900 font-bold">₹{Number(results.totalAmount).toLocaleString()}</span>
            </div>
          </div>
        </div>

        <div className="mt-4 p-4 bg-indigo-50/50 rounded-xl border border-indigo-100/80 text-[11px] text-indigo-800/70 text-center font-medium">
          Disclaimer: EMI results are estimates based on the information provided. Actual EMI, interest rates, fees and other charges may vary depending on the lender and loan terms.
        </div>
      </div>
    </div>
  );
}
