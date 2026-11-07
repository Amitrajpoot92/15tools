"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Copy, Check, RotateCcw, History, Trash2 } from "lucide-react";

interface HistoryItem {
  id: string;
  expression: string;
  result: string;
  time: string;
}

export function NormalCalculator() {
  const [mode, setMode] = useState<"basic" | "scientific">("basic");
  const [display, setDisplay] = useState<string>("0");
  const [expression, setExpression] = useState<string>("");
  const [isDegree, setIsDegree] = useState<boolean>(true);
  const [memory, setMemory] = useState<number>(0);
  const [hasMemory, setHasMemory] = useState<boolean>(false);
  const [lastAns, setLastAns] = useState<number>(0);
  const [justCalculated, setJustCalculated] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [showHistory, setShowHistory] = useState<boolean>(false);

  // Evaluate math expression safely
  const calculateResult = useCallback(
    (expr: string): { success: boolean; result?: number; error?: string } => {
      try {
        let s = expr
          .replace(/×/g, "*")
          .replace(/÷/g, "/")
          .replace(/−/g, "-")
          .replace(/,/g, "");

        if (!s.trim()) return { success: false, error: "Empty expression" };

        const fns = {
          sin: (x: number) => {
            const rad = isDegree ? (x * Math.PI) / 180 : x;
            const v = Math.sin(rad);
            return Math.abs(v) < 1e-12 ? 0 : v;
          },
          cos: (x: number) => {
            const rad = isDegree ? (x * Math.PI) / 180 : x;
            const v = Math.cos(rad);
            return Math.abs(v) < 1e-12 ? 0 : v;
          },
          tan: (x: number) => {
            const rad = isDegree ? (x * Math.PI) / 180 : x;
            if (isDegree && Math.abs((x % 180) - 90) < 1e-10) {
              throw new Error("Undefined");
            }
            const v = Math.tan(rad);
            return Math.abs(v) < 1e-12 ? 0 : v;
          },
          asin: (x: number) => {
            if (x < -1 || x > 1) throw new Error("Domain Error");
            return isDegree ? (Math.asin(x) * 180) / Math.PI : Math.asin(x);
          },
          acos: (x: number) => {
            if (x < -1 || x > 1) throw new Error("Domain Error");
            return isDegree ? (Math.acos(x) * 180) / Math.PI : Math.acos(x);
          },
          atan: (x: number) =>
            isDegree ? (Math.atan(x) * 180) / Math.PI : Math.atan(x),
          sqrt: (x: number) => {
            if (x < 0) throw new Error("Negative Sqrt");
            return Math.sqrt(x);
          },
          cbrt: (x: number) => Math.cbrt(x),
          log: (x: number) => {
            if (x <= 0) throw new Error("Domain Error");
            return Math.log10(x);
          },
          ln: (x: number) => {
            if (x <= 0) throw new Error("Domain Error");
            return Math.log(x);
          },
          abs: (x: number) => Math.abs(x),
          fact: (n: number) => {
            if (n < 0 || !Number.isInteger(n) || n > 170)
              throw new Error("Invalid factorial");
            let r = 1;
            for (let i = 2; i <= n; i++) r *= i;
            return r;
          },
        };

        // Constants
        s = s.replace(/π/g, "(" + Math.PI + ")");
        s = s.replace(/\be\b/g, "(" + Math.E + ")");

        // Powers and scientific notation
        s = s.replace(/\^/g, "**");

        // Percentage: number% -> (number/100)
        s = s.replace(/(\d+(?:\.\d+)?)%/g, "($1/100)");

        // Factorial: number! -> fns.fact(number)
        s = s.replace(/(\d+)!/g, "fns.fact($1)");

        // Map math functions
        for (const fn of [
          "asin",
          "acos",
          "atan",
          "sin",
          "cos",
          "tan",
          "sqrt",
          "cbrt",
          "log",
          "ln",
          "abs",
        ]) {
          const re = new RegExp("\\b" + fn + "\\(", "g");
          s = s.replace(re, "fns." + fn + "(");
        }

        // Implicit multiplication: 5(2) -> 5*(2) or (3)(4) -> (3)*(4)
        s = s.replace(/(\d)\(/g, "$1*(");
        s = s.replace(/\)(\d)/g, ")*$1");
        s = s.replace(/\)\(/g, ")*(");

        // Sanitize allowed chars: digits, fns, math operators, parens, decimals, spaces
        const safeChars = /^[0-9+\-*/(). ,a-zA-Z*^!%]+$/;
        if (!safeChars.test(s)) {
          return { success: false, error: "Invalid Characters" };
        }

        // Evaluate in sandbox
        const fnEvaluator = new Function(
          "fns",
          "Math",
          "\"use strict\"; return (" + s + ");"
        );
        const res = fnEvaluator(fns, Math);

        if (typeof res !== "number" || isNaN(res) || !isFinite(res)) {
          return { success: false, error: "Math Error" };
        }

        // Clean floating point precision issues
        const cleanVal = parseFloat(res.toPrecision(12));
        return { success: true, result: cleanVal };
      } catch (err: any) {
        return { success: false, error: err.message || "Error" };
      }
    },
    [isDegree]
  );

  // Button actions
  const handleNumber = (digit: string) => {
    if (justCalculated) {
      setDisplay(digit);
      setExpression("");
      setJustCalculated(false);
      return;
    }
    if (display === "0" || display === "Error") {
      setDisplay(digit);
    } else {
      setDisplay((prev) => prev + digit);
    }
  };

  const handleDecimal = () => {
    if (justCalculated) {
      setDisplay("0.");
      setExpression("");
      setJustCalculated(false);
      return;
    }
    // Check if the current number already has a decimal
    const parts = display.split(/[+\-×/]/);
    const lastPart = parts[parts.length - 1];
    if (!lastPart.includes(".")) {
      setDisplay((prev) => prev + ".");
    }
  };

  const handleOperator = (op: string) => {
    setJustCalculated(false);
    if (display === "Error") return;

    const lastChar = display.trim().slice(-1);
    if (["+", "-", "×", "/"].includes(lastChar)) {
      // Replace last operator
      setDisplay((prev) => prev.trim().slice(0, -1) + " " + op + " ");
    } else {
      setDisplay((prev) => prev + " " + op + " ");
    }
  };

  const handleFunction = (fnName: string) => {
    setJustCalculated(false);
    if (display === "0" || display === "Error") {
      setDisplay(fnName + "(");
    } else {
      setDisplay((prev) => prev + fnName + "(");
    }
  };

  const handleBackspace = () => {
    if (justCalculated) {
      setDisplay("0");
      setExpression("");
      setJustCalculated(false);
      return;
    }
    if (display.length <= 1 || display === "Error") {
      setDisplay("0");
    } else {
      // If trailing space from operator, remove space + op + space
      if (display.endsWith(" ")) {
        setDisplay((prev) => prev.trim().slice(0, -1).trim());
      } else {
        setDisplay((prev) => prev.slice(0, -1));
      }
    }
  };

  const handleClear = () => {
    setDisplay("0");
    setExpression("");
    setJustCalculated(false);
  };

  const handleEquals = () => {
    if (display === "Error") return;

    // Auto-close open parentheses
    let exprToEval = display;
    const openParens = (exprToEval.match(/\(/g) || []).length;
    const closeParens = (exprToEval.match(/\)/g) || []).length;
    if (openParens > closeParens) {
      exprToEval += ")".repeat(openParens - closeParens);
    }

    const res = calculateResult(exprToEval);
    if (res.success && res.result !== undefined) {
      const formatted = res.result.toString();
      setExpression(exprToEval + " =");
      setDisplay(formatted);
      setLastAns(res.result);
      setJustCalculated(true);

      // Add to history
      const now = new Date();
      const timeStr = now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
      setHistory((prev) => [
        {
          id: Math.random().toString(36).substring(2, 9),
          expression: exprToEval,
          result: formatted,
          time: timeStr,
        },
        ...prev.slice(0, 19),
      ]);
    } else {
      setExpression(exprToEval + " =");
      setDisplay(res.error || "Error");
      setJustCalculated(true);
    }
  };

  const handlePlusMinus = () => {
    if (display === "0" || display === "Error") return;
    try {
      const val = parseFloat(display);
      if (!isNaN(val) && !display.includes(" ") && !display.includes("(")) {
        setDisplay((-val).toString());
      } else {
        // Toggle negate on last number or prepend minus
        if (display.startsWith("-(")) {
          setDisplay((prev) => prev.slice(2, -1));
        } else {
          setDisplay((prev) => `-(${prev})`);
        }
      }
    } catch {
      // Ignored
    }
  };

  const handleRandom = () => {
    const r = parseFloat(Math.random().toFixed(4)).toString();
    if (justCalculated || display === "0") {
      setDisplay(r);
      setJustCalculated(false);
    } else {
      setDisplay((prev) => prev + r);
    }
  };

  const handleExp = () => {
    if (justCalculated) {
      setDisplay("1e+");
      setJustCalculated(false);
    } else if (display === "0") {
      setDisplay("1e+");
    } else {
      setDisplay((prev) => prev + "e+");
    }
  };

  const handleAns = () => {
    const ansStr = lastAns.toString();
    if (justCalculated || display === "0") {
      setDisplay(ansStr);
      setJustCalculated(false);
    } else {
      setDisplay((prev) => prev + ansStr);
    }
  };

  // Memory buttons
  const handleMemoryAdd = () => {
    const res = calculateResult(display);
    if (res.success && res.result !== undefined) {
      setMemory((prev) => prev + (res.result || 0));
      setHasMemory(true);
      setJustCalculated(true);
    }
  };

  const handleMemorySubtract = () => {
    const res = calculateResult(display);
    if (res.success && res.result !== undefined) {
      setMemory((prev) => prev - (res.result || 0));
      setHasMemory(true);
      setJustCalculated(true);
    }
  };

  const handleMemoryRecall = () => {
    if (!hasMemory) return;
    const memStr = memory.toString();
    if (justCalculated || display === "0") {
      setDisplay(memStr);
      setJustCalculated(false);
    } else {
      setDisplay((prev) => prev + memStr);
    }
  };

  const handleMemoryClear = () => {
    setMemory(0);
    setHasMemory(false);
  };

  // Copy result
  const copyToClipboard = () => {
    navigator.clipboard.writeText(display);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Keyboard shortcut listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Prevent handling if user is typing in another input element
      if (
        document.activeElement?.tagName === "INPUT" ||
        document.activeElement?.tagName === "TEXTAREA"
      ) {
        return;
      }

      if (e.key >= "0" && e.key <= "9") {
        e.preventDefault();
        handleNumber(e.key);
      } else if (e.key === ".") {
        e.preventDefault();
        handleDecimal();
      } else if (e.key === "+") {
        e.preventDefault();
        handleOperator("+");
      } else if (e.key === "-") {
        e.preventDefault();
        handleOperator("-");
      } else if (e.key === "*") {
        e.preventDefault();
        handleOperator("×");
      } else if (e.key === "/") {
        e.preventDefault();
        handleOperator("/");
      } else if (e.key === "Enter" || e.key === "=") {
        e.preventDefault();
        handleEquals();
      } else if (e.key === "Backspace") {
        e.preventDefault();
        handleBackspace();
      } else if (e.key === "Escape") {
        e.preventDefault();
        handleClear();
      } else if (e.key === "(" || e.key === ")") {
        e.preventDefault();
        setDisplay((prev) => (prev === "0" ? e.key : prev + e.key));
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [display, justCalculated]);

  return (
    <div className="w-full max-w-xl mx-auto select-none">
      {/* Calculator Container */}
      <div className="bg-[#EDEDED] border-2 border-[#D1D5DB] rounded-2xl shadow-xl p-3 sm:p-5">
        
        {/* Top Tab Bar (Exact Calculator.net style) */}
        <div className="flex items-center justify-between border-b-2 border-[#135185] mb-3">
          <div className="flex">
            <button
              type="button"
              onClick={() => setMode("basic")}
              className={`px-4 py-2 text-sm font-bold transition-all rounded-t-lg -mb-[2px] border-t-2 border-l-2 border-r-2 ${
                mode === "basic"
                  ? "bg-white text-slate-900 border-[#135185] border-b-white z-10 shadow-sm"
                  : "bg-[#135185] text-white/90 border-[#135185] hover:bg-[#0f4470]"
              }`}
            >
              Basic
            </button>
            <button
              type="button"
              onClick={() => setMode("scientific")}
              className={`px-4 py-2 text-sm font-bold transition-all rounded-t-lg -mb-[2px] border-t-2 border-l-2 border-r-2 ${
                mode === "scientific"
                  ? "bg-white text-slate-900 border-[#135185] border-b-white z-10 shadow-sm"
                  : "bg-[#135185] text-white/90 border-[#135185] hover:bg-[#0f4470]"
              }`}
            >
              Scientific
            </button>
          </div>

          {/* Quick utility controls */}
          <div className="flex items-center space-x-2 pb-1">
            {mode === "scientific" && (
              <button
                type="button"
                onClick={() => setIsDegree(!isDegree)}
                className="text-xs font-bold px-2.5 py-1 rounded bg-white text-[#135185] border border-slate-300 hover:bg-slate-50 transition-colors shadow-sm"
              >
                {isDegree ? "DEG" : "RAD"}
              </button>
            )}
            <button
              type="button"
              onClick={() => setShowHistory(!showHistory)}
              className={`text-xs font-bold px-2.5 py-1 rounded flex items-center space-x-1 border transition-colors shadow-sm ${
                showHistory
                  ? "bg-[#135185] text-white border-[#135185]"
                  : "bg-white text-slate-700 border-slate-300 hover:bg-slate-50"
              }`}
              title="Calculation History"
            >
              <History className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">History</span>
            </button>
          </div>
        </div>

        {/* LCD Blue Display (High contrast matching Calculator.net) */}
        <div className="relative bg-[#135185] text-white rounded-lg p-3 sm:p-4 mb-3 sm:mb-4 shadow-inner border border-[#0d3b61]">
          {/* Status chips */}
          <div className="flex items-center justify-between text-[11px] font-semibold text-sky-200/80 mb-1 min-h-[18px]">
            <div className="flex items-center space-x-2">
              {hasMemory && (
                <span className="bg-sky-400/20 text-sky-100 px-1.5 py-0.5 rounded text-[10px] font-bold border border-sky-300/30">
                  M = {memory}
                </span>
              )}
              {mode === "scientific" && (
                <span className="text-[10px] font-bold tracking-wider opacity-75">
                  [{isDegree ? "DEG" : "RAD"}]
                </span>
              )}
            </div>
            {/* Expression line */}
            <div className="truncate max-w-[240px] sm:max-w-xs text-right font-mono font-bold text-sky-100 text-sm sm:text-base">
              {expression}
            </div>
          </div>

          {/* Main big display */}
          <div className="flex items-baseline justify-between overflow-hidden">
            <button
              type="button"
              onClick={copyToClipboard}
              className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md transition-all self-end mb-1 cursor-pointer ${
                copied
                  ? "bg-emerald-500 text-white font-bold"
                  : "bg-white/20 hover:bg-white/30 text-white font-bold border border-white/30 shadow-xs"
              }`}
              title="Copy result"
              aria-label="Copy result"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-white" strokeWidth={3} />
                  <span className="text-[11px] uppercase tracking-wider">Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-white" strokeWidth={2.5} />
                  <span className="text-[11px] uppercase tracking-wider">Copy</span>
                </>
              )}
            </button>
            <div
              className={`font-mono font-bold tracking-tight text-right text-white break-all select-all flex-1 ml-2 ${
                display.length > 16
                  ? "text-xl sm:text-2xl"
                  : display.length > 10
                  ? "text-2xl sm:text-3xl"
                  : "text-3xl sm:text-4xl"
              }`}
            >
              {display}
            </div>
          </div>
        </div>

        {/* Scientific Secondary Grid (When in Scientific mode) */}
        <AnimatePresence>
          {mode === "scientific" && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="grid grid-cols-5 gap-1.5 sm:gap-2 mb-2 overflow-hidden"
            >
              {[
                { label: "sin", action: () => handleFunction("sin") },
                { label: "cos", action: () => handleFunction("cos") },
                { label: "tan", action: () => handleFunction("tan") },
                { label: "ln", action: () => handleFunction("ln") },
                { label: "log", action: () => handleFunction("log") },
                { label: "sin⁻¹", action: () => handleFunction("asin") },
                { label: "cos⁻¹", action: () => handleFunction("acos") },
                { label: "tan⁻¹", action: () => handleFunction("atan") },
                { label: "√", action: () => handleFunction("sqrt") },
                { label: "xʸ", action: () => handleOperator("^") },
                { label: "(", action: () => setDisplay((p) => (p === "0" ? "(" : p + "(")) },
                { label: ")", action: () => setDisplay((p) => (p === "0" ? ")" : p + ")")) },
                { label: "x²", action: () => setDisplay((p) => p + "^2") },
                { label: "x!", action: () => setDisplay((p) => p + "!") },
                { label: "1/x", action: () => setDisplay((p) => `1/(${p})`) },
                { label: "π", action: () => setDisplay((p) => (p === "0" ? "π" : p + "π")) },
                { label: "e", action: () => setDisplay((p) => (p === "0" ? "e" : p + "e")) },
                { label: "%", action: () => setDisplay((p) => p + "%") },
                { label: "|x|", action: () => handleFunction("abs") },
                { label: "MC", action: handleMemoryClear, highlight: hasMemory },
              ].map((btn, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={btn.action}
                  className={`h-10 sm:h-11 text-xs sm:text-sm font-semibold rounded-lg border transition-all active:scale-95 shadow-sm ${
                    btn.highlight
                      ? "bg-amber-100 border-amber-300 text-amber-900 font-bold"
                      : "bg-[#E2EDF7] hover:bg-[#D4E4F2] text-[#0F3B60] border-[#BCD4E6]"
                  }`}
                >
                  {btn.label}
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* 5x5 Main Keypad Grid (Exact layout from user's image) */}
        <div className="grid grid-cols-5 gap-1.5 sm:gap-2">
          {/* Row 1: 7, 8, 9, +, Back */}
          <button
            type="button"
            onClick={() => handleNumber("7")}
            className="h-12 sm:h-14 bg-[#B7D2E8] hover:bg-[#A6C7E2] active:bg-[#95BCE0] text-slate-900 font-bold text-xl sm:text-2xl rounded-lg border border-[#9EBFDC] shadow-sm active:scale-95 transition-all"
          >
            7
          </button>
          <button
            type="button"
            onClick={() => handleNumber("8")}
            className="h-12 sm:h-14 bg-[#B7D2E8] hover:bg-[#A6C7E2] active:bg-[#95BCE0] text-slate-900 font-bold text-xl sm:text-2xl rounded-lg border border-[#9EBFDC] shadow-sm active:scale-95 transition-all"
          >
            8
          </button>
          <button
            type="button"
            onClick={() => handleNumber("9")}
            className="h-12 sm:h-14 bg-[#B7D2E8] hover:bg-[#A6C7E2] active:bg-[#95BCE0] text-slate-900 font-bold text-xl sm:text-2xl rounded-lg border border-[#9EBFDC] shadow-sm active:scale-95 transition-all"
          >
            9
          </button>
          <button
            type="button"
            onClick={() => handleOperator("+")}
            className="h-12 sm:h-14 bg-white hover:bg-slate-50 active:bg-slate-100 text-slate-900 font-bold text-xl sm:text-2xl rounded-lg border border-slate-300 shadow-sm active:scale-95 transition-all"
          >
            +
          </button>
          <button
            type="button"
            onClick={handleBackspace}
            className="h-12 sm:h-14 bg-white hover:bg-rose-50 active:bg-rose-100 text-rose-700 font-bold text-sm sm:text-base rounded-lg border border-slate-300 shadow-sm active:scale-95 transition-all"
          >
            Back
          </button>

          {/* Row 2: 4, 5, 6, -, Ans */}
          <button
            type="button"
            onClick={() => handleNumber("4")}
            className="h-12 sm:h-14 bg-[#B7D2E8] hover:bg-[#A6C7E2] active:bg-[#95BCE0] text-slate-900 font-bold text-xl sm:text-2xl rounded-lg border border-[#9EBFDC] shadow-sm active:scale-95 transition-all"
          >
            4
          </button>
          <button
            type="button"
            onClick={() => handleNumber("5")}
            className="h-12 sm:h-14 bg-[#B7D2E8] hover:bg-[#A6C7E2] active:bg-[#95BCE0] text-slate-900 font-bold text-xl sm:text-2xl rounded-lg border border-[#9EBFDC] shadow-sm active:scale-95 transition-all"
          >
            5
          </button>
          <button
            type="button"
            onClick={() => handleNumber("6")}
            className="h-12 sm:h-14 bg-[#B7D2E8] hover:bg-[#A6C7E2] active:bg-[#95BCE0] text-slate-900 font-bold text-xl sm:text-2xl rounded-lg border border-[#9EBFDC] shadow-sm active:scale-95 transition-all"
          >
            6
          </button>
          <button
            type="button"
            onClick={() => handleOperator("-")}
            className="h-12 sm:h-14 bg-white hover:bg-slate-50 active:bg-slate-100 text-slate-900 font-bold text-xl sm:text-2xl rounded-lg border border-slate-300 shadow-sm active:scale-95 transition-all"
          >
            −
          </button>
          <button
            type="button"
            onClick={handleAns}
            className="h-12 sm:h-14 bg-white hover:bg-slate-50 active:bg-slate-100 text-slate-800 font-bold text-sm sm:text-base rounded-lg border border-slate-300 shadow-sm active:scale-95 transition-all"
          >
            Ans
          </button>

          {/* Row 3: 1, 2, 3, ×, M+ */}
          <button
            type="button"
            onClick={() => handleNumber("1")}
            className="h-12 sm:h-14 bg-[#B7D2E8] hover:bg-[#A6C7E2] active:bg-[#95BCE0] text-slate-900 font-bold text-xl sm:text-2xl rounded-lg border border-[#9EBFDC] shadow-sm active:scale-95 transition-all"
          >
            1
          </button>
          <button
            type="button"
            onClick={() => handleNumber("2")}
            className="h-12 sm:h-14 bg-[#B7D2E8] hover:bg-[#A6C7E2] active:bg-[#95BCE0] text-slate-900 font-bold text-xl sm:text-2xl rounded-lg border border-[#9EBFDC] shadow-sm active:scale-95 transition-all"
          >
            2
          </button>
          <button
            type="button"
            onClick={() => handleNumber("3")}
            className="h-12 sm:h-14 bg-[#B7D2E8] hover:bg-[#A6C7E2] active:bg-[#95BCE0] text-slate-900 font-bold text-xl sm:text-2xl rounded-lg border border-[#9EBFDC] shadow-sm active:scale-95 transition-all"
          >
            3
          </button>
          <button
            type="button"
            onClick={() => handleOperator("×")}
            className="h-12 sm:h-14 bg-white hover:bg-slate-50 active:bg-slate-100 text-slate-900 font-bold text-xl sm:text-2xl rounded-lg border border-slate-300 shadow-sm active:scale-95 transition-all"
          >
            ×
          </button>
          <button
            type="button"
            onClick={handleMemoryAdd}
            className="h-12 sm:h-14 bg-white hover:bg-slate-50 active:bg-slate-100 text-slate-800 font-bold text-sm sm:text-base rounded-lg border border-slate-300 shadow-sm active:scale-95 transition-all"
          >
            M+
          </button>

          {/* Row 4: 0, ., EXP, /, M- */}
          <button
            type="button"
            onClick={() => handleNumber("0")}
            className="h-12 sm:h-14 bg-[#B7D2E8] hover:bg-[#A6C7E2] active:bg-[#95BCE0] text-slate-900 font-bold text-xl sm:text-2xl rounded-lg border border-[#9EBFDC] shadow-sm active:scale-95 transition-all"
          >
            0
          </button>
          <button
            type="button"
            onClick={handleDecimal}
            className="h-12 sm:h-14 bg-[#B7D2E8] hover:bg-[#A6C7E2] active:bg-[#95BCE0] text-slate-900 font-bold text-2xl sm:text-3xl rounded-lg border border-[#9EBFDC] shadow-sm active:scale-95 transition-all leading-none"
          >
            .
          </button>
          <button
            type="button"
            onClick={handleExp}
            className="h-12 sm:h-14 bg-white hover:bg-slate-50 active:bg-slate-100 text-slate-800 font-bold text-xs sm:text-sm rounded-lg border border-slate-300 shadow-sm active:scale-95 transition-all"
          >
            EXP
          </button>
          <button
            type="button"
            onClick={() => handleOperator("/")}
            className="h-12 sm:h-14 bg-white hover:bg-slate-50 active:bg-slate-100 text-slate-900 font-bold text-xl sm:text-2xl rounded-lg border border-slate-300 shadow-sm active:scale-95 transition-all"
          >
            /
          </button>
          <button
            type="button"
            onClick={handleMemorySubtract}
            className="h-12 sm:h-14 bg-white hover:bg-slate-50 active:bg-slate-100 text-slate-800 font-bold text-sm sm:text-base rounded-lg border border-slate-300 shadow-sm active:scale-95 transition-all"
          >
            M−
          </button>

          {/* Row 5: ±, RND, AC, =, MR */}
          <button
            type="button"
            onClick={handlePlusMinus}
            className="h-12 sm:h-14 bg-white hover:bg-slate-50 active:bg-slate-100 text-slate-900 font-bold text-lg sm:text-xl rounded-lg border border-slate-300 shadow-sm active:scale-95 transition-all"
          >
            ±
          </button>
          <button
            type="button"
            onClick={handleRandom}
            className="h-12 sm:h-14 bg-white hover:bg-slate-50 active:bg-slate-100 text-slate-800 font-bold text-xs sm:text-sm rounded-lg border border-slate-300 shadow-sm active:scale-95 transition-all"
          >
            RND
          </button>
          <button
            type="button"
            onClick={handleClear}
            className="h-12 sm:h-14 bg-[#8DB4D6] hover:bg-[#7CA6CC] active:bg-[#6D98C0] text-slate-950 font-extrabold text-base sm:text-lg rounded-lg border border-[#7BA5CD] shadow-sm active:scale-95 transition-all"
          >
            AC
          </button>
          <button
            type="button"
            onClick={handleEquals}
            className="h-12 sm:h-14 bg-[#8DB4D6] hover:bg-[#7CA6CC] active:bg-[#6D98C0] text-slate-950 font-extrabold text-2xl sm:text-3xl rounded-lg border border-[#7BA5CD] shadow-sm active:scale-95 transition-all"
          >
            =
          </button>
          <button
            type="button"
            onClick={handleMemoryRecall}
            className={`h-12 sm:h-14 font-bold text-sm sm:text-base rounded-lg border shadow-sm active:scale-95 transition-all ${
              hasMemory
                ? "bg-amber-100 text-amber-900 border-amber-300 font-black"
                : "bg-white hover:bg-slate-50 text-slate-800 border-slate-300"
            }`}
          >
            MR
          </button>
        </div>

        {/* Calculation History Drawer */}
        <AnimatePresence>
          {showHistory && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-4 pt-3 border-t border-slate-300 overflow-hidden"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Recent Calculations
                </span>
                {history.length > 0 && (
                  <button
                    type="button"
                    onClick={() => setHistory([])}
                    className="text-xs text-rose-600 hover:text-rose-700 flex items-center space-x-1 font-semibold"
                  >
                    <Trash2 className="w-3 h-3" />
                    <span>Clear</span>
                  </button>
                )}
              </div>

              {history.length === 0 ? (
                <p className="text-xs text-slate-500 py-3 text-center italic">
                  No calculations yet. Enter any formula above!
                </p>
              ) : (
                <div className="max-h-48 overflow-y-auto space-y-1.5 pr-1">
                  {history.map((item) => (
                    <div
                      key={item.id}
                      onClick={() => {
                        setDisplay(item.result);
                        setExpression(item.expression + " =");
                        setJustCalculated(true);
                      }}
                      className="flex items-center justify-between p-2 rounded-lg bg-white border border-slate-200 hover:border-sky-300 hover:bg-sky-50/50 cursor-pointer transition-all text-xs"
                    >
                      <div className="truncate mr-2 font-mono text-slate-600">
                        {item.expression} =
                      </div>
                      <div className="font-mono font-bold text-slate-900">
                        {item.result}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
}
