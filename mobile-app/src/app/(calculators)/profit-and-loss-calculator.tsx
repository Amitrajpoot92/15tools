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
  CurrencyToggle,
  CopyResetActions,
  StatTile,
  sharedStyles,
} from "@/components/CalculatorUI";
import { TrendingUp, TrendingDown } from "lucide-react-native";

export default function ProfitLossCalculatorScreen() {
  const [costPrice, setCostPrice] = useState("");
  const [sellingPrice, setSellingPrice] = useState("");
  const [expenses, setExpenses] = useState("");
  const [currency, setCurrency] = useState<"₹" | "$">("₹");
  const [copied, setCopied] = useState(false);

  const calculate = () => {
    const cp = parseFloat(costPrice) || 0;
    const sp = parseFloat(sellingPrice) || 0;
    const exp = parseFloat(expenses) || 0;
    const totalCost = cp + exp;

    if (totalCost >= 0 && sp >= 0 && (costPrice || sellingPrice)) {
      if (sp >= totalCost) {
        const profit = sp - totalCost;
        const margin = totalCost > 0 ? (profit / totalCost) * 100 : 0;
        return { type: "profit" as const, amount: profit, margin, totalCost };
      } else {
        const loss = totalCost - sp;
        const lossMargin = totalCost > 0 ? (loss / totalCost) * 100 : 0;
        return { type: "loss" as const, amount: loss, margin: lossMargin, totalCost };
      }
    }
    return { type: "none" as const, amount: 0, margin: 0, totalCost: 0 };
  };

  const result = calculate();
  const isLoss = result.type === "loss";
  const resultTheme = isLoss ? "rose" : "emerald";
  const activeColor = isLoss ? "#E11D48" : "#059669";

  const formatNumber = (num: number, maxDigits = 2) =>
    num.toLocaleString(currency === "₹" ? "en-IN" : "en-US", {
      maximumFractionDigits: maxDigits,
    });

  const handleCopy = async () => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    const label = isLoss ? "Loss" : "Profit";
    const text = `Profit & Loss Calculator\nCost Price: ${currency}${costPrice || 0}\nSelling Price: ${currency}${
      sellingPrice || 0
    }\n${expenses ? `Other Expenses: ${currency}${expenses}\n` : ""}${label}: ${currency}${formatNumber(
      result.amount
    )}\n${label} Percentage: ${formatNumber(
      result.margin
    )}%\n\nCalculate Online: https://topcalcbox.com/profit-and-loss-calculator/`;
    await Clipboard.setStringAsync(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleReset = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    setCostPrice("");
    setSellingPrice("");
    setExpenses("");
  };

  return (
    <SafeAreaView style={sharedStyles.safeArea} edges={["top", "bottom"]}>
      <StatusBar style="dark" />
      <CalculatorHeader
        title="Profit & Loss Calculator"
        subtitle="Calculate your profit or loss, total cost, and profit on cost from your selling price."
        iconName="TrendingUp"
        color="emerald"
      />

      <ScrollView
        contentContainerStyle={sharedStyles.scrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <OuterToolCard>
          <CurrencyToggle currency={currency} onChange={setCurrency} theme="emerald" />

          <FormPanel theme="emerald">
            <Text style={sharedStyles.fieldLabel}>Cost Price (CP)</Text>
            <View style={sharedStyles.inputBox}>
              <Text style={[sharedStyles.affix, { marginRight: 6 }]}>{currency}</Text>
              <TextInput
                style={sharedStyles.textInput}
                keyboardType="numeric"
                value={costPrice}
                onChangeText={setCostPrice}
                placeholder="500"
                placeholderTextColor="#94A3B8"
              />
            </View>

            <Text style={[sharedStyles.fieldLabel, { marginTop: 14 }]}>Selling Price (SP)</Text>
            <View style={sharedStyles.inputBox}>
              <Text style={[sharedStyles.affix, { marginRight: 6 }]}>{currency}</Text>
              <TextInput
                style={sharedStyles.textInput}
                keyboardType="numeric"
                value={sellingPrice}
                onChangeText={setSellingPrice}
                placeholder="600"
                placeholderTextColor="#94A3B8"
              />
            </View>

            <Text style={[sharedStyles.fieldLabel, { marginTop: 14 }]}>
              Other Costs / Expenses <Text style={styles.opt}>(Optional)</Text>
            </Text>
            <View style={sharedStyles.inputBox}>
              <Text style={[sharedStyles.affix, { marginRight: 6 }]}>{currency}</Text>
              <TextInput
                style={sharedStyles.textInput}
                keyboardType="numeric"
                value={expenses}
                onChangeText={setExpenses}
                placeholder="e.g. 50"
                placeholderTextColor="#94A3B8"
              />
            </View>
          </FormPanel>

          <ResultPanel theme={resultTheme}>
            <View style={sharedStyles.resultHeaderRow}>
              <View style={styles.kickerRow}>
                {isLoss ? <TrendingDown size={16} color="#E11D48" /> : <TrendingUp size={16} color="#059669" />}
                <Text style={[sharedStyles.resultKicker, { color: activeColor }]}>
                  {isLoss ? "Loss Result" : "Profit Result"}
                </Text>
              </View>
              <CopyResetActions copied={copied} onCopy={handleCopy} onReset={handleReset} theme={resultTheme} />
            </View>

            <View style={styles.heroRow}>
              <Text style={[styles.heroCurr, { color: activeColor }]}>{currency}</Text>
              <Text style={[sharedStyles.heroValue, { color: activeColor }]}>{formatNumber(result.amount)}</Text>
            </View>

            <View style={[sharedStyles.grid2, { marginTop: 12 }]}>
              <StatTile
                label="Total Cost"
                value={`${currency}${formatNumber(result.totalCost)}`}
                borderColor={isLoss ? "#FDA4AF" : "#6EE7B7"}
              />
              <StatTile
                label={isLoss ? "Loss %" : "Profit on Cost"}
                value={`${formatNumber(result.margin)}%`}
                valueColor={activeColor}
                borderColor={isLoss ? "#FDA4AF" : "#6EE7B7"}
              />
            </View>
          </ResultPanel>
        </OuterToolCard>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  opt: { fontWeight: "600", color: "#64748B" },
  kickerRow: { flexDirection: "row", alignItems: "center", gap: 6, flex: 1 },
  heroRow: { flexDirection: "row", alignItems: "baseline", marginTop: 4 },
  heroCurr: { fontSize: 24, fontWeight: "800", marginRight: 2 },
});
