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
        wholesalePricePerUnit: wholesalePricePerUnit,
        profitPerUnit: profitPerUnit,
        totalProfit: totalProfit,
        totalRevenue: totalRevenue,
      };
    }
    return { wholesalePricePerUnit: 0, profitPerUnit: 0, totalProfit: 0, totalRevenue: 0 };
  };

  const result = calculate();

  const formatNumber = (num: number, maxDigits = 0) => {
    return num.toLocaleString(currency === '₹' ? 'en-IN' : 'en-US', {
      maximumFractionDigits: maxDigits,
    });
  };

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
            className={`px-3 py-1.5 rounded-md transition-all font-bold text-sm ${currency === "$" ? "bg-white shadow-sm text-[#d97706]" : "text-slate-700 hover:text-slate-700"}`}
          >
            <DollarSign className="w-4 h-4" />
          </button>
          <button 
            onClick={() => setCurrency("₹")}
            className={`px-3 py-1.5 rounded-md transition-all font-bold text-sm ${currency === "₹" ? "bg-white shadow-sm text-[#d97706]" : "text-slate-700 hover:text-slate-700"}`}
          >
            <IndianRupee className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="space-y-2.5 bg-amber-50/90 border-2 border-amber-200 p-3.5 sm:p-4 rounded-2xl">
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">Total Cost Price</label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-lg text-slate-600 font-bold">{currency}</span>
            <input
              type="number"
              value={cost}
              onChange={(e) => setCost(e.target.value)}
              placeholder="1000"
              className="w-full text-xl font-bold bg-white border-2 border-slate-300/90 rounded-xl pl-10 pr-4 py-2.5 focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/10 transition-all text-slate-900"
            />
          </div>
        </div>
        
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">Target Profit (%)</label>
          <div className="relative">
            <input
              type="number"
              value={profitPercent}
              onChange={(e) => setProfitPercent(e.target.value)}
              placeholder="10"
              className="w-full text-xl font-bold bg-white border-2 border-slate-300/90 rounded-xl px-4 py-2.5 focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/10 transition-all pr-10 text-slate-900"
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-lg text-slate-600 font-bold">%</span>
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">Quantity</label>
          <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            placeholder="10"
            className="w-full text-xl font-bold bg-white border-2 border-slate-300/90 rounded-xl px-4 py-2.5 focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/10 transition-all text-slate-900"
          />
        </div>
      </div>

      {/* Result Box */}
      <div className="flex flex-col items-center justify-center p-4 sm:p-5 bg-gradient-to-b from-amber-50/85 to-amber-100/70 rounded-2xl sm:rounded-3xl shadow-[0_8px_30px_rgb(217,119,6,0.12)] border-2 border-amber-300/80 relative overflow-hidden mt-3.5 w-full">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#d9770608_1px,transparent_1px),linear-gradient(to_bottom,#d9770608_1px,transparent_1px)] bg-[size:24px_24px]" />
        
        <div className="w-full flex justify-between items-center mb-3.5 z-10 flex-wrap gap-4">
          <div className="flex items-center gap-2 text-amber-800">
             <div className="w-6 h-6 rounded-full bg-amber-100 flex items-center justify-center text-amber-600">
               {currency === "₹" ? <IndianRupee className="w-3.5 h-3.5" /> : <DollarSign className="w-3.5 h-3.5" />}
             </div>
             <h3 className="font-bold text-sm md:text-base uppercase tracking-wider">Wholesale Details</h3>
          </div>
          <div className="flex items-center gap-2 ml-auto">
            <button 
              onClick={() => {
                const text = `Wholesale Price Calculator
Total Cost Price: ${currency}${cost || 0}
Profit Target: ${profitPercent || 0}%
Quantity: ${quantity || 0} Units
Wholesale Price Per Unit: ${currency}${formatNumber(result.wholesalePricePerUnit)}
Total Profit: ${currency}${formatNumber(result.totalProfit)}
Total Revenue: ${currency}${formatNumber(result.totalRevenue)}

Calculate Online: https://topcalcbox.com/wholesale-price-calculator/`;
                copyToClipboard(text);
              }} 
              className="flex items-center gap-1.5 px-3 py-1.5 bg-white border-2 border-amber-300 rounded-xl text-[11px] font-extrabold text-amber-800 hover:bg-amber-50 cursor-pointer transition-all shadow-sm"
            >
              <span className="inline">{copied ? "Copied" : "Copy"}</span>
            </button>
            <button 
              onClick={reset}
              className="p-1.5 bg-white border-2 border-amber-300 rounded-xl text-amber-800 hover:bg-amber-50 cursor-pointer transition-all shadow-sm"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
        
        <div className="w-full z-10">
          <div className="w-full space-y-2.5">
            <div className="bg-white shadow-sm border-2 border-amber-200/90 rounded-2xl p-4 sm:p-5 flex flex-col items-center justify-center text-center">
              <p className="text-[10px] text-amber-900 font-bold uppercase tracking-widest mb-2">Wholesale Price Per Unit</p>
              <div className="text-4xl md:text-5xl font-extrabold text-amber-700 tracking-tighter mb-3 drop-shadow-sm truncate px-2 w-full">
                <span className="text-2xl md:text-3xl font-bold text-slate-600 mr-1">{currency}</span>{formatNumber(result.wholesalePricePerUnit)}
              </div>
            </div>

            {/* Target Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-white shadow-sm border-2 border-amber-200/90 rounded-2xl p-4 flex flex-col justify-center text-center">
                <span className="text-[10px] text-slate-700 font-bold uppercase tracking-widest mb-1">Profit Per Unit</span>
                <span className="text-xl text-slate-900 font-black truncate">{currency}{formatNumber(result.profitPerUnit)}</span>
              </div>
              <div className="bg-white shadow-sm border-2 border-amber-200/90 rounded-2xl p-4 flex flex-col justify-center text-center">
                <span className="text-[10px] text-slate-700 font-bold uppercase tracking-widest mb-1">Total Profit</span>
                <span className="text-xl text-slate-900 font-black truncate">{currency}{formatNumber(result.totalProfit)}</span>
              </div>
            </div>
            
            <div className="bg-white shadow-sm border-2 border-amber-200/90 rounded-2xl p-4 mt-2">
              <div className="flex justify-between items-center">
                <span className="text-slate-600 font-bold">Total Revenue</span>
                <span className="text-amber-700 font-black text-xl truncate max-w-[50%]">{currency}{formatNumber(result.totalRevenue)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
