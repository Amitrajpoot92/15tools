"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Copy, RotateCcw } from "lucide-react";

export function ElectricityBillCalculator() {
  const [currency, setCurrency] = useState<"₹" | "$">("₹");
  const [units, setUnits] = useState<string>("");
  const [rate, setRate] = useState<string>("");
  const [standing, setStanding] = useState<string>("");
  const [copied, setCopied] = useState(false);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const calculate = () => {
    const u = parseFloat(units);
    const r = parseFloat(rate);
    const s = parseFloat(standing) || 0;

    if (!isNaN(u) && !isNaN(r) && u > 0 && r > 0) {
      const energyCharge = u * r;
      const total = energyCharge + s;

      return {
        energy: energyCharge,
        standingCharge: s,
        total: total,
        hasValues: true
      };
    }
    return { energy: 0, standingCharge: 0, total: 0, hasValues: false };
  };

  const { energy, standingCharge, total, hasValues } = calculate();

  const reset = () => {
    setUnits("");
    setRate("");
    setStanding("");
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
              onClick={() => setCurrency("₹")}
              className={`px-4 py-1.5 rounded-lg text-lg font-bold transition-colors ${
                currency === "₹" ? "bg-white text-emerald-900 shadow-sm" : "text-emerald-700/60 hover:text-emerald-800"
              }`}
            >
              ₹
            </button>
            <button
              onClick={() => setCurrency("$")}
              className={`px-4 py-1.5 rounded-lg text-lg font-bold transition-colors ${
                currency === "$" ? "bg-white text-emerald-900 shadow-sm" : "text-emerald-700/60 hover:text-emerald-800"
              }`}
            >
              $
            </button>
          </div>
        </div>

        <div className="space-y-6">
          {/* Electricity Units */}
          <div className="space-y-2">
            <label className="text-base font-bold text-slate-800 uppercase">Electricity Units Used (kWh)</label>
            <input
              type="number"
              value={units}
              onChange={(e) => setUnits(e.target.value)}
              placeholder="Example: 250"
              className="w-full bg-white border border-emerald-100/50 rounded-2xl px-4 py-3 text-xl text-slate-900 font-bold placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-400 transition-all shadow-sm"
            />
            <p className="text-xs font-medium text-slate-500 px-1 pt-1">Enter the electricity units shown on your meter or bill.</p>
          </div>
          
          {/* Electricity Rate */}
          <div className="space-y-2">
            <label className="text-base font-bold text-slate-800 uppercase">Electricity Rate Per Unit ({currency})</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <span className="text-slate-600 font-bold text-xl">{currency}</span>
              </div>
              <input
                type="number"
                value={rate}
                onChange={(e) => setRate(e.target.value)}
                placeholder="Example: 7"
                className="w-full bg-white border border-emerald-100/50 rounded-2xl pl-12 pr-4 py-3 text-xl text-slate-900 font-bold placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-400 transition-all shadow-sm"
              />
            </div>
            <p className="text-xs font-medium text-slate-500 px-1 pt-1">Enter the rate charged by your electricity provider.</p>
          </div>

          {/* Standing Charge */}
          <div className="space-y-2">
            <label className="text-base font-bold text-slate-800 uppercase">Standing Charge / Supply Fee <span className="text-slate-500 font-medium normal-case text-sm">(Optional)</span></label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <span className="text-slate-600 font-bold text-xl">{currency}</span>
              </div>
              <input
                type="number"
                value={standing}
                onChange={(e) => setStanding(e.target.value)}
                placeholder="Example: 100"
                className="w-full bg-white border border-emerald-100/50 rounded-2xl pl-12 pr-4 py-3 text-xl text-slate-900 font-bold placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-400 transition-all shadow-sm"
              />
            </div>
            <p className="text-xs font-medium text-slate-500 px-1 pt-1">Enter any standing charge or supply fee shown on your electricity bill.</p>
          </div>

          {/* Result Box */}
          <div className="bg-[#b3f2d6] rounded-3xl p-6 relative shadow-sm border border-[#96e3c2] mt-8">
            <div className="absolute top-4 right-4 flex gap-2">
              <button 
                onClick={() => {
                  const text = `Electricity Bill Calculator
Units Used: ${units || 0} kWh
Rate Per Unit: ${currency}${rate || 0}
Standing Charge: ${currency}${standing || 0}
Energy Charge: ${formatCurrency(energy)}
Estimated Total Bill: ${formatCurrency(total)}

Calculate Online: https://topcalcbox.com/electricity-bill-calculator`;
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
                Estimated Electricity Bill
              </p>
              <motion.div 
                key={total}
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="text-5xl md:text-6xl font-black text-emerald-950 tracking-tight mb-2 drop-shadow-sm"
              >
                {formatCurrency(total)}
              </motion.div>
              <div className="bg-[#9ae4c5] text-emerald-950 px-4 py-1.5 rounded-full text-sm font-bold mt-1 shadow-sm">
                {hasValues ? `Based on ${parseFloat(units)} units` : "Enter values to calculate"}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mt-6">
              <div className="bg-white rounded-2xl p-4 text-center shadow-sm">
                <p className="text-slate-500 font-bold text-xs sm:text-sm mb-1">Energy Charge</p>
                <p className="text-xl sm:text-2xl font-extrabold text-slate-800">{formatCurrency(energy)}</p>
              </div>
              <div className="bg-white rounded-2xl p-4 text-center shadow-sm">
                <p className="text-slate-500 font-bold text-xs sm:text-sm mb-1">Standing Charge</p>
                <p className="text-xl sm:text-2xl font-extrabold text-slate-800">{formatCurrency(standingCharge)}</p>
              </div>
            </div>
          </div>
          
          <div className="mt-4 px-2">
            <p className="text-xs text-slate-500 italic text-center">
              *Disclaimer: Actual electricity bills may include slab rates, taxes, subsidies, meter charges and other provider-specific charges.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
