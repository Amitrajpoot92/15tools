"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Clock, Copy, Check, RotateCcw, Briefcase, Calendar } from "lucide-react";

export function DateDifferenceCalculator() {
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

    const startDate = d1 < d2 ? d1 : d2;
    const endDate = d1 < d2 ? d2 : d1;

    const timeDiff = endDate.getTime() - startDate.getTime();
    const totalDays = Math.round(timeDiff / (1000 * 3600 * 24));
    
    const totalWeeks = Math.floor(totalDays / 7);
    const remainingDays = totalDays % 7;
    
    let weekendDays = totalWeeks * 2;
    
    const startDayOfWeek = startDate.getDay();
    for (let i = 1; i <= remainingDays; i++) {
        let currentDay = (startDayOfWeek + i) % 7;
        if (currentDay === 0 || currentDay === 6) {
            weekendDays++;
        }
    }
    
    const workingDays = totalDays - weekendDays;

    return { totalDays, totalWeeks, remainingDays, workingDays, weekendDays };
  };

  const diff = calculateDifference();
  const d1Date = parseDateStr(date1Input);
  const d2Date = parseDateStr(date2Input);

  return (
    <div className="w-full md: relative overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-[80px] pointer-events-none" />
      
      <div className="relative z-10 space-y-6">
        <div className="space-y-6 bg-indigo-50/50 border border-indigo-100/50 p-5 md:p-6 rounded-2xl">
          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700">Start Date</label>
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
            <label className="text-sm font-bold text-slate-700">End Date</label>
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
               <Clock className="w-5 h-5" />
               <h3 className="font-bold text-sm md:text-base">Date Duration Overview</h3>
            </div>
            <div className="flex items-center gap-2 ml-auto">
              <button onClick={() => {
                const text = `Date Difference Calculator
Start Date: ${date1Input} ${d1Date ? `(${formatFriendlyDate(d1Date)})` : ''}
End Date: ${date2Input} ${d2Date ? `(${formatFriendlyDate(d2Date)})` : ''}
Duration: ${diff ? `${diff.totalDays} Days (${diff.totalWeeks} weeks & ${diff.remainingDays} days)\nWorking Days: ${diff.workingDays}\nWeekend Days: ${diff.weekendDays}` : 'N/A'}

Calculate Online: https://topcalcbox.com/date-difference-calculator/`;
                copyToClipboard(text);
              }} className="flex items-center gap-1.5 px-3 py-1.5 bg-white/80 backdrop-blur-md border border-indigo-200 rounded-xl text-[11px] font-bold text-indigo-700 hover:bg-white transition-all shadow-sm">
                {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span className="inline">{copied ? "Copied" : "Copy"}</span>
              </button>
              <button onClick={() => { setDate1Input(""); setDate2Input(""); }} className="p-1.5 bg-white/80 backdrop-blur-md border border-indigo-200 rounded-xl text-indigo-700 hover:bg-white transition-all shadow-sm">
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
          
          <div className="w-full z-10">
            {diff ? (
              <motion.div 
                key={diff.totalDays}
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="w-full space-y-3"
              >
                <div className="bg-white/80 backdrop-blur-sm shadow-sm border border-indigo-200/50 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between text-center sm:text-left gap-2">
                  <div className="flex items-baseline justify-center sm:justify-start gap-2">
                    <span className="text-4xl md:text-5xl font-extrabold text-slate-900">{diff.totalDays.toLocaleString()}</span>
                    <span className="text-xl md:text-2xl font-bold text-indigo-700">Days</span>
                  </div>
                  {diff.totalDays > 0 && (
                    <div className="text-xs md:text-sm font-bold text-indigo-800 bg-indigo-100/50 px-3 py-1.5 rounded-lg border border-indigo-200">
                       {diff.totalWeeks} {diff.totalWeeks === 1 ? 'week' : 'weeks'} & {diff.remainingDays} {diff.remainingDays === 1 ? 'day' : 'days'}
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-white/80 backdrop-blur-sm shadow-sm border border-indigo-200/50 rounded-2xl p-4 flex flex-col items-center justify-center text-center">
                    <div className="flex items-center gap-1.5 mb-1">
                      <Briefcase className="w-3.5 h-3.5 text-indigo-600" />
                      <span className="font-bold text-[10px] md:text-xs uppercase tracking-wider text-indigo-800/80">Working Days</span>
                    </div>
                    <span className="text-3xl md:text-4xl font-extrabold text-slate-900 leading-tight">{diff.workingDays.toLocaleString()}</span>
                    <span className="text-[10px] text-slate-400 mt-1 font-medium">Mon-Fri</span>
                  </div>

                  <div className="bg-white/80 backdrop-blur-sm shadow-sm border border-indigo-200/50 rounded-2xl p-4 flex flex-col items-center justify-center text-center">
                    <div className="flex items-center gap-1.5 mb-1">
                      <Calendar className="w-3.5 h-3.5 text-amber-500" />
                      <span className="font-bold text-[10px] md:text-xs uppercase tracking-wider text-indigo-800/80">Weekend Days</span>
                    </div>
                    <span className="text-3xl md:text-4xl font-extrabold text-slate-900 leading-tight">{diff.weekendDays.toLocaleString()}</span>
                    <span className="text-[10px] text-slate-400 mt-1 font-medium">Sat & Sun</span>
                  </div>
                </div>
              </motion.div>
            ) : (
              <div className="text-center text-lg text-indigo-700/70 font-bold mt-4 bg-white/50 backdrop-blur-sm px-6 py-8 rounded-xl border border-indigo-200/50">
                Enter start and end dates
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
