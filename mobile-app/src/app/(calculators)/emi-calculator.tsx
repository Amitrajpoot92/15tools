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
import { calculateEMI } from "@/lib/calculations/finance";
import { Copy, RotateCcw, Check } from "lucide-react-native";

export default function EMICalculatorScreen() {
  const [loanAmount, setLoanAmount] = useState("1000000");
  const [interestRate, setInterestRate] = useState("8.5");
  const [tenureYears, setTenureYears] = useState("5");
  const [copied, setCopied] = useState(false);

  const P = parseFloat(loanAmount) || 0;
  const r = parseFloat(interestRate) || 0;
  const t = parseFloat(tenureYears) || 0;

  const result = calculateEMI(P, r, t);

  const formatCurrency = (val: number) => {
    return "₹" + val.toLocaleString("en-IN");
  };

  const handleCopy = async () => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    const summary = `Loan EMI Details:\nLoan Amount: ${formatCurrency(P)}\nMonthly EMI: ${formatCurrency(result.emi)}\nTotal Interest: ${formatCurrency(result.totalInterest)}\nTotal Payment: ${formatCurrency(result.totalPayment)}`;
    await Clipboard.setStringAsync(summary);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleReset = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    setLoanAmount("1000000");
    setInterestRate("8.5");
    setTenureYears("5");
  };

  return (
    <SafeAreaView style={styles.container} edges={["top", "bottom"]}>
      <StatusBar style="dark" />
      <CalculatorHeader
        title="EMI Calculator"
        subtitle="Calculate Equated Monthly Installments and interest for Home, Car, or Personal Loans."
        iconName="CreditCard"
        themeColor="#F59E0B"
        themeBg="#FFFBEB"
      />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.card}>
          <Text style={styles.inputLabel}>LOAN AMOUNT (₹)</Text>
          <View style={styles.inputWrapper}>
            <Text style={styles.currencyPrefix}>₹</Text>
            <TextInput
              style={styles.textInput}
              keyboardType="number-pad"
              value={loanAmount}
              onChangeText={setLoanAmount}
              placeholder="1000000"
              placeholderTextColor="#94A3B8"
            />
          </View>

          <Text style={[styles.inputLabel, { marginTop: 14 }]}>
            INTEREST RATE (% P.A.)
          </Text>
          <View style={styles.inputWrapper}>
            <TextInput
              style={styles.textInput}
              keyboardType="decimal-pad"
              value={interestRate}
              onChangeText={setInterestRate}
              placeholder="8.5"
              placeholderTextColor="#94A3B8"
            />
            <Text style={styles.suffix}>%</Text>
          </View>

          <Text style={[styles.inputLabel, { marginTop: 14 }]}>
            LOAN TENURE (YEARS)
          </Text>
          <View style={styles.inputWrapper}>
            <TextInput
              style={styles.textInput}
              keyboardType="number-pad"
              value={tenureYears}
              onChangeText={setTenureYears}
              placeholder="5"
              placeholderTextColor="#94A3B8"
            />
            <Text style={styles.suffix}>Yrs</Text>
          </View>
        </View>

        <View style={styles.resultCard}>
          <View style={styles.resultHeader}>
            <Text style={styles.resultTitle}>Repayment Summary</Text>
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
            <Text style={styles.totalLabel}>MONTHLY EMI</Text>
            <Text style={styles.totalValue}>{formatCurrency(result.emi)}</Text>
          </View>

          <View style={styles.breakdownRow}>
            <Text style={styles.breakdownLabel}>Principal Loan Amount:</Text>
            <Text style={styles.breakdownValue}>{formatCurrency(P)}</Text>
          </View>

          <View style={styles.breakdownRow}>
            <Text style={styles.breakdownLabel}>Total Interest Payable:</Text>
            <Text style={[styles.breakdownValue, { color: "#EA580C" }]}>
              {formatCurrency(result.totalInterest)}
            </Text>
          </View>

          <View style={[styles.breakdownRow, { borderBottomWidth: 0 }]}>
            <Text style={styles.breakdownLabel}>Total Amount (Principal + Interest):</Text>
            <Text style={[styles.breakdownValue, { fontWeight: "800" }]}>
              {formatCurrency(result.totalPayment)}
            </Text>
          </View>
        </View>
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
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F8FAFC",
    borderWidth: 1,
    borderColor: "#CBD5E1",
    borderRadius: 14,
    paddingHorizontal: 14,
    height: 50,
  },
  currencyPrefix: { fontSize: 18, fontWeight: "800", color: "#94A3B8", marginRight: 6 },
  suffix: { fontSize: 14, fontWeight: "700", color: "#94A3B8", marginLeft: 6 },
  textInput: { flex: 1, fontSize: 18, fontWeight: "700", color: "#0F172A" },
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
    backgroundColor: "#FFFBEB",
    borderRadius: 16,
    padding: 16,
    alignItems: "center",
    marginBottom: 14,
    borderWidth: 1,
    borderColor: "#FEF3C7",
  },
  totalLabel: { fontSize: 11, fontWeight: "800", color: "#92400E", marginBottom: 4 },
  totalValue: { fontSize: 28, fontWeight: "900", color: "#D97706" },
  breakdownRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#F1F5F9",
  },
  breakdownLabel: { fontSize: 13, color: "#64748B", fontWeight: "500" },
  breakdownValue: { fontSize: 13, color: "#0F172A", fontWeight: "700" },
});
