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

type Mode = "what_is_x_percent_of_y" | "x_is_what_percent_of_y" | "percentage_change";

export default function PercentageCalculatorScreen() {
  const [mode, setMode] = useState<Mode>("what_is_x_percent_of_y");

  // State for What is X% of Y
  const [percX, setPercX] = useState("15");
  const [percY, setPercY] = useState("100");

  // State for X is what % of Y
  const [whatX, setWhatX] = useState("15");
  const [whatY, setWhatY] = useState("100");

  // State for % Change
  const [changeX, setChangeX] = useState("100");
  const [changeY, setChangeY] = useState("150");

  const [copied, setCopied] = useState(false);

  const renderResult = () => {
    if (mode === "what_is_x_percent_of_y") {
      const x = parseFloat(percX);
      const y = parseFloat(percY);
      if (isNaN(x) || isNaN(y)) return { text: "Result", value: "0", symbol: "", color: "#1E1B4B" };
      const res = (x / 100) * y;
      return {
        text: `${x}% of ${y}`,
        value: Number.isInteger(res) ? res.toString() : res.toFixed(2),
        symbol: "",
        color: "#1E1B4B",
      };
    } else if (mode === "x_is_what_percent_of_y") {
      const x = parseFloat(whatX);
      const y = parseFloat(whatY);
      if (isNaN(x) || isNaN(y) || y === 0) return { text: "Result", value: "0", symbol: "%", color: "#1E1B4B" };
      const res = (x / y) * 100;
      return {
        text: `${x} is what % of ${y}`,
        value: Number.isInteger(res) ? res.toString() : res.toFixed(2),
        symbol: "%",
        color: "#1E1B4B",
      };
    } else {
      const x = parseFloat(changeX);
      const y = parseFloat(changeY);
      if (isNaN(x) || isNaN(y) || x === 0) return { text: "Result", value: "0", symbol: "%", color: "#1E1B4B" };
      const diff = y - x;
      const res = (Math.abs(diff) / Math.abs(x)) * 100;
      const changeType = diff >= 0 ? "Increase" : "Decrease";
      return {
        text: `${changeType} from ${x} to ${y}`,
        value: Number.isInteger(res) ? res.toString() : res.toFixed(2),
        symbol: "%",
        color: diff >= 0 ? "#059669" : "#E11D48",
      };
    }
  };

  const result = renderResult();

  const handleCopy = async () => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    const text = `Percentage Calculator\nResult: ${result.text} = ${result.value}${result.symbol ? result.symbol : ""}\n\nCalculate Online: https://topcalcbox.com/percentage-calculator/`;
    await Clipboard.setStringAsync(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleReset = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    if (mode === "what_is_x_percent_of_y") {
      setPercX("");
      setPercY("");
    } else if (mode === "x_is_what_percent_of_y") {
      setWhatX("");
      setWhatY("");
    } else {
      setChangeX("");
      setChangeY("");
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={["top", "bottom"]}>
      <StatusBar style="dark" />
      <CalculatorHeader
        title="Percentage Calculator"
        subtitle="Quickly find the percentage of any number, calculate discounts, or figure out ratio percentages."
        iconName="Percent"
        themeColor="#F97316"
        themeBg="#FFF7ED"
      />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {/* Mode Selector Tabs */}
        <View style={styles.tabContainer}>
          <Pressable
            onPress={() => {
              Haptics.selectionAsync();
              setMode("what_is_x_percent_of_y");
            }}
            style={[styles.tabBtn, mode === "what_is_x_percent_of_y" && styles.tabBtnActive]}
          >
            <Text
              style={[
                styles.tabText,
                mode === "what_is_x_percent_of_y" && styles.tabTextActive,
              ]}
              numberOfLines={1}
            >
              What is X% of Y?
            </Text>
          </Pressable>

          <Pressable
            onPress={() => {
              Haptics.selectionAsync();
              setMode("x_is_what_percent_of_y");
            }}
            style={[styles.tabBtn, mode === "x_is_what_percent_of_y" && styles.tabBtnActive]}
          >
            <Text
              style={[
                styles.tabText,
                mode === "x_is_what_percent_of_y" && styles.tabTextActive,
              ]}
              numberOfLines={1}
            >
              X is what % of Y?
            </Text>
          </Pressable>

          <Pressable
            onPress={() => {
              Haptics.selectionAsync();
              setMode("percentage_change");
            }}
            style={[styles.tabBtn, mode === "percentage_change" && styles.tabBtnActive]}
          >
            <Text
              style={[
                styles.tabText,
                mode === "percentage_change" && styles.tabTextActive,
              ]}
              numberOfLines={1}
            >
              % Change
            </Text>
          </Pressable>
        </View>

        {/* Input Card */}
        <View style={styles.inputCard}>
          {mode === "what_is_x_percent_of_y" && (
            <View>
              <Text style={styles.inputLabel}>PERCENTAGE (%)</Text>
              <View style={styles.inputWrapper}>
                <TextInput
                  style={styles.textInput}
                  keyboardType="numeric"
                  value={percX}
                  onChangeText={setPercX}
                  placeholder="15"
                  placeholderTextColor="#94A3B8"
                />
                <Text style={styles.suffix}>%</Text>
              </View>

              {/* Quick Percentage Chips */}
              <View style={styles.chipRow}>
                {[5, 10, 15, 20, 25, 50].map((v) => (
                  <Pressable
                    key={v}
                    onPress={() => {
                      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                      setPercX(v.toString());
                    }}
                    style={styles.chipBtn}
                  >
                    <Text style={styles.chipText}>{v}%</Text>
                  </Pressable>
                ))}
              </View>

              <Text style={[styles.inputLabel, { marginTop: 16 }]}>TOTAL VALUE (OF Y)</Text>
              <View style={styles.inputWrapper}>
                <TextInput
                  style={styles.textInput}
                  keyboardType="numeric"
                  value={percY}
                  onChangeText={setPercY}
                  placeholder="100"
                  placeholderTextColor="#94A3B8"
                />
              </View>
            </View>
          )}

          {mode === "x_is_what_percent_of_y" && (
            <View>
              <Text style={styles.inputLabel}>VALUE (X)</Text>
              <View style={styles.inputWrapper}>
                <TextInput
                  style={styles.textInput}
                  keyboardType="numeric"
                  value={whatX}
                  onChangeText={setWhatX}
                  placeholder="15"
                  placeholderTextColor="#94A3B8"
                />
              </View>

              <Text style={[styles.inputLabel, { marginTop: 16 }]}>TOTAL VALUE (OF Y)</Text>
              <View style={styles.inputWrapper}>
                <TextInput
                  style={styles.textInput}
                  keyboardType="numeric"
                  value={whatY}
                  onChangeText={setWhatY}
                  placeholder="100"
                  placeholderTextColor="#94A3B8"
                />
              </View>
            </View>
          )}

          {mode === "percentage_change" && (
            <View>
              <Text style={styles.inputLabel}>ORIGINAL VALUE</Text>
              <View style={styles.inputWrapper}>
                <TextInput
                  style={styles.textInput}
                  keyboardType="numeric"
                  value={changeX}
                  onChangeText={setChangeX}
                  placeholder="100"
                  placeholderTextColor="#94A3B8"
                />
              </View>

              <Text style={[styles.inputLabel, { marginTop: 16 }]}>NEW VALUE</Text>
              <View style={styles.inputWrapper}>
                <TextInput
                  style={styles.textInput}
                  keyboardType="numeric"
                  value={changeY}
                  onChangeText={setChangeY}
                  placeholder="150"
                  placeholderTextColor="#94A3B8"
                />
              </View>
            </View>
          )}
        </View>

        {/* Result Box */}
        <View style={styles.resultBox}>
          <View style={styles.resultHeader}>
            <Text style={styles.resultSubtitle} numberOfLines={1}>
              {result.text}
            </Text>
            <View style={styles.actionButtons}>
              <Pressable onPress={handleCopy} style={styles.copyBtn}>
                {copied ? <Check size={14} color="#059669" /> : <Copy size={14} color="#0F172A" />}
                <Text style={[styles.copyBtnText, copied && { color: "#059669" }]}>
                  {copied ? "Copied" : "Copy"}
                </Text>
              </Pressable>
              <Pressable onPress={handleReset} style={styles.resetBtn}>
                <RotateCcw size={15} color="#475569" />
              </Pressable>
            </View>
          </View>

          <View style={styles.resultValueRow}>
            <Text style={[styles.resultValue, { color: result.color }]}>{result.value}</Text>
            {result.symbol ? (
              <Text style={[styles.resultSymbol, { color: result.color }]}>{result.symbol}</Text>
            ) : null}
          </View>

          <View style={styles.indicatorBarContainer}>
            <View
              style={[
                styles.indicatorBar,
                {
                  backgroundColor: result.color,
                  width: result.value !== "0" ? "100%" : "20%",
                },
              ]}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F8FAFC" },
  scrollContent: { paddingHorizontal: 16, paddingBottom: 40 },
  tabContainer: {
    flexDirection: "row",
    backgroundColor: "#F1F5F9",
    borderRadius: 16,
    padding: 4,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },
  tabBtn: {
    flex: 1,
    paddingVertical: 10,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 12,
  },
  tabBtnActive: {
    backgroundColor: "#FFFFFF",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  tabText: {
    fontSize: 11,
    fontWeight: "700",
    color: "#64748B",
  },
  tabTextActive: {
    color: "#0F172A",
    fontWeight: "800",
  },
  inputCard: {
    backgroundColor: "#EEF2FF",
    borderRadius: 20,
    padding: 18,
    borderWidth: 1,
    borderColor: "#E0E7FF",
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 11,
    fontWeight: "800",
    color: "#0F172A",
    letterSpacing: 0.5,
    marginBottom: 8,
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#CBD5E1",
    borderRadius: 14,
    paddingHorizontal: 14,
    height: 52,
  },
  textInput: {
    flex: 1,
    fontSize: 20,
    fontWeight: "800",
    color: "#0F172A",
  },
  suffix: {
    fontSize: 18,
    fontWeight: "800",
    color: "#475569",
    marginLeft: 6,
  },
  chipRow: {
    flexDirection: "row",
    marginTop: 10,
    gap: 6,
  },
  chipBtn: {
    flex: 1,
    backgroundColor: "#E2E8F0",
    paddingVertical: 7,
    borderRadius: 8,
    alignItems: "center",
  },
  chipText: {
    fontSize: 11,
    fontWeight: "800",
    color: "#0F172A",
  },
  resultBox: {
    backgroundColor: "#DBEAFE",
    borderRadius: 22,
    padding: 20,
    borderWidth: 1.5,
    borderColor: "#93C5FD",
    shadowColor: "#1E3A8A",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 3,
  },
  resultHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  resultSubtitle: {
    fontSize: 13,
    fontWeight: "800",
    color: "#0F172A",
    flex: 1,
    marginRight: 8,
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
    borderColor: "#CBD5E1",
    gap: 4,
  },
  copyBtnText: {
    fontSize: 11,
    fontWeight: "800",
    color: "#0F172A",
  },
  resetBtn: {
    width: 30,
    height: 30,
    borderRadius: 8,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#CBD5E1",
  },
  resultValueRow: {
    flexDirection: "row",
    alignItems: "baseline",
    marginBottom: 14,
  },
  resultValue: {
    fontSize: 48,
    fontWeight: "900",
    letterSpacing: -1,
  },
  resultSymbol: {
    fontSize: 26,
    fontWeight: "800",
    marginLeft: 4,
  },
  indicatorBarContainer: {
    height: 6,
    width: 90,
    backgroundColor: "#BFDBFE",
    borderRadius: 3,
    overflow: "hidden",
  },
  indicatorBar: {
    height: "100%",
    borderRadius: 3,
  },
});
