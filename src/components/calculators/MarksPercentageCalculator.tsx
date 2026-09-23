"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { GraduationCap, Copy, Check, RotateCcw } from "lucide-react";

export function MarksPercentageCalculator() {
  const [obtained, setObtained] = useState<string>("");
  const [total, setTotal] = useState<string>("");
  const [copied, setCopied] = useState(false);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const reset = () => {
    setObtained("");
    setTotal("");
  };

  const calculate = () => {
    const o = parseFloat(obtained);
    const t = parseFloat(total);

    if (!isNaN(o) && !isNaN(t) && t > 0 && o >= 0) {
      const percentage = (o / t) * 100;
      let grade = "F";
      if (percentage >= 90) grade = "A+";
      else if (percentage >= 80) grade = "A";
      else if (percentage >= 70) grade = "B+";
      else if (percentage >= 60) grade = "B";
      else if (percentage >= 50) grade = "C";
      else if (percentage >= 40) grade = "D";

      return {
        percentage: percentage.toFixed(2),
        grade,
      };
    }

    return { percentage: "0.00", grade: "-" };
  };

  const result = calculate();

  return (
    <div className="w-full md: relative overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-64 bg-rose-500/10 rounded-full blur-[80px] pointer-events-none" />
      
      <div className="relative z-10 space-y-6">
        <div className="space-y-6 bg-rose-50/50 border border-rose-100/50 p-5 md:p-6 rounded-2xl">
          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700">Marks Obtained</label>
            <input
              type="number"
              value={obtained}
              onChange={(e) => setObtained(e.target.value)}
              placeholder="e.g. 450"
              className="w-full bg-slate-50/80 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 focus:outline-none focus:ring-2 focus:ring-rose-500/50 transition-all shadow-inner"
            />
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700">Total / Maximum Marks</label>
            <input
              type="number"
              value={total}
              onChange={(e) => setTotal(e.target.value)}
              placeholder="e.g. 500"
              className="w-full bg-slate-50/80 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 focus:outline-none focus:ring-2 focus:ring-rose-500/50 transition-all shadow-inner"
            />
          </div>
        </div>

        <div className="flex flex-col items-center justify-center p-8 bg-rose-100 rounded-2xl shadow-sm border border-rose-300 relative">
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent" />
          <div className="absolute top-4 right-4 flex items-center gap-1.5 z-10">
            <button onClick={() => {
              const text = `Marks Percentage Calculator
Marks Obtained: ${obtained || 0}
Total / Maximum Marks: ${total || 0}
Final Percentage: ${result.percentage}%
Estimated Grade: ${result.grade}

Calculate Online: https://topcalcbox.com/marks-percentage-calculator/`;
              copyToClipboard(text);
            }} className="flex items-center gap-1 px-3 py-1.5 bg-white border border-rose-200 rounded-lg text-[11px] font-bold text-rose-700 hover:bg-rose-50 transition-colors shadow-sm">
              <span className="inline">{copied ? "Copied" : "Copy"}</span>
            </button>
            <button onClick={reset} className="p-1.5 bg-white border border-rose-200 rounded-lg text-rose-700 hover:bg-rose-50 transition-colors shadow-sm">
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>
          
          <div className="p-3 bg-white rounded-xl shadow-sm mb-4">
            <GraduationCap className="w-8 h-8 text-rose-600" />
          </div>
          
          <p className="text-sm text-rose-800/70 uppercase tracking-widest font-bold mb-1">
            Final Percentage
          </p>
          
          <motion.div 
            key={result.percentage}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="text-5xl md:text-6xl font-extrabold text-slate-900 tracking-tighter mb-4 drop-shadow-sm"
          >
            {result.percentage}<span className="text-3xl font-medium text-rose-700 ml-1">%</span>
          </motion.div>

          <div className="w-full border-t border-rose-300 my-3" />

          <div className="w-full flex justify-center text-sm mt-2">
            <span className="text-rose-800/70 font-medium mr-2">Estimated Grade:</span>
            <span className="text-slate-900 font-bold px-2 py-0.5 bg-white shadow-sm rounded-md">{result.grade}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
