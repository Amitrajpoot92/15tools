"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Copy, RotateCcw } from "lucide-react";

export function CostPerItemCalculator() {
  const [totalCost, setTotalCost] = useState<string>("");
  const [quantity, setQuantity] = useState<string>("");
  const [copied, setCopied] = useState(false);
  const [currency, setCurrency] = useState<"$" | "₹">("₹");

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const calculateCostPerItem = () => {
    const cost = parseFloat(totalCost);
    const qty = parseFloat(quantity);
    
    if (!isNaN(cost) && !isNaN(qty) && qty !== 0) {
      return cost / qty;
    }
    return 0;
  };

  const reset = () => {
    setTotalCost("");
    setQuantity("");
  };

  const costPerItem = calculateCostPerItem();
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
      <div className="bg-[#e2faec] border border-[#bbf2d7] rounded-3xl p-5 md:p-6 space-y-6 relative">
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

        <div className="space-y-2 mt-8">
          <label className="text-base font-bold text-slate-800">Total Purchase Cost</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <span className="text-slate-600 font-bold text-xl">{currency}</span>
            </div>
            <input
              type="number"
              value={totalCost}
              onChange={(e) => setTotalCost(e.target.value)}
              placeholder="1000"
              className="w-full bg-white border border-emerald-100/50 rounded-2xl pl-12 pr-4 py-3 text-xl text-slate-900 font-bold placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-400 transition-all shadow-sm"
            />
          </div>
        </div>
        
        <div className="space-y-2">
          <label className="text-base font-bold text-slate-800">Number of Items</label>
          <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            placeholder="10"
            className="w-full bg-white border border-emerald-100/50 rounded-2xl px-4 py-3 text-xl text-slate-900 font-bold placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-400 transition-all shadow-sm"
          />
        </div>
      </div>

      {/* Result Section */}
      <div className="bg-[#b3f2d6] rounded-3xl p-6 relative shadow-sm border border-[#96e3c2]">
        <div className="absolute top-4 right-4 flex gap-2">
          <button 
            onClick={() => {
              const text = `Cost Per Item Calculator
Total Price: ${currency}${totalCost || 0}
Total Quantity: ${quantity || 0}
Cost per Item: ${formatCurrency(costPerItem)}
Cost per 10 Items: ${formatCurrency(costPerItem * 10)}
Cost per 100 Items: ${formatCurrency(costPerItem * 100)}

Calculate Online: https://topcalcbox.com/cost-per-item-calculator`;
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
        
        <div className="flex flex-col items-center mt-6 mb-8 text-center">
          <p className="text-emerald-950 text-sm font-black uppercase tracking-[0.2em] mb-2 drop-shadow-sm">Cost per Item</p>
          <motion.div 
            key={costPerItem}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="text-5xl md:text-6xl font-black text-emerald-950 tracking-tight mb-2 drop-shadow-sm"
          >
            {formatCurrency(costPerItem)}
          </motion.div>
          <p className="text-emerald-950 font-bold text-lg drop-shadow-sm">per item</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white rounded-2xl p-4 text-center shadow-sm">
            <p className="text-slate-500 font-bold text-sm mb-1">Cost Per 10 Items</p>
            <p className="text-2xl font-extrabold text-slate-800">{formatCurrency(costPerItem * 10)}</p>
          </div>
          <div className="bg-white rounded-2xl p-4 text-center shadow-sm">
            <p className="text-slate-500 font-bold text-sm mb-1">Cost Per 100 Items</p>
            <p className="text-2xl font-extrabold text-slate-800">{formatCurrency(costPerItem * 100)}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
