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
      minimumFractionDigits: amount % 1 !== 0 ? 2 : 0,
      maximumFractionDigits: 2
    }).format(amount).replace('INR', '₹').replace('USD', '$');
  };

  return (
    <div className="w-full relative overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-64 bg-orange-500/10 rounded-full blur-[80px] pointer-events-none" />
      
      <div className="relative z-10 space-y-6">
        {/* Input Section */}
        <div className="bg-orange-50/50 border border-orange-100/50 rounded-2xl p-5 md:p-6 relative">
          
          {/* Currency row */}
          <div className="flex items-center justify-between mb-8">
            <label className="text-sm font-bold uppercase tracking-wider text-slate-700">Currency</label>
            <div className="flex items-center bg-white border border-orange-100 p-1 rounded-xl shadow-sm">
              <button
                onClick={() => setCurrency("$")}
                className={`px-3 py-1.5 rounded-lg text-sm font-bold transition-colors ${
                  currency === "$" ? "bg-orange-50 text-orange-700" : "text-slate-400 hover:text-slate-600"
                }`}
              >
                $
              </button>
              <button
                onClick={() => setCurrency("₹")}
                className={`px-3 py-1.5 rounded-lg text-sm font-bold transition-colors ${
                  currency === "₹" ? "bg-orange-50 text-orange-700" : "text-slate-400 hover:text-slate-600"
                }`}
              >
                ₹
              </button>
            </div>
          </div>

          <div className="space-y-6">
            {/* Bill Amount */}
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700">Bill Amount</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <span className="text-slate-400 font-bold text-lg">{currency}</span>
                </div>
                <input
                  type="number"
                  value={bill}
                  onChange={(e) => setBill(e.target.value)}
                  placeholder="1000"
                  className="w-full bg-white border border-slate-200 rounded-xl pl-10 pr-4 py-3 text-lg text-slate-900 font-bold placeholder:text-slate-400 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/10 transition-all shadow-sm"
                />
              </div>
            </div>
            
            {/* Tip Percentage */}
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700">Tip Percentage</label>
              <div className="relative">
                <input
                  type="number"
                  value={tipPercent}
                  onChange={(e) => setTipPercent(e.target.value)}
                  placeholder="20"
                  className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-lg text-slate-900 font-bold placeholder:text-slate-400 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/10 transition-all shadow-sm"
                />
                <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                  <span className="text-slate-400 font-bold text-lg">%</span>
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
                        ? "bg-orange-500 text-white border-orange-500 shadow-md shadow-orange-500/20" 
                        : "bg-white text-slate-500 border-slate-200 hover:bg-slate-50"
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
                <label className="text-sm font-bold text-slate-700">Number of People</label>
                <span className="text-[10px] font-bold text-orange-600 uppercase tracking-widest bg-orange-100/50 px-2 py-1 rounded-md">Split Bill</span>
              </div>
              <div className="flex items-center gap-3">
                <button 
                  onClick={() => setPeople(Math.max(1, people - 1))} 
                  className="w-12 h-12 flex items-center justify-center bg-white border border-slate-200 rounded-xl text-orange-600 hover:bg-orange-50 shrink-0 shadow-sm transition-colors"
                >
                  <Minus strokeWidth={2.5} className="w-5 h-5" />
                </button>
                <input 
                  type="number"
                  value={people}
                  onChange={(e) => setPeople(parseInt(e.target.value) || 1)}
                  className="w-full text-center bg-white border border-slate-200 rounded-xl px-4 py-2.5 h-12 text-lg text-slate-900 font-bold focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/10 transition-all shadow-sm"
                />
                <button 
                  onClick={() => setPeople(people + 1)} 
                  className="w-12 h-12 flex items-center justify-center bg-white border border-slate-200 rounded-xl text-orange-600 hover:bg-orange-50 shrink-0 shadow-sm transition-colors"
                >
                  <Plus strokeWidth={2.5} className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Result Box */}
        <div className="flex flex-col items-center justify-center p-6 md:p-8 bg-gradient-to-b from-slate-50 to-orange-50/40 rounded-3xl shadow-[0_8px_30px_rgb(249,115,22,0.12)] border border-orange-200/60 relative overflow-hidden">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#f9731608_1px,transparent_1px),linear-gradient(to_bottom,#f9731608_1px,transparent_1px)] bg-[size:24px_24px]" />
          
          <div className="w-full flex justify-between items-center mb-6 z-10 flex-wrap gap-4">
            <div className="flex items-center gap-2 text-orange-800">
               <h3 className="font-bold text-sm md:text-base uppercase tracking-wider">Tip Summary</h3>
            </div>
            <div className="flex items-center gap-2 ml-auto">
              <button 
                onClick={() => {
                  const text = `Tip Calculator\nBill Amount: ${currency}${bill || 0}\nTip Percentage: ${tipPercent || 0}%\nNumber of People: ${people || 1}\nTotal Tip: ${formatCurrency(tip)}\nTotal Bill + Tip: ${formatCurrency(total)}\nTotal Payable Per Person: ${formatCurrency(split)}\n\nCalculate Online: https://topcalcbox.com/tip-calculator`;
                  copyToClipboard(text);
                }} 
                className="flex items-center gap-1.5 px-3 py-1.5 bg-white/80 backdrop-blur-md border border-orange-200 rounded-xl text-[11px] font-bold text-orange-700 hover:bg-white transition-all shadow-sm"
              >
                <span className="inline">{copied ? "Copied" : "Copy"}</span>
              </button>
              <button 
                onClick={reset}
                className="p-1.5 bg-white/80 backdrop-blur-md border border-orange-200 rounded-xl text-orange-700 hover:bg-white transition-all shadow-sm"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
          
          <div className="w-full z-10">
            <motion.div 
              key={split}
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="w-full"
            >
              <div className="bg-white/80 backdrop-blur-sm shadow-sm border border-orange-200/50 rounded-2xl p-6 flex flex-col items-center justify-center text-center">
                <p className="text-[10px] text-orange-800/70 font-bold uppercase tracking-widest mb-2">Total Payable Per Person</p>
                <div className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tighter mb-3 drop-shadow-sm w-full break-all px-2" title={formatCurrency(split)}>
                  {formatCurrency(split)}
                </div>
                <div className="bg-orange-100/50 border border-orange-200 text-orange-800 px-4 py-1.5 rounded-full text-sm font-bold inline-flex items-center gap-1">
                  For {people} {people === 1 ? 'Person' : 'People'}
                </div>
              </div>
              
              <div className="grid grid-cols-3 gap-2 sm:gap-3 mt-4">
                <div className="bg-white/80 backdrop-blur-sm shadow-sm border border-orange-200/50 rounded-2xl p-3 sm:p-4 flex flex-col items-center justify-center text-center">
                  <span className="text-base sm:text-lg md:text-xl font-extrabold text-slate-800 w-full break-all" title={formatCurrency(tip)}>
                    {formatCurrency(tip)}
                  </span>
                  <span className="text-[9px] sm:text-[10px] text-slate-500 font-bold uppercase tracking-wider mt-1">Total Tip</span>
                </div>
                <div className="bg-white/80 backdrop-blur-sm shadow-sm border border-orange-200/50 rounded-2xl p-3 sm:p-4 flex flex-col items-center justify-center text-center">
                  <span className="text-base sm:text-lg md:text-xl font-extrabold text-slate-800 w-full break-all" title={formatCurrency(total)}>
                    {formatCurrency(total)}
                  </span>
                  <span className="text-[9px] sm:text-[10px] text-slate-500 font-bold uppercase tracking-wider mt-1">Bill + Tip</span>
                </div>
                <div className="bg-white/80 backdrop-blur-sm shadow-sm border border-orange-200/50 rounded-2xl p-3 sm:p-4 flex flex-col items-center justify-center text-center">
                  <span className="text-base sm:text-lg md:text-xl font-extrabold text-slate-800 w-full break-all" title={formatCurrency(tipPerPerson)}>
                    {formatCurrency(tipPerPerson)}
                  </span>
                  <span className="text-[9px] sm:text-[10px] text-slate-500 font-bold uppercase tracking-wider mt-1">Tip/Person</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
