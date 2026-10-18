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
import { Copy, RotateCcw, Check, Flame } from "lucide-react-native";

const ACTIVITY_LEVELS = [
  { value: "1.2", label: "Sedentary", desc: "Little or no exercise" },
  { value: "1.375", label: "Lightly Active", desc: "Exercise 1-3 days/week" },
  { value: "1.55", label: "Moderately Active", desc: "Exercise 3-5 days/week" },
  { value: "1.725", label: "Very Active", desc: "Hard exercise 6-7 days/week" },
  { value: "1.9", label: "Extra Active", desc: "Very hard exercise/physical job" },
];

export default function CalorieCalculatorScreen() {
  const [unitSystem, setUnitSystem] = useState<"metric" | "us">("metric");
  const [gender, setGender] = useState<"male" | "female">("male");
  const [age, setAge] = useState("");

  const [weightKg, setWeightKg] = useState("");
  const [heightCm, setHeightCm] = useState("");

  const [weightLb, setWeightLb] = useState("");
  const [heightFt, setHeightFt] = useState("");
  const [heightIn, setHeightIn] = useState("");

  const [activity, setActivity] = useState("1.55");
  const [copied, setCopied] = useState(false);

  const calculate = () => {
    let w = 0;
    let h = 0;
    const a = parseFloat(age) || 0;
    const act = parseFloat(activity) || 1.2;

    if (unitSystem === "metric") {
      w = parseFloat(weightKg);
      h = parseFloat(heightCm);
    } else {
      const lbs = parseFloat(weightLb);
      w = lbs * 0.453592;
      const ft = parseFloat(heightFt) || 0;
      const inch = parseFloat(heightIn) || 0;
      const totalInches = ft * 12 + inch;
      h = totalInches * 2.54;
    }

    if (!isNaN(w) && !isNaN(h) && w > 0 && h > 0 && a > 0) {
      let bmr = 10 * w + 6.25 * h - 5 * a;
      if (gender === "male") {
        bmr += 5;
      } else {
        bmr -= 161;
      }

      const maintenance = bmr * act;
      const weightLoss = maintenance - 500;
      const weightGain = maintenance + 500;

      return {
        maintenance: Math.round(maintenance),
        weightLoss: Math.round(weightLoss),
        weightGain: Math.round(weightGain),
        hasValues: true,
      };
    }

    return { maintenance: 0, weightLoss: 0, weightGain: 0, hasValues: false };
  };

  const { maintenance, weightLoss, weightGain, hasValues } = calculate();

  const handleCopy = async () => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    const text = `Calorie Calculator\n${
      unitSystem === "metric"
        ? `Weight: ${weightKg || 0} kg\nHeight: ${heightCm || 0} cm`
        : `Weight: ${weightLb || 0} lbs\nHeight: ${heightFt || 0} ft ${
            heightIn || 0
          } in`
    }\nAge: ${age || 0}\nGender: ${gender}\nMaintain Weight: ${maintenance} kcal/day\nWeight Loss: ${weightLoss} kcal/day\nWeight Gain: ${weightGain} kcal/day\n\nCalculate Online: https://topcalcbox.com/calorie-calculator/`;
    await Clipboard.setStringAsync(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleReset = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    setAge("");
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
        title="Calorie Calculator"
        subtitle="Determine your daily calorie needs for weight loss, gain, or maintenance."
        iconName="Flame"
        themeColor="#EA580C"
        themeBg="#FFEDD5"
      />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {/* Unit & Gender Toggles */}
        <View style={styles.togglesRow}>
          {/* Unit System */}
          <View style={styles.toggleCol}>
            <Text style={styles.toggleSectionLabel}>UNIT SYSTEM</Text>
            <View style={styles.tabToggle}>
              <Pressable
                style={[
                  styles.toggleBtn,
                  unitSystem === "metric" && styles.toggleBtnActive,
                ]}
                onPress={() => {
                  Haptics.selectionAsync();
                  setUnitSystem("metric");
                }}
              >
                <Text
                  style={[
                    styles.toggleBtnText,
                    unitSystem === "metric" && styles.toggleBtnTextActive,
                  ]}
                >
                  Metric
                </Text>
              </Pressable>
              <Pressable
                style={[
                  styles.toggleBtn,
                  unitSystem === "us" && styles.toggleBtnActive,
                ]}
                onPress={() => {
                  Haptics.selectionAsync();
                  setUnitSystem("us");
                }}
              >
                <Text
                  style={[
                    styles.toggleBtnText,
                    unitSystem === "us" && styles.toggleBtnTextActive,
                  ]}
                >
                  Imperial
                </Text>
              </Pressable>
            </View>
          </View>

          {/* Gender */}
          <View style={styles.toggleCol}>
            <Text style={styles.toggleSectionLabel}>GENDER</Text>
            <View style={styles.tabToggle}>
              <Pressable
                style={[
                  styles.toggleBtn,
                  gender === "male" && styles.toggleBtnActive,
                ]}
                onPress={() => {
                  Haptics.selectionAsync();
                  setGender("male");
                }}
              >
                <Text
                  style={[
                    styles.toggleBtnText,
                    gender === "male" && styles.toggleBtnTextActive,
                  ]}
                >
                  Male
                </Text>
              </Pressable>
              <Pressable
                style={[
                  styles.toggleBtn,
                  gender === "female" && styles.toggleBtnActive,
                ]}
                onPress={() => {
                  Haptics.selectionAsync();
                  setGender("female");
                }}
              >
                <Text
                  style={[
                    styles.toggleBtnText,
                    gender === "female" && styles.toggleBtnTextActive,
                  ]}
                >
                  Female
                </Text>
              </Pressable>
            </View>
          </View>
        </View>

        {/* Input Card */}
        <View style={styles.inputCard}>
          <View style={styles.rowInputs}>
            {/* Age */}
            <View style={styles.halfCol}>
              <Text style={styles.inputLabel}>AGE (YEARS)</Text>
              <View style={styles.inputWrapper}>
                <TextInput
                  style={styles.textInput}
                  keyboardType="numeric"
                  value={age}
                  onChangeText={setAge}
                  placeholder="30"
                  placeholderTextColor="#94A3B8"
                />
              </View>
            </View>

            {/* Weight */}
            <View style={styles.halfCol}>
              <Text style={styles.inputLabel}>
                WEIGHT ({unitSystem === "metric" ? "KG" : "LB"})
              </Text>
              <View style={styles.inputWrapper}>
                <TextInput
                  style={styles.textInputWithSuffix}
                  keyboardType="numeric"
                  value={unitSystem === "metric" ? weightKg : weightLb}
                  onChangeText={
                    unitSystem === "metric" ? setWeightKg : setWeightLb
                  }
                  placeholder={unitSystem === "metric" ? "70" : "154"}
                  placeholderTextColor="#94A3B8"
                />
                <Text style={styles.unitSuffix}>
                  {unitSystem === "metric" ? "kg" : "lb"}
                </Text>
              </View>
            </View>
          </View>

          {/* Height */}
          {unitSystem === "metric" ? (
            <View style={{ marginTop: 14 }}>
              <Text style={styles.inputLabel}>HEIGHT (CM)</Text>
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
            </View>
          ) : (
            <View style={{ marginTop: 14 }}>
              <Text style={styles.inputLabel}>HEIGHT (FT / IN)</Text>
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
            </View>
          )}

          {/* Activity Level Selector */}
          <Text style={[styles.inputLabel, { marginTop: 16 }]}>
            ACTIVITY LEVEL
          </Text>
          <View style={styles.activityList}>
            {ACTIVITY_LEVELS.map((item) => (
              <Pressable
                key={item.value}
                style={[
                  styles.activityItem,
                  activity === item.value && styles.activityItemActive,
                ]}
                onPress={() => {
                  Haptics.selectionAsync();
                  setActivity(item.value);
                }}
              >
                <View style={styles.activityRadio}>
                  {activity === item.value && (
                    <View style={styles.activityRadioInner} />
                  )}
                </View>
                <View style={styles.activityInfo}>
                  <Text
                    style={[
                      styles.activityLabel,
                      activity === item.value && styles.activityLabelActive,
                    ]}
                  >
                    {item.label}
                  </Text>
                  <Text style={styles.activityDesc}>{item.desc}</Text>
                </View>
              </Pressable>
            ))}
          </View>
        </View>

        {/* Result Card */}
        <View style={styles.resultCard}>
          <View style={styles.resultHeader}>
            <View style={styles.resultHeaderLeft}>
              <View style={styles.resultDot} />
              <Text style={styles.resultTitle}>CALORIE RESULT</Text>
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

          {/* Hero Maintain Weight */}
          <View style={styles.heroBox}>
            <Text style={styles.heroSubTitle}>MAINTAIN WEIGHT</Text>
            <View style={styles.heroValueRow}>
              <Text style={styles.heroValue}>
                {maintenance.toLocaleString("en-IN")}
              </Text>
              <Text style={styles.heroUnit}>kcal</Text>
            </View>
            <View style={styles.badgePill}>
              <Text style={styles.badgePillText}>Daily Calorie Target</Text>
            </View>
          </View>

          {/* Weight loss & gain sub cards */}
          <View style={styles.gridRow}>
            <View style={styles.gridCard}>
              <Text style={styles.gridCardValue}>
                {weightLoss.toLocaleString("en-IN")}
              </Text>
              <Text style={styles.gridCardLabel}>WEIGHT LOSS</Text>
              <Text style={styles.gridCardSubLabel}>(-0.5kg/week)</Text>
            </View>
            <View style={styles.gridCard}>
              <Text style={styles.gridCardValue}>
                {weightGain.toLocaleString("en-IN")}
              </Text>
              <Text style={styles.gridCardLabel}>WEIGHT GAIN</Text>
              <Text style={styles.gridCardSubLabel}>(+0.5kg/week)</Text>
            </View>
          </View>
        </View>

        {/* Disclaimer */}
        <View style={styles.disclaimerCard}>
          <Text style={styles.disclaimerText}>
            <Text style={styles.disclaimerBold}>Disclaimer: </Text>
            This calorie calculator provides an estimate for general
            informational purposes and is not medical advice. Actual calorie
            needs can vary based on body composition, health, lifestyle, and
            genetics. Consult a qualified healthcare professional or dietitian.
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
  togglesRow: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 16,
  },
  toggleCol: {
    flex: 1,
  },
  toggleSectionLabel: {
    fontSize: 10,
    fontWeight: "800",
    color: "#64748B",
    letterSpacing: 0.8,
    marginBottom: 6,
    textAlign: "center",
  },
  tabToggle: {
    flexDirection: "row",
    backgroundColor: "#F1F5F9",
    borderRadius: 12,
    padding: 3,
  },
  toggleBtn: {
    flex: 1,
    paddingVertical: 7,
    alignItems: "center",
    borderRadius: 9,
  },
  toggleBtnActive: {
    backgroundColor: "#FFFFFF",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 2,
    elevation: 2,
  },
  toggleBtnText: {
    fontSize: 11,
    fontWeight: "700",
    color: "#64748B",
  },
  toggleBtnTextActive: {
    color: "#059669",
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
    marginBottom: 6,
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
  halfCol: {
    flex: 1,
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
  textInput: {
    flex: 1,
    height: 48,
    fontSize: 16,
    fontWeight: "700",
    color: "#0F172A",
    paddingHorizontal: 14,
  },
  textInputWithSuffix: {
    flex: 1,
    height: 48,
    fontSize: 16,
    fontWeight: "700",
    color: "#0F172A",
    paddingLeft: 14,
  },
  unitSuffix: {
    paddingRight: 14,
    fontSize: 13,
    fontWeight: "800",
    color: "#94A3B8",
  },
  activityList: {
    gap: 6,
    marginTop: 4,
  },
  activityItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 12,
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#A7F3D0",
  },
  activityItemActive: {
    borderColor: "#059669",
    backgroundColor: "#F0FDF4",
  },
  activityRadio: {
    width: 18,
    height: 18,
    borderRadius: 9,
    borderWidth: 2,
    borderColor: "#059669",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },
  activityRadioInner: {
    width: 9,
    height: 9,
    borderRadius: 4.5,
    backgroundColor: "#059669",
  },
  activityInfo: {
    flex: 1,
  },
  activityLabel: {
    fontSize: 12,
    fontWeight: "800",
    color: "#334155",
  },
  activityLabelActive: {
    color: "#065F46",
  },
  activityDesc: {
    fontSize: 10,
    fontWeight: "600",
    color: "#64748B",
    marginTop: 1,
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
  heroValueRow: {
    flexDirection: "row",
    alignItems: "baseline",
    gap: 6,
  },
  heroValue: {
    fontSize: 40,
    fontWeight: "900",
    color: "#064E3B",
    letterSpacing: -0.5,
  },
  heroUnit: {
    fontSize: 18,
    fontWeight: "800",
    color: "#059669",
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
  gridRow: {
    flexDirection: "row",
    gap: 10,
  },
  gridCard: {
    flex: 1,
    backgroundColor: "#F8FAFC",
    borderRadius: 14,
    paddingVertical: 12,
    paddingHorizontal: 10,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#F1F5F9",
  },
  gridCardValue: {
    fontSize: 18,
    fontWeight: "800",
    color: "#0F172A",
    marginBottom: 2,
  },
  gridCardLabel: {
    fontSize: 10,
    fontWeight: "800",
    color: "#334155",
    letterSpacing: 0.6,
  },
  gridCardSubLabel: {
    fontSize: 10,
    fontWeight: "700",
    color: "#059669",
    marginTop: 1,
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
