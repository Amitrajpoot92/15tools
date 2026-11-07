import React, { useState, useCallback } from "react";
import {
  View,
  Text,
  ScrollView,
  Pressable,
  StyleSheet,
  Dimensions,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import * as Haptics from "expo-haptics";
import * as Clipboard from "expo-clipboard";
import { CalculatorHeader } from "@/components/CalculatorHeader";
import { Copy, Check, History, Trash2 } from "lucide-react-native";

interface HistoryItem {
  id: string;
  expression: string;
  result: string;
}

const { width } = Dimensions.get("window");
// Calculator button sizing for 5 columns
const BUTTON_GAP = 6;
const CALC_PADDING = 12;
const BTN_WIDTH = Math.floor((width - CALC_PADDING * 2 - BUTTON_GAP * 4 - 16) / 5);

export default function NormalCalculatorScreen() {
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

  const triggerHaptic = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  };

  // Math evaluator
  const calculateResult = useCallback(
    (expr: string): { success: boolean; result?: number; error?: string } => {
      try {
        let s = expr
          .replace(/×/g, "*")
          .replace(/÷/g, "/")
          .replace(/−/g, "-")
          .replace(/,/g, "");

        if (!s.trim()) return { success: false, error: "Empty" };

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

        s = s.replace(/π/g, "(" + Math.PI + ")");
        s = s.replace(/\be\b/g, "(" + Math.E + ")");
        s = s.replace(/\^/g, "**");
        s = s.replace(/(\d+(?:\.\d+)?)%/g, "($1/100)");
        s = s.replace(/(\d+)!/g, "fns.fact($1)");

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

        s = s.replace(/(\d)\(/g, "$1*(");
        s = s.replace(/\)(\d)/g, ")*$1");
        s = s.replace(/\)\(/g, ")*(");

        const safeChars = /^[0-9+\-*/(). ,a-zA-Z*^!%]+$/;
        if (!safeChars.test(s)) {
          return { success: false, error: "Invalid Chars" };
        }

        const fnEvaluator = new Function(
          "fns",
          "Math",
          "\"use strict\"; return (" + s + ");"
        );
        const res = fnEvaluator(fns, Math);

        if (typeof res !== "number" || isNaN(res) || !isFinite(res)) {
          return { success: false, error: "Math Error" };
        }

        const cleanVal = parseFloat(res.toPrecision(12));
        return { success: true, result: cleanVal };
      } catch (err: any) {
        return { success: false, error: err.message || "Error" };
      }
    },
    [isDegree]
  );

  const handleNumber = (digit: string) => {
    triggerHaptic();
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
    triggerHaptic();
    if (justCalculated) {
      setDisplay("0.");
      setExpression("");
      setJustCalculated(false);
      return;
    }
    const parts = display.split(/[+\-×/]/);
    const lastPart = parts[parts.length - 1];
    if (!lastPart.includes(".")) {
      setDisplay((prev) => prev + ".");
    }
  };

  const handleOperator = (op: string) => {
    triggerHaptic();
    setJustCalculated(false);
    if (display === "Error") return;

    const lastChar = display.trim().slice(-1);
    if (["+", "-", "×", "/"].includes(lastChar)) {
      setDisplay((prev) => prev.trim().slice(0, -1) + " " + op + " ");
    } else {
      setDisplay((prev) => prev + " " + op + " ");
    }
  };

  const handleFunction = (fnName: string) => {
    triggerHaptic();
    setJustCalculated(false);
    if (display === "0" || display === "Error") {
      setDisplay(fnName + "(");
    } else {
      setDisplay((prev) => prev + fnName + "(");
    }
  };

  const handleBackspace = () => {
    triggerHaptic();
    if (justCalculated) {
      setDisplay("0");
      setExpression("");
      setJustCalculated(false);
      return;
    }
    if (display.length <= 1 || display === "Error") {
      setDisplay("0");
    } else {
      if (display.endsWith(" ")) {
        setDisplay((prev) => prev.trim().slice(0, -1).trim());
      } else {
        setDisplay((prev) => prev.slice(0, -1));
      }
    }
  };

  const handleClear = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    setDisplay("0");
    setExpression("");
    setJustCalculated(false);
  };

  const handleEquals = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    if (display === "Error") return;

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

      setHistory((prev) => [
        {
          id: Math.random().toString(36).substring(2, 9),
          expression: exprToEval,
          result: formatted,
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
    triggerHaptic();
    if (display === "0" || display === "Error") return;
    try {
      const val = parseFloat(display);
      if (!isNaN(val) && !display.includes(" ") && !display.includes("(")) {
        setDisplay((-val).toString());
      } else {
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
    triggerHaptic();
    const r = parseFloat(Math.random().toFixed(4)).toString();
    if (justCalculated || display === "0") {
      setDisplay(r);
      setJustCalculated(false);
    } else {
      setDisplay((prev) => prev + r);
    }
  };

  const handleExp = () => {
    triggerHaptic();
    if (justCalculated || display === "0") {
      setDisplay("1e+");
      setJustCalculated(false);
    } else {
      setDisplay((prev) => prev + "e+");
    }
  };

  const handleAns = () => {
    triggerHaptic();
    const ansStr = lastAns.toString();
    if (justCalculated || display === "0") {
      setDisplay(ansStr);
      setJustCalculated(false);
    } else {
      setDisplay((prev) => prev + ansStr);
    }
  };

  const handleMemoryAdd = () => {
    triggerHaptic();
    const res = calculateResult(display);
    if (res.success && res.result !== undefined) {
      setMemory((prev) => prev + (res.result || 0));
      setHasMemory(true);
      setJustCalculated(true);
    }
  };

  const handleMemorySubtract = () => {
    triggerHaptic();
    const res = calculateResult(display);
    if (res.success && res.result !== undefined) {
      setMemory((prev) => prev - (res.result || 0));
      setHasMemory(true);
      setJustCalculated(true);
    }
  };

  const handleMemoryRecall = () => {
    triggerHaptic();
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
    triggerHaptic();
    setMemory(0);
    setHasMemory(false);
  };

  const copyResult = async () => {
    await Clipboard.setStringAsync(display);
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <SafeAreaView style={styles.container} edges={["top", "bottom"]}>
      <StatusBar style="dark" />
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <CalculatorHeader
          title="Normal Calculator"
          subtitle="Basic and scientific calculator for quick calculations."
          themeBg="#E0F2FE"
        />

        {/* Calculator Frame */}
        <View style={styles.calcFrame}>
          
          {/* Top Mode Tabs (Calculator.net style) */}
          <View style={styles.tabRow}>
            <View style={styles.tabGroup}>
              <Pressable
                onPress={() => {
                  triggerHaptic();
                  setMode("basic");
                }}
                style={[
                  styles.tabBtn,
                  mode === "basic" ? styles.tabActive : styles.tabInactive,
                ]}
              >
                <Text
                  style={[
                    styles.tabText,
                    mode === "basic"
                      ? styles.tabTextActive
                      : styles.tabTextInactive,
                  ]}
                >
                  Basic
                </Text>
              </Pressable>
              <Pressable
                onPress={() => {
                  triggerHaptic();
                  setMode("scientific");
                }}
                style={[
                  styles.tabBtn,
                  mode === "scientific" ? styles.tabActive : styles.tabInactive,
                ]}
              >
                <Text
                  style={[
                    styles.tabText,
                    mode === "scientific"
                      ? styles.tabTextActive
                      : styles.tabTextInactive,
                  ]}
                >
                  Scientific
                </Text>
              </Pressable>
            </View>

            <View style={styles.utilityGroup}>
              {mode === "scientific" && (
                <Pressable
                  onPress={() => {
                    triggerHaptic();
                    setIsDegree(!isDegree);
                  }}
                  style={styles.degBtn}
                >
                  <Text style={styles.degBtnText}>
                    {isDegree ? "DEG" : "RAD"}
                  </Text>
                </Pressable>
              )}
              <Pressable
                onPress={() => {
                  triggerHaptic();
                  setShowHistory(!showHistory);
                }}
                style={[
                  styles.historyToggleBtn,
                  showHistory && styles.historyToggleBtnActive,
                ]}
              >
                <History
                  size={14}
                  color={showHistory ? "#ffffff" : "#135185"}
                />
              </Pressable>
            </View>
          </View>

          {/* LCD Blue Display */}
          <View style={styles.displayContainer}>
            <View style={styles.displayTopRow}>
              <View style={styles.statusChips}>
                {hasMemory && (
                  <View style={styles.memChip}>
                    <Text style={styles.memChipText}>M={memory}</Text>
                  </View>
                )}
                {mode === "scientific" && (
                  <Text style={styles.modeChipText}>
                    [{isDegree ? "DEG" : "RAD"}]
                  </Text>
                )}
              </View>
              <Text style={styles.exprText} numberOfLines={1}>
                {expression}
              </Text>
            </View>

            <View style={styles.displayMainRow}>
              <Pressable
                onPress={copyResult}
                style={[styles.copyBtn, copied && styles.copyBtnCopied]}
              >
                {copied ? (
                  <>
                    <Check size={14} color="#FFFFFF" strokeWidth={3} />
                    <Text style={styles.copyBtnText}>Copied!</Text>
                  </>
                ) : (
                  <>
                    <Copy size={14} color="#FFFFFF" strokeWidth={2.5} />
                    <Text style={styles.copyBtnText}>Copy</Text>
                  </>
                )}
              </Pressable>
              <Text
                style={[
                  styles.displayText,
                  display.length > 14
                    ? styles.textSmall
                    : display.length > 9
                    ? styles.textMedium
                    : styles.textLarge,
                ]}
                numberOfLines={1}
                adjustsFontSizeToFit
              >
                {display}
              </Text>
            </View>
          </View>

          {/* Scientific Mode Extra Buttons */}
          {mode === "scientific" && (
            <View style={styles.sciGrid}>
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
                <Pressable
                  key={idx}
                  onPress={btn.action}
                  style={({ pressed }) => [
                    styles.sciBtn,
                    btn.highlight && styles.sciBtnHighlight,
                    pressed && styles.btnPressed,
                  ]}
                >
                  <Text
                    style={[
                      styles.sciBtnText,
                      btn.highlight && styles.sciBtnTextHighlight,
                    ]}
                  >
                    {btn.label}
                  </Text>
                </Pressable>
              ))}
            </View>
          )}

          {/* 5x5 Keypad Grid (Matches user screenshot) */}
          <View style={styles.keypadGrid}>
            {/* Row 1: 7, 8, 9, +, Back */}
            <Pressable onPress={() => handleNumber("7")} style={({ pressed }) => [styles.numBtn, pressed && styles.btnPressed]}>
              <Text style={styles.numBtnText}>7</Text>
            </Pressable>
            <Pressable onPress={() => handleNumber("8")} style={({ pressed }) => [styles.numBtn, pressed && styles.btnPressed]}>
              <Text style={styles.numBtnText}>8</Text>
            </Pressable>
            <Pressable onPress={() => handleNumber("9")} style={({ pressed }) => [styles.numBtn, pressed && styles.btnPressed]}>
              <Text style={styles.numBtnText}>9</Text>
            </Pressable>
            <Pressable onPress={() => handleOperator("+")} style={({ pressed }) => [styles.opBtn, pressed && styles.btnPressed]}>
              <Text style={styles.opBtnText}>+</Text>
            </Pressable>
            <Pressable onPress={handleBackspace} style={({ pressed }) => [styles.backBtn, pressed && styles.btnPressed]}>
              <Text style={styles.backBtnText}>Back</Text>
            </Pressable>

            {/* Row 2: 4, 5, 6, -, Ans */}
            <Pressable onPress={() => handleNumber("4")} style={({ pressed }) => [styles.numBtn, pressed && styles.btnPressed]}>
              <Text style={styles.numBtnText}>4</Text>
            </Pressable>
            <Pressable onPress={() => handleNumber("5")} style={({ pressed }) => [styles.numBtn, pressed && styles.btnPressed]}>
              <Text style={styles.numBtnText}>5</Text>
            </Pressable>
            <Pressable onPress={() => handleNumber("6")} style={({ pressed }) => [styles.numBtn, pressed && styles.btnPressed]}>
              <Text style={styles.numBtnText}>6</Text>
            </Pressable>
            <Pressable onPress={() => handleOperator("-")} style={({ pressed }) => [styles.opBtn, pressed && styles.btnPressed]}>
              <Text style={styles.opBtnText}>−</Text>
            </Pressable>
            <Pressable onPress={handleAns} style={({ pressed }) => [styles.opBtn, pressed && styles.btnPressed]}>
              <Text style={styles.opTextSmall}>Ans</Text>
            </Pressable>

            {/* Row 3: 1, 2, 3, ×, M+ */}
            <Pressable onPress={() => handleNumber("1")} style={({ pressed }) => [styles.numBtn, pressed && styles.btnPressed]}>
              <Text style={styles.numBtnText}>1</Text>
            </Pressable>
            <Pressable onPress={() => handleNumber("2")} style={({ pressed }) => [styles.numBtn, pressed && styles.btnPressed]}>
              <Text style={styles.numBtnText}>2</Text>
            </Pressable>
            <Pressable onPress={() => handleNumber("3")} style={({ pressed }) => [styles.numBtn, pressed && styles.btnPressed]}>
              <Text style={styles.numBtnText}>3</Text>
            </Pressable>
            <Pressable onPress={() => handleOperator("×")} style={({ pressed }) => [styles.opBtn, pressed && styles.btnPressed]}>
              <Text style={styles.opBtnText}>×</Text>
            </Pressable>
            <Pressable onPress={handleMemoryAdd} style={({ pressed }) => [styles.opBtn, pressed && styles.btnPressed]}>
              <Text style={styles.opTextSmall}>M+</Text>
            </Pressable>

            {/* Row 4: 0, ., EXP, /, M- */}
            <Pressable onPress={() => handleNumber("0")} style={({ pressed }) => [styles.numBtn, pressed && styles.btnPressed]}>
              <Text style={styles.numBtnText}>0</Text>
            </Pressable>
            <Pressable onPress={handleDecimal} style={({ pressed }) => [styles.numBtn, pressed && styles.btnPressed]}>
              <Text style={styles.numBtnText}>.</Text>
            </Pressable>
            <Pressable onPress={handleExp} style={({ pressed }) => [styles.opBtn, pressed && styles.btnPressed]}>
              <Text style={styles.opTextSmall}>EXP</Text>
            </Pressable>
            <Pressable onPress={() => handleOperator("/")} style={({ pressed }) => [styles.opBtn, pressed && styles.btnPressed]}>
              <Text style={styles.opBtnText}>/</Text>
            </Pressable>
            <Pressable onPress={handleMemorySubtract} style={({ pressed }) => [styles.opBtn, pressed && styles.btnPressed]}>
              <Text style={styles.opTextSmall}>M−</Text>
            </Pressable>

            {/* Row 5: ±, RND, AC, =, MR */}
            <Pressable onPress={handlePlusMinus} style={({ pressed }) => [styles.opBtn, pressed && styles.btnPressed]}>
              <Text style={styles.opBtnText}>±</Text>
            </Pressable>
            <Pressable onPress={handleRandom} style={({ pressed }) => [styles.opBtn, pressed && styles.btnPressed]}>
              <Text style={styles.opTextSmall}>RND</Text>
            </Pressable>
            <Pressable onPress={handleClear} style={({ pressed }) => [styles.acBtn, pressed && styles.btnPressed]}>
              <Text style={styles.acBtnText}>AC</Text>
            </Pressable>
            <Pressable onPress={handleEquals} style={({ pressed }) => [styles.eqBtn, pressed && styles.btnPressed]}>
              <Text style={styles.eqBtnText}>=</Text>
            </Pressable>
            <Pressable
              onPress={handleMemoryRecall}
              style={({ pressed }) => [
                styles.opBtn,
                hasMemory && styles.memBtnActive,
                pressed && styles.btnPressed,
              ]}
            >
              <Text style={[styles.opTextSmall, hasMemory && styles.memBtnTextActive]}>
                MR
              </Text>
            </Pressable>
          </View>

          {/* History Section */}
          {showHistory && (
            <View style={styles.historyBox}>
              <View style={styles.historyHeader}>
                <Text style={styles.historyTitle}>Recent Calculations</Text>
                {history.length > 0 && (
                  <Pressable
                    onPress={() => {
                      triggerHaptic();
                      setHistory([]);
                    }}
                    style={styles.historyClearBtn}
                  >
                    <Trash2 size={12} color="#EF4444" />
                    <Text style={styles.historyClearText}>Clear</Text>
                  </Pressable>
                )}
              </View>

              {history.length === 0 ? (
                <Text style={styles.historyEmpty}>No calculations recorded yet.</Text>
              ) : (
                history.map((item) => (
                  <Pressable
                    key={item.id}
                    onPress={() => {
                      triggerHaptic();
                      setDisplay(item.result);
                      setExpression(item.expression + " =");
                      setJustCalculated(true);
                    }}
                    style={styles.historyRow}
                  >
                    <Text style={styles.historyExpr}>{item.expression} =</Text>
                    <Text style={styles.historyRes}>{item.result}</Text>
                  </Pressable>
                ))
              )}
            </View>
          )}

        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8FAFC",
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 40,
  },
  calcFrame: {
    backgroundColor: "#EDEDED",
    borderRadius: 16,
    borderWidth: 2,
    borderColor: "#D1D5DB",
    padding: CALC_PADDING,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  tabRow: {
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
    borderBottomWidth: 2,
    borderBottomColor: "#135185",
    marginBottom: 10,
  },
  tabGroup: {
    flexDirection: "row",
  },
  tabBtn: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    marginBottom: -2,
    borderWidth: 2,
  },
  tabActive: {
    backgroundColor: "#FFFFFF",
    borderColor: "#135185",
    borderBottomColor: "#FFFFFF",
    zIndex: 2,
  },
  tabInactive: {
    backgroundColor: "#135185",
    borderColor: "#135185",
  },
  tabText: {
    fontSize: 13,
    fontWeight: "700",
  },
  tabTextActive: {
    color: "#0F172A",
  },
  tabTextInactive: {
    color: "#FFFFFF",
  },
  utilityGroup: {
    flexDirection: "row",
    alignItems: "center",
    paddingBottom: 4,
    gap: 6,
  },
  degBtn: {
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: "#CBD5E1",
  },
  degBtnText: {
    fontSize: 11,
    fontWeight: "800",
    color: "#135185",
  },
  historyToggleBtn: {
    backgroundColor: "#FFFFFF",
    padding: 6,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: "#CBD5E1",
  },
  historyToggleBtnActive: {
    backgroundColor: "#135185",
    borderColor: "#135185",
  },
  displayContainer: {
    backgroundColor: "#135185",
    borderRadius: 10,
    padding: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#0D3B61",
  },
  displayTopRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    minHeight: 18,
    marginBottom: 4,
  },
  statusChips: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  memChip: {
    backgroundColor: "rgba(56, 189, 248, 0.2)",
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "rgba(56, 189, 248, 0.4)",
  },
  memChipText: {
    color: "#E0F2FE",
    fontSize: 10,
    fontWeight: "700",
  },
  modeChipText: {
    color: "#BAE6FD",
    fontSize: 10,
    fontWeight: "700",
  },
  exprText: {
    color: "rgba(255, 255, 255, 0.8)",
    fontSize: 12,
    fontFamily: "monospace",
    maxWidth: 200,
  },
  displayMainRow: {
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
  },
  copyBtn: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    backgroundColor: "rgba(255, 255, 255, 0.18)",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.3)",
    marginBottom: 2,
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  copyBtnCopied: {
    backgroundColor: "#059669",
    borderColor: "#10B981",
  },
  copyBtnText: {
    color: "#FFFFFF",
    fontSize: 11,
    fontWeight: "800",
    textTransform: "uppercase",
  },
  displayText: {
    color: "#FFFFFF",
    fontWeight: "900",
    textAlign: "right",
    fontFamily: "monospace",
    flex: 1,
    marginLeft: 8,
  },
  textLarge: {
    fontSize: 32,
  },
  textMedium: {
    fontSize: 24,
  },
  textSmall: {
    fontSize: 18,
  },
  sciGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: BUTTON_GAP,
    marginBottom: 10,
    justifyContent: "space-between",
  },
  sciBtn: {
    width: BTN_WIDTH,
    height: 38,
    backgroundColor: "#E2EDF7",
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#BCD4E6",
  },
  sciBtnHighlight: {
    backgroundColor: "#FEF3C7",
    borderColor: "#FCD34D",
  },
  sciBtnText: {
    color: "#0F3B60",
    fontSize: 12,
    fontWeight: "700",
  },
  sciBtnTextHighlight: {
    color: "#92400E",
  },
  keypadGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: BUTTON_GAP,
    justifyContent: "space-between",
  },
  numBtn: {
    width: BTN_WIDTH,
    height: 52,
    backgroundColor: "#B7D2E8",
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#9EBFDC",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
    elevation: 1,
  },
  numBtnText: {
    color: "#0F172A",
    fontSize: 22,
    fontWeight: "700",
  },
  opBtn: {
    width: BTN_WIDTH,
    height: 52,
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#CBD5E1",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 1,
    elevation: 1,
  },
  opBtnText: {
    color: "#0F172A",
    fontSize: 22,
    fontWeight: "700",
  },
  opTextSmall: {
    color: "#1E293B",
    fontSize: 13,
    fontWeight: "700",
  },
  backBtn: {
    width: BTN_WIDTH,
    height: 52,
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#CBD5E1",
  },
  backBtnText: {
    color: "#BE123C",
    fontSize: 13,
    fontWeight: "700",
  },
  acBtn: {
    width: BTN_WIDTH,
    height: 52,
    backgroundColor: "#8DB4D6",
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#7BA5CD",
  },
  acBtnText: {
    color: "#020617",
    fontSize: 16,
    fontWeight: "900",
  },
  eqBtn: {
    width: BTN_WIDTH,
    height: 52,
    backgroundColor: "#8DB4D6",
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#7BA5CD",
  },
  eqBtnText: {
    color: "#020617",
    fontSize: 24,
    fontWeight: "900",
  },
  memBtnActive: {
    backgroundColor: "#FEF3C7",
    borderColor: "#FCD34D",
  },
  memBtnTextActive: {
    color: "#92400E",
    fontWeight: "800",
  },
  btnPressed: {
    opacity: 0.7,
    transform: [{ scale: 0.96 }],
  },
  historyBox: {
    marginTop: 14,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: "#CBD5E1",
  },
  historyHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  historyTitle: {
    fontSize: 12,
    fontWeight: "800",
    color: "#334155",
    textTransform: "uppercase",
  },
  historyClearBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  historyClearText: {
    fontSize: 11,
    color: "#EF4444",
    fontWeight: "700",
  },
  historyEmpty: {
    fontSize: 12,
    color: "#64748B",
    textAlign: "center",
    paddingVertical: 10,
    fontStyle: "italic",
  },
  historyRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    padding: 8,
    borderRadius: 6,
    marginBottom: 6,
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },
  historyExpr: {
    fontSize: 12,
    color: "#475569",
    fontFamily: "monospace",
  },
  historyRes: {
    fontSize: 13,
    fontWeight: "800",
    color: "#0F172A",
    fontFamily: "monospace",
  },
});
