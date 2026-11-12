import React, { useState } from "react";
import { View, Text, TextInput, ScrollView, Pressable, StyleSheet } from "react-native";
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
import { Plus, Trash2, ShoppingCart } from "lucide-react-native";

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
      { id: Date.now().toString(), name: "", price: "", quantity: "1" },
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

  const formatNumber = (num: number, maxDigits = 2) =>
    num.toLocaleString(currency === "₹" ? "en-IN" : "en-US", {
      minimumFractionDigits: num % 1 !== 0 ? 2 : 0,
      maximumFractionDigits: maxDigits,
    });

  const handleCopy = async () => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    let copyStr = "Grocery Bill Calculator\n--------------------\n";
    let index = 1;
    items.forEach((s) => {
      if (s.name || s.price) {
        const qty = parseFloat(s.quantity) || 1;
        const price = parseFloat(s.price) || 0;
        copyStr += `${index}. ${s.name || "Item"} - ${currency}${formatNumber(price)} × ${qty} = ${currency}${formatNumber(
          price * qty
        )}\n`;
        index++;
      }
    });
    copyStr += `--------------------\nTotal Bill: ${currency}${formatNumber(total)}\n\nCalculate Online: https://topcalcbox.com/grocery-bill-calculator/`;
    await Clipboard.setStringAsync(copyStr);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleReset = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    setItems(defaultItems);
  };

  return (
    <SafeAreaView style={sharedStyles.safeArea} edges={["top", "bottom"]}>
      <StatusBar style="dark" />
      <CalculatorHeader
        title="Grocery Bill Calculator"
        subtitle="Estimate your total shopping bill to stay within budget."
        iconName="ShoppingCart"
        color="orange"
      />

      <ScrollView
        contentContainerStyle={sharedStyles.scrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <OuterToolCard>
          <CurrencyToggle currency={currency} onChange={setCurrency} theme="orange" />

          <FormPanel theme="orange">
            <View style={styles.listHead}>
              <Text style={[sharedStyles.fieldLabel, { marginBottom: 0 }]}>Shopping List</Text>
              <Pressable onPress={addItem} style={styles.addBtn}>
                <Plus size={14} color="#FFFFFF" />
                <Text style={styles.addBtnText}>Add Item</Text>
              </Pressable>
            </View>

            <View style={{ gap: 8 }}>
              {items.map((item, index) => (
                <View key={item.id} style={styles.itemRow}>
                  <TextInput
                    style={styles.nameInput}
                    value={item.name}
                    onChangeText={(text) => updateItem(item.id, "name", text)}
                    placeholder={`Item ${index + 1}`}
                    placeholderTextColor="#94A3B8"
                  />

                  <View style={styles.priceBox}>
                    <Text style={styles.affix}>{currency}</Text>
                    <TextInput
                      style={styles.numInput}
                      keyboardType="numeric"
                      value={item.price}
                      onChangeText={(text) => updateItem(item.id, "price", text)}
                      placeholder="Price"
                      placeholderTextColor="#94A3B8"
                    />
                  </View>

                  <View style={styles.qtyBox}>
                    <Text style={styles.affix}>×</Text>
                    <TextInput
                      style={styles.numInput}
                      keyboardType="numeric"
                      value={item.quantity}
                      onChangeText={(text) => updateItem(item.id, "quantity", text)}
                      placeholder="1"
                      placeholderTextColor="#94A3B8"
                    />
                  </View>

                  <Pressable
                    onPress={() => removeItem(item.id)}
                    disabled={items.length <= 1}
                    style={[styles.trashBtn, items.length <= 1 && { opacity: 0.35 }]}
                  >
                    <Trash2 size={15} color="#EA580C" />
                  </Pressable>
                </View>
              ))}
            </View>
          </FormPanel>

          <ResultPanel theme="orange">
            <View style={sharedStyles.resultHeaderRow}>
              <View style={styles.kickerRow}>
                <ShoppingCart size={15} color="#EA580C" />
                <Text style={sharedStyles.resultKicker}>Estimated Total Bill</Text>
              </View>
              <CopyResetActions copied={copied} onCopy={handleCopy} onReset={handleReset} theme="orange" />
            </View>

            <Text style={[sharedStyles.heroValue, { color: "#7C2D12" }]}>
              {currency}
              {formatNumber(total)}
            </Text>

            <View style={[sharedStyles.grid2, { marginTop: 12 }]}>
              <StatTile label="Total Items" value={`${totalItems}`} borderColor="#FDBA74" />
              <StatTile
                label="Line Entries"
                value={`${items.length}`}
                valueColor="#EA580C"
                borderColor="#FDBA74"
              />
            </View>
          </ResultPanel>
        </OuterToolCard>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  listHead: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  addBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    backgroundColor: "#EA580C",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
  },
  addBtnText: { fontSize: 11, fontWeight: "800", color: "#FFFFFF" },
  itemRow: { flexDirection: "row", alignItems: "center", gap: 6 },
  nameInput: {
    flex: 1.25,
    height: 44,
    backgroundColor: "#FFFFFF",
    borderWidth: 1.5,
    borderColor: "#CBD5E1",
    borderRadius: 10,
    paddingHorizontal: 10,
    fontSize: 13,
    fontWeight: "700",
    color: "#0F172A",
  },
  priceBox: {
    flex: 0.9,
    height: 44,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderWidth: 1.5,
    borderColor: "#CBD5E1",
    borderRadius: 10,
    paddingHorizontal: 7,
  },
  qtyBox: {
    flex: 0.65,
    height: 44,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderWidth: 1.5,
    borderColor: "#CBD5E1",
    borderRadius: 10,
    paddingHorizontal: 7,
  },
  affix: { fontSize: 12, fontWeight: "800", color: "#475569", marginRight: 2 },
  numInput: { flex: 1, fontSize: 13, fontWeight: "800", color: "#0F172A", paddingVertical: 0 },
  trashBtn: {
    width: 34,
    height: 44,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#FED7AA",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  kickerRow: { flexDirection: "row", alignItems: "center", gap: 6, flex: 1 },
});
