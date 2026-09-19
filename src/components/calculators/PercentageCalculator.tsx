"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Copy, RotateCcw, Check } from "lucide-react";

type Mode = "what_is_x_percent_of_y" | "x_is_what_percent_of_y" | "percentage_change";

export function PercentageCalculator() {
  const [mode, setMode] = useState<Mode>("what_is_x_percent_of_y");
  
  // State for What is X% of Y
  const [percX, setPercX] = useState("15");
  const [percY, setPercY] = useState("100");

  // State for X is what % of Y
  const [whatX, setWhatX] = useState("15");
  const [whatY, setWhatY] = useState("100");

  // State for % Change
  const [changeX, setChangeX] = useState("100");
  const [changeY, setChangeY] = useState("150");

  const [copied, setCopied] = useState(false);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const renderResult = () => {
    if (mode === "what_is_x_percent_of_y") {
      const x = parseFloat(percX);
      const y = parseFloat(percY);
      if (isNaN(x) || isNaN(y)) return { text: "Result", value: "0", symbol: "" };
      const res = (x / 100) * y;
      return {
        text: `${x}% of ${y}`,
        value: Number.isInteger(res) ? res.toString() : res.toFixed(2),
        symbol: ""
      };
    } else if (mode === "x_is_what_percent_of_y") {
      const x = parseFloat(whatX);
      const y = parseFloat(whatY);
      if (isNaN(x) || isNaN(y) || y === 0) return { text: "Result", value: "0", symbol: "%" };
      const res = (x / y) * 100;
      return {
        text: `${x} is what % of ${y}`,
        value: Number.isInteger(res) ? res.toString() : res.toFixed(2),
        symbol: "%"
      };
    } else {
      const x = parseFloat(changeX);
      const y = parseFloat(changeY);
      if (isNaN(x) || isNaN(y) || x === 0) return { text: "Result", value: "0", symbol: "%" };
      const diff = y - x;
      const res = (Math.abs(diff) / Math.abs(x)) * 100;
      const changeType = diff >= 0 ? "Increase" : "Decrease";
      return {
        text: `${changeType} from ${x} to ${y}`,
        value: Number.isInteger(res) ? res.toString() : res.toFixed(2),
        symbol: "%",
        color: diff >= 0 ? "text-emerald-600" : "text-rose-600",
        barColor: diff >= 0 ? "bg-emerald-500" : "bg-rose-500"
      };
    }
  };

  const result = renderResult();

  const reset = () => {
    if (mode === "what_is_x_percent_of_y") {
      setPercX(""); setPercY("");
    } else if (mode === "x_is_what_percent_of_y") {
      setWhatX(""); setWhatY("");
    } else {
      setChangeX(""); setChangeY("");
    }
  };

  return (
    <div className="w-full">
      {/* Tabs */}
      <div className="bg-slate-50 p-1.5 rounded-2xl grid grid-cols-1 sm:grid-cols-3 gap-1 mb-5">
        <button
          onClick={() => setMode("what_is_x_percent_of_y")}
          className={`py-2 px-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${mode === "what_is_x_percent_of_y" ? "bg-white text-indigo-600 shadow-sm border border-slate-200/50" : "text-slate-500 hover:text-slate-700"}`}
        >
          What is X% of Y?
        </button>
        <button
          onClick={() => setMode("x_is_what_percent_of_y")}
          className={`py-2 px-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${mode === "x_is_what_percent_of_y" ? "bg-white text-indigo-600 shadow-sm border border-slate-200/50" : "text-slate-500 hover:text-slate-700"}`}
        >
          X is what % of Y?
        </button>
        <button
          onClick={() => setMode("percentage_change")}
          className={`py-2 px-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${mode === "percentage_change" ? "bg-white text-indigo-600 shadow-sm border border-slate-200/50" : "text-slate-500 hover:text-slate-700"}`}
        >
          % Change (Inc/Dec)
        </button>
      </div>

      <div className="space-y-5">
        <AnimatePresence mode="wait">
          {mode === "what_is_x_percent_of_y" && (
            <motion.div key="what" initial={{opacity:0, y:10}} animate={{opacity:1, y:0}} exit={{opacity:0, y:-10}} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Percentage (%)</label>
                <div className="relative">
                  <input type="number" value={percX} onChange={(e)=>setPercX(e.target.value)} className="w-full text-xl font-bold bg-white border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/10 transition-all pr-10" />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-lg text-slate-400 font-bold">%</span>
                </div>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {[5, 10, 15, 20, 25, 50].map(v => (
                    <button key={v} onClick={() => setPercX(v.toString())} className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-600 text-[11px] font-bold rounded-md transition-colors">
                      {v}%
                    </button>
                  ))}
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Total Value (Of Y)</label>
                <input type="number" value={percY} onChange={(e)=>setPercY(e.target.value)} className="w-full text-xl font-bold bg-white border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/10 transition-all" />
              </div>
            </motion.div>
          )}

          {mode === "x_is_what_percent_of_y" && (
            <motion.div key="x_is" initial={{opacity:0, y:10}} animate={{opacity:1, y:0}} exit={{opacity:0, y:-10}} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Value (X)</label>
                <input type="number" value={whatX} onChange={(e)=>setWhatX(e.target.value)} className="w-full text-xl font-bold bg-white border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/10 transition-all" />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Total Value (Of Y)</label>
                <input type="number" value={whatY} onChange={(e)=>setWhatY(e.target.value)} className="w-full text-xl font-bold bg-white border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/10 transition-all" />
              </div>
            </motion.div>
          )}

          {mode === "percentage_change" && (
            <motion.div key="change" initial={{opacity:0, y:10}} animate={{opacity:1, y:0}} exit={{opacity:0, y:-10}} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Initial Value (From)</label>
                <input type="number" value={changeX} onChange={(e)=>setChangeX(e.target.value)} className="w-full text-xl font-bold bg-white border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/10 transition-all" />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Final Value (To)</label>
                <input type="number" value={changeY} onChange={(e)=>setChangeY(e.target.value)} className="w-full text-xl font-bold bg-white border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/10 transition-all" />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Result Box */}
        <div className="bg-[#f8f9fc] border border-slate-100 rounded-2xl p-5 md:p-6 mt-4 relative overflow-hidden">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-indigo-900/60">{result.text}</span>
            <div className="flex items-center gap-1.5">
              <button onClick={() => copyToClipboard(`${result.text} = ${result.value}${result.symbol ? result.symbol : ""}`)} className="flex items-center gap-1 px-2.5 py-1.5 bg-white border border-slate-200 rounded-md text-xs font-bold text-indigo-600 hover:bg-indigo-50 transition-colors shadow-sm">
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                {copied ? "Copied" : "Copy"}
              </button>
              <button onClick={reset} className="p-1.5 text-slate-400 hover:text-slate-600 transition-colors">
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>
          </div>
          
          <div className="flex items-baseline mb-3">
            <span className={`text-4xl md:text-5xl font-extrabold tracking-tight ${result.color ? result.color : 'text-[#1e1b4b]'}`}>
              {result.value}
            </span>
            {result.symbol && (
              <span className={`text-2xl font-bold ml-1 ${result.color ? result.color : 'text-indigo-600'}`}>{result.symbol}</span>
            )}
          </div>
          
          {/* Progress bar effect like screenshot */}
          <div className="h-1.5 w-24 bg-indigo-100 rounded-full overflow-hidden">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: result.value !== '0' ? '100%' : '0%' }}
              transition={{ duration: 0.5 }}
              className={`h-full rounded-full ${result.barColor || 'bg-indigo-600'}`}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
