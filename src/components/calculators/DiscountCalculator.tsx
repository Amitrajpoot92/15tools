"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Tag } from "lucide-react";

export function DiscountCalculator() {
  const [originalPrice, setOriginalPrice] = useState<string>("");
  const [discountPercent, setDiscountPercent] = useState<string>("");

  const calculateDiscount = () => {
    const price = parseFloat(originalPrice);
    const discount = parseFloat(discountPercent);
    
    if (!isNaN(price) && !isNaN(discount)) {
      const amountSaved = (price * discount) / 100;
      const finalPrice = price - amountSaved;
      return {
        amountSaved: amountSaved.toFixed(2),
        finalPrice: finalPrice.toFixed(2),
      };
    }
    return { amountSaved: "0.00", finalPrice: "0.00" };
  };

  const result = calculateDiscount();

  return (
    <div className="bg-white border border-slate-200 rounded-3xl p-6 md:p-10 shadow-2xl shadow-amber-900/5 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/10 rounded-full blur-[80px] pointer-events-none" />
      
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700">Original Price ($)</label>
            <input
              type="number"
              value={originalPrice}
              onChange={(e) => setOriginalPrice(e.target.value)}
              placeholder="e.g. 100"
              className="w-full bg-slate-50/80 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500/50 transition-all shadow-inner"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700">Discount Percentage (%)</label>
            <input
              type="number"
              value={discountPercent}
              onChange={(e) => setDiscountPercent(e.target.value)}
              placeholder="e.g. 20"
              className="w-full bg-slate-50/80 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500/50 transition-all shadow-inner"
            />
          </div>
        </div>

        <div className="flex flex-col items-center justify-center p-8 bg-gradient-to-br from-amber-500 to-amber-600 rounded-2xl h-full min-h-[200px] shadow-lg shadow-amber-500/30 border border-amber-400/30 relative overflow-hidden">
          {/* Subtle top inner glow for a premium 3D bevel effect */}
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent" />
          
          <div className="p-3 bg-white rounded-xl shadow-sm mb-4">
            <Tag className="w-8 h-8 text-amber-600" />
          </div>
          <p className="text-sm text-amber-100 mb-2 uppercase tracking-widest font-bold">Final Price</p>
          <motion.div 
            key={result.finalPrice}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="text-5xl md:text-6xl font-extrabold text-white tracking-tighter drop-shadow-sm"
          >
            <span className="text-amber-200 text-3xl mr-1">$</span>{result.finalPrice}
          </motion.div>
          <div className="mt-4 px-4 py-2 bg-white/10 rounded-full border border-white/10 backdrop-blur-sm">
            <p className="text-sm text-white font-medium">
              You save: ${result.amountSaved}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
