"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Sigma, Copy, Check, RotateCcw } from "lucide-react";

export function AverageCalculator() {
  const [input, setInput] = useState<string>("");
  const [copied, setCopied] = useState(false);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const reset = () => {
    setInput("");
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    let val = e.target.value;
    
    if (val.length > input.length) {
      if (val.endsWith(' ') && /[0-9]$/.test(val.slice(0, -1))) {
         val = val.slice(0, -1) + ', ';
      } else if (val.endsWith(',') && /[0-9]$/.test(val.slice(0, -1))) {
         val = val + ' ';
      }
      
      val = val.replace(/([0-9])\s+([0-9])/g, '$1, $2');
      val = val.replace(/([0-9]),([0-9])/g, '$1, $2');
    }
    
    setInput(val);
  };

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
    <div className="w-full md: relative overflow-hidden">
      {/* Premium Background decoration */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-orange-500/10 rounded-full blur-[80px] pointer-events-none" />
      
      <div className="relative z-10 space-y-6">
        <div className="space-y-6 bg-orange-50/50 border border-orange-100/50 p-5 md:p-6 rounded-2xl">
          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700">Enter Numbers (separated by commas or spaces)</label>
            <textarea
              value={input}
              onChange={handleChange}
              placeholder="e.g. 10, 20, 30, 40"
              rows={4}
              className="w-full bg-slate-50/80 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-500/50 transition-all shadow-inner resize-none"
            />
          </div>
        </div>

        <div className="flex flex-col items-center justify-center p-6 bg-gradient-to-b from-orange-50 to-orange-100/80 rounded-3xl shadow-[0_8px_30px_rgb(249,115,22,0.15)] border border-orange-200/60 relative overflow-hidden">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#f9731610_1px,transparent_1px),linear-gradient(to_bottom,#f9731610_1px,transparent_1px)] bg-[size:24px_24px]" />
          
          <div className="w-full flex justify-between items-center z-10 mb-4">
            <div className="flex items-center gap-2">
               <div className="p-2 bg-white rounded-xl shadow-sm border border-orange-200/50">
                  <Sigma className="w-5 h-5 text-orange-600" />
               </div>
               <span className="text-sm font-extrabold text-orange-800/80 uppercase tracking-widest">Results</span>
            </div>
            
            <div className="flex items-center gap-1.5">
              <button onClick={() => {
                const text = `Average Calculator
Numbers: ${input}
Average (Mean): ${stats.mean}
Median: ${stats.median}
Sum: ${stats.sum}
Count: ${stats.count}

Calculate Online: https://topcalcbox.com/average-calculator/`;
                copyToClipboard(text);
              }} className="flex items-center gap-1.5 px-3 py-1.5 bg-white/80 backdrop-blur-md border border-orange-200 rounded-xl text-[11px] font-bold text-orange-700 hover:bg-white transition-all shadow-sm">
                {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span className="inline">{copied ? "Copied" : "Copy"}</span>
              </button>
              <button onClick={reset} className="p-1.5 bg-white/80 backdrop-blur-md border border-orange-200 rounded-xl text-orange-700 hover:bg-white transition-all shadow-sm">
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
          
          <div className="w-full grid grid-cols-2 gap-4 mt-2 z-10">
            <div className="bg-white/70 backdrop-blur-sm shadow-sm border border-orange-200/50 rounded-2xl p-4 flex flex-col items-center text-center">
              <p className="text-[11px] text-orange-800/70 uppercase tracking-wider font-bold mb-1">Average (Mean)</p>
              <motion.div key={`mean-${stats.mean}`} initial={{ scale: 0.9 }} animate={{ scale: 1 }} className="text-3xl font-extrabold text-slate-900 drop-shadow-sm">
                {stats.mean}
              </motion.div>
            </div>
            
            <div className="bg-white/70 backdrop-blur-sm shadow-sm border border-orange-200/50 rounded-2xl p-4 flex flex-col items-center text-center">
              <p className="text-[11px] text-orange-800/70 uppercase tracking-wider font-bold mb-1">Median</p>
              <motion.div key={`median-${stats.median}`} initial={{ scale: 0.9 }} animate={{ scale: 1 }} className="text-3xl font-extrabold text-slate-900 drop-shadow-sm">
                {stats.median}
              </motion.div>
            </div>
            
            <div className="bg-white/70 backdrop-blur-sm shadow-sm border border-orange-200/50 rounded-2xl p-4 flex flex-col items-center text-center">
              <p className="text-[11px] text-orange-800/70 uppercase tracking-wider font-bold mb-1">Sum</p>
              <motion.div key={`sum-${stats.sum}`} initial={{ scale: 0.9 }} animate={{ scale: 1 }} className="text-3xl font-extrabold text-slate-900 drop-shadow-sm">
                {stats.sum}
              </motion.div>
            </div>
            
            <div className="bg-white/70 backdrop-blur-sm shadow-sm border border-orange-200/50 rounded-2xl p-4 flex flex-col items-center text-center">
              <p className="text-[11px] text-orange-800/70 uppercase tracking-wider font-bold mb-1">Count</p>
              <motion.div key={`count-${stats.count}`} initial={{ scale: 0.9 }} animate={{ scale: 1 }} className="text-3xl font-extrabold text-slate-900 drop-shadow-sm">
                {stats.count}
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
