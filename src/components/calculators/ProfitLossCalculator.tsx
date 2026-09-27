"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { TrendingUp, TrendingDown, DollarSign, IndianRupee, Copy, RotateCcw, Check } from "lucide-react";

export function ProfitLossCalculator() {
  const [costPrice, setCostPrice] = useState<string>("");
  const [sellingPrice, setSellingPrice] = useState<string>("");
  const [expenses, setExpenses] = useState<string>("");
  const [currency, setCurrency] = useState<"₹" | "$">("₹");
  const [copied, setCopied] = useState(false);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const reset = () => {
    setCostPrice("");
    setSellingPrice("");
    setExpenses("");
  };

  const calculate = () => {
    const cp = parseFloat(costPrice) || 0;
    const sp = parseFloat(sellingPrice) || 0;
    const exp = parseFloat(expenses) || 0;
    const totalCost = cp + exp;
    
    if (totalCost >= 0 && sp >= 0 && (costPrice || sellingPrice)) {
      if (sp >= totalCost) {
        const profit = sp - totalCost;
        const margin = totalCost > 0 ? (profit / totalCost) * 100 : 0;
        return { type: "profit", amount: profit, margin: margin, totalCost: totalCost };
      } else {
        const loss = totalCost - sp;
        const lossMargin = totalCost > 0 ? (loss / totalCost) * 100 : 0;
        return { type: "loss", amount: loss, margin: lossMargin, totalCost: totalCost };
      }
    }
    return { type: "none", amount: 0, margin: 0, totalCost: 0 };
  };

  const result = calculate();

  const formatNumber = (num: number, maxDigits = 2) => {
    return num.toLocaleString(currency === '₹' ? 'en-IN' : 'en-US', {
      maximumFractionDigits: maxDigits,
    });
  };

  return (
    <div className="w-full relative overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-[80px] pointer-events-none" />
      
      {/* Currency Toggle */}
      <div className="flex justify-end mb-4">
        <div className="bg-slate-50 border border-slate-100 p-1 rounded-lg flex items-center shadow-sm">
          <button 
            onClick={() => setCurrency("$")}
            className={`px-3 py-1.5 rounded-md transition-all font-bold text-sm ${currency === "$" ? "bg-white shadow-sm text-emerald-700" : "text-slate-500 hover:text-slate-700"}`}
          >
            <DollarSign className="w-4 h-4" />
          </button>
          <button 
            onClick={() => setCurrency("₹")}
            className={`px-3 py-1.5 rounded-md transition-all font-bold text-sm ${currency === "₹" ? "bg-white shadow-sm text-emerald-700" : "text-slate-500 hover:text-slate-700"}`}
          >
            <IndianRupee className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="relative z-10 flex flex-col gap-6 items-start w-full">
        <div className="w-full space-y-5 bg-emerald-50/50 border border-emerald-100/50 p-5 rounded-2xl">
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
              Cost Price (CP)
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-lg text-slate-400 font-bold">{currency}</span>
              <input
                type="number"
                value={costPrice}
                onChange={(e) => setCostPrice(e.target.value)}
                placeholder="500"
                className="w-full bg-white border border-slate-200 rounded-xl pl-10 pr-4 py-3 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/10 transition-all text-xl font-bold"
              />
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
              Selling Price (SP)
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-lg text-slate-400 font-bold">{currency}</span>
              <input
                type="number"
                value={sellingPrice}
                onChange={(e) => setSellingPrice(e.target.value)}
                placeholder="600"
                className={`w-full bg-white border rounded-xl pl-10 pr-4 py-3 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/10 transition-all text-xl font-bold ${sellingPrice ? 'border-emerald-400' : 'border-slate-200'}`}
              />
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
              Other Costs / Expenses <span className="text-slate-400 font-medium normal-case">(Optional)</span>
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-lg text-slate-400 font-bold">{currency}</span>
              <input
                type="number"
                value={expenses}
                onChange={(e) => setExpenses(e.target.value)}
                placeholder="e.g. 50"
                className="w-full bg-white border border-slate-200 rounded-xl pl-10 pr-4 py-3 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/10 transition-all text-xl font-bold"
              />
            </div>
          </div>
        </div>

        <div className={`flex flex-col items-center justify-center p-6 md:p-8 bg-gradient-to-b from-slate-50 ${result.type === 'loss' ? 'to-rose-50/40' : 'to-emerald-50/40'} rounded-3xl shadow-[0_8px_30px_rgba(0,0,0,0.04)] border ${result.type === 'loss' ? 'border-rose-200/60' : 'border-emerald-200/60'} relative overflow-hidden mt-6 w-full`}>
          <div className={`absolute inset-0 bg-[linear-gradient(to_right,${result.type === 'loss' ? '#e11d4808' : '#10b98108'}_1px,transparent_1px),linear-gradient(to_bottom,${result.type === 'loss' ? '#e11d4808' : '#10b98108'}_1px,transparent_1px)] bg-[size:24px_24px]`} />
          
          <div className="w-full flex justify-between items-center mb-6 z-10 flex-wrap gap-4">
            <div className={`flex items-center gap-2 ${result.type === 'loss' ? 'text-rose-800' : 'text-emerald-800'}`}>
               {result.type === 'loss' ? <TrendingDown className="w-4 h-4" /> : <TrendingUp className="w-4 h-4" />}
               <h3 className="font-bold text-sm md:text-base uppercase tracking-wider">{result.type === 'loss' ? 'Loss Result' : 'Profit Result'}</h3>
            </div>
            <div className="flex items-center gap-2 ml-auto">
              <button 
                onClick={() => {
                  const text = `Profit and Loss Calculator
Cost Price: ${currency}${costPrice || 0}
Selling Price: ${currency}${sellingPrice || 0}
${expenses ? `Other Costs / Expenses: ${currency}${expenses}\n` : ''}${result.type === 'loss' ? 'Loss' : 'Profit'}: ${currency}${formatNumber(result.amount)}
${result.type === 'loss' ? 'Loss' : 'Profit'} Percentage: ${formatNumber(result.margin)}%

Calculate Online: https://topcalcbox.com/profit-and-loss-calculator/`;
                  copyToClipboard(text);
                }} 
                className={`flex items-center gap-1.5 px-3 py-1.5 bg-white/80 backdrop-blur-md border rounded-xl text-[11px] font-bold hover:bg-white transition-all shadow-sm ${result.type === 'loss' ? 'border-rose-200 text-rose-700' : 'border-emerald-200 text-emerald-700'}`}
              >
                <span className="inline">{copied ? "Copied" : "Copy"}</span>
              </button>
              <button 
                onClick={reset}
                className={`p-1.5 bg-white/80 backdrop-blur-md border rounded-xl hover:bg-white transition-all shadow-sm ${result.type === 'loss' ? 'border-rose-200 text-rose-700' : 'border-emerald-200 text-emerald-700'}`}
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
          
          <div className="w-full z-10">
            <motion.div 
              key={`${result.type}-${result.amount}`}
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="w-full space-y-4"
            >
              <div className={`bg-white/80 backdrop-blur-sm shadow-sm border rounded-2xl p-6 flex flex-col items-center justify-center text-center ${result.type === 'loss' ? 'border-rose-200/50' : 'border-emerald-200/50'}`}>
                <p className={`text-[10px] font-bold uppercase tracking-widest mb-2 ${result.type === 'loss' ? 'text-rose-800/70' : 'text-emerald-800/70'}`}>
                  {result.type === 'loss' ? 'Total Loss' : 'Total Profit'}
                </p>
                <div className={`text-4xl md:text-5xl font-extrabold tracking-tighter mb-3 drop-shadow-sm truncate px-2 w-full ${result.type === 'loss' ? 'text-rose-600' : 'text-emerald-600'}`}>
                  <span className="text-2xl md:text-3xl font-bold text-slate-400 mr-1">{currency}</span>{formatNumber(result.amount)}
                </div>
                {result.amount !== 0 && (
                  <div className={`px-4 py-1.5 rounded-full text-xs font-bold border ${result.type === 'loss' ? 'bg-rose-100/50 border-rose-200 text-rose-800' : 'bg-emerald-100/50 border-emerald-200 text-emerald-800'}`}>
                    {formatNumber(result.margin)}% {result.type === 'loss' ? 'Loss on Cost' : 'Profit on Cost'}
                  </div>
                )}
              </div>

              {/* Target Cards */}
              <div className={`bg-white/80 backdrop-blur-sm shadow-sm border rounded-2xl p-5 ${result.type === 'loss' ? 'border-rose-200/50' : 'border-emerald-200/50'}`}>
                <div className="space-y-3">
                  <div className="flex justify-between items-center p-3 rounded-xl bg-slate-50/80 border border-slate-100">
                    <span className="text-slate-600 font-bold">Total Cost</span>
                    <span className="text-slate-900 font-black truncate max-w-[50%]">{currency}{formatNumber(result.totalCost)}</span>
                  </div>
                  <div className="flex justify-between items-center p-3 rounded-xl bg-slate-50/80 border border-slate-100">
                    <span className="text-slate-600 font-bold">Selling Price</span>
                    <span className="text-slate-900 font-black truncate max-w-[50%]">{currency}{formatNumber(parseFloat(sellingPrice) || 0)}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
