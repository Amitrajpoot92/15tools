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
  StatTile,
  sharedStyles,
} from "@/components/CalculatorUI";

export default function NegativeMarkingCalculatorScreen() {
  const [totalQuestions, setTotalQuestions] = useState("");
  const [attempted, setAttempted] = useState("");
  const [correct, setCorrect] = useState("");
  const [marksPerCorrect, setMarksPerCorrect] = useState("4");
  const [penaltyPerWrong, setPenaltyPerWrong] = useState("1");
  const [copied, setCopied] = useState(false);

  const calculate = () => {
    const tq = parseInt(totalQuestions, 10) || 0;
    const a = parseInt(attempted, 10);
    const c = parseInt(correct, 10);
    const m = parseFloat(marksPerCorrect);
    const p = parseFloat(penaltyPerWrong);

    if (!isNaN(a) && !isNaN(c) && !isNaN(m) && !isNaN(p) && a > 0 && c >= 0 && c <= a) {
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
    }\nQuestions Attempted: ${attempted || 0}\nCorrect Answers: ${correct || 0}\nMarks per Correct: ${
      marksPerCorrect || 0
    }\nPenalty per Wrong: ${penaltyPerWrong || 0}\nFinal Score: ${result.score} / ${
      result.maxPossible
    }\nWrong Answers: ${result.wrong}\nPenalty Deducted: ${result.penalty}\nUnattempted: ${
      result.unattempted
    }\nAccuracy: ${result.accuracy}%\n\nCalculate Online: https://topcalcbox.com/negative-marking-calculator/`;
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
    <SafeAreaView style={sharedStyles.safeArea} edges={["top", "bottom"]}>
      <StatusBar style="dark" />
      <CalculatorHeader
        title="Negative Marking Calculator"
        subtitle="Instantly calculate your final score in competitive exams by factoring in penalties for incorrect answers."
        iconName="TrendingDown"
        color="amber"
      />

      <ScrollView
        contentContainerStyle={sharedStyles.scrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <OuterToolCard>
          <FormPanel theme="amber">
            <Text style={sharedStyles.fieldLabel}>Total Questions in Exam</Text>
            <View style={sharedStyles.inputBox}>
              <TextInput
                style={sharedStyles.textInput}
                keyboardType="numeric"
                value={totalQuestions}
                onChangeText={setTotalQuestions}
                placeholder="e.g. 100"
                placeholderTextColor="#94A3B8"
              />
            </View>

            <View style={[sharedStyles.grid2, { marginTop: 12 }]}>
              <View style={{ flex: 1 }}>
                <Text style={sharedStyles.fieldLabel}>Attempted</Text>
                <View style={sharedStyles.inputBox}>
                  <TextInput
                    style={sharedStyles.textInput}
                    keyboardType="numeric"
                    value={attempted}
                    onChangeText={setAttempted}
                    placeholder="85"
                    placeholderTextColor="#94A3B8"
                  />
                </View>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={sharedStyles.fieldLabel}>Correct</Text>
                <View style={sharedStyles.inputBox}>
                  <TextInput
                    style={[sharedStyles.textInput, { color: "#059669" }]}
                    keyboardType="numeric"
                    value={correct}
                    onChangeText={setCorrect}
                    placeholder="70"
                    placeholderTextColor="#94A3B8"
                  />
                </View>
              </View>
            </View>

            <View style={[sharedStyles.grid2, { marginTop: 12 }]}>
              <View style={{ flex: 1 }}>
                <Text style={sharedStyles.fieldLabel}>Marks (+ve)</Text>
                <View style={sharedStyles.inputBox}>
                  <TextInput
                    style={sharedStyles.textInput}
                    keyboardType="numeric"
                    value={marksPerCorrect}
                    onChangeText={setMarksPerCorrect}
                    placeholder="4"
                    placeholderTextColor="#94A3B8"
                  />
                </View>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={sharedStyles.fieldLabel}>Penalty (-ve)</Text>
                <View style={sharedStyles.inputBox}>
                  <TextInput
                    style={[sharedStyles.textInput, { color: "#E11D48" }]}
                    keyboardType="numeric"
                    value={penaltyPerWrong}
                    onChangeText={setPenaltyPerWrong}
                    placeholder="1"
                    placeholderTextColor="#94A3B8"
                  />
                </View>
              </View>
            </View>
          </FormPanel>

          <ResultPanel theme="amber">
            <View style={sharedStyles.resultHeaderRow}>
              <Text style={sharedStyles.resultKicker}>Final Score</Text>
              <CopyResetActions copied={copied} onCopy={handleCopy} onReset={handleReset} theme="amber" />
            </View>

            <View style={styles.scoreRow}>
              <Text style={[sharedStyles.heroValue, { color: "#78350F" }]}>{result.score}</Text>
              <Text style={styles.maxScore}>/ {result.maxPossible}</Text>
            </View>

            <View style={[sharedStyles.grid2, { marginTop: 12 }]}>
              <StatTile
                label="Wrong Answers"
                value={`${result.wrong}`}
                valueColor="#E11D48"
                borderColor="#FCD34D"
              />
              <StatTile
                label="Accuracy"
                value={`${result.accuracy}%`}
                valueColor="#059669"
                borderColor="#FCD34D"
              />
            </View>

            <View style={[sharedStyles.grid2, { marginTop: 8 }]}>
              <StatTile label="Unattempted" value={`${result.unattempted}`} borderColor="#FCD34D" />
              <StatTile
                label="Penalty Deducted"
                value={`-${result.penalty}`}
                valueColor="#B45309"
                borderColor="#FCD34D"
              />
            </View>
          </ResultPanel>
        </OuterToolCard>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  scoreRow: { flexDirection: "row", alignItems: "baseline", gap: 6 },
  maxScore: { fontSize: 18, fontWeight: "800", color: "#92400E" },
});
