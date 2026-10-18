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
import { Copy, RotateCcw, Check, GraduationCap } from "lucide-react-native";

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

      return {
        percentage: percentage.toFixed(2),
        grade,
      };
    }

    return { percentage: "0.00", grade: "-" };
  };

  const result = calculate();

  const handleCopy = async () => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    const text = `Marks Percentage Calculator\nMarks Obtained: ${
      obtained || 0
    }\nTotal / Maximum Marks: ${total || 0}\nFinal Percentage: ${
      result.percentage
    }%\nEstimated Grade: ${
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
    <SafeAreaView style={styles.container} edges={["top", "bottom"]}>
      <StatusBar style="dark" />
      <CalculatorHeader
        title="Marks Percentage Calculator"
        subtitle="Convert your exam scores and marks into an exact percentage instantly."
        iconName="GraduationCap"
        themeColor="#E11D48"
        themeBg="#FFF1F2"
      />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {/* Inputs Card */}
        <View style={styles.inputCard}>
          <Text style={styles.inputLabel}>MARKS OBTAINED</Text>
          <View style={styles.inputWrapper}>
            <TextInput
              style={styles.textInput}
              keyboardType="numeric"
              value={obtained}
              onChangeText={setObtained}
              placeholder="e.g. 450"
              placeholderTextColor="#94A3B8"
            />
          </View>

          <Text style={[styles.inputLabel, { marginTop: 16 }]}>
            TOTAL / MAXIMUM MARKS
          </Text>
          <View style={styles.inputWrapper}>
            <TextInput
              style={styles.textInput}
              keyboardType="numeric"
              value={total}
              onChangeText={setTotal}
              placeholder="e.g. 500"
              placeholderTextColor="#94A3B8"
            />
          </View>
        </View>

        {/* Result Box */}
        <View style={styles.resultBox}>
          <View style={styles.resultHeader}>
            <View />
            <View style={styles.actionButtons}>
              <Pressable onPress={handleCopy} style={styles.copyBtn}>
                {copied ? <Check size={14} color="#059669" /> : <Copy size={14} color="#BE123C" />}
                <Text style={[styles.copyBtnText, copied && { color: "#059669" }]}>
                  {copied ? "Copied" : "Copy"}
                </Text>
              </Pressable>
              <Pressable onPress={handleReset} style={styles.resetBtn}>
                <RotateCcw size={15} color="#BE123C" />
              </Pressable>
            </View>
          </View>

          {/* Graduation Cap Icon Badge */}
          <View style={styles.iconCircle}>
            <GraduationCap size={28} color="#E11D48" />
          </View>

          <Text style={styles.resultCategory}>FINAL PERCENTAGE</Text>
          <View style={styles.priceRow}>
            <Text style={styles.finalPriceText}>{result.percentage}</Text>
            <Text style={styles.percentSymbol}>%</Text>
          </View>

          <View style={styles.divider} />

          {/* Grade Badge */}
          <View style={styles.gradeRow}>
            <Text style={styles.gradeLabel}>Estimated Grade:</Text>
            <View style={styles.gradeBadge}>
              <Text style={styles.gradeBadgeText}>{result.grade}</Text>
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
    backgroundColor: "#FFF1F2",
    borderRadius: 20,
    padding: 18,
    borderWidth: 1,
    borderColor: "#FFE4E6",
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 11,
    fontWeight: "800",
    color: "#BE123C",
    letterSpacing: 0.5,
    marginBottom: 8,
  },
  inputWrapper: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#CBD5E1",
    borderRadius: 14,
    paddingHorizontal: 14,
    height: 52,
    justifyContent: "center",
  },
  textInput: {
    fontSize: 20,
    fontWeight: "800",
    color: "#0F172A",
  },
  resultBox: {
    backgroundColor: "#FFE4E6",
    borderRadius: 22,
    padding: 20,
    borderWidth: 1.5,
    borderColor: "#FECDD3",
    alignItems: "center",
    shadowColor: "#E11D48",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 3,
  },
  resultHeader: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
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
    borderColor: "#FECDD3",
    gap: 4,
  },
  copyBtnText: {
    fontSize: 11,
    fontWeight: "800",
    color: "#BE123C",
  },
  resetBtn: {
    width: 30,
    height: 30,
    borderRadius: 8,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#FECDD3",
  },
  iconCircle: {
    width: 56,
    height: 56,
    borderRadius: 16,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 6,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  resultCategory: {
    fontSize: 12,
    fontWeight: "800",
    color: "#9F1239",
    letterSpacing: 1,
    marginBottom: 4,
  },
  priceRow: {
    flexDirection: "row",
    alignItems: "baseline",
    marginBottom: 14,
  },
  finalPriceText: {
    fontSize: 52,
    fontWeight: "900",
    color: "#0F172A",
    letterSpacing: -1,
  },
  percentSymbol: {
    fontSize: 28,
    fontWeight: "800",
    color: "#E11D48",
    marginLeft: 4,
  },
  divider: {
    width: "100%",
    height: 1,
    backgroundColor: "#FECDD3",
    marginVertical: 12,
  },
  gradeRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  gradeLabel: {
    fontSize: 14,
    color: "#9F1239",
    fontWeight: "700",
  },
  gradeBadge: {
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 14,
    paddingVertical: 4,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#FECDD3",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  gradeBadgeText: {
    fontSize: 16,
    fontWeight: "900",
    color: "#0F172A",
  },
});
