"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { PieChart, Copy, Check, RotateCcw } from "lucide-react";

export function MarginCalculator() {
  const [cost, setCost] = useState<string>("");
  const [margin, setMargin] = useState<string>("");
  const [copied, setCopied] = useState(false);

  const calculate = () => {
    const c = parseFloat(cost);
    const m = parseFloat(margin);
    
    if (!isNaN(c) && !isNaN(m) && m < 100) {
      const revenue = c / (1 - (m / 100));
      const grossProfit = revenue - c;
      const markup = (grossProfit / c) * 100;

      return {
        revenue: revenue.toFixed(2),
        profit: grossProfit.toFixed(2),
        markup: markup.toFixed(2)
      };
    }
    return { revenue: "0.00", profit: "0.00", markup: "0.00" };
  };

  const result = calculate();

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const reset = () => {
    setCost("");
    setMargin("");
  };

  return (
    <div className="w-full relative">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-xs font-bold text-slate-900 uppercase tracking-wider">Cost to produce/buy ($)</label>
          <input
            type="number"
            value={cost}
            onChange={(e) => setCost(e.target.value)}
            placeholder="e.g. 50"
            className="w-full text-xl font-bold bg-white border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/10 transition-all"
          />
        </div>
        <div className="space-y-2">
          <label className="text-xs font-bold text-slate-900 uppercase tracking-wider">Desired Gross Margin (%)</label>
          <input
            type="number"
            value={margin}
            onChange={(e) => setMargin(e.target.value)}
            placeholder="e.g. 30"
            className="w-full text-xl font-bold bg-white border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/10 transition-all"
          />
        </div>
      </div>

      {/* Result Box */}
      <div className="bg-cyan-50 border border-cyan-200 rounded-2xl p-5 md:p-6 mt-4 relative overflow-hidden">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-bold text-cyan-900/60">WHOLESALE SELLING PRICE</span>
          <div className="flex items-center gap-1.5">
            <button onClick={() => copyToClipboard(`Wholesale Price: $${result.revenue}`)} className="flex items-center gap-1 px-2.5 py-1.5 bg-white border border-slate-200 rounded-md text-xs font-bold text-cyan-600 hover:bg-cyan-50 transition-colors shadow-sm">
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
              {copied ? "Copied" : "Copy"}
            </button>
            <button onClick={reset} className="p-1.5 text-slate-800 hover:text-slate-900 transition-colors">
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>
        
        <div className="flex items-baseline mb-4">
          <span className="text-4xl md:text-5xl font-extrabold tracking-tight text-[#1e1b4b]">
            ${result.revenue}
          </span>
        </div>
        
        <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-200/60">
          <div>
            <div className="text-[10px] uppercase font-bold text-slate-800 mb-1">Gross Profit</div>
            <div className="text-lg font-bold text-emerald-600">${result.profit}</div>
          </div>
          <div>
            <div className="text-[10px] uppercase font-bold text-slate-800 mb-1">Markup</div>
            <div className="text-lg font-bold text-cyan-600">{result.markup}%</div>
          </div>
        </div>
      </div>
    </div>
  );
}
