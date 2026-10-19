import React from "react";
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
  ShieldCheck,
  Lock,
  Cpu,
  EyeOff,
  Mail,
  ExternalLink,
} from "lucide-react-native";

export default function PrivacyPolicyScreen() {
  const router = useRouter();

  const handleBack = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    router.back();
  };

  const handleEmail = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    Linking.openURL("mailto:help.rka@gmail.com?subject=Privacy%20Inquiry%20-%20TopCalcBox");
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
        <Text style={styles.topBarTitle}>Privacy Policy</Text>
        <View style={{ width: 36 }} />
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Hero Card */}
        <View style={styles.heroCard}>
          <View style={styles.heroIconCircle}>
            <ShieldCheck size={26} color="#EA580C" />
          </View>
          <Text style={styles.heroTitle}>Your Privacy Matters</Text>
          <Text style={styles.heroSubtitle}>
            TopCalcBox is designed to be completely safe, private, and transparent. We do not track or sell your personal data.
          </Text>
          <View style={styles.dateBadge}>
            <Text style={styles.dateText}>LAST UPDATED: OCTOBER 2026</Text>
          </View>
        </View>

        {/* 3 Privacy Pillars */}
        <View style={styles.pillarsGrid}>
          <View style={styles.pillarCard}>
            <Cpu size={18} color="#EA580C" />
            <Text style={styles.pillarTitle}>On-Device Math</Text>
            <Text style={styles.pillarDesc}>
              100% of calculations happen locally on your phone.
            </Text>
          </View>

          <View style={styles.pillarCard}>
            <EyeOff size={18} color="#EA580C" />
            <Text style={styles.pillarTitle}>No Account</Text>
            <Text style={styles.pillarDesc}>
              No sign-up, email, phone number, or password required.
            </Text>
          </View>

          <View style={styles.pillarCard}>
            <Lock size={18} color="#EA580C" />
            <Text style={styles.pillarTitle}>Zero Tracking</Text>
            <Text style={styles.pillarDesc}>
              We never track, store, or sell your calculation inputs.
            </Text>
          </View>
        </View>

        {/* Detailed Policy Sections */}
        <View style={styles.contentCard}>
          <View style={styles.policyBlock}>
            <Text style={styles.sectionHeading}>1. INFORMATION WE DO NOT COLLECT</Text>
            <Text style={styles.bodyText}>
              TopCalcBox does not require you to provide any personal identification information (such as your name, phone number, home address, or contacts). You can freely use all 25 calculators without logging in or providing personal credentials.
            </Text>
          </View>

          <View style={styles.policyBlock}>
            <Text style={styles.sectionHeading}>2. HOW CALCULATIONS WORK</Text>
            <Text style={styles.bodyText}>
              When you enter financial figures, loan amounts, dates of birth, test scores, or weights into any calculator, the calculation is executed locally within your device&apos;s volatile memory. This data is never sent to our servers, logged in databases, or shared with third parties.
            </Text>
          </View>

          <View style={styles.policyBlock}>
            <Text style={styles.sectionHeading}>3. DEVICE PERMISSIONS</Text>
            <Text style={styles.bodyText}>
              The TopCalcBox mobile app operates with minimal device privileges. We do NOT ask for or access sensitive device features such as:
            </Text>
            <View style={styles.bulletList}>
              <Text style={styles.bulletItem}>• No camera or photo library access</Text>
              <Text style={styles.bulletItem}>• No contacts or phonebook access</Text>
              <Text style={styles.bulletItem}>• No GPS location or audio recording</Text>
            </View>
          </View>

          <View style={styles.policyBlock}>
            <Text style={styles.sectionHeading}>4. THIRD-PARTY SERVICES & ANALYTICS</Text>
            <Text style={styles.bodyText}>
              We may utilize standard, anonymized platform services (such as Expo and Google Play Crashlytics) solely for diagnosing fatal technical errors, identifying crashes, and optimizing app performance. These services do not collect personal identities or calculation numbers.
            </Text>
          </View>

          <View style={styles.policyBlock}>
            <Text style={styles.sectionHeading}>5. CHILDREN&apos;S PRIVACY</Text>
            <Text style={styles.bodyText}>
              TopCalcBox is a family-friendly educational and utility app suitable for all age groups. We do not knowingly collect any personally identifiable information from children under 13.
            </Text>
          </View>

          <View style={styles.policyBlock}>
            <Text style={styles.sectionHeading}>6. CHANGES TO THIS PRIVACY POLICY</Text>
            <Text style={styles.bodyText}>
              We may periodically update this policy to reflect new app features or regulatory changes. Any modifications will be updated on this screen with a revised date.
            </Text>
          </View>

          <View style={styles.contactBlock}>
            <Text style={styles.sectionHeading}>7. CONTACT US</Text>
            <Text style={styles.bodyText}>
              If you have any questions or suggestions regarding our privacy practices, please contact us anytime:
            </Text>
            <Pressable
              onPress={handleEmail}
              style={({ pressed }) => [
                styles.emailButton,
                pressed && styles.pressed,
              ]}
            >
              <Mail size={16} color="#EA580C" />
              <Text style={styles.emailButtonText}>help.rka@gmail.com</Text>
              <ExternalLink size={14} color="#EA580C" />
            </Pressable>
          </View>
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
    marginBottom: 16,
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
    paddingHorizontal: 8,
    marginBottom: 12,
  },
  dateBadge: {
    backgroundColor: "#F1F5F9",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  dateText: {
    fontSize: 10,
    fontWeight: "800",
    color: "#64748B",
    letterSpacing: 0.6,
  },
  pillarsGrid: {
    gap: 8,
    marginBottom: 16,
  },
  pillarCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 14,
    borderWidth: 1,
    borderColor: "#F1F5F9",
  },
  pillarTitle: {
    fontSize: 14,
    fontWeight: "800",
    color: "#0F172A",
    marginTop: 6,
    marginBottom: 2,
  },
  pillarDesc: {
    fontSize: 12,
    color: "#64748B",
    lineHeight: 16,
  },
  contentCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 24,
    padding: 18,
    borderWidth: 1,
    borderColor: "#F1F5F9",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 6,
    elevation: 1,
  },
  policyBlock: {
    marginBottom: 18,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#F8FAFC",
  },
  sectionHeading: {
    fontSize: 13,
    fontWeight: "800",
    color: "#0F172A",
    letterSpacing: 0.5,
    marginBottom: 6,
  },
  bodyText: {
    fontSize: 13,
    color: "#475569",
    lineHeight: 20,
  },
  bulletList: {
    marginTop: 6,
    paddingLeft: 6,
    gap: 4,
  },
  bulletItem: {
    fontSize: 12,
    color: "#64748B",
    lineHeight: 18,
  },
  contactBlock: {
    marginTop: 4,
  },
  emailButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    backgroundColor: "#FFF7ED",
    borderWidth: 1,
    borderColor: "#FFEDD5",
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 12,
    marginTop: 10,
    alignSelf: "flex-start",
  },
  emailButtonText: {
    fontSize: 13,
    fontWeight: "700",
    color: "#EA580C",
  },
});
