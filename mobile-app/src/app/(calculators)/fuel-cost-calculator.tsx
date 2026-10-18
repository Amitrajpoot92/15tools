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
import { Copy, RotateCcw, Check, Fuel } from "lucide-react-native";

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

      return {
        needed: fuelNeeded,
        cost: totalCost,
        costPerUnit: costPerDistance,
      };
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

  const formatCurrency = (amount: number) => {
    return (
      currencySymbol +
      amount.toLocaleString(unitSystem === "metric" ? "en-IN" : "en-US", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })
    );
  };

  const handleCopy = async () => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    const text = `Fuel Cost Calculator\nTrip Distance: ${distance || 0} ${distanceLabel}\nFuel Efficiency: ${efficiency || 0} ${effLabel}\nFuel Price: ${currencySymbol}${price || 0} per ${priceLabel}\nTotal Fuel Cost: ${formatCurrency(cost)}\nFuel Required: ${needed.toFixed(2)} ${volUnit}\nCost Per ${distLabelSingle}: ${formatCurrency(costPerUnit)}\n\nCalculate Online: https://topcalcbox.com/fuel-cost-calculator/`;
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
    <SafeAreaView style={styles.container} edges={["top", "bottom"]}>
      <StatusBar style="dark" />
      <CalculatorHeader
        title="Fuel Cost Calculator"
        subtitle="Estimate the fuel cost for your upcoming road trip based on distance and mileage."
        iconName="Fuel"
        themeColor="#4F46E5"
        themeBg="#EEF2FF"
      />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {/* Unit System Tabs */}
        <View style={styles.tabContainer}>
          <Pressable
            style={[styles.tab, unitSystem === "metric" && styles.tabActive]}
            onPress={() => {
              Haptics.selectionAsync();
              setUnitSystem("metric");
            }}
          >
            <Text
              style={[
                styles.tabText,
                unitSystem === "metric" && styles.tabTextActive,
              ]}
            >
              Metric (KM / Liters)
            </Text>
          </Pressable>
          <Pressable
            style={[styles.tab, unitSystem === "us" && styles.tabActive]}
            onPress={() => {
              Haptics.selectionAsync();
              setUnitSystem("us");
            }}
          >
            <Text
              style={[
                styles.tabText,
                unitSystem === "us" && styles.tabTextActive,
              ]}
            >
              US (Miles / Gallons)
            </Text>
          </Pressable>
        </View>

        {/* Inputs Card */}
        <View style={styles.inputCard}>
          {/* Trip Distance */}
          <Text style={styles.inputLabel}>
            TRIP DISTANCE ({distanceLabel})
          </Text>
          <View style={styles.inputWrapper}>
            <TextInput
              style={styles.textInputWithSuffix}
              keyboardType="numeric"
              value={distance}
              onChangeText={setDistance}
              placeholder="240"
              placeholderTextColor="#94A3B8"
            />
            <Text style={styles.unitSuffix}>{distanceLabel}</Text>
          </View>

          {/* Efficiency */}
          <Text style={[styles.inputLabel, { marginTop: 16 }]}>
            EFFICIENCY / MILEAGE ({effLabel})
          </Text>
          <View style={styles.inputWrapper}>
            <TextInput
              style={styles.textInputWithSuffix}
              keyboardType="numeric"
              value={efficiency}
              onChangeText={setEfficiency}
              placeholder="60"
              placeholderTextColor="#94A3B8"
            />
            <Text style={styles.unitSuffix}>{effLabel}</Text>
          </View>

          {/* Fuel Price */}
          <Text style={[styles.inputLabel, { marginTop: 16 }]}>
            PRICE PER {priceLabel.toUpperCase()} ({currencySymbol})
          </Text>
          <View style={styles.inputWrapper}>
            <Text style={styles.currencyPrefix}>{currencySymbol}</Text>
            <TextInput
              style={styles.textInputWithPrefix}
              keyboardType="numeric"
              value={price}
              onChangeText={setPrice}
              placeholder="100"
              placeholderTextColor="#94A3B8"
            />
          </View>
        </View>

        {/* Result Card */}
        <View style={styles.resultCard}>
          <View style={styles.resultHeader}>
            <View style={styles.resultHeaderLeft}>
              <View style={styles.resultDot} />
              <Text style={styles.resultTitle}>TOTAL FUEL COST</Text>
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
                  <Copy size={14} color="#4F46E5" />
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
                <RotateCcw size={14} color="#4F46E5" />
              </Pressable>
            </View>
          </View>

          {/* Main Hero Result */}
          <View style={styles.heroBox}>
            <Text style={styles.heroSubTitle}>ESTIMATED TRIP COST</Text>
            <Text style={styles.heroValue}>
              {formatCurrency(cost)}
            </Text>
            <View style={styles.badgePill}>
              <Text style={styles.badgePillText}>
                {distance && efficiency && price
                  ? `For ${distance} ${distanceLabel} @ ${efficiency} ${effLabel}`
                  : "Enter trip details to calculate"}
              </Text>
            </View>
          </View>

          {/* Sub detail cards */}
          <View style={styles.gridRow}>
            <View style={styles.gridCard}>
              <Text style={styles.gridCardValue}>
                {needed.toFixed(2)} {volUnit}
              </Text>
              <Text style={styles.gridCardLabel}>FUEL REQUIRED</Text>
            </View>
            <View style={styles.gridCard}>
              <Text style={styles.gridCardValue}>
                {formatCurrency(costPerUnit)}
              </Text>
              <Text style={styles.gridCardLabel}>
                COST PER {distLabelSingle.toUpperCase()}
              </Text>
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
  tabContainer: {
    flexDirection: "row",
    backgroundColor: "#F1F5F9",
    borderRadius: 14,
    padding: 4,
    marginBottom: 16,
  },
  tab: {
    flex: 1,
    paddingVertical: 10,
    alignItems: "center",
    borderRadius: 10,
  },
  tabActive: {
    backgroundColor: "#FFFFFF",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 3,
    elevation: 2,
  },
  tabText: {
    fontSize: 12,
    fontWeight: "700",
    color: "#64748B",
  },
  tabTextActive: {
    color: "#4338CA",
  },
  inputCard: {
    backgroundColor: "#EEF2FF",
    borderRadius: 20,
    padding: 16,
    borderWidth: 1,
    borderColor: "#E0E7FF",
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 11,
    fontWeight: "800",
    color: "#3730A3",
    letterSpacing: 0.6,
    marginBottom: 8,
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#C7D2FE",
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
    fontSize: 14,
    fontWeight: "800",
    color: "#94A3B8",
  },
  resultCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 24,
    padding: 18,
    borderWidth: 1,
    borderColor: "#C7D2FE",
    shadowColor: "#4F46E5",
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
    backgroundColor: "#4F46E5",
  },
  resultTitle: {
    fontSize: 11,
    fontWeight: "800",
    color: "#3730A3",
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
    backgroundColor: "#EEF2FF",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#C7D2FE",
  },
  actionBtnText: {
    fontSize: 11,
    fontWeight: "700",
    color: "#4F46E5",
  },
  actionBtnIcon: {
    backgroundColor: "#EEF2FF",
    padding: 6,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#C7D2FE",
  },
  heroBox: {
    backgroundColor: "#EEF2FF",
    borderRadius: 18,
    paddingVertical: 20,
    paddingHorizontal: 16,
    alignItems: "center",
    marginBottom: 14,
    borderWidth: 1,
    borderColor: "#C7D2FE",
  },
  heroSubTitle: {
    fontSize: 10,
    fontWeight: "800",
    color: "#3730A3",
    letterSpacing: 1.2,
    marginBottom: 4,
  },
  heroValue: {
    fontSize: 36,
    fontWeight: "900",
    color: "#1E1B4B",
    letterSpacing: -0.5,
  },
  badgePill: {
    backgroundColor: "#E0E7FF",
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 20,
    marginTop: 8,
  },
  badgePillText: {
    fontSize: 11,
    fontWeight: "700",
    color: "#3730A3",
  },
  gridRow: {
    flexDirection: "row",
    gap: 10,
  },
  gridCard: {
    flex: 1,
    backgroundColor: "#F8FAFC",
    borderRadius: 14,
    paddingVertical: 12,
    paddingHorizontal: 10,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#F1F5F9",
  },
  gridCardValue: {
    fontSize: 16,
    fontWeight: "800",
    color: "#0F172A",
    marginBottom: 2,
    textAlign: "center",
  },
  gridCardLabel: {
    fontSize: 9,
    fontWeight: "700",
    color: "#64748B",
    letterSpacing: 0.6,
    textAlign: "center",
  },
});
