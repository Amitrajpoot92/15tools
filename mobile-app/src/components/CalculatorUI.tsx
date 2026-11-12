import React from "react";
import { View, Text, Pressable, StyleSheet, ViewStyle } from "react-native";
import * as Haptics from "expo-haptics";
import { Copy, Check, RotateCcw } from "lucide-react-native";

export type ThemeKey =
  | "indigo"
  | "orange"
  | "emerald"
  | "amber"
  | "rose"
  | "purple"
  | "fuchsia";

export interface ThemeTokens {
  bannerBg: string;
  bannerBorder: string;
  iconBg: string;
  formBg: string;
  formBorder: string;
  resultBg: string;
  resultBorder: string;
  accent: string;
  accentDark: string;
  copyBorder: string;
  copyText: string;
  barTrack: string;
  barFill: string;
}

export const THEMES: Record<ThemeKey, ThemeTokens> = {
  indigo: {
    bannerBg: "#EEF2FF",
    bannerBorder: "#C7D2FE",
    iconBg: "#4F46E5",
    formBg: "#EEF2FF",
    formBorder: "#C7D2FE",
    resultBg: "#DBEAFE",
    resultBorder: "#93C5FD",
    accent: "#4F46E5",
    accentDark: "#1E1B4B",
    copyBorder: "#A5B4FC",
    copyText: "#3730A3",
    barTrack: "#BFDBFE",
    barFill: "#2563EB",
  },
  orange: {
    bannerBg: "#FFF7ED",
    bannerBorder: "#FED7AA",
    iconBg: "#F97316",
    formBg: "#FFF7ED",
    formBorder: "#FED7AA",
    resultBg: "#FFEDD5",
    resultBorder: "#FDBA74",
    accent: "#EA580C",
    accentDark: "#7C2D12",
    copyBorder: "#FDBA74",
    copyText: "#9A3412",
    barTrack: "#FED7AA",
    barFill: "#EA580C",
  },
  emerald: {
    bannerBg: "#ECFDF5",
    bannerBorder: "#A7F3D0",
    iconBg: "#059669",
    formBg: "#ECFDF5",
    formBorder: "#A7F3D0",
    resultBg: "#D1FAE5",
    resultBorder: "#6EE7B7",
    accent: "#059669",
    accentDark: "#064E3B",
    copyBorder: "#6EE7B7",
    copyText: "#065F46",
    barTrack: "#A7F3D0",
    barFill: "#059669",
  },
  amber: {
    bannerBg: "#FFFBEB",
    bannerBorder: "#FDE68A",
    iconBg: "#F59E0B",
    formBg: "#FFFBEB",
    formBorder: "#FDE68A",
    resultBg: "#FEF3C7",
    resultBorder: "#FCD34D",
    accent: "#D97706",
    accentDark: "#78350F",
    copyBorder: "#FCD34D",
    copyText: "#92400E",
    barTrack: "#FDE68A",
    barFill: "#D97706",
  },
  rose: {
    bannerBg: "#FFF1F2",
    bannerBorder: "#FECDD3",
    iconBg: "#E11D48",
    formBg: "#FFF1F2",
    formBorder: "#FECDD3",
    resultBg: "#FFE4E6",
    resultBorder: "#FDA4AF",
    accent: "#E11D48",
    accentDark: "#881337",
    copyBorder: "#FDA4AF",
    copyText: "#9F1239",
    barTrack: "#FECDD3",
    barFill: "#E11D48",
  },
  purple: {
    bannerBg: "#FAF5FF",
    bannerBorder: "#E9D5FF",
    iconBg: "#9333EA",
    formBg: "#FAF5FF",
    formBorder: "#E9D5FF",
    resultBg: "#F3E8FF",
    resultBorder: "#D8B4FE",
    accent: "#9333EA",
    accentDark: "#581C87",
    copyBorder: "#D8B4FE",
    copyText: "#6B21A8",
    barTrack: "#E9D5FF",
    barFill: "#9333EA",
  },
  fuchsia: {
    bannerBg: "#FDF4FF",
    bannerBorder: "#F5D0FE",
    iconBg: "#C026D3",
    formBg: "#FDF4FF",
    formBorder: "#F5D0FE",
    resultBg: "#FAE8FF",
    resultBorder: "#F0ABFC",
    accent: "#C026D3",
    accentDark: "#701A75",
    copyBorder: "#F0ABFC",
    copyText: "#86198F",
    barTrack: "#F5D0FE",
    barFill: "#C026D3",
  },
};

