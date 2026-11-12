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
import { Calendar, Clock } from "lucide-react-native";

export default function DateDifferenceCalculatorScreen() {
  const [date1Input, setDate1Input] = useState("");
  const [date2Input, setDate2Input] = useState("");
  const [copied, setCopied] = useState(false);

  const formatInputDate = (val: string) => {
    let cleaned = val.replace(/\D/g, "");
    if (cleaned.length > 2) cleaned = cleaned.slice(0, 2) + "/" + cleaned.slice(2);
    if (cleaned.length > 5) cleaned = cleaned.slice(0, 5) + "/" + cleaned.slice(5, 9);
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
    if (date.getDate() === d && date.getMonth() === m && date.getFullYear() === y) return date;
    return null;
  };

  const formatFriendlyDate = (date: Date | null) =>
    date ? date.toLocaleDateString("en-GB", { day: "2-digit", month: "long", year: "numeric" }) : "";

  const calculateDifference = () => {
    const d1 = parseDateStr(date1Input);
    const d2 = parseDateStr(date2Input);
    if (!d1 || !d2) return null;

    const startDate = d1 < d2 ? d1 : d2;
    const endDate = d1 < d2 ? d2 : d1;
    const totalDays = Math.round((endDate.getTime() - startDate.getTime()) / (1000 * 3600 * 24));
    const totalWeeks = Math.floor(totalDays / 7);
    const remainingDays = totalDays % 7;

    let weekendDays = totalWeeks * 2;
    const startDayOfWeek = startDate.getDay();
    for (let i = 1; i <= remainingDays; i++) {
      const currentDay = (startDayOfWeek + i) % 7;
      if (currentDay === 0 || currentDay === 6) weekendDays++;
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
    <SafeAreaView style={sharedStyles.safeArea} edges={["top", "bottom"]}>
      <StatusBar style="dark" />
      <CalculatorHeader
        title="Date Difference Calculator"
        subtitle="Calculate the exact number of days, weeks, months, and years between any two calendar dates."
        iconName="CalendarRange"
        color="indigo"
      />

      <ScrollView
        contentContainerStyle={sharedStyles.scrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <OuterToolCard>
          <FormPanel theme="indigo">
            <Text style={sharedStyles.fieldLabel}>Start Date (DD/MM/YYYY)</Text>
            <View style={sharedStyles.inputBox}>
              <TextInput
                style={sharedStyles.textInput}
                keyboardType="numeric"
                value={date1Input}
                onChangeText={(val) => setDate1Input(formatInputDate(val))}
                placeholder="DD/MM/YYYY"
                placeholderTextColor="#94A3B8"
                maxLength={10}
              />
            </View>
            {d1Date && (
              <View style={styles.dateBadge}>
                <Calendar size={13} color="#4F46E5" />
                <Text style={styles.dateBadgeText}>{formatFriendlyDate(d1Date)}</Text>
              </View>
            )}

            <Text style={[sharedStyles.fieldLabel, { marginTop: 14 }]}>End Date (DD/MM/YYYY)</Text>
            <View style={sharedStyles.inputBox}>
              <TextInput
                style={sharedStyles.textInput}
                keyboardType="numeric"
                value={date2Input}
                onChangeText={(val) => setDate2Input(formatInputDate(val))}
                placeholder="DD/MM/YYYY"
                placeholderTextColor="#94A3B8"
                maxLength={10}
              />
            </View>
            {d2Date && (
              <View style={styles.dateBadge}>
                <Calendar size={13} color="#4F46E5" />
                <Text style={styles.dateBadgeText}>{formatFriendlyDate(d2Date)}</Text>
              </View>
            )}
          </FormPanel>

          <ResultPanel theme="indigo">
            <View style={sharedStyles.resultHeaderRow}>
              <View style={styles.kickerRow}>
                <Clock size={15} color="#4F46E5" />
                <Text style={sharedStyles.resultKicker}>Date Duration Overview</Text>
              </View>
              <CopyResetActions copied={copied} onCopy={handleCopy} onReset={handleReset} theme="indigo" />
            </View>

            {diff ? (
              <View style={{ gap: 10 }}>
                <View style={styles.heroCard}>
                  <View style={styles.daysRow}>
                    <Text style={styles.daysNum}>{diff.totalDays.toLocaleString("en-US")}</Text>
                    <Text style={styles.daysUnit}>Days</Text>
                  </View>
                  {diff.totalDays > 0 && (
                    <View style={styles.weeksPill}>
                      <Text style={styles.weeksText}>
                        {diff.totalWeeks} {diff.totalWeeks === 1 ? "week" : "weeks"} &{" "}
                        {diff.remainingDays} {diff.remainingDays === 1 ? "day" : "days"}
                      </Text>
                    </View>
                  )}
                </View>

                <View style={sharedStyles.grid2}>
                  <StatTile
                    label="Working Days"
                    value={diff.workingDays.toLocaleString("en-US")}
                    valueColor="#4338CA"
                    subtext="Mon - Fri"
                    borderColor="#C7D2FE"
                  />
                  <StatTile
                    label="Weekend Days"
                    value={diff.weekendDays.toLocaleString("en-US")}
                    valueColor="#0F172A"
                    subtext="Sat - Sun"
                    borderColor="#C7D2FE"
                  />
                </View>
              </View>
            ) : (
              <Text style={styles.emptyHint}>Enter both start and end dates (DD/MM/YYYY).</Text>
            )}
          </ResultPanel>
        </OuterToolCard>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  dateBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginTop: 6,
    alignSelf: "flex-start",
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#C7D2FE",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 999,
  },
  dateBadgeText: { fontSize: 11, fontWeight: "700", color: "#3730A3" },
  kickerRow: { flexDirection: "row", alignItems: "center", gap: 6, flex: 1 },
  heroCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    borderWidth: 1.5,
    borderColor: "#93C5FD",
    paddingVertical: 14,
    paddingHorizontal: 14,
    alignItems: "center",
  },
  daysRow: { flexDirection: "row", alignItems: "baseline", gap: 6 },
  daysNum: { fontSize: 36, fontWeight: "900", color: "#1E1B4B" },
  daysUnit: { fontSize: 18, fontWeight: "800", color: "#4F46E5" },
  weeksPill: {
    marginTop: 6,
    backgroundColor: "#EEF2FF",
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 4,
  },
  weeksText: { fontSize: 12, fontWeight: "800", color: "#3730A3" },
  emptyHint: { fontSize: 13, fontWeight: "600", color: "#1E1B4B", marginTop: 4 },
});
