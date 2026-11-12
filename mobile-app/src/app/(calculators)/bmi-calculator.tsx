import React, { useState } from "react";
import { View, Text, TextInput, ScrollView, StyleSheet } from "react-native";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import * as Haptics from "expo-haptics";
import * as Clipboard from "expo-clipboard";
import { CalculatorHeader } from "@/components/CalculatorHeader";
import {
  OuterToolCard,
  FormPanel,
  ResultPanel,
  SegmentedTabs,
  CopyResetActions,
  DisclaimerNote,
  THEMES,
  sharedStyles,
} from "@/components/CalculatorUI";
import { Activity } from "lucide-react-native";

const BMI_CATEGORIES = [
  { label: "Underweight", range: "< 18.5", color: "#0284C7", bg: "#E0F2FE" },
  { label: "Healthy Weight", range: "18.5 – 24.9", color: "#059669", bg: "#D1FAE5" },
  { label: "Overweight", range: "25.0 – 29.9", color: "#D97706", bg: "#FEF3C7" },
  { label: "Obesity", range: "30.0 or higher", color: "#E11D48", bg: "#FFE4E6" },
];

export default function BMICalculatorScreen() {
  const [unitSystem, setUnitSystem] = useState<"metric" | "us">("metric");
  const [weightKg, setWeightKg] = useState("");
  const [heightCm, setHeightCm] = useState("");
  const [weightLb, setWeightLb] = useState("");
  const [heightFt, setHeightFt] = useState("");
  const [heightIn, setHeightIn] = useState("");
  const [copied, setCopied] = useState(false);

  const calculate = () => {
    let w = 0;
    let hInMeters = 0;
    if (unitSystem === "metric") {
      w = parseFloat(weightKg);
      hInMeters = parseFloat(heightCm) / 100;
    } else {
      w = parseFloat(weightLb) * 0.453592;
      const ft = parseFloat(heightFt) || 0;
      const inch = parseFloat(heightIn) || 0;
      hInMeters = (ft * 12 + inch) * 0.0254;
    }
    if (!isNaN(w) && w > 0 && hInMeters > 0) return w / (hInMeters * hInMeters);
    return 0;
  };

  const bmi = calculate();
  const bmiStr = bmi > 0 ? bmi.toFixed(1) : "0.0";

  const getBMICategory = (bmiVal: number) => {
    if (bmiVal === 0) return "Enter your details";
    if (bmiVal < 18.5) return "Underweight";
    if (bmiVal <= 24.9) return "Healthy Weight";
    if (bmiVal <= 29.9) return "Overweight";
    return "Obesity";
  };

  const category = getBMICategory(bmi);
  const categoryColor =
    bmi === 0
      ? "#475569"
      : bmi < 18.5
      ? "#0284C7"
      : bmi <= 24.9
      ? "#059669"
      : bmi <= 29.9
      ? "#D97706"
      : "#E11D48";

  const handleCopy = async () => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    const text = `BMI Calculator\n${
      unitSystem === "metric"
        ? `Weight: ${weightKg || 0} kg\nHeight: ${heightCm || 0} cm`
        : `Weight: ${weightLb || 0} lbs\nHeight: ${heightFt || 0} ft ${heightIn || 0} in`
    }\nBMI: ${bmiStr}\nCategory: ${category}\n\nCalculate Online: https://topcalcbox.com/bmi-calculator/`;
    await Clipboard.setStringAsync(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleReset = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    setWeightKg("");
    setHeightCm("");
    setWeightLb("");
    setHeightFt("");
    setHeightIn("");
  };

  return (
    <SafeAreaView style={sharedStyles.safeArea} edges={["top", "bottom"]}>
      <StatusBar style="dark" />
      <CalculatorHeader
        title="BMI Calculator"
        subtitle="Calculate your Body Mass Index (BMI) to check your health and fitness level."
        iconName="Activity"
        color="emerald"
      />

      <ScrollView
        contentContainerStyle={sharedStyles.scrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <OuterToolCard>
          <SegmentedTabs
            value={unitSystem}
            onChange={setUnitSystem}
            accentColor={THEMES.emerald.accentDark}
            options={[
              { key: "metric", label: "Metric (kg / cm)" },
              { key: "us", label: "US Units (lbs / ft)" },
            ]}
          />

          <FormPanel theme="emerald">
            {unitSystem === "metric" ? (
              <View>
                <Text style={sharedStyles.fieldLabel}>Weight (kg)</Text>
                <View style={sharedStyles.inputBox}>
                  <TextInput
                    style={sharedStyles.textInput}
                    keyboardType="numeric"
                    value={weightKg}
                    onChangeText={setWeightKg}
                    placeholder="e.g. 70"
                    placeholderTextColor="#94A3B8"
                  />
                  <Text style={sharedStyles.affix}>kg</Text>
                </View>

                <Text style={[sharedStyles.fieldLabel, { marginTop: 14 }]}>Height (cm)</Text>
                <View style={sharedStyles.inputBox}>
                  <TextInput
                    style={sharedStyles.textInput}
                    keyboardType="numeric"
                    value={heightCm}
                    onChangeText={setHeightCm}
                    placeholder="e.g. 175"
                    placeholderTextColor="#94A3B8"
                  />
                  <Text style={sharedStyles.affix}>cm</Text>
                </View>
              </View>
            ) : (
              <View>
                <Text style={sharedStyles.fieldLabel}>Weight (lbs)</Text>
                <View style={sharedStyles.inputBox}>
                  <TextInput
                    style={sharedStyles.textInput}
                    keyboardType="numeric"
                    value={weightLb}
                    onChangeText={setWeightLb}
                    placeholder="e.g. 154"
                    placeholderTextColor="#94A3B8"
                  />
                  <Text style={sharedStyles.affix}>lbs</Text>
                </View>

                <View style={[sharedStyles.grid2, { marginTop: 14 }]}>
                  <View style={{ flex: 1 }}>
                    <Text style={sharedStyles.fieldLabel}>Height (Feet)</Text>
                    <View style={sharedStyles.inputBox}>
                      <TextInput
                        style={sharedStyles.textInput}
                        keyboardType="numeric"
                        value={heightFt}
                        onChangeText={setHeightFt}
                        placeholder="5"
                        placeholderTextColor="#94A3B8"
                      />
                      <Text style={sharedStyles.affix}>ft</Text>
                    </View>
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={sharedStyles.fieldLabel}>Inches</Text>
                    <View style={sharedStyles.inputBox}>
                      <TextInput
                        style={sharedStyles.textInput}
                        keyboardType="numeric"
                        value={heightIn}
                        onChangeText={setHeightIn}
                        placeholder="9"
                        placeholderTextColor="#94A3B8"
                      />
                      <Text style={sharedStyles.affix}>in</Text>
                    </View>
                  </View>
                </View>
              </View>
            )}
          </FormPanel>

          <ResultPanel theme="emerald">
            <View style={sharedStyles.resultHeaderRow}>
              <View style={styles.kickerRow}>
                <Activity size={15} color="#059669" />
                <Text style={sharedStyles.resultKicker}>Your Body Mass Index</Text>
              </View>
              <CopyResetActions copied={copied} onCopy={handleCopy} onReset={handleReset} theme="emerald" />
            </View>

            <View style={styles.heroRow}>
              <Text style={[sharedStyles.heroValue, { color: "#064E3B" }]}>{bmiStr}</Text>
              <View style={[styles.catBadge, { backgroundColor: "#FFFFFF", borderColor: categoryColor }]}>
                <Text style={[styles.catBadgeText, { color: categoryColor }]}>{category}</Text>
              </View>
            </View>

            <View style={styles.healthyCard}>
              <Text style={styles.healthyText}>Healthy BMI Range: 18.5 – 24.9</Text>
            </View>

            <View style={styles.tableCard}>
              <Text style={styles.tableHeader}>Adult BMI Categories</Text>
              {BMI_CATEGORIES.map((row) => {
                const active = category === row.label;
                return (
                  <View
                    key={row.label}
                    style={[
                      styles.tableRow,
                      active && { backgroundColor: row.bg, borderColor: row.color },
                    ]}
                  >
                    <Text style={[styles.tableLabel, active && { color: row.color, fontWeight: "800" }]}>
                      {row.label}
                    </Text>
                    <Text style={[styles.tableRange, active && { color: row.color, fontWeight: "800" }]}>
                      {row.range}
                    </Text>
                  </View>
                );
              })}
            </View>
          </ResultPanel>

          <DisclaimerNote text="Disclaimer: This BMI calculator is for general informational purposes and is not a medical diagnosis. BMI is a screening measure and does not directly measure body fat. Results may not be suitable for children, teenagers, pregnant people, or some athletes. Consult a qualified healthcare professional for personal medical advice." />
        </OuterToolCard>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  kickerRow: { flexDirection: "row", alignItems: "center", gap: 6, flex: 1 },
  heroRow: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", gap: 8 },
  catBadge: {
    borderWidth: 1.5,
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 999,
  },
  catBadgeText: { fontSize: 12, fontWeight: "800" },
  healthyCard: {
    marginTop: 10,
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#A7F3D0",
    paddingHorizontal: 12,
    paddingVertical: 7,
    alignItems: "center",
  },
  healthyText: { fontSize: 12, fontWeight: "800", color: "#065F46" },
  tableCard: {
    marginTop: 10,
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: "#A7F3D0",
    padding: 10,
    gap: 4,
  },
  tableHeader: {
    fontSize: 11,
    fontWeight: "800",
    color: "#065F46",
    textTransform: "uppercase",
    marginBottom: 4,
  },
  tableRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "transparent",
  },
  tableLabel: { fontSize: 12, fontWeight: "600", color: "#334155" },
  tableRange: { fontSize: 12, fontWeight: "700", color: "#0F172A" },
});
