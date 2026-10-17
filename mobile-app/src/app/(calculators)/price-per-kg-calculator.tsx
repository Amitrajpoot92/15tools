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
import { calculatePriceFromWeight } from "@/lib/calculations/shopping";
import { Copy, RotateCcw, Check } from "lucide-react-native";

export default function PricePerKgCalculatorScreen() {
  const [mode, setMode] = useState<"price" | "quantity">("price");
  const [currency, setCurrency] = useState<"₹" | "$">("₹");
  const [pricePerKg, setPricePerKg] = useState("80");
  const [amount, setAmount] = useState("20");
  const [kg, setKg] = useState("");
  const [grams, setGrams] = useState("250");
  const [copied, setCopied] = useState(false);

  const pkg = parseFloat(pricePerKg) || 0;
  const numKg = parseFloat(kg) || 0;
  const numGrams = parseFloat(grams) || 0;
  const numAmount = parseFloat(amount) || 0;

  // Find Price calculation
  const priceResult = calculatePriceFromWeight(pkg, numKg, numGrams);

  // Find Quantity calculation: grams = (amount / pricePerKg) * 1000
  const qtyGrams = pkg > 0 ? (numAmount / pkg) * 1000 : 0;
  const qtyKg = qtyGrams / 1000;

  const formatCurrency = (val: number) => {
    return (
      currency +
      val.toLocaleString("en-IN", {
        minimumFractionDigits: val % 1 !== 0 ? 2 : 0,
        maximumFractionDigits: 2,
      })
    );
  };

  const handleCopy = async () => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    const summary =
      mode === "price"
        ? `Price per Kg Calculation:\nRate: ${currency}${pkg}/kg\nQuantity: ${priceResult.formattedQuantity || "0 Grams"}\nTotal Price: ${formatCurrency(priceResult.price)}`
        : `Price per Kg Calculation:\nRate: ${currency}${pkg}/kg\nBudget: ${currency}${numAmount}\nQuantity: ${qtyGrams.toFixed(1)} Grams (${qtyKg.toFixed(2)} kg)`;
    await Clipboard.setStringAsync(summary);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleReset = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    setPricePerKg("");
    setKg("");
    setGrams("");
    setAmount("");
  };

  const handleQuickWeight = (kVal: string, gVal: string) => {
    Haptics.selectionAsync();
    setKg(kVal);
    setGrams(gVal);
  };

  return (
    <SafeAreaView style={styles.container} edges={["top", "bottom"]}>
      <StatusBar style="dark" />
      <CalculatorHeader
        title="Price per Kg Calculator"
        subtitle="Calculate exact price from kilograms and grams, or find quantity from budget."
        iconName="Scale"
        themeColor="#059669"
        themeBg="#ECFDF5"
      />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Mode Selector Tabs */}
        <View style={styles.tabContainer}>
          <Pressable
            style={[styles.tab, mode === "price" && styles.activeTab]}
            onPress={() => {
              Haptics.selectionAsync();
              setMode("price");
            }}
          >
            <Text style={[styles.tabText, mode === "price" && styles.activeTabText]}>
              Find Price
            </Text>
          </Pressable>
          <Pressable
            style={[styles.tab, mode === "quantity" && styles.activeTab]}
            onPress={() => {
              Haptics.selectionAsync();
              setMode("quantity");
            }}
          >
            <Text style={[styles.tabText, mode === "quantity" && styles.activeTabText]}>
              Find Quantity
            </Text>
          </Pressable>
        </View>

        {/* Input Card */}
        <View style={styles.card}>
          {/* Price per Kg */}
          <View style={styles.labelRow}>
            <Text style={styles.inputLabel}>PRICE PER KILOGRAM (KG)</Text>
            {/* Currency selector */}
            <View style={styles.currencyToggle}>
              {(["₹", "$"] as const).map((c) => (
                <Pressable
                  key={c}
                  onPress={() => {
                    Haptics.selectionAsync();
                    setCurrency(c);
                  }}
                  style={[
                    styles.currencyBtn,
                    currency === c && styles.activeCurrencyBtn,
                  ]}
                >
                  <Text
                    style={[
                      styles.currencyBtnText,
                      currency === c && styles.activeCurrencyBtnText,
                    ]}
                  >
                    {c}
                  </Text>
                </Pressable>
              ))}
            </View>
          </View>

          <View style={styles.inputWrapper}>
            <Text style={styles.prefix}>{currency}</Text>
            <TextInput
              style={styles.textInput}
              keyboardType="decimal-pad"
              value={pricePerKg}
              onChangeText={setPricePerKg}
              placeholder="80"
              placeholderTextColor="#94A3B8"
            />
          </View>
          <Text style={styles.rateHint}>Rate is per 1 kilogram (1,000 grams)</Text>

          {mode === "price" ? (
            <View style={{ marginTop: 14 }}>
              <Text style={styles.inputLabel}>QUANTITY (KG & GRAMS)</Text>
              
              {/* TWO BOXES: KG and GRAMS */}
              <View style={styles.twoBoxesRow}>
                {/* Kilograms Box */}
                <View style={styles.boxContainer}>
                  <Text style={styles.subBoxLabel}>Kilograms (kg)</Text>
                  <View style={styles.unitInputWrapper}>
                    <TextInput
                      style={styles.textInput}
                      keyboardType="decimal-pad"
                      value={kg}
                      onChangeText={setKg}
                      placeholder="0"
                      placeholderTextColor="#94A3B8"
                    />
                    <Text style={styles.unitSuffix}>kg</Text>
                  </View>
                </View>

                {/* Grams Box */}
                <View style={styles.boxContainer}>
                  <Text style={styles.subBoxLabel}>Grams (g)</Text>
                  <View style={styles.unitInputWrapper}>
                    <TextInput
                      style={styles.textInput}
                      keyboardType="decimal-pad"
                      value={grams}
                      onChangeText={setGrams}
                      placeholder="250"
                      placeholderTextColor="#94A3B8"
                    />
                    <Text style={styles.unitSuffix}>g</Text>
                  </View>
                </View>
              </View>

              {/* Quick Weight Chips */}
              <View style={styles.quickChipsRow}>
                {[
                  { label: "100g", k: "0", g: "100" },
                  { label: "250g", k: "0", g: "250" },
                  { label: "500g", k: "0", g: "500" },
                  { label: "1 kg", k: "1", g: "0" },
                  { label: "2 kg", k: "2", g: "0" },
                ].map((chip) => (
                  <Pressable
                    key={chip.label}
                    onPress={() => handleQuickWeight(chip.k, chip.g)}
                    style={[
                      styles.quickChip,
                      kg === chip.k && grams === chip.g && styles.activeQuickChip,
                    ]}
                  >
                    <Text
                      style={[
                        styles.quickChipText,
                        kg === chip.k && grams === chip.g && styles.activeQuickChipText,
                      ]}
                    >
                      {chip.label}
                    </Text>
                  </Pressable>
                ))}
              </View>
            </View>
          ) : (
            <View style={{ marginTop: 14 }}>
              <Text style={styles.inputLabel}>YOUR BUDGET / AMOUNT</Text>
              <View style={styles.inputWrapper}>
                <Text style={styles.prefix}>{currency}</Text>
                <TextInput
                  style={styles.textInput}
                  keyboardType="decimal-pad"
                  value={amount}
                  onChangeText={setAmount}
                  placeholder="20"
                  placeholderTextColor="#94A3B8"
                />
              </View>

              {/* Quick Amount Chips */}
              <View style={styles.quickChipsRow}>
                {["10", "20", "50", "100", "200"].map((amt) => (
                  <Pressable
                    key={amt}
                    onPress={() => {
                      Haptics.selectionAsync();
                      setAmount(amt);
                    }}
                    style={[
                      styles.quickChip,
                      amount === amt && styles.activeQuickChip,
                    ]}
                  >
                    <Text
                      style={[
                        styles.quickChipText,
                        amount === amt && styles.activeQuickChipText,
                      ]}
                    >
                      {currency}{amt}
                    </Text>
                  </Pressable>
                ))}
              </View>
            </View>
          )}
        </View>

        {/* Results Card */}
        <View style={styles.resultCard}>
          <View style={styles.resultHeader}>
            <Text style={styles.resultTitle}>Calculation Result</Text>
            <View style={styles.actionButtons}>
              <Pressable onPress={handleCopy} style={styles.iconBtn}>
                {copied ? <Check size={16} color="#16A34A" /> : <Copy size={16} color="#64748B" />}
              </Pressable>
              <Pressable onPress={handleReset} style={styles.iconBtn}>
                <RotateCcw size={16} color="#64748B" />
              </Pressable>
            </View>
          </View>

          {/* Big Result Total */}
          <View style={styles.totalBlock}>
            <Text style={styles.totalLabel}>
              {mode === "price" ? "CALCULATED PRICE" : "CALCULATED QUANTITY"}
            </Text>
            <Text style={styles.totalValue}>
              {mode === "price"
                ? formatCurrency(priceResult.price)
                : `${Math.round(qtyGrams).toLocaleString("en-IN")} Grams`}
            </Text>

            {/* Badge showing Price for X kg Y g */}
            <View style={styles.badgeContainer}>
              <Text style={styles.badgeText}>
                {mode === "price"
                  ? `Price for ${priceResult.formattedQuantity || "0 Grams"}`
                  : `Quantity for ${formatCurrency(numAmount)}`}
              </Text>
            </View>
          </View>

          {/* Breakdown Rows */}
          <View style={styles.breakdownRow}>
            <Text style={styles.breakdownLabel}>Rate per Kilogram:</Text>
            <Text style={styles.breakdownValue}>{formatCurrency(pkg)}/kg</Text>
          </View>

          {mode === "price" ? (
            <>
              <View style={styles.breakdownRow}>
                <Text style={styles.breakdownLabel}>Total Weight in Grams:</Text>
                <Text style={styles.breakdownValue}>
                  {priceResult.totalGrams.toLocaleString("en-IN")} g ({priceResult.totalKg.toFixed(3)} kg)
                </Text>
              </View>
              <View style={[styles.breakdownRow, { borderBottomWidth: 0 }]}>
                <Text style={styles.breakdownLabel}>Final Payable Price:</Text>
                <Text style={[styles.breakdownValue, { color: "#059669", fontWeight: "900" }]}>
                  {formatCurrency(priceResult.price)}
                </Text>
              </View>
            </>
          ) : (
            <>
              <View style={styles.breakdownRow}>
                <Text style={styles.breakdownLabel}>Equivalent in Kilograms:</Text>
                <Text style={styles.breakdownValue}>{qtyKg.toFixed(3)} kg</Text>
              </View>
              <View style={[styles.breakdownRow, { borderBottomWidth: 0 }]}>
                <Text style={styles.breakdownLabel}>Calculated Grams:</Text>
                <Text style={[styles.breakdownValue, { color: "#059669", fontWeight: "900" }]}>
                  {Math.round(qtyGrams).toLocaleString("en-IN")} Grams
                </Text>
              </View>
            </>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F8FAFC" },
  scrollContent: { paddingHorizontal: 16, paddingBottom: 40 },
  tabContainer: {
    flexDirection: "row",
    backgroundColor: "#E2E8F0",
    borderRadius: 14,
    padding: 4,
    marginBottom: 14,
  },
  tab: {
    flex: 1,
    paddingVertical: 10,
    alignItems: "center",
    borderRadius: 11,
  },
  activeTab: {
    backgroundColor: "#ffffff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  tabText: {
    fontSize: 13,
    fontWeight: "700",
    color: "#64748B",
  },
  activeTabText: {
    color: "#0F172A",
    fontWeight: "900",
  },
  card: {
    backgroundColor: "#ffffff",
    borderRadius: 20,
    padding: 16,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    marginBottom: 16,
  },
  labelRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 6,
  },
  inputLabel: {
    fontSize: 11,
    fontWeight: "800",
    color: "#64748B",
    letterSpacing: 0.5,
  },
  currencyToggle: {
    flexDirection: "row",
    backgroundColor: "#F1F5F9",
    borderRadius: 8,
    padding: 2,
  },
  currencyBtn: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
  },
  activeCurrencyBtn: {
    backgroundColor: "#ffffff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  currencyBtnText: {
    fontSize: 12,
    fontWeight: "800",
    color: "#64748B",
  },
  activeCurrencyBtnText: {
    color: "#059669",
  },
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
  prefix: {
    fontSize: 18,
    fontWeight: "800",
    color: "#94A3B8",
    marginRight: 6,
  },
  rateHint: {
    fontSize: 11,
    fontWeight: "700",
    color: "#059669",
    marginTop: 4,
    paddingHorizontal: 2,
  },
  twoBoxesRow: {
    flexDirection: "row",
    gap: 10,
    marginTop: 6,
  },
  boxContainer: {
    flex: 1,
  },
  subBoxLabel: {
    fontSize: 11,
    fontWeight: "700",
    color: "#475569",
    marginBottom: 4,
  },
  unitInputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F8FAFC",
    borderWidth: 1,
    borderColor: "#CBD5E1",
    borderRadius: 14,
    paddingHorizontal: 12,
    height: 50,
  },
  unitSuffix: {
    fontSize: 13,
    fontWeight: "800",
    color: "#94A3B8",
    marginLeft: 6,
  },
  textInput: {
    flex: 1,
    fontSize: 17,
    fontWeight: "700",
    color: "#0F172A",
  },
  quickChipsRow: {
    flexDirection: "row",
    gap: 6,
    marginTop: 10,
  },
  quickChip: {
    flex: 1,
    backgroundColor: "#F1F5F9",
    paddingVertical: 7,
    borderRadius: 10,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },
  activeQuickChip: {
    backgroundColor: "#ECFDF5",
    borderColor: "#A7F3D0",
  },
  quickChipText: {
    fontSize: 11,
    fontWeight: "700",
    color: "#475569",
  },
  activeQuickChipText: {
    color: "#059669",
    fontWeight: "800",
  },
  resultCard: {
    backgroundColor: "#ffffff",
    borderRadius: 20,
    padding: 16,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 3,
  },
  resultHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  resultTitle: {
    fontSize: 14,
    fontWeight: "800",
    color: "#0F172A",
  },
  actionButtons: {
    flexDirection: "row",
    gap: 6,
  },
  iconBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#F1F5F9",
    justifyContent: "center",
    alignItems: "center",
  },
  totalBlock: {
    backgroundColor: "#ECFDF5",
    borderRadius: 16,
    padding: 16,
    alignItems: "center",
    marginBottom: 14,
    borderWidth: 1,
    borderColor: "#D1FAE5",
  },
  totalLabel: {
    fontSize: 11,
    fontWeight: "800",
    color: "#065F46",
    letterSpacing: 0.5,
    marginBottom: 4,
  },
  totalValue: {
    fontSize: 32,
    fontWeight: "900",
    color: "#059669",
  },
  badgeContainer: {
    backgroundColor: "#FEF3C7",
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#FDE68A",
    marginTop: 8,
  },
  badgeText: {
    fontSize: 11,
    fontWeight: "800",
    color: "#92400E",
    textTransform: "uppercase",
  },
  breakdownRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 9,
    borderBottomWidth: 1,
    borderBottomColor: "#F1F5F9",
  },
  breakdownLabel: {
    fontSize: 13,
    color: "#64748B",
    fontWeight: "500",
  },
  breakdownValue: {
    fontSize: 13,
    color: "#0F172A",
    fontWeight: "700",
  },
});
