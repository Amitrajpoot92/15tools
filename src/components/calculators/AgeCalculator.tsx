"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { CalendarDays, Copy, Check, RotateCcw } from "lucide-react";

export function AgeCalculator() {
  const [dobInput, setDobInput] = useState<string>("");
  const [todayInput, setTodayInput] = useState<string>("");
  const [copied, setCopied] = useState(false);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  useEffect(() => {
    const d = new Date();
    const formatted = `${String(d.getDate()).padStart(2, '0')}/${String(d.getMonth() + 1).padStart(2, '0')}/${d.getFullYear()}`;
    setTodayInput(formatted);
  }, []);

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

  const calculateAge = () => {
    const birthDate = parseDateStr(dobInput);
    const currentDate = parseDateStr(todayInput);

    if (!birthDate || !currentDate) return null;
    if (birthDate > currentDate) return null;

    let years = currentDate.getFullYear() - birthDate.getFullYear();
    let months = currentDate.getMonth() - birthDate.getMonth();
    let days = currentDate.getDate() - birthDate.getDate();

    if (days < 0) {
      months--;
      const previousMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 0);
      days += previousMonth.getDate();
    }

    if (months < 0) {
      years--;
      months += 12;
    }

    return { years, months, days };
  };
  
  const getExtraInfo = () => {
    const birthDate = parseDateStr(dobInput);
    const currentDate = parseDateStr(todayInput);
    if (!birthDate || !currentDate || birthDate > currentDate) return null;

    const dayOfBirth = birthDate.toLocaleDateString('en-US', { weekday: 'long' });
    const totalDays = Math.floor((currentDate.getTime() - birthDate.getTime()) / (1000 * 3600 * 24));
    
    let totalMonths = (currentDate.getFullYear() - birthDate.getFullYear()) * 12 + (currentDate.getMonth() - birthDate.getMonth());
    if (currentDate.getDate() < birthDate.getDate()) {
        totalMonths--;
    }

    let nextBday = new Date(currentDate.getFullYear(), birthDate.getMonth(), birthDate.getDate());
    if (nextBday.getTime() < currentDate.getTime()) {
      nextBday.setFullYear(currentDate.getFullYear() + 1);
    }
    const daysToNext = Math.ceil((nextBday.getTime() - currentDate.getTime()) / (1000 * 3600 * 24));

    return { 
       dayOfBirth, 
       totalDays: totalDays.toLocaleString('en-US'), 
       totalMonths: totalMonths.toLocaleString('en-US'),
       daysToNext 
    };
  };

  const age = calculateAge();
  const extraInfo = getExtraInfo();
  const dobDate = parseDateStr(dobInput);
  const todayDate = parseDateStr(todayInput);

  return (
    <div className="w-full md: relative overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-64 bg-rose-500/10 rounded-full blur-[80px] pointer-events-none" />
      
      <div className="relative z-10 space-y-6">
        <div className="space-y-6 bg-rose-50/50 border border-rose-100/50 p-5 md:p-6 rounded-2xl">
          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700">Date of Birth</label>
            <input
              type="text"
              inputMode="numeric"
              value={dobInput}
              onChange={(e) => setDobInput(formatInputDate(e.target.value))}
              placeholder="DD/MM/YYYY"
              className="w-full bg-slate-50/80 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 focus:outline-none focus:ring-2 focus:ring-rose-500/50 transition-all shadow-inner"
            />
            {dobDate && (
               <p className="text-xs text-rose-600 font-medium ml-1">
                 {formatFriendlyDate(dobDate)}
               </p>
            )}
          </div>
          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700">Age at Date</label>
            <input
              type="text"
              inputMode="numeric"
              value={todayInput}
              onChange={(e) => setTodayInput(formatInputDate(e.target.value))}
              placeholder="DD/MM/YYYY"
              className="w-full bg-slate-50/80 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 focus:outline-none focus:ring-2 focus:ring-rose-500/50 transition-all shadow-inner"
            />
            {todayDate && (
               <p className="text-xs text-rose-600 font-medium ml-1">
                 {formatFriendlyDate(todayDate)}
               </p>
            )}
          </div>
        </div>

        <div className="flex flex-col items-center justify-center p-8 bg-gradient-to-b from-rose-50 to-rose-100/80 rounded-3xl shadow-[0_8px_30px_rgb(225,29,72,0.15)] border border-rose-200/60 relative overflow-hidden">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#e11d4810_1px,transparent_1px),linear-gradient(to_bottom,#e11d4810_1px,transparent_1px)] bg-[size:24px_24px]" />
          <div className="absolute left-0 right-0 top-0 h-32 bg-gradient-to-b from-white/40 to-transparent" />
          
          <div className="absolute top-4 right-4 flex items-center gap-2 z-10">
            <button onClick={() => {
              const text = `Age Calculator
Date of Birth: ${dobInput} ${dobDate ? `(${formatFriendlyDate(dobDate)})` : ''}
Age at Date: ${todayInput} ${todayDate ? `(${formatFriendlyDate(todayDate)})` : ''}
Exact Age: ${age ? `${age.years} Years / ${age.months} Months / ${age.days} Days` : ''}${extraInfo ? `\nDay of Birth: ${extraInfo.dayOfBirth}\nTotal Months Lived: ${extraInfo.totalMonths}\nTotal Days Lived: ${extraInfo.totalDays}\nNext Birthday: ${extraInfo.daysToNext === 0 ? "Today!" : `in ${extraInfo.daysToNext} days`}` : ''}

Calculate Online: https://topcalcbox.com/age-calculator-online/`;
              copyToClipboard(text);
            }} className="flex items-center gap-1.5 px-3 py-1.5 bg-white/80 backdrop-blur-md border border-rose-200 rounded-xl text-[11px] font-bold text-rose-700 hover:bg-white transition-all shadow-sm">
              {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              <span className="inline">{copied ? "Copied" : "Copy"}</span>
            </button>
            <button onClick={() => { setDobInput(""); setTodayInput(""); }} className="p-1.5 bg-white/80 backdrop-blur-md border border-rose-200 rounded-xl text-rose-700 hover:bg-white transition-all shadow-sm">
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>
          
          <div className="relative mb-6 mt-4 z-10">
            <div className="absolute inset-0 bg-rose-500/30 blur-xl rounded-full" />
            <div className="p-4 bg-white rounded-2xl shadow-xl shadow-rose-500/10 border border-rose-100 relative z-10 transform transition-transform hover:scale-105 duration-300">
              <CalendarDays className="w-8 h-8 text-rose-600" />
            </div>
          </div>
          
          <p className="text-sm text-rose-800/70 uppercase tracking-widest font-extrabold mb-1 z-10">
            Exact Age
          </p>
          
          <div className="text-center mt-2 z-10 w-full">
            {age ? (
              <motion.div 
                key={`${age.years}-${age.months}-${age.days}`}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="flex flex-wrap justify-center gap-4 text-slate-900"
              >
                <div className="flex flex-col items-center">
                  <span className="text-5xl md:text-6xl font-extrabold tracking-tighter drop-shadow-sm">{age.years}</span>
                  <span className="text-sm text-rose-800/70 font-bold uppercase tracking-wider mt-1">Years</span>
                </div>
                <div className="text-3xl font-light mt-2 opacity-30 text-rose-900">/</div>
                <div className="flex flex-col items-center">
                  <span className="text-5xl md:text-6xl font-extrabold tracking-tighter drop-shadow-sm">{age.months}</span>
                  <span className="text-sm text-rose-800/70 font-bold uppercase tracking-wider mt-1">Months</span>
                </div>
                <div className="text-3xl font-light mt-2 opacity-30 text-rose-900">/</div>
                <div className="flex flex-col items-center">
                  <span className="text-5xl md:text-6xl font-extrabold tracking-tighter drop-shadow-sm">{age.days}</span>
                  <span className="text-sm text-rose-800/70 font-bold uppercase tracking-wider mt-1">Days</span>
                </div>
              </motion.div>
            ) : (
              <div className="text-lg text-rose-700/70 font-bold mt-4 bg-white/50 backdrop-blur-sm px-6 py-3 rounded-xl border border-rose-200/50 inline-block">
                Enter your Date of Birth
              </div>
            )}
            
            {extraInfo && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full mt-6 pt-6 border-t-2 border-rose-200/50"
              >
                <div className="grid grid-cols-2 gap-3 max-w-sm mx-auto">
                  <div className="bg-white/70 backdrop-blur-sm shadow-sm border border-rose-200/50 rounded-2xl p-4 flex flex-col items-start justify-center text-left">
                    <p className="text-[11px] text-slate-500 font-bold mb-1">Day of Birth</p>
                    <p className="text-sm font-extrabold text-slate-900">{extraInfo.dayOfBirth}</p>
                  </div>
                  <div className="bg-white/70 backdrop-blur-sm shadow-sm border border-rose-200/50 rounded-2xl p-4 flex flex-col items-start justify-center text-left">
                    <p className="text-[11px] text-slate-500 font-bold mb-1">Total Months Lived</p>
                    <p className="text-sm font-extrabold text-slate-900">{extraInfo.totalMonths}</p>
                  </div>
                  <div className="bg-white/70 backdrop-blur-sm shadow-sm border border-rose-200/50 rounded-2xl p-4 flex flex-col items-start justify-center text-left">
                    <p className="text-[11px] text-slate-500 font-bold mb-1">Next Birthday</p>
                    <p className="text-sm font-extrabold text-rose-600">{extraInfo.daysToNext === 0 ? "Today!" : `in ${extraInfo.daysToNext} days`}</p>
                  </div>
                  <div className="bg-white/70 backdrop-blur-sm shadow-sm border border-rose-200/50 rounded-2xl p-4 flex flex-col items-start justify-center text-left">
                    <p className="text-[11px] text-slate-500 font-bold mb-1">Total Days Lived</p>
                    <p className="text-sm font-extrabold text-slate-900">{extraInfo.totalDays}</p>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
