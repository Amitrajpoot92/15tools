"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Clock, Copy, Check } from "lucide-react";

export function AgeDifferenceCalculator() {
  const [date1, setDate1] = useState<string>("");
  const [date2, setDate2] = useState<string>("");
  const [copied, setCopied] = useState(false);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const calculateDifference = () => {
    if (!date1 || !date2) return null;

    const d1 = new Date(date1);
    const d2 = new Date(date2);

    let olderDate = d1 < d2 ? d1 : d2;
    let youngerDate = d1 < d2 ? d2 : d1;

    let years = youngerDate.getFullYear() - olderDate.getFullYear();
    let months = youngerDate.getMonth() - olderDate.getMonth();
    let days = youngerDate.getDate() - olderDate.getDate();

    if (days < 0) {
      months--;
      const previousMonth = new Date(youngerDate.getFullYear(), youngerDate.getMonth(), 0);
      days += previousMonth.getDate();
    }

    if (months < 0) {
      years--;
      months += 12;
    }

    return { years, months, days };
  };

  const diff = calculateDifference();

  return (
    <div className="w-full md: relative overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/10 rounded-full blur-[80px] pointer-events-none" />
      
      <div className="relative z-10 space-y-6">
        <div className="space-y-6 bg-amber-50/50 border border-amber-100/50 p-5 md:p-6 rounded-2xl">
          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700">First Person's DOB</label>
            <input
              type="date"
              value={date1}
              onChange={(e) => setDate1(e.target.value)}
              className="w-full bg-slate-50/80 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500/50 transition-all shadow-inner"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700">Second Person's DOB</label>
            <input
              type="date"
              value={date2}
              onChange={(e) => setDate2(e.target.value)}
              className="w-full bg-slate-50/80 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500/50 transition-all shadow-inner"
            />
          </div>
        </div>

        <div className="flex flex-col items-center justify-center p-8 bg-amber-100 rounded-2xl shadow-sm border border-amber-300 relative">
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent" />
          <button onClick={() => {
            const text = `Age Difference Calculator
First Person's DOB: ${date1}
Second Person's DOB: ${date2}
Exact Difference: ${diff ? `${diff.years} yrs, ${diff.months} mos, ${diff.days} days` : ''}

Calculate Online: https://topcalcbox.com/age-difference-calculator/`;
            copyToClipboard(text);
          }} className="absolute top-4 right-4 flex items-center gap-1 px-3 py-1.5 bg-white border border-amber-200 rounded-lg text-[11px] font-bold text-amber-700 hover:bg-amber-50 transition-colors shadow-sm z-10">
            <span className="inline">{copied ? "Copied" : "Copy"}</span>
          </button>
          
          <div className="p-3 bg-white rounded-xl shadow-sm mb-4">
            <Clock className="w-8 h-8 text-amber-600" />
          </div>
          
          <p className="text-sm text-amber-800/70 uppercase tracking-widest font-bold mb-2">
            Exact Difference
          </p>
          
          <div className="text-center w-full">
            {diff ? (
              <motion.div 
                key={`${diff.years}-${diff.months}-${diff.days}`}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="flex flex-col items-center gap-1 text-slate-900"
              >
                <div className="text-4xl md:text-5xl font-extrabold tracking-tighter drop-shadow-sm">
                  {diff.years} <span className="text-2xl opacity-80">yrs</span>
                </div>
                <div className="text-2xl font-bold tracking-tight">
                  {diff.months} <span className="text-lg opacity-80">mos</span> &nbsp;
                  {diff.days} <span className="text-lg opacity-80">days</span>
                </div>
              </motion.div>
            ) : (
              <div className="text-center text-amber-700 font-medium opacity-80 py-4">
                Select both dates to compare
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
