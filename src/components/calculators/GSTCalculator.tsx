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
      net: net,
      gst: gst,
      total: total,
      cgst: cgst,
      sgst: sgst,
      igst: igst,
    };
  };

  const res = calculate();

  const formatNumber = (num: number | string) => {
    const val = typeof num === 'string' ? parseFloat(num) : num;
    if (isNaN(val)) return "0";
    return val.toLocaleString('en-IN', { maximumFractionDigits: 2 });
  };

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
          className={`py-2 px-2 rounded-xl text-[11px] sm:text-xs font-bold transition-all flex flex-col items-center justify-center ${mode === "add" ? "bg-white text-purple-700 shadow-sm border border-slate-200/50" : "text-slate-500 hover:text-slate-700"}`}
        >
          <span>Exclusive GST</span>
          <span className="font-medium opacity-80">(Add GST)</span>
        </button>
        <button
          onClick={() => setMode("remove")}
          className={`py-2 px-2 rounded-xl text-[11px] sm:text-xs font-bold transition-all flex flex-col items-center justify-center ${mode === "remove" ? "bg-white text-purple-700 shadow-sm border border-slate-200/50" : "text-slate-500 hover:text-slate-700"}`}
        >
          <span>Inclusive GST</span>
          <span className="font-medium opacity-80">(Remove GST)</span>
        </button>
      </div>

      <div className="space-y-5 bg-purple-50/50 border border-purple-100/50 p-5 md:p-6 rounded-2xl">
        <div className="flex flex-col gap-5">
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
                placeholder="1000"
                className="w-full text-xl font-bold bg-white border border-slate-200 rounded-xl pl-10 pr-4 py-3 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/10 transition-all text-slate-900"
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
                placeholder="28"
                className="w-full text-xl font-bold bg-white border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/10 transition-all pr-10 text-slate-900"
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-base text-slate-400 font-bold">%</span>
            </div>
            <div className="flex flex-wrap gap-1.5 pt-1">
              {[5, 12, 18, 28].map(v => (
                <button key={v} onClick={() => setRate(v.toString())} className="flex-1 py-2 bg-slate-100 hover:bg-slate-200 text-slate-500 text-xs font-bold rounded-lg transition-colors">
                  {v}%
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* State Type Radio */}
        <div className="mt-5">
          <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-2">GST Type</label>
          <div className="grid grid-cols-2 gap-3">
            <button 
              onClick={() => setStateType("intra")} 
              className={`flex items-center justify-between p-3 rounded-xl border text-left transition-all ${stateType === "intra" ? "border-purple-400 bg-purple-50/50" : "border-slate-200 bg-white hover:border-slate-300"}`}
            >
              <div>
                <p className={`text-[13px] font-bold ${stateType === "intra" ? "text-purple-700" : "text-slate-800"}`}>Intra-State</p>
                <p className="text-[10px] text-slate-500 font-medium mt-0.5">CGST + SGST</p>
              </div>
              <div className={`w-5 h-5 rounded-full flex items-center justify-center ${stateType === "intra" ? "bg-purple-600 text-white" : "border-2 border-slate-200"}`}>
                {stateType === "intra" && <Check className="w-3 h-3" strokeWidth={3} />}
              </div>
            </button>
            <button 
              onClick={() => setStateType("inter")} 
              className={`flex items-center justify-between p-3 rounded-xl border text-left transition-all ${stateType === "inter" ? "border-purple-400 bg-purple-50/50" : "border-slate-200 bg-white hover:border-slate-300"}`}
            >
              <div>
                <p className={`text-[13px] font-bold ${stateType === "inter" ? "text-purple-700" : "text-slate-800"}`}>Inter-State</p>
                <p className="text-[10px] text-slate-500 font-medium mt-0.5">IGST</p>
              </div>
              <div className={`w-5 h-5 rounded-full flex items-center justify-center ${stateType === "inter" ? "bg-purple-600 text-white" : "border-2 border-slate-200"}`}>
                {stateType === "inter" && <Check className="w-3 h-3" strokeWidth={3} />}
              </div>
            </button>
          </div>
        </div>

        {/* Result Box */}
        <div className="flex flex-col items-center justify-center p-6 md:p-8 bg-gradient-to-b from-slate-50 to-purple-50/40 rounded-3xl shadow-[0_8px_30px_rgb(168,85,247,0.12)] border border-purple-200/60 relative overflow-hidden mt-6">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#a855f708_1px,transparent_1px),linear-gradient(to_bottom,#a855f708_1px,transparent_1px)] bg-[size:24px_24px]" />
          
          <div className="w-full flex justify-between items-center mb-6 z-10 flex-wrap gap-4">
            <div className="flex items-center gap-2 text-purple-800">
               <Receipt className="w-4 h-4 text-purple-500" />
               <h3 className="font-bold text-sm md:text-base uppercase tracking-wider">{mode === "add" ? "Total Price (Incl. GST)" : "Net Price (Excl. GST)"}</h3>
            </div>
            <div className="flex items-center gap-2 ml-auto">
              <button 
                onClick={() => {
                  const text = `GST Calculator
Amount: ₹${amount}
GST Rate: ${rate}%
GST Amount: ₹${formatNumber(res.gst)}
${mode === 'add' ? 'Final Amount: ₹' + formatNumber(res.total) : 'Net Amount: ₹' + formatNumber(res.net)}

Calculate Online: https://topcalcbox.com/gst-calculator/`;
                  copyToClipboard(text);
                }} 
                className="flex items-center gap-1.5 px-3 py-1.5 bg-white/80 backdrop-blur-md border border-purple-200 rounded-xl text-[11px] font-bold text-purple-700 hover:bg-white transition-all shadow-sm"
              >
                <span className="inline">{copied ? "Copied" : "Copy"}</span>
              </button>
              <button 
                onClick={reset}
                className="p-1.5 bg-white/80 backdrop-blur-md border border-purple-200 rounded-xl text-purple-700 hover:bg-white transition-all shadow-sm"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
          
          <div className="w-full z-10">
            <motion.div 
              key={`${amount}-${rate}-${mode}`}
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="w-full space-y-4"
            >
              <div className="bg-white/80 backdrop-blur-sm shadow-sm border border-purple-200/50 rounded-2xl p-6 flex flex-col items-center justify-center text-center">
                <p className="text-[10px] text-purple-800/70 font-bold uppercase tracking-widest mb-2">Final Amount</p>
                <div className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tighter mb-3 drop-shadow-sm truncate px-2 w-full">
                  <span className="text-2xl md:text-3xl font-bold text-slate-400 mr-1">₹</span>{formatNumber(mode === "add" ? res.total : res.net)}
                </div>
                <div className="bg-purple-100/50 border border-purple-200 text-purple-800 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider">
                  {rate}% GST {mode === "add" ? "Included" : "Excluded"}
                </div>
              </div>

              {/* Target Cards */}
              <div className="bg-white/80 backdrop-blur-sm shadow-sm border border-purple-200/50 rounded-2xl p-5">
                <div className="space-y-3">
                  <div className="flex justify-between items-center p-3 rounded-xl bg-slate-50/80 border border-slate-100">
                    <span className="text-slate-600 font-bold">Net Amount</span>
                    <span className="text-slate-900 font-black truncate max-w-[50%]">₹{formatNumber(res.net)}</span>
                  </div>
                  {stateType === "intra" ? (
                    <>
                      <div className="flex justify-between items-center p-3 rounded-xl bg-slate-50/80 border border-slate-100">
                        <span className="text-slate-600 font-bold">CGST ({(parseFloat(rate)/2) || 0}%)</span>
                        <span className="text-purple-700 font-black truncate max-w-[50%]">+₹{formatNumber(res.cgst)}</span>
                      </div>
                      <div className="flex justify-between items-center p-3 rounded-xl bg-slate-50/80 border border-slate-100">
                        <span className="text-slate-600 font-bold">SGST ({(parseFloat(rate)/2) || 0}%)</span>
                        <span className="text-purple-700 font-black truncate max-w-[50%]">+₹{formatNumber(res.sgst)}</span>
                      </div>
                    </>
                  ) : (
                    <div className="flex justify-between items-center p-3 rounded-xl bg-slate-50/80 border border-slate-100">
                      <span className="text-slate-600 font-bold">IGST ({rate || 0}%)</span>
                      <span className="text-purple-700 font-black truncate max-w-[50%]">+₹{formatNumber(res.igst)}</span>
                    </div>
                  )}
                  <div className="flex justify-between items-center p-3 rounded-xl bg-purple-50 border border-purple-100 mt-2">
                    <span className="text-purple-900 font-black">Total Amount</span>
                    <span className="text-purple-900 font-black truncate max-w-[50%]">₹{formatNumber(res.total)}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

      </div>
    </div>
  );
}
