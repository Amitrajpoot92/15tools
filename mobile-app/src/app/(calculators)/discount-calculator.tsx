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
import { Copy, RotateCcw, Check } from "lucide-react-native";

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

    let baseDiscountAmount = 0;
    if (discountType === "percent") {
      baseDiscountAmount = price * (disc / 100);
    } else {
      baseDiscountAmount = disc;
    }
    if (baseDiscountAmount > price) {
      baseDiscountAmount = price;
    }

    const priceAfterBase = price - baseDiscountAmount;
    let couponAmount = priceAfterBase * (coup / 100);
    if (couponAmount > priceAfterBase) {
      couponAmount = priceAfterBase;
    }

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
    const discountInfo =
      discountType === "percent" ? `${discount}%` : `${currency}${discount}`;
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
    <SafeAreaView style={styles.container} edges={["top", "bottom"]}>
      <StatusBar style="dark" />
      <CalculatorHeader
        title="Discount Calculator"
        subtitle="Calculate how much you'll save during a sale and find the final price instantly."
        iconName="Tag"
        themeColor="#F59E0B"
        themeBg="#FFFBEB"
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
          {/* Original Price */}
          <Text style={styles.inputLabel}>ORIGINAL PRICE ({currency})</Text>
          <View style={styles.inputWrapper}>
            <Text style={styles.prefix}>{currency}</Text>
            <TextInput
              style={styles.textInput}
              keyboardType="numeric"
              value={originalPrice}
              onChangeText={setOriginalPrice}
              placeholder="100"
              placeholderTextColor="#94A3B8"
            />
          </View>

          {/* Discount Header with Type Switch */}
          <View style={styles.discountHeaderRow}>
            <Text style={styles.inputLabel}>DISCOUNT</Text>
            <View style={styles.typeSwitcher}>
              <Pressable
                onPress={() => {
                  Haptics.selectionAsync();
                  setDiscountType("percent");
                }}
                style={[
                  styles.typeBtn,
                  discountType === "percent" && styles.typeBtnActive,
                ]}
              >
                <Text
                  style={[
                    styles.typeBtnText,
                    discountType === "percent" && styles.typeBtnTextActive,
                  ]}
                >
                  % Off
                </Text>
              </Pressable>
              <Pressable
                onPress={() => {
                  Haptics.selectionAsync();
                  setDiscountType("flat");
                }}
                style={[
                  styles.typeBtn,
                  discountType === "flat" && styles.typeBtnActive,
                ]}
              >
                <Text
                  style={[
                    styles.typeBtnText,
                    discountType === "flat" && styles.typeBtnTextActive,
                  ]}
                >
                  Flat {currency}
                </Text>
              </Pressable>
            </View>
          </View>

          <View style={styles.inputWrapper}>
            {discountType === "flat" && <Text style={styles.prefix}>{currency}</Text>}
            <TextInput
              style={styles.textInput}
              keyboardType="numeric"
              value={discount}
              onChangeText={setDiscount}
              placeholder="20"
              placeholderTextColor="#94A3B8"
            />
            {discountType === "percent" && <Text style={styles.suffix}>%</Text>}
          </View>

          {/* Quick chips if percent */}
          {discountType === "percent" && (
            <View style={styles.chipRow}>
              {[10, 15, 20, 30, 50, 70].map((v) => (
                <Pressable
                  key={v}
                  onPress={() => {
                    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                    setDiscount(v.toString());
                  }}
                  style={styles.chipBtn}
                >
                  <Text style={styles.chipText}>{v}%</Text>
                </Pressable>
              ))}
            </View>
          )}

          {/* Additional Coupon Discount */}
          <Text style={[styles.inputLabel, { marginTop: 16 }]}>
            ADDITIONAL COUPON <Text style={styles.optionalText}>(OPTIONAL)</Text>
          </Text>
          <View style={styles.inputWrapper}>
            <TextInput
              style={styles.textInput}
              keyboardType="numeric"
              value={coupon}
              onChangeText={setCoupon}
              placeholder="0"
              placeholderTextColor="#94A3B8"
            />
            <Text style={styles.suffix}>%</Text>
          </View>
        </View>

        {/* Result Box */}
        <View style={styles.resultBox}>
          <View style={styles.resultHeader}>
            <View>
              <Text style={styles.resultCategory}>FINAL PAYABLE PRICE</Text>
            </View>
            <View style={styles.actionButtons}>
              <Pressable onPress={handleCopy} style={styles.copyBtn}>
                {copied ? <Check size={14} color="#059669" /> : <Copy size={14} color="#065F46" />}
                <Text style={[styles.copyBtnText, copied && { color: "#059669" }]}>
                  {copied ? "Copied" : "Copy"}
                </Text>
              </Pressable>
              <Pressable onPress={handleReset} style={styles.resetBtn}>
                <RotateCcw size={15} color="#065F46" />
              </Pressable>
            </View>
          </View>

          <View style={styles.priceRow}>
            <Text style={styles.currencySymbol}>{currency}</Text>
            <Text style={styles.finalPriceText}>{res.finalPrice}</Text>
          </View>

          {parseFloat(res.savePercent) > 0 && (
            <View style={styles.saveBadge}>
              <Text style={styles.saveBadgeText}>You Save {res.savePercent}%</Text>
            </View>
          )}

          {/* Breakdown 4 Grid Cards */}
          <View style={styles.gridCards}>
            <View style={styles.detailCard}>
              <Text style={styles.detailCardLabel}>ORIGINAL</Text>
              <Text style={styles.detailCardValue}>{currency}{res.price}</Text>
            </View>
            <View style={styles.detailCard}>
              <Text style={styles.detailCardLabel}>DISCOUNT</Text>
              <Text style={styles.detailCardValue}>
                {discountType === "percent" ? `${discount || 0}%` : `${currency}${discount || 0}`}
              </Text>
            </View>
            <View style={styles.detailCard}>
              <Text style={styles.detailCardLabel}>COUPON</Text>
              <Text style={styles.detailCardValue}>{coupon ? `${coupon}%` : "None"}</Text>
            </View>
            <View style={styles.detailCard}>
              <Text style={styles.detailCardLabel}>SAVED</Text>
              <Text style={[styles.detailCardValue, { color: "#059669" }]}>
                {currency}{res.totalSaved}
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
  discountHeaderRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 16,
    marginBottom: 8,
  },
  typeSwitcher: {
    flexDirection: "row",
    backgroundColor: "#E2E8F0",
    borderRadius: 8,
    padding: 2,
  },
  typeBtn: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
  },
  typeBtnActive: {
    backgroundColor: "#FFFFFF",
  },
  typeBtnText: {
    fontSize: 11,
    fontWeight: "700",
    color: "#64748B",
  },
  typeBtnTextActive: {
    color: "#059669",
    fontWeight: "800",
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
    color: "#065F46",
  },
  resultBox: {
    backgroundColor: "#E6F4EA",
    borderRadius: 22,
    padding: 20,
    borderWidth: 1.5,
    borderColor: "#A7F3D0",
    alignItems: "center",
    shadowColor: "#059669",
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
    marginBottom: 8,
  },
  resultCategory: {
    fontSize: 11,
    fontWeight: "800",
    color: "#047857",
    letterSpacing: 1,
  },
  actionButtons: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  copyBtn: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.85)",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#A7F3D0",
    gap: 4,
  },
  copyBtnText: {
    fontSize: 11,
    fontWeight: "800",
    color: "#065F46",
  },
  resetBtn: {
    width: 30,
    height: 30,
    borderRadius: 8,
    backgroundColor: "rgba(255,255,255,0.85)",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#A7F3D0",
  },
  priceRow: {
    flexDirection: "row",
    alignItems: "baseline",
    marginTop: 6,
    marginBottom: 10,
  },
  currencySymbol: {
    fontSize: 28,
    fontWeight: "800",
    color: "#065F46",
    marginRight: 4,
  },
  finalPriceText: {
    fontSize: 52,
    fontWeight: "900",
    color: "#0F172A",
    letterSpacing: -1.5,
  },
  saveBadge: {
    backgroundColor: "#059669",
    paddingHorizontal: 14,
    paddingVertical: 5,
    borderRadius: 20,
    marginBottom: 16,
  },
  saveBadgeText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "800",
  },
  gridCards: {
    width: "100%",
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  detailCard: {
    width: "48%",
    backgroundColor: "rgba(255,255,255,0.85)",
    borderRadius: 14,
    padding: 10,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#A7F3D0",
  },
  detailCardLabel: {
    fontSize: 10,
    fontWeight: "800",
    color: "#047857",
    letterSpacing: 0.5,
    marginBottom: 2,
  },
  detailCardValue: {
    fontSize: 16,
    fontWeight: "900",
    color: "#0F172A",
  },
});
