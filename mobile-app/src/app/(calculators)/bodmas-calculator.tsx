import React, { useState } from "react";
import { View, Text, TextInput, ScrollView, Pressable, StyleSheet } from "react-native";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import * as Haptics from "expo-haptics";
import * as Clipboard from "expo-clipboard";
import { CalculatorHeader } from "@/components/CalculatorHeader";
import {
  OuterToolCard,
  FormPanel,
  ResultPanel,
  CopyResetActions,
  sharedStyles,
} from "@/components/CalculatorUI";

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

      cleanExpr = cleanExpr
        .replace(/\[/g, "(")
        .replace(/\]/g, ")")
        .replace(/\{/g, "(")
        .replace(/\}/g, ")")
        .replace(/×/g, "*")
        .replace(/÷/g, "/");

      cleanExpr = cleanExpr
        .replace(/(\d)(\()/g, "$1*$2")
        .replace(/(\))(\d)/g, "$1*$2")
        .replace(/(\))(\()/g, "$1*$2");

      const num = "(?:-?\\d+(?:\\.\\d+)?)";
      let iteration = 0;
      const calculatedSteps: string[] = [cleanExpr];
      let currentExpr = cleanExpr;

      while (iteration < 100) {
        iteration++;
        let exprForEval = currentExpr.replace(/@@(.*?)@@/g, "$1");
        let prev;
        do {
          prev = exprForEval;
          exprForEval = exprForEval.replace(new RegExp(`\\((${num})\\)`), "$1");
        } while (exprForEval !== prev);

        if (new RegExp(`^${num}$`).test(exprForEval)) break;

        let nextExpr = exprForEval;
        let didSomething = false;

        const evaluateOp = (e: string) => {
          let match = e.match(new RegExp(`(³?√)(${num})`));
          if (match) {
            const val = parseFloat(match[2]);
            const res = match[1] === "³√" ? Math.cbrt(val) : Math.sqrt(val);
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
            const b = parseFloat(match[3]);
            if (match[2] === "/" && b === 0) throw new Error("Divide by zero");
            const res = match[2] === "*" ? a * b : a / b;
            const fmt = Number.isInteger(res) ? res.toString() : parseFloat(res.toFixed(4)).toString();
            return e.replace(match[0], `@@${fmt}@@`);
          }

          const eTemp = e.replace(/\+-/g, "-").replace(/--/g, "+");
          if (new RegExp(`^${num}$`).test(eTemp)) return eTemp;

          match = eTemp.match(new RegExp(`(${num})([+-])(${num})`));
          if (match) {
            const a = parseFloat(match[1]);
            const b = parseFloat(match[3]);
            const res = match[2] === "+" ? a + b : a - b;
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
    const finalRes = steps.length > 0 ? steps[steps.length - 1].replace(/@@/g, "") : "0";
    let stepsText = "";
    if (steps.length > 1) {
      stepsText =
        "\nStep-by-Step Solution:\n" +
        steps
          .map((step, index) => {
            const cleanStep = step.replace(/@@/g, "").replace(/\*/g, "×").replace(/\//g, "÷");
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
    <SafeAreaView style={sharedStyles.safeArea} edges={["top", "bottom"]}>
      <StatusBar style="dark" />
      <CalculatorHeader
        title="BODMAS Calculator"
        subtitle="Solve complex math equations step-by-step instantly using the correct order of operations."
        iconName="Calculator"
        color="amber"
      />

      <ScrollView
        contentContainerStyle={sharedStyles.scrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <OuterToolCard>
          <FormPanel theme="amber">
            <Text style={sharedStyles.fieldLabel}>Math Expression</Text>
            <View style={[sharedStyles.inputBox, !!error && styles.inputErr]}>
              <TextInput
                style={sharedStyles.textInput}
                value={expression}
                onChangeText={handleInputChange}
                placeholder="e.g. 5 + (3 * 2)"
                placeholderTextColor="#94A3B8"
                autoCapitalize="none"
                autoCorrect={false}
              />
            </View>
            {error ? <Text style={styles.errText}>{error}</Text> : null}

            <View style={styles.symRow}>
              {["+", "-", "×", "÷", "(", ")", "^", "√", "³√"].map((sym) => (
                <Pressable key={sym} onPress={() => insertSymbol(sym)} style={styles.symBtn}>
                  <Text style={styles.symText}>{sym}</Text>
                </Pressable>
              ))}
            </View>
          </FormPanel>

          <ResultPanel theme="amber">
            <View style={sharedStyles.resultHeaderRow}>
              <Text style={sharedStyles.resultKicker}>Final Result</Text>
              <CopyResetActions copied={copied} onCopy={handleCopy} onReset={handleReset} theme="amber" />
            </View>

            <Text style={[sharedStyles.heroValue, error ? { color: "#E11D48" } : { color: "#78350F" }]}>
              {finalResult}
            </Text>

            {steps.length > 0 && (
              <View style={styles.stepsCard}>
                <Text style={styles.stepsTitle}>Step-by-Step Solution</Text>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                  <View style={{ gap: 4 }}>
                    {steps.map((step, index) => (
                      <View key={index} style={styles.stepRow}>
                        <Text style={styles.eqSign}>{index > 0 ? "=" : "  "}</Text>
                        {renderStep(step)}
                      </View>
                    ))}
                  </View>
                </ScrollView>
              </View>
            )}
          </ResultPanel>
        </OuterToolCard>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  inputErr: { borderColor: "#EF4444" },
  errText: { fontSize: 12, fontWeight: "700", color: "#DC2626", marginTop: 6 },
  symRow: { flexDirection: "row", flexWrap: "wrap", gap: 6, marginTop: 10 },
  symBtn: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#FCD34D",
    paddingHorizontal: 11,
    paddingVertical: 7,
    borderRadius: 8,
  },
  symText: { fontSize: 14, fontWeight: "800", color: "#78350F" },
  stepsCard: {
    marginTop: 12,
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: "#FCD34D",
    padding: 12,
  },
  stepsTitle: {
    fontSize: 11,
    fontWeight: "800",
    color: "#92400E",
    textTransform: "uppercase",
    letterSpacing: 0.4,
    marginBottom: 8,
  },
  stepRow: { flexDirection: "row", alignItems: "center", gap: 6 },
  eqSign: { fontSize: 14, fontWeight: "800", color: "#94A3B8", width: 14 },
  stepText: { fontSize: 14, fontWeight: "700", color: "#0F172A" },
  stepHighlight: { color: "#D97706", backgroundColor: "#FEF3C7", fontWeight: "900" },
});
