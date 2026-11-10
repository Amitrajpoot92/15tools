"use client";

import { useState, useEffect, useMemo } from "react";
import { Delete, Copy, Check } from "lucide-react";

interface EvalTerm {
  val: number;
  isPct: boolean;
}

/**
 * Evaluates an arithmetic expression with full support for standard calculator
 * percentage semantics:
 * - Standalone `50%` -> 0.5
 * - Multiplicative `200 × 10%` -> 20, `200 ÷ 50%` -> 400
 * - Additive `100 + 18%` -> 118, `500 − 20%` -> 400
 */
function evaluateCalcExpression(
  rawInput: string,
  isPreview = false
): { value?: number; error?: boolean } {
  let s = rawInput
    .replace(/×/g, "*")
    .replace(/÷/g, "/")
    .replace(/−/g, "-")
    .replace(/,/g, "")
    .trim();

  if (!s || s === "Error") return {};

  if (isPreview) {
    s = s.replace(/[+\-*/.\s]+$/, "").trim();
    if (!s) return {};
  }

  // Normalize trailing dots right before operators or % (e.g. "50.%" -> "50%")
  s = s.replace(/(\d+)\.(?=[+\-*/%]|$)/g, "$1");

  const tokens: Array<EvalTerm | string> = [];
  let i = 0;

  while (i < s.length) {
    const ch = s[i];
    if (ch === " ") {
      i++;
      continue;
    }

    const prevToken = tokens[tokens.length - 1];
    const expectsUnary = tokens.length === 0 || typeof prevToken === "string";

    if (
      (ch >= "0" && ch <= "9") ||
      ch === "." ||
      (expectsUnary && (ch === "-" || ch === "+"))
    ) {
      let numStr = "";
      if (ch === "-" || ch === "+") {
        numStr += ch;
        i++;
        while (i < s.length && s[i] === " ") i++;
      }
      let hasDigits = false;
      while (i < s.length && ((s[i] >= "0" && s[i] <= "9") || s[i] === ".")) {
        if (s[i] >= "0" && s[i] <= "9") hasDigits = true;
        numStr += s[i];
        i++;
      }
      if (!hasDigits) return { error: true };

      const parsed = parseFloat(numStr);
      if (isNaN(parsed) || !isFinite(parsed)) return { error: true };

      let pctCount = 0;
      while (i < s.length && s[i] === "%") {
        pctCount++;
        i++;
      }

      // If multiple % stacked, resolve earlier ones down into value
      let val = parsed;
      while (pctCount > 1) {
        val /= 100;
        pctCount--;
      }

      tokens.push({ val, isPct: pctCount === 1 });
    } else if (ch === "+" || ch === "-" || ch === "*" || ch === "/") {
      if (tokens.length === 0 || typeof prevToken === "string") {
        return { error: true };
      }
      tokens.push(ch);
      i++;
    } else {
      return { error: true };
    }
  }

  if (tokens.length === 0 || typeof tokens[tokens.length - 1] === "string") {
    return {};
  }

  // Pass 1: resolve * and / left-to-right
  const terms: EvalTerm[] = [tokens[0] as EvalTerm];
  const addOps: string[] = [];

  for (let t = 1; t < tokens.length; t += 2) {
    const op = tokens[t] as string;
    const rightToken = tokens[t + 1] as EvalTerm;

    if (op === "*" || op === "/") {
      const leftToken = terms[terms.length - 1];
      const leftVal = leftToken.isPct ? leftToken.val / 100 : leftToken.val;
      const rightVal = rightToken.isPct ? rightToken.val / 100 : rightToken.val;

      if (op === "/" && rightVal === 0) {
        return { error: true };
      }

      const combined = op === "*" ? leftVal * rightVal : leftVal / rightVal;
      terms[terms.length - 1] = { val: combined, isPct: false };
    } else {
      addOps.push(op);
      terms.push(rightToken);
    }
  }

  // Pass 2: resolve + and - left-to-right (with A ± B% semantics)
  let acc = terms[0].isPct ? terms[0].val / 100 : terms[0].val;

  for (let k = 0; k < addOps.length; k++) {
    const op = addOps[k];
    const nextTerm = terms[k + 1];
    const delta = nextTerm.isPct ? acc * (nextTerm.val / 100) : nextTerm.val;
    acc = op === "+" ? acc + delta : acc - delta;
  }

  if (!isFinite(acc) || isNaN(acc)) return { error: true };
  const cleanVal = parseFloat(acc.toPrecision(12));
  return { value: Object.is(cleanVal, -0) ? 0 : cleanVal };
}

