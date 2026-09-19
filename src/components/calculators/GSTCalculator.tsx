"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Receipt, Copy, RotateCcw, Check } from "lucide-react";

type GSTMode = "add" | "remove";
type StateType = "intra" | "inter";

export function GSTCalculator() {
  const [mode, setMode] = useState<GSTMode>("add");
  const [amount, setAmount] = useState("1000");
  const [rate, setRate] = useState("18");
  const [stateType, setStateType] = useState<StateType>("intra");
  const [copied, setCopied] = useState(false);

  const calculate = () => {
    const a = parseFloat(amount) || 0;
    const r = parseFloat(rate) || 0;

    let net = 0;
    let gst = 0;
    let total = 0;

    if (mode === "add") {
      net = a;
      gst = (a * r) / 100;
      total = a + gst;
    } else {
      total = a;
      gst = a - (a * (100 / (100 + r)));
      net = a - gst;
    }

    const cgst = gst / 2;
    const sgst = gst / 2;
    const igst = gst;

    return {
      net: net.toFixed(2).replace(/\.00$/, ''),
      gst: gst.toFixed(2).replace(/\.00$/, ''),
      total: total.toFixed(2).replace(/\.00$/, ''),
      cgst: cgst.toFixed(2).replace(/\.00$/, ''),
      sgst: sgst.toFixed(2).replace(/\.00$/, ''),
      igst: igst.toFixed(2).replace(/\.00$/, ''),
    };
  };

  const res = calculate();

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const reset = () => {
    setAmount("");
    setRate("18");
    setStateType("intra");
    setMode("add");
  };

  return (
    <div className="w-full">
      {/* Tabs */}
      <div className="bg-slate-50 p-1.5 rounded-2xl grid grid-cols-2 gap-1 mb-5">
        <button
          onClick={() => setMode("add")}
          className={`py-2 px-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${mode === "add" ? "bg-white text-violet-600 shadow-sm border border-slate-200/50" : "text-slate-500 hover:text-slate-700"}`}
        >
          Exclusive GST (Add GST)
        </button>
        <button
          onClick={() => setMode("remove")}
          className={`py-2 px-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${mode === "remove" ? "bg-white text-violet-600 shadow-sm border border-slate-200/50" : "text-slate-500 hover:text-slate-700"}`}
        >
          Inclusive GST (Remove GST)
        </button>
      </div>

      <div className="space-y-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Amount */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              {mode === "add" ? "Net Amount (₹)" : "Total Amount (₹)"}
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-lg text-slate-400 font-bold">₹</span>
              <input 
                type="number" 
                value={amount} 
                onChange={(e) => setAmount(e.target.value)}
                className="w-full text-xl font-bold bg-white border border-slate-200 rounded-xl pl-10 pr-4 py-3 focus:outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-500/10 transition-all"
              />
            </div>
          </div>

          {/* GST Rate */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">GST Rate (%)</label>
            <div className="relative">
              <input 
                type="number" 
                value={rate} 
                onChange={(e) => setRate(e.target.value)}
                className="w-full text-xl font-bold bg-white border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-500/10 transition-all pr-10"
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-base text-slate-400 font-bold">%</span>
            </div>
            <div className="flex flex-wrap gap-1.5 pt-1">
              {[5, 12, 18, 28].map(v => (
                <button key={v} onClick={() => setRate(v.toString())} className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-600 text-[11px] font-bold rounded-md transition-colors">
                  {v}%
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* State Type Radio */}
        <div>
          <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-2">GST Type</label>
          <div className="flex flex-col sm:flex-row gap-3">
            <label className="flex items-center gap-2 cursor-pointer group">
              <div className={`w-4 h-4 rounded-full border-[1.5px] flex items-center justify-center transition-colors ${stateType === "intra" ? "border-violet-500" : "border-slate-300 group-hover:border-slate-400"}`}>
                {stateType === "intra" && <div className="w-2 h-2 bg-violet-500 rounded-full" />}
              </div>
              <span className="text-slate-700 text-sm font-medium">Intra-State (CGST + SGST)</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer group">
              <div className={`w-4 h-4 rounded-full border-[1.5px] flex items-center justify-center transition-colors ${stateType === "inter" ? "border-violet-500" : "border-slate-300 group-hover:border-slate-400"}`}>
                {stateType === "inter" && <div className="w-2 h-2 bg-violet-500 rounded-full" />}
              </div>
              <span className="text-slate-700 text-sm font-medium">Inter-State (IGST)</span>
            </label>
          </div>
        </div>

        {/* Result Box */}
        <div className="bg-[#f5f3ff] border border-violet-100 rounded-2xl p-5 md:p-6 mt-5 relative overflow-hidden">
          <div className="flex items-center justify-between mb-4">
            <span className="flex items-center gap-1.5 text-xs font-bold text-violet-900/60">
              <Receipt className="w-3.5 h-3.5" />
              {mode === "add" ? "Total Price (Incl. GST)" : "Net Price (Excl. GST)"}
            </span>
            <div className="flex items-center gap-1.5">
              <button onClick={() => copyToClipboard(mode === "add" ? `Net Amount: ₹${res.net} | GST: ₹${res.gst} | Total Price: ₹${res.total}` : `Total Amount: ₹${res.total} | GST: ₹${res.gst} | Net Price: ₹${res.net}`)} className="flex items-center gap-1 px-2.5 py-1.5 bg-white border border-violet-200 rounded-md text-xs font-bold text-violet-700 hover:bg-violet-50 transition-colors shadow-sm">
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                {copied ? "Copied" : "Copy"}
              </button>
              <button onClick={reset} className="p-1.5 text-violet-400 hover:text-violet-600 transition-colors">
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>
          </div>
          
          <div className="flex items-baseline mb-5">
            <span className="text-2xl font-bold text-violet-950 mr-1">₹</span>
            <span className="text-4xl md:text-5xl font-extrabold tracking-tight text-violet-950">
              {mode === "add" ? res.total : res.net}
            </span>
          </div>
          
          <div className="space-y-2 pt-3 border-t border-violet-200/50">
            <div className="flex justify-between items-center text-xs">
              <span className="font-bold text-violet-900/60">Net Amount</span>
              <span className="font-bold text-violet-900">₹{res.net}</span>
            </div>
            
            {stateType === "intra" ? (
              <>
                <div className="flex justify-between items-center text-xs">
                  <span className="font-bold text-violet-900/60">CGST ({(parseFloat(rate)/2) || 0}%)</span>
                  <span className="font-bold text-violet-900">+₹{res.cgst}</span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="font-bold text-violet-900/60">SGST ({(parseFloat(rate)/2) || 0}%)</span>
                  <span className="font-bold text-violet-900">+₹{res.sgst}</span>
                </div>
              </>
            ) : (
              <div className="flex justify-between items-center text-xs">
                <span className="font-bold text-violet-900/60">IGST ({rate || 0}%)</span>
                <span className="font-bold text-violet-900">+₹{res.igst}</span>
              </div>
            )}
            
            <div className="flex justify-between items-center text-xs pt-2 border-t border-violet-200/50">
              <span className="font-bold text-violet-900/80">Total Amount</span>
              <span className="font-bold text-violet-900">₹{res.total}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
