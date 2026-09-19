"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Tag, Copy, RotateCcw, Check, DollarSign, IndianRupee } from "lucide-react";

export function DiscountCalculator() {
  const [originalPrice, setOriginalPrice] = useState("100");
  const [discountType, setDiscountType] = useState<"percent" | "flat">("percent");
  const [discount, setDiscount] = useState("20");
  const [coupon, setCoupon] = useState("");
  const [copied, setCopied] = useState(false);
  const [currency, setCurrency] = useState<"$" | "₹">("$");

  const calculate = () => {
    const price = parseFloat(originalPrice) || 0;
    const disc = parseFloat(discount) || 0;
    const coup = parseFloat(coupon) || 0;

    let baseDiscountAmount = 0;
    if (discountType === "percent") {
      baseDiscountAmount = price * (disc / 100);
    } else {
      baseDiscountAmount = disc;
    }
    // Prevent negative price
    if (baseDiscountAmount > price) {
      baseDiscountAmount = price;
    }

    const priceAfterBase = price - baseDiscountAmount;
    let couponAmount = priceAfterBase * (coup / 100);
    
    if (couponAmount > priceAfterBase) {
      couponAmount = priceAfterBase;
    }

    const totalSaved = baseDiscountAmount + couponAmount;
    const finalPrice = price - totalSaved;
    const savePercent = price > 0 ? (totalSaved / price) * 100 : 0;

    return {
      price,
      finalPrice: finalPrice.toFixed(2).replace(/\.00$/, ''),
      totalSaved: totalSaved.toFixed(2).replace(/\.00$/, ''),
      savePercent: savePercent.toFixed(2).replace(/\.00$/, '')
    };
  };

  const res = calculate();

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const reset = () => {
    setOriginalPrice("");
    setDiscount("");
    setCoupon("");
    setDiscountType("percent");
  };

  return (
    <div className="w-full relative">
      {/* Currency Toggle */}
      <div className="flex justify-end mb-4">
        <div className="bg-slate-100 p-1 rounded-lg flex items-center">
          <button 
            onClick={() => setCurrency("$")}
            className={`p-1.5 rounded-md transition-all ${currency === "$" ? "bg-white shadow-sm text-indigo-600" : "text-slate-500 hover:text-slate-700"}`}
          >
            <DollarSign className="w-4 h-4" />
          </button>
          <button 
            onClick={() => setCurrency("₹")}
            className={`p-1.5 rounded-md transition-all ${currency === "₹" ? "bg-white shadow-sm text-indigo-600" : "text-slate-500 hover:text-slate-700"}`}
          >
            <IndianRupee className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="space-y-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Original Price */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Original Price ({currency})</label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-lg text-slate-400 font-bold">{currency}</span>
              <input 
                type="number" 
                value={originalPrice} 
                onChange={(e) => setOriginalPrice(e.target.value)}
                className="w-full text-xl font-bold bg-white border border-slate-200 rounded-xl pl-10 pr-4 py-3 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/10 transition-all"
              />
            </div>
          </div>

          {/* Discount Section */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Discount</label>
              <div className="flex items-center bg-slate-50 p-1 rounded-lg border border-slate-200">
                <button 
                  onClick={() => setDiscountType("percent")}
                  className={`px-2.5 py-0.5 text-[10px] sm:text-xs font-bold rounded-md transition-all ${discountType === "percent" ? "bg-white text-indigo-600 shadow-sm border border-slate-200/50" : "text-slate-500 hover:text-slate-700"}`}
                >
                  % Off
                </button>
                <button 
                  onClick={() => setDiscountType("flat")}
                  className={`px-2.5 py-0.5 text-[10px] sm:text-xs font-bold rounded-md transition-all ${discountType === "flat" ? "bg-white text-indigo-600 shadow-sm border border-slate-200/50" : "text-slate-500 hover:text-slate-700"}`}
                >
                  Flat {currency}
                </button>
              </div>
            </div>
            
            <div className="relative">
              {discountType === "flat" && <span className="absolute left-4 top-1/2 -translate-y-1/2 text-lg text-slate-400 font-bold">{currency}</span>}
              <input 
                type="number" 
                value={discount} 
                onChange={(e) => setDiscount(e.target.value)}
                className={`w-full text-xl font-bold bg-white border border-slate-200 rounded-xl py-3 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/10 transition-all ${discountType === "percent" ? "pl-4 pr-10" : "pl-10 pr-4"}`}
              />
              {discountType === "percent" && <span className="absolute right-4 top-1/2 -translate-y-1/2 text-lg text-slate-400 font-bold">%</span>}
            </div>
            
            <AnimatePresence>
              {discountType === "percent" && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="flex flex-wrap gap-1.5 pt-1"
                >
                  {[10, 15, 20, 30, 50, 70].map(v => (
                    <button key={v} onClick={() => setDiscount(v.toString())} className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-600 text-[11px] font-bold rounded-md transition-colors">
                      {v}%
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Additional Coupon Discount */}
        <div className="space-y-2">
          <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">
            Additional Coupon Discount (%) <span className="text-slate-400 font-medium normal-case">(Optional)</span>
          </label>
          <div className="relative w-full sm:w-1/2 pr-0 sm:pr-2">
            <input 
              type="number" 
              value={coupon} 
              onChange={(e) => setCoupon(e.target.value)}
              className="w-full text-lg font-bold bg-white border border-slate-200 rounded-xl px-4 py-2.5 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/10 transition-all pr-10"
            />
            <span className="absolute right-4 sm:right-6 top-1/2 -translate-y-1/2 text-base text-slate-400 font-bold">%</span>
          </div>
        </div>

        {/* Result Box */}
        <div className="bg-[#f0fdf4] border border-emerald-100 rounded-2xl p-5 md:p-6 mt-5 relative overflow-hidden">
          <div className="flex items-center justify-between mb-3">
            <span className="flex items-center gap-1.5 text-xs font-bold text-emerald-900/60">
              <Tag className="w-3.5 h-3.5" />
              Final Payable Price
            </span>
            <div className="flex items-center gap-1.5">
              <button onClick={() => copyToClipboard(`Original Price: ${currency}${res.price} | Discount: ${currency}${res.totalSaved} | Final Payable Price: ${currency}${res.finalPrice}`)} className="flex items-center gap-1 px-2.5 py-1.5 bg-white border border-emerald-200 rounded-md text-xs font-bold text-emerald-700 hover:bg-emerald-50 transition-colors shadow-sm">
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                {copied ? "Copied" : "Copy"}
              </button>
              <button onClick={reset} className="p-1.5 text-emerald-400 hover:text-emerald-600 transition-colors">
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>
          </div>
          
          <div className="flex flex-wrap items-center gap-3 mb-5">
            <div className="flex items-baseline">
              <span className="text-2xl font-bold text-emerald-950 mr-1">{currency}</span>
              <span className="text-4xl md:text-5xl font-extrabold tracking-tight text-emerald-950">
                {res.finalPrice}
              </span>
            </div>
            {parseFloat(res.savePercent) > 0 && (
              <div className="px-2.5 py-1 bg-emerald-100 text-emerald-700 rounded-md font-bold text-xs">
                Save {res.savePercent}%
              </div>
            )}
          </div>
          
          <div className="grid grid-cols-2 gap-4 pt-3 border-t border-emerald-200/50">
            <div>
              <p className="text-[10px] font-bold text-emerald-900/50 mb-0.5 uppercase tracking-wider">Original</p>
              <p className="text-sm font-bold text-emerald-900">{currency}{res.price}</p>
            </div>
            <div>
              <p className="text-[10px] font-bold text-emerald-700 mb-0.5 uppercase tracking-wider">You Save</p>
              <p className="text-sm font-bold text-emerald-700">-{currency}{res.totalSaved}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
