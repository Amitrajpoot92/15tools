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
import { Copy, RotateCcw, Check, Minus, Plus, Banknote } from "lucide-react-native";

export default function TipCalculatorScreen() {
  const [currency, setCurrency] = useState<"₹" | "$">("₹");
  const [bill, setBill] = useState("");
  const [tipPercent, setTipPercent] = useState("20");
  const [people, setPeople] = useState(2);
  const [copied, setCopied] = useState(false);

  const calculate = () => {
    const b = parseFloat(bill);
    const t = parseFloat(tipPercent);
    const p = people;

    if (!isNaN(b) && !isNaN(t) && p > 0) {
      const tipAmount = (b * t) / 100;
      const totalAmount = b + tipAmount;
      const tipPerPerson = tipAmount / p;
      const perPerson = totalAmount / p;

      return {
        tip: tipAmount,
        total: totalAmount,
        tipPerPerson: tipPerPerson,
        split: perPerson,
      };
    }
    return { tip: 0, total: 0, tipPerPerson: 0, split: 0 };
  };

  const { tip, total, tipPerPerson, split } = calculate();

  const formatCurrency = (amount: number) => {
    return (
      currency +
      amount.toLocaleString("en-IN", {
        minimumFractionDigits: amount % 1 !== 0 ? 2 : 0,
        maximumFractionDigits: 2,
      })
    );
  };

  const handleCopy = async () => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    const text = `Tip Calculator\nBill Amount: ${currency}${bill || 0}\nTip Percentage: ${tipPercent || 0}%\nNumber of People: ${people || 1}\nTotal Tip: ${formatCurrency(tip)}\nTotal Bill + Tip: ${formatCurrency(total)}\nTotal Payable Per Person: ${formatCurrency(split)}\n\nCalculate Online: https://topcalcbox.com/tip-calculator/`;
    await Clipboard.setStringAsync(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleReset = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    setBill("");
    setTipPercent("20");
    setPeople(2);
  };

  return (
    <SafeAreaView style={styles.container} edges={["top", "bottom"]}>
      <StatusBar style="dark" />
      <CalculatorHeader
        title="Tip Calculator"
        subtitle="Easily calculate the tip amount and split the total bill among friends."
        iconName="Banknote"
        themeColor="#F97316"
        themeBg="#FFEDD5"
      />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {/* Currency Switcher */}
        <View style={styles.currencyRow}>
          <Text style={styles.currencySectionTitle}>CURRENCY</Text>
          <View style={styles.currencyToggle}>
            <Pressable
              onPress={() => {
                Haptics.selectionAsync();
                setCurrency("₹");
              }}
              style={[
                styles.currencyBtn,
                currency === "₹" && styles.currencyBtnActive,
              ]}
            >
              <Text
                style={[
                  styles.currencyBtnText,
                  currency === "₹" && styles.currencyBtnTextActive,
                ]}
              >
                ₹ INR
              </Text>
            </Pressable>
            <Pressable
              onPress={() => {
                Haptics.selectionAsync();
                setCurrency("$");
              }}
              style={[
                styles.currencyBtn,
                currency === "$" && styles.currencyBtnActive,
              ]}
            >
              <Text
                style={[
                  styles.currencyBtnText,
                  currency === "$" && styles.currencyBtnTextActive,
                ]}
              >
                $ USD
              </Text>
            </Pressable>
          </View>
        </View>

        {/* Inputs Card */}
        <View style={styles.inputCard}>
          {/* Bill Amount */}
          <Text style={styles.inputLabel}>BILL AMOUNT</Text>
          <View style={styles.inputWrapper}>
            <Text style={styles.currencyPrefix}>{currency}</Text>
            <TextInput
              style={styles.textInputWithPrefix}
              keyboardType="numeric"
              value={bill}
              onChangeText={setBill}
              placeholder="1000"
              placeholderTextColor="#94A3B8"
            />
          </View>

          {/* Tip Percentage */}
          <Text style={[styles.inputLabel, { marginTop: 16 }]}>
            TIP PERCENTAGE
          </Text>
          <View style={styles.inputWrapper}>
            <TextInput
              style={styles.textInputWithSuffix}
              keyboardType="numeric"
              value={tipPercent}
              onChangeText={setTipPercent}
              placeholder="20"
              placeholderTextColor="#94A3B8"
            />
            <Text style={styles.unitSuffix}>%</Text>
          </View>

          {/* Preset Buttons */}
          <View style={styles.chipsRow}>
            {["10", "15", "18", "20"].map((preset) => (
              <Pressable
                key={preset}
                style={[
                  styles.chip,
                  tipPercent === preset && styles.chipActive,
                ]}
                onPress={() => {
                  Haptics.selectionAsync();
                  setTipPercent(preset);
                }}
              >
                <Text
                  style={[
                    styles.chipText,
                    tipPercent === preset && styles.chipTextActive,
                  ]}
                >
                  {preset}%
                </Text>
              </Pressable>
            ))}
          </View>

          {/* Number of People */}
          <View style={styles.peopleHeader}>
            <Text style={[styles.inputLabel, { marginBottom: 0 }]}>
              NUMBER OF PEOPLE
            </Text>
            <View style={styles.splitBadge}>
              <Text style={styles.splitBadgeText}>SPLIT BILL</Text>
            </View>
          </View>
          <View style={styles.stepperRow}>
            <Pressable
              onPress={() => {
                Haptics.selectionAsync();
                setPeople(Math.max(1, people - 1));
              }}
              style={styles.stepperBtn}
            >
              <Minus size={20} color="#EA580C" strokeWidth={2.5} />
            </Pressable>
            <TextInput
              style={styles.stepperInput}
              keyboardType="numeric"
              value={people.toString()}
              onChangeText={(text) => {
                const parsed = parseInt(text) || 1;
                setPeople(Math.max(1, parsed));
              }}
            />
            <Pressable
              onPress={() => {
                Haptics.selectionAsync();
                setPeople(people + 1);
              }}
              style={styles.stepperBtn}
            >
              <Plus size={20} color="#EA580C" strokeWidth={2.5} />
            </Pressable>
          </View>
        </View>

        {/* Result Card */}
        <View style={styles.resultCard}>
          <View style={styles.resultHeader}>
            <View style={styles.resultHeaderLeft}>
              <View style={styles.resultDot} />
              <Text style={styles.resultTitle}>TIP SUMMARY</Text>
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
                  <Copy size={14} color="#EA580C" />
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
                onPress={handleReset}
              >
                <RotateCcw size={14} color="#EA580C" />
              </Pressable>
            </View>
          </View>

          {/* Hero Result */}
          <View style={styles.heroBox}>
            <Text style={styles.heroSubTitle}>TOTAL PAYABLE PER PERSON</Text>
            <Text style={styles.heroValue}>
              {formatCurrency(split)}
            </Text>
            <View style={styles.badgePill}>
              <Text style={styles.badgePillText}>
                For {people} {people === 1 ? "Person" : "People"}
              </Text>
            </View>
          </View>

          {/* 3 Detail Cards */}
          <View style={styles.gridRow}>
            <View style={styles.gridCard}>
              <Text style={styles.gridCardValue}>
                {formatCurrency(tip)}
              </Text>
              <Text style={styles.gridCardLabel}>TOTAL TIP</Text>
            </View>
            <View style={styles.gridCard}>
              <Text style={styles.gridCardValue}>
                {formatCurrency(total)}
              </Text>
              <Text style={styles.gridCardLabel}>BILL + TIP</Text>
            </View>
            <View style={styles.gridCard}>
              <Text style={styles.gridCardValue}>
                {formatCurrency(tipPerPerson)}
              </Text>
              <Text style={styles.gridCardLabel}>TIP/PERSON</Text>
            </View>
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
  currencyRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#F1F5F9",
  },
  currencySectionTitle: {
    fontSize: 12,
    fontWeight: "700",
    color: "#64748B",
    letterSpacing: 0.8,
  },
  currencyToggle: {
    flexDirection: "row",
    backgroundColor: "#F1F5F9",
    borderRadius: 12,
    padding: 3,
  },
  currencyBtn: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 10,
  },
  currencyBtnActive: {
    backgroundColor: "#FFFFFF",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  currencyBtnText: {
    fontSize: 12,
    fontWeight: "700",
    color: "#64748B",
  },
  currencyBtnTextActive: {
    color: "#EA580C",
  },
  inputCard: {
    backgroundColor: "#FFF7ED",
    borderRadius: 20,
    padding: 16,
    borderWidth: 1,
    borderColor: "#FFEDD5",
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 11,
    fontWeight: "800",
    color: "#9A3412",
    letterSpacing: 0.6,
    marginBottom: 8,
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#FED7AA",
  },
  currencyPrefix: {
    paddingLeft: 16,
    paddingRight: 6,
    fontSize: 18,
    fontWeight: "800",
    color: "#94A3B8",
  },
  textInputWithPrefix: {
    flex: 1,
    height: 50,
    fontSize: 18,
    fontWeight: "700",
    color: "#0F172A",
    paddingRight: 16,
  },
  textInputWithSuffix: {
    flex: 1,
    height: 50,
    fontSize: 18,
    fontWeight: "700",
    color: "#0F172A",
    paddingLeft: 16,
  },
  unitSuffix: {
    paddingRight: 16,
    fontSize: 16,
    fontWeight: "800",
    color: "#94A3B8",
  },
  chipsRow: {
    flexDirection: "row",
    gap: 8,
    marginTop: 12,
  },
  chip: {
    flex: 1,
    paddingVertical: 8,
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#FED7AA",
    alignItems: "center",
  },
  chipActive: {
    backgroundColor: "#F97316",
    borderColor: "#F97316",
  },
  chipText: {
    fontSize: 13,
    fontWeight: "700",
    color: "#9A3412",
  },
  chipTextActive: {
    color: "#FFFFFF",
  },
  peopleHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 16,
    marginBottom: 8,
  },
  splitBadge: {
    backgroundColor: "#FFEDD5",
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  splitBadgeText: {
    fontSize: 10,
    fontWeight: "800",
    color: "#EA580C",
    letterSpacing: 0.5,
  },
  stepperRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  stepperBtn: {
    width: 48,
    height: 48,
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#FED7AA",
    alignItems: "center",
    justifyContent: "center",
  },
  stepperInput: {
    flex: 1,
    height: 48,
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#FED7AA",
    textAlign: "center",
    fontSize: 18,
    fontWeight: "800",
    color: "#0F172A",
  },
  resultCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 24,
    padding: 18,
    borderWidth: 1,
    borderColor: "#FED7AA",
    shadowColor: "#F97316",
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
    backgroundColor: "#EA580C",
  },
  resultTitle: {
    fontSize: 11,
    fontWeight: "800",
    color: "#9A3412",
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
    backgroundColor: "#FFF7ED",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#FED7AA",
  },
  actionBtnText: {
    fontSize: 11,
    fontWeight: "700",
    color: "#EA580C",
  },
  actionBtnIcon: {
    backgroundColor: "#FFF7ED",
    padding: 6,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#FED7AA",
  },
  heroBox: {
    backgroundColor: "#FFF7ED",
    borderRadius: 18,
    paddingVertical: 20,
    paddingHorizontal: 16,
    alignItems: "center",
    marginBottom: 14,
    borderWidth: 1,
    borderColor: "#FED7AA",
  },
  heroSubTitle: {
    fontSize: 10,
    fontWeight: "800",
    color: "#9A3412",
    letterSpacing: 1.2,
    marginBottom: 4,
  },
  heroValue: {
    fontSize: 36,
    fontWeight: "900",
    color: "#7C2D12",
    letterSpacing: -0.5,
  },
  badgePill: {
    backgroundColor: "#FED7AA",
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 20,
    marginTop: 8,
  },
  badgePillText: {
    fontSize: 11,
    fontWeight: "700",
    color: "#9A3412",
  },
  gridRow: {
    flexDirection: "row",
    gap: 8,
  },
  gridCard: {
    flex: 1,
    backgroundColor: "#F8FAFC",
    borderRadius: 14,
    paddingVertical: 12,
    paddingHorizontal: 6,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#F1F5F9",
  },
  gridCardValue: {
    fontSize: 14,
    fontWeight: "800",
    color: "#0F172A",
    marginBottom: 2,
    textAlign: "center",
  },
  gridCardLabel: {
    fontSize: 9,
    fontWeight: "700",
    color: "#64748B",
    letterSpacing: 0.5,
    textAlign: "center",
  },
});
