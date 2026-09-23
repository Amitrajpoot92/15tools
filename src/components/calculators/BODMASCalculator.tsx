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
          
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
            <h4 className="text-xs font-extrabold text-slate-500 uppercase tracking-wider mb-2">BODMAS Rule:</h4>
            <ul className="text-xs text-slate-600 space-y-1 font-medium">
              <li><strong>B</strong> - Brackets ()</li>
              <li><strong>O</strong> - Orders / Of</li>
              <li><strong>D</strong> - Division /</li>
              <li><strong>M</strong> - Multiplication *</li>
              <li><strong>A</strong> - Addition +</li>
              <li><strong>S</strong> - Subtraction -</li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col items-center justify-center p-8 bg-amber-100 rounded-2xl shadow-sm border border-amber-300 relative">
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent" />
          <div className="absolute top-4 right-4 flex items-center gap-1.5 z-10">
            <button onClick={() => {
              const finalRes = steps.length > 0 ? steps[steps.length - 1].replace(/@@/g, "") : "0";
              const text = `BODMAS Calculator
Math Expression: ${expression}
Result: ${finalRes}

Calculate Online: https://topcalcbox.com/bodmas-calculator/`;
              copyToClipboard(text);
            }} className="flex items-center gap-1 px-3 py-1.5 bg-white border border-amber-200 rounded-lg text-[11px] font-bold text-amber-700 hover:bg-amber-50 transition-colors shadow-sm">
              <span className="inline">{copied ? "Copied" : "Copy"}</span>
            </button>
            <button onClick={reset} className="p-1.5 bg-white border border-amber-200 rounded-lg text-amber-700 hover:bg-amber-50 transition-colors shadow-sm">
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>
          
          {steps.length > 0 && (
            <div className="w-full bg-white rounded-xl shadow-sm border border-amber-200 p-4 mb-4 text-left">
              <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">Step-by-Step Solution</h4>
              <div className="space-y-2 font-mono text-base md:text-lg text-slate-700 overflow-x-auto pb-2">
                {steps.map((step, index) => (
                   <div key={index} className="flex items-center gap-3 min-w-max">
                     <span className="text-amber-500 font-bold w-4 text-right">{index > 0 ? "=" : ""}</span>
                     <div>{renderStepHtml(step)}</div>
                   </div>
                ))}
              </div>
            </div>
          )}

          <div className="p-3 bg-white rounded-xl shadow-sm mb-4 mt-2">
            <Calculator className="w-8 h-8 text-amber-600" />
          </div>
          <p className="text-sm text-amber-800/70 mb-2 uppercase tracking-widest font-bold">Final Result</p>
          <motion.div 
            key={steps.length > 0 ? steps[steps.length - 1] : "0"}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className={`text-4xl md:text-5xl font-extrabold tracking-tighter drop-shadow-sm flex items-end gap-1 ${error ? 'text-red-700' : 'text-slate-900'}`}
          >
            {error ? "Error" : (steps.length > 0 ? steps[steps.length - 1].replace(/@@/g, "") : "0")}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
