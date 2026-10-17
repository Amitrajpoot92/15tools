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
import { calculateGST } from "@/lib/calculations/finance";
import { Copy, RotateCcw, Check } from "lucide-react-native";

export default function GSTCalculatorScreen() {
  const [mode, setMode] = useState<"add" | "remove">("add");
  const [amount, setAmount] = useState("1000");
  const [rate, setRate] = useState("18");
  const [stateType, setStateType] = useState<"intra" | "inter">("intra");
  const [copied, setCopied] = useState(false);

  const numAmount = parseFloat(amount) || 0;
  const numRate = parseFloat(rate) || 0;
  const result = calculateGST(numAmount, numRate, mode);

  const formatCurrency = (val: number) => {
    return "₹" + val.toLocaleString("en-IN", { maximumFractionDigits: 2 });
  };

  const handleCopy = async () => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    const summary = `GST Calculation:\nNet Amount: ${formatCurrency(result.net)}\nGST (${rate}%): ${formatCurrency(result.gst)}\nTotal: ${formatCurrency(result.total)}`;
    await Clipboard.setStringAsync(summary);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleReset = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    setAmount("");
    setRate("18");
  };

  return (
    <SafeAreaView style={styles.container} edges={["top", "bottom"]}>
      <StatusBar style="dark" />
      <CalculatorHeader
        title="GST Calculator"
        subtitle="Add or remove Goods and Services Tax with instant CGST/SGST/IGST tax breakup."
        iconName="Receipt"
        themeColor="#F43F5E"
        themeBg="#FFF1F2"
      />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Mode Selector Tabs */}
        <View style={styles.tabContainer}>
          <Pressable
            style={[styles.tab, mode === "add" && styles.activeTab]}
            onPress={() => {
              Haptics.selectionAsync();
              setMode("add");
            }}
          >
            <Text style={[styles.tabText, mode === "add" && styles.activeTabText]}>
              Exclusive GST (Add)
            </Text>
          </Pressable>
          <Pressable
            style={[styles.tab, mode === "remove" && styles.activeTab]}
            onPress={() => {
              Haptics.selectionAsync();
              setMode("remove");
            }}
          >
            <Text style={[styles.tabText, mode === "remove" && styles.activeTabText]}>
              Inclusive GST (Remove)
            </Text>
          </Pressable>
        </View>

        {/* Input Card */}
        <View style={styles.card}>
          <Text style={styles.inputLabel}>
            {mode === "add" ? "NET AMOUNT (₹)" : "TOTAL AMOUNT INCL. GST (₹)"}
          </Text>
          <View style={styles.inputWrapper}>
            <Text style={styles.currencyPrefix}>₹</Text>
            <TextInput
              style={styles.textInput}
              keyboardType="decimal-pad"
              value={amount}
              onChangeText={setAmount}
              placeholder="0"
              placeholderTextColor="#94A3B8"
            />
          </View>

          {/* Quick Rate Pills */}
          <Text style={[styles.inputLabel, { marginTop: 14 }]}>GST RATE (%)</Text>
          <View style={styles.rateRow}>
            {["5", "12", "18", "28"].map((r) => (
              <Pressable
                key={r}
                onPress={() => {
                  Haptics.selectionAsync();
                  setRate(r);
                }}
                style={[styles.ratePill, rate === r && styles.activeRatePill]}
              >
                <Text
                  style={[
                    styles.ratePillText,
                    rate === r && styles.activeRatePillText,
                  ]}
                >
                  {r}%
                </Text>
              </Pressable>
            ))}
          </View>

          {/* State Type Switch */}
          <View style={styles.stateTypeRow}>
            <Pressable
              onPress={() => {
                Haptics.selectionAsync();
                setStateType("intra");
              }}
              style={[
                styles.stateBtn,
                stateType === "intra" && styles.activeStateBtn,
              ]}
            >
              <Text
                style={[
                  styles.stateBtnText,
                  stateType === "intra" && styles.activeStateBtnText,
                ]}
              >
                Intra-State (CGST + SGST)
              </Text>
            </Pressable>
            <Pressable
              onPress={() => {
                Haptics.selectionAsync();
                setStateType("inter");
              }}
              style={[
                styles.stateBtn,
                stateType === "inter" && styles.activeStateBtn,
              ]}
            >
              <Text
                style={[
                  styles.stateBtnText,
                  stateType === "inter" && styles.activeStateBtnText,
                ]}
              >
                Inter-State (IGST)
              </Text>
            </Pressable>
          </View>
        </View>

        {/* Results Card */}
        <View style={styles.resultCard}>
          <View style={styles.resultHeader}>
            <Text style={styles.resultTitle}>Calculation Result</Text>
            <View style={styles.actionButtons}>
              <Pressable onPress={handleCopy} style={styles.iconBtn}>
                {copied ? (
                  <Check size={16} color="#16A34A" />
                ) : (
                  <Copy size={16} color="#64748B" />
                )}
              </Pressable>
              <Pressable onPress={handleReset} style={styles.iconBtn}>
                <RotateCcw size={16} color="#64748B" />
              </Pressable>
            </View>
          </View>

          {/* Big Total */}
          <View style={styles.totalBlock}>
            <Text style={styles.totalLabel}>
              {mode === "add" ? "FINAL TOTAL PRICE" : "ORIGINAL NET AMOUNT"}
            </Text>
            <Text style={styles.totalValue}>
              {formatCurrency(mode === "add" ? result.total : result.net)}
            </Text>
          </View>

          {/* Detailed Breakdown */}
          <View style={styles.breakdownRow}>
            <Text style={styles.breakdownLabel}>GST Tax ({rate}%):</Text>
            <Text style={styles.breakdownValue}>{formatCurrency(result.gst)}</Text>
          </View>

          {stateType === "intra" ? (
            <>
              <View style={styles.breakdownRow}>
                <Text style={styles.breakdownLabel}>CGST ({numRate / 2}%):</Text>
                <Text style={styles.breakdownValue}>{formatCurrency(result.cgst)}</Text>
              </View>
              <View style={styles.breakdownRow}>
                <Text style={styles.breakdownLabel}>SGST ({numRate / 2}%):</Text>
                <Text style={styles.breakdownValue}>{formatCurrency(result.sgst)}</Text>
              </View>
            </>
          ) : (
            <View style={styles.breakdownRow}>
              <Text style={styles.breakdownLabel}>IGST ({numRate}%):</Text>
              <Text style={styles.breakdownValue}>{formatCurrency(result.igst)}</Text>
            </View>
          )}

          <View style={[styles.breakdownRow, styles.lastBreakdownRow]}>
            <Text style={styles.breakdownLabel}>
              {mode === "add" ? "Net (Base Price):" : "Total (with GST):"}
            </Text>
            <Text style={[styles.breakdownValue, { fontWeight: "800" }]}>
              {formatCurrency(mode === "add" ? result.net : result.total)}
            </Text>
          </View>
        </View>

        {/* Formula Explainer */}
        <View style={styles.formulaCard}>
          <Text style={styles.formulaTitle}>GST Calculation Formula</Text>
          <Text style={styles.formulaText}>
            • Add GST: GST Amount = (Amount × Rate) ÷ 100{"\n"}
            • Remove GST: GST = Total - (Total × (100 ÷ (100 + Rate)))
          </Text>
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
  tabContainer: {
    flexDirection: "row",
    backgroundColor: "#E2E8F0",
    borderRadius: 14,
    padding: 4,
    marginBottom: 14,
  },
  tab: {
    flex: 1,
    paddingVertical: 9,
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
    fontSize: 12,
    fontWeight: "600",
    color: "#64748B",
  },
  activeTabText: {
    color: "#0F172A",
    fontWeight: "800",
  },
  card: {
    backgroundColor: "#ffffff",
    borderRadius: 20,
    padding: 16,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 11,
    fontWeight: "800",
    color: "#64748B",
    letterSpacing: 0.5,
    marginBottom: 6,
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
  currencyPrefix: {
    fontSize: 18,
    fontWeight: "800",
    color: "#94A3B8",
    marginRight: 6,
  },
  textInput: {
    flex: 1,
    fontSize: 18,
    fontWeight: "700",
    color: "#0F172A",
  },
  rateRow: {
    flexDirection: "row",
    gap: 8,
    marginBottom: 12,
  },
  ratePill: {
    flex: 1,
    backgroundColor: "#F1F5F9",
    paddingVertical: 10,
    borderRadius: 12,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },
  activeRatePill: {
    backgroundColor: "#F43F5E",
    borderColor: "#E11D48",
  },
  ratePillText: {
    fontSize: 13,
    fontWeight: "800",
    color: "#475569",
  },
  activeRatePillText: {
    color: "#ffffff",
  },
  stateTypeRow: {
    flexDirection: "row",
    gap: 8,
    marginTop: 6,
  },
  stateBtn: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 6,
    borderRadius: 10,
    backgroundColor: "#F8FAFC",
    borderWidth: 1,
    borderColor: "#E2E8F0",
    alignItems: "center",
  },
  activeStateBtn: {
    backgroundColor: "#EFF6FF",
    borderColor: "#BFDBFE",
  },
  stateBtnText: {
    fontSize: 10,
    fontWeight: "700",
    color: "#64748B",
    textAlign: "center",
  },
  activeStateBtnText: {
    color: "#1D4ED8",
  },
  resultCard: {
    backgroundColor: "#ffffff",
    borderRadius: 20,
    padding: 16,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 3,
  },
  resultHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
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
    backgroundColor: "#FFF1F2",
    borderRadius: 16,
    padding: 16,
    alignItems: "center",
    marginBottom: 14,
    borderWidth: 1,
    borderColor: "#FFE4E6",
  },
  totalLabel: {
    fontSize: 11,
    fontWeight: "800",
    color: "#9F1239",
    letterSpacing: 0.5,
    marginBottom: 4,
  },
  totalValue: {
    fontSize: 28,
    fontWeight: "900",
    color: "#E11D48",
  },
  breakdownRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#F1F5F9",
  },
  lastBreakdownRow: {
    borderBottomWidth: 0,
    paddingTop: 10,
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
  formulaCard: {
    backgroundColor: "#ffffff",
    borderRadius: 16,
    padding: 14,
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },
  formulaTitle: {
    fontSize: 12,
    fontWeight: "800",
    color: "#334155",
    marginBottom: 4,
  },
  formulaText: {
    fontSize: 11,
    color: "#64748B",
    lineHeight: 16,
  },
});
