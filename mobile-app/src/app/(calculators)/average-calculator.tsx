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
import { Copy, RotateCcw, Check, Sigma } from "lucide-react-native";

export default function AverageCalculatorScreen() {
  const [input, setInput] = useState("");
  const [copied, setCopied] = useState(false);

  const calculateStats = () => {
    const numStrings = input.split(/[,;\s]+/).filter(Boolean);
    const nums = numStrings.map((n) => parseFloat(n)).filter((n) => !isNaN(n));

    if (nums.length === 0) {
      return { mean: "0", median: "0", sum: "0", count: "0" };
    }

    const sum = nums.reduce((a, b) => a + b, 0);
    const mean = sum / nums.length;

    const sorted = [...nums].sort((a, b) => a - b);
    const mid = Math.floor(sorted.length / 2);
    const median =
      sorted.length % 2 === 0
        ? (sorted[mid - 1] + sorted[mid]) / 2
        : sorted[mid];

    return {
      mean: (mean % 1 === 0 ? mean : mean.toFixed(2)).toString(),
      median: (median % 1 === 0 ? median : median.toFixed(2)).toString(),
      sum: (sum % 1 === 0 ? sum : sum.toFixed(2)).toString(),
      count: nums.length.toString(),
    };
  };

  const stats = calculateStats();

  const handleCopy = async () => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    const text = `Average Calculator\nNumbers: ${input}\nAverage (Mean): ${stats.mean}\nMedian: ${stats.median}\nSum: ${stats.sum}\nCount: ${stats.count}\n\nCalculate Online: https://topcalcbox.com/average-calculator/`;
    await Clipboard.setStringAsync(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleReset = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    setInput("");
  };

  return (
    <SafeAreaView style={styles.container} edges={["top", "bottom"]}>
      <StatusBar style="dark" />
      <CalculatorHeader
        title="Average Calculator"
        subtitle="Find the mean, median, mode, and range for any set of numbers."
        iconName="Sigma"
        themeColor="#F97316"
        themeBg="#FFF7ED"
      />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {/* Input Card */}
        <View style={styles.inputCard}>
          <Text style={styles.inputLabel}>
            ENTER NUMBERS (SEPARATED BY COMMAS OR SPACES)
          </Text>
          <View style={styles.textAreaWrapper}>
            <TextInput
              style={styles.textArea}
              multiline
              numberOfLines={4}
              textAlignVertical="top"
              value={input}
              onChangeText={setInput}
              placeholder="e.g. 10, 20, 30, 40"
              placeholderTextColor="#94A3B8"
            />
          </View>
        </View>

        {/* Result Box */}
        <View style={styles.resultBox}>
          <View style={styles.resultHeader}>
            <View style={styles.headerTitleGroup}>
              <View style={styles.iconBadge}>
                <Sigma size={16} color="#EA580C" />
              </View>
              <Text style={styles.resultCategory}>RESULTS</Text>
            </View>
            <View style={styles.actionButtons}>
              <Pressable onPress={handleCopy} style={styles.copyBtn}>
                {copied ? <Check size={14} color="#059669" /> : <Copy size={14} color="#C2410C" />}
                <Text style={[styles.copyBtnText, copied && { color: "#059669" }]}>
                  {copied ? "Copied" : "Copy"}
                </Text>
              </Pressable>
              <Pressable onPress={handleReset} style={styles.resetBtn}>
                <RotateCcw size={15} color="#C2410C" />
              </Pressable>
            </View>
          </View>

          {/* 4 Detail Cards */}
          <View style={styles.gridCards}>
            <View style={styles.detailCard}>
              <Text style={styles.detailCardLabel}>AVERAGE (MEAN)</Text>
              <Text style={styles.detailCardValue}>{stats.mean}</Text>
            </View>
            <View style={styles.detailCard}>
              <Text style={styles.detailCardLabel}>MEDIAN</Text>
              <Text style={styles.detailCardValue}>{stats.median}</Text>
            </View>
            <View style={styles.detailCard}>
              <Text style={styles.detailCardLabel}>SUM</Text>
              <Text style={styles.detailCardValue}>{stats.sum}</Text>
            </View>
            <View style={styles.detailCard}>
              <Text style={styles.detailCardLabel}>COUNT</Text>
              <Text style={styles.detailCardValue}>{stats.count}</Text>
            </View>
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
    backgroundColor: "#FFF7ED",
    borderRadius: 20,
    padding: 18,
    borderWidth: 1,
    borderColor: "#FFEDD5",
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 11,
    fontWeight: "800",
    color: "#9A3412",
    letterSpacing: 0.5,
    marginBottom: 8,
  },
  textAreaWrapper: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#CBD5E1",
    borderRadius: 14,
    padding: 12,
    minHeight: 110,
  },
  textArea: {
    fontSize: 18,
    fontWeight: "700",
    color: "#0F172A",
    minHeight: 90,
  },
  resultBox: {
    backgroundColor: "#FFF7ED",
    borderRadius: 22,
    padding: 18,
    borderWidth: 1.5,
    borderColor: "#FED7AA",
    shadowColor: "#EA580C",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 3,
  },
  resultHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  headerTitleGroup: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  iconBadge: {
    width: 28,
    height: 28,
    borderRadius: 8,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#FED7AA",
  },
  resultCategory: {
    fontSize: 12,
    fontWeight: "800",
    color: "#C2410C",
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
    borderColor: "#FED7AA",
    gap: 4,
  },
  copyBtnText: {
    fontSize: 11,
    fontWeight: "800",
    color: "#C2410C",
  },
  resetBtn: {
    width: 30,
    height: 30,
    borderRadius: 8,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#FED7AA",
  },
  gridCards: {
    width: "100%",
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  detailCard: {
    width: "48%",
    backgroundColor: "rgba(255,255,255,0.85)",
    borderRadius: 14,
    padding: 16,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#FED7AA",
  },
  detailCardLabel: {
    fontSize: 10,
    fontWeight: "800",
    color: "#9A3412",
    letterSpacing: 0.5,
    marginBottom: 4,
  },
  detailCardValue: {
    fontSize: 24,
    fontWeight: "900",
    color: "#0F172A",
  },
});
