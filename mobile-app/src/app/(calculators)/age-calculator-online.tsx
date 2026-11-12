import React, { useState, useEffect } from "react";
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
import { Calendar } from "lucide-react-native";

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

  const calculateAge = () => {
    const birthDate = parseDateStr(dobInput);
    const currentDate = parseDateStr(todayInput);
    if (!birthDate || !currentDate || birthDate > currentDate) return null;

    let years = currentDate.getFullYear() - birthDate.getFullYear();
    let months = currentDate.getMonth() - birthDate.getMonth();
    let days = currentDate.getDate() - birthDate.getDate();

    if (days < 0) {
      months--;
      const previousMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 0);
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
    const totalDays = Math.floor((currentDate.getTime() - birthDate.getTime()) / (1000 * 3600 * 24));
    let totalMonths =
      (currentDate.getFullYear() - birthDate.getFullYear()) * 12 +
      (currentDate.getMonth() - birthDate.getMonth());
    if (currentDate.getDate() < birthDate.getDate()) totalMonths--;

    const nextBday = new Date(currentDate.getFullYear(), birthDate.getMonth(), birthDate.getDate());
    if (nextBday.getTime() < currentDate.getTime()) {
      nextBday.setFullYear(currentDate.getFullYear() + 1);
    }
    const daysToNext = Math.ceil((nextBday.getTime() - currentDate.getTime()) / (1000 * 3600 * 24));

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
    }\nAge at Date: ${todayInput} ${todayDate ? `(${formatFriendlyDate(todayDate)})` : ""}\nExact Age: ${
      age ? `${age.years} Years, ${age.months} Months, ${age.days} Days` : ""
    }${
      extraInfo
        ? `\nDay of Birth: ${extraInfo.dayOfBirth}\nTotal Months Lived: ${
            extraInfo.totalMonths
          }\nTotal Days Lived: ${extraInfo.totalDays}\nNext Birthday: ${
            extraInfo.daysToNext === 0 ? "Today!" : `in ${extraInfo.daysToNext} days`
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
      `${String(d.getDate()).padStart(2, "0")}/${String(d.getMonth() + 1).padStart(
        2,
        "0"
      )}/${d.getFullYear()}`
    );
  };

  return (
    <SafeAreaView style={sharedStyles.safeArea} edges={["top", "bottom"]}>
      <StatusBar style="dark" />
      <CalculatorHeader
        title="Age Calculator Online"
        subtitle="Find your exact age in years, months, and days based on your date of birth."
        iconName="CalendarDays"
        color="indigo"
      />

      <ScrollView
        contentContainerStyle={sharedStyles.scrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <OuterToolCard>
          <FormPanel theme="indigo">
            <Text style={sharedStyles.fieldLabel}>Date of Birth (DD/MM/YYYY)</Text>
            <View style={sharedStyles.inputBox}>
              <TextInput
                style={sharedStyles.textInput}
                keyboardType="numeric"
                value={dobInput}
                onChangeText={(val) => setDobInput(formatInputDate(val))}
                placeholder="DD/MM/YYYY"
                placeholderTextColor="#94A3B8"
                maxLength={10}
              />
            </View>
            {dobDate && (
              <View style={styles.dateBadge}>
                <Calendar size={13} color="#4F46E5" />
                <Text style={styles.dateBadgeText}>{formatFriendlyDate(dobDate)}</Text>
              </View>
            )}

            <Text style={[sharedStyles.fieldLabel, { marginTop: 14 }]}>Age at Date (DD/MM/YYYY)</Text>
            <View style={sharedStyles.inputBox}>
              <TextInput
                style={sharedStyles.textInput}
                keyboardType="numeric"
                value={todayInput}
                onChangeText={(val) => setTodayInput(formatInputDate(val))}
                placeholder="DD/MM/YYYY"
                placeholderTextColor="#94A3B8"
                maxLength={10}
              />
            </View>
            {todayDate && (
              <View style={styles.dateBadge}>
                <Calendar size={13} color="#4F46E5" />
                <Text style={styles.dateBadgeText}>{formatFriendlyDate(todayDate)}</Text>
              </View>
            )}
          </FormPanel>

          <ResultPanel theme="indigo">
            <View style={sharedStyles.resultHeaderRow}>
              <Text style={sharedStyles.resultKicker}>Exact Age Overview</Text>
              <CopyResetActions copied={copied} onCopy={handleCopy} onReset={handleReset} theme="indigo" />
            </View>

            {age ? (
              <View style={{ gap: 10 }}>
                <View style={styles.tripletRow}>
                  <View style={styles.tripletCard}>
                    <Text style={styles.tripletVal}>{age.years}</Text>
                    <Text style={styles.tripletLbl}>Years</Text>
                  </View>
                  <View style={styles.tripletCard}>
                    <Text style={styles.tripletVal}>{age.months}</Text>
                    <Text style={styles.tripletLbl}>Months</Text>
                  </View>
                  <View style={styles.tripletCard}>
                    <Text style={styles.tripletVal}>{age.days}</Text>
                    <Text style={styles.tripletLbl}>Days</Text>
                  </View>
                </View>

                {extraInfo && (
                  <>
                    <View style={sharedStyles.grid2}>
                      <StatTile label="Day of Birth" value={extraInfo.dayOfBirth} borderColor="#C7D2FE" />
                      <StatTile
                        label="Next Birthday"
                        value={extraInfo.daysToNext === 0 ? "Today!" : `${extraInfo.daysToNext} Days`}
                        valueColor="#4F46E5"
                        borderColor="#C7D2FE"
                      />
                    </View>
                    <View style={sharedStyles.grid2}>
                      <StatTile label="Total Months" value={extraInfo.totalMonths} borderColor="#C7D2FE" />
                      <StatTile label="Total Days" value={extraInfo.totalDays} borderColor="#C7D2FE" />
                    </View>
                  </>
                )}
              </View>
            ) : (
              <Text style={styles.emptyHint}>Enter a valid date of birth (DD/MM/YYYY) to see your exact age.</Text>
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
