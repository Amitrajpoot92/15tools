import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  Pressable,
  StyleSheet,
  Linking,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import * as Haptics from "expo-haptics";
import {
  ArrowLeft,
  CircleHelp,
  ChevronDown,
  Mail,
  ShieldCheck,
  Zap,
  Smartphone,
  ExternalLink,
} from "lucide-react-native";

interface FAQItem {
  q: string;
  a: string;
  category: string;
}

const FAQ_DATA: FAQItem[] = [
  {
    category: "GENERAL",
    q: "Are all TopCalcBox calculators 100% free?",
    a: "Yes! Every single calculator in TopCalcBox is completely free. There are no hidden fees, paid subscriptions, or locked features.",
  },
  {
    category: "GENERAL",
    q: "Do the calculators work offline without internet?",
    a: "Yes! All calculations are performed directly on your phone's processor using local math engines. You can use every tool anywhere, anytime—even in airplane mode.",
  },
  {
    category: "GENERAL",
    q: "Do I need to sign up or create an account?",
    a: "No account, login, or registration is required. You can open the app and start calculating immediately.",
  },
  {
    category: "ACCURACY & USAGE",
    q: "How accurate are the financial calculators (GST, EMI, SIP)?",
    a: "Our calculators use official standard banking and financial formulas (such as reducing balance loan amortization for EMI and compound wealth formulas for SIP). Always consult a certified financial advisor for formal banking commitments.",
  },
  {
    category: "ACCURACY & USAGE",
    q: "How does the Price per Kg calculator work?",
    a: "Price per Kg lets you compare grocery costs in two modes: find the exact price for any gram weight (e.g. 250g of ₹80/kg), or enter your budget to find how many grams you can buy.",
  },
  {
    category: "ACCURACY & USAGE",
    q: "Can I copy and share my calculation results?",
    a: "Yes! Every calculator screen features a 'Copy' button on the calculation result card. Tapping it copies a clean, formatted summary directly to your clipboard so you can paste it into WhatsApp, Notes, or Messages.",
  },
  {
    category: "PRIVACY & SECURITY",
    q: "Is my calculation data saved or uploaded anywhere?",
    a: "Never. TopCalcBox calculates everything in local device memory. None of your entered numbers, dates, prices, or personal values are ever sent to a server or stored.",
  },
  {
    category: "SUPPORT & UPDATES",
    q: "How can I suggest a new calculator or report a bug?",
    a: "We welcome all feedback! You can email our team directly at help.rka@gmail.com with suggestions, feature requests, or any issues you encounter.",
  },
];

