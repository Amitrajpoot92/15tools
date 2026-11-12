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
  SegmentedTabs,
  CopyResetActions,
  StatTile,
  DisclaimerNote,
  THEMES,
  sharedStyles,
} from "@/components/CalculatorUI";
import { Flame } from "lucide-react-native";

const ACTIVITY_LEVELS = [
  { value: "1.2", label: "Sedentary", desc: "Little or no exercise" },
  { value: "1.375", label: "Lightly Active", desc: "Exercise 1–3 days/week" },
  { value: "1.55", label: "Moderately Active", desc: "Exercise 3–5 days/week" },
  { value: "1.725", label: "Very Active", desc: "Hard exercise 6–7 days/week" },
  { value: "1.9", label: "Extra Active", desc: "Very hard exercise / physical job" },
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
      w = parseFloat(weightLb) * 0.453592;
      const ft = parseFloat(heightFt) || 0;
      const inch = parseFloat(heightIn) || 0;
      h = (ft * 12 + inch) * 2.54;
    }

    if (!isNaN(w) && !isNaN(h) && w > 0 && h > 0 && a > 0) {
      let bmr = 10 * w + 6.25 * h - 5 * a;
      bmr += gender === "male" ? 5 : -161;
      const maintenance = bmr * act;
      return {
        maintenance: Math.round(maintenance),
        weightLoss: Math.round(maintenance - 500),
        weightGain: Math.round(maintenance + 500),
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
        : `Weight: ${weightLb || 0} lbs\nHeight: ${heightFt || 0} ft ${heightIn || 0} in`
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
    setGender("male");
    setActivity("1.55");
  };

  return (
    <SafeAreaView style={sharedStyles.safeArea} edges={["top", "bottom"]}>
      <StatusBar style="dark" />
      <CalculatorHeader
        title="Calorie Calculator"
        subtitle="Estimate your daily calorie needs based on your body and activity."
        iconName="Flame"
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
            <Text style={sharedStyles.fieldLabel}>Gender</Text>
            <View style={sharedStyles.grid2}>
              {(["male", "female"] as const).map((g) => {
                const active = gender === g;
                return (
                  <Pressable
                    key={g}
                    onPress={() => {
                      Haptics.selectionAsync();
                      setGender(g);
                    }}
                    style={[styles.genderBtn, active && styles.genderBtnActive]}
                  >
                    <Text style={[styles.genderText, active && styles.genderTextActive]}>
                      {g === "male" ? "Male" : "Female"}
                    </Text>
                  </Pressable>
                );
              })}
            </View>

            <Text style={[sharedStyles.fieldLabel, { marginTop: 12 }]}>Age (Years)</Text>
            <View style={sharedStyles.inputBox}>
              <TextInput
                style={sharedStyles.textInput}
                keyboardType="numeric"
                value={age}
                onChangeText={setAge}
                placeholder="e.g. 25"
                placeholderTextColor="#94A3B8"
              />
              <Text style={sharedStyles.affix}>Years</Text>
            </View>

            {unitSystem === "metric" ? (
              <View style={[sharedStyles.grid2, { marginTop: 12 }]}>
                <View style={{ flex: 1 }}>
                  <Text style={sharedStyles.fieldLabel}>Weight (kg)</Text>
                  <View style={sharedStyles.inputBox}>
                    <TextInput
                      style={sharedStyles.textInput}
                      keyboardType="numeric"
                      value={weightKg}
                      onChangeText={setWeightKg}
                      placeholder="70"
                      placeholderTextColor="#94A3B8"
                    />
                    <Text style={sharedStyles.affix}>kg</Text>
                  </View>
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={sharedStyles.fieldLabel}>Height (cm)</Text>
                  <View style={sharedStyles.inputBox}>
                    <TextInput
                      style={sharedStyles.textInput}
                      keyboardType="numeric"
                      value={heightCm}
                      onChangeText={setHeightCm}
                      placeholder="175"
                      placeholderTextColor="#94A3B8"
                    />
                    <Text style={sharedStyles.affix}>cm</Text>
                  </View>
                </View>
              </View>
            ) : (
              <View style={{ marginTop: 12, gap: 10 }}>
                <View>
                  <Text style={sharedStyles.fieldLabel}>Weight (lbs)</Text>
                  <View style={sharedStyles.inputBox}>
                    <TextInput
                      style={sharedStyles.textInput}
                      keyboardType="numeric"
                      value={weightLb}
                      onChangeText={setWeightLb}
                      placeholder="154"
                      placeholderTextColor="#94A3B8"
                    />
                    <Text style={sharedStyles.affix}>lbs</Text>
                  </View>
                </View>
                <View style={sharedStyles.grid2}>
                  <View style={{ flex: 1 }}>
                    <Text style={sharedStyles.fieldLabel}>Height (ft)</Text>
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

            <Text style={[sharedStyles.fieldLabel, { marginTop: 12 }]}>Activity Level</Text>
            <View style={{ gap: 6 }}>
              {ACTIVITY_LEVELS.map((lvl) => {
                const active = activity === lvl.value;
                return (
                  <Pressable
                    key={lvl.value}
                    onPress={() => {
                      Haptics.selectionAsync();
                      setActivity(lvl.value);
                    }}
                    style={[styles.actRow, active && styles.actRowActive]}
                  >
                    <View style={{ flex: 1 }}>
                      <Text style={[styles.actTitle, active && styles.actTitleActive]}>{lvl.label}</Text>
                      <Text style={styles.actDesc}>{lvl.desc}</Text>
                    </View>
                    <View style={[styles.actDot, active && styles.actDotActive]} />
                  </Pressable>
                );
              })}
            </View>
          </FormPanel>

          <ResultPanel theme="emerald">
            <View style={sharedStyles.resultHeaderRow}>
              <View style={styles.kickerRow}>
                <Flame size={15} color="#059669" />
                <Text style={sharedStyles.resultKicker}>Daily Maintenance Calories</Text>
              </View>
              <CopyResetActions copied={copied} onCopy={handleCopy} onReset={handleReset} theme="emerald" />
            </View>

            <View style={styles.heroRow}>
              <Text style={[sharedStyles.heroValue, { color: "#064E3B" }]}>
                {hasValues ? maintenance.toLocaleString("en-US") : "0"}
              </Text>
              <Text style={styles.kcalUnit}>kcal / day</Text>
            </View>

            <View style={[sharedStyles.grid2, { marginTop: 12 }]}>
              <StatTile
                label="Weight Loss"
                value={`${hasValues ? weightLoss.toLocaleString("en-US") : "0"} kcal`}
                valueColor="#059669"
                subtext="-500 kcal/day"
                borderColor="#A7F3D0"
              />
              <StatTile
                label="Weight Gain"
                value={`${hasValues ? weightGain.toLocaleString("en-US") : "0"} kcal`}
                valueColor="#0F172A"
                subtext="+500 kcal/day"
                borderColor="#A7F3D0"
              />
            </View>
          </ResultPanel>

          <DisclaimerNote text="Disclaimer: This calorie calculator provides an estimate for general informational purposes and is not medical advice. Actual calorie needs can vary based on body composition, health, lifestyle and other factors. Consult a qualified healthcare professional or registered dietitian for personalized advice." />
        </OuterToolCard>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  genderBtn: {
    flex: 1,
    height: 44,
    borderRadius: 12,
    backgroundColor: "#FFFFFF",
    borderWidth: 1.5,
    borderColor: "#CBD5E1",
    alignItems: "center",
    justifyContent: "center",
  },
  genderBtnActive: {
    backgroundColor: "#059669",
    borderColor: "#059669",
  },
  genderText: { fontSize: 13, fontWeight: "800", color: "#334155" },
  genderTextActive: { color: "#FFFFFF" },
  actRow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderWidth: 1.5,
    borderColor: "#E2E8F0",
    borderRadius: 11,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  actRowActive: {
    backgroundColor: "#ECFDF5",
    borderColor: "#059669",
  },
  actTitle: { fontSize: 13, fontWeight: "800", color: "#0F172A" },
  actTitleActive: { color: "#065F46" },
  actDesc: { fontSize: 11, fontWeight: "500", color: "#64748B" },
  actDot: {
    width: 14,
    height: 14,
    borderRadius: 7,
    borderWidth: 2,
    borderColor: "#CBD5E1",
  },
  actDotActive: {
    borderColor: "#059669",
    backgroundColor: "#059669",
  },
  kickerRow: { flexDirection: "row", alignItems: "center", gap: 6, flex: 1 },
  heroRow: { flexDirection: "row", alignItems: "baseline", gap: 6 },
  kcalUnit: { fontSize: 15, fontWeight: "800", color: "#059669" },
});
