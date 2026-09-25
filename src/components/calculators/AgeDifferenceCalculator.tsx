"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Users, Copy, Check, RotateCcw, ArrowRight, Calendar } from "lucide-react";

export function AgeDifferenceCalculator() {
  const [date1Input, setDate1Input] = useState<string>("");
  const [date2Input, setDate2Input] = useState<string>("");
  const [copied, setCopied] = useState(false);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const formatInputDate = (val: string) => {
    let cleaned = val.replace(/\D/g, "");
    if (cleaned.length > 2) {
      cleaned = cleaned.slice(0, 2) + "/" + cleaned.slice(2);
    }
    if (cleaned.length > 5) {
      cleaned = cleaned.slice(0, 5) + "/" + cleaned.slice(5, 9);
    }
    return cleaned;
  };

  const parseDateStr = (str: string) => {
    if (!str || str.length !== 10) return null;
    const parts = str.split("/");
    if (parts.length !== 3) return null;
    const d = parseInt(parts[0], 10);
    const m = parseInt(parts[1], 10) - 1;
    const y = parseInt(parts[2], 10);
    const date = new Date(y, m, d);
    if (date.getDate() === d && date.getMonth() === m && date.getFullYear() === y) {
      return date;
    }
    return null;
  };

  const formatFriendlyDate = (date: Date | null) => {
    if (!date) return "";
    return date.toLocaleDateString('en-GB', { day: '2-digit', month: 'long', year: 'numeric' });
  };

  const calculateDifference = () => {
    const d1 = parseDateStr(date1Input);
    const d2 = parseDateStr(date2Input);

    if (!d1 || !d2) return null;

    let olderDate = d1 < d2 ? d1 : d2;
    let youngerDate = d1 < d2 ? d2 : d1;

    let years = youngerDate.getFullYear() - olderDate.getFullYear();
    let months = youngerDate.getMonth() - olderDate.getMonth();
    let days = youngerDate.getDate() - olderDate.getDate();

    if (days < 0) {
      months--;
      const previousMonth = new Date(youngerDate.getFullYear(), youngerDate.getMonth(), 0);
      days += previousMonth.getDate();
    }

    if (months < 0) {
      years--;
      months += 12;
    }

    return { years, months, days };
  };

  const diff = calculateDifference();
  const d1Date = parseDateStr(date1Input);
  const d2Date = parseDateStr(date2Input);
  
  const totalDays = d1Date && d2Date ? Math.floor(Math.abs(d1Date.getTime() - d2Date.getTime()) / (1000 * 3600 * 24)) : null;

  return (
    <div className="w-full md: relative overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-[80px] pointer-events-none" />
      
      <div className="relative z-10 space-y-6">
        <div className="space-y-6 bg-indigo-50/50 border border-indigo-100/50 p-5 md:p-6 rounded-2xl">
          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700">First Person's DOB</label>
            <input
              type="text"
              inputMode="numeric"
              value={date1Input}
              onChange={(e) => setDate1Input(formatInputDate(e.target.value))}
              placeholder="DD/MM/YYYY"
              className="w-full bg-slate-50/80 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all shadow-inner"
            />
            {d1Date && (
              <motion.div initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} className="inline-flex items-center gap-1.5 mt-2 ml-1 px-2.5 py-1 bg-indigo-100/70 border border-indigo-200 text-indigo-800 rounded-md">
                 <Calendar className="w-3.5 h-3.5" />
                 <p className="text-xs md:text-sm font-bold">
                   {formatFriendlyDate(d1Date)}
                 </p>
              </motion.div>
            )}
          </div>
          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700">Second Person's DOB</label>
            <input
              type="text"
              inputMode="numeric"
              value={date2Input}
              onChange={(e) => setDate2Input(formatInputDate(e.target.value))}
              placeholder="DD/MM/YYYY"
              className="w-full bg-slate-50/80 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all shadow-inner"
            />
            {d2Date && (
              <motion.div initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} className="inline-flex items-center gap-1.5 mt-2 ml-1 px-2.5 py-1 bg-indigo-100/70 border border-indigo-200 text-indigo-800 rounded-md">
                 <Calendar className="w-3.5 h-3.5" />
                 <p className="text-xs md:text-sm font-bold">
                   {formatFriendlyDate(d2Date)}
                 </p>
              </motion.div>
            )}
          </div>
        </div>

        <div className="flex flex-col items-center justify-center p-6 md:p-8 bg-gradient-to-b from-slate-50 to-indigo-50/40 rounded-3xl shadow-[0_8px_30px_rgb(79,70,229,0.12)] border border-indigo-200/60 relative overflow-hidden">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f46e508_1px,transparent_1px),linear-gradient(to_bottom,#4f46e508_1px,transparent_1px)] bg-[size:24px_24px]" />
          
          <div className="w-full flex justify-between items-center mb-6 z-10 flex-wrap gap-4">
            <div className="flex items-center gap-2 text-indigo-800">
               <Users className="w-5 h-5" />
               <h3 className="font-bold text-sm md:text-base">Comparative Age Difference</h3>
            </div>
            <div className="flex items-center gap-2 ml-auto">
              <button onClick={() => {
                const text = `Age Difference Calculator
Person 1: ${date1Input} ${d1Date ? `(${formatFriendlyDate(d1Date)})` : ''}
Person 2: ${date2Input} ${d2Date ? `(${formatFriendlyDate(d2Date)})` : ''}
Result: Person 1 is ${d1Date && d2Date ? (d1Date.getTime() === d2Date.getTime() ? "exactly the same age as" : (d1Date < d2Date ? "older than" : "younger than")) : ''} Person 2
Age Gap: ${diff ? `${diff.years} Years, ${diff.months} Months, ${diff.days} Days` : ''}
Total Absolute Gap: ${totalDays ? totalDays.toLocaleString() : ''} Days

Calculate Online: https://topcalcbox.com/age-difference-calculator/`;
                copyToClipboard(text);
              }} className="flex items-center gap-1.5 px-3 py-1.5 bg-white/80 backdrop-blur-md border border-indigo-200 rounded-xl text-[11px] font-bold text-indigo-700 hover:bg-white transition-all shadow-sm">
                {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span className="inline">{copied ? "Copied" : "Copy Summary"}</span>
              </button>
              <button onClick={() => { setDate1Input(""); setDate2Input(""); }} className="p-1.5 bg-white/80 backdrop-blur-md border border-indigo-200 rounded-xl text-indigo-700 hover:bg-white transition-all shadow-sm">
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
          
          <div className="w-full z-10">
            {diff ? (
              <motion.div 
                key={`${diff.years}-${diff.months}-${diff.days}`}
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="w-full space-y-4"
              >
                <div className="bg-white/80 backdrop-blur-sm shadow-sm border border-indigo-200/50 rounded-2xl p-5 text-left">
                  <p className="text-sm md:text-base font-medium text-slate-800 flex items-center gap-2 flex-wrap">
                    <span className="font-bold text-indigo-700">Person 1</span> 
                    <ArrowRight className="w-4 h-4 text-slate-400" /> 
                    <span>is {d1Date!.getTime() === d2Date!.getTime() ? "exactly the same age as" : (d1Date! < d2Date! ? "older than" : "younger than")} Person 2</span>
                  </p>
                  <p className="text-xs text-slate-500 mt-1">Chronological separation:</p>
                </div>
                
                <div className="grid grid-cols-3 gap-3">
                  <div className="bg-white/80 backdrop-blur-sm shadow-sm border border-indigo-200/50 rounded-2xl p-4 flex flex-col items-center justify-center">
                    <span className="text-3xl md:text-4xl font-extrabold text-slate-900">{diff.years}</span>
                    <span className="text-[10px] text-indigo-800/70 font-bold uppercase tracking-wider mt-1">Years</span>
                  </div>
                  <div className="bg-white/80 backdrop-blur-sm shadow-sm border border-indigo-200/50 rounded-2xl p-4 flex flex-col items-center justify-center">
                    <span className="text-3xl md:text-4xl font-extrabold text-slate-900">{diff.months}</span>
                    <span className="text-[10px] text-indigo-800/70 font-bold uppercase tracking-wider mt-1">Months</span>
                  </div>
                  <div className="bg-white/80 backdrop-blur-sm shadow-sm border border-indigo-200/50 rounded-2xl p-4 flex flex-col items-center justify-center">
                    <span className="text-3xl md:text-4xl font-extrabold text-slate-900">{diff.days}</span>
                    <span className="text-[10px] text-indigo-800/70 font-bold uppercase tracking-wider mt-1">Days</span>
                  </div>
                </div>

                <div className="border-t-2 border-indigo-100/60 mt-4 pt-5 pb-2 flex justify-between items-center text-sm">
                  <span className="text-slate-600 font-medium">Total Absolute Gap:</span>
                  <span className="font-extrabold text-slate-900 text-lg">
                    {totalDays?.toLocaleString()} <span className="text-indigo-800 text-sm font-bold">Days</span>
                  </span>
                </div>
              </motion.div>
            ) : (
              <div className="text-center text-lg text-indigo-700/70 font-bold mt-4 bg-white/50 backdrop-blur-sm px-6 py-8 rounded-xl border border-indigo-200/50">
                Enter both dates to compare
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
