"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { CalendarDays } from "lucide-react";

export function AgeCalculator() {
  const [dob, setDob] = useState<string>("");
  const [today, setToday] = useState<string>("");

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
    <div className="bg-white border border-slate-200 rounded-3xl p-5 md:p-6 shadow-2xl shadow-rose-900/5 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-64 bg-rose-500/10 rounded-full blur-[80px] pointer-events-none" />
      
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
        <div className="space-y-6">
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

        <div className="flex flex-col items-center justify-center p-8 bg-gradient-to-br from-rose-500 to-rose-600 rounded-2xl h-full min-h-[200px] shadow-lg shadow-rose-500/30 border border-rose-400/30 relative overflow-hidden">
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent" />
          
          <div className="p-3 bg-white rounded-xl shadow-sm mb-4">
            <CalendarDays className="w-8 h-8 text-rose-600" />
          </div>
          
          <p className="text-sm text-rose-100 uppercase tracking-widest font-bold mb-1">
            Exact Age
          </p>
          
          <div className="text-center mt-2">
            {age ? (
              <motion.div 
                key={`${age.years}-${age.months}-${age.days}`}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="flex flex-wrap justify-center gap-4 text-white"
              >
                <div className="flex flex-col items-center">
                  <span className="text-4xl md:text-5xl font-extrabold tracking-tighter drop-shadow-sm">{age.years}</span>
                  <span className="text-sm text-rose-100 font-medium">Years</span>
                </div>
                <div className="text-3xl font-light mt-1 opacity-50">/</div>
                <div className="flex flex-col items-center">
                  <span className="text-4xl md:text-5xl font-extrabold tracking-tighter drop-shadow-sm">{age.months}</span>
                  <span className="text-sm text-rose-100 font-medium">Months</span>
                </div>
                <div className="text-3xl font-light mt-1 opacity-50">/</div>
                <div className="flex flex-col items-center">
                  <span className="text-4xl md:text-5xl font-extrabold tracking-tighter drop-shadow-sm">{age.days}</span>
                  <span className="text-sm text-rose-100 font-medium">Days</span>
                </div>
              </motion.div>
            ) : (
              <div className="text-xl text-rose-200 font-medium opacity-80 mt-2">
                Enter your Date of Birth
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
