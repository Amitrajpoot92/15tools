"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Copy, RotateCcw, Star } from "lucide-react";

export function LoveCalculator() {
  const [name1, setName1] = useState("");
  const [name2, setName2] = useState("");
  const [result, setResult] = useState<number | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);
  const [copied, setCopied] = useState(false);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

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
      
      const magicNumber = sum % 100;
      // Boost the lower end slightly so it's more "fun"
      const finalPercentage = magicNumber < 30 ? magicNumber + 40 : magicNumber;
      
      setResult(finalPercentage > 100 ? 100 : finalPercentage);
      setIsCalculating(false);
    }, 800);
  };

  const reset = () => {
    setName1("");
    setName2("");
    setResult(null);
  };

  const getMessageAndStars = (score: number) => {
    if (score > 85) return { msg: "A Match Made in Heaven! 💖", stars: 5 };
    if (score > 70) return { msg: "Very Strong Connection! 💘", stars: 4 };
    if (score > 50) return { msg: "There's definitely a spark! ✨", stars: 3 };
    if (score > 30) return { msg: "Could work with some effort. 🤔", stars: 2 };
    return { msg: "Maybe just stay friends. 🤝", stars: 1 };
  };

  const resultData = result !== null ? getMessageAndStars(result) : null;

  return (
    <div className="w-full space-y-4">
      {/* Input Section */}
      <div className="bg-[#fff1f2] border border-rose-100 rounded-3xl p-5 md:p-6 relative">
        <div className="space-y-6">
          <div className="space-y-2">
            <label className="text-base font-bold text-[#1f2937]">YOUR FULL NAME</label>
            <input
              type="text"
              value={name1}
              onChange={(e) => setName1(e.target.value)}
              placeholder="Rupesh"
              className="w-full bg-white border border-slate-100 rounded-2xl px-4 py-3.5 text-lg text-slate-900 font-medium placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-pink-300 transition-all shadow-sm"
            />
          </div>
          
          <div className="flex justify-center -my-2 relative z-10">
            <div className="bg-white p-3 rounded-full shadow-sm flex items-center justify-center">
              <Heart className="w-6 h-6 text-[#ff007f] fill-[#ff007f]" />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-base font-bold text-[#1f2937]">CRUSH OR PARTNER'S NAME</label>
            <input
              type="text"
              value={name2}
              onChange={(e) => setName2(e.target.value)}
              placeholder="Kamni"
              className="w-full bg-white border border-slate-100 rounded-2xl px-4 py-3.5 text-lg text-slate-900 font-medium placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-pink-300 transition-all shadow-sm"
            />
          </div>

          <button
            onClick={calculateLove}
            disabled={!name1.trim() || !name2.trim() || isCalculating}
            className="w-full bg-[#ff007f] text-white font-bold text-lg rounded-2xl py-4 shadow-md shadow-pink-500/20 hover:shadow-lg hover:shadow-pink-500/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed mt-2"
          >
            {isCalculating ? "Calculating..." : "Calculate Love %"}
          </button>
        </div>
      </div>

      {/* Result Section */}
      <div className="bg-[#fce7f3] border border-pink-200 rounded-3xl p-6 md:p-8 relative shadow-sm mt-6 min-h-[260px] flex flex-col items-center justify-center">
        <div className="absolute top-4 right-4 flex gap-2">
          <button 
            onClick={() => {
              const text = `Love Calculator\nYour Name: ${name1}\nCrush's Name: ${name2}\nLove %: ${result !== null ? result + '%' : 'N/A'}\nMessage: ${resultData?.msg || 'N/A'}\n\nCalculate Online: https://topcalcbox.com/love-calculator`;
              copyToClipboard(text);
            }} 
            className="flex items-center justify-center px-4 py-2 bg-white rounded-xl text-sm font-bold text-[#ff007f] hover:bg-pink-50 transition-colors shadow-sm"
          >
            {copied ? "Copied" : "Copy"}
          </button>
          <button 
            onClick={reset}
            className="flex items-center justify-center w-10 h-10 bg-white rounded-xl text-[#ff007f] hover:bg-pink-50 transition-colors shadow-sm"
          >
            <RotateCcw className="w-5 h-5" />
          </button>
        </div>
        
        <div className="p-4 bg-white shadow-sm rounded-3xl mb-6">
          <Heart className={`w-12 h-12 text-[#111827] ${isCalculating ? 'animate-ping text-[#ff007f] fill-[#ff007f]' : ''}`} strokeWidth={2.5} />
        </div>
        
        <AnimatePresence mode="wait">
          {result !== null && !isCalculating && resultData ? (
            <motion.div 
              key="result"
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.5, opacity: 0 }}
              className="text-center w-full"
            >
              <div className="text-6xl md:text-7xl font-extrabold text-[#111827] tracking-tighter mb-4">
                {result}%
              </div>
              
              <div className="flex justify-center gap-1 mb-3">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star 
                    key={star} 
                    className={`w-6 h-6 ${star <= resultData.stars ? 'text-amber-400 fill-amber-400' : 'text-slate-300 fill-slate-300'}`} 
                  />
                ))}
              </div>

              <p className="text-[#e11d48] font-bold text-lg md:text-xl">
                {resultData.msg}
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
              <p className="text-sm text-pink-800/60 uppercase tracking-widest font-bold">
                {isCalculating ? "Calculating Destiny..." : "Awaiting Names"}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 mt-4">
        <p className="text-xs text-slate-500 text-center leading-relaxed">
          <strong className="text-slate-700">Disclaimer:</strong> This Love Calculator is for fun and entertainment only. The compatibility percentage and star rating are not scientifically accurate and should not be used for serious relationship decisions.
        </p>
      </div>
    </div>
  );
}
