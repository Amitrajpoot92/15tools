import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  ScrollView,
  Pressable,
  StyleSheet,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import * as Haptics from "expo-haptics";
import * as Clipboard from "expo-clipboard";
import { CalculatorHeader } from "@/components/CalculatorHeader";
import { Copy, RotateCcw, Check } from "lucide-react-native";

export default function BODMASCalculatorScreen() {
  const [expression, setExpression] = useState("");
  const [steps, setSteps] = useState<string[]>([]);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  const calculateBODMAS = (expr: string) => {
    try {
      let cleanExpr = expr.replace(/\s+/g, "");
      if (!cleanExpr) {
        setSteps([]);
        setError("");
        return;
      }

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
            const fmt = Number.isInteger(res)
              ? res.toString()
              : parseFloat(res.toFixed(4)).toString();
            return e.replace(match[0], `@@${fmt}@@`);
          }

          match = e.match(new RegExp(`(${num})\\^(${num})`));
          if (match) {
            const res = Math.pow(parseFloat(match[1]), parseFloat(match[2]));
            if (isNaN(res) || !isFinite(res)) throw new Error("Math Error");
            const fmt = Number.isInteger(res)
              ? res.toString()
              : parseFloat(res.toFixed(4)).toString();
            return e.replace(match[0], `@@${fmt}@@`);
          }

          match = e.match(new RegExp(`(${num})([*/])(${num})`));
          if (match) {
            const a = parseFloat(match[1]);
            const op = match[2];
            const b = parseFloat(match[3]);
            if (op === "/" && b === 0) throw new Error("Divide by zero");
            const res = op === "*" ? a * b : a / b;
            const fmt = Number.isInteger(res)
              ? res.toString()
              : parseFloat(res.toFixed(4)).toString();
            return e.replace(match[0], `@@${fmt}@@`);
          }

          let eTemp = e.replace(/\+-/g, "-").replace(/--/g, "+");
          if (new RegExp(`^${num}$`).test(eTemp)) return eTemp;

          match = eTemp.match(new RegExp(`(${num})([+-])(${num})`));
          if (match) {
            const a = parseFloat(match[1]);
            const op = match[2];
            const b = parseFloat(match[3]);
            const res = op === "+" ? a + b : a - b;
            const fmt = Number.isInteger(res)
              ? res.toString()
              : parseFloat(res.toFixed(4)).toString();
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

  const handleInputChange = (val: string) => {
    setExpression(val);
    calculateBODMAS(val);
  };

  const insertSymbol = (sym: string) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    const newExpr = expression + sym;
    setExpression(newExpr);
    calculateBODMAS(newExpr);
  };

  const handleCopy = async () => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    const finalRes =
      steps.length > 0 ? steps[steps.length - 1].replace(/@@/g, "") : "0";

    let stepsText = "";
    if (steps.length > 1) {
      stepsText =
        "\nStep-by-Step Solution:\n" +
        steps
          .map((step, index) => {
            const cleanStep = step
              .replace(/@@/g, "")
              .replace(/\*/g, "×")
              .replace(/\//g, "÷");
            return `${index === 0 ? "  " : "= "}${cleanStep}`;
          })
          .join("\n") +
        "\n\n";
    }

    const text = `BODMAS Calculator\nMath Expression: ${expression}\n${stepsText}Result: ${finalRes}\n\nCalculate Online: https://topcalcbox.com/bodmas-calculator/`;
    await Clipboard.setStringAsync(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleReset = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    setExpression("");
    setSteps([]);
    setError("");
  };

  const renderStep = (step: string) => {
    const display = step.replace(/\*/g, "×").replace(/\//g, "÷");
    const parts = display.split(/@@(.*?)@@/g);
    return (
      <Text style={styles.stepText}>
        {parts.map((part, i) =>
          i % 2 === 1 ? (
            <Text key={i} style={styles.stepHighlight}>
              {part}
            </Text>
          ) : (
            <Text key={i}>{part}</Text>
          )
        )}
      </Text>
    );
  };

  const finalResult = error
    ? "Error"
    : steps.length > 0
    ? steps[steps.length - 1].replace(/@@/g, "")
    : "0";

  return (
    <SafeAreaView style={styles.container} edges={["top", "bottom"]}>
      <StatusBar style="dark" />
      <CalculatorHeader
        title="BODMAS Calculator"
        subtitle="Solve complex math expressions automatically using exact BODMAS rules."
        iconName="Calculator"
        themeColor="#F59E0B"
        themeBg="#FFFBEB"
      />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {/* Input Card */}
        <View style={styles.inputCard}>
          <Text style={styles.inputLabel}>MATH EXPRESSION</Text>
          <View style={[styles.inputWrapper, !!error && styles.inputWrapperError]}>
            <TextInput
              style={styles.textInput}
              value={expression}
              onChangeText={handleInputChange}
              placeholder="e.g. 5 + (3 * 2)"
              placeholderTextColor="#94A3B8"
              autoCapitalize="none"
              autoCorrect={false}
            />
          </View>
          {error ? <Text style={styles.errorText}>{error}</Text> : null}

          {/* Quick Math Symbols Keypad */}
          <View style={styles.symbolRow}>
            {["+", "-", "×", "÷", "(", ")", "^", "√"].map((sym) => (
              <Pressable
                key={sym}
                onPress={() => insertSymbol(sym)}
                style={styles.symbolBtn}
              >
                <Text style={styles.symbolText}>{sym}</Text>
              </Pressable>
            ))}
          </View>
        </View>

        {/* Result Box */}
        <View style={styles.resultBox}>
          <View style={styles.resultHeader}>
            <Text style={styles.resultCategory}>FINAL RESULT</Text>
            <View style={styles.actionButtons}>
              <Pressable onPress={handleCopy} style={styles.copyBtn}>
                {copied ? <Check size={14} color="#059669" /> : <Copy size={14} color="#D97706" />}
                <Text style={[styles.copyBtnText, copied && { color: "#059669" }]}>
                  {copied ? "Copied" : "Copy"}
                </Text>
              </Pressable>
              <Pressable onPress={handleReset} style={styles.resetBtn}>
                <RotateCcw size={15} color="#D97706" />
              </Pressable>
            </View>
          </View>

          {/* Step-by-Step Solution Card */}
          {steps.length > 0 && (
            <View style={styles.solutionCard}>
              <Text style={styles.solutionTitle}>STEP-BY-STEP SOLUTION</Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                <View style={styles.stepsColumn}>
                  {steps.map((step, index) => (
                    <View key={index} style={styles.stepRow}>
                      <Text style={styles.equalSign}>{index > 0 ? "=" : "  "}</Text>
                      {renderStep(step)}
                    </View>
                  ))}
                </View>
              </ScrollView>
            </View>
          )}

          <View style={styles.scoreRow}>
            <Text
              style={[
                styles.finalResultText,
                error ? { color: "#E11D48" } : null,
              ]}
            >
              {finalResult}
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F8FAFC" },
  scrollContent: { paddingHorizontal: 16, paddingBottom: 40 },
  inputCard: {
    backgroundColor: "#FFFBEB",
    borderRadius: 20,
    padding: 18,
    borderWidth: 1,
    borderColor: "#FEF3C7",
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 11,
    fontWeight: "800",
    color: "#B45309",
    letterSpacing: 0.5,
    marginBottom: 8,
  },
  inputWrapper: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#CBD5E1",
    borderRadius: 14,
    paddingHorizontal: 14,
    height: 52,
    justifyContent: "center",
  },
  inputWrapperError: {
    borderColor: "#FECDD3",
    backgroundColor: "#FFF1F2",
  },
  textInput: {
    fontSize: 20,
    fontWeight: "800",
    color: "#0F172A",
  },
  errorText: {
    fontSize: 12,
    fontWeight: "700",
    color: "#E11D48",
    marginTop: 6,
  },
  symbolRow: {
    flexDirection: "row",
    gap: 6,
    marginTop: 12,
  },
  symbolBtn: {
    flex: 1,
    backgroundColor: "#FEF3C7",
    paddingVertical: 8,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#FDE68A",
  },
  symbolText: {
    fontSize: 15,
    fontWeight: "800",
    color: "#92400E",
  },
  resultBox: {
    backgroundColor: "#FFFBEB",
    borderRadius: 22,
    padding: 20,
    borderWidth: 1.5,
    borderColor: "#FDE68A",
    alignItems: "center",
    shadowColor: "#D97706",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 3,
  },
  resultHeader: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  resultCategory: {
    fontSize: 11,
    fontWeight: "800",
    color: "#B45309",
    letterSpacing: 1,
  },
  actionButtons: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  copyBtn: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#FDE68A",
    gap: 4,
  },
  copyBtnText: {
    fontSize: 11,
    fontWeight: "800",
    color: "#B45309",
  },
  resetBtn: {
    width: 30,
    height: 30,
    borderRadius: 8,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#FDE68A",
  },
  solutionCard: {
    width: "100%",
    backgroundColor: "rgba(255,255,255,0.9)",
    borderRadius: 16,
    padding: 14,
    borderWidth: 1,
    borderColor: "#FDE68A",
    marginBottom: 16,
  },
  solutionTitle: {
    fontSize: 10,
    fontWeight: "800",
    color: "#94A3B8",
    letterSpacing: 0.5,
    marginBottom: 8,
  },
  stepsColumn: {
    gap: 6,
  },
  stepRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  equalSign: {
    fontSize: 15,
    fontWeight: "800",
    color: "#D97706",
    width: 14,
  },
  stepText: {
    fontSize: 15,
    fontFamily: "monospace",
    fontWeight: "700",
    color: "#334155",
  },
  stepHighlight: {
    color: "#E11D48",
    fontWeight: "800",
  },
  scoreRow: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 8,
  },
  finalResultText: {
    fontSize: 52,
    fontWeight: "900",
    color: "#0F172A",
    letterSpacing: -1,
  },
});
