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
  const [currency, setCurrency] = useState<"₹" | "$">("₹");

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
            onClick={() => setCurrency("₹")}
            className={`p-1.5 rounded-md transition-all ${currency === "₹" ? "bg-white shadow-sm text-indigo-600" : "text-slate-900 hover:text-slate-700"}`}
          >
            <IndianRupee className="w-4 h-4" />
          </button>
          <button 
            onClick={() => setCurrency("$")}
            className={`p-1.5 rounded-md transition-all ${currency === "$" ? "bg-white shadow-sm text-indigo-600" : "text-slate-900 hover:text-slate-700"}`}
          >
            <DollarSign className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="space-y-5">
        <div className="flex flex-col gap-5">
          {/* Original Price */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Original Price ({currency})</label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-lg text-slate-400 font-bold">{currency}</span>
              <input 
                type="number" 
                value={originalPrice} 
                onChange={(e) => setOriginalPrice(e.target.value)}
                placeholder="100"
                className="w-full text-xl font-bold bg-white border border-slate-200 rounded-xl pl-10 pr-4 py-3 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/10 transition-all text-slate-900"
              />
            </div>
          </div>

          {/* Discount Section */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Discount</label>
              <div className="flex items-center bg-slate-100 p-1 rounded-lg">
                <button 
                  onClick={() => setDiscountType("percent")}
                  className={`px-3 py-1 text-xs font-bold rounded-md transition-all ${discountType === "percent" ? "bg-white text-indigo-600 shadow-sm" : "text-slate-500 hover:text-slate-700"}`}
                >
                  % Off
                </button>
                <button 
                  onClick={() => setDiscountType("flat")}
                  className={`px-3 py-1 text-xs font-bold rounded-md transition-all ${discountType === "flat" ? "bg-white text-indigo-600 shadow-sm" : "text-slate-500 hover:text-slate-700"}`}
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
                placeholder="20"
                className={`w-full text-xl font-bold bg-white border border-slate-200 rounded-xl py-3 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/10 transition-all text-slate-900 ${discountType === "percent" ? "pl-4 pr-10" : "pl-10 pr-4"}`}
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
                    <button key={v} onClick={() => setDiscount(v.toString())} className="flex-1 py-2 bg-slate-100 hover:bg-slate-200 text-slate-500 text-xs font-bold rounded-lg transition-colors">
                      {v}%
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Additional Coupon Discount */}
        <div className="space-y-2 mt-5">
          <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">
            Additional Coupon <span className="text-slate-400 font-medium normal-case">(Optional)</span>
          </label>
          <div className="relative w-full">
            <input 
              type="number" 
              value={coupon} 
              onChange={(e) => setCoupon(e.target.value)}
              placeholder="0"
              className="w-full text-xl font-bold bg-white border border-slate-200 rounded-xl pl-4 pr-10 py-3 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/10 transition-all text-slate-900"
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-lg text-slate-400 font-bold">%</span>
          </div>
        </div>

        {/* Result Box */}
        <div className="bg-[#f0fbf4] border border-[#d1f4df] rounded-2xl p-5 md:p-6 mt-6 relative overflow-hidden">
          <div className="flex items-center justify-between mb-4">
            <span className="flex items-center gap-1.5 text-[13px] font-bold text-emerald-700">
              <Tag className="w-4 h-4 text-emerald-600/70" />
              Final Payable Price
            </span>
            <div className="flex items-center gap-2">
              <button onClick={() => copyToClipboard(`Original Price: ${currency}${res.price} | Discount: ${currency}${res.totalSaved} | Final Payable Price: ${currency}${res.finalPrice}`)} className="flex items-center gap-1 px-3 py-1.5 bg-white border border-emerald-200/70 rounded-lg text-[11px] font-bold text-emerald-700 hover:bg-emerald-50 transition-colors shadow-sm">
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5 text-emerald-600" />}
                {copied ? "Copied" : "Copy"}
              </button>
              <button onClick={reset} className="p-1.5 bg-white border border-emerald-200/70 rounded-lg text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50 transition-colors shadow-sm">
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
          
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <div className="flex items-baseline">
              <span className="text-5xl font-extrabold tracking-tight text-[#064e3b]">
                {currency}{res.finalPrice}
              </span>
            </div>
            {parseFloat(res.savePercent) > 0 && (
              <div className="px-2.5 py-1 bg-[#c5f2d6] text-[#065f46] rounded-md font-bold text-xs">
                Save {res.savePercent}%
              </div>
            )}
          </div>
          
          <div className="flex justify-between items-center pt-4 border-t border-[#d1f4df]">
            <div>
              <p className="text-[10px] font-bold text-slate-500 mb-0.5 uppercase tracking-wider">Original Price</p>
              <p className="text-sm font-bold text-[#064e3b]">{currency}{res.price}</p>
            </div>
            <div className="text-right">
              <p className="text-[10px] font-bold text-slate-500 mb-0.5 uppercase tracking-wider">Total Savings</p>
              <p className="text-sm font-bold text-[#064e3b]">{currency}{res.totalSaved}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
