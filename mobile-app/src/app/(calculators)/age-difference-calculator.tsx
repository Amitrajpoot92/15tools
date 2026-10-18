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
import { Copy, RotateCcw, Check, Calendar, ArrowRight, Users } from "lucide-react-native";

export default function AgeDifferenceCalculatorScreen() {
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

    const olderDate = d1 < d2 ? d1 : d2;
    const youngerDate = d1 < d2 ? d2 : d1;

    let years = youngerDate.getFullYear() - olderDate.getFullYear();
    let months = youngerDate.getMonth() - olderDate.getMonth();
    let days = youngerDate.getDate() - olderDate.getDate();

    if (days < 0) {
      months--;
      const previousMonth = new Date(
        youngerDate.getFullYear(),
        youngerDate.getMonth(),
        0
      );
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
      ? Math.floor(
          Math.abs(d1Date.getTime() - d2Date.getTime()) / (1000 * 3600 * 24)
        )
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
      totalDays ? totalDays.toLocaleString("en-US") : ""
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
    <SafeAreaView style={styles.container} edges={["top", "bottom"]}>
      <StatusBar style="dark" />
      <CalculatorHeader
        title="Age Difference Calculator"
        subtitle="Compare two dates of birth to find the exact age difference between two people."
        iconName="Clock"
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
          <Text style={styles.inputLabel}>FIRST PERSON'S DOB</Text>
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

          <Text style={[styles.inputLabel, { marginTop: 16 }]}>
            SECOND PERSON'S DOB
          </Text>
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
              <Users size={16} color="#4338CA" />
              <Text style={styles.resultCategory}>COMPARATIVE AGE DIFFERENCE</Text>
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
              {/* Comparative banner */}
              <View style={styles.comparisonBanner}>
                <View style={styles.comparisonRow}>
                  <Text style={styles.personText}>Person 1</Text>
                  <ArrowRight size={14} color="#94A3B8" />
                  <Text style={styles.relationText}>is {comparisonRelation} Person 2</Text>
                </View>
                <Text style={styles.chronologicalSub}>Chronological separation:</Text>
              </View>

              {/* 3 Main Cards: Years, Months, Days */}
              <View style={styles.tripletGrid}>
                <View style={styles.tripletCard}>
                  <Text style={styles.tripletValue}>{diff.years}</Text>
                  <Text style={styles.tripletLabel}>YEARS</Text>
                </View>
                <View style={styles.tripletCard}>
                  <Text style={styles.tripletValue}>{diff.months}</Text>
                  <Text style={styles.tripletLabel}>MONTHS</Text>
                </View>
                <View style={styles.tripletCard}>
                  <Text style={styles.tripletValue}>{diff.days}</Text>
                  <Text style={styles.tripletLabel}>DAYS</Text>
                </View>
              </View>

              {/* Total Absolute Gap */}
              <View style={styles.gapCard}>
                <Text style={styles.gapLabel}>Total Absolute Gap:</Text>
                <Text style={styles.gapValue}>
                  {totalDays?.toLocaleString("en-US")}{" "}
                  <Text style={styles.gapDaysUnit}>Days</Text>
                </Text>
              </View>
            </View>
          ) : (
            <View style={styles.placeholderBox}>
              <Text style={styles.placeholderText}>
                Enter both dates to compare
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
  comparisonBanner: {
    backgroundColor: "rgba(255,255,255,0.9)",
    borderRadius: 14,
    padding: 12,
    borderWidth: 1,
    borderColor: "#C7D2FE",
  },
  comparisonRow: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
    gap: 6,
  },
  personText: {
    fontSize: 14,
    fontWeight: "800",
    color: "#4338CA",
  },
  relationText: {
    fontSize: 14,
    fontWeight: "700",
    color: "#1E293B",
  },
  chronologicalSub: {
    fontSize: 11,
    color: "#64748B",
    marginTop: 3,
  },
  tripletGrid: {
    flexDirection: "row",
    gap: 10,
  },
  tripletCard: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    paddingVertical: 14,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E0E7FF",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 1,
  },
  tripletValue: {
    fontSize: 32,
    fontWeight: "900",
    color: "#0F172A",
  },
  tripletLabel: {
    fontSize: 10,
    fontWeight: "800",
    color: "#4338CA",
    letterSpacing: 1,
    marginTop: 4,
  },
  gapCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    padding: 14,
    borderWidth: 1,
    borderColor: "#C7D2FE",
  },
  gapLabel: {
    fontSize: 13,
    fontWeight: "700",
    color: "#475569",
  },
  gapValue: {
    fontSize: 18,
    fontWeight: "900",
    color: "#0F172A",
  },
  gapDaysUnit: {
    fontSize: 13,
    fontWeight: "800",
    color: "#4338CA",
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
