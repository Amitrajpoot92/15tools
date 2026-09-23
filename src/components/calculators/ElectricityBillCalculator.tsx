"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Zap, Copy, Check } from "lucide-react";

export function ElectricityBillCalculator() {
  const [power, setPower] = useState<string>("");
  const [hours, setHours] = useState<string>("");
  const [rate, setRate] = useState<string>("");
  const [copied, setCopied] = useState(false);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const calculateBill = () => {
    const p = parseFloat(power);
    const h = parseFloat(hours);
    const r = parseFloat(rate);

    if (!isNaN(p) && !isNaN(h) && !isNaN(r) && p > 0 && h > 0 && r > 0) {
      // kWh per day
      const dailyKwh = (p * h) / 1000;
      // kWh per month (approx 30 days)
      const monthlyKwh = dailyKwh * 30;
      // Monthly Bill
      const monthlyBill = monthlyKwh * r;

      return {
        dailyUnits: dailyKwh.toFixed(2),
        monthlyUnits: monthlyKwh.toFixed(1),
        monthlyBill: monthlyBill.toFixed(2)
      };
    }
    return { dailyUnits: "0.00", monthlyUnits: "0.0", monthlyBill: "0.00" };
  };

  const results = calculateBill();

  return (
    <div className="w-full md: relative overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-64 bg-orange-500/10 rounded-full blur-[80px] pointer-events-none" />
      
      <div className="relative z-10 space-y-6">
        <div className="space-y-6 bg-orange-50/50 border border-orange-100/50 p-5 md:p-6 rounded-2xl">
          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700">Appliance Power (Watts)</label>
            <input
              type="number"
              value={power}
              onChange={(e) => setPower(e.target.value)}
              placeholder="e.g. 1500 (for AC)"
              className="w-full bg-slate-50/80 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-500/50 transition-all shadow-inner"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700">Daily Usage (Hours)</label>
            <input
              type="number"
              value={hours}
              onChange={(e) => setHours(e.target.value)}
              placeholder="e.g. 8"
              className="w-full bg-slate-50/80 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-500/50 transition-all shadow-inner"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700">Cost per Unit (₹/kWh)</label>
            <input
              type="number"
              value={rate}
              onChange={(e) => setRate(e.target.value)}
              placeholder="e.g. 7.5"
              className="w-full bg-slate-50/80 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-500/50 transition-all shadow-inner"
            />
          </div>
        </div>

        <div className="flex flex-col items-center justify-center p-6 md:p-8 bg-orange-100 rounded-2xl shadow-sm border border-orange-300 relative">
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent" />
          <button onClick={() => {
            const text = `Electricity Bill Calculator
Appliance Power: ${power || 0} Watts
Daily Usage: ${hours || 0} Hours
Cost per Unit: ₹${rate || 0}/kWh
Daily Consumption: ${results.dailyUnits} kWh
Monthly Units: ${results.monthlyUnits} kWh
Estimated Monthly Bill: ₹${results.monthlyBill}

Calculate Online: https://topcalcbox.com/electricity-bill-calculator/`;
            copyToClipboard(text);
          }} className="absolute top-4 right-4 flex items-center gap-1 px-3 py-1.5 bg-white border border-orange-200 rounded-lg text-[11px] font-bold text-orange-700 hover:bg-orange-50 transition-colors shadow-sm z-10">
            <span className="inline">{copied ? "Copied" : "Copy"}</span>
          </button>
          
          <div className="p-3 bg-white rounded-xl shadow-sm mb-4">
            <Zap className="w-8 h-8 text-orange-600" />
          </div>
          <p className="text-sm text-orange-800/70 mb-1 uppercase tracking-widest font-bold">Estimated Monthly Bill</p>
          <motion.div 
            key={results.monthlyBill}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tighter drop-shadow-sm mb-6"
          >
            ₹{results.monthlyBill}
          </motion.div>
          
          <div className="w-full space-y-3">
            <div className="bg-white shadow-sm backdrop-blur-md rounded-xl p-3 border border-slate-200 flex justify-between items-center">
              <span className="text-orange-800/70 text-sm font-medium">Daily Consumption</span>
              <span className="text-slate-900 font-bold">{results.dailyUnits} kWh</span>
            </div>
            <div className="bg-white shadow-sm backdrop-blur-md rounded-xl p-3 border border-white/30 flex justify-between items-center">
              <span className="text-orange-800/70 text-sm font-medium">Monthly Units</span>
              <span className="text-slate-900 font-bold">{results.monthlyUnits} kWh</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
