"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart } from "lucide-react";

export function LoveCalculator() {
  const [name1, setName1] = useState("");
  const [name2, setName2] = useState("");
  const [result, setResult] = useState<number | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);

  const calculateLove = () => {
    if (!name1.trim() || !name2.trim()) return;

    setIsCalculating(true);
    setResult(null);

    // Simple deterministic hash based on characters in both names
    setTimeout(() => {
      const combined = (name1.trim().toLowerCase() + name2.trim().toLowerCase()).replace(/\s+/g, '');
      let sum = 0;
      for (let i = 0; i < combined.length; i++) {
        sum += combined.charCodeAt(i);
      }
      
      // Make it slightly random but deterministic for the same names
      const magicNumber = sum % 100;
      // Boost the lower end slightly so it's more "fun"
      const finalPercentage = magicNumber < 30 ? magicNumber + 40 : magicNumber;
      
      setResult(finalPercentage > 100 ? 100 : finalPercentage);
      setIsCalculating(false);
    }, 800);
  };

  const getMessage = (score: number) => {
    if (score > 90) return "A Match Made in Heaven! 💖";
    if (score > 75) return "Very Strong Connection! 💘";
    if (score > 50) return "There's definitely a spark! ✨";
    if (score > 30) return "Could work with some effort. 🤔";
    return "Maybe just stay friends. 🤝";
  };

  return (
    <div className="bg-white border border-slate-200 rounded-3xl p-5 md:p-6 shadow-2xl shadow-rose-900/5 relative overflow-hidden">
      {/* Premium Background decoration */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-rose-500/10 rounded-full blur-[80px] pointer-events-none" />
      
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
        <div className="space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700">Your Name</label>
              <input
                type="text"
                value={name1}
                onChange={(e) => setName1(e.target.value)}
                placeholder="Enter your name..."
                className="w-full bg-slate-50/80 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-rose-500/50 transition-all shadow-inner"
              />
            </div>
            
            <div className="flex justify-center -my-2 relative z-10">
              <div className="bg-white p-2 rounded-full border border-slate-100 shadow-sm">
                <Heart className="w-5 h-5 text-rose-500 fill-rose-500" />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700">Crush's Name</label>
              <input
                type="text"
                value={name2}
                onChange={(e) => setName2(e.target.value)}
                placeholder="Enter crush's name..."
                className="w-full bg-slate-50/80 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-rose-500/50 transition-all shadow-inner"
              />
            </div>
          </div>

          <button
            onClick={calculateLove}
            disabled={!name1.trim() || !name2.trim() || isCalculating}
            className="w-full bg-gradient-to-r from-rose-500 to-pink-500 text-white font-bold rounded-xl py-3.5 shadow-md shadow-rose-500/20 hover:shadow-lg hover:shadow-rose-500/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isCalculating ? "Calculating..." : "Calculate Love %"}
          </button>
        </div>

        <div className="flex flex-col items-center justify-center p-8 bg-gradient-to-br from-rose-500 to-pink-600 rounded-2xl h-full min-h-[250px] shadow-lg shadow-rose-500/30 border border-rose-400/30 relative overflow-hidden">
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent" />
          
          <div className="p-3 bg-white/20 rounded-2xl shadow-sm mb-4 backdrop-blur-md">
            <Heart className={`w-10 h-10 text-white ${isCalculating ? 'animate-ping' : 'fill-white'}`} />
          </div>
          
          <AnimatePresence mode="wait">
            {result !== null && !isCalculating ? (
              <motion.div 
                key="result"
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.5, opacity: 0 }}
                className="text-center"
              >
                <div className="text-5xl md:text-6xl font-extrabold text-white tracking-tighter drop-shadow-sm mb-2">
                  {result}%
                </div>
                <p className="text-rose-100 font-bold text-sm md:text-base px-2 text-center">
                  {getMessage(result)}
                </p>
              </motion.div>
            ) : (
              <motion.div 
                key="placeholder"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-center"
              >
                <p className="text-sm text-rose-100 uppercase tracking-widest font-bold">
                  {isCalculating ? "Analyzing Destiny..." : "Awaiting Names"}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
