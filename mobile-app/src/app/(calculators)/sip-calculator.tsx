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
import { calculateSIP } from "@/lib/calculations/finance";
import { Copy, RotateCcw, Check } from "lucide-react-native";

export default function SIPCalculatorScreen() {
  const [monthlyInvestment, setMonthlyInvestment] = useState("5000");
  const [returnRate, setReturnRate] = useState("12");
  const [timePeriod, setTimePeriod] = useState("10");
  const [copied, setCopied] = useState(false);

  const P = parseFloat(monthlyInvestment) || 0;
  const r = parseFloat(returnRate) || 0;
  const t = parseFloat(timePeriod) || 0;

  const result = calculateSIP(P, r, t);

  const formatCurrency = (val: number) => {
    return "₹" + val.toLocaleString("en-IN");
  };

  const handleCopy = async () => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    const summary = `SIP Mutual Fund Growth:\nMonthly: ${formatCurrency(P)}\nDuration: ${t} Years\nInvested: ${formatCurrency(result.investedAmount)}\nEst. Returns: ${formatCurrency(result.estimatedReturns)}\nTotal Value: ${formatCurrency(result.totalValue)}`;
    await Clipboard.setStringAsync(summary);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleReset = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    setMonthlyInvestment("5000");
    setReturnRate("12");
    setTimePeriod("10");
  };

  const investedPercent =
    result.totalValue > 0
      ? Math.round((result.investedAmount / result.totalValue) * 100)
      : 50;

  return (
    <SafeAreaView style={styles.container} edges={["top", "bottom"]}>
      <StatusBar style="dark" />
      <CalculatorHeader
        title="SIP Calculator"
        subtitle="Calculate future wealth growth and compounding returns for Mutual Fund SIPs."
        iconName="LineChart"
        themeColor="#F43F5E"
        themeBg="#FFF1F2"
      />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Input Card */}
        <View style={styles.card}>
          {/* Monthly Investment */}
          <Text style={styles.inputLabel}>MONTHLY INVESTMENT (₹)</Text>
          <View style={styles.inputWrapper}>
            <Text style={styles.currencyPrefix}>₹</Text>
            <TextInput
              style={styles.textInput}
              keyboardType="number-pad"
              value={monthlyInvestment}
              onChangeText={setMonthlyInvestment}
              placeholder="5000"
              placeholderTextColor="#94A3B8"
            />
          </View>

          {/* Quick Amount Pills */}
          <View style={styles.quickPillsRow}>
            {["1000", "2500", "5000", "10000"].map((amt) => (
              <Pressable
                key={amt}
                onPress={() => {
                  Haptics.selectionAsync();
                  setMonthlyInvestment(amt);
                }}
                style={[
                  styles.quickPill,
                  monthlyInvestment === amt && styles.activeQuickPill,
                ]}
              >
                <Text
                  style={[
                    styles.quickPillText,
                    monthlyInvestment === amt && styles.activeQuickPillText,
                  ]}
                >
                  ₹{parseInt(amt).toLocaleString("en-IN")}
                </Text>
              </Pressable>
            ))}
          </View>

          {/* Expected Return Rate */}
          <Text style={[styles.inputLabel, { marginTop: 14 }]}>
            EXPECTED RETURN RATE (% P.A.)
          </Text>
          <View style={styles.inputWrapper}>
            <TextInput
              style={styles.textInput}
              keyboardType="decimal-pad"
              value={returnRate}
              onChangeText={setReturnRate}
              placeholder="12"
              placeholderTextColor="#94A3B8"
            />
            <Text style={styles.suffix}>%</Text>
          </View>

          {/* Time Period */}
          <Text style={[styles.inputLabel, { marginTop: 14 }]}>
            TIME PERIOD (YEARS)
          </Text>
          <View style={styles.inputWrapper}>
            <TextInput
              style={styles.textInput}
              keyboardType="number-pad"
              value={timePeriod}
              onChangeText={setTimePeriod}
              placeholder="10"
              placeholderTextColor="#94A3B8"
            />
            <Text style={styles.suffix}>Yrs</Text>
          </View>
        </View>

        {/* Results Card */}
        <View style={styles.resultCard}>
          <View style={styles.resultHeader}>
            <Text style={styles.resultTitle}>Projected Wealth</Text>
            <View style={styles.actionButtons}>
              <Pressable onPress={handleCopy} style={styles.iconBtn}>
                {copied ? (
                  <Check size={16} color="#16A34A" />
                ) : (
                  <Copy size={16} color="#64748B" />
                )}
              </Pressable>
              <Pressable onPress={handleReset} style={styles.iconBtn}>
                <RotateCcw size={16} color="#64748B" />
              </Pressable>
            </View>
          </View>

          {/* Total Maturity Value */}
          <View style={styles.totalBlock}>
            <Text style={styles.totalLabel}>TOTAL MATURITY VALUE</Text>
            <Text style={styles.totalValue}>
              {formatCurrency(result.totalValue)}
            </Text>
          </View>

          {/* Visual Ratio Bar */}
          <View style={styles.ratioBarContainer}>
            <View
              style={[
                styles.ratioBarInvested,
                { width: `${investedPercent}%` },
              ]}
            />
            <View
              style={[
                styles.ratioBarReturns,
                { width: `${100 - investedPercent}%` },
              ]}
            />
          </View>

          {/* Breakdown */}
          <View style={styles.breakdownRow}>
            <View style={styles.legendRow}>
              <View style={[styles.dot, { backgroundColor: "#0284C7" }]} />
              <Text style={styles.breakdownLabel}>Invested Amount:</Text>
            </View>
            <Text style={styles.breakdownValue}>
              {formatCurrency(result.investedAmount)}
            </Text>
          </View>

          <View style={[styles.breakdownRow, { borderBottomWidth: 0 }]}>
            <View style={styles.legendRow}>
              <View style={[styles.dot, { backgroundColor: "#10B981" }]} />
              <Text style={styles.breakdownLabel}>Estimated Returns (Profit):</Text>
            </View>
            <Text style={[styles.breakdownValue, { color: "#059669" }]}>
              +{formatCurrency(result.estimatedReturns)}
            </Text>
          </View>
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
  card: {
    backgroundColor: "#ffffff",
    borderRadius: 20,
    padding: 16,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 11,
    fontWeight: "800",
    color: "#64748B",
    letterSpacing: 0.5,
    marginBottom: 6,
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F8FAFC",
    borderWidth: 1,
    borderColor: "#CBD5E1",
    borderRadius: 14,
    paddingHorizontal: 14,
    height: 50,
  },
  currencyPrefix: {
    fontSize: 18,
    fontWeight: "800",
    color: "#94A3B8",
    marginRight: 6,
  },
  suffix: {
    fontSize: 14,
    fontWeight: "700",
    color: "#94A3B8",
    marginLeft: 6,
  },
  textInput: {
    flex: 1,
    fontSize: 18,
    fontWeight: "700",
    color: "#0F172A",
  },
  quickPillsRow: {
    flexDirection: "row",
    gap: 6,
    marginTop: 8,
  },
  quickPill: {
    flex: 1,
    backgroundColor: "#F1F5F9",
    paddingVertical: 7,
    borderRadius: 10,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },
  activeQuickPill: {
    backgroundColor: "#F43F5E",
    borderColor: "#E11D48",
  },
  quickPillText: {
    fontSize: 11,
    fontWeight: "700",
    color: "#475569",
  },
  activeQuickPillText: {
    color: "#ffffff",
  },
  resultCard: {
    backgroundColor: "#ffffff",
    borderRadius: 20,
    padding: 16,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 3,
  },
  resultHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  resultTitle: {
    fontSize: 14,
    fontWeight: "800",
    color: "#0F172A",
  },
  actionButtons: {
    flexDirection: "row",
    gap: 6,
  },
  iconBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#F1F5F9",
    justifyContent: "center",
    alignItems: "center",
  },
  totalBlock: {
    backgroundColor: "#ECFDF5",
    borderRadius: 16,
    padding: 16,
    alignItems: "center",
    marginBottom: 14,
    borderWidth: 1,
    borderColor: "#D1FAE5",
  },
  totalLabel: {
    fontSize: 11,
    fontWeight: "800",
    color: "#065F46",
    letterSpacing: 0.5,
    marginBottom: 4,
  },
  totalValue: {
    fontSize: 28,
    fontWeight: "900",
    color: "#059669",
  },
  ratioBarContainer: {
    height: 10,
    borderRadius: 5,
    flexDirection: "row",
    overflow: "hidden",
    marginBottom: 14,
  },
  ratioBarInvested: {
    backgroundColor: "#0284C7",
  },
  ratioBarReturns: {
    backgroundColor: "#10B981",
  },
  breakdownRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#F1F5F9",
  },
  legendRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 6,
  },
  breakdownLabel: {
    fontSize: 13,
    color: "#64748B",
    fontWeight: "500",
  },
  breakdownValue: {
    fontSize: 13,
    color: "#0F172A",
    fontWeight: "700",
  },
});
