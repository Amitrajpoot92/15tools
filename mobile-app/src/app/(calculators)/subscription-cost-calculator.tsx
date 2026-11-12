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
import { Plus, Trash2 } from "lucide-react-native";

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
    setSubs([...subs, { id: Date.now().toString(), name: "", cost: "", frequency: "monthly" }]);
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
        } else {
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
          }\nBilling Cycle: ${s.frequency === "monthly" ? "Monthly" : "Yearly"}`
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
    <SafeAreaView style={sharedStyles.safeArea} edges={["top", "bottom"]}>
      <StatusBar style="dark" />
      <CalculatorHeader
        title="Subscription Cost Calculator"
        subtitle="Add up all your digital subscriptions to see your true monthly and yearly expenses."
        iconName="Calculator"
        color="rose"
      />

      <ScrollView
        contentContainerStyle={sharedStyles.scrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <OuterToolCard>
          <CurrencyToggle currency={currency} onChange={setCurrency} theme="rose" />

          <FormPanel theme="rose">
            <View style={styles.listHead}>
              <Text style={[sharedStyles.fieldLabel, { marginBottom: 0 }]}>Your Subscriptions</Text>
              <Pressable onPress={addSub} style={styles.addBtn}>
                <Plus size={14} color="#FFFFFF" />
                <Text style={styles.addBtnText}>Add New</Text>
              </Pressable>
            </View>

            <View style={{ gap: 8 }}>
              {subs.map((sub, index) => (
                <View key={sub.id} style={styles.subRow}>
                  <TextInput
                    style={styles.nameInput}
                    value={sub.name}
                    onChangeText={(val) => updateSub(sub.id, "name", val)}
                    placeholder={`Sub ${index + 1}`}
                    placeholderTextColor="#94A3B8"
                  />

                  <View style={styles.costBox}>
                    <Text style={styles.prefix}>{currency}</Text>
                    <TextInput
                      style={styles.costInput}
                      keyboardType="numeric"
                      value={sub.cost}
                      onChangeText={(val) => updateSub(sub.id, "cost", val)}
                      placeholder="0"
                      placeholderTextColor="#94A3B8"
                    />
                  </View>

                  <Pressable
                    onPress={() => {
                      Haptics.selectionAsync();
                      updateSub(sub.id, "frequency", sub.frequency === "monthly" ? "yearly" : "monthly");
                    }}
                    style={styles.freqBtn}
                  >
                    <Text style={styles.freqText}>
                      {sub.frequency === "monthly" ? "/mo" : "/yr"}
                    </Text>
                  </Pressable>

                  <Pressable
                    onPress={() => removeSub(sub.id)}
                    disabled={subs.length <= 1}
                    style={[styles.trashBtn, subs.length <= 1 && { opacity: 0.35 }]}
                  >
                    <Trash2 size={15} color="#E11D48" />
                  </Pressable>
                </View>
              ))}
            </View>
          </FormPanel>

          <ResultPanel theme="rose">
            <View style={sharedStyles.resultHeaderRow}>
              <Text style={sharedStyles.resultKicker}>Expense Summary</Text>
              <CopyResetActions copied={copied} onCopy={handleCopy} onReset={handleReset} theme="rose" />
            </View>

            <View style={sharedStyles.grid2}>
              <StatTile
                label="Monthly Total"
                value={`${currency}${result.monthly}`}
                valueColor="#E11D48"
                borderColor="#FDA4AF"
              />
              <StatTile
                label="Yearly Total"
                value={`${currency}${result.yearly}`}
                valueColor="#881337"
                borderColor="#FDA4AF"
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
    backgroundColor: "#E11D48",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
  },
  addBtnText: {
    fontSize: 11,
    fontWeight: "800",
    color: "#FFFFFF",
  },
  subRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  nameInput: {
    flex: 1.3,
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
  costBox: {
    flex: 1,
    height: 44,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderWidth: 1.5,
    borderColor: "#CBD5E1",
    borderRadius: 10,
    paddingHorizontal: 8,
  },
  prefix: { fontSize: 13, fontWeight: "800", color: "#475569", marginRight: 2 },
  costInput: { flex: 1, fontSize: 14, fontWeight: "800", color: "#0F172A", paddingVertical: 0 },
  freqBtn: {
    height: 44,
    paddingHorizontal: 10,
    backgroundColor: "#FFFFFF",
    borderWidth: 1.5,
    borderColor: "#FDA4AF",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  freqText: { fontSize: 12, fontWeight: "800", color: "#9F1239" },
  trashBtn: {
    width: 36,
    height: 44,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#FECDD3",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
});
