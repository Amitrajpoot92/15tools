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
      minimumFractionDigits: amount % 1 !== 0 ? 2 : 0,
      maximumFractionDigits: 2
    }).format(amount).replace('INR', '₹').replace('USD', '$');
  };

  return (
    <div className="w-full relative overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-64 bg-rose-500/10 rounded-full blur-[80px] pointer-events-none" />
      
      <div className="relative z-10 space-y-6">
        {/* Input Section */}
        <div className="space-y-6 bg-rose-50/50 border border-rose-100/50 p-5 md:p-6 rounded-2xl relative">
          {/* Currency Toggle */}
          <div className="absolute top-4 right-4 flex items-center bg-white border border-rose-100 p-1 rounded-xl shadow-sm">
            <button
              onClick={() => setCurrency("$")}
              className={`px-3 py-1.5 rounded-lg text-sm font-bold transition-colors ${
                currency === "$" ? "bg-rose-50 text-rose-700" : "text-slate-400 hover:text-slate-600"
              }`}
            >
              $
            </button>
            <button
              onClick={() => setCurrency("₹")}
              className={`px-3 py-1.5 rounded-lg text-sm font-bold transition-colors ${
                currency === "₹" ? "bg-rose-50 text-rose-700" : "text-slate-400 hover:text-slate-600"
              }`}
            >
              ₹
            </button>
          </div>

          <div className="space-y-2 mt-8">
            <label className="text-sm font-bold text-slate-700">Total Purchase Cost</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <span className="text-slate-400 font-bold text-lg">{currency}</span>
              </div>
              <input
                type="number"
                value={totalCost}
                onChange={(e) => setTotalCost(e.target.value)}
                placeholder="1000"
                className="w-full bg-white border border-slate-200 rounded-xl pl-10 pr-4 py-3 text-lg text-slate-900 font-bold placeholder:text-slate-400 focus:outline-none focus:border-rose-500 focus:ring-2 focus:ring-rose-500/10 transition-all shadow-sm"
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700">Number of Items</label>
            <input
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              placeholder="10"
              className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-lg text-slate-900 font-bold placeholder:text-slate-400 focus:outline-none focus:border-rose-500 focus:ring-2 focus:ring-rose-500/10 transition-all shadow-sm"
            />
          </div>
        </div>

        {/* Result Section */}
        <div className="flex flex-col items-center justify-center p-6 md:p-8 bg-gradient-to-b from-slate-50 to-rose-50/40 rounded-3xl shadow-[0_8px_30px_rgb(244,63,94,0.12)] border border-rose-200/60 relative overflow-hidden">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#f43f5e08_1px,transparent_1px),linear-gradient(to_bottom,#f43f5e08_1px,transparent_1px)] bg-[size:24px_24px]" />
          
          <div className="w-full flex justify-between items-center mb-6 z-10 flex-wrap gap-4">
            <div className="flex items-center gap-2 text-rose-800">
               <h3 className="font-bold text-sm md:text-base uppercase tracking-wider">Cost Per Item Result</h3>
            </div>
            <div className="flex items-center gap-2 ml-auto">
              <button onClick={() => {
                const text = `Cost Per Item Calculator
Total Price: ${currency}${totalCost || 0}
Total Quantity: ${quantity || 0}
Cost per Item: ${formatCurrency(costPerItem)}
Cost per 10 Items: ${formatCurrency(costPerItem * 10)}
Cost per 100 Items: ${formatCurrency(costPerItem * 100)}

Calculate Online: https://topcalcbox.com/cost-per-item-calculator`;
                copyToClipboard(text);
              }} className="flex items-center gap-1.5 px-3 py-1.5 bg-white/80 backdrop-blur-md border border-rose-200 rounded-xl text-[11px] font-bold text-rose-700 hover:bg-white transition-all shadow-sm">
                <span className="inline">{copied ? "Copied" : "Copy"}</span>
              </button>
              <button onClick={reset} className="p-1.5 bg-white/80 backdrop-blur-md border border-rose-200 rounded-xl text-rose-700 hover:bg-white transition-all shadow-sm">
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
          
          <div className="w-full z-10">
            <motion.div 
              key={costPerItem}
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="w-full space-y-4"
            >
              <div className="bg-white/80 backdrop-blur-sm shadow-sm border border-rose-200/50 rounded-2xl p-6 flex flex-col items-center justify-center text-center">
                <span className="text-[10px] text-rose-800/70 font-bold uppercase tracking-widest mb-2">Cost per Item</span>
                <span className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 w-full break-all px-2" title={formatCurrency(costPerItem)}>
                  {formatCurrency(costPerItem)}
                </span>
              </div>
              
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-white/80 backdrop-blur-sm shadow-sm border border-rose-200/50 rounded-2xl p-4 flex flex-col items-center justify-center text-center">
                  <span className="text-lg sm:text-xl md:text-2xl font-extrabold text-slate-800 w-full break-all" title={formatCurrency(costPerItem * 10)}>
                    {formatCurrency(costPerItem * 10)}
                  </span>
                  <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider mt-1">For 10 Items</span>
                </div>
                <div className="bg-white/80 backdrop-blur-sm shadow-sm border border-rose-200/50 rounded-2xl p-4 flex flex-col items-center justify-center text-center">
                  <span className="text-lg sm:text-xl md:text-2xl font-extrabold text-slate-800 w-full break-all" title={formatCurrency(costPerItem * 100)}>
                    {formatCurrency(costPerItem * 100)}
                  </span>
                  <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider mt-1">For 100 Items</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
