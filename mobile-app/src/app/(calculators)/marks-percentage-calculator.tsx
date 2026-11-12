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
  CopyResetActions,
  sharedStyles,
} from "@/components/CalculatorUI";
import { GraduationCap } from "lucide-react-native";

export default function MarksPercentageCalculatorScreen() {
  const [obtained, setObtained] = useState("");
  const [total, setTotal] = useState("");
  const [copied, setCopied] = useState(false);

  const calculate = () => {
    const o = parseFloat(obtained);
    const t = parseFloat(total);

    if (!isNaN(o) && !isNaN(t) && t > 0 && o >= 0) {
      const percentage = (o / t) * 100;
      let grade = "F";
      if (percentage >= 90) grade = "A+";
      else if (percentage >= 80) grade = "A";
      else if (percentage >= 70) grade = "B+";
      else if (percentage >= 60) grade = "B";
      else if (percentage >= 50) grade = "C";
      else if (percentage >= 40) grade = "D";
      return { percentage: percentage.toFixed(2), grade };
    }
    return { percentage: "0.00", grade: "-" };
  };

  const result = calculate();

  const handleCopy = async () => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    const text = `Marks Percentage Calculator\nMarks Obtained: ${obtained || 0}\nTotal / Maximum Marks: ${
      total || 0
    }\nFinal Percentage: ${result.percentage}%\nEstimated Grade: ${
      result.grade
    }\n\nCalculate Online: https://topcalcbox.com/marks-percentage-calculator/`;
    await Clipboard.setStringAsync(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleReset = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    setObtained("");
    setTotal("");
  };

  return (
    <SafeAreaView style={sharedStyles.safeArea} edges={["top", "bottom"]}>
      <StatusBar style="dark" />
      <CalculatorHeader
        title="Marks Percentage Calculator"
        subtitle="Convert your exam scores into an exact percentage and find out your estimated letter grade."
        iconName="GraduationCap"
        color="rose"
      />

      <ScrollView
        contentContainerStyle={sharedStyles.scrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <OuterToolCard>
          <FormPanel theme="rose">
            <Text style={sharedStyles.fieldLabel}>Marks Obtained</Text>
            <View style={sharedStyles.inputBox}>
              <TextInput
                style={sharedStyles.textInput}
                keyboardType="numeric"
                value={obtained}
                onChangeText={setObtained}
                placeholder="e.g. 450"
                placeholderTextColor="#94A3B8"
              />
            </View>

            <Text style={[sharedStyles.fieldLabel, { marginTop: 14 }]}>Total / Maximum Marks</Text>
            <View style={sharedStyles.inputBox}>
              <TextInput
                style={sharedStyles.textInput}
                keyboardType="numeric"
                value={total}
                onChangeText={setTotal}
                placeholder="e.g. 500"
                placeholderTextColor="#94A3B8"
              />
            </View>
          </FormPanel>

          <ResultPanel theme="rose">
            <View style={sharedStyles.resultHeaderRow}>
              <View style={styles.kickerRow}>
                <GraduationCap size={16} color="#E11D48" />
                <Text style={sharedStyles.resultKicker}>Final Percentage</Text>
              </View>
              <CopyResetActions copied={copied} onCopy={handleCopy} onReset={handleReset} theme="rose" />
            </View>

            <View style={styles.heroRow}>
              <Text style={[sharedStyles.heroValue, { color: "#881337" }]}>{result.percentage}</Text>
              <Text style={styles.pctSym}>%</Text>
            </View>

            <View style={styles.gradeCard}>
              <Text style={styles.gradeLabel}>Estimated Grade:</Text>
              <View style={styles.gradeBadge}>
                <Text style={styles.gradeText}>{result.grade}</Text>
              </View>
            </View>
          </ResultPanel>
        </OuterToolCard>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  kickerRow: { flexDirection: "row", alignItems: "center", gap: 6, flex: 1 },
  heroRow: { flexDirection: "row", alignItems: "baseline", marginTop: 2 },
  pctSym: { fontSize: 22, fontWeight: "800", color: "#E11D48", marginLeft: 3 },
  gradeCard: {
    marginTop: 12,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderWidth: 1.5,
    borderColor: "#FDA4AF",
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 10,
    justifyContent: "space-between",
  },
  gradeLabel: { fontSize: 13, fontWeight: "700", color: "#881337" },
  gradeBadge: {
    backgroundColor: "#FFF1F2",
    borderWidth: 1,
    borderColor: "#FECDD3",
    paddingHorizontal: 14,
    paddingVertical: 4,
    borderRadius: 999,
  },
  gradeText: { fontSize: 18, fontWeight: "900", color: "#E11D48" },
});
