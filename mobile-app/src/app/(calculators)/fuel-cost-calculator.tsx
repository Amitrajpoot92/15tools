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
  CopyResetActions,
  StatTile,
  THEMES,
  sharedStyles,
} from "@/components/CalculatorUI";
import { Fuel } from "lucide-react-native";

export default function FuelCostCalculatorScreen() {
  const [unitSystem, setUnitSystem] = useState<"metric" | "us">("metric");
  const [distance, setDistance] = useState("");
  const [efficiency, setEfficiency] = useState("");
  const [price, setPrice] = useState("");
  const [copied, setCopied] = useState(false);

  const calculate = () => {
    const d = parseFloat(distance);
    const e = parseFloat(efficiency);
    const p = parseFloat(price);
    if (!isNaN(d) && !isNaN(e) && !isNaN(p) && e > 0) {
      const fuelNeeded = d / e;
      const totalCost = fuelNeeded * p;
      const costPerDistance = d > 0 ? totalCost / d : 0;
      return { needed: fuelNeeded, cost: totalCost, costPerUnit: costPerDistance };
    }
    return { needed: 0, cost: 0, costPerUnit: 0 };
  };

  const { needed, cost, costPerUnit } = calculate();
  const currencySymbol = unitSystem === "metric" ? "₹" : "$";
  const distanceLabel = unitSystem === "metric" ? "KM" : "Miles";
  const effLabel = unitSystem === "metric" ? "KM/L" : "MPG";
  const priceLabel = unitSystem === "metric" ? "Litre" : "Gallon";
  const volUnit = unitSystem === "metric" ? "L" : "gal";
  const distLabelSingle = unitSystem === "metric" ? "KM" : "Mile";

  const formatCurrency = (amount: number) =>
    currencySymbol +
    amount.toLocaleString(unitSystem === "metric" ? "en-IN" : "en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

  const handleCopy = async () => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    const text = `Fuel Cost Calculator\nTrip Distance: ${distance || 0} ${distanceLabel}\nFuel Efficiency: ${
      efficiency || 0
    } ${effLabel}\nFuel Price: ${currencySymbol}${price || 0} per ${priceLabel}\nTotal Fuel Cost: ${formatCurrency(
      cost
    )}\nFuel Required: ${needed.toFixed(2)} ${volUnit}\nCost Per ${distLabelSingle}: ${formatCurrency(
      costPerUnit
    )}\n\nCalculate Online: https://topcalcbox.com/fuel-cost-calculator/`;
    await Clipboard.setStringAsync(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleReset = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    setDistance("");
    setEfficiency("");
    setPrice("");
  };

  return (
    <SafeAreaView style={sharedStyles.safeArea} edges={["top", "bottom"]}>
      <StatusBar style="dark" />
      <CalculatorHeader
        title="Fuel Cost Calculator"
        subtitle="Calculate your trip fuel cost quickly and easily."
        iconName="Fuel"
        color="indigo"
      />

      <ScrollView
        contentContainerStyle={sharedStyles.scrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <OuterToolCard>
          <SegmentedTabs
            value={unitSystem}
            onChange={setUnitSystem}
            accentColor={THEMES.indigo.accentDark}
            options={[
              { key: "metric", label: "Metric (KM / ₹ / L)" },
              { key: "us", label: "US (Miles / $ / Gal)" },
            ]}
          />

          <FormPanel theme="indigo">
            <Text style={sharedStyles.fieldLabel}>Trip Distance ({distanceLabel})</Text>
            <View style={sharedStyles.inputBox}>
              <TextInput
                style={sharedStyles.textInput}
                keyboardType="numeric"
                value={distance}
                onChangeText={setDistance}
                placeholder="e.g. 250"
                placeholderTextColor="#94A3B8"
              />
              <Text style={sharedStyles.affix}>{distanceLabel}</Text>
            </View>

            <Text style={[sharedStyles.fieldLabel, { marginTop: 14 }]}>Fuel Efficiency ({effLabel})</Text>
            <View style={sharedStyles.inputBox}>
              <TextInput
                style={sharedStyles.textInput}
                keyboardType="numeric"
                value={efficiency}
                onChangeText={setEfficiency}
                placeholder={unitSystem === "metric" ? "e.g. 18" : "e.g. 28"}
                placeholderTextColor="#94A3B8"
              />
              <Text style={sharedStyles.affix}>{effLabel}</Text>
            </View>

            <Text style={[sharedStyles.fieldLabel, { marginTop: 14 }]}>
              Fuel Price ({currencySymbol} / {priceLabel})
            </Text>
            <View style={sharedStyles.inputBox}>
              <Text style={[sharedStyles.affix, { marginRight: 6 }]}>{currencySymbol}</Text>
              <TextInput
                style={sharedStyles.textInput}
                keyboardType="numeric"
                value={price}
                onChangeText={setPrice}
                placeholder={unitSystem === "metric" ? "e.g. 102" : "e.g. 3.50"}
                placeholderTextColor="#94A3B8"
              />
              <Text style={sharedStyles.affix}>/ {priceLabel}</Text>
            </View>
          </FormPanel>

          <ResultPanel theme="indigo">
            <View style={sharedStyles.resultHeaderRow}>
              <View style={styles.kickerRow}>
                <Fuel size={15} color="#4F46E5" />
                <Text style={sharedStyles.resultKicker}>Total Trip Fuel Cost</Text>
              </View>
              <CopyResetActions copied={copied} onCopy={handleCopy} onReset={handleReset} theme="indigo" />
            </View>

            <Text style={[sharedStyles.heroValue, { color: "#1E1B4B" }]}>{formatCurrency(cost)}</Text>

            <View style={[sharedStyles.grid2, { marginTop: 12 }]}>
              <StatTile
                label="Fuel Required"
                value={`${needed.toFixed(2)} ${volUnit}`}
                borderColor="#C7D2FE"
              />
              <StatTile
                label={`Cost / ${distLabelSingle}`}
                value={formatCurrency(costPerUnit)}
                valueColor="#4338CA"
                borderColor="#C7D2FE"
              />
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
