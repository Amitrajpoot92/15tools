"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Tag, Copy, RotateCcw, Check } from "lucide-react";

export function DiscountCalculator() {
  const [originalPrice, setOriginalPrice] = useState("100");
  const [discountType, setDiscountType] = useState<"percent" | "flat">("percent");
  const [discount, setDiscount] = useState("20");
  const [coupon, setCoupon] = useState("");
  const [copied, setCopied] = useState(false);

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
    <div className="bg-white rounded-[2rem] p-4 md:p-8 shadow-sm border border-slate-200">
      <div className="space-y-6">
        {/* Original Price */}
        <div className="space-y-2">
          <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Original Price (₹)</label>
          <div className="relative">
            <span className="absolute left-5 top-1/2 -translate-y-1/2 text-xl text-slate-400 font-bold">₹</span>
            <input 
              type="number" 
              value={originalPrice} 
              onChange={(e) => setOriginalPrice(e.target.value)}
              className="w-full text-2xl font-bold bg-white border border-slate-200 rounded-2xl pl-12 pr-5 py-4 focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all"
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
                className={`px-3 py-1 text-xs font-bold rounded-md transition-all ${discountType === "percent" ? "bg-white text-indigo-600 shadow-sm border border-slate-200/50" : "text-slate-500 hover:text-slate-700"}`}
              >
                % Off
              </button>
              <button 
                onClick={() => setDiscountType("flat")}
                className={`px-3 py-1 text-xs font-bold rounded-md transition-all ${discountType === "flat" ? "bg-white text-indigo-600 shadow-sm border border-slate-200/50" : "text-slate-500 hover:text-slate-700"}`}
              >
                Flat ₹
              </button>
            </div>
          </div>
          
          <div className="relative">
            {discountType === "flat" && <span className="absolute left-5 top-1/2 -translate-y-1/2 text-xl text-slate-400 font-bold">₹</span>}
            <input 
              type="number" 
              value={discount} 
              onChange={(e) => setDiscount(e.target.value)}
              className={`w-full text-2xl font-bold bg-white border border-slate-200 rounded-2xl py-4 focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all ${discountType === "percent" ? "pl-5 pr-12" : "pl-12 pr-5"}`}
            />
            {discountType === "percent" && <span className="absolute right-5 top-1/2 -translate-y-1/2 text-xl text-slate-400 font-bold">%</span>}
          </div>
          
          <AnimatePresence>
            {discountType === "percent" && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="flex flex-wrap gap-2 pt-2"
              >
                {[10, 15, 20, 30, 50, 70].map(v => (
                  <button key={v} onClick={() => setDiscount(v.toString())} className="px-3.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-600 text-sm font-bold rounded-lg transition-colors">
                    {v}%
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Additional Coupon Discount */}
        <div className="space-y-2">
          <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">
            Additional Coupon Discount (%) <span className="text-slate-400 font-medium normal-case">(Optional)</span>
          </label>
          <div className="relative">
            <input 
              type="number" 
              value={coupon} 
              onChange={(e) => setCoupon(e.target.value)}
              className="w-full text-xl font-bold bg-white border border-slate-200 rounded-2xl px-5 py-3.5 focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all pr-12"
            />
            <span className="absolute right-5 top-1/2 -translate-y-1/2 text-lg text-slate-400 font-bold">%</span>
          </div>
        </div>

        {/* Result Box */}
        <div className="bg-[#f0fdf4] border border-emerald-100 rounded-[2rem] p-6 md:p-8 mt-8 relative overflow-hidden">
          <div className="flex items-center justify-between mb-4">
            <span className="flex items-center gap-1.5 text-sm font-bold text-emerald-900/60">
              <Tag className="w-4 h-4" />
              Final Payable Price
            </span>
            <div className="flex items-center gap-2">
              <button onClick={() => copyToClipboard(`₹${res.finalPrice}`)} className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-emerald-200 rounded-lg text-sm font-bold text-emerald-700 hover:bg-emerald-50 transition-colors shadow-sm">
                {copied ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                {copied ? "Copied" : "Copy"}
              </button>
              <button onClick={reset} className="p-1.5 text-emerald-400 hover:text-emerald-600 transition-colors">
                <RotateCcw className="w-5 h-5" />
              </button>
            </div>
          </div>
          
          <div className="flex flex-wrap items-center gap-4 mb-8">
            <div className="flex items-baseline">
              <span className="text-3xl font-bold text-emerald-950 mr-1">₹</span>
              <span className="text-5xl md:text-6xl font-extrabold tracking-tight text-emerald-950">
                {res.finalPrice}
              </span>
            </div>
            {parseFloat(res.savePercent) > 0 && (
              <div className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full font-bold text-sm">
                Save {res.savePercent}%
              </div>
            )}
          </div>
          
          <div className="grid grid-cols-2 gap-4 pt-4 border-t border-emerald-200/50">
            <div>
              <p className="text-xs font-bold text-emerald-900/50 mb-1">Original</p>
              <p className="text-base font-bold text-emerald-900">₹{res.price}</p>
            </div>
            <div>
              <p className="text-xs font-bold text-emerald-700 mb-1">You Save</p>
              <p className="text-base font-bold text-emerald-700">-₹{res.totalSaved}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
