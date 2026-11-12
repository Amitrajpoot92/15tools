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
import { Sigma } from "lucide-react-native";

export default function AverageCalculatorScreen() {
  const [input, setInput] = useState("");
  const [copied, setCopied] = useState(false);

  const calculateStats = () => {
    const numStrings = input.split(/[,;\s]+/).filter(Boolean);
    const nums = numStrings.map((n) => parseFloat(n)).filter((n) => !isNaN(n));
    if (nums.length === 0) return { mean: "0", median: "0", sum: "0", count: "0" };

    const sum = nums.reduce((a, b) => a + b, 0);
    const mean = sum / nums.length;
    const sorted = [...nums].sort((a, b) => a - b);
    const mid = Math.floor(sorted.length / 2);
    const median =
      sorted.length % 2 === 0 ? (sorted[mid - 1] + sorted[mid]) / 2 : sorted[mid];

    return {
      mean: (mean % 1 === 0 ? mean : mean.toFixed(2)).toString(),
      median: (median % 1 === 0 ? median : median.toFixed(2)).toString(),
      sum: (sum % 1 === 0 ? sum : sum.toFixed(2)).toString(),
      count: nums.length.toString(),
    };
  };

  const stats = calculateStats();

  const handleCopy = async () => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    const text = `Average Calculator\nNumbers: ${input}\nAverage (Mean): ${stats.mean}\nMedian: ${stats.median}\nSum: ${stats.sum}\nCount: ${stats.count}\n\nCalculate Online: https://topcalcbox.com/average-calculator/`;
    await Clipboard.setStringAsync(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleReset = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    setInput("");
  };

  return (
    <SafeAreaView style={sharedStyles.safeArea} edges={["top", "bottom"]}>
      <StatusBar style="dark" />
      <CalculatorHeader
        title="Average Calculator"
        subtitle="Calculate the mean, median, sum, and count of your numbers instantly. Paste your dataset below."
        iconName="Sigma"
        color="orange"
      />

      <ScrollView
        contentContainerStyle={sharedStyles.scrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <OuterToolCard>
          <FormPanel theme="orange">
            <Text style={sharedStyles.fieldLabel}>Enter numbers (separated by commas or spaces)</Text>
            <View style={styles.textAreaBox}>
              <TextInput
                style={styles.textArea}
                multiline
                numberOfLines={4}
                textAlignVertical="top"
                value={input}
                onChangeText={setInput}
                placeholder="e.g. 10, 20, 30, 40"
                placeholderTextColor="#94A3B8"
              />
            </View>
          </FormPanel>

          <ResultPanel theme="orange">
            <View style={sharedStyles.resultHeaderRow}>
              <View style={styles.kickerRow}>
                <Sigma size={15} color="#EA580C" />
                <Text style={sharedStyles.resultKicker}>Statistical Summary</Text>
              </View>
              <CopyResetActions copied={copied} onCopy={handleCopy} onReset={handleReset} theme="orange" />
            </View>

            <View style={[sharedStyles.grid2, { marginTop: 4 }]}>
              <StatTile
                label="Average (Mean)"
                value={stats.mean}
                valueColor="#EA580C"
                borderColor="#FDBA74"
              />
              <StatTile label="Median" value={stats.median} borderColor="#FDBA74" />
            </View>

            <View style={[sharedStyles.grid2, { marginTop: 8 }]}>
              <StatTile label="Sum" value={stats.sum} borderColor="#FDBA74" />
              <StatTile label="Count" value={stats.count} borderColor="#FDBA74" />
            </View>
          </ResultPanel>
        </OuterToolCard>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  textAreaBox: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1.5,
    borderColor: "#CBD5E1",
    borderRadius: 12,
    padding: 12,
    minHeight: 100,
  },
  textArea: {
    fontSize: 16,
    fontWeight: "700",
    color: "#0F172A",
    minHeight: 80,
  },
  kickerRow: { flexDirection: "row", alignItems: "center", gap: 6, flex: 1 },
});
