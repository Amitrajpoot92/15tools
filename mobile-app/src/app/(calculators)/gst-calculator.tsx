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
import { Copy, RotateCcw, Check, Receipt } from "lucide-react-native";

type GSTMode = "add" | "remove";
type StateType = "intra" | "inter";

export default function GSTCalculatorScreen() {
  const [mode, setMode] = useState<GSTMode>("add");
  const [amount, setAmount] = useState("1000");
  const [rate, setRate] = useState("18");
  const [stateType, setStateType] = useState<StateType>("intra");
  const [copied, setCopied] = useState(false);

  const calculate = () => {
    const a = parseFloat(amount) || 0;
    const r = parseFloat(rate) || 0;

    let net = 0;
    let gst = 0;
    let total = 0;

    if (mode === "add") {
      net = a;
      gst = (a * r) / 100;
      total = a + gst;
    } else {
      total = a;
      gst = a - a * (100 / (100 + r));
      net = a - gst;
    }

    const cgst = gst / 2;
    const sgst = gst / 2;
    const igst = gst;

    return { net, gst, total, cgst, sgst, igst };
  };

  const res = calculate();

  const formatNumber = (num: number | string) => {
    const val = typeof num === "string" ? parseFloat(num) : num;
    if (isNaN(val)) return "0";
    return val.toLocaleString("en-IN", { maximumFractionDigits: 2 });
  };

  const handleCopy = async () => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    const text = `GST Calculator\nAmount: ₹${amount}\nGST Rate: ${rate}%\nGST Amount: ₹${formatNumber(
      res.gst
    )}\n${
      mode === "add"
        ? "Final Amount: ₹" + formatNumber(res.total)
        : "Net Amount: ₹" + formatNumber(res.net)
    }\n\nCalculate Online: https://topcalcbox.com/gst-calculator/`;
    await Clipboard.setStringAsync(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleReset = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    setAmount("");
    setRate("18");
    setStateType("intra");
    setMode("add");
  };

  return (
    <SafeAreaView style={styles.container} edges={["top", "bottom"]}>
      <StatusBar style="dark" />
      <CalculatorHeader
        title="GST Calculator"
        subtitle="Add or remove Goods and Services Tax (GST) from your amounts with ease."
        iconName="Receipt"
        themeColor="#9333EA"
        themeBg="#FAF5FF"
      />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {/* Mode Selector Tabs */}
        <View style={styles.tabContainer}>
          <Pressable
            onPress={() => {
              Haptics.selectionAsync();
              setMode("add");
            }}
            style={[styles.tabBtn, mode === "add" && styles.tabBtnActive]}
          >
            <Text style={[styles.tabTitle, mode === "add" && styles.tabTitleActive]}>
              Exclusive GST
            </Text>
            <Text style={[styles.tabSubtitle, mode === "add" && styles.tabSubtitleActive]}>
              (Add GST)
            </Text>
          </Pressable>

          <Pressable
            onPress={() => {
              Haptics.selectionAsync();
              setMode("remove");
            }}
            style={[styles.tabBtn, mode === "remove" && styles.tabBtnActive]}
          >
            <Text style={[styles.tabTitle, mode === "remove" && styles.tabTitleActive]}>
              Inclusive GST
            </Text>
            <Text style={[styles.tabSubtitle, mode === "remove" && styles.tabSubtitleActive]}>
              (Remove GST)
            </Text>
          </Pressable>
        </View>

        {/* Inputs Card */}
        <View style={styles.inputCard}>
          {/* Amount Input */}
          <Text style={styles.inputLabel}>
            {mode === "add" ? "NET AMOUNT (₹)" : "TOTAL AMOUNT (₹)"}
          </Text>
          <View style={styles.inputWrapper}>
            <Text style={styles.prefix}>₹</Text>
            <TextInput
              style={styles.textInput}
              keyboardType="numeric"
              value={amount}
              onChangeText={setAmount}
              placeholder="1000"
              placeholderTextColor="#94A3B8"
            />
          </View>

          {/* Rate Input */}
          <Text style={[styles.inputLabel, { marginTop: 16 }]}>GST RATE (%)</Text>
          <View style={styles.inputWrapper}>
            <TextInput
              style={styles.textInput}
              keyboardType="numeric"
              value={rate}
              onChangeText={setRate}
              placeholder="18"
              placeholderTextColor="#94A3B8"
            />
            <Text style={styles.suffix}>%</Text>
          </View>

          {/* Quick GST Chips */}
          <View style={styles.chipRow}>
            {[5, 12, 18, 28].map((v) => (
              <Pressable
                key={v}
                onPress={() => {
                  Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                  setRate(v.toString());
                }}
                style={styles.chipBtn}
              >
                <Text style={styles.chipText}>{v}%</Text>
              </Pressable>
            ))}
          </View>

          {/* GST Type (Intra / Inter State) */}
          <Text style={[styles.inputLabel, { marginTop: 18 }]}>GST TYPE</Text>
          <View style={styles.stateTypeRow}>
            <Pressable
              onPress={() => {
                Haptics.selectionAsync();
                setStateType("intra");
              }}
              style={[
                styles.stateTypeCard,
                stateType === "intra" && styles.stateTypeCardActive,
              ]}
            >
              <View>
                <Text
                  style={[
                    styles.stateTypeTitle,
                    stateType === "intra" && styles.stateTypeTitleActive,
                  ]}
                >
                  Intra-State
                </Text>
                <Text style={styles.stateTypeSub}>CGST + SGST</Text>
              </View>
              <View
                style={[
                  styles.radioDot,
                  stateType === "intra" && styles.radioDotActive,
                ]}
              >
                {stateType === "intra" && <Check size={12} color="#FFFFFF" strokeWidth={3} />}
              </View>
            </Pressable>

            <Pressable
              onPress={() => {
                Haptics.selectionAsync();
                setStateType("inter");
              }}
              style={[
                styles.stateTypeCard,
                stateType === "inter" && styles.stateTypeCardActive,
              ]}
            >
              <View>
                <Text
                  style={[
                    styles.stateTypeTitle,
                    stateType === "inter" && styles.stateTypeTitleActive,
                  ]}
                >
                  Inter-State
                </Text>
                <Text style={styles.stateTypeSub}>IGST</Text>
              </View>
              <View
                style={[
                  styles.radioDot,
                  stateType === "inter" && styles.radioDotActive,
                ]}
              >
                {stateType === "inter" && <Check size={12} color="#FFFFFF" strokeWidth={3} />}
              </View>
            </Pressable>
          </View>
        </View>

        {/* Result Box */}
        <View style={styles.resultBox}>
          <View style={styles.resultHeader}>
            <View style={styles.headerTitleGroup}>
              <Receipt size={16} color="#7E22CE" />
              <Text style={styles.resultCategory}>
                {mode === "add" ? "TOTAL PRICE (INCL. GST)" : "NET PRICE (EXCL. GST)"}
              </Text>
            </View>
            <View style={styles.actionButtons}>
              <Pressable onPress={handleCopy} style={styles.copyBtn}>
                {copied ? <Check size={14} color="#059669" /> : <Copy size={14} color="#7E22CE" />}
                <Text style={[styles.copyBtnText, copied && { color: "#059669" }]}>
                  {copied ? "Copied" : "Copy"}
                </Text>
              </Pressable>
              <Pressable onPress={handleReset} style={styles.resetBtn}>
                <RotateCcw size={15} color="#7E22CE" />
              </Pressable>
            </View>
          </View>

          {/* Final Amount Hero */}
          <View style={styles.finalHeroCard}>
            <Text style={styles.finalHeroLabel}>FINAL AMOUNT</Text>
            <View style={styles.finalHeroPriceRow}>
              <Text style={styles.finalHeroSymbol}>₹</Text>
              <Text style={styles.finalHeroPrice}>
                {formatNumber(mode === "add" ? res.total : res.net)}
              </Text>
            </View>
            <View style={styles.badge}>
              <Text style={styles.badgeText}>
                {rate}% GST {mode === "add" ? "Included" : "Excluded"}
              </Text>
            </View>
          </View>

          {/* Breakdown Rows */}
          <View style={styles.breakdownCard}>
            <View style={styles.breakdownRow}>
              <Text style={styles.breakdownLabel}>Net Amount</Text>
              <Text style={styles.breakdownValue}>₹{formatNumber(res.net)}</Text>
            </View>

            {stateType === "intra" ? (
              <>
                <View style={styles.breakdownRow}>
                  <Text style={styles.breakdownLabel}>
                    CGST ({(parseFloat(rate) / 2 || 0)}%)
                  </Text>
                  <Text style={[styles.breakdownValue, { color: "#7E22CE" }]}>
                    +₹{formatNumber(res.cgst)}
                  </Text>
                </View>
                <View style={styles.breakdownRow}>
                  <Text style={styles.breakdownLabel}>
                    SGST ({(parseFloat(rate) / 2 || 0)}%)
                  </Text>
                  <Text style={[styles.breakdownValue, { color: "#7E22CE" }]}>
                    +₹{formatNumber(res.sgst)}
                  </Text>
                </View>
              </>
            ) : (
              <View style={styles.breakdownRow}>
                <Text style={styles.breakdownLabel}>IGST ({rate || 0}%)</Text>
                <Text style={[styles.breakdownValue, { color: "#7E22CE" }]}>
                  +₹{formatNumber(res.igst)}
                </Text>
              </View>
            )}

            <View style={[styles.breakdownRow, styles.totalRow]}>
              <Text style={styles.totalRowLabel}>Total Amount</Text>
              <Text style={styles.totalRowValue}>₹{formatNumber(res.total)}</Text>
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
  tabContainer: {
    flexDirection: "row",
    backgroundColor: "#F1F5F9",
    borderRadius: 16,
    padding: 4,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },
  tabBtn: {
    flex: 1,
    paddingVertical: 10,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 12,
  },
  tabBtnActive: {
    backgroundColor: "#FFFFFF",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  tabTitle: {
    fontSize: 12,
    fontWeight: "700",
    color: "#64748B",
  },
  tabTitleActive: {
    color: "#7E22CE",
    fontWeight: "800",
  },
  tabSubtitle: {
    fontSize: 10,
    color: "#94A3B8",
    fontWeight: "500",
  },
  tabSubtitleActive: {
    color: "#9333EA",
    fontWeight: "600",
  },
  inputCard: {
    backgroundColor: "#FAF5FF",
    borderRadius: 20,
    padding: 18,
    borderWidth: 1,
    borderColor: "#F3E8FF",
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 11,
    fontWeight: "800",
    color: "#6B21A8",
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
    fontSize: 18,
    fontWeight: "800",
    color: "#94A3B8",
    marginLeft: 6,
  },
  chipRow: {
    flexDirection: "row",
    marginTop: 10,
    gap: 6,
  },
  chipBtn: {
    flex: 1,
    backgroundColor: "#E2E8F0",
    paddingVertical: 7,
    borderRadius: 8,
    alignItems: "center",
  },
  chipText: {
    fontSize: 11,
    fontWeight: "800",
    color: "#6B21A8",
  },
  stateTypeRow: {
    flexDirection: "row",
    gap: 10,
  },
  stateTypeCard: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderWidth: 1.5,
    borderColor: "#E2E8F0",
    borderRadius: 14,
    padding: 12,
  },
  stateTypeCardActive: {
    borderColor: "#A855F7",
    backgroundColor: "#FAF5FF",
  },
  stateTypeTitle: {
    fontSize: 13,
    fontWeight: "700",
    color: "#334155",
  },
  stateTypeTitleActive: {
    color: "#7E22CE",
    fontWeight: "800",
  },
  stateTypeSub: {
    fontSize: 10,
    color: "#64748B",
    marginTop: 2,
  },
  radioDot: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: "#CBD5E1",
    justifyContent: "center",
    alignItems: "center",
  },
  radioDotActive: {
    backgroundColor: "#9333EA",
    borderColor: "#9333EA",
  },
  resultBox: {
    backgroundColor: "#FAF5FF",
    borderRadius: 22,
    padding: 18,
    borderWidth: 1.5,
    borderColor: "#E9D5FF",
    shadowColor: "#9333EA",
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
  headerTitleGroup: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    flex: 1,
  },
  resultCategory: {
    fontSize: 11,
    fontWeight: "800",
    color: "#6B21A8",
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
    borderColor: "#E9D5FF",
    gap: 4,
  },
  copyBtnText: {
    fontSize: 11,
    fontWeight: "800",
    color: "#6B21A8",
  },
  resetBtn: {
    width: 30,
    height: 30,
    borderRadius: 8,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E9D5FF",
  },
  finalHeroCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 16,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#F3E8FF",
    marginBottom: 12,
  },
  finalHeroLabel: {
    fontSize: 10,
    fontWeight: "800",
    color: "#7E22CE",
    letterSpacing: 1,
    marginBottom: 4,
  },
  finalHeroPriceRow: {
    flexDirection: "row",
    alignItems: "baseline",
    marginBottom: 8,
  },
  finalHeroSymbol: {
    fontSize: 24,
    fontWeight: "700",
    color: "#94A3B8",
    marginRight: 4,
  },
  finalHeroPrice: {
    fontSize: 38,
    fontWeight: "900",
    color: "#0F172A",
    letterSpacing: -1,
  },
  badge: {
    backgroundColor: "#F3E8FF",
    borderWidth: 1,
    borderColor: "#E9D5FF",
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 20,
  },
  badgeText: {
    fontSize: 10,
    fontWeight: "800",
    color: "#7E22CE",
    textTransform: "uppercase",
  },
  breakdownCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 14,
    borderWidth: 1,
    borderColor: "#F3E8FF",
    gap: 8,
  },
  breakdownRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#F8FAFC",
    padding: 10,
    borderRadius: 10,
  },
  breakdownLabel: {
    fontSize: 12,
    fontWeight: "700",
    color: "#475569",
  },
  breakdownValue: {
    fontSize: 13,
    fontWeight: "900",
    color: "#0F172A",
  },
  totalRow: {
    backgroundColor: "#FAF5FF",
    borderWidth: 1,
    borderColor: "#F3E8FF",
    marginTop: 4,
  },
  totalRowLabel: {
    fontSize: 12,
    fontWeight: "900",
    color: "#6B21A8",
  },
  totalRowValue: {
    fontSize: 14,
    fontWeight: "900",
    color: "#6B21A8",
  },
});
