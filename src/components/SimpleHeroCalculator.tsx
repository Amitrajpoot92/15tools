"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { Delete, Copy, Check } from "lucide-react";

export function SimpleHeroCalculator() {
  const [input, setInput] = useState<string>("5 × 5");
  const [previousFormula, setPreviousFormula] = useState<string>("");
  const [justCalculated, setJustCalculated] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);

  // Live real-time preview computation
  const preview = useMemo(() => {
    if (justCalculated) return "";
    try {
      let s = input
        .replace(/×/g, "*")
        .replace(/÷/g, "/")
        .replace(/−/g, "-")
        .trim();

      if (!s || s === "0") return "";

      // Auto-close open parentheses
      const openP = (s.match(/\(/g) || []).length;
      const closeP = (s.match(/\)/g) || []).length;
      if (openP > closeP) s += ")".repeat(openP - closeP);

      // If expression ends with an operator, trim it to compute live partial result
      if (/[+\-*/.]$/.test(s)) {
        const trimmed = s.replace(/[+\-*/.]+$/, "").trim();
        if (!trimmed) return "";
        s = trimmed;
      }

      // Percentage replacement
      s = s.replace(/(\d+(?:\.\d+)?)%/g, "($1/100)");

      if (!/^[0-9+\-*/(). ]+$/.test(s)) return "";

      // Evaluate safely
      const res = Function('"use strict"; return (' + s + ")")();
      if (typeof res === "number" && isFinite(res) && !isNaN(res)) {
        const cleanVal = parseFloat(res.toPrecision(12));
        return "= " + cleanVal.toLocaleString("en-US", { maximumFractionDigits: 8 });
      }
    } catch {
      // Ignored for live typing
    }
    return "";
  }, [input, justCalculated]);

  // Handlers
  const handleDigit = (val: string) => {
    if (justCalculated) {
      setInput(val === "00" ? "0" : val);
      setPreviousFormula("");
      setJustCalculated(false);
      return;
    }
    if (input === "0") {
      setInput(val === "00" ? "0" : val);
    } else {
      setInput((prev) => prev + val);
    }
  };

  const handleDecimal = () => {
    if (justCalculated) {
      setInput("0.");
      setPreviousFormula("");
      setJustCalculated(false);
      return;
    }
    // Check if the current number segment already has a decimal
    const parts = input.split(/[+\-×÷]/);
    const lastPart = parts[parts.length - 1];
    if (!lastPart.includes(".")) {
      setInput((prev) => prev + ".");
    }
  };

  const handleOperator = (op: string) => {
    setJustCalculated(false);
    const lastChar = input.trim().slice(-1);
    if (["+", "−", "×", "÷"].includes(lastChar)) {
      setInput((prev) => prev.trim().slice(0, -1) + " " + op + " ");
    } else {
      setInput((prev) => (prev === "0" ? "0 " + op + " " : prev + " " + op + " "));
    }
  };

  const handlePercent = () => {
    setJustCalculated(false);
    if (input === "0" || /[+\-×÷]$/.test(input.trim())) return;
    setInput((prev) => prev + "%");
  };

  const handleBackspace = () => {
    if (justCalculated) {
      setInput("0");
      setPreviousFormula("");
      setJustCalculated(false);
      return;
    }
    if (input.length <= 1) {
      setInput("0");
    } else {
      if (input.endsWith(" ")) {
        setInput((prev) => prev.trim().slice(0, -1).trim());
      } else {
        setInput((prev) => prev.slice(0, -1));
      }
    }
  };

  const handleClear = () => {
    setInput("0");
    setPreviousFormula("");
    setJustCalculated(false);
  };

  const handleEquals = () => {
    try {
      let s = input
        .replace(/×/g, "*")
        .replace(/÷/g, "/")
        .replace(/−/g, "-")
        .trim();

      if (!s) return;

      const openP = (s.match(/\(/g) || []).length;
      const closeP = (s.match(/\)/g) || []).length;
      if (openP > closeP) s += ")".repeat(openP - closeP);

      s = s.replace(/(\d+(?:\.\d+)?)%/g, "($1/100)");

      if (!/^[0-9+\-*/(). ]+$/.test(s)) return;

      const res = Function('"use strict"; return (' + s + ")")();
      if (typeof res === "number" && isFinite(res) && !isNaN(res)) {
        const cleanVal = parseFloat(res.toPrecision(12));
        setPreviousFormula(input + " =");
        setInput(cleanVal.toString());
        setJustCalculated(true);
      }
    } catch {
      // Ignored
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(input);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Keyboard support for desktop
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (
        document.activeElement?.tagName === "INPUT" ||
        document.activeElement?.tagName === "TEXTAREA"
      ) {
        return;
      }

      if (e.key >= "0" && e.key <= "9") {
        e.preventDefault();
        handleDigit(e.key);
      } else if (e.key === ".") {
        e.preventDefault();
        handleDecimal();
      } else if (e.key === "+") {
        e.preventDefault();
        handleOperator("+");
      } else if (e.key === "-") {
        e.preventDefault();
        handleOperator("−");
      } else if (e.key === "*") {
        e.preventDefault();
        handleOperator("×");
      } else if (e.key === "/") {
        e.preventDefault();
        handleOperator("÷");
      } else if (e.key === "%") {
        e.preventDefault();
        handlePercent();
      } else if (e.key === "Enter" || e.key === "=") {
        e.preventDefault();
        handleEquals();
      } else if (e.key === "Backspace") {
        e.preventDefault();
        handleBackspace();
      } else if (e.key === "Escape") {
        e.preventDefault();
        handleClear();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [input, justCalculated]);

  return (
    <div className="w-full max-w-[390px] mx-auto select-none">
      {/* Outer Card */}
      <div className="bg-white/90 backdrop-blur-xl rounded-[2.2rem] p-4 sm:p-5 shadow-2xl shadow-indigo-950/10 border border-slate-200/90">
        
        {/* Soft Lavender Display Screen (Matching User Image) */}
        <div 
          onClick={copyToClipboard}
          className="relative bg-gradient-to-b from-[#E9EDFB] to-[#DFE5F9] rounded-[1.75rem] p-5 sm:p-6 mb-4 sm:mb-5 border border-[#D5DCF4] shadow-inner cursor-pointer group min-h-[140px] sm:min-h-[155px] flex flex-col justify-between"
          title="Click to copy"
        >
          {/* Top Row: Running Sub-result or Previous Equation */}
          <div className="flex items-center justify-between min-h-[32px]">
            <div>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  copyToClipboard();
                }}
                className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-xl transition-all shadow-xs cursor-pointer ${
                  copied
                    ? "bg-emerald-600 text-white font-bold"
                    : "bg-white/95 hover:bg-white text-slate-800 hover:text-slate-950 border border-slate-300/90 hover:border-slate-400 font-bold active:scale-95"
                }`}
                title="Copy result"
                aria-label="Copy result"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-white" strokeWidth={3} />
                    <span className="text-[11px] font-black tracking-wider uppercase">Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-slate-800" strokeWidth={2.5} />
                    <span className="text-[11px] font-extrabold text-slate-800 tracking-wider uppercase">Copy</span>
                  </>
                )}
              </button>
            </div>

            <div className="font-mono font-black text-slate-800 tracking-tight text-right text-xl sm:text-2xl min-h-[32px] flex items-center justify-end">
              {justCalculated ? previousFormula : preview}
            </div>
          </div>

          {/* Bottom Row: Main Expression & Active Cursor */}
          <div className="flex items-center justify-end space-x-2 overflow-hidden mt-2">
            <div
              className={`font-mono font-black text-slate-900 tracking-tight text-right break-all transition-all ${
                input.length > 13
                  ? "text-2xl sm:text-3xl"
                  : input.length > 8
                  ? "text-3xl sm:text-4xl"
                  : "text-4xl sm:text-5xl"
              }`}
            >
              {input}
            </div>
            {/* Blinking Lavender Cursor */}
            <span className="w-[3px] h-8 sm:h-9 bg-indigo-400/70 rounded-full animate-pulse shrink-0" />
          </div>
        </div>

        {/* 4x5 Keypad Grid (Exact Layout & Colors From User Image) */}
        <div className="grid grid-cols-4 gap-2.5 sm:gap-3">
          
          {/* Row 1: AC (pink), Backspace (lavender), % (lavender), ÷ (orange) */}
          <button
            type="button"
            onClick={handleClear}
            className="h-14 sm:h-16 bg-[#FFE8EC] hover:bg-[#FFDDE3] active:scale-95 text-[#E11D48] font-black text-xl sm:text-2xl rounded-2xl sm:rounded-3xl transition-all shadow-sm flex items-center justify-center outline-none"
          >
            AC
          </button>
          <button
            type="button"
            onClick={handleBackspace}
            aria-label="Backspace"
            className="h-14 sm:h-16 bg-[#EBF0FC] hover:bg-[#DEE7FA] active:scale-95 text-[#1E293B] font-bold rounded-2xl sm:rounded-3xl transition-all shadow-sm flex items-center justify-center outline-none"
          >
            <Delete className="w-5 h-5 sm:w-6 sm:h-6 text-[#1E293B]" strokeWidth={2.2} />
          </button>
          <button
            type="button"
            onClick={handlePercent}
            className="h-14 sm:h-16 bg-[#EBF0FC] hover:bg-[#DEE7FA] active:scale-95 text-[#1E293B] font-black text-xl sm:text-2xl rounded-2xl sm:rounded-3xl transition-all shadow-sm flex items-center justify-center outline-none"
          >
            %
          </button>
          <button
            type="button"
            onClick={() => handleOperator("÷")}
            className="h-14 sm:h-16 bg-gradient-to-b from-[#FF7A1A] to-[#FA5A00] hover:brightness-105 active:scale-95 text-white font-black text-2xl sm:text-3xl rounded-2xl sm:rounded-3xl transition-all shadow-md shadow-orange-500/20 flex items-center justify-center outline-none"
          >
            ÷
          </button>

          {/* Row 2: 7, 8, 9, × */}
          <button
            type="button"
            onClick={() => handleDigit("7")}
            className="h-14 sm:h-16 bg-white hover:bg-slate-50 active:scale-95 text-[#0F172A] font-black text-2xl sm:text-3xl rounded-2xl sm:rounded-3xl transition-all shadow-sm border border-slate-100 flex items-center justify-center outline-none"
          >
            7
          </button>
          <button
            type="button"
            onClick={() => handleDigit("8")}
            className="h-14 sm:h-16 bg-white hover:bg-slate-50 active:scale-95 text-[#0F172A] font-black text-2xl sm:text-3xl rounded-2xl sm:rounded-3xl transition-all shadow-sm border border-slate-100 flex items-center justify-center outline-none"
          >
            8
          </button>
          <button
            type="button"
            onClick={() => handleDigit("9")}
            className="h-14 sm:h-16 bg-white hover:bg-slate-50 active:scale-95 text-[#0F172A] font-black text-2xl sm:text-3xl rounded-2xl sm:rounded-3xl transition-all shadow-sm border border-slate-100 flex items-center justify-center outline-none"
          >
            9
          </button>
          <button
            type="button"
            onClick={() => handleOperator("×")}
            className="h-14 sm:h-16 bg-gradient-to-b from-[#FF7A1A] to-[#FA5A00] hover:brightness-105 active:scale-95 text-white font-black text-2xl sm:text-3xl rounded-2xl sm:rounded-3xl transition-all shadow-md shadow-orange-500/20 flex items-center justify-center outline-none"
          >
            ×
          </button>

          {/* Row 3: 4, 5, 6, − */}
          <button
            type="button"
            onClick={() => handleDigit("4")}
            className="h-14 sm:h-16 bg-white hover:bg-slate-50 active:scale-95 text-[#0F172A] font-black text-2xl sm:text-3xl rounded-2xl sm:rounded-3xl transition-all shadow-sm border border-slate-100 flex items-center justify-center outline-none"
          >
            4
          </button>
          <button
            type="button"
            onClick={() => handleDigit("5")}
            className="h-14 sm:h-16 bg-white hover:bg-slate-50 active:scale-95 text-[#0F172A] font-black text-2xl sm:text-3xl rounded-2xl sm:rounded-3xl transition-all shadow-sm border border-slate-100 flex items-center justify-center outline-none"
          >
            5
          </button>
          <button
            type="button"
            onClick={() => handleDigit("6")}
            className="h-14 sm:h-16 bg-white hover:bg-slate-50 active:scale-95 text-[#0F172A] font-black text-2xl sm:text-3xl rounded-2xl sm:rounded-3xl transition-all shadow-sm border border-slate-100 flex items-center justify-center outline-none"
          >
            6
          </button>
          <button
            type="button"
            onClick={() => handleOperator("−")}
            className="h-14 sm:h-16 bg-gradient-to-b from-[#FF7A1A] to-[#FA5A00] hover:brightness-105 active:scale-95 text-white font-black text-2xl sm:text-3xl rounded-2xl sm:rounded-3xl transition-all shadow-md shadow-orange-500/20 flex items-center justify-center outline-none"
          >
            −
          </button>

          {/* Row 4: 1, 2, 3, + */}
          <button
            type="button"
            onClick={() => handleDigit("1")}
            className="h-14 sm:h-16 bg-white hover:bg-slate-50 active:scale-95 text-[#0F172A] font-black text-2xl sm:text-3xl rounded-2xl sm:rounded-3xl transition-all shadow-sm border border-slate-100 flex items-center justify-center outline-none"
          >
            1
          </button>
          <button
            type="button"
            onClick={() => handleDigit("2")}
            className="h-14 sm:h-16 bg-white hover:bg-slate-50 active:scale-95 text-[#0F172A] font-black text-2xl sm:text-3xl rounded-2xl sm:rounded-3xl transition-all shadow-sm border border-slate-100 flex items-center justify-center outline-none"
          >
            2
          </button>
          <button
            type="button"
            onClick={() => handleDigit("3")}
            className="h-14 sm:h-16 bg-white hover:bg-slate-50 active:scale-95 text-[#0F172A] font-black text-2xl sm:text-3xl rounded-2xl sm:rounded-3xl transition-all shadow-sm border border-slate-100 flex items-center justify-center outline-none"
          >
            3
          </button>
          <button
            type="button"
            onClick={() => handleOperator("+")}
            className="h-14 sm:h-16 bg-gradient-to-b from-[#FF7A1A] to-[#FA5A00] hover:brightness-105 active:scale-95 text-white font-black text-2xl sm:text-3xl rounded-2xl sm:rounded-3xl transition-all shadow-md shadow-orange-500/20 flex items-center justify-center outline-none"
          >
            +
          </button>

          {/* Row 5: 00, 0, ., = */}
          <button
            type="button"
            onClick={() => handleDigit("00")}
            className="h-14 sm:h-16 bg-white hover:bg-slate-50 active:scale-95 text-[#0F172A] font-black text-xl sm:text-2xl rounded-2xl sm:rounded-3xl transition-all shadow-sm border border-slate-100 flex items-center justify-center outline-none"
          >
            00
          </button>
          <button
            type="button"
            onClick={() => handleDigit("0")}
            className="h-14 sm:h-16 bg-white hover:bg-slate-50 active:scale-95 text-[#0F172A] font-black text-2xl sm:text-3xl rounded-2xl sm:rounded-3xl transition-all shadow-sm border border-slate-100 flex items-center justify-center outline-none"
          >
            0
          </button>
          <button
            type="button"
            onClick={handleDecimal}
            className="h-14 sm:h-16 bg-white hover:bg-slate-50 active:scale-95 text-[#0F172A] font-black text-2xl sm:text-3xl rounded-2xl sm:rounded-3xl transition-all shadow-sm border border-slate-100 flex items-center justify-center outline-none"
          >
            .
          </button>
          <button
            type="button"
            onClick={handleEquals}
            className="h-14 sm:h-16 bg-gradient-to-b from-[#FF7A1A] to-[#FA5A00] hover:brightness-105 active:scale-95 text-white font-black text-2xl sm:text-3xl rounded-2xl sm:rounded-3xl transition-all shadow-md shadow-orange-500/20 flex items-center justify-center outline-none"
          >
            =
          </button>

        </div>
      </div>
    </div>
  );
}

