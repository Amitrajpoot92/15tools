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
  CurrencyToggle,
  CopyResetActions,
  StatTile,
  sharedStyles,
} from "@/components/CalculatorUI";
import { Minus, Plus, Banknote } from "lucide-react-native";

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
      return {
        tip: tipAmount,
        total: totalAmount,
        tipPerPerson: tipAmount / p,
        split: totalAmount / p,
      };
    }
    return { tip: 0, total: 0, tipPerPerson: 0, split: 0 };
  };

  const { tip, total, tipPerPerson, split } = calculate();

  const formatCurrency = (amount: number) =>
    currency +
    amount.toLocaleString(currency === "₹" ? "en-IN" : "en-US", {
      minimumFractionDigits: amount % 1 !== 0 ? 2 : 0,
      maximumFractionDigits: 2,
    });

  const handleCopy = async () => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    const text = `Tip Calculator\nBill Amount: ${currency}${bill || 0}\nTip Percentage: ${
      tipPercent || 0
    }%\nNumber of People: ${people || 1}\nTotal Tip: ${formatCurrency(
      tip
    )}\nTotal Bill + Tip: ${formatCurrency(total)}\nTotal Payable Per Person: ${formatCurrency(
      split
    )}\n\nCalculate Online: https://topcalcbox.com/tip-calculator/`;
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
    <SafeAreaView style={sharedStyles.safeArea} edges={["top", "bottom"]}>
      <StatusBar style="dark" />
      <CalculatorHeader
        title="Tip Calculator"
        subtitle="Calculate tip, total bill and amount per person."
        iconName="Banknote"
        color="orange"
      />

      <ScrollView
        contentContainerStyle={sharedStyles.scrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <OuterToolCard>
          <CurrencyToggle currency={currency} onChange={setCurrency} theme="orange" />

          <FormPanel theme="orange">
            <Text style={sharedStyles.fieldLabel}>Bill Amount ({currency})</Text>
            <View style={sharedStyles.inputBox}>
              <Text style={[sharedStyles.affix, { marginRight: 6 }]}>{currency}</Text>
              <TextInput
                style={sharedStyles.textInput}
                keyboardType="numeric"
                value={bill}
                onChangeText={setBill}
                placeholder="1000"
                placeholderTextColor="#94A3B8"
              />
            </View>

            <Text style={[sharedStyles.fieldLabel, { marginTop: 14 }]}>Tip Percentage (%)</Text>
            <View style={sharedStyles.inputBox}>
              <TextInput
                style={sharedStyles.textInput}
                keyboardType="numeric"
                value={tipPercent}
                onChangeText={setTipPercent}
                placeholder="20"
                placeholderTextColor="#94A3B8"
              />
              <Text style={sharedStyles.affix}>%</Text>
            </View>

            <View style={sharedStyles.chipRow}>
              {["10", "15", "18", "20"].map((preset) => (
                <Pressable
                  key={preset}
                  style={[
                    sharedStyles.chip,
                    tipPercent === preset && { backgroundColor: "#FFF7ED", borderColor: "#FB923C" },
                  ]}
                  onPress={() => {
                    Haptics.selectionAsync();
                    setTipPercent(preset);
                  }}
                >
                  <Text style={sharedStyles.chipText}>{preset}%</Text>
                </Pressable>
              ))}
            </View>

            <Text style={[sharedStyles.fieldLabel, { marginTop: 14 }]}>Number of People (Split Bill)</Text>
            <View style={styles.stepperRow}>
              <Pressable
                onPress={() => {
                  Haptics.selectionAsync();
                  setPeople(Math.max(1, people - 1));
                }}
                style={styles.stepperBtn}
              >
                <Minus size={18} color="#EA580C" strokeWidth={2.5} />
              </Pressable>
              <TextInput
                style={styles.stepperInput}
                keyboardType="numeric"
                value={people.toString()}
                onChangeText={(text) => setPeople(Math.max(1, parseInt(text, 10) || 1))}
              />
              <Pressable
                onPress={() => {
                  Haptics.selectionAsync();
                  setPeople(people + 1);
                }}
                style={styles.stepperBtn}
              >
                <Plus size={18} color="#EA580C" strokeWidth={2.5} />
              </Pressable>
            </View>
          </FormPanel>

          <ResultPanel theme="orange">
            <View style={sharedStyles.resultHeaderRow}>
              <View style={styles.kickerRow}>
                <Banknote size={15} color="#EA580C" />
                <Text style={sharedStyles.resultKicker}>Payable Per Person</Text>
              </View>
              <CopyResetActions copied={copied} onCopy={handleCopy} onReset={handleReset} theme="orange" />
            </View>

            <Text style={[sharedStyles.heroValue, { color: "#7C2D12" }]}>
              {formatCurrency(split)}
            </Text>

            <View style={[styles.tripletRow, { marginTop: 12 }]}>
              <StatTile label="Total Tip" value={formatCurrency(tip)} borderColor="#FDBA74" />
              <StatTile label="Bill + Tip" value={formatCurrency(total)} borderColor="#FDBA74" />
              <StatTile
                label="Tip / Person"
                value={formatCurrency(tipPerPerson)}
                valueColor="#EA580C"
                borderColor="#FDBA74"
              />
            </View>
          </ResultPanel>
        </OuterToolCard>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  stepperRow: { flexDirection: "row", alignItems: "center", gap: 8 },
  stepperBtn: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: "#FFFFFF",
    borderWidth: 1.5,
    borderColor: "#CBD5E1",
    alignItems: "center",
    justifyContent: "center",
  },
  stepperInput: {
    flex: 1,
    height: 48,
    backgroundColor: "#FFFFFF",
    borderWidth: 1.5,
    borderColor: "#CBD5E1",
    borderRadius: 12,
    textAlign: "center",
    fontSize: 18,
    fontWeight: "800",
    color: "#0F172A",
  },
  kickerRow: { flexDirection: "row", alignItems: "center", gap: 6, flex: 1 },
  tripletRow: { flexDirection: "row", gap: 6 },
});
