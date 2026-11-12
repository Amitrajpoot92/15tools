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
import { ShoppingCart } from "lucide-react-native";

export default function CostPerItemCalculatorScreen() {
  const [currency, setCurrency] = useState<"₹" | "$">("₹");
  const [totalCost, setTotalCost] = useState("");
  const [quantity, setQuantity] = useState("");
  const [copied, setCopied] = useState(false);

  const cost = parseFloat(totalCost) || 0;
  const qty = parseFloat(quantity) || 0;
  const costPerItem = cost > 0 && qty > 0 ? cost / qty : 0;
  const cost10 = costPerItem * 10;
  const cost100 = costPerItem * 100;

  const formatCurrency = (amount: number) =>
    currency +
    amount.toLocaleString(currency === "₹" ? "en-IN" : "en-US", {
      minimumFractionDigits: amount % 1 !== 0 ? 2 : 0,
      maximumFractionDigits: 2,
    });

  const handleCopy = async () => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    const text = `Cost Per Item Calculator\nTotal Price: ${currency}${totalCost || 0}\nTotal Quantity: ${
      quantity || 0
    }\nCost per Item: ${formatCurrency(costPerItem)}\nCost per 10 Items: ${formatCurrency(
      cost10
    )}\nCost per 100 Items: ${formatCurrency(
      cost100
    )}\n\nCalculate Online: https://topcalcbox.com/cost-per-item-calculator/`;
    await Clipboard.setStringAsync(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleReset = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    setTotalCost("");
    setQuantity("");
  };

  return (
    <SafeAreaView style={sharedStyles.safeArea} edges={["top", "bottom"]}>
      <StatusBar style="dark" />
      <CalculatorHeader
        title="Cost Per Item Calculator"
        subtitle="Calculate the true price of a single unit when buying in bulk or packs."
        iconName="ShoppingCart"
        color="rose"
      />

      <ScrollView
        contentContainerStyle={sharedStyles.scrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <OuterToolCard>
          <CurrencyToggle currency={currency} onChange={setCurrency} theme="rose" />

          <FormPanel theme="rose">
            <Text style={sharedStyles.fieldLabel}>Total Price / Pack Cost</Text>
            <View style={sharedStyles.inputBox}>
              <Text style={[sharedStyles.affix, { marginRight: 6 }]}>{currency}</Text>
              <TextInput
                style={sharedStyles.textInput}
                keyboardType="numeric"
                value={totalCost}
                onChangeText={setTotalCost}
                placeholder="e.g. 500"
                placeholderTextColor="#94A3B8"
              />
            </View>

            <Text style={[sharedStyles.fieldLabel, { marginTop: 14 }]}>Number of Items (Quantity)</Text>
            <View style={sharedStyles.inputBox}>
              <TextInput
                style={sharedStyles.textInput}
                keyboardType="numeric"
                value={quantity}
                onChangeText={setQuantity}
                placeholder="e.g. 10"
                placeholderTextColor="#94A3B8"
              />
              <Text style={sharedStyles.affix}>Units</Text>
            </View>
          </FormPanel>

          <ResultPanel theme="rose">
            <View style={sharedStyles.resultHeaderRow}>
              <View style={styles.kickerRow}>
                <ShoppingCart size={15} color="#E11D48" />
                <Text style={sharedStyles.resultKicker}>Cost Per Single Item</Text>
              </View>
              <CopyResetActions copied={copied} onCopy={handleCopy} onReset={handleReset} theme="rose" />
            </View>

            <Text style={[sharedStyles.heroValue, { color: "#881337" }]}>
              {formatCurrency(costPerItem)}
            </Text>

            <View style={[sharedStyles.grid2, { marginTop: 12 }]}>
              <StatTile label="For 10 Items" value={formatCurrency(cost10)} borderColor="#FDA4AF" />
              <StatTile label="For 100 Items" value={formatCurrency(cost100)} borderColor="#FDA4AF" />
            </View>
          </ResultPanel>
        </OuterToolCard>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  kickerRow: { flexDirection: "row", alignItems: "center", gap: 6, flex: 1 },
});
