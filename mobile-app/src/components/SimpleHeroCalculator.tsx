import React, { useState, useMemo } from "react";
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  Dimensions,
} from "react-native";
import * as Haptics from "expo-haptics";
import * as Clipboard from "expo-clipboard";
import { Delete, Copy, Check } from "lucide-react-native";

const { width } = Dimensions.get("window");
// 4 columns padding calculation
const PADDING = 14;
const GAP = 10;
const BTN_WIDTH = Math.floor((width - 32 - PADDING * 2 - GAP * 3) / 4);

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

  const triggerHaptic = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  };

  // Live real-time preview computation
  const preview = useMemo(() => {
    if (justCalculated || input === "0" || input === "Error") return "";
    const res = evaluateCalcExpression(input, true);
    if (res.error || res.value === undefined) return "";
    return "= " + res.value.toLocaleString("en-US", { maximumFractionDigits: 8 });
  }, [input, justCalculated]);

  const handleDigit = (val: string) => {
    triggerHaptic();
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
    triggerHaptic();
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
    triggerHaptic();
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
    triggerHaptic();
    if (input === "Error") return;
    const trimmed = input.trim();
    if (trimmed === "0" || /[+\-−×÷%]$/.test(trimmed)) return;

    setJustCalculated(false);
    setPreviousFormula("");
    const clean = trimmed.endsWith(".") ? trimmed.slice(0, -1) : trimmed;
    setInput(clean + "%");
  };

  const handleBackspace = () => {
    triggerHaptic();
    if (input === "Error" || justCalculated) {
      setInput("0");
      setPreviousFormula("");
      setJustCalculated(false);
      return;
    }
    if (input.length <= 1) {
      setInput("0");
    } else if (input.endsWith(" ")) {
      const updated = input.trimEnd().slice(0, -1).trimEnd();
      setInput(updated || "0");
    } else {
      setInput((prev) => prev.slice(0, -1) || "0");
    }
  };

  const handleClear = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    setInput("0");
    setPreviousFormula("");
    setJustCalculated(false);
  };

  const handleEquals = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
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

  const copyResult = async () => {
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

    await Clipboard.setStringAsync(textToCopy);
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <View style={styles.cardContainer}>
      {/* Soft Lavender Display Screen */}
      <Pressable onPress={copyResult} style={styles.displayBox}>
        {/* Top Status & Preview Row */}
        <View style={styles.displayTopRow}>
          <Pressable
            onPress={copyResult}
            style={[styles.copyBtn, copied && styles.copyBtnCopied]}
          >
            {copied ? (
              <>
                <Check size={13} color="#FFFFFF" strokeWidth={3} />
                <Text style={[styles.copyBtnText, styles.copyBtnTextCopied]}>
                  Copied!
                </Text>
              </>
            ) : (
              <>
                <Copy size={13} color="#0F172A" strokeWidth={2.5} />
                <Text style={styles.copyBtnText}>Copy</Text>
              </>
            )}
          </Pressable>
          <Text style={styles.previewText} numberOfLines={1}>
            {justCalculated ? previousFormula : preview}
          </Text>
        </View>

        {/* Bottom Main Expression Row */}
        <View style={styles.displayBottomRow}>
          <Text
            style={[
              styles.mainText,
              input === "Error" && styles.errorText,
              input.length > 12
                ? styles.textSmall
                : input.length > 7
                ? styles.textMedium
                : styles.textLarge,
            ]}
            numberOfLines={1}
            adjustsFontSizeToFit
          >
            {input}
          </Text>
          <View style={styles.cursorBar} />
        </View>
      </Pressable>

      {/* 4x5 Keypad Grid */}
      <View style={styles.keypadGrid}>
        
        {/* Row 1: AC, Back, %, ÷ */}
        <Pressable
          onPress={handleClear}
          style={({ pressed }) => [styles.acBtn, pressed && styles.btnPressed]}
        >
          <Text style={styles.acBtnText}>AC</Text>
        </Pressable>
        <Pressable
          onPress={handleBackspace}
          style={({ pressed }) => [styles.lavenderBtn, pressed && styles.btnPressed]}
        >
          <Delete size={22} color="#0F172A" strokeWidth={2.2} />
        </Pressable>
        <Pressable
          onPress={handlePercent}
          style={({ pressed }) => [styles.lavenderBtn, pressed && styles.btnPressed]}
        >
          <Text style={styles.lavenderBtnText}>%</Text>
        </Pressable>
        <Pressable
          onPress={() => handleOperator("÷")}
          style={({ pressed }) => [styles.orangeBtn, pressed && styles.btnPressed]}
        >
          <Text style={styles.orangeBtnText}>÷</Text>
        </Pressable>

        {/* Row 2: 7, 8, 9, × */}
        <Pressable
          onPress={() => handleDigit("7")}
          style={({ pressed }) => [styles.numBtn, pressed && styles.btnPressed]}
        >
          <Text style={styles.numBtnText}>7</Text>
        </Pressable>
        <Pressable
          onPress={() => handleDigit("8")}
          style={({ pressed }) => [styles.numBtn, pressed && styles.btnPressed]}
        >
          <Text style={styles.numBtnText}>8</Text>
        </Pressable>
        <Pressable
          onPress={() => handleDigit("9")}
          style={({ pressed }) => [styles.numBtn, pressed && styles.btnPressed]}
        >
          <Text style={styles.numBtnText}>9</Text>
        </Pressable>
        <Pressable
          onPress={() => handleOperator("×")}
          style={({ pressed }) => [styles.orangeBtn, pressed && styles.btnPressed]}
        >
          <Text style={styles.orangeBtnText}>×</Text>
        </Pressable>

        {/* Row 3: 4, 5, 6, − */}
        <Pressable
          onPress={() => handleDigit("4")}
          style={({ pressed }) => [styles.numBtn, pressed && styles.btnPressed]}
        >
          <Text style={styles.numBtnText}>4</Text>
        </Pressable>
        <Pressable
          onPress={() => handleDigit("5")}
          style={({ pressed }) => [styles.numBtn, pressed && styles.btnPressed]}
        >
          <Text style={styles.numBtnText}>5</Text>
        </Pressable>
        <Pressable
          onPress={() => handleDigit("6")}
          style={({ pressed }) => [styles.numBtn, pressed && styles.btnPressed]}
        >
          <Text style={styles.numBtnText}>6</Text>
        </Pressable>
        <Pressable
          onPress={() => handleOperator("−")}
          style={({ pressed }) => [styles.orangeBtn, pressed && styles.btnPressed]}
        >
          <Text style={styles.orangeBtnText}>−</Text>
        </Pressable>

        {/* Row 4: 1, 2, 3, + */}
        <Pressable
          onPress={() => handleDigit("1")}
          style={({ pressed }) => [styles.numBtn, pressed && styles.btnPressed]}
        >
          <Text style={styles.numBtnText}>1</Text>
        </Pressable>
        <Pressable
          onPress={() => handleDigit("2")}
          style={({ pressed }) => [styles.numBtn, pressed && styles.btnPressed]}
        >
          <Text style={styles.numBtnText}>2</Text>
        </Pressable>
        <Pressable
          onPress={() => handleDigit("3")}
          style={({ pressed }) => [styles.numBtn, pressed && styles.btnPressed]}
        >
          <Text style={styles.numBtnText}>3</Text>
        </Pressable>
        <Pressable
          onPress={() => handleOperator("+")}
          style={({ pressed }) => [styles.orangeBtn, pressed && styles.btnPressed]}
        >
          <Text style={styles.orangeBtnText}>+</Text>
        </Pressable>

        {/* Row 5: 00, 0, ., = (BLUE) */}
        <Pressable
          onPress={() => handleDigit("00")}
          style={({ pressed }) => [styles.numBtn, pressed && styles.btnPressed]}
        >
          <Text style={styles.numTextDoubleZero}>00</Text>
        </Pressable>
        <Pressable
          onPress={() => handleDigit("0")}
          style={({ pressed }) => [styles.numBtn, pressed && styles.btnPressed]}
        >
          <Text style={styles.numBtnText}>0</Text>
        </Pressable>
        <Pressable
          onPress={handleDecimal}
          style={({ pressed }) => [styles.numBtn, pressed && styles.btnPressed]}
        >
          <Text style={styles.numBtnText}>.</Text>
        </Pressable>
        <Pressable
          onPress={handleEquals}
          style={({ pressed }) => [styles.equalsBtn, pressed && styles.btnPressed]}
        >
          <Text style={styles.orangeBtnText}>=</Text>
        </Pressable>

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: "#FFFFFF",
    borderRadius: 28,
    padding: PADDING,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 12,
    elevation: 3,
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },
  displayBox: {
    backgroundColor: "#EBF0FC",
    borderRadius: 24,
    padding: 18,
    minHeight: 135,
    justifyContent: "space-between",
    marginBottom: 14,
    borderWidth: 1,
    borderColor: "#D9E2F7",
  },
  displayTopRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 8,
  },
  copyBtn: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 9,
    paddingVertical: 5,
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: "#CBD5E1",
    gap: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 2,
    elevation: 2,
  },
  copyBtnCopied: {
    backgroundColor: "#059669",
    borderColor: "#047857",
  },
  copyBtnText: {
    fontSize: 11,
    fontWeight: "900",
    color: "#0F172A",
    textTransform: "uppercase",
    letterSpacing: 0.2,
  },
  copyBtnTextCopied: {
    color: "#FFFFFF",
  },
  previewText: {
    fontSize: 22,
    fontWeight: "900",
    color: "#0F172A",
    fontFamily: "monospace",
    letterSpacing: -0.3,
    flexShrink: 1,
    textAlign: "right",
  },
  displayBottomRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    gap: 4,
  },
  mainText: {
    color: "#0F172A",
    fontWeight: "900",
    fontFamily: "monospace",
    textAlign: "right",
  },
  errorText: {
    color: "#E11D48",
  },
  textLarge: {
    fontSize: 42,
  },
  textMedium: {
    fontSize: 32,
  },
  textSmall: {
    fontSize: 24,
  },
  cursorBar: {
    width: 3,
    height: 34,
    backgroundColor: "#818CF8",
    borderRadius: 2,
  },
  keypadGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: GAP,
    justifyContent: "space-between",
  },
  acBtn: {
    width: BTN_WIDTH,
    height: 56,
    backgroundColor: "#FFE8EC",
    borderRadius: 22,
    alignItems: "center",
    justifyContent: "center",
  },
  acBtnText: {
    color: "#E11D48",
    fontSize: 20,
    fontWeight: "900",
  },
  lavenderBtn: {
    width: BTN_WIDTH,
    height: 56,
    backgroundColor: "#EBF0FC",
    borderRadius: 22,
    alignItems: "center",
    justifyContent: "center",
  },
  lavenderBtnText: {
    color: "#0F172A",
    fontSize: 22,
    fontWeight: "800",
  },
  orangeBtn: {
    width: BTN_WIDTH,
    height: 56,
    backgroundColor: "#FF6B00",
    borderRadius: 22,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#FF6B00",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 3,
  },
  equalsBtn: {
    width: BTN_WIDTH,
    height: 56,
    backgroundColor: "#2563EB",
    borderRadius: 22,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#2563EB",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.28,
    shadowRadius: 5,
    elevation: 3,
  },
  orangeBtnText: {
    color: "#FFFFFF",
    fontSize: 26,
    fontWeight: "900",
  },
  numBtn: {
    width: BTN_WIDTH,
    height: 56,
    backgroundColor: "#FFFFFF",
    borderRadius: 22,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 2,
    elevation: 1,
    borderWidth: 1,
    borderColor: "#F1F5F9",
  },
  numBtnText: {
    color: "#0F172A",
    fontSize: 24,
    fontWeight: "800",
  },
  numTextDoubleZero: {
    color: "#0F172A",
    fontSize: 20,
    fontWeight: "800",
  },
  btnPressed: {
    opacity: 0.7,
    transform: [{ scale: 0.96 }],
  },
});
