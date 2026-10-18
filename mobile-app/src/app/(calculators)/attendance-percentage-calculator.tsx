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
import { Copy, RotateCcw, Check, AlertTriangle, CheckCircle2 } from "lucide-react-native";

export default function AttendanceCalculatorScreen() {
  const [attended, setAttended] = useState("");
  const [total, setTotal] = useState("");
  const [target, setTarget] = useState("75");
  const [copied, setCopied] = useState(false);

  const calculate = () => {
    const a = parseInt(attended);
    const t = parseInt(total);
    const targetPercent = parseFloat(target);

    if (!isNaN(a) && !isNaN(t) && t > 0 && a >= 0 && a <= t) {
      const currentPercent = (a / t) * 100;
      let statusString = "";
      let statusMessage = "";
      let futureInfo = { attended: 0, total: 0, percent: "0.00" };
      let alert: "shortage" | "met" = "met";

      if (!isNaN(targetPercent) && targetPercent > 0 && targetPercent <= 100) {
        if (currentPercent < targetPercent) {
          const needed = Math.ceil(
            (targetPercent * t - 100 * a) / (100 - targetPercent)
          );
          const futureTotal = t + needed;
          const futureAttended = a + needed;
          const futurePercent = ((futureAttended / futureTotal) * 100).toFixed(2);

          statusMessage = `You need to attend ${needed} more classes to attain ${targetPercent}% attendance.`;
          futureInfo = {
            attended: futureAttended,
            total: futureTotal,
            percent: futurePercent,
          };
          statusString = `${statusMessage}\nCurrent Attendance: ${a}/${t} ${currentPercent.toFixed(
            2
          )}%\nAttendance Required: ${futureAttended}/${futureTotal} -> ${futurePercent}%`;
          alert = "shortage";
        } else {
          const canSkip = Math.floor(
            (100 * a - targetPercent * t) / targetPercent
          );
          const futureTotal = t + canSkip;
          const futurePercent = ((a / futureTotal) * 100).toFixed(2);

          statusMessage = `You can bunk for ${canSkip} more days.`;
          futureInfo = {
            attended: a,
            total: futureTotal,
            percent: futurePercent,
          };
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
    }\nClasses Attended: ${attended || 0}\nTarget Attendance: ${
      target || 0
    }%\nCurrent Attendance: ${result.percentage}%\n\n${
      result.statusString
    }\n\nCalculate Online: https://topcalcbox.com/attendance-percentage-calculator/`;
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
    <SafeAreaView style={styles.container} edges={["top", "bottom"]}>
      <StatusBar style="dark" />
      <CalculatorHeader
        title="Attendance Percentage Calculator"
        subtitle="Calculate your current attendance percentage and see how many classes you can skip."
        iconName="ClipboardCheck"
        themeColor="#F97316"
        themeBg="#FFF7ED"
      />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {/* Input Card */}
        <View style={styles.inputCard}>
          <Text style={styles.inputLabel}>CLASSES HELD (TOTAL)</Text>
          <View style={styles.inputWrapper}>
            <TextInput
              style={styles.textInput}
              keyboardType="numeric"
              value={total}
              onChangeText={setTotal}
              placeholder="e.g. 50"
              placeholderTextColor="#94A3B8"
            />
          </View>

          <Text style={[styles.inputLabel, { marginTop: 16 }]}>CLASSES ATTENDED</Text>
          <View style={styles.inputWrapper}>
            <TextInput
              style={styles.textInput}
              keyboardType="numeric"
              value={attended}
              onChangeText={setAttended}
              placeholder="e.g. 35"
              placeholderTextColor="#94A3B8"
            />
          </View>

          <Text style={[styles.inputLabel, { marginTop: 16 }]}>
            TARGET ATTENDANCE (%)
          </Text>
          <View style={styles.inputWrapper}>
            <TextInput
              style={styles.textInput}
              keyboardType="numeric"
              value={target}
              onChangeText={setTarget}
              placeholder="e.g. 75"
              placeholderTextColor="#94A3B8"
            />
            <Text style={styles.suffix}>%</Text>
          </View>
        </View>

        {/* Result Box */}
        <View style={styles.resultBox}>
          <View style={styles.resultHeader}>
            <Text style={styles.resultCategory}>CURRENT ATTENDANCE</Text>
            <View style={styles.actionButtons}>
              <Pressable onPress={handleCopy} style={styles.copyBtn}>
                {copied ? <Check size={14} color="#059669" /> : <Copy size={14} color="#EA580C" />}
                <Text style={[styles.copyBtnText, copied && { color: "#059669" }]}>
                  {copied ? "Copied" : "Copy"}
                </Text>
              </Pressable>
              <Pressable onPress={handleReset} style={styles.resetBtn}>
                <RotateCcw size={15} color="#EA580C" />
              </Pressable>
            </View>
          </View>

          <View style={styles.priceRow}>
            <Text style={styles.finalPriceText}>{result.percentage}</Text>
            <Text style={styles.percentSymbol}>%</Text>
          </View>

          {result.valid ? (
            <View style={styles.statusContainer}>
              <View
                style={[
                  styles.statusCard,
                  {
                    borderLeftColor:
                      result.alert === "shortage" ? "#EF4444" : "#10B981",
                  },
                ]}
              >
                <Text style={styles.statusMessage}>{result.statusMessage}</Text>
                <View style={styles.breakdownBox}>
                  <View style={styles.breakdownRow}>
                    <Text style={styles.breakdownLabel}>Current Attendance:</Text>
                    <Text style={styles.breakdownValue}>
                      {result.a}/{result.t} ({result.percentage}%)
                    </Text>
                  </View>
                  <View style={styles.breakdownRow}>
                    <Text style={styles.breakdownLabel}>
                      {result.alert === "shortage"
                        ? "Attendance Required:"
                        : "Attendance Then:"}
                    </Text>
                    <Text style={styles.breakdownValue}>
                      {result.futureInfo.attended}/{result.futureInfo.total} (
                      {result.futureInfo.percent}%)
                    </Text>
                  </View>
                </View>
              </View>

              {/* Alert Badge */}
              {result.alert === "shortage" ? (
                <View style={[styles.alertBadge, { backgroundColor: "#EF4444" }]}>
                  <AlertTriangle size={14} color="#FFFFFF" />
                  <Text style={styles.alertBadgeText}>Shortage Alert</Text>
                </View>
              ) : (
                <View style={[styles.alertBadge, { backgroundColor: "#10B981" }]}>
                  <CheckCircle2 size={14} color="#FFFFFF" />
                  <Text style={styles.alertBadgeText}>Criteria Met</Text>
                </View>
              )}
            </View>
          ) : (
            <View style={styles.placeholderCard}>
              <Text style={styles.placeholderText}>
                Enter your attendance details above
              </Text>
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F8FAFC" },
  scrollContent: { paddingHorizontal: 16, paddingBottom: 40 },
  inputCard: {
    backgroundColor: "#FFF7ED",
    borderRadius: 20,
    padding: 18,
    borderWidth: 1,
    borderColor: "#FFEDD5",
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 11,
    fontWeight: "800",
    color: "#9A3412",
    letterSpacing: 0.5,
    marginBottom: 8,
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#CBD5E1",
    borderRadius: 14,
    paddingHorizontal: 14,
    height: 52,
  },
  textInput: {
    flex: 1,
    fontSize: 20,
    fontWeight: "800",
    color: "#0F172A",
  },
  suffix: {
    fontSize: 18,
    fontWeight: "800",
    color: "#94A3B8",
    marginLeft: 6,
  },
  resultBox: {
    backgroundColor: "#FFF7ED",
    borderRadius: 22,
    padding: 20,
    borderWidth: 1.5,
    borderColor: "#FED7AA",
    alignItems: "center",
    shadowColor: "#EA580C",
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
    color: "#C2410C",
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
    borderColor: "#FED7AA",
    gap: 4,
  },
  copyBtnText: {
    fontSize: 11,
    fontWeight: "800",
    color: "#C2410C",
  },
  resetBtn: {
    width: 30,
    height: 30,
    borderRadius: 8,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#FED7AA",
  },
  priceRow: {
    flexDirection: "row",
    alignItems: "baseline",
    marginTop: 6,
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
    color: "#EA580C",
    marginLeft: 4,
  },
  statusContainer: {
    width: "100%",
    alignItems: "center",
    gap: 12,
  },
  statusCard: {
    width: "100%",
    backgroundColor: "rgba(255,255,255,0.9)",
    borderRadius: 16,
    padding: 14,
    borderWidth: 1,
    borderColor: "#FED7AA",
    borderLeftWidth: 5,
    gap: 10,
  },
  statusMessage: {
    fontSize: 13,
    fontWeight: "800",
    color: "#1E293B",
    textAlign: "center",
    lineHeight: 18,
  },
  breakdownBox: {
    backgroundColor: "#FFF7ED",
    borderRadius: 10,
    padding: 10,
    gap: 6,
  },
  breakdownRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  breakdownLabel: {
    fontSize: 11,
    fontWeight: "600",
    color: "#64748B",
  },
  breakdownValue: {
    fontSize: 12,
    fontWeight: "800",
    color: "#0F172A",
  },
  alertBadge: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 20,
    gap: 6,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 3,
  },
  alertBadgeText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "800",
  },
  placeholderCard: {
    width: "100%",
    backgroundColor: "rgba(255,255,255,0.6)",
    borderRadius: 14,
    padding: 14,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#FED7AA",
  },
  placeholderText: {
    fontSize: 13,
    fontWeight: "700",
    color: "#64748B",
  },
});
