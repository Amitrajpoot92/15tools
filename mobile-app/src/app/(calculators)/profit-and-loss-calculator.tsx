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
import { Copy, RotateCcw, Check, TrendingUp, TrendingDown } from "lucide-react-native";

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

  const formatNumber = (num: number, maxDigits = 2) => {
    return num.toLocaleString(currency === "₹" ? "en-IN" : "en-US", {
      maximumFractionDigits: maxDigits,
    });
  };

  const handleCopy = async () => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    const text = `Profit and Loss Calculator\nCost Price: ${currency}${
      costPrice || 0
    }\nSelling Price: ${currency}${sellingPrice || 0}\n${
      expenses ? `Other Costs / Expenses: ${currency}${expenses}\n` : ""
    }${result.type === "loss" ? "Loss" : "Profit"}: ${currency}${formatNumber(
      result.amount
    )}\n${result.type === "loss" ? "Loss" : "Profit"} Percentage: ${formatNumber(
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

  const isLoss = result.type === "loss";
  const themeColor = isLoss ? "#E11D48" : "#059669";
  const themeBg = isLoss ? "#FFF1F2" : "#ECFDF5";

  return (
    <SafeAreaView style={styles.container} edges={["top", "bottom"]}>
      <StatusBar style="dark" />
      <CalculatorHeader
        title="Profit and Loss Calculator"
        subtitle="Determine your profit margins, gross profit, and total loss for your business."
        iconName="TrendingUp"
        themeColor="#F97316"
        themeBg="#FFF7ED"
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
          <Text style={styles.inputLabel}>COST PRICE (CP)</Text>
          <View style={styles.inputWrapper}>
            <Text style={styles.prefix}>{currency}</Text>
            <TextInput
              style={styles.textInput}
              keyboardType="numeric"
              value={costPrice}
              onChangeText={setCostPrice}
              placeholder="500"
              placeholderTextColor="#94A3B8"
            />
          </View>

          <Text style={[styles.inputLabel, { marginTop: 16 }]}>SELLING PRICE (SP)</Text>
          <View style={styles.inputWrapper}>
            <Text style={styles.prefix}>{currency}</Text>
            <TextInput
              style={styles.textInput}
              keyboardType="numeric"
              value={sellingPrice}
              onChangeText={setSellingPrice}
              placeholder="600"
              placeholderTextColor="#94A3B8"
            />
          </View>

          <Text style={[styles.inputLabel, { marginTop: 16 }]}>
            OTHER COSTS / EXPENSES <Text style={styles.optionalText}>(OPTIONAL)</Text>
          </Text>
          <View style={styles.inputWrapper}>
            <Text style={styles.prefix}>{currency}</Text>
            <TextInput
              style={styles.textInput}
              keyboardType="numeric"
              value={expenses}
              onChangeText={setExpenses}
              placeholder="e.g. 50"
              placeholderTextColor="#94A3B8"
            />
          </View>
        </View>

        {/* Result Box */}
        <View style={[styles.resultBox, { backgroundColor: themeBg, borderColor: isLoss ? "#FECDD3" : "#A7F3D0" }]}>
          <View style={styles.resultHeader}>
            <View style={styles.titleGroup}>
              {isLoss ? (
                <TrendingDown size={16} color="#E11D48" />
              ) : (
                <TrendingUp size={16} color="#059669" />
              )}
              <Text style={[styles.resultCategory, { color: themeColor }]}>
                {isLoss ? "LOSS RESULT" : "PROFIT RESULT"}
              </Text>
            </View>
            <View style={styles.actionButtons}>
              <Pressable onPress={handleCopy} style={styles.copyBtn}>
                {copied ? <Check size={14} color="#059669" /> : <Copy size={14} color={themeColor} />}
                <Text style={[styles.copyBtnText, copied && { color: "#059669" }]}>
                  {copied ? "Copied" : "Copy"}
                </Text>
              </Pressable>
              <Pressable onPress={handleReset} style={styles.resetBtn}>
                <RotateCcw size={15} color={themeColor} />
              </Pressable>
            </View>
          </View>

          {/* Main Hero Amount Card */}
          <View style={styles.heroAmountCard}>
            <Text style={[styles.heroAmountLabel, { color: themeColor }]}>
              {isLoss ? "TOTAL LOSS" : "TOTAL PROFIT"}
            </Text>
            <View style={styles.heroPriceRow}>
              <Text style={styles.heroSymbol}>{currency}</Text>
              <Text style={[styles.heroPrice, { color: isLoss ? "#E11D48" : "#059669" }]}>
                {formatNumber(result.amount)}
              </Text>
            </View>
            {result.amount !== 0 && (
              <View style={[styles.badge, { backgroundColor: isLoss ? "#FFE4E6" : "#DCFCE7", borderColor: isLoss ? "#FECDD3" : "#BBF7D0" }]}>
                <Text style={[styles.badgeText, { color: themeColor }]}>
                  {formatNumber(result.margin)}% {isLoss ? "Loss on Cost" : "Profit on Cost"}
                </Text>
              </View>
            )}
          </View>

          {/* Target Cards */}
          <View style={styles.targetCards}>
            <View style={styles.targetRow}>
              <Text style={styles.targetLabel}>Total Cost</Text>
              <Text style={styles.targetValue}>
                {currency}{formatNumber(result.totalCost)}
              </Text>
            </View>
            <View style={styles.targetRow}>
              <Text style={styles.targetLabel}>Selling Price</Text>
              <Text style={styles.targetValue}>
                {currency}{formatNumber(parseFloat(sellingPrice) || 0)}
              </Text>
            </View>
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
    color: "#059669",
    fontWeight: "900",
  },
  inputCard: {
    backgroundColor: "#ECFDF5",
    borderRadius: 20,
    padding: 18,
    borderWidth: 1,
    borderColor: "#D1FAE5",
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 11,
    fontWeight: "800",
    color: "#065F46",
    letterSpacing: 0.5,
    marginBottom: 8,
  },
  optionalText: {
    color: "#94A3B8",
    fontWeight: "500",
    fontSize: 10,
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
  resultBox: {
    borderRadius: 22,
    padding: 18,
    borderWidth: 1.5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 3,
  },
  resultHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 14,
  },
  titleGroup: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  resultCategory: {
    fontSize: 11,
    fontWeight: "800",
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
    borderColor: "#CBD5E1",
    gap: 4,
  },
  copyBtnText: {
    fontSize: 11,
    fontWeight: "800",
    color: "#0F172A",
  },
  resetBtn: {
    width: 30,
    height: 30,
    borderRadius: 8,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#CBD5E1",
  },
  heroAmountCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 18,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.06)",
    marginBottom: 12,
  },
  heroAmountLabel: {
    fontSize: 11,
    fontWeight: "800",
    letterSpacing: 1,
    marginBottom: 6,
  },
  heroPriceRow: {
    flexDirection: "row",
    alignItems: "baseline",
    marginBottom: 10,
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
    letterSpacing: -1,
  },
  badge: {
    borderWidth: 1,
    paddingHorizontal: 14,
    paddingVertical: 4,
    borderRadius: 20,
  },
  badgeText: {
    fontSize: 11,
    fontWeight: "800",
  },
  targetCards: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 14,
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.06)",
    gap: 8,
  },
  targetRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#F8FAFC",
    padding: 12,
    borderRadius: 10,
  },
  targetLabel: {
    fontSize: 13,
    fontWeight: "700",
    color: "#475569",
  },
  targetValue: {
    fontSize: 14,
    fontWeight: "900",
    color: "#0F172A",
  },
});
