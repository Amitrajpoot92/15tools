"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Clock } from "lucide-react";

export function AgeDifferenceCalculator() {
  const [date1, setDate1] = useState<string>("");
  const [date2, setDate2] = useState<string>("");

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
      
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
        <div className="space-y-6">
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

        <div className="flex flex-col items-center justify-center p-8 bg-gradient-to-br from-amber-500 to-amber-600 rounded-2xl h-full min-h-[250px] shadow-lg shadow-amber-500/30 border border-amber-400/30 relative overflow-hidden">
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent" />
          
          <div className="p-3 bg-white rounded-xl shadow-sm mb-4">
            <Clock className="w-8 h-8 text-amber-600" />
          </div>
          
          <p className="text-sm text-amber-100 uppercase tracking-widest font-bold mb-2">
            Exact Difference
          </p>
          
          <div className="text-center w-full">
            {diff ? (
              <motion.div 
                key={`${diff.years}-${diff.months}-${diff.days}`}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="flex flex-col items-center gap-1 text-white"
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
              <div className="text-center text-amber-200 font-medium opacity-80 py-4">
                Select both dates to compare
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
