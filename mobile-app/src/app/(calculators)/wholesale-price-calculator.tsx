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

export default function WholesaleCalculatorScreen() {
  const [cost, setCost] = useState("");
  const [profitPercent, setProfitPercent] = useState("");
  const [quantity, setQuantity] = useState("");
  const [currency, setCurrency] = useState<"₹" | "$">("₹");
  const [copied, setCopied] = useState(false);

  const calculate = () => {
    const c = parseFloat(cost) || 0;
    const p = parseFloat(profitPercent) || 0;
    const q = parseFloat(quantity) || 1;

    if (c > 0 && q > 0) {
      const totalProfit = c * (p / 100);
      const totalRevenue = c + totalProfit;
      const wholesalePricePerUnit = totalRevenue / q;
      const profitPerUnit = totalProfit / q;
      return { wholesalePricePerUnit, profitPerUnit, totalProfit, totalRevenue };
    }
    return { wholesalePricePerUnit: 0, profitPerUnit: 0, totalProfit: 0, totalRevenue: 0 };
  };

  const result = calculate();

  const formatNumber = (num: number, maxDigits = 2) =>
    num.toLocaleString(currency === "₹" ? "en-IN" : "en-US", {
      maximumFractionDigits: maxDigits,
    });

  const handleCopy = async () => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    const text = `Wholesale Price Calculator\nTotal Cost Price: ${currency}${cost || 0}\nProfit Target: ${
      profitPercent || 0
    }%\nQuantity: ${quantity || 0} Units\nWholesale Price Per Unit: ${currency}${formatNumber(
      result.wholesalePricePerUnit
    )}\nTotal Profit: ${currency}${formatNumber(result.totalProfit)}\nTotal Revenue: ${currency}${formatNumber(
      result.totalRevenue
    )}\n\nCalculate Online: https://topcalcbox.com/wholesale-price-calculator/`;
    await Clipboard.setStringAsync(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleReset = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    setCost("");
    setProfitPercent("");
    setQuantity("");
  };

  return (
    <SafeAreaView style={sharedStyles.safeArea} edges={["top", "bottom"]}>
      <StatusBar style="dark" />
      <CalculatorHeader
        title="Wholesale Price Calculator"
        subtitle="Calculate your wholesale price and target profit quickly."
        iconName="PieChart"
        color="amber"
      />

      <ScrollView
        contentContainerStyle={sharedStyles.scrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <OuterToolCard>
          <CurrencyToggle currency={currency} onChange={setCurrency} theme="amber" />

          <FormPanel theme="amber">
            <Text style={sharedStyles.fieldLabel}>Total Cost Price</Text>
            <View style={sharedStyles.inputBox}>
              <Text style={[sharedStyles.affix, { marginRight: 6 }]}>{currency}</Text>
              <TextInput
                style={sharedStyles.textInput}
                keyboardType="numeric"
                value={cost}
                onChangeText={setCost}
                placeholder="1000"
                placeholderTextColor="#94A3B8"
              />
            </View>

            <Text style={[sharedStyles.fieldLabel, { marginTop: 14 }]}>Target Profit (%)</Text>
            <View style={sharedStyles.inputBox}>
              <TextInput
                style={sharedStyles.textInput}
                keyboardType="numeric"
                value={profitPercent}
                onChangeText={setProfitPercent}
                placeholder="10"
                placeholderTextColor="#94A3B8"
              />
              <Text style={sharedStyles.affix}>%</Text>
            </View>

            <Text style={[sharedStyles.fieldLabel, { marginTop: 14 }]}>Quantity (Units)</Text>
            <View style={sharedStyles.inputBox}>
              <TextInput
                style={sharedStyles.textInput}
                keyboardType="numeric"
                value={quantity}
                onChangeText={setQuantity}
                placeholder="10"
                placeholderTextColor="#94A3B8"
              />
              <Text style={sharedStyles.affix}>Units</Text>
            </View>
          </FormPanel>

          <ResultPanel theme="amber">
            <View style={sharedStyles.resultHeaderRow}>
              <Text style={sharedStyles.resultKicker}>Wholesale Details</Text>
              <CopyResetActions copied={copied} onCopy={handleCopy} onReset={handleReset} theme="amber" />
            </View>

            <View style={styles.heroCard}>
              <Text style={styles.heroLabel}>Wholesale Price Per Unit</Text>
              <Text style={styles.heroValue}>
                {currency}
                {formatNumber(result.wholesalePricePerUnit)}
              </Text>
            </View>

            <View style={[sharedStyles.grid2, { marginTop: 10 }]}>
              <StatTile
                label="Profit / Unit"
                value={`${currency}${formatNumber(result.profitPerUnit)}`}
                borderColor="#FCD34D"
              />
              <StatTile
                label="Total Profit"
                value={`${currency}${formatNumber(result.totalProfit)}`}
                valueColor="#B45309"
                borderColor="#FCD34D"
              />
            </View>

            <View style={{ marginTop: 8 }}>
              <StatTile
                label="Total Revenue"
                value={`${currency}${formatNumber(result.totalRevenue)}`}
                valueColor="#0F172A"
                borderColor="#FCD34D"
              />
            </View>
          </ResultPanel>
        </OuterToolCard>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  heroCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    borderWidth: 1.5,
    borderColor: "#FCD34D",
    paddingVertical: 14,
    paddingHorizontal: 14,
    alignItems: "center",
  },
  heroLabel: {
    fontSize: 11,
    fontWeight: "800",
    color: "#92400E",
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  heroValue: {
    fontSize: 34,
    fontWeight: "900",
    color: "#0F172A",
    marginTop: 2,
  },
});
