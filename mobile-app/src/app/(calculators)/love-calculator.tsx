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
import { calculateLoveScore } from "@/lib/calculations/health";
import { Heart, Sparkles, Copy, RotateCcw, Check } from "lucide-react-native";

export default function LoveCalculatorScreen() {
  const [name1, setName1] = useState("Romeo");
  const [name2, setName2] = useState("Juliet");
  const [score, setScore] = useState<number | null>(calculateLoveScore("Romeo", "Juliet"));
  const [copied, setCopied] = useState(false);

  const handleCalculate = () => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    const s = calculateLoveScore(name1, name2);
    setScore(s);
  };

  const handleCopy = async () => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    const summary = `❤️ Love Match Score: ${name1} & ${name2} have a ${score}% compatibility match!`;
    await Clipboard.setStringAsync(summary);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleReset = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    setName1("");
    setName2("");
    setScore(null);
  };

  return (
    <SafeAreaView style={styles.container} edges={["top", "bottom"]}>
      <StatusBar style="dark" />
      <CalculatorHeader
        title="Love Calculator"
        subtitle="Calculate the playful love compatibility score between you and your crush."
        iconName="Heart"
        themeColor="#F43F5E"
        themeBg="#FFF1F2"
      />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.card}>
          <Text style={styles.inputLabel}>YOUR NAME</Text>
          <View style={styles.inputWrapper}>
            <TextInput
              style={styles.textInput}
              value={name1}
              onChangeText={setName1}
              placeholder="Enter your name"
              placeholderTextColor="#94A3B8"
            />
          </View>

          <Text style={[styles.inputLabel, { marginTop: 14 }]}>CRUSH / PARTNER NAME</Text>
          <View style={styles.inputWrapper}>
            <TextInput
              style={styles.textInput}
              value={name2}
              onChangeText={setName2}
              placeholder="Enter partner name"
              placeholderTextColor="#94A3B8"
            />
          </View>

          <Pressable
            onPress={handleCalculate}
            style={({ pressed }) => [styles.calculateBtn, pressed && styles.pressed]}
          >
            <Heart size={18} color="#ffffff" fill="#ffffff" />
            <Text style={styles.calculateBtnText}>Calculate Match</Text>
            <Sparkles size={16} color="#FED7AA" />
          </Pressable>
        </View>

        {score !== null && (
          <View style={styles.resultCard}>
            <View style={styles.resultHeader}>
              <Text style={styles.resultTitle}>Compatibility Result</Text>
              <View style={styles.actionButtons}>
                <Pressable onPress={handleCopy} style={styles.iconBtn}>
                  {copied ? <Check size={16} color="#16A34A" /> : <Copy size={16} color="#64748B" />}
                </Pressable>
                <Pressable onPress={handleReset} style={styles.iconBtn}>
                  <RotateCcw size={16} color="#64748B" />
                </Pressable>
              </View>
            </View>

            <View style={styles.totalBlock}>
              <Heart size={32} color="#E11D48" fill="#F43F5E" style={{ marginBottom: 6 }} />
              <Text style={styles.totalLabel}>
                {name1} & {name2}
              </Text>
              <Text style={styles.totalValue}>{score}%</Text>
              <Text style={styles.matchText}>
                {score >= 85
                  ? "A Match Made in Heaven! 💖"
                  : score >= 70
                  ? "Great Chemistry & Harmony! ✨"
                  : "Sweet Connection! Keep nurturing it! 🌸"}
              </Text>
            </View>
          </View>
        )}
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
    backgroundColor: "#F8FAFC",
    borderWidth: 1,
    borderColor: "#CBD5E1",
    borderRadius: 14,
    paddingHorizontal: 14,
    height: 50,
    justifyContent: "center",
  },
  textInput: { fontSize: 16, fontWeight: "700", color: "#0F172A" },
  calculateBtn: {
    marginTop: 18,
    backgroundColor: "#E11D48",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 14,
    borderRadius: 14,
    gap: 8,
    shadowColor: "#E11D48",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 3,
  },
  pressed: { opacity: 0.9, transform: [{ scale: 0.99 }] },
  calculateBtnText: { color: "#ffffff", fontSize: 15, fontWeight: "800" },
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
    backgroundColor: "#FFF1F2",
    borderRadius: 16,
    padding: 20,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#FFE4E6",
  },
  totalLabel: { fontSize: 14, fontWeight: "800", color: "#9F1239", marginBottom: 2 },
  totalValue: { fontSize: 44, fontWeight: "900", color: "#E11D48" },
  matchText: { fontSize: 13, fontWeight: "700", color: "#BE123C", marginTop: 4 },
});
