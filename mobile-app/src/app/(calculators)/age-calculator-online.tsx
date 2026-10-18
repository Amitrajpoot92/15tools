import React, { useState, useEffect } from "react";
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
import { Copy, RotateCcw, Check, Calendar } from "lucide-react-native";

export default function AgeCalculatorScreen() {
  const [dobInput, setDobInput] = useState("");
  const [todayInput, setTodayInput] = useState("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const d = new Date();
    const formatted = `${String(d.getDate()).padStart(2, "0")}/${String(
      d.getMonth() + 1
    ).padStart(2, "0")}/${d.getFullYear()}`;
    setTodayInput(formatted);
  }, []);

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

  const calculateAge = () => {
    const birthDate = parseDateStr(dobInput);
    const currentDate = parseDateStr(todayInput);

    if (!birthDate || !currentDate) return null;
    if (birthDate > currentDate) return null;

    let years = currentDate.getFullYear() - birthDate.getFullYear();
    let months = currentDate.getMonth() - birthDate.getMonth();
    let days = currentDate.getDate() - birthDate.getDate();

    if (days < 0) {
      months--;
      const previousMonth = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
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

  const getExtraInfo = () => {
    const birthDate = parseDateStr(dobInput);
    const currentDate = parseDateStr(todayInput);
    if (!birthDate || !currentDate || birthDate > currentDate) return null;

    const dayOfBirth = birthDate.toLocaleDateString("en-US", { weekday: "long" });
    const totalDays = Math.floor(
      (currentDate.getTime() - birthDate.getTime()) / (1000 * 3600 * 24)
    );

    let totalMonths =
      (currentDate.getFullYear() - birthDate.getFullYear()) * 12 +
      (currentDate.getMonth() - birthDate.getMonth());
    if (currentDate.getDate() < birthDate.getDate()) {
      totalMonths--;
    }

    let nextBday = new Date(
      currentDate.getFullYear(),
      birthDate.getMonth(),
      birthDate.getDate()
    );
    if (nextBday.getTime() < currentDate.getTime()) {
      nextBday.setFullYear(currentDate.getFullYear() + 1);
    }
    const daysToNext = Math.ceil(
      (nextBday.getTime() - currentDate.getTime()) / (1000 * 3600 * 24)
    );

    return {
      dayOfBirth,
      totalDays: totalDays.toLocaleString("en-US"),
      totalMonths: totalMonths.toLocaleString("en-US"),
      daysToNext,
    };
  };

  const age = calculateAge();
  const extraInfo = getExtraInfo();
  const dobDate = parseDateStr(dobInput);
  const todayDate = parseDateStr(todayInput);

  const handleCopy = async () => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    const text = `Age Calculator\nDate of Birth: ${dobInput} ${
      dobDate ? `(${formatFriendlyDate(dobDate)})` : ""
    }\nAge at Date: ${todayInput} ${
      todayDate ? `(${formatFriendlyDate(todayDate)})` : ""
    }\nExact Age: ${
      age ? `${age.years} Years, ${age.months} Months, ${age.days} Days` : ""
    }${
      extraInfo
        ? `\nDay of Birth: ${extraInfo.dayOfBirth}\nTotal Months Lived: ${
            extraInfo.totalMonths
          }\nTotal Days Lived: ${extraInfo.totalDays}\nNext Birthday: ${
            extraInfo.daysToNext === 0
              ? "Today!"
              : `in ${extraInfo.daysToNext} days`
          }`
        : ""
    }\n\nCalculate Online: https://topcalcbox.com/age-calculator-online/`;
    await Clipboard.setStringAsync(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleReset = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    setDobInput("");
    const d = new Date();
    setTodayInput(
      `${String(d.getDate()).padStart(2, "0")}/${String(
        d.getMonth() + 1
      ).padStart(2, "0")}/${d.getFullYear()}`
    );
  };

  return (
    <SafeAreaView style={styles.container} edges={["top", "bottom"]}>
      <StatusBar style="dark" />
      <CalculatorHeader
        title="Age Calculator Online"
        subtitle="Calculate your exact age in years, months, days, and even seconds."
        iconName="CalendarDays"
        themeColor="#9333EA"
        themeBg="#FAF5FF"
      />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {/* Input Card */}
        <View style={styles.inputCard}>
          <Text style={styles.inputLabel}>DATE OF BIRTH</Text>
          <View style={styles.inputWrapper}>
            <TextInput
              style={styles.textInput}
              keyboardType="numeric"
              value={dobInput}
              onChangeText={(val) => setDobInput(formatInputDate(val))}
              placeholder="DD/MM/YYYY"
              placeholderTextColor="#94A3B8"
              maxLength={10}
            />
          </View>
          {dobDate && (
            <View style={styles.friendlyDateBadge}>
              <Calendar size={13} color="#7E22CE" />
              <Text style={styles.friendlyDateText}>
                {formatFriendlyDate(dobDate)}
              </Text>
            </View>
          )}

          <Text style={[styles.inputLabel, { marginTop: 16 }]}>AGE AT DATE</Text>
          <View style={styles.inputWrapper}>
            <TextInput
              style={styles.textInput}
              keyboardType="numeric"
              value={todayInput}
              onChangeText={(val) => setTodayInput(formatInputDate(val))}
              placeholder="DD/MM/YYYY"
              placeholderTextColor="#94A3B8"
              maxLength={10}
            />
          </View>
          {todayDate && (
            <View style={styles.friendlyDateBadge}>
              <Calendar size={13} color="#7E22CE" />
              <Text style={styles.friendlyDateText}>
                {formatFriendlyDate(todayDate)}
              </Text>
            </View>
          )}
        </View>

        {/* Result Box */}
        <View style={styles.resultBox}>
          <View style={styles.resultHeader}>
            <Text style={styles.resultCategory}>AGE OVERVIEW</Text>
            <View style={styles.actionButtons}>
              <Pressable onPress={handleCopy} style={styles.copyBtn}>
                {copied ? <Check size={14} color="#059669" /> : <Copy size={14} color="#7E22CE" />}
                <Text style={[styles.copyBtnText, copied && { color: "#059669" }]}>
                  {copied ? "Copied" : "Copy"}
                </Text>
              </Pressable>
              <Pressable onPress={handleReset} style={styles.resetBtn}>
                <RotateCcw size={15} color="#7E22CE" />
              </Pressable>
            </View>
          </View>

          {age ? (
            <View style={styles.resultContent}>
              {/* 3 Main Cards: Years, Months, Days */}
              <View style={styles.tripletGrid}>
                <View style={styles.tripletCard}>
                  <Text style={styles.tripletValue}>{age.years}</Text>
                  <Text style={styles.tripletLabel}>YEARS</Text>
                </View>
                <View style={styles.tripletCard}>
                  <Text style={styles.tripletValue}>{age.months}</Text>
                  <Text style={styles.tripletLabel}>MONTHS</Text>
                </View>
                <View style={styles.tripletCard}>
                  <Text style={styles.tripletValue}>{age.days}</Text>
                  <Text style={styles.tripletLabel}>DAYS</Text>
                </View>
              </View>

              {/* 4 Extra Info Cards */}
              {extraInfo && (
                <View style={styles.extraGrid}>
                  <View style={styles.extraCard}>
                    <Text style={styles.extraLabel}>DAY OF BIRTH</Text>
                    <Text style={styles.extraValue}>{extraInfo.dayOfBirth}</Text>
                  </View>
                  <View style={styles.extraCard}>
                    <Text style={styles.extraLabel}>NEXT BIRTHDAY</Text>
                    <Text style={[styles.extraValue, { color: "#7E22CE" }]}>
                      {extraInfo.daysToNext === 0
                        ? "Today!"
                        : `in ${extraInfo.daysToNext} days`}
                    </Text>
                  </View>
                  <View style={styles.extraCard}>
                    <Text style={styles.extraLabel}>TOTAL MONTHS</Text>
                    <Text style={styles.extraValue}>{extraInfo.totalMonths}</Text>
                  </View>
                  <View style={styles.extraCard}>
                    <Text style={styles.extraLabel}>TOTAL DAYS</Text>
                    <Text style={styles.extraValue}>{extraInfo.totalDays}</Text>
                  </View>
                </View>
              )}
            </View>
          ) : (
            <View style={styles.placeholderBox}>
              <Text style={styles.placeholderText}>
                Enter your Date of Birth above
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
    backgroundColor: "#FAF5FF",
    borderRadius: 20,
    padding: 18,
    borderWidth: 1,
    borderColor: "#F3E8FF",
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 11,
    fontWeight: "800",
    color: "#6B21A8",
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
    backgroundColor: "#F3E8FF",
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
    color: "#7E22CE",
  },
  resultBox: {
    backgroundColor: "#FAF5FF",
    borderRadius: 22,
    padding: 18,
    borderWidth: 1.5,
    borderColor: "#E9D5FF",
    shadowColor: "#9333EA",
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
  resultCategory: {
    fontSize: 12,
    fontWeight: "800",
    color: "#6B21A8",
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
    borderColor: "#E9D5FF",
    gap: 4,
  },
  copyBtnText: {
    fontSize: 11,
    fontWeight: "800",
    color: "#6B21A8",
  },
  resetBtn: {
    width: 30,
    height: 30,
    borderRadius: 8,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E9D5FF",
  },
  resultContent: {
    gap: 12,
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
    borderColor: "#F3E8FF",
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
    color: "#7E22CE",
    letterSpacing: 1,
    marginTop: 4,
  },
  extraGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  extraCard: {
    width: "48%",
    backgroundColor: "rgba(255,255,255,0.85)",
    borderRadius: 14,
    padding: 12,
    borderWidth: 1,
    borderColor: "#E9D5FF",
  },
  extraLabel: {
    fontSize: 10,
    fontWeight: "800",
    color: "#64748B",
    letterSpacing: 0.5,
    marginBottom: 4,
  },
  extraValue: {
    fontSize: 14,
    fontWeight: "900",
    color: "#0F172A",
  },
  placeholderBox: {
    backgroundColor: "rgba(255,255,255,0.6)",
    padding: 24,
    borderRadius: 14,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E9D5FF",
  },
  placeholderText: {
    fontSize: 14,
    fontWeight: "700",
    color: "#7E22CE",
  },
});
