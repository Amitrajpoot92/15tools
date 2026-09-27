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
    }, 2500);
  };

  const reset = () => {
    setName1("");
    setName2("");
    setResult(null);
  };

  const getMessageAndStars = (score: number) => {
    if (score >= 95) return { msg: "Soulmates! Pure perfection! 💘🔥", stars: 5 };
    if (score >= 85) return { msg: "A Match Made in Heaven! 😍✨", stars: 5 };
    if (score >= 70) return { msg: "Very Strong Connection! 💕🚀", stars: 4 };
    if (score >= 50) return { msg: "There's definitely a spark! 😚💫", stars: 3 };
    if (score >= 30) return { msg: "Could work with some effort. 🤔🌱", stars: 2 };
    if (score >= 15) return { msg: "Maybe just stay friends. 🤝😅", stars: 1 };
    return { msg: "Run away! Total disaster! 🚩🏃‍♂️", stars: 0 };
  };

  const resultData = result !== null ? getMessageAndStars(result) : null;

  return (
    <div className="w-full relative overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-64 bg-pink-500/10 rounded-full blur-[80px] pointer-events-none" />
      
      <div className="relative z-10 space-y-6">
        {/* Input Section */}
        <div className="bg-rose-50/50 border border-rose-100/50 rounded-2xl p-5 md:p-6 relative">
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700">Your Full Name</label>
              <input
                type="text"
                value={name1}
                onChange={(e) => setName1(e.target.value)}
                placeholder="Romeo"
                className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-lg text-slate-900 font-medium placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-rose-500/50 transition-all shadow-sm"
              />
            </div>
            
            <div className="flex justify-center my-0 relative z-10">
              <div className="bg-white p-3 rounded-full shadow-sm border border-rose-100 flex items-center justify-center">
                <Heart className="w-5 h-5 text-rose-500 fill-rose-500" />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700">Crush or Partner's Name</label>
              <input
                type="text"
                value={name2}
                onChange={(e) => setName2(e.target.value)}
                placeholder="Juliet"
                className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-lg text-slate-900 font-medium placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-rose-500/50 transition-all shadow-sm"
              />
            </div>

            <button
              onClick={calculateLove}
              disabled={!name1.trim() || !name2.trim() || isCalculating}
              className="w-full bg-gradient-to-r from-rose-500 to-pink-500 text-white font-bold text-lg rounded-xl py-3.5 shadow-md shadow-pink-500/20 hover:shadow-lg hover:shadow-pink-500/30 hover:from-rose-600 hover:to-pink-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed mt-2"
            >
              {isCalculating ? "Calculating Destiny..." : "Calculate Love %"}
            </button>
          </div>
        </div>

        {/* Result Section */}
        <div className="flex flex-col items-center justify-center p-6 md:p-8 bg-gradient-to-b from-slate-50 to-pink-50/40 rounded-3xl shadow-[0_8px_30px_rgb(236,72,153,0.12)] border border-pink-200/60 relative overflow-hidden min-h-[350px]">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ec489908_1px,transparent_1px),linear-gradient(to_bottom,#ec489908_1px,transparent_1px)] bg-[size:24px_24px]" />
          
          <div className="w-full flex justify-between items-center mb-6 z-10 flex-wrap gap-4">
            <div className="flex items-center gap-2 text-rose-800">
               <h3 className="font-bold text-sm md:text-base uppercase tracking-wider">Love Result</h3>
            </div>
            <div className="flex items-center gap-2 ml-auto">
              <button onClick={() => {
                const text = `Love Calculator\nYour Name: ${name1}\nCrush's Name: ${name2}\nLove %: ${result !== null ? result + '%' : 'N/A'}\nMessage: ${resultData?.msg || 'N/A'}\n\nCalculate Online: https://topcalcbox.com/love-calculator`;
                copyToClipboard(text);
              }} className="flex items-center gap-1.5 px-3 py-1.5 bg-white/80 backdrop-blur-md border border-rose-200 rounded-xl text-[11px] font-bold text-rose-700 hover:bg-white transition-all shadow-sm">
                <span className="inline">{copied ? "Copied" : "Copy"}</span>
              </button>
              <button onClick={reset} className="p-1.5 bg-white/80 backdrop-blur-md border border-rose-200 rounded-xl text-rose-700 hover:bg-white transition-all shadow-sm">
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
          
          <div className="w-full z-10 flex flex-col items-center justify-center relative">
            <AnimatePresence mode="wait">
              {isCalculating ? (
                <motion.div
                  key="calculating"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col items-center justify-center my-8"
                >
                  <motion.div
                    animate={{ 
                      scale: [1, 1.4, 1.1, 1.4, 1],
                      rotate: [0, 5, -5, 5, 0]
                    }}
                    transition={{ 
                      duration: 1, 
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                    className="mb-4"
                  >
                    <Heart className="w-24 h-24 text-rose-500 fill-rose-500 drop-shadow-xl" />
                  </motion.div>
                  <motion.div
                    animate={{ opacity: [0.4, 1, 0.4] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <p className="text-sm text-rose-800/80 uppercase tracking-widest font-bold">
                      Reading the Stars...
                    </p>
                  </motion.div>
                </motion.div>
              ) : result !== null && resultData ? (
                <motion.div 
                  key="result"
                  initial={{ scale: 0.5, opacity: 0, y: 20 }}
                  animate={{ scale: 1, opacity: 1, y: 0 }}
                  transition={{ type: "spring", damping: 15 }}
                  className="text-center w-full bg-white/80 backdrop-blur-sm border border-rose-200/50 rounded-3xl p-8 shadow-sm"
                >
                  <div className="text-7xl md:text-8xl font-black text-rose-600 tracking-tighter mb-6 drop-shadow-sm">
                    {result}%
                  </div>
                  
                  <div className="flex justify-center gap-2 mb-4">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star 
                        key={star} 
                        className={`w-8 h-8 ${star <= resultData.stars ? 'text-amber-400 fill-amber-400' : 'text-slate-200 fill-slate-200'}`} 
                      />
                    ))}
                  </div>

                  <p className="text-rose-900 font-extrabold text-xl md:text-2xl mt-4">
                    {resultData.msg}
                  </p>
                </motion.div>
              ) : (
                <motion.div 
                  key="placeholder"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-center my-12"
                >
                  <div className="bg-rose-100 p-4 rounded-full inline-block mb-4">
                    <Heart className="w-12 h-12 text-rose-300" strokeWidth={2} />
                  </div>
                  <p className="text-sm text-rose-800/50 uppercase tracking-widest font-bold">
                    Awaiting Names
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 mt-4">
        <p className="text-xs text-slate-500 text-center leading-relaxed">
          <strong className="text-slate-700">Disclaimer:</strong> This Love Calculator is for fun and entertainment only. The compatibility percentage and star rating are not scientifically accurate and should not be used for serious relationship decisions.
        </p>
      </div>
    </div>
  );
}