export default function HelpFaqScreen() {
  const router = useRouter();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleAccordion = (idx: number) => {
    Haptics.selectionAsync();
    setOpenIndex(openIndex === idx ? null : idx);
  };

  const handleContact = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    Linking.openURL("mailto:help.rka@gmail.com?subject=TopCalcBox%20Help%20%26%20Inquiry");
  };

  const handleBack = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    router.back();
  };

  return (
    <SafeAreaView style={styles.container} edges={["top", "bottom"]}>
      <StatusBar style="dark" />

      {/* Top Header Bar */}
      <View style={styles.topRow}>
        <Pressable
          onPress={handleBack}
          style={({ pressed }) => [styles.backBtn, pressed && styles.pressed]}
        >
          <ArrowLeft size={20} color="#0F172A" />
        </Pressable>
        <Text style={styles.topBarTitle}>Help & FAQ</Text>
        <View style={{ width: 36 }} />
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Hero Card */}
        <View style={styles.heroCard}>
          <View style={styles.heroIconCircle}>
            <CircleHelp size={24} color="#EA580C" />
          </View>
          <Text style={styles.heroTitle}>How can we help you?</Text>
          <Text style={styles.heroSubtitle}>
            Find quick answers to common questions about our calculators, accuracy, and offline features.
          </Text>

          {/* Feature Badges */}
          <View style={styles.badgeRow}>
            <View style={styles.badgePill}>
              <Zap size={12} color="#EA580C" />
              <Text style={styles.badgeText}>100% Free</Text>
            </View>
            <View style={styles.badgePill}>
              <Smartphone size={12} color="#EA580C" />
              <Text style={styles.badgeText}>Offline Ready</Text>
            </View>
            <View style={styles.badgePill}>
              <ShieldCheck size={12} color="#EA580C" />
              <Text style={styles.badgeText}>No Sign-up</Text>
            </View>
          </View>
        </View>

        {/* Section Title */}
        <Text style={styles.sectionHeaderTitle}>FREQUENTLY ASKED QUESTIONS</Text>

        {/* FAQ Accordion List */}
        <View style={styles.faqList}>
          {FAQ_DATA.map((item, idx) => {
            const isOpen = openIndex === idx;
            return (
              <View key={idx} style={styles.faqCard}>
                <Pressable
                  onPress={() => toggleAccordion(idx)}
                  style={({ pressed }) => [
                    styles.faqQuestionRow,
                    pressed && { opacity: 0.8 },
                  ]}
                >
                  <View style={styles.qTextWrapper}>
                    <View style={styles.qNumberBadge}>
                      <Text style={styles.qNumberText}>{idx + 1}</Text>
                    </View>
                    <Text style={styles.faqQuestionText}>{item.q}</Text>
                  </View>
                  <View
                    style={[
                      styles.chevronCircle,
                      isOpen && styles.chevronCircleOpen,
                    ]}
                  >
                    <ChevronDown
                      size={16}
                      color={isOpen ? "#EA580C" : "#94A3B8"}
                      style={{
                        transform: [{ rotate: isOpen ? "180deg" : "0deg" }],
                      }}
                    />
                  </View>
                </Pressable>

                {isOpen && (
                  <View style={styles.faqAnswerContainer}>
                    <Text style={styles.faqAnswerText}>{item.a}</Text>
                  </View>
                )}
              </View>
            );
          })}
        </View>

        {/* Contact Support Banner */}
        <View style={styles.supportCard}>
          <View style={styles.supportHeader}>
            <View style={styles.supportIconCircle}>
              <Mail size={20} color="#EA580C" />
            </View>
            <View style={styles.supportTextCol}>
              <Text style={styles.supportTitle}>Still have questions?</Text>
              <Text style={styles.supportSubtitle}>
                Our team is happy to assist you with any questions or bug reports.
              </Text>
            </View>
          </View>

          <Pressable
            onPress={handleContact}
            style={({ pressed }) => [
              styles.contactBtn,
              pressed && styles.pressed,
            ]}
          >
            <Mail size={16} color="#FFFFFF" />
            <Text style={styles.contactBtnText}>Contact Support (help.rka@gmail.com)</Text>
            <ExternalLink size={14} color="#FFFFFF" />
          </Pressable>
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
  topRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: "#ffffff",
    borderBottomWidth: 1,
    borderBottomColor: "#F1F5F9",
  },
  backBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#F8FAFC",
    justifyContent: "center",
    alignItems: "center",
  },
  pressed: {
    opacity: 0.7,
  },
  topBarTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#0F172A",
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 40,
  },
  heroCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 24,
    padding: 20,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#F1F5F9",
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  heroIconCircle: {
    width: 52,
    height: 52,
    borderRadius: 16,
    backgroundColor: "#FFF7ED",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#FFEDD5",
  },
  heroTitle: {
    fontSize: 20,
    fontWeight: "800",
    color: "#0F172A",
    textAlign: "center",
    marginBottom: 6,
  },
  heroSubtitle: {
    fontSize: 13,
    color: "#64748B",
    textAlign: "center",
    lineHeight: 18,
    paddingHorizontal: 10,
    marginBottom: 14,
  },
  badgeRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 8,
  },
  badgePill: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    backgroundColor: "#FFF7ED",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#FFEDD5",
  },
  badgeText: {
    fontSize: 11,
    fontWeight: "700",
    color: "#C2410C",
  },
  sectionHeaderTitle: {
    fontSize: 11,
    fontWeight: "800",
    color: "#64748B",
    letterSpacing: 0.8,
    marginBottom: 12,
    marginLeft: 4,
  },
  faqList: {
    gap: 10,
    marginBottom: 20,
  },
  faqCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "#F1F5F9",
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.03,
    shadowRadius: 4,
    elevation: 1,
  },
  faqQuestionRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
    gap: 12,
  },
  qTextWrapper: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  qNumberBadge: {
    width: 26,
    height: 26,
    borderRadius: 8,
    backgroundColor: "#FFF7ED",
    justifyContent: "center",
    alignItems: "center",
  },
  qNumberText: {
    fontSize: 12,
    fontWeight: "800",
    color: "#EA580C",
  },
  faqQuestionText: {
    flex: 1,
    fontSize: 14,
    fontWeight: "700",
    color: "#0F172A",
    lineHeight: 19,
  },
  chevronCircle: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: "#F8FAFC",
    justifyContent: "center",
    alignItems: "center",
  },
  chevronCircleOpen: {
    backgroundColor: "#FFF7ED",
  },
  faqAnswerContainer: {
    paddingHorizontal: 16,
    paddingBottom: 16,
    paddingTop: 2,
    borderTopWidth: 1,
    borderTopColor: "#F8FAFC",
    backgroundColor: "#FAFAFA",
  },
  faqAnswerText: {
    fontSize: 13,
    color: "#475569",
    lineHeight: 20,
    fontWeight: "400",
  },
  supportCard: {
    backgroundColor: "#FFFBF7",
    borderRadius: 24,
    padding: 18,
    borderWidth: 1,
    borderColor: "#FFEDD5",
  },
  supportHeader: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 14,
    alignItems: "center",
  },
  supportIconCircle: {
    width: 42,
    height: 42,
    borderRadius: 12,
    backgroundColor: "#FFF7ED",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#FFEDD5",
  },
  supportTextCol: {
    flex: 1,
  },
  supportTitle: {
    fontSize: 15,
    fontWeight: "800",
    color: "#0F172A",
    marginBottom: 2,
  },
  supportSubtitle: {
    fontSize: 12,
    color: "#64748B",
    lineHeight: 16,
  },
  contactBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#EA580C",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 14,
    gap: 8,
  },
  contactBtnText: {
    color: "#FFFFFF",
    fontSize: 13,
    fontWeight: "700",
  },
});
