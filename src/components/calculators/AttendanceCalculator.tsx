"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ClipboardCheck, Copy, Check, RotateCcw, AlertTriangle, CheckCircle2 } from "lucide-react";

export function AttendanceCalculator() {
  const [attended, setAttended] = useState<string>("");
  const [total, setTotal] = useState<string>("");
  const [target, setTarget] = useState<string>("75");
  const [copied, setCopied] = useState(false);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const reset = () => {
    setAttended("");
    setTotal("");
    setTarget("75");
  };

  const calculate = () => {
    const a = parseInt(attended);
    const t = parseInt(total);
    const targetPercent = parseFloat(target);

    if (!isNaN(a) && !isNaN(t) && t > 0 && a >= 0 && a <= t) {
      const currentPercent = (a / t) * 100;
      let statusString = "";
      let statusNode = null;
      let alert = null;
      
      if (!isNaN(targetPercent) && targetPercent > 0 && targetPercent <= 100) {
        if (currentPercent < targetPercent) {
          const needed = Math.ceil(((targetPercent * t) - (100 * a)) / (100 - targetPercent));
          const futureTotal = t + needed;
          const futureAttended = a + needed;
          const futurePercent = ((futureAttended / futureTotal) * 100).toFixed(2);
          
          statusString = `You need to attend ${needed} more classes to attain ${targetPercent}% attendance.\nCurrent Attendance: ${a}/${t} ${currentPercent.toFixed(2)}%\nAttendance Required: ${futureAttended}/${futureTotal} -> ${futurePercent}%`;
          
          statusNode = (
            <div className="flex flex-col gap-3 w-full">
               <div className="font-bold text-center text-slate-800">
                  You need to attend {needed} more classes to attain<br/>{targetPercent}% attendance
               </div>
               <div className="bg-orange-50/80 p-3 md:p-4 rounded-xl border border-orange-200/60 text-left">
                  <div className="flex justify-between items-center text-xs md:text-sm mb-2 text-slate-600">
                    <span>Current Attendance:</span>
                    <span className="font-bold text-slate-900">{a}/{t} {currentPercent.toFixed(2)}%</span>
                  </div>
                  <div className="flex justify-between items-center text-xs md:text-sm text-slate-600">
                    <span>Attendance Required:</span>
                    <span className="font-bold text-slate-900">{futureAttended}/{futureTotal} &rarr; {futurePercent}%</span>
                  </div>
               </div>
            </div>
          );
          alert = "shortage";
        } else {
          const canSkip = Math.floor(((100 * a) - (targetPercent * t)) / targetPercent);
          const futureTotal = t + canSkip;
          const futurePercent = ((a / futureTotal) * 100).toFixed(2);
          
          statusString = `You can bunk for ${canSkip} more days.\nCurrent Attendance: ${a}/${t} ${currentPercent.toFixed(2)}%\nAttendance Then: ${a}/${futureTotal} ${futurePercent}%`;
          
          statusNode = (
            <div className="flex flex-col gap-3 w-full">
               <div className="font-bold text-center text-slate-800">
                  You can bunk for {canSkip} more days.
               </div>
               <div className="bg-orange-50/80 p-3 md:p-4 rounded-xl border border-orange-200/60 text-left">
                  <div className="flex justify-between items-center text-xs md:text-sm mb-2 text-slate-600">
                    <span>Current Attendance:</span>
                    <span className="font-bold text-slate-900">{a}/{t} {currentPercent.toFixed(2)}%</span>
                  </div>
                  <div className="flex justify-between items-center text-xs md:text-sm text-slate-600">
                    <span>Attendance Then:</span>
                    <span className="font-bold text-slate-900">{a}/{futureTotal} {futurePercent}%</span>
                  </div>
               </div>
            </div>
          );
          alert = "met";
        }
      }

      return {
        percentage: currentPercent.toFixed(2),
        statusString,
        statusNode,
        alert
      };
    }

    return { percentage: "0.00", statusString: "", statusNode: null, alert: null };
  };

  const result = calculate();

  return (
    <div className="w-full md: relative overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-64 bg-orange-500/10 rounded-full blur-[80px] pointer-events-none" />
      
      <div className="relative z-10 space-y-6">
        <div className="space-y-6 bg-orange-50/50 border border-orange-100/50 p-5 md:p-6 rounded-2xl">
          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700">Classes Held (Total)</label>
            <input
              type="number"
              value={total}
              onChange={(e) => setTotal(e.target.value)}
              placeholder="e.g. 50"
              className="w-full bg-slate-50/80 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 focus:outline-none focus:ring-2 focus:ring-orange-500/50 transition-all shadow-inner"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700">Classes Attended</label>
            <input
              type="number"
              value={attended}
              onChange={(e) => setAttended(e.target.value)}
              placeholder="e.g. 35"
              className="w-full bg-slate-50/80 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 focus:outline-none focus:ring-2 focus:ring-orange-500/50 transition-all shadow-inner"
            />
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700">Target Attendance (%)</label>
            <input
              type="number"
              value={target}
              onChange={(e) => setTarget(e.target.value)}
              placeholder="e.g. 75"
              className="w-full bg-slate-50/80 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 focus:outline-none focus:ring-2 focus:ring-orange-500/50 transition-all shadow-inner"
            />
          </div>
        </div>

        <div className="flex flex-col items-center justify-center p-8 bg-gradient-to-b from-orange-50 to-orange-100/80 rounded-3xl shadow-[0_8px_30px_rgb(249,115,22,0.15)] border border-orange-200/60 relative overflow-hidden">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#f9731610_1px,transparent_1px),linear-gradient(to_bottom,#f9731610_1px,transparent_1px)] bg-[size:24px_24px]" />
          <div className="absolute left-0 right-0 top-0 h-32 bg-gradient-to-b from-white/40 to-transparent" />

          <div className="absolute top-4 right-4 flex items-center gap-2 z-10">
            <button onClick={() => {
              const text = `Attendance Percentage Calculator
Classes Held (Total): ${total || 0}
Classes Attended: ${attended || 0}
Target Attendance: ${target || 0}%
Current Attendance: ${result.percentage}%

${result.statusString}

Calculate Online: https://topcalcbox.com/attendance-percentage-calculator/`;
              copyToClipboard(text);
            }} className="flex items-center gap-1.5 px-3 py-1.5 bg-white/80 backdrop-blur-md border border-orange-200 rounded-xl text-[11px] font-bold text-orange-700 hover:bg-white transition-all shadow-sm">
              {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              <span className="inline">{copied ? "Copied" : "Copy"}</span>
            </button>
            <button onClick={reset} className="p-1.5 bg-white/80 backdrop-blur-md border border-orange-200 rounded-xl text-orange-700 hover:bg-white transition-all shadow-sm">
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>
          

          
          <p className="text-sm text-orange-800/70 uppercase tracking-widest font-extrabold mb-2 z-10">
            Current Attendance
          </p>
          
          <motion.div 
            key={result.percentage}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="text-6xl md:text-7xl font-extrabold text-slate-900 tracking-tighter mb-6 drop-shadow-sm flex items-end z-10"
          >
            {result.percentage}<span className="text-3xl font-bold text-orange-600 ml-1 mb-1.5 opacity-90">%</span>
          </motion.div>

          <div className="w-full max-w-sm border-t-2 border-orange-200/60 my-2 z-10" />

          {result.statusNode ? (
             <div className="w-full flex flex-col items-center mt-4 z-10">
                <div className="w-full bg-white/70 backdrop-blur-md p-5 rounded-2xl border border-orange-200/60 shadow-sm relative overflow-hidden">
                  <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-orange-400" />
                  {result.statusNode}
                </div>
                
                {result.alert === "shortage" && (
                  <div className="flex justify-center mt-5 mb-1">
                    <div className="flex items-center gap-2 px-5 py-2.5 bg-rose-500 text-white font-bold rounded-full text-sm shadow-md shadow-rose-500/20">
                      <AlertTriangle className="w-4 h-4" /> Shortage Alert
                    </div>
                  </div>
                )}
                {result.alert === "met" && (
                  <div className="flex justify-center mt-5 mb-1">
                    <div className="flex items-center gap-2 px-5 py-2.5 bg-emerald-500 text-white font-bold rounded-full text-sm shadow-md shadow-emerald-500/20">
                      <CheckCircle2 className="w-4 h-4" /> Criteria Met
                    </div>
                  </div>
                )}
             </div>
          ) : (
            <div className="w-full flex justify-center text-center text-sm mt-4 z-10 bg-white/50 backdrop-blur-sm p-4 rounded-xl border border-orange-200/50">
              <span className="text-slate-700 font-bold">Enter your attendance details above</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
