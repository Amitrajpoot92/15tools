import React, { useState } from "react";
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
  DisclaimerNote,
  sharedStyles,
} from "@/components/CalculatorUI";
import { LineChart } from "lucide-react-native";

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
    ).toLocaleString("en-IN")}\nWealth Gained: ₹${Number(results.wealthGained).toLocaleString(
      "en-IN"
    )}\nTotal Expected Amount: ₹${Number(results.expectedAmount).toLocaleString(
      "en-IN"
    )}\n\nCalculate Online: https://topcalcbox.com/sip-calculator/`;
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
    <SafeAreaView style={sharedStyles.safeArea} edges={["top", "bottom"]}>
      <StatusBar style="dark" />
      <CalculatorHeader
        title="SIP Calculator"
        subtitle="Calculate your wealth growth and expected returns for Mutual Fund SIPs."
        iconName="LineChart"
        color="rose"
      />

      <ScrollView
        contentContainerStyle={sharedStyles.scrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <OuterToolCard>
          <FormPanel theme="rose">
            <Text style={sharedStyles.fieldLabel}>Monthly Investment (₹)</Text>
            <View style={sharedStyles.inputBox}>
              <Text style={[sharedStyles.affix, { marginRight: 6 }]}>₹</Text>
              <TextInput
                style={sharedStyles.textInput}
                keyboardType="numeric"
                value={investment}
                onChangeText={setInvestment}
                placeholder="e.g. 5000"
                placeholderTextColor="#94A3B8"
              />
            </View>

            <Text style={[sharedStyles.fieldLabel, { marginTop: 14 }]}>Expected Return Rate (% p.a.)</Text>
            <View style={sharedStyles.inputBox}>
              <TextInput
                style={sharedStyles.textInput}
                keyboardType="numeric"
                value={rate}
                onChangeText={setRate}
                placeholder="e.g. 12"
                placeholderTextColor="#94A3B8"
              />
              <Text style={sharedStyles.affix}>%</Text>
            </View>

            <Text style={[sharedStyles.fieldLabel, { marginTop: 14 }]}>Time Period (Years)</Text>
            <View style={sharedStyles.inputBox}>
              <TextInput
                style={sharedStyles.textInput}
                keyboardType="numeric"
                value={years}
                onChangeText={setYears}
                placeholder="e.g. 10"
                placeholderTextColor="#94A3B8"
              />
              <Text style={sharedStyles.affix}>Years</Text>
            </View>
          </FormPanel>

          <ResultPanel theme="rose">
            <View style={sharedStyles.resultHeaderRow}>
              <View style={styles.kickerRow}>
                <LineChart size={15} color="#E11D48" />
                <Text style={sharedStyles.resultKicker}>Total Expected Amount</Text>
              </View>
              <CopyResetActions copied={copied} onCopy={handleCopy} onReset={handleReset} theme="rose" />
            </View>

            <Text style={styles.heroAmount}>
              ₹{Number(results.expectedAmount).toLocaleString("en-IN")}
            </Text>

            <View style={[sharedStyles.grid2, { marginTop: 12 }]}>
              <StatTile
                label="Invested Amount"
                value={`₹${Number(results.totalInvested).toLocaleString("en-IN")}`}
                borderColor="#FECDD3"
              />
              <StatTile
                label="Wealth Gained"
                value={`₹${Number(results.wealthGained).toLocaleString("en-IN")}`}
                valueColor="#E11D48"
                borderColor="#FECDD3"
              />
            </View>
          </ResultPanel>

          <DisclaimerNote text="Disclaimer: SIP returns shown are estimates for illustration purposes only and are not guaranteed. Actual returns may vary based on market performance and other factors." />
        </OuterToolCard>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  kickerRow: { flexDirection: "row", alignItems: "center", gap: 6, flex: 1 },
  heroAmount: { fontSize: 36, fontWeight: "900", color: "#881337", letterSpacing: -0.8 },
});
