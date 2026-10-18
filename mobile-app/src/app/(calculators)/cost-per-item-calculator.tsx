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
import { Copy, RotateCcw, Check, ShoppingCart } from "lucide-react-native";

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

  const formatCurrency = (amount: number) => {
    return (
      currency +
      amount.toLocaleString("en-IN", {
        minimumFractionDigits: amount % 1 !== 0 ? 2 : 0,
        maximumFractionDigits: 2,
      })
    );
  };

  const handleCopy = async () => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    const text = `Cost Per Item Calculator\nTotal Price: ${currency}${totalCost || 0}\nTotal Quantity: ${quantity || 0}\nCost per Item: ${formatCurrency(costPerItem)}\nCost per 10 Items: ${formatCurrency(cost10)}\nCost per 100 Items: ${formatCurrency(cost100)}\n\nCalculate Online: https://topcalcbox.com/cost-per-item-calculator/`;
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
    <SafeAreaView style={styles.container} edges={["top", "bottom"]}>
      <StatusBar style="dark" />
      <CalculatorHeader
        title="Cost Per Item Calculator"
        subtitle="Quickly determine the exact price of a single unit when buying in bulk."
        iconName="ShoppingCart"
        themeColor="#F43F5E"
        themeBg="#FFF1F2"
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

        {/* Input Card */}
        <View style={styles.inputCard}>
          <Text style={styles.inputLabel}>TOTAL PURCHASE COST</Text>
          <View style={styles.inputWrapper}>
            <Text style={styles.currencyPrefix}>{currency}</Text>
            <TextInput
              style={styles.textInputWithPrefix}
              keyboardType="numeric"
              value={totalCost}
              onChangeText={setTotalCost}
              placeholder="1000"
              placeholderTextColor="#94A3B8"
            />
          </View>

          <Text style={[styles.inputLabel, { marginTop: 16 }]}>
            NUMBER OF ITEMS
          </Text>
          <View style={styles.inputWrapper}>
            <TextInput
              style={styles.textInput}
              keyboardType="numeric"
              value={quantity}
              onChangeText={setQuantity}
              placeholder="10"
              placeholderTextColor="#94A3B8"
            />
          </View>

          {/* Quick Quantity Chips */}
          <View style={styles.chipsRow}>
            {["2", "5", "10", "20", "50", "100"].map((item) => (
              <Pressable
                key={item}
                style={[
                  styles.chip,
                  quantity === item && styles.chipActive,
                ]}
                onPress={() => {
                  Haptics.selectionAsync();
                  setQuantity(item);
                }}
              >
                <Text
                  style={[
                    styles.chipText,
                    quantity === item && styles.chipTextActive,
                  ]}
                >
                  {item} pcs
                </Text>
              </Pressable>
            ))}
          </View>
        </View>

        {/* Result Card */}
        <View style={styles.resultCard}>
          <View style={styles.resultHeader}>
            <View style={styles.resultHeaderLeft}>
              <View style={styles.resultDot} />
              <Text style={styles.resultTitle}>COST PER ITEM RESULT</Text>
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
                  <Copy size={14} color="#E11D48" />
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
                <RotateCcw size={14} color="#E11D48" />
              </Pressable>
            </View>
          </View>

          {/* Main Hero Result */}
          <View style={styles.heroBox}>
            <Text style={styles.heroSubTitle}>COST PER ITEM</Text>
            <Text style={styles.heroValue}>
              {formatCurrency(costPerItem)}
            </Text>
            <View style={styles.badgePill}>
              <Text style={styles.badgePillText}>
                {cost > 0 && qty > 0
                  ? `For 1 unit of ${quantity} total`
                  : "Enter cost & quantity to calculate"}
              </Text>
            </View>
          </View>

          {/* Sub detail cards */}
          <View style={styles.gridRow}>
            <View style={styles.gridCard}>
              <Text style={styles.gridCardValue}>
                {formatCurrency(cost10)}
              </Text>
              <Text style={styles.gridCardLabel}>FOR 10 ITEMS</Text>
            </View>
            <View style={styles.gridCard}>
              <Text style={styles.gridCardValue}>
                {formatCurrency(cost100)}
              </Text>
              <Text style={styles.gridCardLabel}>FOR 100 ITEMS</Text>
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
    color: "#E11D48",
  },
  inputCard: {
    backgroundColor: "#FFF1F2",
    borderRadius: 20,
    padding: 16,
    borderWidth: 1,
    borderColor: "#FFE4E6",
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 11,
    fontWeight: "800",
    color: "#881337",
    letterSpacing: 0.6,
    marginBottom: 8,
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#FECDD3",
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
  textInput: {
    flex: 1,
    height: 50,
    fontSize: 18,
    fontWeight: "700",
    color: "#0F172A",
    paddingHorizontal: 16,
  },
  chipsRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginTop: 14,
  },
  chip: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#FECDD3",
  },
  chipActive: {
    backgroundColor: "#F43F5E",
    borderColor: "#F43F5E",
  },
  chipText: {
    fontSize: 12,
    fontWeight: "700",
    color: "#9F1239",
  },
  chipTextActive: {
    color: "#FFFFFF",
  },
  resultCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 24,
    padding: 18,
    borderWidth: 1,
    borderColor: "#FECDD3",
    shadowColor: "#F43F5E",
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
    backgroundColor: "#E11D48",
  },
  resultTitle: {
    fontSize: 11,
    fontWeight: "800",
    color: "#881337",
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
    backgroundColor: "#FFF1F2",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#FECDD3",
  },
  actionBtnText: {
    fontSize: 11,
    fontWeight: "700",
    color: "#E11D48",
  },
  actionBtnIcon: {
    backgroundColor: "#FFF1F2",
    padding: 6,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#FECDD3",
  },
  heroBox: {
    backgroundColor: "#FFF1F2",
    borderRadius: 18,
    paddingVertical: 20,
    paddingHorizontal: 16,
    alignItems: "center",
    marginBottom: 14,
    borderWidth: 1,
    borderColor: "#FECDD3",
  },
  heroSubTitle: {
    fontSize: 10,
    fontWeight: "800",
    color: "#9F1239",
    letterSpacing: 1.2,
    marginBottom: 4,
  },
  heroValue: {
    fontSize: 36,
    fontWeight: "900",
    color: "#881337",
    letterSpacing: -0.5,
  },
  badgePill: {
    backgroundColor: "#FFE4E6",
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 20,
    marginTop: 8,
  },
  badgePillText: {
    fontSize: 11,
    fontWeight: "700",
    color: "#BE123C",
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
    fontSize: 18,
    fontWeight: "800",
    color: "#0F172A",
    marginBottom: 2,
  },
  gridCardLabel: {
    fontSize: 10,
    fontWeight: "700",
    color: "#64748B",
    letterSpacing: 0.6,
  },
});
