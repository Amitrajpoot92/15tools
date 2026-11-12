import React, { useState } from "react";
import { View, Text, TextInput, ScrollView, Pressable, StyleSheet } from "react-native";
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
import { CreditCard } from "lucide-react-native";

export default function EMICalculatorScreen() {
  const [principal, setPrincipal] = useState("");
  const [rate, setRate] = useState("");
  const [tenure, setTenure] = useState("");
  const [tenureType, setTenureType] = useState<"years" | "months">("years");
  const [copied, setCopied] = useState(false);

  const calculateEMI = () => {
    const p = parseFloat(principal);
    const r = parseFloat(rate);
    const t = parseFloat(tenure);

    if (!isNaN(p) && !isNaN(r) && !isNaN(t) && p > 0 && r > 0 && t > 0) {
      const months = tenureType === "years" ? t * 12 : t;
      const monthlyRate = r / 12 / 100;
      const emi =
        (p * monthlyRate * Math.pow(1 + monthlyRate, months)) /
        (Math.pow(1 + monthlyRate, months) - 1);
      const totalAmount = emi * months;
      const totalInterest = totalAmount - p;
      return {
        emi: emi.toFixed(0),
        totalInterest: totalInterest.toFixed(0),
        totalAmount: totalAmount.toFixed(0),
      };
    }
    return { emi: "0", totalInterest: "0", totalAmount: "0" };
  };

  const results = calculateEMI();

  const handleCopy = async () => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    const text = `EMI Calculator\nLoan Amount: ₹${principal || 0}\nInterest Rate: ${
      rate || 0
    }%\nLoan Tenure: ${tenure || 0} ${
      tenureType === "years" ? "Years" : "Months"
    }\nMonthly EMI: ₹${Number(results.emi).toLocaleString("en-IN")}\nTotal Interest: ₹${Number(
      results.totalInterest
    ).toLocaleString("en-IN")}\nTotal Payable: ₹${Number(
      results.totalAmount
    ).toLocaleString("en-IN")}\n\nCalculate Online: https://topcalcbox.com/emi-calculator/`;
    await Clipboard.setStringAsync(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleReset = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    setPrincipal("");
    setRate("");
    setTenure("");
    setTenureType("years");
  };

  return (
    <SafeAreaView style={sharedStyles.safeArea} edges={["top", "bottom"]}>
      <StatusBar style="dark" />
      <CalculatorHeader
        title="EMI Calculator"
        subtitle="Plan your loans by calculating Equated Monthly Installments and interest."
        iconName="CreditCard"
        color="indigo"
      />

      <ScrollView
        contentContainerStyle={sharedStyles.scrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <OuterToolCard>
          <FormPanel theme="indigo">
            <Text style={sharedStyles.fieldLabel}>Loan Amount (Principal)</Text>
            <View style={sharedStyles.inputBox}>
              <Text style={[sharedStyles.affix, { marginRight: 6 }]}>₹</Text>
              <TextInput
                style={sharedStyles.textInput}
                keyboardType="numeric"
                value={principal}
                onChangeText={setPrincipal}
                placeholder="e.g. 500000"
                placeholderTextColor="#94A3B8"
              />
            </View>

            <Text style={[sharedStyles.fieldLabel, { marginTop: 14 }]}>Interest Rate (% p.a.)</Text>
            <View style={sharedStyles.inputBox}>
              <TextInput
                style={sharedStyles.textInput}
                keyboardType="numeric"
                value={rate}
                onChangeText={setRate}
                placeholder="e.g. 8.5"
                placeholderTextColor="#94A3B8"
              />
              <Text style={sharedStyles.affix}>%</Text>
            </View>

            <View style={styles.tenureRow}>
              <Text style={[sharedStyles.fieldLabel, { marginBottom: 0 }]}>Loan Tenure</Text>
              <View style={styles.miniSwitch}>
                {(["years", "months"] as const).map((unit) => {
                  const active = tenureType === unit;
                  return (
                    <Pressable
                      key={unit}
                      onPress={() => {
                        Haptics.selectionAsync();
                        setTenureType(unit);
                      }}
                      style={[styles.miniBtn, active && styles.miniBtnActive]}
                    >
                      <Text style={[styles.miniText, active && styles.miniTextActive]}>
                        {unit === "years" ? "Years" : "Months"}
                      </Text>
                    </Pressable>
                  );
                })}
              </View>
            </View>

            <View style={sharedStyles.inputBox}>
              <TextInput
                style={sharedStyles.textInput}
                keyboardType="numeric"
                value={tenure}
                onChangeText={setTenure}
                placeholder={tenureType === "years" ? "e.g. 5" : "e.g. 60"}
                placeholderTextColor="#94A3B8"
              />
              <Text style={sharedStyles.affix}>{tenureType === "years" ? "Years" : "Months"}</Text>
            </View>
          </FormPanel>

          <ResultPanel theme="indigo">
            <View style={sharedStyles.resultHeaderRow}>
              <View style={styles.kickerRow}>
                <CreditCard size={15} color="#4F46E5" />
                <Text style={sharedStyles.resultKicker}>Monthly EMI</Text>
              </View>
              <CopyResetActions copied={copied} onCopy={handleCopy} onReset={handleReset} theme="indigo" />
            </View>

            <Text style={styles.emiValue}>
              ₹{Number(results.emi).toLocaleString("en-IN")}
            </Text>

            <View style={[sharedStyles.grid2, { marginTop: 12 }]}>
              <StatTile
                label="Total Interest"
                value={`₹${Number(results.totalInterest).toLocaleString("en-IN")}`}
                valueColor="#4338CA"
                borderColor="#C7D2FE"
              />
              <StatTile
                label="Total Payable"
                value={`₹${Number(results.totalAmount).toLocaleString("en-IN")}`}
                borderColor="#C7D2FE"
              />
            </View>
          </ResultPanel>

          <DisclaimerNote text="Disclaimer: EMI results are estimates based on the information provided. Actual EMI, interest rates, fees and other charges may vary depending on the lender and loan terms." />
        </OuterToolCard>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  tenureRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 14,
    marginBottom: 6,
  },
  miniSwitch: {
    flexDirection: "row",
    backgroundColor: "#E2E8F0",
    borderRadius: 8,
    padding: 2,
    gap: 2,
  },
  miniBtn: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
  },
  miniBtnActive: {
    backgroundColor: "#FFFFFF",
  },
  miniText: {
    fontSize: 11,
    fontWeight: "700",
    color: "#475569",
  },
  miniTextActive: {
    color: "#3730A3",
    fontWeight: "800",
  },
  kickerRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    flex: 1,
  },
  emiValue: {
    fontSize: 38,
    fontWeight: "900",
    color: "#1E1B4B",
    letterSpacing: -0.8,
  },
});