export function SimpleHeroCalculator() {
  const [input, setInput] = useState<string>("0");
  const [previousFormula, setPreviousFormula] = useState<string>("");
  const [justCalculated, setJustCalculated] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);

  // Live real-time preview computation
  const preview = useMemo(() => {
    if (justCalculated || input === "0" || input === "Error") return "";
    const res = evaluateCalcExpression(input, true);
    if (res.error || res.value === undefined) return "";
    return "= " + res.value.toLocaleString("en-US", { maximumFractionDigits: 8 });
  }, [input, justCalculated]);

  const handleDigit = (val: string) => {
    if (input === "Error" || justCalculated) {
      setInput(val === "00" ? "0" : val);
      setPreviousFormula("");
      setJustCalculated(false);
      return;
    }

    if (input === "0") {
      setInput(val === "00" ? "0" : val);
      return;
    }

    const trimmedEnd = input.trimEnd();
    if (trimmedEnd.endsWith("%")) {
      setInput(trimmedEnd + " × " + (val === "00" ? "0" : val));
      return;
    }

    // Prevent leading zero clutter right after an operator (e.g. "5 + 00")
    const parts = input.split(/[+\-−×÷]/);
    const lastSeg = parts[parts.length - 1].trim();
    if (lastSeg === "") {
      setInput((prev) => prev + (val === "00" ? "0" : val));
    } else if (lastSeg === "0") {
      if (val === "0" || val === "00") return;
      setInput((prev) => prev.slice(0, -1) + val);
    } else {
      setInput((prev) => prev + val);
    }
  };

  const handleDecimal = () => {
    if (input === "Error" || justCalculated) {
      setInput("0.");
      setPreviousFormula("");
      setJustCalculated(false);
      return;
    }

    const trimmedEnd = input.trimEnd();
    if (trimmedEnd.endsWith("%")) {
      setInput(trimmedEnd + " × 0.");
      return;
    }

    const parts = input.split(/[+\-−×÷]/);
    const lastPart = parts[parts.length - 1].trim();

    if (lastPart === "") {
      setInput((prev) => prev + "0.");
    } else if (!lastPart.includes(".")) {
      setInput((prev) => prev + ".");
    }
  };

  const handleOperator = (op: string) => {
    if (input === "Error") {
      setInput("0 " + op + " ");
      setPreviousFormula("");
      setJustCalculated(false);
      return;
    }
    setJustCalculated(false);
    setPreviousFormula("");
    const trimmed = input.trim();
    const lastChar = trimmed.slice(-1);
    if (["+", "−", "-", "×", "÷"].includes(lastChar)) {
      setInput(trimmed.slice(0, -1).trimEnd() + " " + op + " ");
    } else {
      const clean = trimmed.endsWith(".") ? trimmed.slice(0, -1) : trimmed;
      setInput(clean + " " + op + " ");
    }
  };

  const handlePercent = () => {
    if (input === "Error") return;
    const trimmed = input.trim();
    if (trimmed === "0" || /[+\-−×÷%]$/.test(trimmed)) return;

    setJustCalculated(false);
    setPreviousFormula("");
    const clean = trimmed.endsWith(".") ? trimmed.slice(0, -1) : trimmed;
    setInput(clean + "%");
  };

  const handleBackspace = () => {
    if (input === "Error" || justCalculated) {
      setInput("0");
      setPreviousFormula("");
      setJustCalculated(false);
      return;
    }
    if (input.length <= 1) {
      setInput("0");
    } else if (input.endsWith(" ")) {
      // Remove space + operator + space cleanly
      const updated = input.trimEnd().slice(0, -1).trimEnd();
      setInput(updated || "0");
    } else {
      setInput((prev) => prev.slice(0, -1) || "0");
    }
  };

  const handleClear = () => {
    setInput("0");
    setPreviousFormula("");
    setJustCalculated(false);
  };

  const handleEquals = () => {
    if (input === "Error") return;
    const cleanExpr = input.trim().replace(/[+\-−×÷.]+$/, "").trim();
    if (!cleanExpr) return;

    const res = evaluateCalcExpression(cleanExpr, false);
    if (res.error) {
      setPreviousFormula(cleanExpr + " =");
      setInput("Error");
      setJustCalculated(true);
      return;
    }

    if (res.value !== undefined) {
      setPreviousFormula(cleanExpr + " =");
      setInput(res.value.toString());
      setJustCalculated(true);
    }
  };

  const copyToClipboard = () => {
    let textToCopy = input;
    if (justCalculated && previousFormula) {
      textToCopy = `${previousFormula} ${input}`;
    } else {
      const cleanExpr = input.trim().replace(/[+\-−×÷.\s]+$/, "").trim();
      const hasOperation = /[+\-−×÷%]/.test(cleanExpr);
      if (preview && hasOperation) {
        textToCopy = `${cleanExpr} ${preview}`;
      }
    }

    navigator.clipboard.writeText(textToCopy);
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
  });

  return (
    <div className="w-full max-w-[390px] mx-auto select-none">
      {/* Outer Card */}
      <div className="bg-white/90 backdrop-blur-xl rounded-[2.2rem] p-4 sm:p-5 shadow-2xl shadow-indigo-950/10 border border-slate-200/90">
        
        {/* Soft Lavender Display Screen */}
        <div 
          onClick={copyToClipboard}
          className="relative bg-gradient-to-b from-[#E9EDFB] to-[#DFE5F9] rounded-[1.75rem] p-5 sm:p-6 mb-4 sm:mb-5 border border-[#D5DCF4] shadow-inner cursor-pointer group min-h-[140px] sm:min-h-[155px] flex flex-col justify-between"
          title="Click to copy calculation"
        >
          {/* Top Row: Copy Button & Running Sub-result / Previous Equation */}
          <div className="flex items-center justify-between gap-2 min-h-[32px]">
            <div className="shrink-0">
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
                title="Copy full calculation"
                aria-label="Copy full calculation"
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

            <div className="font-mono font-black text-slate-800 tracking-tight text-right text-xl sm:text-2xl min-h-[32px] flex items-center justify-end truncate">
              {justCalculated ? previousFormula : preview}
            </div>
          </div>

          {/* Bottom Row: Main Expression & Active Cursor */}
          <div className="flex items-center justify-end space-x-2 overflow-hidden mt-2">
            <div
              className={`font-mono font-black tracking-tight text-right break-all transition-all ${
                input === "Error" ? "text-rose-600" : "text-slate-900"
              } ${
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

        {/* 4x5 Keypad Grid */}
        <div className="grid grid-cols-4 gap-2.5 sm:gap-3">
          
          {/* Row 1: AC (pink), Backspace (lavender), % (lavender), ÷ (orange) */}
          <button
            type="button"
            onClick={handleClear}
            className="h-14 sm:h-16 bg-[#FFE8EC] hover:bg-[#FFDDE3] active:scale-95 text-[#E11D48] font-black text-xl sm:text-2xl rounded-2xl sm:rounded-3xl transition-all shadow-sm flex items-center justify-center outline-none cursor-pointer"
          >
            AC
          </button>
          <button
            type="button"
            onClick={handleBackspace}
            aria-label="Backspace"
            className="h-14 sm:h-16 bg-[#EBF0FC] hover:bg-[#DEE7FA] active:scale-95 text-[#1E293B] font-bold rounded-2xl sm:rounded-3xl transition-all shadow-sm flex items-center justify-center outline-none cursor-pointer"
          >
            <Delete className="w-5 h-5 sm:w-6 sm:h-6 text-[#1E293B]" strokeWidth={2.2} />
          </button>
          <button
            type="button"
            onClick={handlePercent}
            aria-label="Percent"
            className="h-14 sm:h-16 bg-[#EBF0FC] hover:bg-[#DEE7FA] active:scale-95 text-[#1E293B] font-black text-xl sm:text-2xl rounded-2xl sm:rounded-3xl transition-all shadow-sm flex items-center justify-center outline-none cursor-pointer"
          >
            %
          </button>
          <button
            type="button"
            onClick={() => handleOperator("÷")}
            aria-label="Divide"
            className="h-14 sm:h-16 bg-gradient-to-b from-[#FF7A1A] to-[#FA5A00] hover:brightness-105 active:scale-95 text-white font-black text-2xl sm:text-3xl rounded-2xl sm:rounded-3xl transition-all shadow-md shadow-orange-500/20 flex items-center justify-center outline-none cursor-pointer"
          >
            ÷
          </button>

          {/* Row 2: 7, 8, 9, × */}
          <button
            type="button"
            onClick={() => handleDigit("7")}
            className="h-14 sm:h-16 bg-white hover:bg-slate-50 active:scale-95 text-[#0F172A] font-black text-2xl sm:text-3xl rounded-2xl sm:rounded-3xl transition-all shadow-sm border border-slate-100 flex items-center justify-center outline-none cursor-pointer"
          >
            7
          </button>
          <button
            type="button"
            onClick={() => handleDigit("8")}
            className="h-14 sm:h-16 bg-white hover:bg-slate-50 active:scale-95 text-[#0F172A] font-black text-2xl sm:text-3xl rounded-2xl sm:rounded-3xl transition-all shadow-sm border border-slate-100 flex items-center justify-center outline-none cursor-pointer"
          >
            8
          </button>
          <button
            type="button"
            onClick={() => handleDigit("9")}
            className="h-14 sm:h-16 bg-white hover:bg-slate-50 active:scale-95 text-[#0F172A] font-black text-2xl sm:text-3xl rounded-2xl sm:rounded-3xl transition-all shadow-sm border border-slate-100 flex items-center justify-center outline-none cursor-pointer"
          >
            9
          </button>
          <button
            type="button"
            onClick={() => handleOperator("×")}
            aria-label="Multiply"
            className="h-14 sm:h-16 bg-gradient-to-b from-[#FF7A1A] to-[#FA5A00] hover:brightness-105 active:scale-95 text-white font-black text-2xl sm:text-3xl rounded-2xl sm:rounded-3xl transition-all shadow-md shadow-orange-500/20 flex items-center justify-center outline-none cursor-pointer"
          >
            ×
          </button>

          {/* Row 3: 4, 5, 6, − */}
          <button
            type="button"
            onClick={() => handleDigit("4")}
            className="h-14 sm:h-16 bg-white hover:bg-slate-50 active:scale-95 text-[#0F172A] font-black text-2xl sm:text-3xl rounded-2xl sm:rounded-3xl transition-all shadow-sm border border-slate-100 flex items-center justify-center outline-none cursor-pointer"
          >
            4
          </button>
          <button
            type="button"
            onClick={() => handleDigit("5")}
            className="h-14 sm:h-16 bg-white hover:bg-slate-50 active:scale-95 text-[#0F172A] font-black text-2xl sm:text-3xl rounded-2xl sm:rounded-3xl transition-all shadow-sm border border-slate-100 flex items-center justify-center outline-none cursor-pointer"
          >
            5
          </button>
          <button
            type="button"
            onClick={() => handleDigit("6")}
            className="h-14 sm:h-16 bg-white hover:bg-slate-50 active:scale-95 text-[#0F172A] font-black text-2xl sm:text-3xl rounded-2xl sm:rounded-3xl transition-all shadow-sm border border-slate-100 flex items-center justify-center outline-none cursor-pointer"
          >
            6
          </button>
          <button
            type="button"
            onClick={() => handleOperator("−")}
            aria-label="Subtract"
            className="h-14 sm:h-16 bg-gradient-to-b from-[#FF7A1A] to-[#FA5A00] hover:brightness-105 active:scale-95 text-white font-black text-2xl sm:text-3xl rounded-2xl sm:rounded-3xl transition-all shadow-md shadow-orange-500/20 flex items-center justify-center outline-none cursor-pointer"
          >
            −
          </button>

          {/* Row 4: 1, 2, 3, + */}
          <button
            type="button"
            onClick={() => handleDigit("1")}
            className="h-14 sm:h-16 bg-white hover:bg-slate-50 active:scale-95 text-[#0F172A] font-black text-2xl sm:text-3xl rounded-2xl sm:rounded-3xl transition-all shadow-sm border border-slate-100 flex items-center justify-center outline-none cursor-pointer"
          >
            1
          </button>
          <button
            type="button"
            onClick={() => handleDigit("2")}
            className="h-14 sm:h-16 bg-white hover:bg-slate-50 active:scale-95 text-[#0F172A] font-black text-2xl sm:text-3xl rounded-2xl sm:rounded-3xl transition-all shadow-sm border border-slate-100 flex items-center justify-center outline-none cursor-pointer"
          >
            2
          </button>
          <button
            type="button"
            onClick={() => handleDigit("3")}
            className="h-14 sm:h-16 bg-white hover:bg-slate-50 active:scale-95 text-[#0F172A] font-black text-2xl sm:text-3xl rounded-2xl sm:rounded-3xl transition-all shadow-sm border border-slate-100 flex items-center justify-center outline-none cursor-pointer"
          >
            3
          </button>
          <button
            type="button"
            onClick={() => handleOperator("+")}
            aria-label="Add"
            className="h-14 sm:h-16 bg-gradient-to-b from-[#FF7A1A] to-[#FA5A00] hover:brightness-105 active:scale-95 text-white font-black text-2xl sm:text-3xl rounded-2xl sm:rounded-3xl transition-all shadow-md shadow-orange-500/20 flex items-center justify-center outline-none cursor-pointer"
          >
            +
          </button>

          {/* Row 5: 00, 0, ., = (BLUE) */}
          <button
            type="button"
            onClick={() => handleDigit("00")}
            className="h-14 sm:h-16 bg-white hover:bg-slate-50 active:scale-95 text-[#0F172A] font-black text-xl sm:text-2xl rounded-2xl sm:rounded-3xl transition-all shadow-sm border border-slate-100 flex items-center justify-center outline-none cursor-pointer"
          >
            00
          </button>
          <button
            type="button"
            onClick={() => handleDigit("0")}
            className="h-14 sm:h-16 bg-white hover:bg-slate-50 active:scale-95 text-[#0F172A] font-black text-2xl sm:text-3xl rounded-2xl sm:rounded-3xl transition-all shadow-sm border border-slate-100 flex items-center justify-center outline-none cursor-pointer"
          >
            0
          </button>
          <button
            type="button"
            onClick={handleDecimal}
            className="h-14 sm:h-16 bg-white hover:bg-slate-50 active:scale-95 text-[#0F172A] font-black text-2xl sm:text-3xl rounded-2xl sm:rounded-3xl transition-all shadow-sm border border-slate-100 flex items-center justify-center outline-none cursor-pointer"
          >
            .
          </button>
          <button
            type="button"
            onClick={handleEquals}
            aria-label="Equals"
            className="h-14 sm:h-16 bg-gradient-to-b from-[#3B82F6] to-[#2563EB] hover:brightness-105 active:scale-95 text-white font-black text-2xl sm:text-3xl rounded-2xl sm:rounded-3xl transition-all shadow-md shadow-blue-500/25 flex items-center justify-center outline-none cursor-pointer"
          >
            =
          </button>

        </div>
      </div>
    </div>
  );
}
