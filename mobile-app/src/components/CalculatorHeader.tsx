import React from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import * as Haptics from "expo-haptics";
import { ArrowLeft } from "lucide-react-native";
import { DynamicIcon } from "./DynamicIcon";
import { THEMES, ThemeKey } from "./CalculatorUI";

interface CalculatorHeaderProps {
  title: string;
  subtitle: string;
  iconName?: string;
  color?: ThemeKey;
  themeColor?: string;
  themeBg?: string;
}

export function CalculatorHeader({
  title,
  subtitle,
  iconName = "Calculator",
  color,
  themeColor,
  themeBg,
}: CalculatorHeaderProps) {
  const router = useRouter();
  const theme = color ? THEMES[color] : null;

  const bannerBg = theme ? theme.bannerBg : themeBg || "#EEF2FF";
  const bannerBorder = theme ? theme.bannerBorder : "#CBD5E1";
  const iconBg = theme ? theme.iconBg : themeColor || "#4F46E5";

  const handleBack = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace("/");
    }
  };

  return (
    <View style={styles.container}>
      {/* Compact Navigation Top Bar */}
      <View style={styles.topRow}>
        <Pressable
          onPress={handleBack}
          style={({ pressed }) => [styles.backBtn, pressed && styles.pressed]}
        >
          <ArrowLeft size={19} color="#0F172A" />
        </Pressable>
        <Text style={styles.topBarTitle} numberOfLines={1}>
          {title}
        </Text>
        <View style={{ width: 34 }} />
      </View>

      {/* Website ToolHeaderBanner-matched Horizontal Banner */}
      <View
        style={[
          styles.bannerCard,
          { backgroundColor: bannerBg, borderColor: bannerBorder },
        ]}
      >
        <View style={[styles.iconBox, { backgroundColor: iconBg }]}>
          <DynamicIcon name={iconName} size={20} color="#FFFFFF" strokeWidth={2.5} />
        </View>
        <View style={styles.textCol}>
          <Text style={styles.title} numberOfLines={2}>
            {title}
          </Text>
          <Text style={styles.subtitle}>{subtitle}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#F8FAFC",
  },
  topRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 14,
    paddingVertical: 8,
    backgroundColor: "#FFFFFF",
    borderBottomWidth: 1,
    borderBottomColor: "#E2E8F0",
  },
  backBtn: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: "#F1F5F9",
    justifyContent: "center",
    alignItems: "center",
  },
  pressed: {
    opacity: 0.7,
  },
  topBarTitle: {
    fontSize: 15,
    fontWeight: "800",
    color: "#0F172A",
    flex: 1,
    textAlign: "center",
    marginHorizontal: 8,
  },
  bannerCard: {
    marginHorizontal: 14,
    marginTop: 10,
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderRadius: 14,
    borderWidth: 1.5,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  iconBox: {
    width: 40,
    height: 40,
    borderRadius: 11,
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },
  textCol: {
    flex: 1,
  },
  title: {
    fontSize: 17,
    fontWeight: "800",
    color: "#0F172A",
    lineHeight: 22,
    marginBottom: 2,
  },
  subtitle: {
    fontSize: 12,
    fontWeight: "500",
    color: "#334155",
    lineHeight: 16,
  },
});
