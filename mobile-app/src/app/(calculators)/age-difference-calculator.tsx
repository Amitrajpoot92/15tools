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
import { Calendar, Users } from "lucide-react-native";

export default function AgeDifferenceCalculatorScreen() {
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

    const olderDate = d1 < d2 ? d1 : d2;
    const youngerDate = d1 < d2 ? d2 : d1;

    let years = youngerDate.getFullYear() - olderDate.getFullYear();
    let months = youngerDate.getMonth() - olderDate.getMonth();
    let days = youngerDate.getDate() - olderDate.getDate();

    if (days < 0) {
      months--;
      const previousMonth = new Date(youngerDate.getFullYear(), youngerDate.getMonth(), 0);
      days += previousMonth.getDate();
    }
    if (months < 0) {
      years--;
      months += 12;
    }
    return { years, months, days };
  };

  const diff = calculateDifference();
  const d1Date = parseDateStr(date1Input);
  const d2Date = parseDateStr(date2Input);
  const totalDays =
    d1Date && d2Date
      ? Math.floor(Math.abs(d1Date.getTime() - d2Date.getTime()) / (1000 * 3600 * 24))
      : null;

  const comparisonRelation =
    d1Date && d2Date
      ? d1Date.getTime() === d2Date.getTime()
        ? "exactly the same age as"
        : d1Date < d2Date
        ? "older than"
        : "younger than"
      : "";

  const handleCopy = async () => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    const text = `Age Difference Calculator\nPerson 1: ${date1Input} ${
      d1Date ? `(${formatFriendlyDate(d1Date)})` : ""
    }\nPerson 2: ${date2Input} ${
      d2Date ? `(${formatFriendlyDate(d2Date)})` : ""
    }\nResult: Person 1 is ${comparisonRelation} Person 2\nAge Gap: ${
      diff ? `${diff.years} Years, ${diff.months} Months, ${diff.days} Days` : ""
    }\nTotal Absolute Gap: ${
      totalDays !== null ? totalDays.toLocaleString("en-US") : ""
    } Days\n\nCalculate Online: https://topcalcbox.com/age-difference-calculator/`;
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
        title="Age Difference Calculator"
        subtitle="Easily calculate the exact age gap between two people in years, months, and days."
        iconName="Clock"
        color="indigo"
      />

      <ScrollView
        contentContainerStyle={sharedStyles.scrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <OuterToolCard>
          <FormPanel theme="indigo">
            <Text style={sharedStyles.fieldLabel}>First Person's DOB (DD/MM/YYYY)</Text>
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

            <Text style={[sharedStyles.fieldLabel, { marginTop: 14 }]}>
              Second Person's DOB (DD/MM/YYYY)
            </Text>
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
                <Users size={15} color="#4F46E5" />
                <Text style={sharedStyles.resultKicker}>Comparative Age Difference</Text>
              </View>
              <CopyResetActions copied={copied} onCopy={handleCopy} onReset={handleReset} theme="indigo" />
            </View>

            {diff ? (
              <View style={{ gap: 10 }}>
                <View style={styles.relationBanner}>
                  <Text style={styles.relationText}>
                    Person 1 is <Text style={{ color: "#4338CA" }}>{comparisonRelation}</Text> Person 2
                  </Text>
                </View>

                <View style={styles.tripletRow}>
                  <View style={styles.tripletCard}>
                    <Text style={styles.tripletVal}>{diff.years}</Text>
                    <Text style={styles.tripletLbl}>Years</Text>
                  </View>
                  <View style={styles.tripletCard}>
                    <Text style={styles.tripletVal}>{diff.months}</Text>
                    <Text style={styles.tripletLbl}>Months</Text>
                  </View>
                  <View style={styles.tripletCard}>
                    <Text style={styles.tripletVal}>{diff.days}</Text>
                    <Text style={styles.tripletLbl}>Days</Text>
                  </View>
                </View>

                {totalDays !== null && (
                  <StatTile
                    label="Total Absolute Gap"
                    value={`${totalDays.toLocaleString("en-US")} Days`}
                    valueColor="#4338CA"
                    borderColor="#C7D2FE"
                  />
                )}
              </View>
            ) : (
              <Text style={styles.emptyHint}>Enter both birth dates (DD/MM/YYYY) to compare.</Text>
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
  relationBanner: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1.5,
    borderColor: "#C7D2FE",
    borderRadius: 12,
    paddingVertical: 9,
    paddingHorizontal: 12,
  },
  relationText: { fontSize: 13, fontWeight: "800", color: "#0F172A", textAlign: "center" },
  tripletRow: { flexDirection: "row", gap: 8 },
  tripletCard: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    borderWidth: 1.5,
    borderColor: "#93C5FD",
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: "center",
  },
  tripletVal: { fontSize: 28, fontWeight: "900", color: "#1E1B4B" },
  tripletLbl: { fontSize: 10, fontWeight: "800", color: "#4F46E5", textTransform: "uppercase", marginTop: 2 },
  emptyHint: { fontSize: 13, fontWeight: "600", color: "#1E1B4B", marginTop: 4 },
});
