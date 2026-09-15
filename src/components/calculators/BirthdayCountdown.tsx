"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Timer } from "lucide-react";

export function BirthdayCountdown() {
  const [targetDate, setTargetDate] = useState<string>("");
  const [timeLeft, setTimeLeft] = useState<{ days: number; hours: number; minutes: number; seconds: number } | null>(null);

  useEffect(() => {
    if (!targetDate) {
      setTimeLeft(null);
      return;
    }

    const interval = setInterval(() => {
      const now = new Date();
      let target = new Date(targetDate);
      
      // If the target date has passed this year, set it for next year
      if (now.getTime() > target.getTime()) {
        target.setFullYear(now.getFullYear() + 1);
      }

      const diff = target.getTime() - now.getTime();

      if (diff <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / 1000 / 60) % 60);
      const seconds = Math.floor((diff / 1000) % 60);

      setTimeLeft({ days, hours, minutes, seconds });
    }, 1000);

    return () => clearInterval(interval);
  }, [targetDate]);

  return (
    <div className="bg-white border border-slate-200 rounded-3xl p-5 md:p-6 shadow-2xl shadow-orange-900/5 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-64 bg-orange-500/10 rounded-full blur-[80px] pointer-events-none" />
      
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
        <div className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700">When is your next birthday?</label>
            <input
              type="date"
              value={targetDate}
              onChange={(e) => setTargetDate(e.target.value)}
              className="w-full bg-slate-50/80 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 focus:outline-none focus:ring-2 focus:ring-orange-500/50 transition-all shadow-inner"
            />
          </div>
          <p className="text-sm text-slate-500">
            Enter the date and month of your birthday. The countdown will automatically start!
          </p>
        </div>

        <div className="flex flex-col items-center justify-center p-8 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl h-full min-h-[250px] shadow-lg shadow-orange-500/30 border border-orange-400/30 relative overflow-hidden">
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent" />
          
          <div className="p-3 bg-white rounded-xl shadow-sm mb-4">
            <Timer className="w-8 h-8 text-orange-600" />
          </div>
          
          <p className="text-sm text-orange-100 uppercase tracking-widest font-bold mb-4">
            Countdown
          </p>
          
          <div className="w-full max-w-sm">
            {timeLeft ? (
              <div className="grid grid-cols-4 gap-2 text-center text-white">
                <div className="flex flex-col items-center p-2 bg-black/10 rounded-xl backdrop-blur-sm">
                  <span className="text-2xl md:text-3xl font-extrabold">{timeLeft.days}</span>
                  <span className="text-xs text-orange-100 font-medium uppercase tracking-wider mt-1">Days</span>
                </div>
                <div className="flex flex-col items-center p-2 bg-black/10 rounded-xl backdrop-blur-sm">
                  <span className="text-2xl md:text-3xl font-extrabold">{timeLeft.hours}</span>
                  <span className="text-xs text-orange-100 font-medium uppercase tracking-wider mt-1">Hrs</span>
                </div>
                <div className="flex flex-col items-center p-2 bg-black/10 rounded-xl backdrop-blur-sm">
                  <span className="text-2xl md:text-3xl font-extrabold">{timeLeft.minutes}</span>
                  <span className="text-xs text-orange-100 font-medium uppercase tracking-wider mt-1">Min</span>
                </div>
                <div className="flex flex-col items-center p-2 bg-black/10 rounded-xl backdrop-blur-sm">
                  <span className="text-2xl md:text-3xl font-extrabold">{timeLeft.seconds}</span>
                  <span className="text-xs text-orange-100 font-medium uppercase tracking-wider mt-1">Sec</span>
                </div>
              </div>
            ) : (
              <div className="text-center text-orange-200 font-medium opacity-80 py-4">
                Select a date to start the countdown
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
