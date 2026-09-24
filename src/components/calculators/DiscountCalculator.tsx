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

      <div className="space-y-5 bg-emerald-50/50 border border-emerald-100/50 p-5 md:p-6 rounded-2xl">
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
        <div className="flex flex-col p-6 md:p-8 bg-gradient-to-b from-emerald-50 to-emerald-100/80 rounded-3xl shadow-[0_8px_30px_rgb(5,150,105,0.15)] border border-emerald-200/60 mt-6 relative overflow-hidden">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#05966910_1px,transparent_1px),linear-gradient(to_bottom,#05966910_1px,transparent_1px)] bg-[size:24px_24px]" />
          <div className="absolute left-0 right-0 top-0 h-32 bg-gradient-to-b from-white/40 to-transparent" />
          
          <div className="w-full flex justify-between items-center z-10 mb-6">
            <div className="flex items-center gap-2">
               <div className="p-2 bg-white rounded-xl shadow-sm border border-emerald-200/50">
                  <Tag className="w-5 h-5 text-emerald-600" />
               </div>
               <span className="text-sm font-extrabold text-emerald-800/80 uppercase tracking-widest">Results</span>
            </div>
            
            <div className="flex items-center gap-1.5">
              <button onClick={() => {
                const discountInfo = discountType === 'percent' ? `${discount}%` : `${currency}${discount}`;
                const text = `Discount Calculator
Original Price: ${currency}${res.price}
Discount: ${discountInfo}${coupon ? `\nAdditional Coupon: ${coupon}%` : ''}
Total Savings: ${currency}${res.totalSaved}
Final Payable Price: ${currency}${res.finalPrice}

Calculate Online: https://topcalcbox.com/discount-calculator/`;
                copyToClipboard(text);
              }} className="flex items-center gap-1.5 px-3 py-1.5 bg-white/80 backdrop-blur-md border border-emerald-200 rounded-xl text-[11px] font-bold text-emerald-700 hover:bg-white transition-all shadow-sm">
                {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span className="inline">{copied ? "Copied" : "Copy"}</span>
              </button>
              <button onClick={reset} className="p-1.5 bg-white/80 backdrop-blur-md border border-emerald-200 rounded-xl text-emerald-700 hover:bg-white transition-all shadow-sm">
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
          
          <div className="w-full flex flex-col items-center mb-6 z-10">
            <p className="text-[11px] text-emerald-800/70 uppercase tracking-wider font-extrabold mb-1">Final Payable Price</p>
            <div className="flex items-center gap-3">
              <div className="flex items-baseline drop-shadow-sm">
                <span className="text-3xl font-bold text-emerald-800 mr-1">{currency}</span>
                <span className="text-6xl md:text-7xl font-extrabold tracking-tighter text-slate-900">
                  {res.finalPrice}
                </span>
              </div>
            </div>
            {parseFloat(res.savePercent) > 0 && (
              <div className="mt-3 px-4 py-1.5 bg-emerald-500 text-white rounded-full font-bold text-sm shadow-md shadow-emerald-500/20">
                You Save {res.savePercent}%
              </div>
            )}
          </div>
          
          <div className="w-full max-w-sm mx-auto border-t-2 border-emerald-200/60 my-2 z-10" />
          
          <div className="w-full grid grid-cols-2 md:grid-cols-4 gap-3 mt-4 z-10">
            <div className="bg-white/70 backdrop-blur-sm shadow-sm border border-emerald-200/50 rounded-2xl p-3 flex flex-col items-center text-center">
              <p className="text-[10px] text-emerald-800/70 uppercase tracking-wider font-bold mb-1">Original</p>
              <p className="text-xl font-extrabold text-slate-900">{currency}{res.price}</p>
            </div>
            <div className="bg-white/70 backdrop-blur-sm shadow-sm border border-emerald-200/50 rounded-2xl p-3 flex flex-col items-center text-center">
              <p className="text-[10px] text-emerald-800/70 uppercase tracking-wider font-bold mb-1">Discount</p>
              <p className="text-xl font-extrabold text-slate-900">{discountType === 'percent' ? `${discount || 0}%` : `${currency}${discount || 0}`}</p>
            </div>
            <div className="bg-white/70 backdrop-blur-sm shadow-sm border border-emerald-200/50 rounded-2xl p-3 flex flex-col items-center text-center">
              <p className="text-[10px] text-emerald-800/70 uppercase tracking-wider font-bold mb-1">Coupon</p>
              <p className="text-xl font-extrabold text-slate-900">{coupon ? `${coupon}%` : "None"}</p>
            </div>
            <div className="bg-white/70 backdrop-blur-sm shadow-sm border border-emerald-200/50 rounded-2xl p-3 flex flex-col items-center text-center">
              <p className="text-[10px] text-emerald-800/70 uppercase tracking-wider font-bold mb-1">Saved</p>
              <p className="text-xl font-extrabold text-[#059669]">{currency}{res.totalSaved}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
