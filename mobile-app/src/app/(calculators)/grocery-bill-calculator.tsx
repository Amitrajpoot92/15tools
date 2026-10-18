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
import { Copy, RotateCcw, Check, Plus, Trash2, ShoppingCart } from "lucide-react-native";

interface GroceryItem {
  id: string;
  name: string;
  price: string;
  quantity: string;
}

const defaultItems: GroceryItem[] = [
  { id: "1", name: "Milk", price: "50", quantity: "2" },
  { id: "2", name: "Bread", price: "40", quantity: "1" },
  { id: "3", name: "Eggs", price: "7", quantity: "12" },
];

export default function GroceryBillCalculatorScreen() {
  const [currency, setCurrency] = useState<"₹" | "$">("₹");
  const [items, setItems] = useState<GroceryItem[]>(defaultItems);
  const [copied, setCopied] = useState(false);

  const addItem = () => {
    Haptics.selectionAsync();
    setItems((prev) => [
      ...prev,
      {
        id: Date.now().toString(),
        name: "",
        price: "",
        quantity: "1",
      },
    ]);
  };

  const removeItem = (id: string) => {
    if (items.length <= 1) return;
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const updateItem = (id: string, field: keyof GroceryItem, value: string) => {
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, [field]: value } : item))
    );
  };

  const calculate = () => {
    let total = 0;
    let totalItems = 0;

    items.forEach((item) => {
      const p = parseFloat(item.price);
      const q = parseFloat(item.quantity);
      if (!isNaN(p) && p >= 0 && !isNaN(q) && q > 0) {
        total += p * q;
        totalItems += q;
      }
    });

    return { total, totalItems };
  };

  const { total, totalItems } = calculate();

  const formatNumber = (num: number, maxDigits = 2) => {
    return num.toLocaleString(currency === "₹" ? "en-IN" : "en-US", {
      minimumFractionDigits: num % 1 !== 0 ? 2 : 0,
      maximumFractionDigits: maxDigits,
    });
  };

  const handleCopy = async () => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    let copyStr = "Grocery Bill Calculator \n--------------------\n";
    let index = 1;
    items.forEach((s) => {
      if (s.name || s.price) {
        const qty = parseFloat(s.quantity) || 1;
        const price = parseFloat(s.price) || 0;
        const lineTotal = price * qty;
        copyStr += `${index}. ${s.name || "Item"} - ${currency}${formatNumber(
          price,
          2
        )} × ${qty} = ${currency}${formatNumber(lineTotal, 2)}\n`;
        index++;
      }
    });
    copyStr += "--------------------\n";
    copyStr += `Total Bill: ${currency}${formatNumber(total, 2)}\n\n`;
    copyStr += "Calculate Online: https://topcalcbox.com/grocery-bill-calculator/";

    await Clipboard.setStringAsync(copyStr);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleReset = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    setItems(defaultItems);
  };

  return (
    <SafeAreaView style={styles.container} edges={["top", "bottom"]}>
      <StatusBar style="dark" />
      <CalculatorHeader
        title="Grocery Bill Calculator"
        subtitle="Easily estimate your total grocery bill by summing up all your items before checkout."
        iconName="ShoppingCart"
        themeColor="#EA580C"
        themeBg="#FFEDD5"
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

        {/* Grocery Items List Card */}
        <View style={styles.listCard}>
          <View style={styles.listHeader}>
            <Text style={styles.listHeaderTitle}>SHOPPING LIST</Text>
            <Pressable
              onPress={addItem}
              style={({ pressed }) => [
                styles.addBtn,
                pressed && { opacity: 0.7 },
              ]}
            >
              <Plus size={14} color="#EA580C" />
              <Text style={styles.addBtnText}>Add Item</Text>
            </Pressable>
          </View>

          {items.map((item, index) => (
            <View key={item.id} style={styles.itemRow}>
              <TextInput
                style={styles.itemNameInput}
                value={item.name}
                onChangeText={(text) => updateItem(item.id, "name", text)}
                placeholder={`Item ${index + 1}`}
                placeholderTextColor="#94A3B8"
              />

              {/* Price with currency prefix */}
              <View style={styles.priceWrapper}>
                <Text style={styles.pricePrefix}>{currency}</Text>
                <TextInput
                  style={styles.priceInput}
                  keyboardType="numeric"
                  value={item.price}
                  onChangeText={(text) => updateItem(item.id, "price", text)}
                  placeholder="Price"
                  placeholderTextColor="#94A3B8"
                />
              </View>

              {/* Qty */}
              <View style={styles.qtyWrapper}>
                <Text style={styles.qtyPrefix}>x</Text>
                <TextInput
                  style={styles.qtyInput}
                  keyboardType="numeric"
                  value={item.quantity}
                  onChangeText={(text) => updateItem(item.id, "quantity", text)}
                  placeholder="1"
                  placeholderTextColor="#94A3B8"
                />
              </View>

              {/* Trash */}
              <Pressable
                onPress={() => removeItem(item.id)}
                disabled={items.length <= 1}
                style={[
                  styles.deleteBtn,
                  items.length <= 1 && styles.deleteBtnDisabled,
                ]}
              >
                <Trash2
                  size={16}
                  color={items.length <= 1 ? "#CBD5E1" : "#EF4444"}
                />
              </Pressable>
            </View>
          ))}
        </View>

        {/* Result Card */}
        <View style={styles.resultCard}>
          <View style={styles.resultHeader}>
            <View style={styles.resultHeaderLeft}>
              <View style={styles.resultDot} />
              <Text style={styles.resultTitle}>ESTIMATED BILL</Text>
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
                  <Copy size={14} color="#EA580C" />
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
                <RotateCcw size={14} color="#EA580C" />
              </Pressable>
            </View>
          </View>

          {/* Main Hero Result */}
          <View style={styles.heroBox}>
            <Text style={styles.heroSubTitle}>TOTAL BILL</Text>
            <Text style={styles.heroValue}>
              {currency}
              {formatNumber(total, 2)}
            </Text>
            <View style={styles.badgePill}>
              <Text style={styles.badgePillText}>
                {totalItems} {totalItems === 1 ? "Item" : "Total Items"}
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
    color: "#EA580C",
  },
  listCard: {
    backgroundColor: "#FFF7ED",
    borderRadius: 20,
    padding: 16,
    borderWidth: 1,
    borderColor: "#FFEDD5",
    marginBottom: 20,
  },
  listHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 14,
  },
  listHeaderTitle: {
    fontSize: 11,
    fontWeight: "800",
    color: "#9A3412",
    letterSpacing: 0.6,
  },
  addBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#FED7AA",
  },
  addBtnText: {
    fontSize: 12,
    fontWeight: "700",
    color: "#EA580C",
  },
  itemRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 10,
  },
  itemNameInput: {
    flex: 2,
    height: 44,
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#FED7AA",
    paddingHorizontal: 12,
    fontSize: 14,
    fontWeight: "700",
    color: "#0F172A",
  },
  priceWrapper: {
    flex: 1.5,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#FED7AA",
    paddingHorizontal: 8,
    height: 44,
  },
  pricePrefix: {
    fontSize: 13,
    fontWeight: "800",
    color: "#94A3B8",
    marginRight: 4,
  },
  priceInput: {
    flex: 1,
    height: 44,
    fontSize: 14,
    fontWeight: "700",
    color: "#0F172A",
    padding: 0,
  },
  qtyWrapper: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#FED7AA",
    paddingHorizontal: 8,
    height: 44,
  },
  qtyPrefix: {
    fontSize: 12,
    fontWeight: "800",
    color: "#94A3B8",
    marginRight: 4,
  },
  qtyInput: {
    flex: 1,
    height: 44,
    fontSize: 14,
    fontWeight: "700",
    color: "#0F172A",
    padding: 0,
    textAlign: "center",
  },
  deleteBtn: {
    width: 36,
    height: 44,
    alignItems: "center",
    justifyContent: "center",
  },
  deleteBtnDisabled: {
    opacity: 0.4,
  },
  resultCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 24,
    padding: 18,
    borderWidth: 1,
    borderColor: "#FED7AA",
    shadowColor: "#EA580C",
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
    backgroundColor: "#EA580C",
  },
  resultTitle: {
    fontSize: 11,
    fontWeight: "800",
    color: "#9A3412",
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
    backgroundColor: "#FFF7ED",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#FED7AA",
  },
  actionBtnText: {
    fontSize: 11,
    fontWeight: "700",
    color: "#EA580C",
  },
  actionBtnIcon: {
    backgroundColor: "#FFF7ED",
    padding: 6,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#FED7AA",
  },
  heroBox: {
    backgroundColor: "#FFF7ED",
    borderRadius: 18,
    paddingVertical: 20,
    paddingHorizontal: 16,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#FED7AA",
  },
  heroSubTitle: {
    fontSize: 10,
    fontWeight: "800",
    color: "#9A3412",
    letterSpacing: 1.2,
    marginBottom: 4,
  },
  heroValue: {
    fontSize: 36,
    fontWeight: "900",
    color: "#7C2D12",
    letterSpacing: -0.5,
  },
  badgePill: {
    backgroundColor: "#FED7AA",
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 20,
    marginTop: 8,
  },
  badgePillText: {
    fontSize: 11,
    fontWeight: "700",
    color: "#9A3412",
  },
});
