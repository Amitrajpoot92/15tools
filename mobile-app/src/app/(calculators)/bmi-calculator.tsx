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
import { Copy, RotateCcw, Check, Activity } from "lucide-react-native";

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
      const lbs = parseFloat(weightLb);
      w = lbs * 0.453592; // lbs to kg
      const ft = parseFloat(heightFt) || 0;
      const inch = parseFloat(heightIn) || 0;
      const totalInches = ft * 12 + inch;
      hInMeters = totalInches * 0.0254; // inches to meters
    }

    if (!isNaN(w) && w > 0 && hInMeters > 0) {
      const bmiVal = w / (hInMeters * hInMeters);
      return bmiVal;
    }
    return 0;
  };

  const bmi = calculate();
  const bmiStr = bmi > 0 ? bmi.toFixed(1) : "0.0";

  const getBMICategory = (bmiVal: number) => {
    if (bmiVal === 0) return "Enter your details";
    if (bmiVal < 18.5) return "Underweight";
    if (bmiVal >= 18.5 && bmiVal <= 24.9) return "Healthy Weight";
    if (bmiVal >= 25 && bmiVal <= 29.9) return "Overweight";
    if (bmiVal >= 30) return "Obesity";
    return "";
  };

  const category = getBMICategory(bmi);

  const handleCopy = async () => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    const text = `BMI Calculator\n${
      unitSystem === "metric"
        ? `Weight: ${weightKg || 0} kg\nHeight: ${heightCm || 0} cm`
        : `Weight: ${weightLb || 0} lbs\nHeight: ${heightFt || 0} ft ${
            heightIn || 0
          } in`
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
    <SafeAreaView style={styles.container} edges={["top", "bottom"]}>
      <StatusBar style="dark" />
      <CalculatorHeader
        title="BMI Calculator"
        subtitle="Calculate your Body Mass Index (BMI) to check your health and fitness level."
        iconName="Activity"
        themeColor="#059669"
        themeBg="#ECFDF5"
      />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {/* Unit System Toggle */}
        <View style={styles.tabContainer}>
          <Pressable
            style={[styles.tab, unitSystem === "metric" && styles.tabActive]}
            onPress={() => {
              Haptics.selectionAsync();
              setUnitSystem("metric");
            }}
          >
            <Text
              style={[
                styles.tabText,
                unitSystem === "metric" && styles.tabTextActive,
              ]}
            >
              Metric (kg / cm)
            </Text>
          </Pressable>
          <Pressable
            style={[styles.tab, unitSystem === "us" && styles.tabActive]}
            onPress={() => {
              Haptics.selectionAsync();
              setUnitSystem("us");
            }}
          >
            <Text
              style={[
                styles.tabText,
                unitSystem === "us" && styles.tabTextActive,
              ]}
            >
              US (lb / ft)
            </Text>
          </Pressable>
        </View>

        {/* Input Card */}
        <View style={styles.inputCard}>
          {unitSystem === "metric" ? (
            <>
              {/* Metric: Weight */}
              <Text style={styles.inputLabel}>WEIGHT (KG)</Text>
              <View style={styles.inputWrapper}>
                <TextInput
                  style={styles.textInputWithSuffix}
                  keyboardType="numeric"
                  value={weightKg}
                  onChangeText={setWeightKg}
                  placeholder="70"
                  placeholderTextColor="#94A3B8"
                />
                <Text style={styles.unitSuffix}>kg</Text>
              </View>

              {/* Metric: Height */}
              <Text style={[styles.inputLabel, { marginTop: 16 }]}>
                HEIGHT (CM)
              </Text>
              <View style={styles.inputWrapper}>
                <TextInput
                  style={styles.textInputWithSuffix}
                  keyboardType="numeric"
                  value={heightCm}
                  onChangeText={setHeightCm}
                  placeholder="175"
                  placeholderTextColor="#94A3B8"
                />
                <Text style={styles.unitSuffix}>cm</Text>
              </View>
            </>
          ) : (
            <>
              {/* US: Weight */}
              <Text style={styles.inputLabel}>WEIGHT (LB)</Text>
              <View style={styles.inputWrapper}>
                <TextInput
                  style={styles.textInputWithSuffix}
                  keyboardType="numeric"
                  value={weightLb}
                  onChangeText={setWeightLb}
                  placeholder="154"
                  placeholderTextColor="#94A3B8"
                />
                <Text style={styles.unitSuffix}>lb</Text>
              </View>

              {/* US: Height Ft & In */}
              <Text style={[styles.inputLabel, { marginTop: 16 }]}>
                HEIGHT (FT / IN)
              </Text>
              <View style={styles.rowInputs}>
                <View style={styles.halfInputWrapper}>
                  <TextInput
                    style={styles.textInputWithSuffix}
                    keyboardType="numeric"
                    value={heightFt}
                    onChangeText={setHeightFt}
                    placeholder="5"
                    placeholderTextColor="#94A3B8"
                  />
                  <Text style={styles.unitSuffix}>ft</Text>
                </View>
                <View style={styles.halfInputWrapper}>
                  <TextInput
                    style={styles.textInputWithSuffix}
                    keyboardType="numeric"
                    value={heightIn}
                    onChangeText={setHeightIn}
                    placeholder="9"
                    placeholderTextColor="#94A3B8"
                  />
                  <Text style={styles.unitSuffix}>in</Text>
                </View>
              </View>
            </>
          )}
        </View>

        {/* Result Card */}
        <View style={styles.resultCard}>
          <View style={styles.resultHeader}>
            <View style={styles.resultHeaderLeft}>
              <View style={styles.resultDot} />
              <Text style={styles.resultTitle}>BMI RESULT</Text>
            </View>
            <View style={styles.actionButtons}>
              <Pressable
                style={({ pressed }) => [
                  styles.actionBtn,
                  pressed && { opacity: 0.7 },
                ]}
                onPress={handleCopy}
              >
                {copied ? (
                  <Check size={14} color="#059669" />
                ) : (
                  <Copy size={14} color="#059669" />
                )}
                <Text
                  style={[
                    styles.actionBtnText,
                    copied && { color: "#059669" },
                  ]}
                >
                  {copied ? "Copied" : "Copy"}
                </Text>
              </Pressable>

              <Pressable
                style={({ pressed }) => [
                  styles.actionBtnIcon,
                  pressed && { opacity: 0.7 },
                ]}
                onPress={handleReset}
              >
                <RotateCcw size={14} color="#059669" />
              </Pressable>
            </View>
          </View>

          {/* Main Hero Result */}
          <View style={styles.heroBox}>
            <Text style={styles.heroSubTitle}>YOUR BMI</Text>
            <Text style={styles.heroValue}>{bmiStr}</Text>
            <View style={styles.badgePill}>
              <Text style={styles.badgePillText}>{category}</Text>
            </View>
          </View>

          {/* Healthy Range Card */}
          <View style={styles.healthyRangeCard}>
            <Text style={styles.healthyRangeLabel}>HEALTHY BMI RANGE</Text>
            <Text style={styles.healthyRangeValue}>18.5 – 24.9</Text>
          </View>
        </View>

        {/* Adult BMI Categories Table */}
        <View style={styles.categoriesCard}>
          <Text style={styles.categoriesTitle}>Adult BMI Categories</Text>
          <View style={styles.catRow}>
            <Text style={styles.catName}>Underweight</Text>
            <Text style={styles.catRange}>Below 18.5</Text>
          </View>
          <View style={styles.catRow}>
            <Text style={styles.catName}>Healthy Weight</Text>
            <Text style={[styles.catRange, { color: "#059669" }]}>
              18.5 – 24.9
            </Text>
          </View>
          <View style={styles.catRow}>
            <Text style={styles.catName}>Overweight</Text>
            <Text style={[styles.catRange, { color: "#D97706" }]}>
              25.0 – 29.9
            </Text>
          </View>
          <View style={styles.catRow}>
            <Text style={styles.catName}>Obesity</Text>
            <Text style={[styles.catRange, { color: "#DC2626" }]}>
              30.0 or above
            </Text>
          </View>
        </View>

        {/* Medical Disclaimer */}
        <View style={styles.disclaimerCard}>
          <Text style={styles.disclaimerText}>
            <Text style={styles.disclaimerBold}>Disclaimer: </Text>
            This BMI calculator is for general informational purposes and is not
            a medical diagnosis. BMI is a screening measure and does not directly
            measure body fat. Results may not be suitable for children,
            pregnant people, or athletes. Consult a healthcare professional for
            medical advice.
          </Text>
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
    paddingHorizontal: 16,
    paddingBottom: 40,
  },
  tabContainer: {
    flexDirection: "row",
    backgroundColor: "#F1F5F9",
    borderRadius: 14,
    padding: 4,
    marginBottom: 16,
  },
  tab: {
    flex: 1,
    paddingVertical: 10,
    alignItems: "center",
    borderRadius: 10,
  },
  tabActive: {
    backgroundColor: "#FFFFFF",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 3,
    elevation: 2,
  },
  tabText: {
    fontSize: 12,
    fontWeight: "700",
    color: "#64748B",
  },
  tabTextActive: {
    color: "#047857",
  },
  inputCard: {
    backgroundColor: "#ECFDF5",
    borderRadius: 20,
    padding: 16,
    borderWidth: 1,
    borderColor: "#D1FAE5",
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 11,
    fontWeight: "800",
    color: "#065F46",
    letterSpacing: 0.6,
    marginBottom: 8,
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#A7F3D0",
  },
  rowInputs: {
    flexDirection: "row",
    gap: 10,
  },
  halfInputWrapper: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#A7F3D0",
  },
  textInputWithSuffix: {
    flex: 1,
    height: 50,
    fontSize: 18,
    fontWeight: "700",
    color: "#0F172A",
    paddingLeft: 16,
  },
  unitSuffix: {
    paddingRight: 16,
    fontSize: 14,
    fontWeight: "800",
    color: "#94A3B8",
  },
  resultCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 24,
    padding: 18,
    borderWidth: 1,
    borderColor: "#A7F3D0",
    shadowColor: "#059669",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.08,
    shadowRadius: 16,
    elevation: 3,
  },
  resultHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  resultHeaderLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  resultDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#059669",
  },
  resultTitle: {
    fontSize: 11,
    fontWeight: "800",
    color: "#065F46",
    letterSpacing: 0.8,
  },
  actionButtons: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  actionBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    backgroundColor: "#ECFDF5",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#A7F3D0",
  },
  actionBtnText: {
    fontSize: 11,
    fontWeight: "700",
    color: "#059669",
  },
  actionBtnIcon: {
    backgroundColor: "#ECFDF5",
    padding: 6,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#A7F3D0",
  },
  heroBox: {
    backgroundColor: "#ECFDF5",
    borderRadius: 18,
    paddingVertical: 20,
    paddingHorizontal: 16,
    alignItems: "center",
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#A7F3D0",
  },
  heroSubTitle: {
    fontSize: 10,
    fontWeight: "800",
    color: "#047857",
    letterSpacing: 1.2,
    marginBottom: 4,
  },
  heroValue: {
    fontSize: 42,
    fontWeight: "900",
    color: "#064E3B",
    letterSpacing: -0.5,
  },
  badgePill: {
    backgroundColor: "#D1FAE5",
    paddingHorizontal: 14,
    paddingVertical: 5,
    borderRadius: 20,
    marginTop: 8,
  },
  badgePillText: {
    fontSize: 12,
    fontWeight: "800",
    color: "#065F46",
  },
  healthyRangeCard: {
    backgroundColor: "#F8FAFC",
    borderRadius: 14,
    paddingVertical: 12,
    paddingHorizontal: 14,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#F1F5F9",
  },
  healthyRangeLabel: {
    fontSize: 10,
    fontWeight: "800",
    color: "#059669",
    letterSpacing: 0.8,
    marginBottom: 2,
  },
  healthyRangeValue: {
    fontSize: 18,
    fontWeight: "900",
    color: "#0F172A",
  },
  categoriesCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 16,
    marginTop: 16,
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },
  categoriesTitle: {
    fontSize: 13,
    fontWeight: "800",
    color: "#0F172A",
    textAlign: "center",
    marginBottom: 12,
  },
  catRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 9,
    paddingHorizontal: 12,
    borderRadius: 10,
    backgroundColor: "#F8FAFC",
    marginBottom: 6,
    borderWidth: 1,
    borderColor: "#F1F5F9",
  },
  catName: {
    fontSize: 12,
    fontWeight: "700",
    color: "#334155",
  },
  catRange: {
    fontSize: 12,
    fontWeight: "800",
    color: "#0F172A",
  },
  disclaimerCard: {
    backgroundColor: "#F8FAFC",
    borderRadius: 16,
    padding: 14,
    marginTop: 16,
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },
  disclaimerText: {
    fontSize: 11,
    color: "#64748B",
    lineHeight: 16,
    textAlign: "center",
  },
  disclaimerBold: {
    fontWeight: "700",
    color: "#334155",
  },
});
