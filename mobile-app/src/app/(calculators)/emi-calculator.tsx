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
import { Copy, RotateCcw, Check, CreditCard } from "lucide-react-native";

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
    <SafeAreaView style={styles.container} edges={["top", "bottom"]}>
      <StatusBar style="dark" />
      <CalculatorHeader
        title="EMI Calculator"
        subtitle="Plan your loans by calculating Equated Monthly Installments and interest."
        iconName="CreditCard"
        themeColor="#4F46E5"
        themeBg="#EEF2FF"
      />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {/* Input Card */}
        <View style={styles.inputCard}>
          <Text style={styles.inputLabel}>LOAN AMOUNT (PRINCIPAL)</Text>
          <View style={styles.inputWrapper}>
            <Text style={styles.prefix}>₹</Text>
            <TextInput
              style={styles.textInput}
              keyboardType="numeric"
              value={principal}
              onChangeText={setPrincipal}
              placeholder="e.g. 500000"
              placeholderTextColor="#94A3B8"
            />
          </View>

          <Text style={[styles.inputLabel, { marginTop: 16 }]}>INTEREST RATE (% P.A.)</Text>
          <View style={styles.inputWrapper}>
            <TextInput
              style={styles.textInput}
              keyboardType="numeric"
              value={rate}
              onChangeText={setRate}
              placeholder="e.g. 8.5"
              placeholderTextColor="#94A3B8"
            />
            <Text style={styles.suffix}>%</Text>
          </View>

          {/* Loan Tenure with Switcher */}
          <View style={styles.tenureHeaderRow}>
            <Text style={styles.inputLabel}>LOAN TENURE</Text>
            <View style={styles.typeSwitcher}>
              <Pressable
                onPress={() => {
                  Haptics.selectionAsync();
                  setTenureType("years");
                }}
                style={[
                  styles.typeBtn,
                  tenureType === "years" && styles.typeBtnActive,
                ]}
              >
                <Text
                  style={[
                    styles.typeBtnText,
                    tenureType === "years" && styles.typeBtnTextActive,
                  ]}
                >
                  Years
                </Text>
              </Pressable>
              <Pressable
                onPress={() => {
                  Haptics.selectionAsync();
                  setTenureType("months");
                }}
                style={[
                  styles.typeBtn,
                  tenureType === "months" && styles.typeBtnActive,
                ]}
              >
                <Text
                  style={[
                    styles.typeBtnText,
                    tenureType === "months" && styles.typeBtnTextActive,
                  ]}
                >
                  Months
                </Text>
              </Pressable>
            </View>
          </View>

          <View style={styles.inputWrapper}>
            <TextInput
              style={styles.textInput}
              keyboardType="numeric"
              value={tenure}
              onChangeText={setTenure}
              placeholder={tenureType === "years" ? "e.g. 5" : "e.g. 60"}
              placeholderTextColor="#94A3B8"
            />
            <Text style={styles.suffix}>
              {tenureType === "years" ? "Years" : "Months"}
            </Text>
          </View>
        </View>

        {/* Result Box */}
        <View style={styles.resultBox}>
          <View style={styles.resultHeader}>
            <View />
            <View style={styles.actionButtons}>
              <Pressable onPress={handleCopy} style={styles.copyBtn}>
                {copied ? <Check size={14} color="#059669" /> : <Copy size={14} color="#4338CA" />}
                <Text style={[styles.copyBtnText, copied && { color: "#059669" }]}>
                  {copied ? "Copied" : "Copy"}
                </Text>
              </Pressable>
              <Pressable onPress={handleReset} style={styles.resetBtn}>
                <RotateCcw size={15} color="#4338CA" />
              </Pressable>
            </View>
          </View>

          {/* Credit Card Icon Badge */}
          <View style={styles.iconCircle}>
            <CreditCard size={28} color="#4F46E5" />
          </View>

          <Text style={styles.resultCategory}>MONTHLY EMI</Text>
          <View style={styles.priceRow}>
            <Text style={styles.currencySymbol}>₹</Text>
            <Text style={styles.finalPriceText}>
              {Number(results.emi).toLocaleString("en-IN")}
            </Text>
          </View>

          {/* Breakdown cards */}
          <View style={styles.breakdownCards}>
            <View style={styles.breakdownItem}>
              <Text style={styles.breakdownLabel}>Total Interest</Text>
              <Text style={styles.breakdownValue}>
                ₹{Number(results.totalInterest).toLocaleString("en-IN")}
              </Text>
            </View>
            <View style={styles.breakdownItem}>
              <Text style={styles.breakdownLabel}>Total Payable</Text>
              <Text style={styles.breakdownValue}>
                ₹{Number(results.totalAmount).toLocaleString("en-IN")}
              </Text>
            </View>
          </View>
        </View>

        {/* Disclaimer */}
        <View style={styles.disclaimerBox}>
          <Text style={styles.disclaimerText}>
            Disclaimer: EMI results are estimates based on the information provided. Actual EMI, interest rates, fees and other charges may vary depending on the lender and loan terms.
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
    backgroundColor: "#EEF2FF",
    borderRadius: 20,
    padding: 18,
    borderWidth: 1,
    borderColor: "#E0E7FF",
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 11,
    fontWeight: "800",
    color: "#3730A3",
    letterSpacing: 0.5,
    marginBottom: 8,
  },
  tenureHeaderRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 16,
    marginBottom: 8,
  },
  typeSwitcher: {
    flexDirection: "row",
    backgroundColor: "#E2E8F0",
    borderRadius: 8,
    padding: 2,
  },
  typeBtn: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
  },
  typeBtnActive: {
    backgroundColor: "#FFFFFF",
  },
  typeBtnText: {
    fontSize: 11,
    fontWeight: "700",
    color: "#64748B",
  },
  typeBtnTextActive: {
    color: "#4338CA",
    fontWeight: "800",
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
    backgroundColor: "#E0E7FF",
    borderRadius: 22,
    padding: 20,
    borderWidth: 1.5,
    borderColor: "#C7D2FE",
    alignItems: "center",
    shadowColor: "#4F46E5",
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
    borderColor: "#C7D2FE",
    gap: 4,
  },
  copyBtnText: {
    fontSize: 11,
    fontWeight: "800",
    color: "#4338CA",
  },
  resetBtn: {
    width: 30,
    height: 30,
    borderRadius: 8,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#C7D2FE",
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
    color: "#3730A3",
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
    color: "#4338CA",
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
    borderColor: "#C7D2FE",
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
    backgroundColor: "#EEF2FF",
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#E0E7FF",
  },
  disclaimerText: {
    fontSize: 11,
    color: "#6366F1",
    lineHeight: 16,
    textAlign: "center",
    fontWeight: "500",
  },
});
