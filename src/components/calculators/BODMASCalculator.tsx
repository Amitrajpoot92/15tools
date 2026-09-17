"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Calculator } from "lucide-react";

export function BODMASCalculator() {
  const [expression, setExpression] = useState<string>("");
  const [result, setResult] = useState<string>("0");
  const [error, setError] = useState<string>("");

  const calculateBODMAS = (expr: string) => {
    try {
      // Remove spaces
      const cleanExpr = expr.replace(/\s+/g, "");
      
      if (!cleanExpr) {
        setResult("0");
        setError("");
        return;
      }

      // Security check: only allow numbers and basic math operators
      if (!/^[0-9+\-*/().]+$/.test(cleanExpr)) {
        throw new Error("Invalid characters");
      }

      // Safe evaluation using Function
      // eslint-disable-next-line no-new-func
      const calcResult = new Function(`return ${cleanExpr}`)();
      
      if (calcResult === Infinity || calcResult === -Infinity) {
        throw new Error("Cannot divide by zero");
      }
      
      if (isNaN(calcResult)) {
        throw new Error("Invalid expression");
      }

      // Format result to avoid long decimals
      const formattedResult = Number.isInteger(calcResult) 
        ? calcResult.toString() 
        : parseFloat(calcResult.toFixed(4)).toString();
        
      setResult(formattedResult);
      setError("");
    } catch (err) {
      setResult("Error");
      if (err instanceof Error && err.message === "Invalid characters") {
        setError("Only numbers and +, -, *, /, (, ) are allowed.");
      } else {
        setError("Invalid math expression.");
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setExpression(val);
    calculateBODMAS(val);
  };

  return (
    <div className="bg-white border border-slate-200 rounded-3xl p-5 md:p-6 shadow-2xl shadow-amber-900/5 relative overflow-hidden">
      {/* Premium Background decoration */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/10 rounded-full blur-[80px] pointer-events-none" />
      
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
        <div className="space-y-6">
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

        <div className="flex flex-col items-center justify-center p-8 bg-gradient-to-br from-amber-500 to-amber-600 rounded-2xl h-full min-h-[200px] shadow-lg shadow-amber-500/30 border border-amber-400/30 relative overflow-hidden">
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent" />
          
          <div className="p-3 bg-white rounded-xl shadow-sm mb-4">
            <Calculator className="w-8 h-8 text-amber-600" />
          </div>
          <p className="text-sm text-amber-100 mb-2 uppercase tracking-widest font-bold">Result</p>
          <motion.div 
            key={result}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className={`text-4xl md:text-5xl font-extrabold tracking-tighter drop-shadow-sm flex items-end gap-1 ${result === 'Error' ? 'text-red-200' : 'text-white'}`}
          >
            {result}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
