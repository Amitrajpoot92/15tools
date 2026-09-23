"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { CalendarDays, Copy, Check } from "lucide-react";

export function AgeCalculator() {
  const [dob, setDob] = useState<string>("");
  const [today, setToday] = useState<string>("");
  const [copied, setCopied] = useState(false);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  useEffect(() => {
    const todayDate = new Date().toISOString().split("T")[0];
    setToday(todayDate);
  }, []);

  const calculateAge = () => {
    if (!dob || !today) return null;

    const birthDate = new Date(dob);
    const currentDate = new Date(today);

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

  const age = calculateAge();

  return (
    <div className="w-full md: relative overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-64 bg-rose-500/10 rounded-full blur-[80px] pointer-events-none" />
      
      <div className="relative z-10 space-y-6">
        <div className="space-y-6 bg-rose-50/50 border border-rose-100/50 p-5 md:p-6 rounded-2xl">
          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700">Date of Birth</label>
            <input
              type="date"
              value={dob}
              onChange={(e) => setDob(e.target.value)}
              className="w-full bg-slate-50/80 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 focus:outline-none focus:ring-2 focus:ring-rose-500/50 transition-all shadow-inner"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700">Age at Date</label>
            <input
              type="date"
              value={today}
              onChange={(e) => setToday(e.target.value)}
              className="w-full bg-slate-50/80 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 focus:outline-none focus:ring-2 focus:ring-rose-500/50 transition-all shadow-inner"
            />
          </div>
        </div>

        <div className="flex flex-col items-center justify-center p-8 bg-rose-100 rounded-2xl shadow-sm border border-rose-300 relative">
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent" />
          <button onClick={() => {
            const text = `Age Calculator
Date of Birth: ${dob}
Age at Date: ${today}
Exact Age: ${age ? `${age.years} Years / ${age.months} Months / ${age.days} Days` : ''}

Calculate Online: https://topcalcbox.com/age-calculator-online/`;
            copyToClipboard(text);
          }} className="absolute top-4 right-4 flex items-center gap-1 px-3 py-1.5 bg-white border border-rose-200 rounded-lg text-[11px] font-bold text-rose-700 hover:bg-rose-50 transition-colors shadow-sm z-10">
            <span className="inline">{copied ? "Copied" : "Copy"}</span>
          </button>
          
          <div className="p-3 bg-white rounded-xl shadow-sm mb-4">
            <CalendarDays className="w-8 h-8 text-rose-600" />
          </div>
          
          <p className="text-sm text-rose-800/70 uppercase tracking-widest font-bold mb-1">
            Exact Age
          </p>
          
          <div className="text-center mt-2">
            {age ? (
              <motion.div 
                key={`${age.years}-${age.months}-${age.days}`}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="flex flex-wrap justify-center gap-4 text-slate-900"
              >
                <div className="flex flex-col items-center">
                  <span className="text-4xl md:text-5xl font-extrabold tracking-tighter drop-shadow-sm">{age.years}</span>
                  <span className="text-sm text-rose-800/70 font-medium">Years</span>
                </div>
                <div className="text-3xl font-light mt-1 opacity-50">/</div>
                <div className="flex flex-col items-center">
                  <span className="text-4xl md:text-5xl font-extrabold tracking-tighter drop-shadow-sm">{age.months}</span>
                  <span className="text-sm text-rose-800/70 font-medium">Months</span>
                </div>
                <div className="text-3xl font-light mt-1 opacity-50">/</div>
                <div className="flex flex-col items-center">
                  <span className="text-4xl md:text-5xl font-extrabold tracking-tighter drop-shadow-sm">{age.days}</span>
                  <span className="text-sm text-rose-800/70 font-medium">Days</span>
                </div>
              </motion.div>
            ) : (
              <div className="text-xl text-rose-700 font-medium opacity-80 mt-2">
                Enter your Date of Birth
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
