"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Copy, RotateCcw, ArrowRightLeft } from "lucide-react";

export function PricePerKgCalculator() {
  const [mode, setMode] = useState<"quantity" | "price">("quantity");
  const [currency, setCurrency] = useState<"$" | "₹">("₹");
  const [pricePerKg, setPricePerKg] = useState<string>("");
  const [amount, setAmount] = useState<string>("");
  const [grams, setGrams] = useState<string>("");
  const [copied, setCopied] = useState(false);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const calculate = () => {
    const pkg = parseFloat(pricePerKg);
    if (isNaN(pkg) || pkg <= 0) return { qty: 0, price: 0 };
    
    if (mode === "quantity") {
      const amt = parseFloat(amount);
      if (isNaN(amt) || amt < 0) return { qty: 0, price: 0 };
      return { qty: (amt / pkg) * 1000, price: amt };
    } else {
      const g = parseFloat(grams);
      if (isNaN(g) || g < 0) return { qty: 0, price: 0 };
      return { qty: g, price: (g / 1000) * pkg };
    }
  };

  const reset = () => {
    setPricePerKg("");
    setAmount("");
    setGrams("");
  };

  const { qty, price } = calculate();

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: currency === '₹' ? 'INR' : 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(val).replace('INR', '₹').replace('USD', '$');
  };

  const formatGrams = (val: number) => {
    return new Intl.NumberFormat('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(val);
  };

  return (
    <div className="w-full relative overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/10 rounded-full blur-[80px] pointer-events-none" />
      
      <div className="relative z-10 space-y-6">
        {/* Main Section */}
        <div className="bg-amber-50/50 border border-amber-100/50 rounded-2xl p-5 md:p-6 relative space-y-6">
          {/* Currency Toggle */}
          <div className="absolute top-4 right-4 flex items-center bg-white p-1 rounded-xl shadow-sm border border-amber-100">
            <button
              onClick={() => setCurrency("$")}
              className={`px-3 py-1.5 rounded-lg text-sm font-bold transition-colors ${
                currency === "$" ? "bg-amber-50 text-amber-700" : "text-slate-400 hover:text-slate-600"
              }`}
            >
              $
            </button>
            <button
              onClick={() => setCurrency("₹")}
              className={`px-3 py-1.5 rounded-lg text-sm font-bold transition-colors ${
                currency === "₹" ? "bg-amber-50 text-amber-700" : "text-slate-400 hover:text-slate-600"
              }`}
            >
              ₹
            </button>
          </div>

          {/* Mode Toggle */}
          <div className="flex bg-white/80 p-1.5 rounded-2xl border border-amber-200/50 mt-12 mb-2 shadow-sm backdrop-blur-sm">
            <button
              onClick={() => setMode("quantity")}
              className={`flex-1 py-3 px-4 rounded-xl text-sm font-bold transition-all ${
                mode === "quantity" ? "bg-amber-100 text-amber-800 shadow-sm" : "text-slate-500 hover:text-slate-700 hover:bg-slate-50"
              }`}
            >
              Find Quantity
            </button>
            <button
              onClick={() => setMode("price")}
              className={`flex-1 py-3 px-4 rounded-xl text-sm font-bold transition-all ${
                mode === "price" ? "bg-amber-100 text-amber-800 shadow-sm" : "text-slate-500 hover:text-slate-700 hover:bg-slate-50"
              }`}
            >
              Find Price
            </button>
          </div>

          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700">Price Per Kilogram</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <span className="text-slate-400 font-bold text-lg">{currency}</span>
                </div>
                <input
                  type="number"
                  value={pricePerKg}
                  onChange={(e) => setPricePerKg(e.target.value)}
                  placeholder="80"
                  className="w-full bg-white border border-slate-200 rounded-xl pl-10 pr-4 py-3 text-lg text-slate-900 font-bold placeholder:text-slate-400 focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/10 transition-all shadow-sm"
                />
              </div>
              <p className="text-xs font-bold text-amber-700/80 px-1 pt-1">Rate is per kilogram (kg)</p>
            </div>
            
            {mode === "quantity" ? (
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700">Your Amount</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <span className="text-slate-400 font-bold text-lg">{currency}</span>
                  </div>
                  <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="20"
                    className="w-full bg-white border border-slate-200 rounded-xl pl-10 pr-4 py-3 text-lg text-slate-900 font-bold placeholder:text-slate-400 focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/10 transition-all shadow-sm"
                  />
                </div>
              </div>
            ) : (
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700">Quantity in Grams</label>
                <input
                  type="number"
                  value={grams}
                  onChange={(e) => setGrams(e.target.value)}
                  placeholder="250"
                  className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-lg text-slate-900 font-bold placeholder:text-slate-400 focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/10 transition-all shadow-sm"
                />
              </div>
            )}
            
            {/* Swap Button */}
            <button
              onClick={() => setMode(mode === "quantity" ? "price" : "quantity")}
              className="w-full bg-white border border-amber-200/50 rounded-2xl py-3 text-amber-700 font-bold text-sm hover:bg-amber-50 transition-colors flex items-center justify-center gap-2 shadow-sm"
            >
              <ArrowRightLeft className="w-4 h-4" /> Swap Mode
            </button>
          </div>
        </div>

        {/* Result Box */}
        <div className="flex flex-col items-center justify-center p-6 md:p-8 bg-gradient-to-b from-slate-50 to-amber-50/40 rounded-3xl shadow-[0_8px_30px_rgb(245,158,11,0.12)] border border-amber-200/60 relative overflow-hidden">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#f59e0b08_1px,transparent_1px),linear-gradient(to_bottom,#f59e0b08_1px,transparent_1px)] bg-[size:24px_24px]" />
          
          <div className="w-full flex justify-between items-center mb-6 z-10 flex-wrap gap-4">
            <div className="flex items-center gap-2 text-amber-800">
               <h3 className="font-bold text-sm md:text-base uppercase tracking-wider">Calculation Result</h3>
            </div>
            <div className="flex items-center gap-2 ml-auto">
              <button 
                onClick={() => {
                  const text = mode === "quantity"
                    ? `Price Per Kg Calculator\nPrice Per Kg: ${currency}${pricePerKg || 0}\nYour Amount: ${currency}${amount || 0}\nCalculated Quantity: ${formatGrams(qty)} Grams\n\nCalculate Online: https://topcalcbox.com/price-per-kg-calculator`
                    : `Price Per Kg Calculator\nPrice Per Kg: ${currency}${pricePerKg || 0}\nQuantity in Grams: ${grams || 0}\nCalculated Price: ${formatCurrency(price)}\n\nCalculate Online: https://topcalcbox.com/price-per-kg-calculator`;
                  copyToClipboard(text);
                }} 
                className="flex items-center gap-1.5 px-3 py-1.5 bg-white/80 backdrop-blur-md border border-amber-200 rounded-xl text-[11px] font-bold text-amber-700 hover:bg-white transition-all shadow-sm"
              >
                <span className="inline">{copied ? "Copied" : "Copy"}</span>
              </button>
              <button 
                onClick={reset}
                className="p-1.5 bg-white/80 backdrop-blur-md border border-amber-200 rounded-xl text-amber-700 hover:bg-white transition-all shadow-sm"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
          
          <div className="w-full z-10">
            <motion.div 
              key={mode === "quantity" ? qty : price}
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="w-full"
            >
              <div className="bg-white/80 backdrop-blur-sm shadow-sm border border-amber-200/50 rounded-2xl p-6 flex flex-col items-center justify-center text-center">
                <p className="text-[10px] text-amber-800/70 font-bold uppercase tracking-widest mb-2">
                  {mode === "quantity" ? "Calculated Quantity" : "Calculated Price"}
                </p>
                <div className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tighter mb-2 drop-shadow-sm truncate max-w-full px-2" title={mode === "quantity" ? `${formatGrams(qty)} Grams` : formatCurrency(price)}>
                  {mode === "quantity" ? (
                    <span className="flex items-baseline justify-center gap-1">
                      {formatGrams(qty)} <span className="text-2xl text-amber-600">g</span>
                    </span>
                  ) : (
                    formatCurrency(price)
                  )}
                </div>
                <p className="text-amber-900 font-bold text-sm md:text-base drop-shadow-sm mt-2">
                  {mode === "quantity" 
                    ? `${formatCurrency(price)} buys this quantity`
                    : `Total price for ${formatGrams(qty)} Grams`}
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
