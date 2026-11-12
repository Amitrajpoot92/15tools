import React, { useState, useRef } from "react";
import { View, Text, TextInput, ScrollView, Pressable, Animated, StyleSheet } from "react-native";
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
  DisclaimerNote,
  sharedStyles,
} from "@/components/CalculatorUI";
import { Heart, Star, Sparkles } from "lucide-react-native";

export default function LoveCalculatorScreen() {
  const [name1, setName1] = useState("");
  const [name2, setName2] = useState("");
  const [result, setResult] = useState<number | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);
  const [copied, setCopied] = useState(false);

  const scaleAnim = useRef(new Animated.Value(1)).current;

  const calculateLove = () => {
    if (!name1.trim() || !name2.trim()) return;
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    setIsCalculating(true);
    setResult(null);

    Animated.loop(
      Animated.sequence([
        Animated.timing(scaleAnim, { toValue: 1.25, duration: 380, useNativeDriver: true }),
        Animated.timing(scaleAnim, { toValue: 1, duration: 380, useNativeDriver: true }),
      ])
    ).start();

    setTimeout(() => {
      const combined = (name1.trim().toLowerCase() + name2.trim().toLowerCase()).replace(/\s+/g, "");
      let sum = 0;
      for (let i = 0; i < combined.length; i++) sum += combined.charCodeAt(i);
      const magicNumber = sum % 100;
      const finalPercentage = magicNumber < 30 ? magicNumber + 40 : magicNumber;
      const calcResult = finalPercentage > 100 ? 100 : finalPercentage;

      scaleAnim.stopAnimation();
      scaleAnim.setValue(1);
      setIsCalculating(false);
      setResult(calcResult);
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    }, 1500);
  };

  const reset = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    setName1("");
    setName2("");
    setResult(null);
    setIsCalculating(false);
  };

  const getMessageAndStars = (score: number) => {
    if (score >= 95) return { msg: "Soulmates! Pure perfection! 💘🔥", stars: 5 };
    if (score >= 85) return { msg: "A Match Made in Heaven! 😍✨", stars: 5 };
    if (score >= 70) return { msg: "Very Strong Connection! 💕🚀", stars: 4 };
    if (score >= 50) return { msg: "There's definitely a spark! 😚💫", stars: 3 };
    if (score >= 30) return { msg: "Could work with some effort. 🤔🌱", stars: 2 };
    if (score >= 15) return { msg: "Maybe just stay friends. 🤝😅", stars: 1 };
    return { msg: "Run away! Total disaster! 🚩🏃‍♂️", stars: 0 };
  };

  const resultData = result !== null ? getMessageAndStars(result) : null;

  const handleCopy = async () => {
    if (result === null || !resultData) return;
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    const text = `Love Calculator\nYour Name: ${name1}\nPartner's Name: ${name2}\nCompatibility Score: ${result}%\nVerdict: ${resultData.msg}\n\nTry it online: https://topcalcbox.com/love-calculator/`;
    await Clipboard.setStringAsync(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <SafeAreaView style={sharedStyles.safeArea} edges={["top", "bottom"]}>
      <StatusBar style="dark" />
      <CalculatorHeader
        title="Love Calculator"
        subtitle="Find out the true compatibility percentage between you and your crush playfully and instantly."
        iconName="Heart"
        color="rose"
      />

      <ScrollView
        contentContainerStyle={sharedStyles.scrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <OuterToolCard>
          <FormPanel theme="rose">
            <Text style={sharedStyles.fieldLabel}>Your Name</Text>
            <View style={sharedStyles.inputBox}>
              <TextInput
                style={sharedStyles.textInput}
                value={name1}
                onChangeText={setName1}
                placeholder="e.g. Alex"
                placeholderTextColor="#94A3B8"
              />
            </View>

            <Text style={[sharedStyles.fieldLabel, { marginTop: 14 }]}>Partner's Name</Text>
            <View style={sharedStyles.inputBox}>
              <TextInput
                style={sharedStyles.textInput}
                value={name2}
                onChangeText={setName2}
                placeholder="e.g. Sam"
                placeholderTextColor="#94A3B8"
              />
            </View>

            <Pressable
              onPress={calculateLove}
              disabled={!name1.trim() || !name2.trim() || isCalculating}
              style={({ pressed }) => [
                styles.calcBtn,
                (!name1.trim() || !name2.trim()) && { opacity: 0.55 },
                pressed && { opacity: 0.85 },
              ]}
            >
              <Sparkles size={16} color="#FFFFFF" />
              <Text style={styles.calcBtnText}>
                {isCalculating ? "Calculating Compatibility..." : "Calculate Love Score"}
              </Text>
            </Pressable>
          </FormPanel>

          <ResultPanel theme="rose">
            <View style={sharedStyles.resultHeaderRow}>
              <View style={styles.kickerRow}>
                <Heart size={15} color="#E11D48" fill="#E11D48" />
                <Text style={sharedStyles.resultKicker}>Love Compatibility</Text>
              </View>
              <CopyResetActions copied={copied} onCopy={handleCopy} onReset={reset} theme="rose" />
            </View>

            {isCalculating ? (
              <View style={styles.centerBox}>
                <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
                  <Heart size={48} color="#E11D48" fill="#E11D48" />
                </Animated.View>
                <Text style={styles.waitText}>Reading the sparks...</Text>
              </View>
            ) : result !== null && resultData ? (
              <View style={styles.centerBox}>
                <Text style={styles.scoreVal}>{result}%</Text>
                <View style={styles.starsRow}>
                  {[1, 2, 3, 4, 5].map((idx) => (
                    <Star
                      key={idx}
                      size={20}
                      color={idx <= resultData.stars ? "#F59E0B" : "#CBD5E1"}
                      fill={idx <= resultData.stars ? "#F59E0B" : "transparent"}
                    />
                  ))}
                </View>
                <Text style={styles.verdictText}>{resultData.msg}</Text>
              </View>
            ) : (
              <Text style={styles.emptyHint}>Enter both names above and tap Calculate Love Score.</Text>
            )}
          </ResultPanel>

          <DisclaimerNote text="Disclaimer: This Love Calculator is for fun and entertainment only. The compatibility percentage and star rating are not scientifically accurate and should not be used for serious relationship decisions." />
        </OuterToolCard>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  calcBtn: {
    marginTop: 14,
    backgroundColor: "#E11D48",
    height: 48,
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  calcBtnText: { fontSize: 15, fontWeight: "800", color: "#FFFFFF" },
  kickerRow: { flexDirection: "row", alignItems: "center", gap: 6, flex: 1 },
  centerBox: { alignItems: "center", paddingVertical: 10 },
  waitText: { marginTop: 10, fontSize: 13, fontWeight: "800", color: "#9F1239" },
  scoreVal: { fontSize: 44, fontWeight: "900", color: "#E11D48" },
  starsRow: { flexDirection: "row", gap: 6, marginTop: 6 },
  verdictText: { marginTop: 8, fontSize: 15, fontWeight: "800", color: "#881337", textAlign: "center" },
  emptyHint: { fontSize: 13, fontWeight: "600", color: "#881337", marginTop: 4 },
});
