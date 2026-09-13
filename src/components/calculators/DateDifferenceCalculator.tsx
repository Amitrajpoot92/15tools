"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { CalendarRange } from "lucide-react";

export function DateDifferenceCalculator() {
  const [date1, setDate1] = useState<string>("");
  const [date2, setDate2] = useState<string>("");

  const calculateDifference = () => {
    if (!date1 || !date2) return null;

    const d1 = new Date(date1);
    const d2 = new Date(date2);

    const timeDiff = Math.abs(d2.getTime() - d1.getTime());
    const diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
    
    const diffWeeks = (diffDays / 7).toFixed(1);
    const diffMonths = (diffDays / 30.44).toFixed(1); // average month length
    const diffYears = (diffDays / 365.25).toFixed(1);

    return { diffDays, diffWeeks, diffMonths, diffYears };
  };

  const diff = calculateDifference();

  return (
    <div className="bg-white border border-slate-200 rounded-3xl p-6 md:p-10 shadow-2xl shadow-rose-900/5 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-64 bg-rose-500/10 rounded-full blur-[80px] pointer-events-none" />
      
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700">Start Date</label>
            <input
              type="date"
              value={date1}
              onChange={(e) => setDate1(e.target.value)}
              className="w-full bg-slate-50/80 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 focus:outline-none focus:ring-2 focus:ring-rose-500/50 transition-all shadow-inner"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700">End Date</label>
            <input
              type="date"
              value={date2}
              onChange={(e) => setDate2(e.target.value)}
              className="w-full bg-slate-50/80 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 focus:outline-none focus:ring-2 focus:ring-rose-500/50 transition-all shadow-inner"
            />
          </div>
        </div>

        <div className="flex flex-col items-center justify-center p-8 bg-gradient-to-br from-rose-500 to-rose-600 rounded-2xl h-full min-h-[250px] shadow-lg shadow-rose-500/30 border border-rose-400/30 relative overflow-hidden">
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent" />
          
          <div className="p-3 bg-white rounded-xl shadow-sm mb-4">
            <CalendarRange className="w-8 h-8 text-rose-600" />
          </div>
          
          <p className="text-sm text-rose-100 uppercase tracking-widest font-bold mb-4">
            Duration Between Dates
          </p>
          
          <div className="w-full text-center text-white">
            {diff ? (
              <motion.div 
                key={diff.diffDays}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="space-y-3"
              >
                <div className="text-5xl md:text-6xl font-extrabold tracking-tighter drop-shadow-sm">
                  {diff.diffDays} <span className="text-2xl font-medium opacity-80">Days</span>
                </div>
                <div className="grid grid-cols-3 gap-2 mt-4 pt-4 border-t border-rose-400/50">
                  <div className="flex flex-col">
                    <span className="font-bold text-lg">{diff.diffWeeks}</span>
                    <span className="text-xs text-rose-200">Weeks</span>
                  </div>
                  <div className="flex flex-col border-l border-r border-rose-400/50">
                    <span className="font-bold text-lg">{diff.diffMonths}</span>
                    <span className="text-xs text-rose-200">Months</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="font-bold text-lg">{diff.diffYears}</span>
                    <span className="text-xs text-rose-200">Years</span>
                  </div>
                </div>
              </motion.div>
            ) : (
              <div className="text-rose-200 font-medium opacity-80 py-4">
                Select start and end dates
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
