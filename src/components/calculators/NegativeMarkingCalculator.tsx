"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { TrendingDown, Copy, Check } from "lucide-react";

export function NegativeMarkingCalculator() {
  const [attempted, setAttempted] = useState<string>("");
  const [correct, setCorrect] = useState<string>("");
  const [marksPerCorrect, setMarksPerCorrect] = useState<string>("4");
  const [penaltyPerWrong, setPenaltyPerWrong] = useState<string>("1");
  const [copied, setCopied] = useState(false);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const calculate = () => {
    const a = parseInt(attempted);
    const c = parseInt(correct);
    const m = parseFloat(marksPerCorrect);
    const p = parseFloat(penaltyPerWrong);

    if (!isNaN(a) && !isNaN(c) && !isNaN(m) && !isNaN(p) && a > 0 && c >= 0 && c <= a) {
      const wrong = a - c;
      const positiveScore = c * m;
      const negativeScore = wrong * p;
      const finalScore = positiveScore - negativeScore;
      
      const maxPossible = a * m;
      const accuracy = (c / a) * 100;

      return {
        score: finalScore.toFixed(2),
        wrong,
        accuracy: accuracy.toFixed(1),
        maxPossible: maxPossible.toFixed(2)
      };
    }

    return { score: "0.00", wrong: 0, accuracy: "0.0", maxPossible: "0.00" };
  };

  const result = calculate();

  return (
    <div className="w-full md: relative overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/10 rounded-full blur-[80px] pointer-events-none" />
      
      <div className="relative z-10 space-y-6">
        <div className="space-y-6 bg-amber-50/50 border border-amber-100/50 p-5 md:p-6 rounded-2xl">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700">Questions Attempted</label>
              <input
                type="number"
                value={attempted}
                onChange={(e) => setAttempted(e.target.value)}
                placeholder="e.g. 100"
                className="w-full bg-slate-50/80 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500/50 transition-all shadow-inner"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700">Correct Answers</label>
              <input
                type="number"
                value={correct}
                onChange={(e) => setCorrect(e.target.value)}
                placeholder="e.g. 75"
                className="w-full bg-slate-50/80 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500/50 transition-all shadow-inner"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700">Marks per Correct</label>
              <input
                type="number"
                value={marksPerCorrect}
                onChange={(e) => setMarksPerCorrect(e.target.value)}
                placeholder="e.g. 4"
                className="w-full bg-slate-50/80 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500/50 transition-all shadow-inner"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700">Penalty per Wrong</label>
              <input
                type="number"
                value={penaltyPerWrong}
                onChange={(e) => setPenaltyPerWrong(e.target.value)}
                placeholder="e.g. 1"
                className="w-full bg-slate-50/80 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500/50 transition-all shadow-inner"
              />
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center justify-center p-8 bg-amber-100 rounded-2xl shadow-sm border border-amber-300 relative">
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent" />
          <button onClick={() => {
            const text = `Negative Marking Calculator
Questions Attempted: ${attempted || 0}
Correct Answers: ${correct || 0}
Marks per Correct: ${marksPerCorrect || 0}
Penalty per Wrong: ${penaltyPerWrong || 0}
Final Score: ${result.score} / ${result.maxPossible}
Wrong Answers: ${result.wrong}
Accuracy: ${result.accuracy}%

Calculate Online: https://topcalcbox.com/negative-marking-calculator/`;
            copyToClipboard(text);
          }} className="absolute top-4 right-4 flex items-center gap-1 px-3 py-1.5 bg-white border border-amber-200 rounded-lg text-[11px] font-bold text-amber-700 hover:bg-amber-50 transition-colors shadow-sm z-10">
            <span className="inline">{copied ? "Copied" : "Copy"}</span>
          </button>
          
          <div className="p-3 bg-white rounded-xl shadow-sm mb-4">
            <TrendingDown className="w-8 h-8 text-amber-600" />
          </div>
          
          <p className="text-sm text-amber-800/70 uppercase tracking-widest font-bold mb-1">
            Final Score
          </p>
          
          <motion.div 
            key={result.score}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="text-5xl md:text-6xl font-extrabold text-slate-900 tracking-tighter mb-4 drop-shadow-sm flex items-end"
          >
            {result.score} <span className="text-2xl text-amber-700 ml-2 mb-2 font-medium opacity-80">/ {result.maxPossible}</span>
          </motion.div>

          <div className="w-full border-t border-amber-300 my-3" />

          <div className="w-full grid grid-cols-2 gap-4 text-center text-sm mt-1">
            <div className="flex flex-col">
              <span className="text-amber-800/70 font-medium">Wrong Answers</span>
              <span className="text-slate-900 font-bold text-lg">{result.wrong}</span>
            </div>
            <div className="flex flex-col border-l border-amber-300">
              <span className="text-amber-800/70 font-medium">Accuracy</span>
              <span className="text-slate-900 font-bold text-lg">{result.accuracy}%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
