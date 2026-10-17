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
import { useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import * as Haptics from "expo-haptics";
import * as Clipboard from "expo-clipboard";
import { MOBILE_TOOLS } from "@/constants/tools";
import { CalculatorHeader } from "@/components/CalculatorHeader";
import {
  calculateDiscount,
  calculateProfitLoss,
  calculateWholesale,
} from "@/lib/calculations/finance";
import { calculateCostPerItem, calculateFuelCost, calculateTip } from "@/lib/calculations/shopping";
import { calculateMarks } from "@/lib/calculations/math";
import { Copy, RotateCcw, Check } from "lucide-react-native";

export default function GenericCalculatorScreen() {
  const { slug } = useLocalSearchParams<{ slug: string }>();
  const tool = MOBILE_TOOLS.find((t) => t.slug === slug) || MOBILE_TOOLS[0];

  const [input1, setInput1] = useState("1000");
  const [input2, setInput2] = useState("20");
  const [input3, setInput3] = useState("1");
  const [copied, setCopied] = useState(false);

  const n1 = parseFloat(input1) || 0;
  const n2 = parseFloat(input2) || 0;
  const n3 = parseFloat(input3) || 1;

  // Compute result based on tool slug
  let resultTitle = "Result";
  let primaryValue = "";
  let breakdownRows: Array<{ label: string; value: string }> = [];

  if (slug === "discount-calculator") {
    const res = calculateDiscount(n1, n2);
    resultTitle = "Discounted Price";
    primaryValue = "₹" + res.finalPrice.toLocaleString("en-IN");
    breakdownRows = [
      { label: "Original Price:", value: "₹" + n1.toLocaleString("en-IN") },
      { label: `You Save (${n2}%):`, value: "₹" + res.savings.toLocaleString("en-IN") },
      { label: "Final Payable Amount:", value: "₹" + res.finalPrice.toLocaleString("en-IN") },
    ];
  } else if (slug === "profit-and-loss-calculator") {
    const res = calculateProfitLoss(n1, n2);
    resultTitle = res.isProfit ? "Total Profit" : "Total Loss";
    primaryValue = "₹" + res.difference.toLocaleString("en-IN");
    breakdownRows = [
      { label: "Cost Price (CP):", value: "₹" + n1.toLocaleString("en-IN") },
      { label: "Selling Price (SP):", value: "₹" + n2.toLocaleString("en-IN") },
      { label: "Margin Percentage:", value: `${res.percentage}%` },
    ];
  } else if (slug === "wholesale-price-calculator") {
    const res = calculateWholesale(n1, n2, n3);
    resultTitle = "Suggested Selling Price";
    primaryValue = "₹" + res.sellingPrice.toLocaleString("en-IN");
    breakdownRows = [
      { label: "Cost Per Unit:", value: "₹" + n1.toLocaleString("en-IN") },
      { label: `Profit Margin (${n2}%):`, value: "₹" + res.profitPerUnit.toLocaleString("en-IN") },
      { label: `Total Profit (${n3} Units):`, value: "₹" + res.totalProfit.toLocaleString("en-IN") },
    ];
  } else if (slug === "marks-percentage-calculator") {
    const res = calculateMarks(n1, n2);
    resultTitle = "Your Percentage";
    primaryValue = `${res.percentage}%`;
    breakdownRows = [
      { label: "Marks Obtained:", value: `${n1}` },
      { label: "Maximum Total Marks:", value: `${n2}` },
      { label: "Grade / Division:", value: res.grade },
    ];
  } else if (slug === "cost-per-item-calculator") {
    const cost = calculateCostPerItem(n1, n2);
    resultTitle = "Cost Per Single Unit";
    primaryValue = "₹" + cost.toLocaleString("en-IN");
    breakdownRows = [
      { label: "Total Pack Price:", value: "₹" + n1.toLocaleString("en-IN") },
      { label: "Items in Pack:", value: `${n2}` },
      { label: "Price per Item:", value: "₹" + cost.toLocaleString("en-IN") },
    ];
  } else if (slug === "tip-calculator") {
    const res = calculateTip(n1, n2, n3);
    resultTitle = "Total Bill with Tip";
    primaryValue = "₹" + res.totalBill.toLocaleString("en-IN");
    breakdownRows = [
      { label: `Tip Amount (${n2}%):`, value: "₹" + res.tipAmount.toLocaleString("en-IN") },
      { label: `Per Person Total (${n3} people):`, value: "₹" + res.perPersonTotal.toLocaleString("en-IN") },
      { label: "Per Person Tip:", value: "₹" + res.perPersonTip.toLocaleString("en-IN") },
    ];
  } else if (slug === "fuel-cost-calculator") {
    const res = calculateFuelCost(n1, n2, n3);
    resultTitle = "Estimated Fuel Cost";
    primaryValue = "₹" + res.totalCost.toLocaleString("en-IN");
    breakdownRows = [
      { label: "Trip Distance:", value: `${n1} km` },
      { label: "Fuel Needed:", value: `${res.fuelNeededLiters} Liters` },
      { label: "Cost Per Km:", value: `₹${res.costPerKm.toFixed(2)}` },
    ];
  } else {
    // Default fallback
    primaryValue = (n1 + n2).toString();
    breakdownRows = [
      { label: "Input 1:", value: `${n1}` },
      { label: "Input 2:", value: `${n2}` },
    ];
  }

  const handleCopy = async () => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    const summary = `${tool.name} Result:\n${resultTitle}: ${primaryValue}`;
    await Clipboard.setStringAsync(summary);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleReset = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    setInput1("1000");
    setInput2("20");
    setInput3("1");
  };

  return (
    <SafeAreaView style={styles.container} edges={["top", "bottom"]}>
      <StatusBar style="dark" />
      <CalculatorHeader
        title={tool.name}
        subtitle={tool.description}
        iconName={tool.iconName}
        themeColor={tool.color}
        themeBg={tool.bgColor}
      />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.card}>
          <Text style={styles.inputLabel}>
            {slug === "discount-calculator"
              ? "ORIGINAL PRICE (₹)"
              : slug === "profit-and-loss-calculator"
              ? "COST PRICE (₹)"
              : slug === "wholesale-price-calculator"
              ? "COST PRICE PER UNIT (₹)"
              : slug === "marks-percentage-calculator"
              ? "MARKS OBTAINED"
              : slug === "fuel-cost-calculator"
              ? "DISTANCE (KM)"
              : "ENTER VALUE 1"}
          </Text>
          <View style={styles.inputWrapper}>
            <TextInput
              style={styles.textInput}
              keyboardType="decimal-pad"
              value={input1}
              onChangeText={setInput1}
              placeholder="0"
              placeholderTextColor="#94A3B8"
            />
          </View>

          <Text style={[styles.inputLabel, { marginTop: 14 }]}>
            {slug === "discount-calculator"
              ? "DISCOUNT PERCENTAGE (%)"
              : slug === "profit-and-loss-calculator"
              ? "SELLING PRICE (₹)"
              : slug === "wholesale-price-calculator"
              ? "PROFIT MARGIN (%)"
              : slug === "marks-percentage-calculator"
              ? "TOTAL MAXIMUM MARKS"
              : slug === "fuel-cost-calculator"
              ? "MILEAGE (KM/LITER)"
              : "ENTER VALUE 2"}
          </Text>
          <View style={styles.inputWrapper}>
            <TextInput
              style={styles.textInput}
              keyboardType="decimal-pad"
              value={input2}
              onChangeText={setInput2}
              placeholder="0"
              placeholderTextColor="#94A3B8"
            />
          </View>

          {(slug === "wholesale-price-calculator" ||
            slug === "tip-calculator" ||
            slug === "fuel-cost-calculator") && (
            <>
              <Text style={[styles.inputLabel, { marginTop: 14 }]}>
                {slug === "wholesale-price-calculator"
                  ? "NUMBER OF UNITS"
                  : slug === "tip-calculator"
                  ? "SPLIT BILL (PERSONS)"
                  : "FUEL PRICE (₹/LITER)"}
              </Text>
              <View style={styles.inputWrapper}>
                <TextInput
                  style={styles.textInput}
                  keyboardType="decimal-pad"
                  value={input3}
                  onChangeText={setInput3}
                  placeholder="1"
                  placeholderTextColor="#94A3B8"
                />
              </View>
            </>
          )}
        </View>

        <View style={styles.resultCard}>
          <View style={styles.resultHeader}>
            <Text style={styles.resultTitle}>{resultTitle}</Text>
            <View style={styles.actionButtons}>
              <Pressable onPress={handleCopy} style={styles.iconBtn}>
                {copied ? <Check size={16} color="#16A34A" /> : <Copy size={16} color="#64748B" />}
              </Pressable>
              <Pressable onPress={handleReset} style={styles.iconBtn}>
                <RotateCcw size={16} color="#64748B" />
              </Pressable>
            </View>
          </View>

          <View style={[styles.totalBlock, { backgroundColor: tool.bgColor }]}>
            <Text style={[styles.totalLabel, { color: tool.color }]}>{resultTitle.toUpperCase()}</Text>
            <Text style={[styles.totalValue, { color: tool.color }]}>{primaryValue}</Text>
          </View>

          {breakdownRows.map((row, idx) => (
            <View
              key={idx}
              style={[
                styles.breakdownRow,
                idx === breakdownRows.length - 1 && { borderBottomWidth: 0 },
              ]}
            >
              <Text style={styles.breakdownLabel}>{row.label}</Text>
              <Text style={styles.breakdownValue}>{row.value}</Text>
            </View>
          ))}
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
    backgroundColor: "#F8FAFC",
    borderWidth: 1,
    borderColor: "#CBD5E1",
    borderRadius: 14,
    paddingHorizontal: 14,
    height: 50,
    justifyContent: "center",
  },
  textInput: { fontSize: 17, fontWeight: "700", color: "#0F172A" },
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
    borderRadius: 16,
    padding: 16,
    alignItems: "center",
    marginBottom: 14,
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.05)",
  },
  totalLabel: { fontSize: 11, fontWeight: "800", letterSpacing: 0.5, marginBottom: 4 },
  totalValue: { fontSize: 32, fontWeight: "900" },
  breakdownRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 9,
    borderBottomWidth: 1,
    borderBottomColor: "#F1F5F9",
  },
  breakdownLabel: { fontSize: 13, color: "#64748B", fontWeight: "500" },
  breakdownValue: { fontSize: 13, color: "#0F172A", fontWeight: "700" },
});
