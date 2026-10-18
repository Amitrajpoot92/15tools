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
import { Copy, RotateCcw, Check } from "lucide-react-native";

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

      return {
        wholesalePricePerUnit,
        profitPerUnit,
        totalProfit,
        totalRevenue,
      };
    }
    return {
      wholesalePricePerUnit: 0,
      profitPerUnit: 0,
      totalProfit: 0,
      totalRevenue: 0,
    };
  };

  const result = calculate();

  const formatNumber = (num: number, maxDigits = 2) => {
    return num.toLocaleString(currency === "₹" ? "en-IN" : "en-US", {
      maximumFractionDigits: maxDigits,
    });
  };

  const handleCopy = async () => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    const text = `Wholesale Price Calculator\nTotal Cost Price: ${currency}${
      cost || 0
    }\nProfit Target: ${profitPercent || 0}%\nQuantity: ${
      quantity || 0
    } Units\nWholesale Price Per Unit: ${currency}${formatNumber(
      result.wholesalePricePerUnit
    )}\nTotal Profit: ${currency}${formatNumber(
      result.totalProfit
    )}\nTotal Revenue: ${currency}${formatNumber(
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
    <SafeAreaView style={styles.container} edges={["top", "bottom"]}>
      <StatusBar style="dark" />
      <CalculatorHeader
        title="Wholesale Price Calculator"
        subtitle="Find out the selling price, cost, and profit margin for your retail products."
        iconName="PieChart"
        themeColor="#F59E0B"
        themeBg="#FFFBEB"
      />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {/* Currency Toggle */}
        <View style={styles.currencyRow}>
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
                  styles.currencyText,
                  currency === "₹" && styles.currencyTextActive,
                ]}
              >
                ₹
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
                  styles.currencyText,
                  currency === "$" && styles.currencyTextActive,
                ]}
              >
                $
              </Text>
            </Pressable>
          </View>
        </View>

        {/* Inputs Card */}
        <View style={styles.inputCard}>
          <Text style={styles.inputLabel}>TOTAL COST PRICE</Text>
          <View style={styles.inputWrapper}>
            <Text style={styles.prefix}>{currency}</Text>
            <TextInput
              style={styles.textInput}
              keyboardType="numeric"
              value={cost}
              onChangeText={setCost}
              placeholder="1000"
              placeholderTextColor="#94A3B8"
            />
          </View>

          <Text style={[styles.inputLabel, { marginTop: 16 }]}>TARGET PROFIT (%)</Text>
          <View style={styles.inputWrapper}>
            <TextInput
              style={styles.textInput}
              keyboardType="numeric"
              value={profitPercent}
              onChangeText={setProfitPercent}
              placeholder="10"
              placeholderTextColor="#94A3B8"
            />
            <Text style={styles.suffix}>%</Text>
          </View>

          <Text style={[styles.inputLabel, { marginTop: 16 }]}>QUANTITY</Text>
          <View style={styles.inputWrapper}>
            <TextInput
              style={styles.textInput}
              keyboardType="numeric"
              value={quantity}
              onChangeText={setQuantity}
              placeholder="10"
              placeholderTextColor="#94A3B8"
            />
            <Text style={styles.suffix}>Units</Text>
          </View>
        </View>

        {/* Result Box */}
        <View style={styles.resultBox}>
          <View style={styles.resultHeader}>
            <Text style={styles.resultCategory}>WHOLESALE DETAILS</Text>
            <View style={styles.actionButtons}>
              <Pressable onPress={handleCopy} style={styles.copyBtn}>
                {copied ? <Check size={14} color="#059669" /> : <Copy size={14} color="#D97706" />}
                <Text style={[styles.copyBtnText, copied && { color: "#059669" }]}>
                  {copied ? "Copied" : "Copy"}
                </Text>
              </Pressable>
              <Pressable onPress={handleReset} style={styles.resetBtn}>
                <RotateCcw size={15} color="#D97706" />
              </Pressable>
            </View>
          </View>

          {/* Hero wholesale price card */}
          <View style={styles.heroAmountCard}>
            <Text style={styles.heroAmountLabel}>WHOLESALE PRICE PER UNIT</Text>
            <View style={styles.heroPriceRow}>
              <Text style={styles.heroSymbol}>{currency}</Text>
              <Text style={styles.heroPrice}>
                {formatNumber(result.wholesalePricePerUnit)}
              </Text>
            </View>
          </View>

          {/* Grid 2 target cards */}
          <View style={styles.gridCards}>
            <View style={styles.detailCard}>
              <Text style={styles.detailCardLabel}>PROFIT PER UNIT</Text>
              <Text style={styles.detailCardValue}>
                {currency}{formatNumber(result.profitPerUnit)}
              </Text>
            </View>
            <View style={styles.detailCard}>
              <Text style={styles.detailCardLabel}>TOTAL PROFIT</Text>
              <Text style={styles.detailCardValue}>
                {currency}{formatNumber(result.totalProfit)}
              </Text>
            </View>
          </View>

          {/* Total Revenue Card */}
          <View style={styles.revenueCard}>
            <Text style={styles.revenueLabel}>Total Revenue</Text>
            <Text style={styles.revenueValue}>
              {currency}{formatNumber(result.totalRevenue)}
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F8FAFC" },
  scrollContent: { paddingHorizontal: 16, paddingBottom: 40 },
  currencyRow: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginBottom: 12,
  },
  currencyToggle: {
    flexDirection: "row",
    backgroundColor: "#F1F5F9",
    padding: 3,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },
  currencyBtn: {
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 7,
  },
  currencyBtnActive: {
    backgroundColor: "#FFFFFF",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  currencyText: {
    fontSize: 14,
    fontWeight: "700",
    color: "#64748B",
  },
  currencyTextActive: {
    color: "#D97706",
    fontWeight: "900",
  },
  inputCard: {
    backgroundColor: "#ECFEFF",
    borderRadius: 20,
    padding: 18,
    borderWidth: 1,
    borderColor: "#CFFAFE",
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 11,
    fontWeight: "800",
    color: "#0E7490",
    letterSpacing: 0.5,
    marginBottom: 8,
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#CBD5E1",
    borderRadius: 14,
    paddingHorizontal: 14,
    height: 52,
  },
  textInput: {
    flex: 1,
    fontSize: 20,
    fontWeight: "800",
    color: "#0F172A",
  },
  prefix: {
    fontSize: 18,
    fontWeight: "800",
    color: "#94A3B8",
    marginRight: 6,
  },
  suffix: {
    fontSize: 16,
    fontWeight: "700",
    color: "#94A3B8",
    marginLeft: 6,
  },
  resultBox: {
    backgroundColor: "#FFFBEB",
    borderRadius: 22,
    padding: 18,
    borderWidth: 1.5,
    borderColor: "#FDE68A",
    shadowColor: "#D97706",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 3,
  },
  resultHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 14,
  },
  resultCategory: {
    fontSize: 11,
    fontWeight: "800",
    color: "#B45309",
    letterSpacing: 0.5,
  },
  actionButtons: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  copyBtn: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#FDE68A",
    gap: 4,
  },
  copyBtnText: {
    fontSize: 11,
    fontWeight: "800",
    color: "#B45309",
  },
  resetBtn: {
    width: 30,
    height: 30,
    borderRadius: 8,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#FDE68A",
  },
  heroAmountCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 18,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#FEF3C7",
    marginBottom: 12,
  },
  heroAmountLabel: {
    fontSize: 10,
    fontWeight: "800",
    color: "#B45309",
    letterSpacing: 1,
    marginBottom: 6,
  },
  heroPriceRow: {
    flexDirection: "row",
    alignItems: "baseline",
  },
  heroSymbol: {
    fontSize: 26,
    fontWeight: "800",
    color: "#94A3B8",
    marginRight: 4,
  },
  heroPrice: {
    fontSize: 42,
    fontWeight: "900",
    color: "#B45309",
    letterSpacing: -1,
  },
  gridCards: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 10,
  },
  detailCard: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    padding: 12,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#FEF3C7",
  },
  detailCardLabel: {
    fontSize: 10,
    fontWeight: "800",
    color: "#64748B",
    letterSpacing: 0.5,
    marginBottom: 4,
  },
  detailCardValue: {
    fontSize: 16,
    fontWeight: "900",
    color: "#0F172A",
  },
  revenueCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    padding: 14,
    borderWidth: 1,
    borderColor: "#FEF3C7",
  },
  revenueLabel: {
    fontSize: 13,
    fontWeight: "800",
    color: "#475569",
  },
  revenueValue: {
    fontSize: 18,
    fontWeight: "900",
    color: "#B45309",
  },
});
