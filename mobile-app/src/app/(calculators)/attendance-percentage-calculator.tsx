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
import { AlertTriangle, CheckCircle2 } from "lucide-react-native";

export default function AttendanceCalculatorScreen() {
  const [attended, setAttended] = useState("");
  const [total, setTotal] = useState("");
  const [target, setTarget] = useState("75");
  const [copied, setCopied] = useState(false);

  const calculate = () => {
    const a = parseInt(attended, 10);
    const t = parseInt(total, 10);
    const targetPercent = parseFloat(target);

    if (!isNaN(a) && !isNaN(t) && t > 0 && a >= 0 && a <= t) {
      const currentPercent = (a / t) * 100;
      let statusString = "";
      let statusMessage = "";
      let futureInfo = { attended: 0, total: 0, percent: "0.00" };
      let alert: "shortage" | "met" = "met";

      if (!isNaN(targetPercent) && targetPercent > 0 && targetPercent <= 100) {
        if (currentPercent < targetPercent) {
          const needed = Math.ceil((targetPercent * t - 100 * a) / (100 - targetPercent));
          const futureTotal = t + needed;
          const futureAttended = a + needed;
          const futurePercent = ((futureAttended / futureTotal) * 100).toFixed(2);
          statusMessage = `You need to attend ${needed} more classes to attain ${targetPercent}% attendance.`;
          futureInfo = { attended: futureAttended, total: futureTotal, percent: futurePercent };
          statusString = `${statusMessage}\nCurrent Attendance: ${a}/${t} ${currentPercent.toFixed(
            2
          )}%\nAttendance Required: ${futureAttended}/${futureTotal} -> ${futurePercent}%`;
          alert = "shortage";
        } else {
          const canSkip = Math.floor((100 * a - targetPercent * t) / targetPercent);
          const futureTotal = t + canSkip;
          const futurePercent = ((a / futureTotal) * 100).toFixed(2);
          statusMessage = `You can bunk for ${canSkip} more days.`;
          futureInfo = { attended: a, total: futureTotal, percent: futurePercent };
          statusString = `${statusMessage}\nCurrent Attendance: ${a}/${t} ${currentPercent.toFixed(
            2
          )}%\nAttendance Then: ${a}/${futureTotal} ${futurePercent}%`;
          alert = "met";
        }
      }

      return {
        percentage: currentPercent.toFixed(2),
        statusString,
        statusMessage,
        futureInfo,
        alert,
        valid: true,
        a,
        t,
      };
    }

    return {
      percentage: "0.00",
      statusString: "",
      statusMessage: "",
      futureInfo: { attended: 0, total: 0, percent: "0.00" },
      alert: "met" as const,
      valid: false,
      a: 0,
      t: 0,
    };
  };

  const result = calculate();

  const handleCopy = async () => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    const text = `Attendance Percentage Calculator\nClasses Held (Total): ${
      total || 0
    }\nClasses Attended: ${attended || 0}\nTarget Attendance: ${target || 0}%\nCurrent Attendance: ${
      result.percentage
    }%\n\n${result.statusString}\n\nCalculate Online: https://topcalcbox.com/attendance-percentage-calculator/`;
    await Clipboard.setStringAsync(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleReset = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    setAttended("");
    setTotal("");
    setTarget("75");
  };

  return (
    <SafeAreaView style={sharedStyles.safeArea} edges={["top", "bottom"]}>
      <StatusBar style="dark" />
      <CalculatorHeader
        title="Attendance Percentage Calculator"
        subtitle="Calculate your current attendance percentage and see how many classes you need to attend or can afford to skip."
        iconName="ClipboardCheck"
        color="orange"
      />

      <ScrollView
        contentContainerStyle={sharedStyles.scrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <OuterToolCard>
          <FormPanel theme="orange">
            <Text style={sharedStyles.fieldLabel}>Classes Held (Total)</Text>
            <View style={sharedStyles.inputBox}>
              <TextInput
                style={sharedStyles.textInput}
                keyboardType="numeric"
                value={total}
                onChangeText={setTotal}
                placeholder="e.g. 50"
                placeholderTextColor="#94A3B8"
              />
            </View>

            <Text style={[sharedStyles.fieldLabel, { marginTop: 14 }]}>Classes Attended</Text>
            <View style={sharedStyles.inputBox}>
              <TextInput
                style={sharedStyles.textInput}
                keyboardType="numeric"
                value={attended}
                onChangeText={setAttended}
                placeholder="e.g. 35"
                placeholderTextColor="#94A3B8"
              />
            </View>

            <Text style={[sharedStyles.fieldLabel, { marginTop: 14 }]}>Target Attendance (%)</Text>
            <View style={sharedStyles.inputBox}>
              <TextInput
                style={sharedStyles.textInput}
                keyboardType="numeric"
                value={target}
                onChangeText={setTarget}
                placeholder="e.g. 75"
                placeholderTextColor="#94A3B8"
              />
              <Text style={sharedStyles.affix}>%</Text>
            </View>
          </FormPanel>

          <ResultPanel theme="orange">
            <View style={sharedStyles.resultHeaderRow}>
              <Text style={sharedStyles.resultKicker}>Current Attendance</Text>
              <CopyResetActions copied={copied} onCopy={handleCopy} onReset={handleReset} theme="orange" />
            </View>

            <View style={styles.heroRow}>
              <Text style={[sharedStyles.heroValue, { color: "#7C2D12" }]}>{result.percentage}</Text>
              <Text style={styles.pctSym}>%</Text>
            </View>

            {result.valid ? (
              <View style={{ marginTop: 12, gap: 8 }}>
                <View
                  style={[
                    styles.statusCard,
                    {
                      borderColor: result.alert === "shortage" ? "#FECACA" : "#A7F3D0",
                      borderLeftColor: result.alert === "shortage" ? "#EF4444" : "#10B981",
                    },
                  ]}
                >
                  <View style={styles.statusHead}>
                    {result.alert === "shortage" ? (
                      <AlertTriangle size={16} color="#DC2626" />
                    ) : (
                      <CheckCircle2 size={16} color="#059669" />
                    )}
                    <Text
                      style={[
                        styles.statusMsg,
                        { color: result.alert === "shortage" ? "#991B1B" : "#065F46" },
                      ]}
                    >
                      {result.statusMessage}
                    </Text>
                  </View>

                  <View style={styles.rowsWrap}>
                    <View style={styles.rowItem}>
                      <Text style={styles.rowLabel}>Current Attendance</Text>
                      <Text style={styles.rowVal}>
                        {result.a}/{result.t} ({result.percentage}%)
                      </Text>
                    </View>
                    <View style={styles.rowItem}>
                      <Text style={styles.rowLabel}>
                        {result.alert === "shortage" ? "Attendance Required" : "Attendance Then"}
                      </Text>
                      <Text style={styles.rowVal}>
                        {result.futureInfo.attended}/{result.futureInfo.total} ({result.futureInfo.percent}%)
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
            ) : (
              <Text style={styles.emptyHint}>Enter classes held and attended to calculate.</Text>
            )}
          </ResultPanel>
        </OuterToolCard>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  heroRow: { flexDirection: "row", alignItems: "baseline" },
  pctSym: { fontSize: 22, fontWeight: "800", color: "#EA580C", marginLeft: 3 },
  statusCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    borderWidth: 1.5,
    borderLeftWidth: 4,
    padding: 12,
  },
  statusHead: { flexDirection: "row", alignItems: "flex-start", gap: 8, marginBottom: 8 },
  statusMsg: { flex: 1, fontSize: 13, fontWeight: "800", lineHeight: 18 },
  rowsWrap: { gap: 4, borderTopWidth: 1, borderTopColor: "#F1F5F9", paddingTop: 8 },
  rowItem: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  rowLabel: { fontSize: 12, fontWeight: "600", color: "#475569" },
  rowVal: { fontSize: 12, fontWeight: "800", color: "#0F172A" },
  emptyHint: { marginTop: 8, fontSize: 12, fontWeight: "600", color: "#7C2D12" },
});
