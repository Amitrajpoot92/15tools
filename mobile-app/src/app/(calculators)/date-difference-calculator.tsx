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
import { Copy, RotateCcw, Check, Calendar, Clock, Briefcase } from "lucide-react-native";

export default function DateDifferenceCalculatorScreen() {
  const [date1Input, setDate1Input] = useState("");
  const [date2Input, setDate2Input] = useState("");
  const [copied, setCopied] = useState(false);

  const formatInputDate = (val: string) => {
    let cleaned = val.replace(/\D/g, "");
    if (cleaned.length > 2) {
      cleaned = cleaned.slice(0, 2) + "/" + cleaned.slice(2);
    }
    if (cleaned.length > 5) {
      cleaned = cleaned.slice(0, 5) + "/" + cleaned.slice(5, 9);
    }
    return cleaned;
  };

  const parseDateStr = (str: string) => {
    if (!str || str.length !== 10) return null;
    const parts = str.split("/");
    if (parts.length !== 3) return null;
    const d = parseInt(parts[0], 10);
    const m = parseInt(parts[1], 10) - 1;
    const y = parseInt(parts[2], 10);
    const date = new Date(y, m, d);
    if (
      date.getDate() === d &&
      date.getMonth() === m &&
      date.getFullYear() === y
    ) {
      return date;
    }
    return null;
  };

  const formatFriendlyDate = (date: Date | null) => {
    if (!date) return "";
    return date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  };

  const calculateDifference = () => {
    const d1 = parseDateStr(date1Input);
    const d2 = parseDateStr(date2Input);

    if (!d1 || !d2) return null;

    const startDate = d1 < d2 ? d1 : d2;
    const endDate = d1 < d2 ? d2 : d1;

    const timeDiff = endDate.getTime() - startDate.getTime();
    const totalDays = Math.round(timeDiff / (1000 * 3600 * 24));

    const totalWeeks = Math.floor(totalDays / 7);
    const remainingDays = totalDays % 7;

    let weekendDays = totalWeeks * 2;

    const startDayOfWeek = startDate.getDay();
    for (let i = 1; i <= remainingDays; i++) {
      const currentDay = (startDayOfWeek + i) % 7;
      if (currentDay === 0 || currentDay === 6) {
        weekendDays++;
      }
    }

    const workingDays = totalDays - weekendDays;

    return { totalDays, totalWeeks, remainingDays, workingDays, weekendDays };
  };

  const diff = calculateDifference();
  const d1Date = parseDateStr(date1Input);
  const d2Date = parseDateStr(date2Input);

  const handleCopy = async () => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    const text = `Date Difference Calculator\nStart Date: ${date1Input} ${
      d1Date ? `(${formatFriendlyDate(d1Date)})` : ""
    }\nEnd Date: ${date2Input} ${
      d2Date ? `(${formatFriendlyDate(d2Date)})` : ""
    }\nDuration: ${
      diff
        ? `${diff.totalDays} Days (${diff.totalWeeks} weeks & ${diff.remainingDays} days)\nWorking Days: ${diff.workingDays}\nWeekend Days: ${diff.weekendDays}`
        : "N/A"
    }\n\nCalculate Online: https://topcalcbox.com/date-difference-calculator/`;
    await Clipboard.setStringAsync(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleReset = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    setDate1Input("");
    setDate2Input("");
  };

  return (
    <SafeAreaView style={styles.container} edges={["top", "bottom"]}>
      <StatusBar style="dark" />
      <CalculatorHeader
        title="Date Difference Calculator"
        subtitle="Calculate the exact number of days, weeks, and months between two calendar dates."
        iconName="CalendarRange"
        themeColor="#4F46E5"
        themeBg="#EEF2FF"
      />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {/* Input Card */}
        <View style={styles.inputCard}>
          <Text style={styles.inputLabel}>START DATE</Text>
          <View style={styles.inputWrapper}>
            <TextInput
              style={styles.textInput}
              keyboardType="numeric"
              value={date1Input}
              onChangeText={(val) => setDate1Input(formatInputDate(val))}
              placeholder="DD/MM/YYYY"
              placeholderTextColor="#94A3B8"
              maxLength={10}
            />
          </View>
          {d1Date && (
            <View style={styles.friendlyDateBadge}>
              <Calendar size={13} color="#4F46E5" />
              <Text style={styles.friendlyDateText}>
                {formatFriendlyDate(d1Date)}
              </Text>
            </View>
          )}

          <Text style={[styles.inputLabel, { marginTop: 16 }]}>END DATE</Text>
          <View style={styles.inputWrapper}>
            <TextInput
              style={styles.textInput}
              keyboardType="numeric"
              value={date2Input}
              onChangeText={(val) => setDate2Input(formatInputDate(val))}
              placeholder="DD/MM/YYYY"
              placeholderTextColor="#94A3B8"
              maxLength={10}
            />
          </View>
          {d2Date && (
            <View style={styles.friendlyDateBadge}>
              <Calendar size={13} color="#4F46E5" />
              <Text style={styles.friendlyDateText}>
                {formatFriendlyDate(d2Date)}
              </Text>
            </View>
          )}
        </View>

        {/* Result Box */}
        <View style={styles.resultBox}>
          <View style={styles.resultHeader}>
            <View style={styles.headerGroup}>
              <Clock size={16} color="#4338CA" />
              <Text style={styles.resultCategory}>DATE DURATION OVERVIEW</Text>
            </View>
            <View style={styles.actionButtons}>
              <Pressable onPress={handleCopy} style={styles.copyBtn}>
                {copied ? <Check size={14} color="#059669" /> : <Copy size={14} color="#4338CA" />}
                <Text style={[styles.copyBtnText, copied && { color: "#059669" }]}>
                  {copied ? "Copied" : "Copy"}
                </Text>
              </Pressable>
              <Pressable onPress={handleReset} style={styles.resetBtn}>
                <RotateCcw size={15} color="#4338CA" />
              </Pressable>
            </View>
          </View>

          {diff ? (
            <View style={styles.resultContent}>
              {/* Main Total Days Hero Card */}
              <View style={styles.heroDurationCard}>
                <View style={styles.heroPriceRow}>
                  <Text style={styles.heroDaysNum}>{diff.totalDays.toLocaleString("en-US")}</Text>
                  <Text style={styles.heroDaysLabel}>Days</Text>
                </View>
                {diff.totalDays > 0 && (
                  <View style={styles.weeksBadge}>
                    <Text style={styles.weeksBadgeText}>
                      {diff.totalWeeks} {diff.totalWeeks === 1 ? "week" : "weeks"} &{" "}
                      {diff.remainingDays}{" "}
                      {diff.remainingDays === 1 ? "day" : "days"}
                    </Text>
                  </View>
                )}
              </View>

              {/* Working vs Weekend Days */}
              <View style={styles.breakdownGrid}>
                <View style={styles.breakdownCard}>
                  <View style={styles.breakdownHeaderRow}>
                    <Briefcase size={14} color="#4F46E5" />
                    <Text style={styles.breakdownCardLabel}>WORKING DAYS</Text>
                  </View>
                  <Text style={styles.breakdownCardValue}>
                    {diff.workingDays.toLocaleString("en-US")}
                  </Text>
                  <Text style={styles.breakdownSub}>Mon - Fri</Text>
                </View>

                <View style={styles.breakdownCard}>
                  <View style={styles.breakdownHeaderRow}>
                    <Calendar size={14} color="#D97706" />
                    <Text style={styles.breakdownCardLabel}>WEEKEND DAYS</Text>
                  </View>
                  <Text style={styles.breakdownCardValue}>
                    {diff.weekendDays.toLocaleString("en-US")}
                  </Text>
                  <Text style={styles.breakdownSub}>Sat & Sun</Text>
                </View>
              </View>
            </View>
          ) : (
            <View style={styles.placeholderBox}>
              <Text style={styles.placeholderText}>
                Enter start and end dates
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
    backgroundColor: "#EEF2FF",
    borderRadius: 20,
    padding: 18,
    borderWidth: 1,
    borderColor: "#E0E7FF",
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 11,
    fontWeight: "800",
    color: "#3730A3",
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
  friendlyDateBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#E0E7FF",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    alignSelf: "flex-start",
    marginTop: 6,
    gap: 6,
  },
  friendlyDateText: {
    fontSize: 12,
    fontWeight: "700",
    color: "#4338CA",
  },
  resultBox: {
    backgroundColor: "#EEF2FF",
    borderRadius: 22,
    padding: 18,
    borderWidth: 1.5,
    borderColor: "#C7D2FE",
    shadowColor: "#4F46E5",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 3,
  },
  resultHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 14,
  },
  headerGroup: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  resultCategory: {
    fontSize: 11,
    fontWeight: "800",
    color: "#3730A3",
    letterSpacing: 0.5,
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
    borderColor: "#C7D2FE",
    gap: 4,
  },
  copyBtnText: {
    fontSize: 11,
    fontWeight: "800",
    color: "#3730A3",
  },
  resetBtn: {
    width: 30,
    height: 30,
    borderRadius: 8,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#C7D2FE",
  },
  resultContent: {
    gap: 12,
  },
  heroDurationCard: {
    backgroundColor: "rgba(255,255,255,0.9)",
    borderRadius: 16,
    padding: 16,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#C7D2FE",
  },
  heroPriceRow: {
    flexDirection: "row",
    alignItems: "baseline",
    gap: 6,
  },
  heroDaysNum: {
    fontSize: 44,
    fontWeight: "900",
    color: "#0F172A",
  },
  heroDaysLabel: {
    fontSize: 22,
    fontWeight: "800",
    color: "#4338CA",
  },
  weeksBadge: {
    backgroundColor: "#E0E7FF",
    borderWidth: 1,
    borderColor: "#C7D2FE",
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    marginTop: 8,
  },
  weeksBadgeText: {
    fontSize: 12,
    fontWeight: "800",
    color: "#3730A3",
  },
  breakdownGrid: {
    flexDirection: "row",
    gap: 10,
  },
  breakdownCard: {
    flex: 1,
    backgroundColor: "rgba(255,255,255,0.85)",
    borderRadius: 14,
    padding: 12,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#C7D2FE",
  },
  breakdownHeaderRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    marginBottom: 4,
  },
  breakdownCardLabel: {
    fontSize: 10,
    fontWeight: "800",
    color: "#3730A3",
    letterSpacing: 0.5,
  },
  breakdownCardValue: {
    fontSize: 26,
    fontWeight: "900",
    color: "#0F172A",
    marginVertical: 2,
  },
  breakdownSub: {
    fontSize: 10,
    fontWeight: "600",
    color: "#94A3B8",
  },
  placeholderBox: {
    backgroundColor: "rgba(255,255,255,0.6)",
    padding: 24,
    borderRadius: 14,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#C7D2FE",
  },
  placeholderText: {
    fontSize: 14,
    fontWeight: "700",
    color: "#4338CA",
  },
});
