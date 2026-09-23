"use client";

import { useState } from "react";
import { Copy, Check, RotateCcw, DollarSign, IndianRupee } from "lucide-react";

export function WholesaleCalculator() {
  const [cost, setCost] = useState<string>("");
  const [profitPercent, setProfitPercent] = useState<string>("");
  const [quantity, setQuantity] = useState<string>("");
  const [currency, setCurrency] = useState<"₹" | "$">("₹");
  const [copied, setCopied] = useState(false);

  const calculate = () => {
    const c = parseFloat(cost) || 0;
    const p = parseFloat(profitPercent) || 0;
    const q = parseFloat(quantity) || 1; // Default to 1 to avoid division by zero
    
    if (c > 0 && q > 0) {
      const totalProfit = c * (p / 100);
      const totalRevenue = c + totalProfit;
      const wholesalePricePerUnit = totalRevenue / q;
      const profitPerUnit = totalProfit / q;

      return {
        wholesalePricePerUnit: wholesalePricePerUnit.toFixed(0),
        profitPerUnit: profitPerUnit.toFixed(0),
        totalProfit: totalProfit.toFixed(0),
        totalRevenue: totalRevenue.toLocaleString("en-IN", { maximumFractionDigits: 0 }),
      };
    }
    return { wholesalePricePerUnit: "0", profitPerUnit: "0", totalProfit: "0", totalRevenue: "0" };
  };

  const result = calculate();

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const reset = () => {
    setCost("");
    setProfitPercent("");
    setQuantity("");
  };

  return (
    <div className="w-full relative">
      {/* Currency Toggle */}
      <div className="flex justify-end mb-4">
        <div className="bg-slate-50 border border-slate-100 p-1 rounded-lg flex items-center shadow-sm">
          <button 
            onClick={() => setCurrency("$")}
            className={`px-3 py-1.5 rounded-md transition-all font-bold text-sm ${currency === "$" ? "bg-white shadow-sm text-[#d97706]" : "text-slate-500 hover:text-slate-700"}`}
          >
            <DollarSign className="w-4 h-4" />
          </button>
          <button 
            onClick={() => setCurrency("₹")}
            className={`px-3 py-1.5 rounded-md transition-all font-bold text-sm ${currency === "₹" ? "bg-white shadow-sm text-[#d97706]" : "text-slate-500 hover:text-slate-700"}`}
          >
            <IndianRupee className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="space-y-4 bg-cyan-50/50 border border-cyan-100/50 p-5 md:p-6 rounded-2xl">
        <div className="space-y-2">
          <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block">Total Cost Price</label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-lg text-slate-400 font-bold">{currency}</span>
            <input
              type="number"
              value={cost}
              onChange={(e) => setCost(e.target.value)}
              placeholder="1000"
              className="w-full text-xl font-bold bg-white border border-slate-200 rounded-xl pl-10 pr-4 py-3 focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/10 transition-all text-slate-900"
            />
          </div>
        </div>
        
        <div className="space-y-2">
          <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block">Target Profit (%)</label>
          <div className="relative">
            <input
              type="number"
              value={profitPercent}
              onChange={(e) => setProfitPercent(e.target.value)}
              placeholder="10"
              className="w-full text-xl font-bold bg-white border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/10 transition-all pr-10 text-slate-900"
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-lg text-slate-400 font-bold">%</span>
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block">Quantity</label>
          <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            placeholder="10"
            className="w-full text-xl font-bold bg-white border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/10 transition-all text-slate-900"
          />
        </div>
      </div>

      {/* Result Box */}
      <div className="bg-amber-100 border border-amber-300 rounded-2xl p-5 md:p-6 mt-6 relative overflow-hidden shadow-sm">
        <div className="flex items-start justify-between mb-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#fff7e6] flex items-center justify-center text-[#d97706]">
              {currency === "₹" ? <IndianRupee className="w-5 h-5" /> : <DollarSign className="w-5 h-5" />}
            </div>
            <div>
              <p className="text-[11px] font-bold uppercase tracking-wider text-[#d97706]">
                Wholesale Price
              </p>
              <p className="text-[10px] text-slate-400 mt-0.5">
                Based on your target profit
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-2 ml-2">
            <button onClick={() => {
              const text = `Wholesale Price Calculator
Total Cost Price: ${currency}${cost || 0}
Profit Target: ${profitPercent || 0}%
Quantity: ${quantity || 0} Units
Wholesale Price Per Unit: ${currency}${result.wholesalePricePerUnit}
Profit Amount: ${currency}${result.totalProfit}
Wholesale Price: ${currency}${result.totalRevenue}

Calculate Online: https://topcalcbox.com/wholesale-price-calculator/`;
              copyToClipboard(text);
            }} className="flex items-center gap-1 px-3 py-1.5 bg-amber-100 border border-amber-300 rounded-lg text-[11px] font-bold text-[#d97706] hover:bg-[#fff7e6] transition-colors shadow-sm">
              <span className="inline">{copied ? "Copied" : "Copy"}</span>
            </button>
            <button onClick={reset} className="p-1.5 bg-amber-100 border border-amber-300 rounded-lg text-[#d97706] hover:bg-[#fff7e6] transition-colors shadow-sm">
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
        
        <div className="bg-amber-200 rounded-xl p-4 md:p-5 border border-amber-300 mb-5">
          <p className="text-[10px] uppercase font-bold text-[#b45309] mb-1 tracking-wider">Wholesale Price Per Unit</p>
          <div className="flex items-baseline mb-5">
            <span className="text-2xl font-bold text-[#78350f] mr-1">{currency}</span>
            <span className="text-4xl md:text-5xl font-extrabold tracking-tight text-[#78350f]">
              {result.wholesalePricePerUnit}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="bg-white rounded-lg p-3 border border-[#f8ebd0]">
              <p className="text-[10px] uppercase font-bold text-slate-500 mb-1">Profit Per Unit</p>
              <p className="text-sm font-bold text-slate-800">{currency}{result.profitPerUnit}</p>
            </div>
            <div className="bg-white rounded-lg p-3 border border-[#f8ebd0]">
              <p className="text-[10px] uppercase font-bold text-slate-500 mb-1">Total Profit</p>
              <p className="text-sm font-bold text-slate-800">{currency}{result.totalProfit}</p>
            </div>
          </div>
        </div>

        <div className="flex justify-between items-center text-[13px] pt-4 border-t border-slate-100">
          <span className="font-medium text-slate-500">Total Revenue</span>
          <span className="font-bold text-slate-800">{currency}{result.totalRevenue}</span>
        </div>
      </div>
    </div>
  );
}
