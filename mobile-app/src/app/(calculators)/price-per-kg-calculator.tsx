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
import { Copy, RotateCcw, Check, Scale } from "lucide-react-native";

export default function PricePerKgCalculatorScreen() {
  const [mode, setMode] = useState<"quantity" | "price">("price");
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
      val.toLocaleString("en-IN", {
        minimumFractionDigits: val % 1 !== 0 ? 2 : 0,
        maximumFractionDigits: 2,
      })
    );
  };

  const calculate = () => {
    const pkg = parseFloat(pricePerKg);
    if (isNaN(pkg) || pkg <= 0) {
      return { qty: 0, price: 0, formattedQty: "0 Grams" };
    }

    if (mode === "quantity") {
      const amt = parseFloat(amount);
      if (isNaN(amt) || amt < 0) {
        return { qty: 0, price: 0, formattedQty: "0 Grams" };
      }
      const totalG = (amt / pkg) * 1000;
      return {
        qty: totalG,
        price: amt,
        formattedQty: `${formatGrams(totalG)} Grams`,
      };
    } else {
      const k = parseFloat(kg) || 0;
      const g = parseFloat(grams) || 0;
      const totalG = k * 1000 + g;
      if (totalG <= 0) {
        return { qty: 0, price: 0, formattedQty: "0 Grams" };
      }
      const calcPrice = (totalG / 1000) * pkg;

      let formatted = "";
      if (k > 0 && g > 0) {
        formatted = `${k} kg ${g} g`;
      } else if (k > 0) {
        formatted = `${k} kg`;
      } else {
        formatted = `${formatGrams(g)} Grams`;
      }

      return {
        qty: totalG,
        price: calcPrice,
        formattedQty: formatted,
      };
    }
  };

  const { qty, price, formattedQty } = calculate();

  const handleCopy = async () => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    const text =
      mode === "quantity"
        ? `Price Per Kg Calculator\nPrice Per Kg: ${currency}${pricePerKg || 0}\nYour Amount: ${currency}${amount || 0}\nCalculated Quantity: ${formatGrams(qty)} Grams\n\nCalculate Online: https://topcalcbox.com/price-per-kg-calculator/`
        : `Price Per Kg Calculator\nPrice Per Kg: ${currency}${pricePerKg || 0}\nQuantity: ${formattedQty}\nCalculated Price: ${formatCurrency(price)}\n\nCalculate Online: https://topcalcbox.com/price-per-kg-calculator/`;
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
        subtitle="Find the exact cost per kilogram to easily compare grocery prices."
        iconName="Scale"
        themeColor="#D97706"
        themeBg="#FEF3C7"
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

        {/* Mode Selector Tabs */}
        <View style={styles.modeContainer}>
          <Pressable
            style={[styles.modeTab, mode === "quantity" && styles.modeTabActive]}
            onPress={() => {
              Haptics.selectionAsync();
              setMode("quantity");
            }}
          >
            <Text
              style={[
                styles.modeTabText,
                mode === "quantity" && styles.modeTabTextActive,
              ]}
            >
              Find Quantity
            </Text>
          </Pressable>
          <Pressable
            style={[styles.modeTab, mode === "price" && styles.modeTabActive]}
            onPress={() => {
              Haptics.selectionAsync();
              setMode("price");
            }}
          >
            <Text
              style={[
                styles.modeTabText,
                mode === "price" && styles.modeTabTextActive,
              ]}
            >
              Find Price
            </Text>
          </Pressable>
        </View>

        {/* Input Card */}
        <View style={styles.inputCard}>
          <Text style={styles.inputLabel}>PRICE PER KILOGRAM</Text>
          <View style={styles.inputWrapper}>
            <Text style={styles.currencyPrefix}>{currency}</Text>
            <TextInput
              style={styles.textInputWithPrefix}
              keyboardType="numeric"
              value={pricePerKg}
              onChangeText={setPricePerKg}
              placeholder="80"
              placeholderTextColor="#94A3B8"
            />
          </View>
          <Text style={styles.helperText}>Rate is per kilogram (kg)</Text>

          {mode === "quantity" ? (
            <View style={{ marginTop: 16 }}>
              <Text style={styles.inputLabel}>YOUR BUDGET / AMOUNT</Text>
              <View style={styles.inputWrapper}>
                <Text style={styles.currencyPrefix}>{currency}</Text>
                <TextInput
                  style={styles.textInputWithPrefix}
                  keyboardType="numeric"
                  value={amount}
                  onChangeText={setAmount}
                  placeholder="20"
                  placeholderTextColor="#94A3B8"
                />
              </View>
            </View>
          ) : (
            <View style={{ marginTop: 16 }}>
              <Text style={styles.inputLabel}>QUANTITY</Text>
              <View style={styles.weightRow}>
                {/* Kilograms (kg) box */}
                <View style={styles.weightCol}>
                  <Text style={styles.weightColLabel}>KILOGRAMS (KG)</Text>
                  <View style={styles.weightInputWrapper}>
                    <TextInput
                      style={styles.weightTextInput}
                      keyboardType="numeric"
                      value={kg}
                      onChangeText={setKg}
                      placeholder="0"
                      placeholderTextColor="#94A3B8"
                    />
                    <Text style={styles.unitSuffix}>kg</Text>
                  </View>
                </View>

                {/* Grams (g) box */}
                <View style={styles.weightCol}>
                  <Text style={styles.weightColLabel}>GRAMS (G)</Text>
                  <View style={styles.weightInputWrapper}>
                    <TextInput
                      style={styles.weightTextInput}
                      keyboardType="numeric"
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
              <View style={styles.chipsRow}>
                {[
                  { label: "100g", k: "", g: "100" },
                  { label: "250g", k: "", g: "250" },
                  { label: "500g", k: "", g: "500" },
                  { label: "750g", k: "", g: "750" },
                  { label: "1 kg", k: "1", g: "" },
                  { label: "1.5 kg", k: "1", g: "500" },
                ].map((item) => (
                  <Pressable
                    key={item.label}
                    style={[
                      styles.chip,
                      kg === item.k && grams === item.g && styles.chipActive,
                    ]}
                    onPress={() => handleQuickWeight(item.k, item.g)}
                  >
                    <Text
                      style={[
                        styles.chipText,
                        kg === item.k && grams === item.g && styles.chipTextActive,
                      ]}
                    >
                      {item.label}
                    </Text>
                  </Pressable>
                ))}
              </View>
            </View>
          )}
        </View>

        {/* Result Card */}
        <View style={styles.resultCard}>
          <View style={styles.resultHeader}>
            <View style={styles.resultHeaderLeft}>
              <View style={styles.resultDot} />
              <Text style={styles.resultTitle}>CALCULATION RESULT</Text>
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
                  <Copy size={14} color="#D97706" />
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
                <RotateCcw size={14} color="#D97706" />
              </Pressable>
            </View>
          </View>

          {/* Hero Result */}
          <View style={styles.heroBox}>
            <Text style={styles.heroSubTitle}>
              {mode === "quantity" ? "CALCULATED QUANTITY" : "CALCULATED PRICE"}
            </Text>
            <Text style={styles.heroValue}>
              {mode === "quantity"
                ? `${formatGrams(qty)} g`
                : formatCurrency(price)}
            </Text>
            <View style={styles.badgePill}>
              <Text style={styles.badgePillText}>
                {mode === "quantity"
                  ? `Quantity for ${formatCurrency(price)}`
                  : `Price for ${formattedQty}`}
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
    color: "#D97706",
  },
  modeContainer: {
    flexDirection: "row",
    backgroundColor: "#F1F5F9",
    borderRadius: 14,
    padding: 4,
    marginBottom: 16,
  },
  modeTab: {
    flex: 1,
    paddingVertical: 10,
    alignItems: "center",
    borderRadius: 10,
  },
  modeTabActive: {
    backgroundColor: "#FFFFFF",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 3,
    elevation: 2,
  },
  modeTabText: {
    fontSize: 13,
    fontWeight: "700",
    color: "#64748B",
  },
  modeTabTextActive: {
    color: "#92400E",
  },
  inputCard: {
    backgroundColor: "#FEF3C7",
    borderRadius: 20,
    padding: 16,
    borderWidth: 1,
    borderColor: "#FDE68A",
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 11,
    fontWeight: "800",
    color: "#78350F",
    letterSpacing: 0.6,
    marginBottom: 8,
  },
  helperText: {
    fontSize: 11,
    fontWeight: "700",
    color: "#92400E",
    marginTop: 4,
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#FDE68A",
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
  weightRow: {
    flexDirection: "row",
    gap: 12,
  },
  weightCol: {
    flex: 1,
  },
  weightColLabel: {
    fontSize: 10,
    fontWeight: "700",
    color: "#92400E",
    letterSpacing: 0.5,
    marginBottom: 4,
  },
  weightInputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#FDE68A",
    paddingRight: 12,
  },
  weightTextInput: {
    flex: 1,
    height: 50,
    fontSize: 18,
    fontWeight: "700",
    color: "#0F172A",
    paddingLeft: 14,
  },
  unitSuffix: {
    fontSize: 14,
    fontWeight: "700",
    color: "#94A3B8",
  },
  chipsRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginTop: 12,
  },
  chip: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#FDE68A",
  },
  chipActive: {
    backgroundColor: "#D97706",
    borderColor: "#D97706",
  },
  chipText: {
    fontSize: 11,
    fontWeight: "700",
    color: "#92400E",
  },
  chipTextActive: {
    color: "#FFFFFF",
  },
  resultCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 24,
    padding: 18,
    borderWidth: 1,
    borderColor: "#FDE68A",
    shadowColor: "#D97706",
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
    backgroundColor: "#D97706",
  },
  resultTitle: {
    fontSize: 11,
    fontWeight: "800",
    color: "#78350F",
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
    backgroundColor: "#FEF3C7",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#FDE68A",
  },
  actionBtnText: {
    fontSize: 11,
    fontWeight: "700",
    color: "#D97706",
  },
  actionBtnIcon: {
    backgroundColor: "#FEF3C7",
    padding: 6,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#FDE68A",
  },
  heroBox: {
    backgroundColor: "#FEF3C7",
    borderRadius: 18,
    paddingVertical: 20,
    paddingHorizontal: 16,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#FDE68A",
  },
  heroSubTitle: {
    fontSize: 10,
    fontWeight: "800",
    color: "#92400E",
    letterSpacing: 1.2,
    marginBottom: 4,
  },
  heroValue: {
    fontSize: 36,
    fontWeight: "900",
    color: "#78350F",
    letterSpacing: -0.5,
  },
  badgePill: {
    backgroundColor: "#FDE68A",
    paddingHorizontal: 14,
    paddingVertical: 5,
    borderRadius: 20,
    marginTop: 8,
  },
  badgePillText: {
    fontSize: 12,
    fontWeight: "700",
    color: "#78350F",
  },
});
