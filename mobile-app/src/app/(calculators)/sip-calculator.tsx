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
import { Copy, RotateCcw, Check, LineChart } from "lucide-react-native";

export default function SIPCalculatorScreen() {
  const [investment, setInvestment] = useState("");
  const [rate, setRate] = useState("");
  const [years, setYears] = useState("");
  const [copied, setCopied] = useState(false);

  const calculateSIP = () => {
    const P = parseFloat(investment);
    const r = parseFloat(rate);
    const n = parseFloat(years) * 12;

    if (!isNaN(P) && !isNaN(r) && !isNaN(n) && P > 0 && r > 0 && n > 0) {
      const i = r / 12 / 100;
      const expectedAmount = P * ((Math.pow(1 + i, n) - 1) / i) * (1 + i);
      const totalInvested = P * n;
      const wealthGained = expectedAmount - totalInvested;

      return {
        expectedAmount: expectedAmount.toFixed(0),
        wealthGained: wealthGained.toFixed(0),
        totalInvested: totalInvested.toFixed(0),
      };
    }
    return { expectedAmount: "0", wealthGained: "0", totalInvested: "0" };
  };

  const results = calculateSIP();

  const handleCopy = async () => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    const text = `SIP Calculator\nMonthly Investment: ₹${investment || 0}\nExpected Return: ${
      rate || 0
    }%\nInvestment Period: ${years || 0} Years\nTotal Investment: ₹${Number(
      results.totalInvested
    ).toLocaleString("en-IN")}\nWealth Gained: ₹${Number(
      results.wealthGained
    ).toLocaleString("en-IN")}\nTotal Expected Amount: ₹${Number(
      results.expectedAmount
    ).toLocaleString("en-IN")}\n\nCalculate Online: https://topcalcbox.com/sip-calculator/`;
    await Clipboard.setStringAsync(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleReset = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    setInvestment("");
    setRate("");
    setYears("");
  };

  return (
    <SafeAreaView style={styles.container} edges={["top", "bottom"]}>
      <StatusBar style="dark" />
      <CalculatorHeader
        title="SIP Calculator"
        subtitle="Calculate your wealth growth and expected returns for Mutual Fund SIPs."
        iconName="LineChart"
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
          <Text style={styles.inputLabel}>MONTHLY INVESTMENT</Text>
          <View style={styles.inputWrapper}>
            <Text style={styles.prefix}>₹</Text>
            <TextInput
              style={styles.textInput}
              keyboardType="numeric"
              value={investment}
              onChangeText={setInvestment}
              placeholder="e.g. 5000"
              placeholderTextColor="#94A3B8"
            />
          </View>

          <Text style={[styles.inputLabel, { marginTop: 16 }]}>
            EXPECTED RETURN RATE (% P.A.)
          </Text>
          <View style={styles.inputWrapper}>
            <TextInput
              style={styles.textInput}
              keyboardType="numeric"
              value={rate}
              onChangeText={setRate}
              placeholder="e.g. 12"
              placeholderTextColor="#94A3B8"
            />
            <Text style={styles.suffix}>%</Text>
          </View>

          <Text style={[styles.inputLabel, { marginTop: 16 }]}>
            TIME PERIOD (YEARS)
          </Text>
          <View style={styles.inputWrapper}>
            <TextInput
              style={styles.textInput}
              keyboardType="numeric"
              value={years}
              onChangeText={setYears}
              placeholder="e.g. 10"
              placeholderTextColor="#94A3B8"
            />
            <Text style={styles.suffix}>Years</Text>
          </View>
        </View>

        {/* Result Box */}
        <View style={styles.resultBox}>
          <View style={styles.resultHeader}>
            <View />
            <View style={styles.actionButtons}>
              <Pressable onPress={handleCopy} style={styles.copyBtn}>
                {copied ? <Check size={14} color="#059669" /> : <Copy size={14} color="#E11D48" />}
                <Text style={[styles.copyBtnText, copied && { color: "#059669" }]}>
                  {copied ? "Copied" : "Copy"}
                </Text>
              </Pressable>
              <Pressable onPress={handleReset} style={styles.resetBtn}>
                <RotateCcw size={15} color="#E11D48" />
              </Pressable>
            </View>
          </View>

          {/* LineChart Icon Badge */}
          <View style={styles.iconCircle}>
            <LineChart size={28} color="#E11D48" />
          </View>

          <Text style={styles.resultCategory}>TOTAL EXPECTED AMOUNT</Text>
          <View style={styles.priceRow}>
            <Text style={styles.currencySymbol}>₹</Text>
            <Text style={styles.finalPriceText}>
              {Number(results.expectedAmount).toLocaleString("en-IN")}
            </Text>
          </View>

          {/* Breakdown cards */}
          <View style={styles.breakdownCards}>
            <View style={styles.breakdownItem}>
              <Text style={styles.breakdownLabel}>Invested Amount</Text>
              <Text style={styles.breakdownValue}>
                ₹{Number(results.totalInvested).toLocaleString("en-IN")}
              </Text>
            </View>
            <View style={styles.breakdownItem}>
              <Text style={styles.breakdownLabel}>Wealth Gained</Text>
              <Text style={[styles.breakdownValue, { color: "#E11D48" }]}>
                ₹{Number(results.wealthGained).toLocaleString("en-IN")}
              </Text>
            </View>
          </View>
        </View>

        {/* Disclaimer */}
        <View style={styles.disclaimerBox}>
          <Text style={styles.disclaimerText}>
            Disclaimer: SIP returns shown are estimates for illustration purposes only and are not guaranteed. Actual returns may vary based on market performance and other factors.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F8FAFC" },
  scrollContent: { paddingHorizontal: 16, paddingBottom: 40 },
  inputCard: {
    backgroundColor: "#FFF1F2",
    borderRadius: 20,
    padding: 18,
    borderWidth: 1,
    borderColor: "#FFE4E6",
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 11,
    fontWeight: "800",
    color: "#BE123C",
    letterSpacing: 0.5,
    marginBottom: 8,
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#CBD5E1",
    borderRadius: 14,
    paddingHorizontal: 14,
    height: 52,
  },
  textInput: {
    flex: 1,
    fontSize: 20,
    fontWeight: "800",
    color: "#0F172A",
  },
  prefix: {
    fontSize: 18,
    fontWeight: "800",
    color: "#94A3B8",
    marginRight: 6,
  },
  suffix: {
    fontSize: 15,
    fontWeight: "700",
    color: "#64748B",
    marginLeft: 6,
  },
  resultBox: {
    backgroundColor: "#FFE4E6",
    borderRadius: 22,
    padding: 20,
    borderWidth: 1.5,
    borderColor: "#FECDD3",
    alignItems: "center",
    shadowColor: "#E11D48",
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
    borderColor: "#FECDD3",
    gap: 4,
  },
  copyBtnText: {
    fontSize: 11,
    fontWeight: "800",
    color: "#E11D48",
  },
  resetBtn: {
    width: 30,
    height: 30,
    borderRadius: 8,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#FECDD3",
  },
  iconCircle: {
    width: 56,
    height: 56,
    borderRadius: 16,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 6,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  resultCategory: {
    fontSize: 12,
    fontWeight: "800",
    color: "#9F1239",
    letterSpacing: 1,
    marginBottom: 4,
  },
  priceRow: {
    flexDirection: "row",
    alignItems: "baseline",
    marginBottom: 18,
  },
  currencySymbol: {
    fontSize: 28,
    fontWeight: "800",
    color: "#E11D48",
    marginRight: 4,
  },
  finalPriceText: {
    fontSize: 46,
    fontWeight: "900",
    color: "#0F172A",
    letterSpacing: -1,
  },
  breakdownCards: {
    width: "100%",
    gap: 10,
  },
  breakdownItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    padding: 14,
    borderWidth: 1,
    borderColor: "#FECDD3",
  },
  breakdownLabel: {
    fontSize: 13,
    fontWeight: "700",
    color: "#475569",
  },
  breakdownValue: {
    fontSize: 15,
    fontWeight: "900",
    color: "#0F172A",
  },
  disclaimerBox: {
    marginTop: 14,
    padding: 14,
    backgroundColor: "#FFF1F2",
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#FFE4E6",
  },
  disclaimerText: {
    fontSize: 11,
    color: "#BE123C",
    lineHeight: 16,
    textAlign: "center",
    fontWeight: "500",
  },
});
