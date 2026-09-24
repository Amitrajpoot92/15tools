"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Calculator, Copy, Check, RotateCcw } from "lucide-react";

export function BODMASCalculator() {
  const [expression, setExpression] = useState<string>("");
  const [steps, setSteps] = useState<string[]>([]);
  const [error, setError] = useState<string>("");
  const [copied, setCopied] = useState(false);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const reset = () => {
    setExpression("");
    setSteps([]);
    setError("");
  };

  const calculateBODMAS = (expr: string) => {
    try {
      let cleanExpr = expr.replace(/\s+/g, "");
      if (!cleanExpr) {
        setSteps([]);
        setError("");
        return;
      }

      // Allow extended operators: numbers, +, -, *, /, (, ), [, ], {, }, ^, √, ³, ×, ÷
      if (!/^[0-9+\-*/().[\]{}^√³×÷]+$/.test(cleanExpr)) {
        throw new Error("Invalid characters");
      }

      cleanExpr = cleanExpr.replace(/\[/g, "(").replace(/\]/g, ")");
      cleanExpr = cleanExpr.replace(/\{/g, "(").replace(/\}/g, ")");
      cleanExpr = cleanExpr.replace(/×/g, "*");
      cleanExpr = cleanExpr.replace(/÷/g, "/");
      
      cleanExpr = cleanExpr.replace(/(\d)(\()/g, "$1*$2");
      cleanExpr = cleanExpr.replace(/(\))(\d)/g, "$1*$2");
      cleanExpr = cleanExpr.replace(/(\))(\()/g, "$1*$2");

      const num = "(?:-?\\d+(?:\\.\\d+)?)";
      let iteration = 0;
      let calculatedSteps: string[] = [];
      calculatedSteps.push(cleanExpr);

      let currentExpr = cleanExpr;

      while (iteration < 100) {
        iteration++;
        let exprForEval = currentExpr.replace(/@@(.*?)@@/g, "$1");
        
        let prev;
        do {
          prev = exprForEval;
          exprForEval = exprForEval.replace(new RegExp(`\\((${num})\\)`), "$1"); 
        } while (exprForEval !== prev);

        if (new RegExp(`^${num}$`).test(exprForEval)) {
           break;
        }

        let nextExpr = exprForEval;
        let didSomething = false;

        const evaluateOp = (e: string) => {
          let match = e.match(new RegExp(`(³?√)(${num})`));
          if (match) {
            const op = match[1];
            const val = parseFloat(match[2]);
            const res = op === "³√" ? Math.cbrt(val) : Math.sqrt(val);
            if (isNaN(res)) throw new Error("Math Error");
            const fmt = Number.isInteger(res) ? res.toString() : parseFloat(res.toFixed(4)).toString();
            return e.replace(match[0], `@@${fmt}@@`);
          }

          match = e.match(new RegExp(`(${num})\\^(${num})`));
          if (match) {
            const res = Math.pow(parseFloat(match[1]), parseFloat(match[2]));
            if (isNaN(res) || !isFinite(res)) throw new Error("Math Error");
            const fmt = Number.isInteger(res) ? res.toString() : parseFloat(res.toFixed(4)).toString();
            return e.replace(match[0], `@@${fmt}@@`);
          }
          
          match = e.match(new RegExp(`(${num})([*/])(${num})`));
          if (match) {
            const a = parseFloat(match[1]);
            const op = match[2];
            const b = parseFloat(match[3]);
            if (op === "/" && b === 0) throw new Error("Divide by zero");
            const res = op === "*" ? (a * b) : (a / b);
            const fmt = Number.isInteger(res) ? res.toString() : parseFloat(res.toFixed(4)).toString();
            return e.replace(match[0], `@@${fmt}@@`);
          }

          let eTemp = e.replace(/\+-/g, "-").replace(/--/g, "+");
          if (new RegExp(`^${num}$`).test(eTemp)) return eTemp;

          match = eTemp.match(new RegExp(`(${num})([+-])(${num})`));
          if (match) {
             const a = parseFloat(match[1]);
             const op = match[2];
             const b = parseFloat(match[3]);
             const res = op === "+" ? (a + b) : (a - b);
             const fmt = Number.isInteger(res) ? res.toString() : parseFloat(res.toFixed(4)).toString();
             return eTemp.replace(match[0], `@@${fmt}@@`);
          }
          
          return e;
        };

        const bracketRegex = /\(([^()]+)\)/;
        const bracketMatch = exprForEval.match(bracketRegex);
        
        if (bracketMatch) {
          const inner = bracketMatch[1];
          const newInner = evaluateOp(inner);
          if (newInner !== inner) {
            nextExpr = exprForEval.replace(bracketRegex, `(${newInner})`);
            didSomething = true;
          } else {
             throw new Error("Invalid Expression");
          }
        } else {
          const newExpr = evaluateOp(exprForEval);
          if (newExpr !== exprForEval) {
            nextExpr = newExpr;
            didSomething = true;
          } else {
             throw new Error("Invalid Expression");
          }
        }

        if (!didSomething) break;
        currentExpr = nextExpr;
        calculatedSteps.push(currentExpr);
      }

      setSteps(calculatedSteps);
      setError("");
    } catch (err) {
      setSteps([]);
      if (err instanceof Error && err.message === "Invalid characters") {
        setError("Only numbers and +, -, *, /, (, ), ^, √, ³√ are allowed.");
      } else {
        setError("Invalid math expression.");
      }
    }
  };

  const renderStepHtml = (step: string) => {
    let display = step.replace(/\*/g, "×").replace(/\//g, "÷");
    const parts = display.split(/@@(.*?)@@/g);
    return parts.map((part, i) => {
      if (i % 2 === 1) {
        return <span key={i} className="text-red-600 font-bold">{part}</span>;
      }
      return <span key={i}>{part}</span>;
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setExpression(val);
    calculateBODMAS(val);
  };

  return (
    <div className="w-full md: relative overflow-hidden">
      {/* Premium Background decoration */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/10 rounded-full blur-[80px] pointer-events-none" />
      
      <div className="relative z-10 space-y-6">
        <div className="space-y-6 bg-amber-50/50 border border-amber-100/50 p-5 md:p-6 rounded-2xl">
          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700">Math Expression</label>
            <input
              type="text"
              value={expression}
              onChange={handleChange}
              placeholder="e.g. 5 + (3 * 2)"
              className={`w-full bg-slate-50/80 border rounded-xl px-4 py-3 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500/50 transition-all shadow-inner ${error ? 'border-red-300 focus:ring-red-500/50' : 'border-slate-200'}`}
            />
            {error && <p className="text-xs font-bold text-red-500 mt-1">{error}</p>}
          </div>
        </div>

        <div className="flex flex-col items-center justify-center p-8 bg-gradient-to-b from-amber-50 to-amber-100/80 rounded-3xl shadow-[0_8px_30px_rgb(251,191,36,0.15)] border border-amber-200/60 relative overflow-hidden">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#f59e0b10_1px,transparent_1px),linear-gradient(to_bottom,#f59e0b10_1px,transparent_1px)] bg-[size:24px_24px]" />
          <div className="absolute left-0 right-0 top-0 h-32 bg-gradient-to-b from-white/40 to-transparent" />
          <div className="absolute top-4 right-4 flex items-center gap-2 z-10">
            <button onClick={() => {
              const finalRes = steps.length > 0 ? steps[steps.length - 1].replace(/@@/g, "") : "0";
              
              let stepsText = "";
              if (steps.length > 1) {
                stepsText = "\nStep-by-Step Solution:\n" + steps.map((step, index) => {
                  const cleanStep = step.replace(/@@/g, "").replace(/\*/g, "×").replace(/\//g, "÷");
                  return `${index === 0 ? "  " : "= "}${cleanStep}`;
                }).join("\n") + "\n\n";
              }

              const text = `BODMAS Calculator
Math Expression: ${expression}
${stepsText}Result: ${finalRes}

Calculate Online: https://topcalcbox.com/bodmas-calculator/`;
              copyToClipboard(text);
            }} className="flex items-center gap-1.5 px-3 py-1.5 bg-white/80 backdrop-blur-md border border-amber-200 rounded-xl text-[11px] font-bold text-amber-700 hover:bg-white transition-all shadow-sm">
              {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              <span className="inline">{copied ? "Copied" : "Copy"}</span>
            </button>
            <button onClick={reset} className="p-1.5 bg-white/80 backdrop-blur-md border border-amber-200 rounded-xl text-amber-700 hover:bg-white transition-all shadow-sm">
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>
          
          {steps.length > 0 && (
            <div className="w-full bg-white/70 backdrop-blur-md rounded-2xl shadow-sm border border-amber-200/60 p-5 mb-6 text-left relative z-10">
              <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-4">Step-by-Step Solution</h4>
              <div className="space-y-2.5 font-mono text-base md:text-lg text-slate-700 overflow-x-auto pb-2">
                {steps.map((step, index) => (
                   <div key={index} className="flex items-center gap-3 min-w-max">
                     <span className="text-amber-500 font-bold w-4 text-right">{index > 0 ? "=" : ""}</span>
                     <div>{renderStepHtml(step)}</div>
                   </div>
                ))}
              </div>
            </div>
          )}

          <div className="relative mb-6 mt-2 z-10">
            <div className="absolute inset-0 bg-amber-500/30 blur-xl rounded-full" />
            <div className="p-4 bg-white rounded-2xl shadow-xl shadow-amber-500/10 border border-amber-100 relative z-10 transform transition-transform hover:scale-105 duration-300">
              <Calculator className="w-8 h-8 text-amber-600" />
            </div>
          </div>
          <p className="text-sm text-amber-800/70 uppercase tracking-widest font-extrabold mb-2 z-10">
            Final Result
          </p>
          <motion.div 
            key={steps.length > 0 ? steps[steps.length - 1] : "0"}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className={`text-6xl md:text-7xl font-extrabold tracking-tighter drop-shadow-sm flex items-end gap-1 z-10 ${error ? 'text-red-700' : 'text-slate-900'}`}
          >
            {error ? "Error" : (steps.length > 0 ? steps[steps.length - 1].replace(/@@/g, "") : "0")}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
