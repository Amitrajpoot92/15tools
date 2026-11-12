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
  THEMES,
  sharedStyles,
} from "@/components/CalculatorUI";

type Mode = "what_is_x_percent_of_y" | "x_is_what_percent_of_y" | "percentage_change";

export default function PercentageCalculatorScreen() {
  const [mode, setMode] = useState<Mode>("what_is_x_percent_of_y");
  const [percX, setPercX] = useState("15");
  const [percY, setPercY] = useState("100");
  const [whatX, setWhatX] = useState("15");
  const [whatY, setWhatY] = useState("100");
  const [changeX, setChangeX] = useState("100");
  const [changeY, setChangeY] = useState("150");
  const [copied, setCopied] = useState(false);

  const renderResult = () => {
    if (mode === "what_is_x_percent_of_y") {
      const x = parseFloat(percX);
      const y = parseFloat(percY);
      if (isNaN(x) || isNaN(y)) return { text: "Result", value: "0", symbol: "", color: "#1E1B4B" };
      const res = (x / 100) * y;
      return {
        text: `${x}% of ${y}`,
        value: Number.isInteger(res) ? res.toString() : res.toFixed(2),
        symbol: "",
        color: "#1E1B4B",
      };
    } else if (mode === "x_is_what_percent_of_y") {
      const x = parseFloat(whatX);
      const y = parseFloat(whatY);
      if (isNaN(x) || isNaN(y) || y === 0) return { text: "Result", value: "0", symbol: "%", color: "#1E1B4B" };
      const res = (x / y) * 100;
      return {
        text: `${x} is what % of ${y}`,
        value: Number.isInteger(res) ? res.toString() : res.toFixed(2),
        symbol: "%",
        color: "#1E1B4B",
      };
    } else {
      const x = parseFloat(changeX);
      const y = parseFloat(changeY);
      if (isNaN(x) || isNaN(y) || x === 0) return { text: "Result", value: "0", symbol: "%", color: "#1E1B4B" };
      const diff = y - x;
      const res = (Math.abs(diff) / Math.abs(x)) * 100;
      const changeType = diff >= 0 ? "Increase" : "Decrease";
      return {
        text: `${changeType} from ${x} to ${y}`,
        value: Number.isInteger(res) ? res.toString() : res.toFixed(2),
        symbol: "%",
        color: diff >= 0 ? "#059669" : "#E11D48",
      };
    }
  };

  const result = renderResult();
  const theme = THEMES.indigo;

  const handleCopy = async () => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    const text = `Percentage Calculator\nResult: ${result.text} = ${result.value}${result.symbol}\n\nCalculate Online: https://topcalcbox.com/percentage-calculator/`;
    await Clipboard.setStringAsync(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleReset = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    if (mode === "what_is_x_percent_of_y") {
      setPercX("");
      setPercY("");
    } else if (mode === "x_is_what_percent_of_y") {
      setWhatX("");
      setWhatY("");
    } else {
      setChangeX("");
      setChangeY("");
    }
  };

  return (
    <SafeAreaView style={sharedStyles.safeArea} edges={["top", "bottom"]}>
      <StatusBar style="dark" />
      <CalculatorHeader
        title="Percentage Calculator"
        subtitle="Calculate a percentage of any number, find percentage increases or decreases, and work out the percentage difference between values."
        iconName="Percent"
        color="indigo"
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
            accentColor={theme.accentDark}
            options={[
              { key: "what_is_x_percent_of_y", label: "What is X% of Y?" },
              { key: "x_is_what_percent_of_y", label: "X is % of Y?" },
              { key: "percentage_change", label: "% Change" },
            ]}
          />

          <FormPanel theme="indigo">
            {mode === "what_is_x_percent_of_y" && (
              <View>
                <Text style={sharedStyles.fieldLabel}>Percentage (%)</Text>
                <View style={sharedStyles.inputBox}>
                  <TextInput
                    style={sharedStyles.textInput}
                    keyboardType="numeric"
                    value={percX}
                    onChangeText={setPercX}
                    placeholder="15"
                    placeholderTextColor="#94A3B8"
                  />
                  <Text style={sharedStyles.affix}>%</Text>
                </View>

                <View style={sharedStyles.chipRow}>
                  {[5, 10, 15, 20, 25, 50].map((v) => (
                    <Pressable
                      key={v}
                      onPress={() => {
                        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                        setPercX(v.toString());
                      }}
                      style={[
                        sharedStyles.chip,
                        percX === v.toString() && { backgroundColor: "#EEF2FF", borderColor: "#818CF8" },
                      ]}
                    >
                      <Text style={sharedStyles.chipText}>{v}%</Text>
                    </Pressable>
                  ))}
                </View>

                <Text style={[sharedStyles.fieldLabel, { marginTop: 14 }]}>Total Value (of Y)</Text>
                <View style={sharedStyles.inputBox}>
                  <TextInput
                    style={sharedStyles.textInput}
                    keyboardType="numeric"
                    value={percY}
                    onChangeText={setPercY}
                    placeholder="100"
                    placeholderTextColor="#94A3B8"
                  />
                </View>
              </View>
            )}

            {mode === "x_is_what_percent_of_y" && (
              <View>
                <Text style={sharedStyles.fieldLabel}>Value (X)</Text>
                <View style={sharedStyles.inputBox}>
                  <TextInput
                    style={sharedStyles.textInput}
                    keyboardType="numeric"
                    value={whatX}
                    onChangeText={setWhatX}
                    placeholder="15"
                    placeholderTextColor="#94A3B8"
                  />
                </View>

                <Text style={[sharedStyles.fieldLabel, { marginTop: 14 }]}>Total Value (of Y)</Text>
                <View style={sharedStyles.inputBox}>
                  <TextInput
                    style={sharedStyles.textInput}
                    keyboardType="numeric"
                    value={whatY}
                    onChangeText={setWhatY}
                    placeholder="100"
                    placeholderTextColor="#94A3B8"
                  />
                </View>
              </View>
            )}

            {mode === "percentage_change" && (
              <View>
                <Text style={sharedStyles.fieldLabel}>Original Value</Text>
                <View style={sharedStyles.inputBox}>
                  <TextInput
                    style={sharedStyles.textInput}
                    keyboardType="numeric"
                    value={changeX}
                    onChangeText={setChangeX}
                    placeholder="100"
                    placeholderTextColor="#94A3B8"
                  />
                </View>

                <Text style={[sharedStyles.fieldLabel, { marginTop: 14 }]}>New Value</Text>
                <View style={sharedStyles.inputBox}>
                  <TextInput
                    style={sharedStyles.textInput}
                    keyboardType="numeric"
                    value={changeY}
                    onChangeText={setChangeY}
                    placeholder="150"
                    placeholderTextColor="#94A3B8"
                  />
                </View>
              </View>
            )}
          </FormPanel>

          <ResultPanel theme="indigo">
            <View style={sharedStyles.resultHeaderRow}>
              <Text style={sharedStyles.resultKicker} numberOfLines={1}>
                {result.text}
              </Text>
              <CopyResetActions copied={copied} onCopy={handleCopy} onReset={handleReset} theme="indigo" />
            </View>

            <View style={styles.resultRow}>
              <Text style={[sharedStyles.heroValue, { color: result.color }]}>{result.value}</Text>
              {result.symbol ? (
                <Text style={[styles.symbolText, { color: result.color }]}>{result.symbol}</Text>
              ) : null}
            </View>

            <View style={[styles.barTrack, { backgroundColor: theme.barTrack }]}>
              <View
                style={[
                  styles.barFill,
                  {
                    backgroundColor: result.color === "#1E1B4B" ? theme.barFill : result.color,
                    width: result.value !== "0" ? "100%" : "22%",
                  },
                ]}
              />
            </View>
          </ResultPanel>
        </OuterToolCard>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  resultRow: {
    flexDirection: "row",
    alignItems: "baseline",
    marginBottom: 12,
  },
  symbolText: {
    fontSize: 22,
    fontWeight: "800",
    marginLeft: 4,
  },
  barTrack: {
    height: 6,
    width: 96,
    borderRadius: 3,
    overflow: "hidden",
  },
  barFill: {
    height: "100%",
    borderRadius: 3,
  },
});
