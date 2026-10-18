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
import { Copy, RotateCcw, Check, Plus, Trash2, Calculator } from "lucide-react-native";

interface Subscription {
  id: string;
  name: string;
  cost: string;
  frequency: "monthly" | "yearly";
}

const defaultSubs: Subscription[] = [
  { id: "1", name: "Netflix", cost: "15.99", frequency: "monthly" },
  { id: "2", name: "Spotify", cost: "10.99", frequency: "monthly" },
];

export default function SubscriptionCostCalculatorScreen() {
  const [subs, setSubs] = useState<Subscription[]>(defaultSubs);
  const [currency, setCurrency] = useState<"₹" | "$">("₹");
  const [copied, setCopied] = useState(false);

  const addSub = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setSubs([
      ...subs,
      {
        id: Date.now().toString(),
        name: "",
        cost: "",
        frequency: "monthly",
      },
    ]);
  };

  const removeSub = (id: string) => {
    if (subs.length > 1) {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
      setSubs(subs.filter((s) => s.id !== id));
    }
  };

  const updateSub = (id: string, field: keyof Subscription, value: string) => {
    setSubs(subs.map((s) => (s.id === id ? { ...s, [field]: value } : s)));
  };

  const calculate = () => {
    let monthly = 0;
    let yearly = 0;

    subs.forEach((sub) => {
      const c = parseFloat(sub.cost);
      if (!isNaN(c) && c > 0) {
        if (sub.frequency === "monthly") {
          monthly += c;
          yearly += c * 12;
        } else if (sub.frequency === "yearly") {
          monthly += c / 12;
          yearly += c;
        }
      }
    });

    return {
      monthly: monthly.toFixed(2).replace(/\.00$/, ""),
      yearly: yearly.toFixed(2).replace(/\.00$/, ""),
    };
  };

  const result = calculate();

  const handleCopy = async () => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    const subsText = subs
      .filter((s) => s.name || s.cost)
      .map(
        (s) =>
          `Subscription: ${s.name || "Unnamed"}\nCost: ${currency}${
            s.cost || 0
          }\nBilling Cycle: ${
            s.frequency.charAt(0).toUpperCase() + s.frequency.slice(1)
          }`
      )
      .join("\n\n");

    const text = `Subscription Cost Calculator\n${subsText}\n\nTotal Monthly Cost: ${currency}${result.monthly}\nTotal Yearly Cost: ${currency}${result.yearly}\n\nCalculate Online: https://topcalcbox.com/subscription-cost-calculator/`;
    await Clipboard.setStringAsync(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleReset = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    setSubs(defaultSubs);
  };

  return (
    <SafeAreaView style={styles.container} edges={["top", "bottom"]}>
      <StatusBar style="dark" />
      <CalculatorHeader
        title="Subscription Cost Calculator"
        subtitle="Add up all your monthly subscriptions to see your true annual costs."
        iconName="Calculator"
        themeColor="#E11D48"
        themeBg="#FFF1F2"
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

        {/* Subscriptions List Card */}
        <View style={styles.inputCard}>
          <View style={styles.listHeaderRow}>
            <Text style={styles.inputLabel}>YOUR SUBSCRIPTIONS</Text>
            <Pressable onPress={addSub} style={styles.addBtn}>
              <Plus size={14} color="#E11D48" />
              <Text style={styles.addBtnText}>Add New</Text>
            </Pressable>
          </View>

          <View style={styles.subsList}>
            {subs.map((sub, index) => (
              <View key={sub.id} style={styles.subItemRow}>
                {/* Name */}
                <TextInput
                  style={styles.subNameInput}
                  value={sub.name}
                  onChangeText={(val) => updateSub(sub.id, "name", val)}
                  placeholder={`Sub ${index + 1}`}
                  placeholderTextColor="#94A3B8"
                />

                {/* Cost */}
                <View style={styles.subCostWrapper}>
                  <Text style={styles.subPrefix}>{currency}</Text>
                  <TextInput
                    style={styles.subCostInput}
                    keyboardType="numeric"
                    value={sub.cost}
                    onChangeText={(val) => updateSub(sub.id, "cost", val)}
                    placeholder="0"
                    placeholderTextColor="#94A3B8"
                  />
                </View>

                {/* Frequency Toggle */}
                <Pressable
                  onPress={() => {
                    Haptics.selectionAsync();
                    updateSub(
                      sub.id,
                      "frequency",
                      sub.frequency === "monthly" ? "yearly" : "monthly"
                    );
                  }}
                  style={styles.freqBadge}
                >
                  <Text style={styles.freqBadgeText}>
                    {sub.frequency === "monthly" ? "/mo" : "/yr"}
                  </Text>
                </Pressable>

                {/* Delete button */}
                <Pressable
                  onPress={() => removeSub(sub.id)}
                  disabled={subs.length === 1}
                  style={[
                    styles.deleteBtn,
                    subs.length === 1 && { opacity: 0.3 },
                  ]}
                >
                  <Trash2 size={16} color={subs.length > 1 ? "#EF4444" : "#94A3B8"} />
                </Pressable>
              </View>
            ))}
          </View>
        </View>

        {/* Result Box */}
        <View style={styles.resultBox}>
          <View style={styles.resultHeader}>
            <View />
            <View style={styles.actionButtons}>
              <Pressable onPress={handleCopy} style={styles.copyBtn}>
                {copied ? <Check size={14} color="#059669" /> : <Copy size={14} color="#E11D48" />}
                <Text style={[styles.copyBtnText, copied && { color: "#059669" }]}>
                  {copied ? "Copied" : "Copy"}
                </Text>
              </Pressable>
              <Pressable onPress={handleReset} style={styles.resetBtn}>
                <RotateCcw size={15} color="#E11D48" />
              </Pressable>
            </View>
          </View>

          {/* Calculator Icon Badge */}
          <View style={styles.iconCircle}>
            <Calculator size={28} color="#E11D48" />
          </View>

          <Text style={styles.resultCategory}>TOTAL MONTHLY COST</Text>
          <View style={styles.priceRow}>
            <Text style={styles.currencySymbol}>{currency}</Text>
            <Text style={styles.finalPriceText}>{result.monthly}</Text>
          </View>

          {/* Yearly Cost Card */}
          <View style={styles.yearlyCard}>
            <Text style={styles.yearlyLabel}>Total Yearly Cost</Text>
            <Text style={styles.yearlyValue}>
              {currency}{result.yearly}
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
    color: "#E11D48",
    fontWeight: "900",
  },
  inputCard: {
    backgroundColor: "#FFF1F2",
    borderRadius: 20,
    padding: 16,
    borderWidth: 1,
    borderColor: "#FFE4E6",
    marginBottom: 16,
  },
  listHeaderRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  inputLabel: {
    fontSize: 11,
    fontWeight: "800",
    color: "#BE123C",
    letterSpacing: 0.5,
  },
  addBtn: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFE4E6",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
    gap: 4,
  },
  addBtnText: {
    fontSize: 11,
    fontWeight: "800",
    color: "#E11D48",
  },
  subsList: {
    gap: 10,
  },
  subItemRow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    padding: 8,
    borderWidth: 1,
    borderColor: "#FECDD3",
    gap: 6,
  },
  subNameInput: {
    flex: 1.2,
    height: 40,
    backgroundColor: "#F8FAFC",
    borderRadius: 8,
    paddingHorizontal: 10,
    fontSize: 14,
    fontWeight: "700",
    color: "#0F172A",
  },
  subCostWrapper: {
    flex: 1,
    height: 40,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F8FAFC",
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  subPrefix: {
    fontSize: 14,
    fontWeight: "700",
    color: "#94A3B8",
    marginRight: 4,
  },
  subCostInput: {
    flex: 1,
    fontSize: 14,
    fontWeight: "800",
    color: "#0F172A",
  },
  freqBadge: {
    backgroundColor: "#F1F5F9",
    paddingHorizontal: 8,
    height: 40,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  freqBadgeText: {
    fontSize: 11,
    fontWeight: "800",
    color: "#475569",
  },
  deleteBtn: {
    width: 36,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  resultBox: {
    backgroundColor: "#FFE4E6",
    borderRadius: 22,
    padding: 20,
    borderWidth: 1.5,
    borderColor: "#FECDD3",
    alignItems: "center",
    shadowColor: "#E11D48",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 3,
  },
  resultHeader: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
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
    borderColor: "#FECDD3",
    gap: 4,
  },
  copyBtnText: {
    fontSize: 11,
    fontWeight: "800",
    color: "#E11D48",
  },
  resetBtn: {
    width: 30,
    height: 30,
    borderRadius: 8,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#FECDD3",
  },
  iconCircle: {
    width: 56,
    height: 56,
    borderRadius: 16,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 6,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  resultCategory: {
    fontSize: 12,
    fontWeight: "800",
    color: "#9F1239",
    letterSpacing: 1,
    marginBottom: 4,
  },
  priceRow: {
    flexDirection: "row",
    alignItems: "baseline",
    marginBottom: 18,
  },
  currencySymbol: {
    fontSize: 28,
    fontWeight: "800",
    color: "#E11D48",
    marginRight: 4,
  },
  finalPriceText: {
    fontSize: 46,
    fontWeight: "900",
    color: "#0F172A",
    letterSpacing: -1,
  },
  yearlyCard: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    padding: 16,
    borderWidth: 1,
    borderColor: "#FECDD3",
  },
  yearlyLabel: {
    fontSize: 13,
    fontWeight: "700",
    color: "#475569",
  },
  yearlyValue: {
    fontSize: 18,
    fontWeight: "900",
    color: "#0F172A",
  },
});
