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

export default function NegativeMarkingCalculatorScreen() {
  const [totalQuestions, setTotalQuestions] = useState("");
  const [attempted, setAttempted] = useState("");
  const [correct, setCorrect] = useState("");
  const [marksPerCorrect, setMarksPerCorrect] = useState("4");
  const [penaltyPerWrong, setPenaltyPerWrong] = useState("1");
  const [copied, setCopied] = useState(false);

  const calculate = () => {
    const tq = parseInt(totalQuestions) || 0;
    const a = parseInt(attempted);
    const c = parseInt(correct);
    const m = parseFloat(marksPerCorrect);
    const p = parseFloat(penaltyPerWrong);

    if (
      !isNaN(a) &&
      !isNaN(c) &&
      !isNaN(m) &&
      !isNaN(p) &&
      a > 0 &&
      c >= 0 &&
      c <= a
    ) {
      const wrong = a - c;
      const positiveScore = c * m;
      const negativeScore = wrong * p;
      const finalScore = positiveScore - negativeScore;

      const unattempted = tq > a ? tq - a : 0;
      const maxPossible = (tq > 0 ? tq : a) * m;
      const accuracy = (c / a) * 100;

      return {
        score: finalScore.toFixed(2),
        wrong,
        accuracy: accuracy.toFixed(1),
        maxPossible: maxPossible.toFixed(2),
        unattempted,
        penalty: negativeScore.toFixed(2),
      };
    }

    return {
      score: "0.00",
      wrong: 0,
      accuracy: "0.0",
      maxPossible: "0.00",
      unattempted: 0,
      penalty: "0.00",
    };
  };

  const result = calculate();

  const handleCopy = async () => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    const text = `Negative Marking Calculator\nTotal Questions in Exam: ${
      totalQuestions || 0
    }\nQuestions Attempted: ${attempted || 0}\nCorrect Answers: ${
      correct || 0
    }\nMarks per Correct: ${marksPerCorrect || 0}\nPenalty per Wrong: ${
      penaltyPerWrong || 0
    }\nFinal Score: ${result.score} / ${result.maxPossible}\nWrong Answers: ${
      result.wrong
    }\nPenalty Deducted: ${result.penalty}\nUnattempted: ${
      result.unattempted
    }\nAccuracy: ${
      result.accuracy
    }%\n\nCalculate Online: https://topcalcbox.com/negative-marking-calculator/`;
    await Clipboard.setStringAsync(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleReset = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    setTotalQuestions("");
    setAttempted("");
    setCorrect("");
    setMarksPerCorrect("4");
    setPenaltyPerWrong("1");
  };

  return (
    <SafeAreaView style={styles.container} edges={["top", "bottom"]}>
      <StatusBar style="dark" />
      <CalculatorHeader
        title="Negative Marking Calculator"
        subtitle="Calculate your final score in competitive exams with negative marking rules."
        iconName="TrendingDown"
        themeColor="#F59E0B"
        themeBg="#FFFBEB"
      />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {/* Input Card */}
        <View style={styles.inputCard}>
          <Text style={styles.inputLabel}>TOTAL QUESTIONS IN EXAM</Text>
          <View style={styles.inputWrapper}>
            <TextInput
              style={styles.textInput}
              keyboardType="numeric"
              value={totalQuestions}
              onChangeText={setTotalQuestions}
              placeholder="e.g. 100"
              placeholderTextColor="#94A3B8"
            />
          </View>

          <Text style={[styles.inputLabel, { marginTop: 14 }]}>
            TOTAL QUESTIONS ATTEMPTED
          </Text>
          <View style={styles.inputWrapper}>
            <TextInput
              style={styles.textInput}
              keyboardType="numeric"
              value={attempted}
              onChangeText={setAttempted}
              placeholder="e.g. 85"
              placeholderTextColor="#94A3B8"
            />
          </View>

          <Text style={[styles.inputLabel, { marginTop: 14 }]}>
            CORRECT ANSWERS
          </Text>
          <View style={styles.inputWrapper}>
            <TextInput
              style={[styles.textInput, { color: "#059669" }]}
              keyboardType="numeric"
              value={correct}
              onChangeText={setCorrect}
              placeholder="e.g. 70"
              placeholderTextColor="#94A3B8"
            />
          </View>

          <Text style={[styles.inputLabel, { marginTop: 14 }]}>
            MARKS FOR CORRECT (+VE)
          </Text>
          <View style={styles.inputWrapper}>
            <TextInput
              style={styles.textInput}
              keyboardType="numeric"
              value={marksPerCorrect}
              onChangeText={setMarksPerCorrect}
              placeholder="e.g. 4"
              placeholderTextColor="#94A3B8"
            />
          </View>

          <Text style={[styles.inputLabel, { marginTop: 14 }]}>
            PENALTY FOR WRONG (-VE)
          </Text>
          <View style={styles.inputWrapper}>
            <TextInput
              style={[styles.textInput, { color: "#E11D48" }]}
              keyboardType="numeric"
              value={penaltyPerWrong}
              onChangeText={setPenaltyPerWrong}
              placeholder="e.g. 1"
              placeholderTextColor="#94A3B8"
            />
          </View>
        </View>

        {/* Result Box */}
        <View style={styles.resultBox}>
          <View style={styles.resultHeader}>
            <Text style={styles.resultCategory}>FINAL SCORE</Text>
            <View style={styles.actionButtons}>
              <Pressable onPress={handleCopy} style={styles.copyBtn}>
                {copied ? <Check size={14} color="#059669" /> : <Copy size={14} color="#D97706" />}
                <Text style={[styles.copyBtnText, copied && { color: "#059669" }]}>
                  {copied ? "Copied" : "Copy"}
                </Text>
              </Pressable>
              <Pressable onPress={handleReset} style={styles.resetBtn}>
                <RotateCcw size={15} color="#D97706" />
              </Pressable>
            </View>
          </View>

          <View style={styles.scoreRow}>
            <Text style={styles.finalScoreText}>{result.score}</Text>
            <Text style={styles.maxPossibleText}>/ {result.maxPossible}</Text>
          </View>

          {/* 4 Detail Cards */}
          <View style={styles.gridCards}>
            <View style={styles.detailCard}>
              <Text style={styles.detailCardLabel}>WRONG ANSWERS</Text>
              <Text style={styles.detailCardValue}>{result.wrong}</Text>
            </View>
            <View style={styles.detailCard}>
              <Text style={styles.detailCardLabel}>ACCURACY</Text>
              <Text style={styles.detailCardValue}>{result.accuracy}%</Text>
            </View>
            <View style={styles.detailCard}>
              <Text style={styles.detailCardLabel}>UNATTEMPTED</Text>
              <Text style={styles.detailCardValue}>{result.unattempted}</Text>
            </View>
            <View style={styles.detailCard}>
              <Text style={styles.detailCardLabel}>PENALTY DEDUCTED</Text>
              <Text style={[styles.detailCardValue, { color: "#E11D48" }]}>
                -{result.penalty}
              </Text>
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
    backgroundColor: "#FFFBEB",
    borderRadius: 20,
    padding: 16,
    borderWidth: 1,
    borderColor: "#FEF3C7",
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 11,
    fontWeight: "800",
    color: "#B45309",
    letterSpacing: 0.5,
    marginBottom: 6,
  },
  inputWrapper: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#CBD5E1",
    borderRadius: 14,
    paddingHorizontal: 14,
    height: 50,
    justifyContent: "center",
  },
  textInput: {
    fontSize: 18,
    fontWeight: "800",
    color: "#0F172A",
  },
  resultBox: {
    backgroundColor: "#FFFBEB",
    borderRadius: 22,
    padding: 20,
    borderWidth: 1.5,
    borderColor: "#FDE68A",
    alignItems: "center",
    shadowColor: "#D97706",
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
    marginBottom: 8,
  },
  resultCategory: {
    fontSize: 11,
    fontWeight: "800",
    color: "#B45309",
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
    borderColor: "#FDE68A",
    gap: 4,
  },
  copyBtnText: {
    fontSize: 11,
    fontWeight: "800",
    color: "#B45309",
  },
  resetBtn: {
    width: 30,
    height: 30,
    borderRadius: 8,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#FDE68A",
  },
  scoreRow: {
    flexDirection: "row",
    alignItems: "baseline",
    marginTop: 6,
    marginBottom: 16,
  },
  finalScoreText: {
    fontSize: 48,
    fontWeight: "900",
    color: "#0F172A",
    letterSpacing: -1,
  },
  maxPossibleText: {
    fontSize: 22,
    fontWeight: "800",
    color: "#D97706",
    marginLeft: 6,
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
    padding: 12,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#FDE68A",
  },
  detailCardLabel: {
    fontSize: 10,
    fontWeight: "800",
    color: "#92400E",
    letterSpacing: 0.5,
    marginBottom: 4,
    textAlign: "center",
  },
  detailCardValue: {
    fontSize: 18,
    fontWeight: "900",
    color: "#0F172A",
  },
});
