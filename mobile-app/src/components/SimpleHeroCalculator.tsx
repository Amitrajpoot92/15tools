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

export function SimpleHeroCalculator() {
  const [input, setInput] = useState<string>("5 × 5");
  const [previousFormula, setPreviousFormula] = useState<string>("");
  const [justCalculated, setJustCalculated] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);

  const triggerHaptic = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  };

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

      const openP = (s.match(/\(/g) || []).length;
      const closeP = (s.match(/\)/g) || []).length;
      if (openP > closeP) s += ")".repeat(openP - closeP);

      if (/[+\-*/.]$/.test(s)) {
        const trimmed = s.replace(/[+\-*/.]+$/, "").trim();
        if (!trimmed) return "";
        s = trimmed;
      }

      s = s.replace(/(\d+(?:\.\d+)?)%/g, "($1/100)");

      if (!/^[0-9+\-*/(). ]+$/.test(s)) return "";

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

  const handleDigit = (val: string) => {
    triggerHaptic();
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
    triggerHaptic();
    if (justCalculated) {
      setInput("0.");
      setPreviousFormula("");
      setJustCalculated(false);
      return;
    }
    const parts = input.split(/[+\-×÷]/);
    const lastPart = parts[parts.length - 1];
    if (!lastPart.includes(".")) {
      setInput((prev) => prev + ".");
    }
  };

  const handleOperator = (op: string) => {
    triggerHaptic();
    setJustCalculated(false);
    const lastChar = input.trim().slice(-1);
    if (["+", "−", "×", "÷"].includes(lastChar)) {
      setInput((prev) => prev.trim().slice(0, -1) + " " + op + " ");
    } else {
      setInput((prev) => (prev === "0" ? "0 " + op + " " : prev + " " + op + " "));
    }
  };

  const handlePercent = () => {
    triggerHaptic();
    setJustCalculated(false);
    if (input === "0" || /[+\-×÷]$/.test(input.trim())) return;
    setInput((prev) => prev + "%");
  };

  const handleBackspace = () => {
    triggerHaptic();
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
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    setInput("0");
    setPreviousFormula("");
    setJustCalculated(false);
  };

  const handleEquals = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
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

  const copyResult = async () => {
    await Clipboard.setStringAsync(input);
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

      {/* 4x5 Keypad Grid (Exact Layout from Image) */}
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

        {/* Row 5: 00, 0, ., = */}
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
          style={({ pressed }) => [styles.orangeBtn, pressed && styles.btnPressed]}
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

