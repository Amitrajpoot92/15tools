"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ClipboardCheck } from "lucide-react";

export function AttendanceCalculator() {
  const [attended, setAttended] = useState<string>("");
  const [total, setTotal] = useState<string>("");
  const [target, setTarget] = useState<string>("75");

  const calculate = () => {
    const a = parseInt(attended);
    const t = parseInt(total);
    const targetPercent = parseFloat(target);

    if (!isNaN(a) && !isNaN(t) && t > 0 && a >= 0 && a <= t) {
      const currentPercent = (a / t) * 100;
      let status = "";
      
      if (!isNaN(targetPercent) && targetPercent > 0 && targetPercent <= 100) {
        if (currentPercent < targetPercent) {
          // Need to attend more classes to reach target
          // (a + x) / (t + x) = target / 100
          // 100a + 100x = target*t + target*x
          // x(100 - target) = target*t - 100a
          const needed = Math.ceil(((targetPercent * t) - (100 * a)) / (100 - targetPercent));
          status = `You need to attend ${needed} more class(es) to reach ${targetPercent}%.`;
        } else {
          // Can skip some classes and stay above target
          // a / (t + x) = target / 100
          // 100a = target*t + target*x
          // target*x = 100a - target*t
          const canSkip = Math.floor(((100 * a) - (targetPercent * t)) / targetPercent);
          status = `You can skip ${canSkip} class(es) and stay above ${targetPercent}%.`;
        }
      }

      return {
        percentage: currentPercent.toFixed(1),
        status,
      };
    }

    return { percentage: "0.0", status: "" };
  };

  const result = calculate();

  return (
    <div className="w-full md: relative overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-64 bg-orange-500/10 rounded-full blur-[80px] pointer-events-none" />
      
      <div className="relative z-10 space-y-6">
        <div className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700">Classes Held (Total)</label>
            <input
              type="number"
              value={total}
              onChange={(e) => setTotal(e.target.value)}
              placeholder="e.g. 50"
              className="w-full bg-slate-50/80 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 focus:outline-none focus:ring-2 focus:ring-orange-500/50 transition-all shadow-inner"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700">Classes Attended</label>
            <input
              type="number"
              value={attended}
              onChange={(e) => setAttended(e.target.value)}
              placeholder="e.g. 35"
              className="w-full bg-slate-50/80 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 focus:outline-none focus:ring-2 focus:ring-orange-500/50 transition-all shadow-inner"
            />
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700">Target Attendance (%)</label>
            <input
              type="number"
              value={target}
              onChange={(e) => setTarget(e.target.value)}
              placeholder="e.g. 75"
              className="w-full bg-slate-50/80 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 focus:outline-none focus:ring-2 focus:ring-orange-500/50 transition-all shadow-inner"
            />
          </div>
        </div>

        <div className="flex flex-col items-center justify-center p-8 bg-orange-100 rounded-2xl shadow-sm border border-orange-300">
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent" />
          
          <div className="p-3 bg-white rounded-xl shadow-sm mb-4">
            <ClipboardCheck className="w-8 h-8 text-orange-600" />
          </div>
          
          <p className="text-sm text-orange-800/70 uppercase tracking-widest font-bold mb-1">
            Current Attendance
          </p>
          
          <motion.div 
            key={result.percentage}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="text-5xl md:text-6xl font-extrabold text-slate-900 tracking-tighter mb-4 drop-shadow-sm"
          >
            {result.percentage}<span className="text-3xl font-medium text-orange-700 ml-1">%</span>
          </motion.div>

          <div className="w-full border-t border-orange-300 my-3" />

          <div className="w-full flex justify-center text-center text-sm mt-2">
            <span className="text-slate-900 font-medium">{result.status}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
