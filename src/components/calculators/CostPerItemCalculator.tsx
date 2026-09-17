"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ShoppingCart } from "lucide-react";

export function CostPerItemCalculator() {
  const [totalCost, setTotalCost] = useState<string>("");
  const [quantity, setQuantity] = useState<string>("");

  const calculateCostPerItem = () => {
    const cost = parseFloat(totalCost);
    const qty = parseFloat(quantity);
    
    if (!isNaN(cost) && !isNaN(qty) && qty !== 0) {
      return (cost / qty).toFixed(2);
    }
    return "0.00";
  };

  return (
    <div className="bg-white border border-slate-200 rounded-3xl p-5 md:p-6 shadow-2xl shadow-rose-900/5 relative overflow-hidden">
      {/* Premium Background decoration */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-rose-500/10 rounded-full blur-[80px] pointer-events-none" />
      
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
        <div className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700">Total Price</label>
            <input
              type="number"
              value={totalCost}
              onChange={(e) => setTotalCost(e.target.value)}
              placeholder="Total amount paid..."
              className="w-full bg-slate-50/80 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-rose-500/50 transition-all shadow-inner"
            />
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700">Total Quantity</label>
            <input
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              placeholder="Number of items..."
              className="w-full bg-slate-50/80 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-rose-500/50 transition-all shadow-inner"
            />
          </div>
        </div>

        <div className="flex flex-col items-center justify-center p-8 bg-gradient-to-br from-rose-500 to-rose-600 rounded-2xl h-full min-h-[200px] shadow-lg shadow-rose-500/30 border border-rose-400/30 relative overflow-hidden">
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent" />
          
          <div className="p-3 bg-white rounded-xl shadow-sm mb-4">
            <ShoppingCart className="w-8 h-8 text-rose-600" />
          </div>
          <p className="text-sm text-rose-100 mb-2 uppercase tracking-widest font-bold">Cost per Item</p>
          <motion.div 
            key={calculateCostPerItem()}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="text-4xl md:text-5xl font-extrabold text-white tracking-tighter drop-shadow-sm flex items-end gap-1"
          >
            {calculateCostPerItem()}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
