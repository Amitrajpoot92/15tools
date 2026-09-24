"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { TrendingDown, Copy, Check, RotateCcw } from "lucide-react";

export function NegativeMarkingCalculator() {
  const [totalQuestions, setTotalQuestions] = useState<string>("");
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

  const reset = () => {
    setTotalQuestions("");
    setAttempted("");
    setCorrect("");
    setMarksPerCorrect("4");
    setPenaltyPerWrong("1");
  };

  const calculate = () => {
    const tq = parseInt(totalQuestions) || 0;
    const a = parseInt(attempted);
    const c = parseInt(correct);
    const m = parseFloat(marksPerCorrect);
    const p = parseFloat(penaltyPerWrong);

    if (!isNaN(a) && !isNaN(c) && !isNaN(m) && !isNaN(p) && a > 0 && c >= 0 && c <= a) {
      const wrong = a - c;
      const positiveScore = c * m;
      const negativeScore = wrong * p;
      const finalScore = positiveScore - negativeScore;
      
      const unattempted = tq > a ? tq - a : 0;
      const maxPossible = (tq > 0 ? tq : a) * m;
      const accuracy = (c / a) * 100;

      return {
        score: finalScore.toFixed(2),
        wrong,
        accuracy: accuracy.toFixed(1),
        maxPossible: maxPossible.toFixed(2),
        unattempted,
        penalty: negativeScore.toFixed(2)
      };
    }

    return { score: "0.00", wrong: 0, accuracy: "0.0", maxPossible: "0.00", unattempted: 0, penalty: "0.00" };
  };

  const result = calculate();

  return (
    <div className="w-full md: relative overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/10 rounded-full blur-[80px] pointer-events-none" />
      
      <div className="relative z-10 space-y-6">
        <div className="space-y-4 bg-amber-50/50 border border-amber-100/50 p-5 md:p-6 rounded-2xl">
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Total Questions in Exam</label>
            <input
              type="number"
              value={totalQuestions}
              onChange={(e) => setTotalQuestions(e.target.value)}
              placeholder="e.g. 100"
              className="w-full bg-slate-50/80 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500/50 transition-all shadow-inner"
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Total Questions Attempted</label>
            <input
              type="number"
              value={attempted}
              onChange={(e) => setAttempted(e.target.value)}
              placeholder="e.g. 85"
              className="w-full bg-slate-50/80 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500/50 transition-all shadow-inner"
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Correct Answers</label>
            <input
              type="number"
              value={correct}
              onChange={(e) => setCorrect(e.target.value)}
              placeholder="e.g. 70"
              className="w-full bg-slate-50/80 border border-slate-200 rounded-xl px-4 py-3 text-emerald-700 focus:outline-none focus:ring-2 focus:ring-amber-500/50 transition-all shadow-inner"
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Marks for Correct (+VE)</label>
            <input
              type="number"
              value={marksPerCorrect}
              onChange={(e) => setMarksPerCorrect(e.target.value)}
              placeholder="e.g. 4"
              className="w-full bg-slate-50/80 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500/50 transition-all shadow-inner"
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Penalty for Wrong (-VE)</label>
            <input
              type="number"
              value={penaltyPerWrong}
              onChange={(e) => setPenaltyPerWrong(e.target.value)}
              placeholder="e.g. 1"
              className="w-full bg-slate-50/80 border border-slate-200 rounded-xl px-4 py-3 text-rose-700 focus:outline-none focus:ring-2 focus:ring-amber-500/50 transition-all shadow-inner"
            />
          </div>
        </div>

        <div className="flex flex-col items-center justify-center p-8 bg-gradient-to-b from-amber-50 to-amber-100/80 rounded-3xl shadow-[0_8px_30px_rgb(251,191,36,0.15)] border border-amber-200/60 relative overflow-hidden">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#f59e0b10_1px,transparent_1px),linear-gradient(to_bottom,#f59e0b10_1px,transparent_1px)] bg-[size:24px_24px]" />
          <div className="absolute left-0 right-0 top-0 h-32 bg-gradient-to-b from-white/40 to-transparent" />
          
          <div className="absolute top-4 right-4 flex items-center gap-2 z-10">
            <button onClick={() => {
              const text = `Negative Marking Calculator
Total Questions in Exam: ${totalQuestions || 0}
Questions Attempted: ${attempted || 0}
Correct Answers: ${correct || 0}
Marks per Correct: ${marksPerCorrect || 0}
Penalty per Wrong: ${penaltyPerWrong || 0}
Final Score: ${result.score} / ${result.maxPossible}
Wrong Answers: ${result.wrong}
Penalty Deducted: ${result.penalty}
Unattempted: ${result.unattempted}
Accuracy: ${result.accuracy}%

Calculate Online: https://topcalcbox.com/negative-marking-calculator/`;
              copyToClipboard(text);
            }} className="flex items-center gap-1.5 px-3 py-1.5 bg-white/80 backdrop-blur-md border border-amber-200 rounded-xl text-[11px] font-bold text-amber-700 hover:bg-white transition-all shadow-sm">
              {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              <span className="inline">{copied ? "Copied" : "Copy"}</span>
            </button>
            <button onClick={reset} className="p-1.5 bg-white/80 backdrop-blur-md border border-amber-200 rounded-xl text-amber-700 hover:bg-white transition-all shadow-sm">
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>
          
          <div className="relative mb-6 mt-4 z-10">
            <div className="absolute inset-0 bg-amber-500/30 blur-xl rounded-full" />
            <div className="p-4 bg-white rounded-2xl shadow-xl shadow-amber-500/10 border border-amber-100 relative z-10 transform transition-transform hover:scale-105 duration-300">
              <TrendingDown className="w-8 h-8 text-amber-600" />
            </div>
          </div>
          
          <p className="text-sm text-amber-800/70 uppercase tracking-widest font-extrabold mb-2 z-10">
            Final Score
          </p>
          
          <motion.div 
            key={result.score}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="text-6xl md:text-7xl font-extrabold text-slate-900 tracking-tighter mb-6 drop-shadow-sm flex items-end z-10"
          >
            {result.score} <span className="text-2xl text-amber-600 ml-2 mb-2.5 font-bold opacity-90">/ {result.maxPossible}</span>
          </motion.div>

          <div className="w-full max-w-sm border-t-2 border-amber-200/60 my-2 z-10" />

          <div className="w-full grid grid-cols-2 gap-4 text-center text-sm mt-4 z-10">
            <div className="flex flex-col bg-white/60 backdrop-blur-sm p-3 rounded-2xl border border-amber-200/50 shadow-sm">
              <span className="text-amber-800/70 font-bold mb-1 text-[11px] uppercase tracking-wider">Wrong Answers</span>
              <span className="text-slate-900 font-extrabold text-xl">{result.wrong}</span>
            </div>
            <div className="flex flex-col bg-white/60 backdrop-blur-sm p-3 rounded-2xl border border-amber-200/50 shadow-sm">
              <span className="text-amber-800/70 font-bold mb-1 text-[11px] uppercase tracking-wider">Accuracy</span>
              <span className="text-slate-900 font-extrabold text-xl">{result.accuracy}%</span>
            </div>
            <div className="flex flex-col bg-white/60 backdrop-blur-sm p-3 rounded-2xl border border-amber-200/50 shadow-sm">
              <span className="text-amber-800/70 font-bold mb-1 text-[11px] uppercase tracking-wider">Unattempted</span>
              <span className="text-slate-900 font-extrabold text-xl">{result.unattempted}</span>
            </div>
            <div className="flex flex-col bg-white/60 backdrop-blur-sm p-3 rounded-2xl border border-amber-200/50 shadow-sm">
              <span className="text-amber-800/70 font-bold mb-1 text-[11px] uppercase tracking-wider">Penalty Deducted</span>
              <span className="text-rose-600 font-extrabold text-xl">-{result.penalty}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
