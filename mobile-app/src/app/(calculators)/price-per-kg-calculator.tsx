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
  SegmentedTabs,
  CurrencyToggle,
  CopyResetActions,
  THEMES,
  sharedStyles,
} from "@/components/CalculatorUI";
import { Scale } from "lucide-react-native";

export default function PricePerKgCalculatorScreen() {
  const [mode, setMode] = useState<"quantity" | "price">("quantity");
  const [currency, setCurrency] = useState<"₹" | "$">("₹");
  const [pricePerKg, setPricePerKg] = useState("80");
  const [amount, setAmount] = useState("20");
  const [kg, setKg] = useState("");
  const [grams, setGrams] = useState("250");
  const [copied, setCopied] = useState(false);

  const formatGrams = (val: number) => {
    if (isNaN(val) || !isFinite(val)) return "0";
    return val.toLocaleString("en-US", {
      minimumFractionDigits: val % 1 !== 0 ? 2 : 0,
      maximumFractionDigits: 2,
    });
  };

  const formatCurrency = (val: number) => {
    if (isNaN(val) || !isFinite(val)) return `${currency}0`;
    return (
      currency +
      val.toLocaleString(currency === "₹" ? "en-IN" : "en-US", {
        minimumFractionDigits: val % 1 !== 0 ? 2 : 0,
        maximumFractionDigits: 2,
      })
    );
  };

  const calculate = () => {
    const pkg = parseFloat(pricePerKg);
    if (isNaN(pkg) || pkg <= 0) return { qty: 0, price: 0, formattedQty: "0 Grams" };

    if (mode === "quantity") {
      const amt = parseFloat(amount);
      if (isNaN(amt) || amt < 0) return { qty: 0, price: 0, formattedQty: "0 Grams" };
      const totalG = (amt / pkg) * 1000;
      return { qty: totalG, price: amt, formattedQty: `${formatGrams(totalG)} Grams` };
    } else {
      const k = parseFloat(kg) || 0;
      const g = parseFloat(grams) || 0;
      const totalG = k * 1000 + g;
      if (totalG <= 0) return { qty: 0, price: 0, formattedQty: "0 Grams" };
      const calcPrice = (totalG / 1000) * pkg;
      const formatted =
        k > 0 && g > 0 ? `${k} kg ${g} g` : k > 0 ? `${k} kg` : `${formatGrams(g)} Grams`;
      return { qty: totalG, price: calcPrice, formattedQty: formatted };
    }
  };

  const { qty, price, formattedQty } = calculate();

  const handleCopy = async () => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    const text =
      mode === "quantity"
        ? `Price Per Kg Calculator\nPrice Per Kg: ${currency}${pricePerKg || 0}\nYour Amount: ${currency}${
            amount || 0
          }\nCalculated Quantity: ${formatGrams(
            qty
          )} Grams\n\nCalculate Online: https://topcalcbox.com/price-per-kg-calculator/`
        : `Price Per Kg Calculator\nPrice Per Kg: ${currency}${
            pricePerKg || 0
          }\nQuantity: ${formattedQty}\nCalculated Price: ${formatCurrency(
            price
          )}\n\nCalculate Online: https://topcalcbox.com/price-per-kg-calculator/`;
    await Clipboard.setStringAsync(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleReset = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    setPricePerKg("");
    setAmount("");
    setKg("");
    setGrams("");
  };

  return (
    <SafeAreaView style={sharedStyles.safeArea} edges={["top", "bottom"]}>
      <StatusBar style="dark" />
      <CalculatorHeader
        title="Price Per Kg Calculator"
        subtitle="Calculate quantity in grams or total price from a price per kilogram."
        iconName="Scale"
        color="amber"
      />

      <ScrollView
        contentContainerStyle={sharedStyles.scrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <OuterToolCard>
          <CurrencyToggle currency={currency} onChange={setCurrency} theme="amber" />

          <SegmentedTabs
            value={mode}
            onChange={setMode}
            accentColor={THEMES.amber.accentDark}
            options={[
              { key: "quantity", label: "Find Quantity" },
              { key: "price", label: "Find Price" },
            ]}
          />

          <FormPanel theme="amber">
            <Text style={sharedStyles.fieldLabel}>Price Per Kg ({currency})</Text>
            <View style={sharedStyles.inputBox}>
              <Text style={[sharedStyles.affix, { marginRight: 6 }]}>{currency}</Text>
              <TextInput
                style={sharedStyles.textInput}
                keyboardType="numeric"
                value={pricePerKg}
                onChangeText={setPricePerKg}
                placeholder="80"
                placeholderTextColor="#94A3B8"
              />
              <Text style={sharedStyles.affix}>/ kg</Text>
            </View>

            {mode === "quantity" ? (
              <View style={{ marginTop: 14 }}>
                <Text style={sharedStyles.fieldLabel}>Your Amount ({currency})</Text>
                <View style={sharedStyles.inputBox}>
                  <Text style={[sharedStyles.affix, { marginRight: 6 }]}>{currency}</Text>
                  <TextInput
                    style={sharedStyles.textInput}
                    keyboardType="numeric"
                    value={amount}
                    onChangeText={setAmount}
                    placeholder="20"
                    placeholderTextColor="#94A3B8"
                  />
                </View>
              </View>
            ) : (
              <View style={[sharedStyles.grid2, { marginTop: 14 }]}>
                <View style={{ flex: 1 }}>
                  <Text style={sharedStyles.fieldLabel}>Kilograms (kg)</Text>
                  <View style={sharedStyles.inputBox}>
                    <TextInput
                      style={sharedStyles.textInput}
                      keyboardType="numeric"
                      value={kg}
                      onChangeText={setKg}
                      placeholder="0"
                      placeholderTextColor="#94A3B8"
                    />
                    <Text style={sharedStyles.affix}>kg</Text>
                  </View>
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={sharedStyles.fieldLabel}>Grams (g)</Text>
                  <View style={sharedStyles.inputBox}>
                    <TextInput
                      style={sharedStyles.textInput}
                      keyboardType="numeric"
                      value={grams}
                      onChangeText={setGrams}
                      placeholder="250"
                      placeholderTextColor="#94A3B8"
                    />
                    <Text style={sharedStyles.affix}>g</Text>
                  </View>
                </View>
              </View>
            )}
          </FormPanel>

          <ResultPanel theme="amber">
            <View style={sharedStyles.resultHeaderRow}>
              <View style={styles.kickerRow}>
                <Scale size={15} color="#D97706" />
                <Text style={sharedStyles.resultKicker}>
                  {mode === "quantity" ? "Calculated Quantity" : "Calculated Price"}
                </Text>
              </View>
              <CopyResetActions copied={copied} onCopy={handleCopy} onReset={handleReset} theme="amber" />
            </View>

            <Text style={[sharedStyles.heroValue, { color: "#78350F" }]}>
              {mode === "quantity" ? formattedQty : formatCurrency(price)}
            </Text>

            <View style={styles.subSummary}>
              <Text style={styles.subText}>
                {mode === "quantity"
                  ? `${currency}${amount || 0} gives ${(qty / 1000).toFixed(3)} kg at ${currency}${
                      pricePerKg || 0
                    }/kg`
                  : `${formattedQty} at ${currency}${pricePerKg || 0}/kg`}
              </Text>
            </View>
          </ResultPanel>
        </OuterToolCard>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  kickerRow: { flexDirection: "row", alignItems: "center", gap: 6, flex: 1 },
  subSummary: {
    marginTop: 10,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#FCD34D",
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  subText: { fontSize: 12, fontWeight: "700", color: "#92400E" },
});
