"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Copy, RotateCcw, Minus, Plus } from "lucide-react";

export function TipCalculator() {
  const [currency, setCurrency] = useState<"$" | "₹">("₹");
  const [bill, setBill] = useState<string>("");
  const [tipPercent, setTipPercent] = useState<string>("20");
  const [people, setPeople] = useState<number>(2);
  const [copied, setCopied] = useState(false);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const calculate = () => {
    const b = parseFloat(bill);
    const t = parseFloat(tipPercent);
    const p = people;

    if (!isNaN(b) && !isNaN(t) && p > 0) {
      const tipAmount = (b * t) / 100;
      const totalAmount = b + tipAmount;
      const tipPerPerson = tipAmount / p;
      const perPerson = totalAmount / p;

      return {
        tip: tipAmount,
        total: totalAmount,
        tipPerPerson: tipPerPerson,
        split: perPerson,
      };
    }
    return { tip: 0, total: 0, tipPerPerson: 0, split: 0 };
  };

  const { tip, total, tipPerPerson, split } = calculate();

  const reset = () => {
    setBill("");
    setTipPercent("20");
    setPeople(2);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: currency === '₹' ? 'INR' : 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(amount).replace('INR', '₹').replace('USD', '$');
  };

  return (
    <div className="w-full space-y-4">
      {/* Input Section */}
      <div className="bg-[#e2faec] border border-[#bbf2d7] rounded-3xl p-5 md:p-6 relative">
        
        {/* Currency row */}
        <div className="flex items-center justify-between mb-8">
          <label className="text-sm font-black uppercase tracking-widest text-slate-600">Currency</label>
          <div className="flex items-center bg-[#d1f4e0] p-1 rounded-xl">
            <button
              onClick={() => setCurrency("$")}
              className={`px-4 py-1.5 rounded-lg text-lg font-bold transition-colors ${
                currency === "$" ? "bg-white text-emerald-900 shadow-sm" : "text-emerald-700/60 hover:text-emerald-800"
              }`}
            >
              $
            </button>
            <button
              onClick={() => setCurrency("₹")}
              className={`px-4 py-1.5 rounded-lg text-lg font-bold transition-colors ${
                currency === "₹" ? "bg-white text-emerald-900 shadow-sm" : "text-emerald-700/60 hover:text-emerald-800"
              }`}
            >
              ₹
            </button>
          </div>
        </div>

        <div className="space-y-6">
          {/* Bill Amount */}
          <div className="space-y-2">
            <label className="text-base font-bold text-slate-800">Bill Amount</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <span className="text-slate-600 font-bold text-xl">{currency}</span>
              </div>
              <input
                type="number"
                value={bill}
                onChange={(e) => setBill(e.target.value)}
                placeholder="1000"
                className="w-full bg-white border border-emerald-100/50 rounded-2xl pl-12 pr-4 py-3 text-xl text-slate-900 font-bold placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-400 transition-all shadow-sm"
              />
            </div>
          </div>
          
          {/* Tip Percentage */}
          <div className="space-y-2">
            <label className="text-base font-bold text-slate-800">Tip Percentage</label>
            <div className="relative">
              <input
                type="number"
                value={tipPercent}
                onChange={(e) => setTipPercent(e.target.value)}
                placeholder="20"
                className="w-full bg-white border border-emerald-100/50 rounded-2xl px-4 py-3 text-xl text-slate-900 font-bold placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-400 transition-all shadow-sm"
              />
              <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                <span className="text-slate-600 font-bold text-xl">%</span>
              </div>
            </div>
            {/* Quick buttons */}
            <div className="flex gap-2 mt-3">
              {[10, 15, 18, 20].map((preset) => (
                <button
                  key={preset}
                  onClick={() => setTipPercent(preset.toString())}
                  className={`flex-1 py-2 rounded-xl text-sm font-bold transition-all shadow-sm border ${
                    tipPercent === preset.toString() 
                      ? "bg-[#059669] text-white border-[#059669]" 
                      : "bg-transparent text-emerald-800 border-emerald-200 hover:bg-emerald-50"
                  }`}
                >
                  {preset}%
                </button>
              ))}
            </div>
          </div>

          {/* Number of People */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-base font-bold text-slate-800">Number of People</label>
              <span className="text-sm font-bold text-[#059669]">Split Bill</span>
            </div>
            <div className="flex items-center gap-3">
              <button 
                onClick={() => setPeople(Math.max(1, people - 1))} 
                className="w-14 h-14 flex items-center justify-center bg-white border border-emerald-100/50 rounded-2xl text-[#059669] hover:bg-emerald-50 shrink-0 shadow-sm"
              >
                <Minus strokeWidth={3} className="w-6 h-6" />
              </button>
              <input 
                type="number"
                value={people}
                onChange={(e) => setPeople(parseInt(e.target.value) || 1)}
                className="w-full text-center bg-white border border-emerald-100/50 rounded-2xl px-4 py-3 h-14 text-xl text-slate-900 font-bold focus:outline-none focus:ring-2 focus:ring-emerald-400 transition-all shadow-sm"
              />
              <button 
                onClick={() => setPeople(people + 1)} 
                className="w-14 h-14 flex items-center justify-center bg-white border border-emerald-100/50 rounded-2xl text-[#059669] hover:bg-emerald-50 shrink-0 shadow-sm"
              >
                <Plus strokeWidth={3} className="w-6 h-6" />
              </button>
            </div>
          </div>

          {/* Result Box */}
          <div className="bg-[#b3f2d6] rounded-3xl p-6 relative shadow-sm border border-[#96e3c2] mt-8">
            <div className="absolute top-4 right-4 flex gap-2">
              <button 
                onClick={() => {
                  const text = `Tip Calculator
Bill Amount: ${currency}${bill || 0}
Tip Percentage: ${tipPercent || 0}%
Number of People: ${people || 1}
Total Tip: ${formatCurrency(tip)}
Total Bill + Tip: ${formatCurrency(total)}
Total Payable Per Person: ${formatCurrency(split)}

Calculate Online: https://topcalcbox.com/tip-calculator`;
                  copyToClipboard(text);
                }} 
                className="flex items-center justify-center px-4 py-2 bg-white rounded-xl text-sm font-bold text-emerald-800 hover:bg-emerald-50 transition-colors shadow-sm"
              >
                {copied ? "Copied" : "Copy"}
              </button>
              <button 
                onClick={reset}
                className="flex items-center justify-center w-10 h-10 bg-white rounded-xl text-emerald-800 hover:bg-emerald-50 transition-colors shadow-sm"
              >
                <RotateCcw className="w-5 h-5" />
              </button>
            </div>
            
            <div className="flex flex-col items-center mt-10 mb-4 text-center">
              <p className="text-emerald-950 text-sm font-black uppercase tracking-[0.2em] mb-2 drop-shadow-sm">
                Total Payable Per Person
              </p>
              <motion.div 
                key={split}
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="text-5xl md:text-6xl font-black text-emerald-950 tracking-tight mb-2 drop-shadow-sm"
              >
                {formatCurrency(split)}
              </motion.div>
              <div className="bg-[#9ae4c5] text-emerald-950 px-4 py-1.5 rounded-full text-sm font-bold mt-1 shadow-sm">
                {people} {people === 1 ? 'Person' : 'People'}
              </div>
            </div>

            <div className="w-full border-t border-[#8fd7b9] my-4" />

            <div className="grid grid-cols-3 gap-2 text-center mt-4">
              <div>
                <p className="text-emerald-950/80 font-black text-xs sm:text-xs drop-shadow-sm">Total Tip</p>
                <p className="text-emerald-950 font-black text-sm sm:text-base mt-1 drop-shadow-sm">{formatCurrency(tip)}</p>
              </div>
              <div>
                <p className="text-emerald-950/80 font-black text-xs sm:text-xs drop-shadow-sm">Total Bill + Tip</p>
                <p className="text-emerald-950 font-black text-sm sm:text-base mt-1 drop-shadow-sm">{formatCurrency(total)}</p>
              </div>
              <div>
                <p className="text-emerald-950/80 font-black text-xs sm:text-xs drop-shadow-sm">Tip Per Person</p>
                <p className="text-emerald-950 font-black text-sm sm:text-base mt-1 drop-shadow-sm">{formatCurrency(tipPerPerson)}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