export function OuterToolCard({
  children,
  style,
}: {
  children: React.ReactNode;
  style?: ViewStyle;
}) {
  return <View style={[uiStyles.outerCard, style]}>{children}</View>;
}

export function FormPanel({
  theme,
  children,
  style,
}: {
  theme: ThemeKey;
  children: React.ReactNode;
  style?: ViewStyle;
}) {
  const t = THEMES[theme];
  return (
    <View
      style={[
        uiStyles.formPanel,
        { backgroundColor: t.formBg, borderColor: t.formBorder },
        style,
      ]}
    >
      {children}
    </View>
  );
}

export function ResultPanel({
  theme,
  children,
  style,
}: {
  theme: ThemeKey;
  children: React.ReactNode;
  style?: ViewStyle;
}) {
  const t = THEMES[theme];
  return (
    <View
      style={[
        uiStyles.resultPanel,
        { backgroundColor: t.resultBg, borderColor: t.resultBorder },
        style,
      ]}
    >
      {children}
    </View>
  );
}

export function SegmentedTabs<T extends string>({
  options,
  value,
  onChange,
  accentColor,
}: {
  options: { key: T; label: string }[];
  value: T;
  onChange: (val: T) => void;
  accentColor?: string;
}) {
  return (
    <View style={uiStyles.tabsWrap}>
      {options.map((opt) => {
        const active = value === opt.key;
        return (
          <Pressable
            key={opt.key}
            onPress={() => {
              Haptics.selectionAsync();
              onChange(opt.key);
            }}
            style={[uiStyles.tabBtn, active && uiStyles.tabBtnActive]}
          >
            <Text
              style={[
                uiStyles.tabText,
                active && {
                  color: accentColor || "#0F172A",
                  fontWeight: "800",
                },
              ]}
              numberOfLines={1}
            >
              {opt.label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

export function CurrencyToggle({
  currency,
  onChange,
  theme = "indigo",
}: {
  currency: "₹" | "$";
  onChange: (c: "₹" | "$") => void;
  theme?: ThemeKey;
}) {
  const t = THEMES[theme];
  return (
    <View style={uiStyles.currencyRow}>
      <Text style={uiStyles.currencyLabel}>Currency:</Text>
      <View style={uiStyles.currencyWrap}>
        {(["₹", "$"] as const).map((c) => {
          const active = currency === c;
          return (
            <Pressable
              key={c}
              onPress={() => {
                Haptics.selectionAsync();
                onChange(c);
              }}
              style={[
                uiStyles.currencyBtn,
                active && { backgroundColor: t.accent },
              ]}
            >
              <Text
                style={[
                  uiStyles.currencyText,
                  active && { color: "#FFFFFF" },
                ]}
              >
                {c === "₹" ? "₹ INR" : "$ USD"}
              </Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

export function CopyResetActions({
  copied,
  onCopy,
  onReset,
  theme,
}: {
  copied: boolean;
  onCopy: () => void;
  onReset: () => void;
  theme: ThemeKey;
}) {
  const t = THEMES[theme];
  return (
    <View style={uiStyles.actionRow}>
      <Pressable
        onPress={onCopy}
        style={({ pressed }) => [
          uiStyles.copyBtn,
          { borderColor: t.copyBorder },
          pressed && { opacity: 0.75 },
        ]}
      >
        {copied ? (
          <Check size={13} color="#059669" />
        ) : (
          <Copy size={13} color={t.copyText} />
        )}
        <Text
          style={[
            uiStyles.copyText,
            { color: copied ? "#059669" : t.copyText },
          ]}
        >
          {copied ? "Copied!" : "Copy"}
        </Text>
      </Pressable>

      <Pressable
        onPress={onReset}
        style={({ pressed }) => [
          uiStyles.resetBtn,
          { borderColor: t.copyBorder },
          pressed && { opacity: 0.75 },
        ]}
      >
        <RotateCcw size={13} color="#475569" />
      </Pressable>
    </View>
  );
}

export function StatTile({
  label,
  value,
  valueColor = "#0F172A",
  borderColor = "#E2E8F0",
  subtext,
  style,
}: {
  label: string;
  value: string;
  valueColor?: string;
  borderColor?: string;
  subtext?: string;
  style?: ViewStyle;
}) {
  return (
    <View style={[uiStyles.statTile, { borderColor }, style]}>
      <Text style={uiStyles.statLabel} numberOfLines={1}>
        {label}
      </Text>
      <Text style={[uiStyles.statValue, { color: valueColor }]} numberOfLines={1}>
        {value}
      </Text>
      {subtext ? <Text style={uiStyles.statSub}>{subtext}</Text> : null}
    </View>
  );
}

export function DisclaimerNote({
  text,
  bg = "#F8FAFC",
  border = "#E2E8F0",
  color = "#475569",
}: {
  text: string;
  bg?: string;
  border?: string;
  color?: string;
}) {
  return (
    <View
      style={[
        uiStyles.disclaimerBox,
        { backgroundColor: bg, borderColor: border },
      ]}
    >
      <Text style={[uiStyles.disclaimerText, { color }]}>{text}</Text>
    </View>
  );
}

export const sharedStyles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#F8FAFC" },
  scrollContent: { paddingHorizontal: 14, paddingTop: 10, paddingBottom: 32 },
  fieldLabel: {
    fontSize: 12,
    fontWeight: "800",
    color: "#0F172A",
    marginBottom: 6,
  },
  inputBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderWidth: 1.5,
    borderColor: "#CBD5E1",
    borderRadius: 12,
    paddingHorizontal: 12,
    height: 48,
  },
  textInput: {
    flex: 1,
    fontSize: 17,
    fontWeight: "800",
    color: "#0F172A",
    paddingVertical: 0,
  },
  affix: {
    fontSize: 15,
    fontWeight: "800",
    color: "#475569",
  },
  chipRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 6,
    marginTop: 8,
  },
  chip: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#CBD5E1",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
  },
  chipText: {
    fontSize: 11,
    fontWeight: "800",
    color: "#1E293B",
  },
  resultHeaderRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 8,
    gap: 8,
  },
  resultKicker: {
    fontSize: 12,
    fontWeight: "800",
    color: "#1E293B",
    flex: 1,
  },
  heroValue: {
    fontSize: 38,
    fontWeight: "900",
    color: "#0F172A",
    letterSpacing: -0.8,
  },
  grid2: {
    flexDirection: "row",
    gap: 8,
  },
});

const uiStyles = StyleSheet.create({
  outerCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    borderWidth: 1.5,
    borderColor: "#E2E8F0",
    padding: 12,
    shadowColor: "#0F172A",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
  },
  formPanel: {
    borderRadius: 16,
    borderWidth: 1.5,
    padding: 14,
    marginBottom: 12,
  },
  resultPanel: {
    borderRadius: 16,
    borderWidth: 1.5,
    padding: 16,
  },
  tabsWrap: {
    flexDirection: "row",
    backgroundColor: "#F1F5F9",
    borderRadius: 12,
    padding: 4,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    gap: 4,
  },
  tabBtn: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 6,
    borderRadius: 9,
    alignItems: "center",
    justifyContent: "center",
  },
  tabBtnActive: {
    backgroundColor: "#FFFFFF",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 2,
    elevation: 2,
  },
  tabText: {
    fontSize: 12,
    fontWeight: "700",
    color: "#475569",
  },
  currencyRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  currencyLabel: {
    fontSize: 12,
    fontWeight: "800",
    color: "#334155",
  },
  currencyWrap: {
    flexDirection: "row",
    backgroundColor: "#F1F5F9",
    borderRadius: 10,
    padding: 3,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    gap: 3,
  },
  currencyBtn: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 7,
  },
  currencyText: {
    fontSize: 11,
    fontWeight: "800",
    color: "#475569",
  },
  actionRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  copyBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  copyText: {
    fontSize: 11,
    fontWeight: "800",
  },
  resetBtn: {
    width: 30,
    height: 30,
    borderRadius: 8,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  statTile: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    borderWidth: 1.5,
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  statLabel: {
    fontSize: 10,
    fontWeight: "800",
    color: "#475569",
    textTransform: "uppercase",
    letterSpacing: 0.4,
    marginBottom: 3,
  },
  statValue: {
    fontSize: 17,
    fontWeight: "900",
  },
  statSub: {
    fontSize: 11,
    fontWeight: "600",
    color: "#64748B",
    marginTop: 2,
  },
  disclaimerBox: {
    marginTop: 10,
    borderRadius: 12,
    borderWidth: 1,
    paddingHorizontal: 12,
    paddingVertical: 9,
  },
  disclaimerText: {
    fontSize: 11,
    fontWeight: "600",
    lineHeight: 16,
  },
});

