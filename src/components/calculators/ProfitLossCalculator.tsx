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
        return { type: "profit", amount: profit.toFixed(2), margin: margin.toFixed(2), totalCost: totalCost.toFixed(2) };
      } else {
        const loss = totalCost - sp;
        const lossMargin = totalCost > 0 ? (loss / totalCost) * 100 : 0;
        return { type: "loss", amount: loss.toFixed(2), margin: lossMargin.toFixed(2), totalCost: totalCost.toFixed(2) };
      }
    }
    return { type: "none", amount: "0.00", margin: "0.00", totalCost: "0.00" };
  };

  const result = calculate();

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

        <div className={`w-full ${result.type === 'loss' ? 'bg-rose-100 border-rose-300' : 'bg-emerald-100 border-emerald-300'} rounded-2xl p-5 md:p-6 mt-1 relative overflow-hidden h-full flex flex-col justify-between shadow-sm`}>
          <div className="flex items-start justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className={`p-2.5 rounded-xl ${result.type === 'loss' ? 'bg-[#fde8e8] text-[#c81e1e]' : 'bg-[#e2f7ec] text-[#064e3b]'}`}>
                {result.type === 'loss' ? <TrendingDown className="w-5 h-5" strokeWidth={3} /> : <Check className="w-5 h-5" strokeWidth={3} />}
              </div>
              <div>
                <p className={`text-[13px] font-bold uppercase tracking-wider ${result.type === 'loss' ? 'text-rose-700' : 'text-emerald-700'}`}>
                  {result.type === 'loss' ? 'Loss' : 'Profit'}
                </p>
                <p className="text-[11px] text-slate-500 font-medium mt-0.5">
                  {result.type === 'loss' ? 'Your selling price is below total cost' : 'Your selling price is above total cost'}
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-2 ml-2">
              <button onClick={() => {
                const text = `Profit and Loss Calculator
Cost Price: ${currency}${costPrice || 0}
Selling Price: ${currency}${sellingPrice || 0}
${result.type === 'loss' ? 'Loss' : 'Profit'}: ${currency}${result.amount}
${result.type === 'loss' ? 'Loss' : 'Profit'} Percentage: ${result.margin}%

Calculate Online: https://topcalcbox.com/profit-loss-calculator/`;
                copyToClipboard(text);
              }} className={`flex items-center gap-1 px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-[11px] font-bold transition-colors shadow-sm ${result.type === 'loss' ? 'text-rose-700 hover:bg-rose-50' : 'text-emerald-700 hover:bg-emerald-50'}`}>
                <span className="inline">{copied ? "Copied" : "Copy"}</span>
              </button>
              <button onClick={reset} className={`p-1.5 bg-white border border-slate-200 rounded-lg transition-colors shadow-sm ${result.type === 'loss' ? 'text-rose-700 hover:bg-rose-50' : 'text-emerald-700 hover:bg-emerald-50'}`}>
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
          
          <div className="flex items-end justify-between mb-8">
            <div>
              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">
                {result.type === 'loss' ? 'Total Loss' : 'Total Profit'}
              </p>
              <div className="flex flex-col gap-2">
                <div className="flex items-baseline">
                  <span className={`text-2xl font-bold mr-1 ${result.type === 'loss' ? 'text-rose-900' : 'text-[#064e3b]'}`}>{currency}</span>
                  <span className={`text-5xl font-extrabold tracking-tight ${result.type === 'loss' ? 'text-rose-900' : 'text-[#064e3b]'}`}>{result.amount}</span>
                </div>
                {result.amount !== "0.00" && (
                  <span className={`self-start px-3 py-1 rounded-md text-[11px] font-bold ${result.type === 'loss' ? 'bg-[#fde8e8] text-[#c81e1e]' : 'bg-[#e2f7ec] text-[#064e3b]'}`}>
                    {result.type === 'loss' ? 'Loss' : 'Profit'}
                  </span>
                )}
              </div>
            </div>
            
            <div className={`text-right px-4 py-3 rounded-xl border ${result.type === 'loss' ? 'bg-rose-200 border-rose-300' : 'bg-emerald-200 border-emerald-300'}`}>
              <p className="text-[9px] font-bold text-slate-500 uppercase tracking-wider mb-1">
                {result.type === 'loss' ? 'Loss on Cost' : 'Profit on Cost'}
              </p>
              <p className={`text-xl font-bold ${result.type === 'loss' ? 'text-rose-900' : 'text-[#064e3b]'}`}>{result.margin}%</p>
            </div>
          </div>

          <div className="space-y-3 pt-5 border-t border-slate-100">
            <div className="flex justify-between items-center text-[13px]">
              <span className="font-medium text-slate-500">Total Cost</span>
              <span className="font-bold text-slate-800">{currency}{result.totalCost}</span>
            </div>
            <div className="flex justify-between items-center text-[13px]">
              <span className="font-medium text-slate-500">Selling Price</span>
              <span className="font-bold text-slate-800">{currency}{parseFloat(sellingPrice) || 0}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
