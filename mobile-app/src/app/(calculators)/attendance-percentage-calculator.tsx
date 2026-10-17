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
import { calculateAttendance } from "@/lib/calculations/math";
import { Copy, RotateCcw, Check, ThumbsUp, AlertTriangle } from "lucide-react-native";

export default function AttendanceCalculatorScreen() {
  const [totalClasses, setTotalClasses] = useState("50");
  const [attendedClasses, setAttendedClasses] = useState("42");
  const [targetPercentage, setTargetPercentage] = useState("75");
  const [copied, setCopied] = useState(false);

  const t = parseInt(totalClasses) || 0;
  const a = parseInt(attendedClasses) || 0;
  const target = parseFloat(targetPercentage) || 75;

  const result = calculateAttendance(t, a, target);

  const handleCopy = async () => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    const summary = `Attendance Status:\nCurrent: ${result.currentPercentage}%\nTarget: ${target}%\nStatus: ${
      result.status === "safe"
        ? `You can safely bunk ${result.classesDifference} classes!`
        : `You must attend next ${result.classesDifference} classes!`
    }`;
    await Clipboard.setStringAsync(summary);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleReset = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    setTotalClasses("50");
    setAttendedClasses("42");
    setTargetPercentage("75");
  };

  return (
    <SafeAreaView style={styles.container} edges={["top", "bottom"]}>
      <StatusBar style="dark" />
      <CalculatorHeader
        title="Attendance Calculator"
        subtitle="Track college/school attendance and see how many classes you can safely skip."
        iconName="ClipboardCheck"
        themeColor="#2563EB"
        themeBg="#EFF6FF"
      />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.card}>
          <Text style={styles.inputLabel}>TOTAL CLASSES HELD</Text>
          <View style={styles.inputWrapper}>
            <TextInput
              style={styles.textInput}
              keyboardType="number-pad"
              value={totalClasses}
              onChangeText={setTotalClasses}
              placeholder="50"
              placeholderTextColor="#94A3B8"
            />
          </View>

          <Text style={[styles.inputLabel, { marginTop: 14 }]}>
            CLASSES ATTENDED
          </Text>
          <View style={styles.inputWrapper}>
            <TextInput
              style={styles.textInput}
              keyboardType="number-pad"
              value={attendedClasses}
              onChangeText={setAttendedClasses}
              placeholder="42"
              placeholderTextColor="#94A3B8"
            />
          </View>

          <Text style={[styles.inputLabel, { marginTop: 14 }]}>
            TARGET ATTENDANCE (%)
          </Text>
          <View style={styles.inputWrapper}>
            <TextInput
              style={styles.textInput}
              keyboardType="number-pad"
              value={targetPercentage}
              onChangeText={setTargetPercentage}
              placeholder="75"
              placeholderTextColor="#94A3B8"
            />
            <Text style={styles.suffix}>%</Text>
          </View>
        </View>

        <View style={styles.resultCard}>
          <View style={styles.resultHeader}>
            <Text style={styles.resultTitle}>Attendance Analysis</Text>
            <View style={styles.actionButtons}>
              <Pressable onPress={handleCopy} style={styles.iconBtn}>
                {copied ? <Check size={16} color="#16A34A" /> : <Copy size={16} color="#64748B" />}
              </Pressable>
              <Pressable onPress={handleReset} style={styles.iconBtn}>
                <RotateCcw size={16} color="#64748B" />
              </Pressable>
            </View>
          </View>

          <View
            style={[
              styles.totalBlock,
              result.status === "safe" ? styles.safeBlock : styles.shortageBlock,
            ]}
          >
            <Text
              style={[
                styles.totalLabel,
                { color: result.status === "safe" ? "#065F46" : "#991B1B" },
              ]}
            >
              CURRENT ATTENDANCE
            </Text>
            <Text
              style={[
                styles.totalValue,
                { color: result.status === "safe" ? "#059669" : "#DC2626" },
              ]}
            >
              {result.currentPercentage}%
            </Text>
          </View>

          <View
            style={[
              styles.statusBanner,
              result.status === "safe"
                ? styles.statusBannerSafe
                : styles.statusBannerShortage,
            ]}
          >
            {result.status === "safe" ? (
              <ThumbsUp size={18} color="#059669" />
            ) : (
              <AlertTriangle size={18} color="#DC2626" />
            )}
            <Text
              style={[
                styles.statusText,
                { color: result.status === "safe" ? "#065F46" : "#991B1B" },
              ]}
            >
              {result.status === "safe"
                ? `You can safely bunk ${result.classesDifference} upcoming classes without falling below ${target}%.`
                : `You must attend the next ${result.classesDifference} consecutive classes to reach ${target}%.`}
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F8FAFC" },
  scrollContent: { paddingHorizontal: 16, paddingBottom: 40 },
  card: {
    backgroundColor: "#ffffff",
    borderRadius: 20,
    padding: 16,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    marginBottom: 16,
  },
  inputLabel: { fontSize: 11, fontWeight: "800", color: "#64748B", marginBottom: 6 },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F8FAFC",
    borderWidth: 1,
    borderColor: "#CBD5E1",
    borderRadius: 14,
    paddingHorizontal: 14,
    height: 50,
  },
  suffix: { fontSize: 14, fontWeight: "700", color: "#94A3B8", marginLeft: 6 },
  textInput: { flex: 1, fontSize: 18, fontWeight: "700", color: "#0F172A" },
  resultCard: {
    backgroundColor: "#ffffff",
    borderRadius: 20,
    padding: 16,
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },
  resultHeader: { flexDirection: "row", justifyContent: "space-between", marginBottom: 12 },
  resultTitle: { fontSize: 14, fontWeight: "800", color: "#0F172A" },
  actionButtons: { flexDirection: "row", gap: 6 },
  iconBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#F1F5F9",
    justifyContent: "center",
    alignItems: "center",
  },
  totalBlock: {
    borderRadius: 16,
    padding: 16,
    alignItems: "center",
    marginBottom: 14,
    borderWidth: 1,
  },
  safeBlock: { backgroundColor: "#ECFDF5", borderColor: "#D1FAE5" },
  shortageBlock: { backgroundColor: "#FEF2F2", borderColor: "#FEE2E2" },
  totalLabel: { fontSize: 11, fontWeight: "800", letterSpacing: 0.5, marginBottom: 4 },
  totalValue: { fontSize: 32, fontWeight: "900" },
  statusBanner: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    borderRadius: 14,
    borderWidth: 1,
  },
  statusBannerSafe: { backgroundColor: "#F0FDF4", borderColor: "#BBF7D0" },
  statusBannerShortage: { backgroundColor: "#FFF1F2", borderColor: "#FECDD3" },
  statusText: { fontSize: 12, fontWeight: "700", marginLeft: 8, flex: 1, lineHeight: 17 },
});
