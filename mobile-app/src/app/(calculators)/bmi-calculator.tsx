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
import { calculateBMI } from "@/lib/calculations/health";
import { Copy, RotateCcw, Check } from "lucide-react-native";

export default function BMICalculatorScreen() {
  const [weightKg, setWeightKg] = useState("68");
  const [heightCm, setHeightCm] = useState("172");
  const [copied, setCopied] = useState(false);

  const w = parseFloat(weightKg) || 0;
  const h = parseFloat(heightCm) || 0;

  const result = calculateBMI(w, h);

  const handleCopy = async () => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    const summary = `BMI Assessment:\nWeight: ${w} kg\nHeight: ${h} cm\nBMI: ${result.bmi}\nCategory: ${result.category}\nHealthy Weight Range: ${result.healthyWeightRange.min} - ${result.healthyWeightRange.max} kg`;
    await Clipboard.setStringAsync(summary);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleReset = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    setWeightKg("68");
    setHeightCm("172");
  };

  const getCategoryColor = () => {
    switch (result.category) {
      case "Normal weight":
        return "#10B981";
      case "Overweight":
        return "#F59E0B";
      case "Obesity":
        return "#EF4444";
      default:
        return "#3B82F6";
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={["top", "bottom"]}>
      <StatusBar style="dark" />
      <CalculatorHeader
        title="BMI Calculator"
        subtitle="Check Body Mass Index and healthy weight target range according to WHO guidelines."
        iconName="Activity"
        themeColor="#F43F5E"
        themeBg="#FFF1F2"
      />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.card}>
          <Text style={styles.inputLabel}>YOUR WEIGHT (KG)</Text>
          <View style={styles.inputWrapper}>
            <TextInput
              style={styles.textInput}
              keyboardType="decimal-pad"
              value={weightKg}
              onChangeText={setWeightKg}
              placeholder="68"
              placeholderTextColor="#94A3B8"
            />
            <Text style={styles.suffix}>kg</Text>
          </View>

          <Text style={[styles.inputLabel, { marginTop: 14 }]}>
            YOUR HEIGHT (CM)
          </Text>
          <View style={styles.inputWrapper}>
            <TextInput
              style={styles.textInput}
              keyboardType="number-pad"
              value={heightCm}
              onChangeText={setHeightCm}
              placeholder="172"
              placeholderTextColor="#94A3B8"
            />
            <Text style={styles.suffix}>cm</Text>
          </View>
        </View>

        <View style={styles.resultCard}>
          <View style={styles.resultHeader}>
            <Text style={styles.resultTitle}>Body Mass Index Score</Text>
            <View style={styles.actionButtons}>
              <Pressable onPress={handleCopy} style={styles.iconBtn}>
                {copied ? <Check size={16} color="#16A34A" /> : <Copy size={16} color="#64748B" />}
              </Pressable>
              <Pressable onPress={handleReset} style={styles.iconBtn}>
                <RotateCcw size={16} color="#64748B" />
              </Pressable>
            </View>
          </View>

          <View style={[styles.totalBlock, { backgroundColor: "#F8FAFC" }]}>
            <Text style={styles.totalLabel}>YOUR BMI</Text>
            <Text style={[styles.totalValue, { color: getCategoryColor() }]}>
              {result.bmi}
            </Text>
            <View style={[styles.categoryPill, { backgroundColor: getCategoryColor() }]}>
              <Text style={styles.categoryPillText}>{result.category}</Text>
            </View>
          </View>

          <View style={styles.breakdownRow}>
            <Text style={styles.breakdownLabel}>Recommended Healthy Weight:</Text>
            <Text style={styles.breakdownValue}>
              {result.healthyWeightRange.min} - {result.healthyWeightRange.max} kg
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
    borderRadius: 16,
    padding: 16,
    alignItems: "center",
    marginBottom: 14,
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },
  totalLabel: { fontSize: 11, fontWeight: "800", color: "#64748B", letterSpacing: 0.5, marginBottom: 4 },
  totalValue: { fontSize: 36, fontWeight: "900", marginBottom: 6 },
  categoryPill: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 20,
  },
  categoryPillText: { color: "#ffffff", fontSize: 12, fontWeight: "800" },
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
