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
  sharedStyles,
} from "@/components/CalculatorUI";
import { Calendar } from "lucide-react-native";

export default function BirthdayCountdownScreen() {
  const [name, setName] = useState("");
  const [dobInput, setDobInput] = useState("");
  const [timeLeft, setTimeLeft] = useState<{
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
  } | null>(null);
  const [turningAge, setTurningAge] = useState<number | null>(null);
  const [isBirthday, setIsBirthday] = useState(false);
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

  const dobDateObj = parseDateStr(dobInput);

  useEffect(() => {
    if (!dobDateObj) {
      setTimeLeft(null);
      setTurningAge(null);
      setIsBirthday(false);
      return;
    }

    const updateTick = () => {
      const now = new Date();
      const nextBday = new Date(dobDateObj.getTime());
      nextBday.setFullYear(now.getFullYear());

      const isToday =
        now.getMonth() === dobDateObj.getMonth() && now.getDate() === dobDateObj.getDate();

      if (isToday) {
        setIsBirthday(true);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        setTurningAge(now.getFullYear() - dobDateObj.getFullYear());
        return;
      } else {
        setIsBirthday(false);
      }

      if (now.getTime() > nextBday.getTime()) {
        nextBday.setFullYear(now.getFullYear() + 1);
      }

      const diff = nextBday.getTime() - now.getTime();
      setTurningAge(nextBday.getFullYear() - dobDateObj.getFullYear());

      if (diff <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / 1000 / 60) % 60),
        seconds: Math.floor((diff / 1000) % 60),
      });
    };

    updateTick();
    const interval = setInterval(updateTick, 1000);
    return () => clearInterval(interval);
  }, [dobInput]);

  const handleCopy = async () => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    const bdayText = isBirthday
      ? `Happy Birthday ${name}! You are exactly ${turningAge} years old today! 🎉`
      : `Next milestone celebration: Turning ${turningAge} years old!`;
    const text = `Birthday Countdown${name ? ` for ${name}` : ""}\nDate of Birth: ${dobInput} ${
      dobDateObj ? `(${formatFriendlyDate(dobDateObj)})` : ""
    }\n${dobDateObj ? bdayText : ""}\nTime Left: ${
      timeLeft && !isBirthday
        ? `${timeLeft.days} Days, ${timeLeft.hours} Hrs, ${timeLeft.minutes} Min, ${timeLeft.seconds} Sec`
        : isBirthday
        ? "Today!"
        : "N/A"
    }\n\nCalculate Online: https://topcalcbox.com/birthday-countdown/`;
    await Clipboard.setStringAsync(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleReset = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    setDobInput("");
    setName("");
  };

  return (
    <SafeAreaView style={sharedStyles.safeArea} edges={["top", "bottom"]}>
      <StatusBar style="dark" />
      <CalculatorHeader
        title="Birthday Countdown"
        subtitle="Excited for your special day? Start a live countdown to see exactly how much time is left."
        iconName="Timer"
        color="fuchsia"
      />

      <ScrollView
        contentContainerStyle={sharedStyles.scrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <OuterToolCard>
          <FormPanel theme="fuchsia">
            <Text style={sharedStyles.fieldLabel}>
              Name <Text style={styles.opt}>(Optional)</Text>
            </Text>
            <View style={sharedStyles.inputBox}>
              <TextInput
                style={sharedStyles.textInput}
                value={name}
                onChangeText={setName}
                placeholder="e.g. Alex"
                placeholderTextColor="#94A3B8"
              />
            </View>

            <Text style={[sharedStyles.fieldLabel, { marginTop: 14 }]}>Date of Birth (DD/MM/YYYY)</Text>
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
            {dobDateObj && (
              <View style={styles.dateBadge}>
                <Calendar size={13} color="#C026D3" />
                <Text style={styles.dateBadgeText}>{formatFriendlyDate(dobDateObj)}</Text>
              </View>
            )}
          </FormPanel>

          <ResultPanel theme="fuchsia">
            <View style={sharedStyles.resultHeaderRow}>
              <Text style={sharedStyles.resultKicker}>
                {name ? `${name.trim()}'s Next Birthday` : "Your Next Birthday"}
              </Text>
              <CopyResetActions copied={copied} onCopy={handleCopy} onReset={handleReset} theme="fuchsia" />
            </View>

            {turningAge !== null && (
              <Text style={styles.turningText}>
                {isBirthday
                  ? `Happy Birthday! You are ${turningAge} years old today!`
                  : `Turning ${turningAge} years old`}
              </Text>
            )}

            {isBirthday ? (
              <View style={styles.bdayHeroCard}>
                <Text style={styles.cakeEmoji}>🎂🎉</Text>
                <Text style={styles.celebrateTitle}>TIME TO CELEBRATE!</Text>
              </View>
            ) : timeLeft ? (
              <View style={styles.grid4}>
                <View style={styles.timeCard}>
                  <Text style={styles.timeVal}>{String(timeLeft.days).padStart(2, "0")}</Text>
                  <Text style={styles.timeUnit}>DAYS</Text>
                </View>
                <View style={styles.timeCard}>
                  <Text style={styles.timeVal}>{String(timeLeft.hours).padStart(2, "0")}</Text>
                  <Text style={styles.timeUnit}>HRS</Text>
                </View>
                <View style={styles.timeCard}>
                  <Text style={styles.timeVal}>{String(timeLeft.minutes).padStart(2, "0")}</Text>
                  <Text style={styles.timeUnit}>MINS</Text>
                </View>
                <View style={styles.timeCard}>
                  <Text style={styles.timeVal}>{String(timeLeft.seconds).padStart(2, "0")}</Text>
                  <Text style={styles.timeUnit}>SECS</Text>
                </View>
              </View>
            ) : (
              <Text style={styles.emptyHint}>Enter your birth date (DD/MM/YYYY) to start the live timer.</Text>
            )}
          </ResultPanel>
        </OuterToolCard>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  opt: { fontWeight: "600", color: "#64748B" },
  dateBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginTop: 6,
    alignSelf: "flex-start",
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#F0ABFC",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 999,
  },
  dateBadgeText: { fontSize: 11, fontWeight: "700", color: "#86198F" },
  turningText: { fontSize: 13, fontWeight: "800", color: "#A21CAF", marginBottom: 10 },
  bdayHeroCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    borderWidth: 1.5,
    borderColor: "#F0ABFC",
    paddingVertical: 18,
    alignItems: "center",
  },
  cakeEmoji: { fontSize: 34 },
  celebrateTitle: { fontSize: 16, fontWeight: "900", color: "#86198F", marginTop: 6 },
  grid4: { flexDirection: "row", gap: 6 },
  timeCard: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    borderWidth: 1.5,
    borderColor: "#F0ABFC",
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: "center",
  },
  timeVal: { fontSize: 24, fontWeight: "900", color: "#701A75" },
  timeUnit: { fontSize: 10, fontWeight: "800", color: "#C026D3", marginTop: 2 },
  emptyHint: { fontSize: 13, fontWeight: "600", color: "#701A75" },
});
