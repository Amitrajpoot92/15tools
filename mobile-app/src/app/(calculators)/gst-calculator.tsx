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
  SegmentedTabs,
  CopyResetActions,
  StatTile,
  THEMES,
  sharedStyles,
} from "@/components/CalculatorUI";
import { Check, Receipt } from "lucide-react-native";

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

    return { net, gst, total, cgst: gst / 2, sgst: gst / 2, igst: gst };
  };

  const res = calculate();
  const formatNumber = (num: number) =>
    isNaN(num) ? "0" : num.toLocaleString("en-IN", { maximumFractionDigits: 2 });

  const handleCopy = async () => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    const text = `GST Calculator\nAmount: ₹${amount || 0}\nGST Rate: ${rate || 0}%\nGST Amount: ₹${formatNumber(
      res.gst
    )}\n${
      mode === "add" ? `Final Amount: ₹${formatNumber(res.total)}` : `Net Amount: ₹${formatNumber(res.net)}`
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
    <SafeAreaView style={sharedStyles.safeArea} edges={["top", "bottom"]}>
      <StatusBar style="dark" />
      <CalculatorHeader
        title="GST Calculator"
        subtitle="Add or remove GST from your price and see the GST amount and final price instantly."
        iconName="Receipt"
        color="purple"
      />

      <ScrollView
        contentContainerStyle={sharedStyles.scrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <OuterToolCard>
          <SegmentedTabs
            value={mode}
            onChange={setMode}
            accentColor={THEMES.purple.accent}
            options={[
              { key: "add", label: "Exclusive (Add GST)" },
              { key: "remove", label: "Inclusive (Remove GST)" },
            ]}
          />

          <FormPanel theme="purple">
            <Text style={sharedStyles.fieldLabel}>
              {mode === "add" ? "Net Amount (₹)" : "Total Amount (₹)"}
            </Text>
            <View style={sharedStyles.inputBox}>
              <Text style={[sharedStyles.affix, { marginRight: 6 }]}>₹</Text>
              <TextInput
                style={sharedStyles.textInput}
                keyboardType="numeric"
                value={amount}
                onChangeText={setAmount}
                placeholder="1000"
                placeholderTextColor="#94A3B8"
              />
            </View>

            <Text style={[sharedStyles.fieldLabel, { marginTop: 14 }]}>GST Rate (%)</Text>
            <View style={sharedStyles.inputBox}>
              <TextInput
                style={sharedStyles.textInput}
                keyboardType="numeric"
                value={rate}
                onChangeText={setRate}
                placeholder="18"
                placeholderTextColor="#94A3B8"
              />
              <Text style={sharedStyles.affix}>%</Text>
            </View>

            <View style={sharedStyles.chipRow}>
              {[5, 12, 18, 28].map((v) => (
                <Pressable
                  key={v}
                  onPress={() => {
                    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                    setRate(v.toString());
                  }}
                  style={[
                    sharedStyles.chip,
                    rate === v.toString() && { backgroundColor: "#FAF5FF", borderColor: "#C084FC" },
                  ]}
                >
                  <Text style={sharedStyles.chipText}>{v}%</Text>
                </Pressable>
              ))}
            </View>

            <Text style={[sharedStyles.fieldLabel, { marginTop: 14 }]}>GST Supply Type</Text>
            <View style={sharedStyles.grid2}>
              <Pressable
                onPress={() => {
                  Haptics.selectionAsync();
                  setStateType("intra");
                }}
                style={[styles.stateCard, stateType === "intra" && styles.stateCardActive]}
              >
                <View style={{ flex: 1 }}>
                  <Text style={[styles.stateTitle, stateType === "intra" && styles.stateTitleActive]}>
                    Intra-State
                  </Text>
                  <Text style={styles.stateSub}>CGST + SGST</Text>
                </View>
                <View style={[styles.radio, stateType === "intra" && styles.radioActive]}>
                  {stateType === "intra" && <Check size={11} color="#FFFFFF" strokeWidth={3} />}
                </View>
              </Pressable>

              <Pressable
                onPress={() => {
                  Haptics.selectionAsync();
                  setStateType("inter");
                }}
                style={[styles.stateCard, stateType === "inter" && styles.stateCardActive]}
              >
                <View style={{ flex: 1 }}>
                  <Text style={[styles.stateTitle, stateType === "inter" && styles.stateTitleActive]}>
                    Inter-State
                  </Text>
                  <Text style={styles.stateSub}>IGST</Text>
                </View>
                <View style={[styles.radio, stateType === "inter" && styles.radioActive]}>
                  {stateType === "inter" && <Check size={11} color="#FFFFFF" strokeWidth={3} />}
                </View>
              </Pressable>
            </View>
          </FormPanel>

          <ResultPanel theme="purple">
            <View style={sharedStyles.resultHeaderRow}>
              <View style={styles.kickerRow}>
                <Receipt size={15} color="#7E22CE" />
                <Text style={sharedStyles.resultKicker}>
                  {mode === "add" ? "Total Price (Incl. GST)" : "Net Price (Excl. GST)"}
                </Text>
              </View>
              <CopyResetActions copied={copied} onCopy={handleCopy} onReset={handleReset} theme="purple" />
            </View>

            <View style={styles.heroCard}>
              <Text style={styles.heroLabel}>Final Amount</Text>
              <Text style={styles.heroAmount}>
                ₹{formatNumber(mode === "add" ? res.total : res.net)}
              </Text>
              <View style={styles.badge}>
                <Text style={styles.badgeText}>
                  {rate || 0}% GST {mode === "add" ? "Included" : "Excluded"}
                </Text>
              </View>
            </View>

            <View style={[sharedStyles.grid2, { marginTop: 10 }]}>
              <StatTile label="Net Price" value={`₹${formatNumber(res.net)}`} borderColor="#E9D5FF" />
              <StatTile
                label="Total GST"
                value={`₹${formatNumber(res.gst)}`}
                valueColor="#7E22CE"
                borderColor="#E9D5FF"
              />
            </View>

            {stateType === "intra" ? (
              <View style={[sharedStyles.grid2, { marginTop: 8 }]}>
                <StatTile
                  label={`CGST (${(parseFloat(rate) || 0) / 2}%)`}
                  value={`₹${formatNumber(res.cgst)}`}
                  borderColor="#E9D5FF"
                />
                <StatTile
                  label={`SGST (${(parseFloat(rate) || 0) / 2}%)`}
                  value={`₹${formatNumber(res.sgst)}`}
                  borderColor="#E9D5FF"
                />
              </View>
            ) : (
              <View style={{ marginTop: 8 }}>
                <StatTile
                  label={`IGST (${rate || 0}%)`}
                  value={`₹${formatNumber(res.igst)}`}
                  valueColor="#6B21A8"
                  borderColor="#E9D5FF"
                />
              </View>
            )}
          </ResultPanel>
        </OuterToolCard>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  stateCard: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderWidth: 1.5,
    borderColor: "#E2E8F0",
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 9,
  },
  stateCardActive: {
    borderColor: "#9333EA",
    backgroundColor: "#FAF5FF",
  },
  stateTitle: {
    fontSize: 12,
    fontWeight: "800",
    color: "#0F172A",
  },
  stateTitleActive: {
    color: "#6B21A8",
  },
  stateSub: {
    fontSize: 10,
    fontWeight: "600",
    color: "#64748B",
  },
  radio: {
    width: 18,
    height: 18,
    borderRadius: 9,
    borderWidth: 1.5,
    borderColor: "#CBD5E1",
    alignItems: "center",
    justifyContent: "center",
  },
  radioActive: {
    backgroundColor: "#9333EA",
    borderColor: "#9333EA",
  },
  kickerRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    flex: 1,
  },
  heroCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    borderWidth: 1.5,
    borderColor: "#D8B4FE",
    paddingVertical: 14,
    paddingHorizontal: 14,
    alignItems: "center",
  },
  heroLabel: {
    fontSize: 11,
    fontWeight: "800",
    color: "#6B21A8",
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  heroAmount: {
    fontSize: 34,
    fontWeight: "900",
    color: "#0F172A",
    marginTop: 2,
  },
  badge: {
    marginTop: 6,
    backgroundColor: "#F3E8FF",
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 999,
  },
  badgeText: {
    fontSize: 11,
    fontWeight: "800",
    color: "#6B21A8",
  },
});
