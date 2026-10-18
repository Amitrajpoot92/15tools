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

  const dobDateObj = parseDateStr(dobInput);

  useEffect(() => {
    if (!dobDateObj) {
      setTimeLeft(null);
      setTurningAge(null);
      setIsBirthday(false);
      return;
    }

    const interval = setInterval(() => {
      const now = new Date();
      let nextBday = new Date(dobDateObj.getTime());
      nextBday.setFullYear(now.getFullYear());

      const isToday =
        now.getMonth() === dobDateObj.getMonth() &&
        now.getDate() === dobDateObj.getDate();

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
      const ageWillBe = nextBday.getFullYear() - dobDateObj.getFullYear();
      setTurningAge(ageWillBe);

      if (diff <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / 1000 / 60) % 60);
      const seconds = Math.floor((diff / 1000) % 60);

      setTimeLeft({ days, hours, minutes, seconds });
    }, 1000);

    return () => clearInterval(interval);
  }, [dobDateObj]);

  const handleCopy = async () => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    const bdayText = isBirthday
      ? `Happy Birthday ${name}! You are exactly ${turningAge} years old today! 🎉`
      : `Next milestone celebration: Turning ${turningAge} years old!`;
    const text = `Birthday Countdown${name ? ` for ${name}` : ""}\nDate of Birth: ${dobInput} ${
      dobDateObj ? `(${formatFriendlyDate(dobDateObj)})` : ""
    }\n${
      dobDateObj ? bdayText : ""
    }\nTime Left: ${
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
    <SafeAreaView style={styles.container} edges={["top", "bottom"]}>
      <StatusBar style="dark" />
      <CalculatorHeader
        title="Birthday Countdown"
        subtitle="Find out exactly how many days, hours, and minutes are left until your next birthday."
        iconName="Timer"
        themeColor="#C026D3"
        themeBg="#FDF4FF"
      />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {/* Input Card */}
        <View style={styles.inputCard}>
          <Text style={styles.inputLabel}>
            NAME <Text style={styles.optionalText}>(OPTIONAL)</Text>
          </Text>
          <View style={styles.inputWrapper}>
            <TextInput
              style={styles.textInput}
              value={name}
              onChangeText={setName}
              placeholder="e.g. Alex"
              placeholderTextColor="#94A3B8"
            />
          </View>

          <Text style={[styles.inputLabel, { marginTop: 16 }]}>DATE OF BIRTH</Text>
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
          {dobDateObj && (
            <View style={styles.friendlyDateBadge}>
              <Calendar size={13} color="#C026D3" />
              <Text style={styles.friendlyDateText}>
                {formatFriendlyDate(dobDateObj)}
              </Text>
            </View>
          )}
        </View>

        {/* Result Box */}
        <View style={styles.resultBox}>
          <View style={styles.resultHeader}>
            <View />
            <View style={styles.actionButtons}>
              <Pressable onPress={handleCopy} style={styles.copyBtn}>
                {copied ? <Check size={14} color="#059669" /> : <Copy size={14} color="#C026D3" />}
                <Text style={[styles.copyBtnText, copied && { color: "#059669" }]}>
                  {copied ? "Copied" : "Share"}
                </Text>
              </Pressable>
              <Pressable onPress={handleReset} style={styles.resetBtn}>
                <RotateCcw size={15} color="#C026D3" />
              </Pressable>
            </View>
          </View>

          <Text style={styles.headlineTitle}>
            🎉 {name ? `${name.trim()}'s Next Birthday` : "Your Next Birthday"}
          </Text>

          {turningAge !== null && (
            <Text style={styles.turningAgeText}>
              {isBirthday ? (
                "Happy Birthday! You are exactly " + turningAge + " years old today!"
              ) : (
                <>Next milestone celebration: Turning <Text style={styles.turningAgeHighlight}>{turningAge}</Text> years old!</>
              )}
            </Text>
          )}

          {isBirthday ? (
            <View style={styles.bdayHeroCard}>
              <Text style={styles.cakeEmoji}>🎂</Text>
              <Text style={styles.celebrateTitle}>TIME TO CELEBRATE!</Text>
            </View>
          ) : timeLeft ? (
            <View style={styles.countdownGrid}>
              <View style={styles.timeCard}>
                <Text style={styles.timeVal}>
                  {String(timeLeft.days).padStart(2, "0")}
                </Text>
                <Text style={styles.timeUnit}>DAYS</Text>
              </View>
              <View style={styles.timeCard}>
                <Text style={styles.timeVal}>
                  {String(timeLeft.hours).padStart(2, "0")}
                </Text>
                <Text style={styles.timeUnit}>HRS</Text>
              </View>
              <View style={styles.timeCard}>
                <Text style={styles.timeVal}>
                  {String(timeLeft.minutes).padStart(2, "0")}
                </Text>
                <Text style={styles.timeUnit}>MINS</Text>
              </View>
              <View style={styles.timeCard}>
                <Text style={[styles.timeVal, { color: "#C026D3" }]}>
                  {String(timeLeft.seconds).padStart(2, "0")}
                </Text>
                <Text style={styles.timeUnit}>SECS</Text>
              </View>
            </View>
          ) : (
            <View style={styles.placeholderBox}>
              <Text style={styles.placeholderText}>
                Enter your date of birth above
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
    backgroundColor: "#FDF4FF",
    borderRadius: 20,
    padding: 18,
    borderWidth: 1,
    borderColor: "#FAE8FF",
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 11,
    fontWeight: "800",
    color: "#A21CAF",
    letterSpacing: 0.5,
    marginBottom: 8,
  },
  optionalText: {
    color: "#94A3B8",
    fontWeight: "500",
    fontSize: 10,
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
    backgroundColor: "#FAE8FF",
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
    color: "#C026D3",
  },
  resultBox: {
    backgroundColor: "#FDF4FF",
    borderRadius: 22,
    padding: 20,
    borderWidth: 1.5,
    borderColor: "#F0ABFC",
    alignItems: "center",
    shadowColor: "#C026D3",
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
    marginBottom: 4,
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
    borderColor: "#F0ABFC",
    gap: 4,
  },
  copyBtnText: {
    fontSize: 11,
    fontWeight: "800",
    color: "#C026D3",
  },
  resetBtn: {
    width: 30,
    height: 30,
    borderRadius: 8,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#F0ABFC",
  },
  headlineTitle: {
    fontSize: 18,
    fontWeight: "900",
    color: "#86198F",
    textAlign: "center",
    marginTop: 6,
  },
  turningAgeText: {
    fontSize: 13,
    fontWeight: "600",
    color: "#64748B",
    textAlign: "center",
    marginTop: 6,
    marginBottom: 16,
  },
  turningAgeHighlight: {
    color: "#C026D3",
    fontWeight: "900",
    fontSize: 15,
  },
  bdayHeroCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    padding: 24,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#F0ABFC",
    width: "100%",
  },
  cakeEmoji: {
    fontSize: 54,
  },
  celebrateTitle: {
    fontSize: 16,
    fontWeight: "900",
    color: "#C026D3",
    letterSpacing: 1,
    marginTop: 8,
  },
  countdownGrid: {
    flexDirection: "row",
    gap: 8,
    width: "100%",
  },
  timeCard: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    paddingVertical: 14,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#FAE8FF",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 1,
  },
  timeVal: {
    fontSize: 28,
    fontWeight: "900",
    color: "#0F172A",
  },
  timeUnit: {
    fontSize: 10,
    fontWeight: "800",
    color: "#A21CAF",
    letterSpacing: 1,
    marginTop: 4,
  },
  placeholderBox: {
    backgroundColor: "rgba(255,255,255,0.6)",
    padding: 24,
    borderRadius: 14,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#F0ABFC",
    width: "100%",
  },
  placeholderText: {
    fontSize: 14,
    fontWeight: "700",
    color: "#C026D3",
  },
});
