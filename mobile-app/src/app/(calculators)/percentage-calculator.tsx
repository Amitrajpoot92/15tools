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

export default function PercentageCalculatorScreen() {
  const [val1, setVal1] = useState("20");
  const [val2, setVal2] = useState("500");
  const [copied, setCopied] = useState(false);

  const v1 = parseFloat(val1) || 0;
  const v2 = parseFloat(val2) || 0;

  // Mode 1: What is v1% of v2?
  const res1 = (v1 * v2) / 100;
  // Mode 2: v1 is what % of v2?
  const res2 = v2 > 0 ? (v1 / v2) * 100 : 0;

  const handleCopy = async () => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    const summary = `${v1}% of ${v2} is ${res1}`;
    await Clipboard.setStringAsync(summary);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleReset = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    setVal1("");
    setVal2("");
  };

  return (
    <SafeAreaView style={styles.container} edges={["top", "bottom"]}>
      <StatusBar style="dark" />
      <CalculatorHeader
        title="Percentage Calculator"
        subtitle="Quickly calculate percentages, ratios, and proportion values."
        iconName="Percent"
        themeColor="#F97316"
        themeBg="#FFF7ED"
      />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.card}>
          <Text style={styles.inputLabel}>PERCENTAGE (%)</Text>
          <View style={styles.inputWrapper}>
            <TextInput
              style={styles.textInput}
              keyboardType="decimal-pad"
              value={val1}
              onChangeText={setVal1}
              placeholder="20"
              placeholderTextColor="#94A3B8"
            />
            <Text style={styles.suffix}>%</Text>
          </View>

          <Text style={[styles.inputLabel, { marginTop: 14 }]}>OF NUMBER</Text>
          <View style={styles.inputWrapper}>
            <TextInput
              style={styles.textInput}
              keyboardType="decimal-pad"
              value={val2}
              onChangeText={setVal2}
              placeholder="500"
              placeholderTextColor="#94A3B8"
            />
          </View>
        </View>

        <View style={styles.resultCard}>
          <View style={styles.resultHeader}>
            <Text style={styles.resultTitle}>Result</Text>
            <View style={styles.actionButtons}>
              <Pressable onPress={handleCopy} style={styles.iconBtn}>
                {copied ? <Check size={16} color="#16A34A" /> : <Copy size={16} color="#64748B" />}
              </Pressable>
              <Pressable onPress={handleReset} style={styles.iconBtn}>
                <RotateCcw size={16} color="#64748B" />
              </Pressable>
            </View>
          </View>

          <View style={styles.totalBlock}>
            <Text style={styles.totalLabel}>
              {v1}% OF {v2} IS
            </Text>
            <Text style={styles.totalValue}>{res1.toLocaleString("en-IN")}</Text>
          </View>

          <View style={styles.breakdownRow}>
            <Text style={styles.breakdownLabel}>{v1} as a percentage of {v2}:</Text>
            <Text style={styles.breakdownValue}>{res2.toFixed(2)}%</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F8FAFC" },
  scrollContent: { paddingHorizontal: 16, paddingBottom: 40 },
  card: {
    backgroundColor: "#ffffff",
    borderRadius: 20,
    padding: 16,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    marginBottom: 16,
  },
  inputLabel: { fontSize: 11, fontWeight: "800", color: "#64748B", marginBottom: 6 },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F8FAFC",
    borderWidth: 1,
    borderColor: "#CBD5E1",
    borderRadius: 14,
    paddingHorizontal: 14,
    height: 50,
  },
  suffix: { fontSize: 14, fontWeight: "700", color: "#94A3B8", marginLeft: 6 },
  textInput: { flex: 1, fontSize: 18, fontWeight: "700", color: "#0F172A" },
  resultCard: {
    backgroundColor: "#ffffff",
    borderRadius: 20,
    padding: 16,
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },
  resultHeader: { flexDirection: "row", justifyContent: "space-between", marginBottom: 12 },
  resultTitle: { fontSize: 14, fontWeight: "800", color: "#0F172A" },
  actionButtons: { flexDirection: "row", gap: 6 },
  iconBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#F1F5F9",
    justifyContent: "center",
    alignItems: "center",
  },
  totalBlock: {
    backgroundColor: "#FFF7ED",
    borderRadius: 16,
    padding: 16,
    alignItems: "center",
    marginBottom: 14,
    borderWidth: 1,
    borderColor: "#FFEDD5",
  },
  totalLabel: { fontSize: 11, fontWeight: "800", color: "#9A3412", letterSpacing: 0.5, marginBottom: 4 },
  totalValue: { fontSize: 32, fontWeight: "900", color: "#EA580C" },
  breakdownRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: "#F1F5F9",
  },
  breakdownLabel: { fontSize: 13, color: "#64748B", fontWeight: "500" },
  breakdownValue: { fontSize: 13, color: "#0F172A", fontWeight: "800" },
});
