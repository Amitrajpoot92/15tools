import React, { useState, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  ScrollView,
  Pressable,
  Animated,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import * as Haptics from "expo-haptics";
import * as Clipboard from "expo-clipboard";
import { CalculatorHeader } from "@/components/CalculatorHeader";
import { Copy, RotateCcw, Check, Heart, Star, Sparkles } from "lucide-react-native";

export default function LoveCalculatorScreen() {
  const [name1, setName1] = useState("");
  const [name2, setName2] = useState("");
  const [result, setResult] = useState<number | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);
  const [copied, setCopied] = useState(false);

  // Pulse animation for calculating state
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const calculateLove = () => {
    if (!name1.trim() || !name2.trim()) return;

    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    setIsCalculating(true);
    setResult(null);

    // Start pulse animation
    Animated.loop(
      Animated.sequence([
        Animated.timing(scaleAnim, {
          toValue: 1.3,
          duration: 400,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: 400,
          useNativeDriver: true,
        }),
      ])
    ).start();

    // Deterministic hash matching the website 1:1
    setTimeout(() => {
      const combined = (
        name1.trim().toLowerCase() + name2.trim().toLowerCase()
      ).replace(/\s+/g, "");
      let sum = 0;
      for (let i = 0; i < combined.length; i++) {
        sum += combined.charCodeAt(i);
      }

      const magicNumber = sum % 100;
      const finalPercentage = magicNumber < 30 ? magicNumber + 40 : magicNumber;
      const calcResult = finalPercentage > 100 ? 100 : finalPercentage;

      scaleAnim.stopAnimation();
      scaleAnim.setValue(1);
      setIsCalculating(false);
      setResult(calcResult);
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    }, 1800);
  };

  const reset = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    setName1("");
    setName2("");
    setResult(null);
    setIsCalculating(false);
  };

  const getMessageAndStars = (score: number) => {
    if (score >= 95)
      return { msg: "Soulmates! Pure perfection! 💘🔥", stars: 5 };
    if (score >= 85)
      return { msg: "A Match Made in Heaven! 😍✨", stars: 5 };
    if (score >= 70)
      return { msg: "Very Strong Connection! 💕🚀", stars: 4 };
    if (score >= 50)
      return { msg: "There's definitely a spark! 😚💫", stars: 3 };
    if (score >= 30)
      return { msg: "Could work with some effort. 🤔🌱", stars: 2 };
    if (score >= 15)
      return { msg: "Maybe just stay friends. 🤝😅", stars: 1 };
    return { msg: "Run away! Total disaster! 🚩🏃‍♂️", stars: 0 };
  };

  const resultData = result !== null ? getMessageAndStars(result) : null;

  const handleCopy = async () => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    const text = `Love Calculator\nYour Name: ${name1}\nCrush's Name: ${name2}\nLove %: ${
      result !== null ? result + "%" : "N/A"
    }\nMessage: ${
      resultData?.msg || "N/A"
    }\n\nCalculate Online: https://topcalcbox.com/love-calculator/`;
    await Clipboard.setStringAsync(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <SafeAreaView style={styles.container} edges={["top", "bottom"]}>
      <StatusBar style="dark" />
      <CalculatorHeader
        title="Love Calculator"
        subtitle="Calculate the percentage match between you and your crush playfully."
        iconName="Heart"
        themeColor="#E11D48"
        themeBg="#FFF1F2"
      />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {/* Input Card */}
        <View style={styles.inputCard}>
          <Text style={styles.inputLabel}>YOUR FULL NAME</Text>
          <View style={styles.inputWrapper}>
            <TextInput
              style={styles.textInput}
              value={name1}
              onChangeText={setName1}
              placeholder="Romeo"
              placeholderTextColor="#94A3B8"
            />
          </View>

          {/* Heart divider */}
          <View style={styles.heartDividerRow}>
            <View style={styles.heartCircle}>
              <Heart size={18} color="#E11D48" fill="#E11D48" />
            </View>
          </View>

          <Text style={styles.inputLabel}>CRUSH OR PARTNER'S NAME</Text>
          <View style={styles.inputWrapper}>
            <TextInput
              style={styles.textInput}
              value={name2}
              onChangeText={setName2}
              placeholder="Juliet"
              placeholderTextColor="#94A3B8"
            />
          </View>

          {/* Calculate Button */}
          <Pressable
            onPress={calculateLove}
            disabled={!name1.trim() || !name2.trim() || isCalculating}
            style={({ pressed }) => [
              styles.calcBtn,
              (!name1.trim() || !name2.trim() || isCalculating) &&
                styles.calcBtnDisabled,
              pressed && { opacity: 0.8 },
            ]}
          >
            {isCalculating ? (
              <View style={styles.calcBtnContent}>
                <ActivityIndicator size="small" color="#FFFFFF" />
                <Text style={styles.calcBtnText}>Reading the Stars...</Text>
              </View>
            ) : (
              <View style={styles.calcBtnContent}>
                <Heart size={18} color="#FFFFFF" fill="#FFFFFF" />
                <Text style={styles.calcBtnText}>Calculate Love %</Text>
                <Sparkles size={16} color="#FED7AA" />
              </View>
            )}
          </Pressable>
        </View>

        {/* Result Card */}
        <View style={styles.resultCard}>
          <View style={styles.resultHeader}>
            <View style={styles.resultHeaderLeft}>
              <View style={styles.resultDot} />
              <Text style={styles.resultTitle}>LOVE RESULT</Text>
            </View>
            <View style={styles.actionButtons}>
              <Pressable
                style={({ pressed }) => [
                  styles.actionBtn,
                  pressed && { opacity: 0.7 },
                ]}
                onPress={handleCopy}
              >
                {copied ? (
                  <Check size={14} color="#059669" />
                ) : (
                  <Copy size={14} color="#E11D48" />
                )}
                <Text
                  style={[
                    styles.actionBtnText,
                    copied && { color: "#059669" },
                  ]}
                >
                  {copied ? "Copied" : "Copy"}
                </Text>
              </Pressable>

              <Pressable
                style={({ pressed }) => [
                  styles.actionBtnIcon,
                  pressed && { opacity: 0.7 },
                ]}
                onPress={reset}
              >
                <RotateCcw size={14} color="#E11D48" />
              </Pressable>
            </View>
          </View>

          {/* Result Area */}
          {isCalculating ? (
            <View style={styles.loadingBox}>
              <Animated.View
                style={[
                  styles.animatedHeart,
                  { transform: [{ scale: scaleAnim }] },
                ]}
              >
                <Heart size={64} color="#E11D48" fill="#E11D48" />
              </Animated.View>
              <Text style={styles.loadingText}>Reading the Stars...</Text>
            </View>
          ) : result !== null && resultData ? (
            <View style={styles.resultContentBox}>
              <Text style={styles.percentageText}>{result}%</Text>

              {/* Star Rating */}
              <View style={styles.starsRow}>
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    size={26}
                    color={star <= resultData.stars ? "#F59E0B" : "#CBD5E1"}
                    fill={star <= resultData.stars ? "#F59E0B" : "transparent"}
                  />
                ))}
              </View>

              <Text style={styles.msgText}>{resultData.msg}</Text>

              <View style={styles.namesBadge}>
                <Text style={styles.namesBadgeText}>
                  {name1} ❤️ {name2}
                </Text>
              </View>
            </View>
          ) : (
            <View style={styles.awaitingBox}>
              <View style={styles.awaitingHeartCircle}>
                <Heart size={36} color="#FDA4AF" />
              </View>
              <Text style={styles.awaitingText}>AWAITING NAMES</Text>
              <Text style={styles.awaitingSubText}>
                Enter both names and tap Calculate Love %
              </Text>
            </View>
          )}
        </View>

        {/* Entertainment Disclaimer */}
        <View style={styles.disclaimerCard}>
          <Text style={styles.disclaimerText}>
            <Text style={styles.disclaimerBold}>Disclaimer: </Text>
            This Love Calculator is for fun and entertainment only. The
            compatibility percentage and star rating are not scientifically
            accurate and should not be used for serious relationship decisions.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8FAFC",
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingBottom: 40,
  },
  inputCard: {
    backgroundColor: "#FFF1F2",
    borderRadius: 20,
    padding: 16,
    borderWidth: 1,
    borderColor: "#FFE4E6",
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 11,
    fontWeight: "800",
    color: "#881337",
    letterSpacing: 0.6,
    marginBottom: 8,
  },
  inputWrapper: {
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#FECDD3",
  },
  textInput: {
    height: 50,
    fontSize: 16,
    fontWeight: "700",
    color: "#0F172A",
    paddingHorizontal: 16,
  },
  heartDividerRow: {
    alignItems: "center",
    marginVertical: 8,
  },
  heartCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#FECDD3",
    shadowColor: "#E11D48",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  calcBtn: {
    backgroundColor: "#E11D48",
    borderRadius: 14,
    paddingVertical: 14,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 16,
    shadowColor: "#E11D48",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 3,
  },
  calcBtnDisabled: {
    opacity: 0.5,
  },
  calcBtnContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  calcBtnText: {
    fontSize: 16,
    fontWeight: "800",
    color: "#FFFFFF",
  },
  resultCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 24,
    padding: 18,
    borderWidth: 1,
    borderColor: "#FECDD3",
    shadowColor: "#E11D48",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.08,
    shadowRadius: 16,
    elevation: 3,
  },
  resultHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  resultHeaderLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  resultDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#E11D48",
  },
  resultTitle: {
    fontSize: 11,
    fontWeight: "800",
    color: "#881337",
    letterSpacing: 0.8,
  },
  actionButtons: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  actionBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    backgroundColor: "#FFF1F2",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#FECDD3",
  },
  actionBtnText: {
    fontSize: 11,
    fontWeight: "700",
    color: "#E11D48",
  },
  actionBtnIcon: {
    backgroundColor: "#FFF1F2",
    padding: 6,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#FECDD3",
  },
  loadingBox: {
    paddingVertical: 36,
    alignItems: "center",
    justifyContent: "center",
  },
  animatedHeart: {
    marginBottom: 16,
  },
  loadingText: {
    fontSize: 12,
    fontWeight: "800",
    color: "#881337",
    letterSpacing: 1.5,
  },
  resultContentBox: {
    backgroundColor: "#FFF1F2",
    borderRadius: 18,
    paddingVertical: 24,
    paddingHorizontal: 16,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#FECDD3",
  },
  percentageText: {
    fontSize: 64,
    fontWeight: "900",
    color: "#E11D48",
    letterSpacing: -1,
    marginBottom: 6,
  },
  starsRow: {
    flexDirection: "row",
    gap: 6,
    marginBottom: 12,
  },
  msgText: {
    fontSize: 18,
    fontWeight: "800",
    color: "#881337",
    textAlign: "center",
    marginBottom: 12,
  },
  namesBadge: {
    backgroundColor: "#FFE4E6",
    paddingHorizontal: 14,
    paddingVertical: 5,
    borderRadius: 20,
  },
  namesBadgeText: {
    fontSize: 12,
    fontWeight: "700",
    color: "#BE123C",
  },
  awaitingBox: {
    paddingVertical: 32,
    alignItems: "center",
    justifyContent: "center",
  },
  awaitingHeartCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: "#FFF1F2",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },
  awaitingText: {
    fontSize: 11,
    fontWeight: "800",
    color: "#9F1239",
    letterSpacing: 1.2,
    marginBottom: 4,
  },
  awaitingSubText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#94A3B8",
  },
  disclaimerCard: {
    backgroundColor: "#F8FAFC",
    borderRadius: 16,
    padding: 14,
    marginTop: 16,
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },
  disclaimerText: {
    fontSize: 11,
    color: "#64748B",
    lineHeight: 16,
    textAlign: "center",
  },
  disclaimerBold: {
    fontWeight: "700",
    color: "#334155",
  },
});
