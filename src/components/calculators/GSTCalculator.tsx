"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Receipt } from "lucide-react";

export function GSTCalculator() {
  const [amount, setAmount] = useState<string>("");
  const [rate, setRate] = useState<string>("18");
  const [gstType, setGstType] = useState<"exclusive" | "inclusive">("exclusive");

  const calculateGST = () => {
    const a = parseFloat(amount);
    const r = parseFloat(rate);
    
    if (!isNaN(a) && !isNaN(r)) {
      if (gstType === "exclusive") {
        const gstAmount = (a * r) / 100;
        const total = a + gstAmount;
        return {
          gst: gstAmount.toFixed(2),
          total: total.toFixed(2),
          net: a.toFixed(2),
        };
      } else {
        const gstAmount = a - (a * (100 / (100 + r)));
        const net = a - gstAmount;
        return {
          gst: gstAmount.toFixed(2),
          total: a.toFixed(2),
          net: net.toFixed(2),
        };
      }
    }
    return { gst: "0.00", total: "0.00", net: "0.00" };
  };

  const result = calculateGST();

  return (
    <div className="bg-white border border-slate-200 rounded-3xl p-6 md:p-10 shadow-2xl shadow-rose-900/5 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-64 bg-rose-500/10 rounded-full blur-[80px] pointer-events-none" />
      
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div className="space-y-6">
          
          <div className="flex bg-slate-100/50 border border-slate-200 rounded-xl p-1 shadow-inner">
            <button
              onClick={() => setGstType("exclusive")}
              className={`flex-1 py-2 text-sm font-bold rounded-lg transition-all ${
                gstType === "exclusive" ? "bg-white text-rose-700 shadow-sm border border-slate-200" : "text-slate-500 hover:text-slate-900"
              }`}
            >
              Add GST (Exclusive)
            </button>
            <button
              onClick={() => setGstType("inclusive")}
              className={`flex-1 py-2 text-sm font-bold rounded-lg transition-all ${
                gstType === "inclusive" ? "bg-white text-rose-700 shadow-sm border border-slate-200" : "text-slate-500 hover:text-slate-900"
              }`}
            >
              Remove GST (Inclusive)
            </button>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700">Amount ($)</label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="e.g. 1000"
              className="w-full bg-slate-50/80 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-rose-500/50 transition-all shadow-inner"
            />
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700">GST Rate (%)</label>
            <select
              value={rate}
              onChange={(e) => setRate(e.target.value)}
              className="w-full bg-slate-50/80 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 focus:outline-none focus:ring-2 focus:ring-rose-500/50 transition-all appearance-none shadow-inner"
            >
              <option value="5">5%</option>
              <option value="12">12%</option>
              <option value="18">18%</option>
              <option value="28">28%</option>
            </select>
          </div>
        </div>

        <div className="flex flex-col items-center justify-center p-8 bg-gradient-to-br from-rose-500 to-rose-600 rounded-2xl h-full min-h-[200px] shadow-lg shadow-rose-500/30 border border-rose-400/30 relative overflow-hidden">
          {/* Subtle top inner glow for a premium 3D bevel effect */}
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent" />
          
          <div className="p-3 bg-white rounded-xl shadow-sm mb-4">
            <Receipt className="w-8 h-8 text-rose-600" />
          </div>
          
          <p className="text-sm text-rose-100 uppercase tracking-widest font-bold mb-1">Total Price</p>
          <motion.div 
            key={result.total}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="text-4xl md:text-5xl font-extrabold text-white tracking-tighter mb-4 drop-shadow-sm"
          >
            ${result.total}
          </motion.div>

          <div className="w-full border-t border-rose-400/50 my-2" />

          <div className="w-full flex justify-between text-sm mt-2">
            <span className="text-rose-100 font-medium">Net Amount:</span>
            <span className="text-white font-bold">${result.net}</span>
          </div>
          <div className="w-full flex justify-between text-sm mt-1">
            <span className="text-rose-100 font-medium">GST Amount:</span>
            <span className="text-white font-bold">+${result.gst}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
