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

export default function DiscountCalculatorScreen() {
  const [originalPrice, setOriginalPrice] = useState("100");
  const [discountType, setDiscountType] = useState<"percent" | "flat">("percent");
  const [discount, setDiscount] = useState("20");
  const [coupon, setCoupon] = useState("");
  const [copied, setCopied] = useState(false);
  const [currency, setCurrency] = useState<"₹" | "$">("₹");

  const calculate = () => {
    const price = parseFloat(originalPrice) || 0;
    const disc = parseFloat(discount) || 0;
    const coup = parseFloat(coupon) || 0;

    let baseDiscountAmount = discountType === "percent" ? price * (disc / 100) : disc;
    if (baseDiscountAmount > price) baseDiscountAmount = price;

    const priceAfterBase = price - baseDiscountAmount;
    let couponAmount = priceAfterBase * (coup / 100);
    if (couponAmount > priceAfterBase) couponAmount = priceAfterBase;

    const totalSaved = baseDiscountAmount + couponAmount;
    const finalPrice = price - totalSaved;
    const savePercent = price > 0 ? (totalSaved / price) * 100 : 0;

    return {
      price,
      finalPrice: finalPrice.toFixed(2).replace(/\.00$/, ""),
      totalSaved: totalSaved.toFixed(2).replace(/\.00$/, ""),
      savePercent: savePercent.toFixed(2).replace(/\.00$/, ""),
    };
  };

  const res = calculate();

  const handleCopy = async () => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    const discountInfo = discountType === "percent" ? `${discount}%` : `${currency}${discount}`;
    const text = `Discount Calculator\nOriginal Price: ${currency}${res.price}\nDiscount: ${discountInfo}${
      coupon ? `\nAdditional Coupon: ${coupon}%` : ""
    }\nTotal Savings: ${currency}${res.totalSaved}\nFinal Payable Price: ${currency}${res.finalPrice}\n\nCalculate Online: https://topcalcbox.com/discount-calculator/`;
    await Clipboard.setStringAsync(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleReset = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    setOriginalPrice("");
    setDiscount("");
    setCoupon("");
    setDiscountType("percent");
  };

  return (
    <SafeAreaView style={sharedStyles.safeArea} edges={["top", "bottom"]}>
      <StatusBar style="dark" />
      <CalculatorHeader
        title="Discount Calculator"
        subtitle="Calculate your savings and final price after applying a discount."
        iconName="Tag"
        color="emerald"
      />

      <ScrollView
        contentContainerStyle={sharedStyles.scrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <OuterToolCard>
          <CurrencyToggle currency={currency} onChange={setCurrency} theme="emerald" />

          <FormPanel theme="emerald">
            <Text style={sharedStyles.fieldLabel}>Original Price ({currency})</Text>
            <View style={sharedStyles.inputBox}>
              <Text style={[sharedStyles.affix, { marginRight: 6 }]}>{currency}</Text>
              <TextInput
                style={sharedStyles.textInput}
                keyboardType="numeric"
                value={originalPrice}
                onChangeText={setOriginalPrice}
                placeholder="100"
                placeholderTextColor="#94A3B8"
              />
            </View>

            <View style={styles.labelRow}>
              <Text style={[sharedStyles.fieldLabel, { marginBottom: 0 }]}>Discount</Text>
              <View style={styles.miniSwitch}>
                <Pressable
                  onPress={() => {
                    Haptics.selectionAsync();
                    setDiscountType("percent");
                  }}
                  style={[styles.miniBtn, discountType === "percent" && styles.miniBtnActive]}
                >
                  <Text style={[styles.miniText, discountType === "percent" && styles.miniTextActive]}>% Off</Text>
                </Pressable>
                <Pressable
                  onPress={() => {
                    Haptics.selectionAsync();
                    setDiscountType("flat");
                  }}
                  style={[styles.miniBtn, discountType === "flat" && styles.miniBtnActive]}
                >
                  <Text style={[styles.miniText, discountType === "flat" && styles.miniTextActive]}>
                    Flat {currency}
                  </Text>
                </Pressable>
              </View>
            </View>

            <View style={sharedStyles.inputBox}>
              {discountType === "flat" && <Text style={[sharedStyles.affix, { marginRight: 6 }]}>{currency}</Text>}
              <TextInput
                style={sharedStyles.textInput}
                keyboardType="numeric"
                value={discount}
                onChangeText={setDiscount}
                placeholder="20"
                placeholderTextColor="#94A3B8"
              />
              {discountType === "percent" && <Text style={sharedStyles.affix}>%</Text>}
            </View>

            {discountType === "percent" && (
              <View style={sharedStyles.chipRow}>
                {[10, 15, 20, 30, 50, 70].map((v) => (
                  <Pressable
                    key={v}
                    onPress={() => {
                      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                      setDiscount(v.toString());
                    }}
                    style={[
                      sharedStyles.chip,
                      discount === v.toString() && { backgroundColor: "#ECFDF5", borderColor: "#34D399" },
                    ]}
                  >
                    <Text style={sharedStyles.chipText}>{v}%</Text>
                  </Pressable>
                ))}
              </View>
            )}

            <Text style={[sharedStyles.fieldLabel, { marginTop: 14 }]}>
              Additional Coupon (%) <Text style={styles.optionalTag}>(Optional)</Text>
            </Text>
            <View style={sharedStyles.inputBox}>
              <TextInput
                style={sharedStyles.textInput}
                keyboardType="numeric"
                value={coupon}
                onChangeText={setCoupon}
                placeholder="0"
                placeholderTextColor="#94A3B8"
              />
              <Text style={sharedStyles.affix}>%</Text>
            </View>
          </FormPanel>

          <ResultPanel theme="emerald">
            <View style={sharedStyles.resultHeaderRow}>
              <Text style={sharedStyles.resultKicker}>Final Payable Price</Text>
              <CopyResetActions copied={copied} onCopy={handleCopy} onReset={handleReset} theme="emerald" />
            </View>

            <View style={styles.heroRow}>
              <Text style={styles.heroCurr}>{currency}</Text>
              <Text style={sharedStyles.heroValue}>{res.finalPrice}</Text>
            </View>

            {parseFloat(res.savePercent) > 0 && (
              <View style={styles.saveBadge}>
                <Text style={styles.saveBadgeText}>You Save {res.savePercent}%</Text>
              </View>
            )}

            <View style={[sharedStyles.grid2, { marginTop: 12 }]}>
              <StatTile label="Original Price" value={`${currency}${res.price}`} borderColor="#A7F3D0" />
              <StatTile
                label="Base Discount"
                value={discountType === "percent" ? `${discount || 0}%` : `${currency}${discount || 0}`}
                borderColor="#A7F3D0"
              />
            </View>
            <View style={[sharedStyles.grid2, { marginTop: 8 }]}>
              <StatTile label="Extra Coupon" value={coupon ? `${coupon}%` : "None"} borderColor="#A7F3D0" />
              <StatTile
                label="Total Saved"
                value={`${currency}${res.totalSaved}`}
                valueColor="#059669"
                borderColor="#A7F3D0"
              />
            </View>
          </ResultPanel>
        </OuterToolCard>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  labelRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 14,
    marginBottom: 6,
  },
  miniSwitch: {
    flexDirection: "row",
    backgroundColor: "#E2E8F0",
    borderRadius: 8,
    padding: 2,
    gap: 2,
  },
  miniBtn: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
  },
  miniBtnActive: {
    backgroundColor: "#FFFFFF",
  },
  miniText: {
    fontSize: 11,
    fontWeight: "700",
    color: "#475569",
  },
  miniTextActive: {
    color: "#065F46",
    fontWeight: "800",
  },
  optionalTag: {
    fontWeight: "600",
    color: "#64748B",
  },
  heroRow: {
    flexDirection: "row",
    alignItems: "baseline",
  },
  heroCurr: {
    fontSize: 22,
    fontWeight: "800",
    color: "#065F46",
    marginRight: 2,
  },
  saveBadge: {
    alignSelf: "flex-start",
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#6EE7B7",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 999,
    marginTop: 8,
  },
  saveBadgeText: {
    fontSize: 12,
    fontWeight: "800",
    color: "#059669",
  },
});
