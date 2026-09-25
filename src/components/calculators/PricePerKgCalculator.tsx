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
    <div className="w-full space-y-4">
      {/* Main Section */}
      <div className="bg-[#e2faec] border border-[#bbf2d7] rounded-3xl p-5 md:p-6 relative">
        {/* Currency Toggle */}
        <div className="absolute top-4 right-4 flex items-center bg-[#d1f4e0] p-1 rounded-xl">
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

        {/* Mode Toggle */}
        <div className="flex bg-slate-50/50 p-1.5 rounded-2xl border border-slate-200 mt-14 mb-6">
          <button
            onClick={() => setMode("quantity")}
            className={`flex-1 py-3 px-4 rounded-xl text-sm font-bold transition-all ${
              mode === "quantity" ? "bg-white text-emerald-700 shadow-sm" : "text-slate-500 hover:text-slate-700"
            }`}
          >
            Find Quantity
          </button>
          <button
            onClick={() => setMode("price")}
            className={`flex-1 py-3 px-4 rounded-xl text-sm font-bold transition-all ${
              mode === "price" ? "bg-white text-emerald-700 shadow-sm" : "text-slate-500 hover:text-slate-700"
            }`}
          >
            Find Price
          </button>
        </div>

        <div className="space-y-6">
          <div className="space-y-2">
            <label className="text-base font-bold text-slate-800">Price Per Kilogram</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <span className="text-slate-600 font-bold text-xl">{currency}</span>
              </div>
              <input
                type="number"
                value={pricePerKg}
                onChange={(e) => setPricePerKg(e.target.value)}
                placeholder="80"
                className="w-full bg-white border border-emerald-100/50 rounded-2xl pl-12 pr-4 py-3 text-xl text-slate-900 font-bold placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-400 transition-all shadow-sm"
              />
            </div>
            <p className="text-sm font-bold text-emerald-700/80 px-1 pt-1">Rate is per kilogram (kg)</p>
          </div>
          
          {mode === "quantity" ? (
            <div className="space-y-2">
              <label className="text-base font-bold text-slate-800">Your Amount</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <span className="text-slate-600 font-bold text-xl">{currency}</span>
                </div>
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="20"
                  className="w-full bg-white border border-emerald-100/50 rounded-2xl pl-12 pr-4 py-3 text-xl text-slate-900 font-bold placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-400 transition-all shadow-sm"
                />
              </div>
            </div>
          ) : (
            <div className="space-y-2">
              <label className="text-base font-bold text-slate-800">Quantity in Grams</label>
              <input
                type="number"
                value={grams}
                onChange={(e) => setGrams(e.target.value)}
                placeholder="250"
                className="w-full bg-white border border-emerald-100/50 rounded-2xl px-4 py-3 text-xl text-slate-900 font-bold placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-400 transition-all shadow-sm"
              />
            </div>
          )}

          {/* Result Box */}
          <div className="bg-[#b3f2d6] rounded-3xl p-6 relative shadow-sm border border-[#96e3c2] mt-8">
            <div className="absolute top-4 right-4 flex gap-2">
              <button 
                onClick={() => {
                  const text = mode === "quantity"
                    ? `Price Per Kg Calculator
Price Per Kg: ${currency}${pricePerKg || 0}
Your Amount: ${currency}${amount || 0}
Calculated Quantity: ${formatGrams(qty)} Grams

Calculate Online: https://topcalcbox.com/price-per-kg-calculator`
                    : `Price Per Kg Calculator
Price Per Kg: ${currency}${pricePerKg || 0}
Quantity in Grams: ${grams || 0}
Calculated Price: ${formatCurrency(price)}

Calculate Online: https://topcalcbox.com/price-per-kg-calculator`;
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
            
            <div className="flex flex-col items-center mt-10 mb-2 text-center">
              <p className="text-emerald-950 text-sm font-black uppercase tracking-[0.2em] mb-2 drop-shadow-sm">
                {mode === "quantity" ? "Calculated Quantity" : "Calculated Price"}
              </p>
              <motion.div 
                key={mode === "quantity" ? qty : price}
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="text-4xl md:text-5xl font-black text-emerald-950 tracking-tight mb-2 drop-shadow-sm"
              >
                {mode === "quantity" ? `${formatGrams(qty)} Grams` : formatCurrency(price)}
              </motion.div>
              <p className="text-emerald-950 font-bold text-base drop-shadow-sm">
                {mode === "quantity" 
                  ? `${formatCurrency(price)} buys this quantity`
                  : `Total price for ${formatGrams(qty)} Grams`}
              </p>
            </div>
          </div>

          {/* Swap Button */}
          <button
            onClick={() => setMode(mode === "quantity" ? "price" : "quantity")}
            className="w-full bg-white border border-emerald-200/50 rounded-2xl py-3 mt-4 text-emerald-800 font-bold text-lg hover:bg-emerald-50 transition-colors flex items-center justify-center gap-2 shadow-sm"
          >
            <ArrowRightLeft className="w-5 h-5" /> Swap
          </button>
        </div>
      </div>
    </div>
  );
}
