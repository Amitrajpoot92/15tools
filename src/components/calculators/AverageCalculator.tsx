"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Sigma } from "lucide-react";

export function AverageCalculator() {
  const [input, setInput] = useState<string>("");

  const calculateStats = () => {
    // Parse input string to array of numbers
    const numStrings = input.split(/[,;\s]+/).filter(Boolean);
    const nums = numStrings.map(n => parseFloat(n)).filter(n => !isNaN(n));
    
    if (nums.length === 0) {
      return { mean: "0", median: "0", sum: "0", count: "0" };
    }

    const sum = nums.reduce((a, b) => a + b, 0);
    const mean = sum / nums.length;
    
    const sorted = [...nums].sort((a, b) => a - b);
    const mid = Math.floor(sorted.length / 2);
    const median = sorted.length % 2 === 0 
      ? (sorted[mid - 1] + sorted[mid]) / 2 
      : sorted[mid];

    return {
      mean: (mean % 1 === 0 ? mean : mean.toFixed(2)).toString(),
      median: (median % 1 === 0 ? median : median.toFixed(2)).toString(),
      sum: (sum % 1 === 0 ? sum : sum.toFixed(2)).toString(),
      count: nums.length.toString()
    };
  };

  const stats = calculateStats();

  return (
    <div className="bg-white border border-slate-200 rounded-3xl p-5 md:p-6 shadow-2xl shadow-orange-900/5 relative overflow-hidden">
      {/* Premium Background decoration */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-orange-500/10 rounded-full blur-[80px] pointer-events-none" />
      
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
        <div className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700">Enter Numbers (separated by commas or spaces)</label>
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="e.g. 10, 20, 30, 40"
              rows={4}
              className="w-full bg-slate-50/80 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-500/50 transition-all shadow-inner resize-none"
            />
          </div>
        </div>

        <div className="flex flex-col items-center justify-center p-6 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl h-full shadow-lg shadow-orange-500/30 border border-orange-400/30 relative overflow-hidden">
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent" />
          
          <div className="w-full grid grid-cols-2 gap-3 mt-2">
            <div className="bg-white/10 border border-white/20 rounded-xl p-3 flex flex-col items-center">
              <p className="text-xs text-orange-200 uppercase tracking-wider font-bold mb-1">Average (Mean)</p>
              <motion.div key={`mean-${stats.mean}`} initial={{ scale: 0.9 }} animate={{ scale: 1 }} className="text-2xl font-bold text-white">
                {stats.mean}
              </motion.div>
            </div>
            
            <div className="bg-white/10 border border-white/20 rounded-xl p-3 flex flex-col items-center">
              <p className="text-xs text-orange-200 uppercase tracking-wider font-bold mb-1">Median</p>
              <motion.div key={`median-${stats.median}`} initial={{ scale: 0.9 }} animate={{ scale: 1 }} className="text-2xl font-bold text-white">
                {stats.median}
              </motion.div>
            </div>
            
            <div className="bg-white/10 border border-white/20 rounded-xl p-3 flex flex-col items-center">
              <p className="text-xs text-orange-200 uppercase tracking-wider font-bold mb-1">Sum</p>
              <motion.div key={`sum-${stats.sum}`} initial={{ scale: 0.9 }} animate={{ scale: 1 }} className="text-2xl font-bold text-white">
                {stats.sum}
              </motion.div>
            </div>
            
            <div className="bg-white/10 border border-white/20 rounded-xl p-3 flex flex-col items-center">
              <p className="text-xs text-orange-200 uppercase tracking-wider font-bold mb-1">Count</p>
              <motion.div key={`count-${stats.count}`} initial={{ scale: 0.9 }} animate={{ scale: 1 }} className="text-2xl font-bold text-white">
                {stats.count}
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
