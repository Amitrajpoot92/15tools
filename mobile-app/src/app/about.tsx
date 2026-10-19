import React from "react";
import {
  View,
  Text,
  ScrollView,
  Pressable,
  Image,
  StyleSheet,
  Linking,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import * as Haptics from "expo-haptics";
import {
  ArrowLeft,
  Sparkles,
  CheckCircle2,
  Globe,
  Mail,
  ExternalLink,
  ShieldCheck,
  Zap,
  Smartphone,
  Heart,
} from "lucide-react-native";

export default function AboutScreen() {
  const router = useRouter();

  const handleBack = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace("/");
    }
  };

  const openWebsite = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    Linking.openURL("https://topcalcbox.com");
  };

  const openEmail = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    Linking.openURL("mailto:help.rka@gmail.com?subject=TopCalcBox%20App%20Feedback");
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
        <Text style={styles.topBarTitle}>About & Updates</Text>
        <View style={{ width: 36 }} />
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Brand App Hero Card */}
        <View style={styles.heroCard}>
          <Image
            source={require("../../assets/images/splash-icon.png")}
            style={styles.appIcon}
            resizeMode="contain"
          />
          <Text style={styles.appName}>TopCalcBox</Text>
          <Text style={styles.appTagline}>Free Online & Offline Calculators</Text>

          {/* Version & Package Badges */}
          <View style={styles.badgeRow}>
            <View style={styles.versionBadge}>
              <Text style={styles.versionText}>v1.0.0 (1)</Text>
            </View>
            <View style={styles.packageBadge}>
              <Text style={styles.packageText}>com.topcalcbox.allinone</Text>
            </View>
          </View>

          <Text style={styles.appDesc}>
            TopCalcBox is your all-in-one daily calculation companion designed to make everyday math, finance, dates, shopping, and health calculations fast, effortless, and 100% private.
          </Text>
        </View>

        {/* Feature Badges Grid */}
        <View style={styles.featuresCard}>
          <Text style={styles.sectionTitle}>WHY TOPCALCBOX</Text>
          <View style={styles.featuresList}>
            <View style={styles.featureItem}>
              <View style={styles.featureIconBox}>
                <Zap size={16} color="#EA580C" />
              </View>
              <View style={styles.featureTextBox}>
                <Text style={styles.featureHeading}>Lightning Fast Math</Text>
                <Text style={styles.featureSub}>
                  Instant live calculations with zero waiting or server latency.
                </Text>
              </View>
            </View>

            <View style={styles.featureItem}>
              <View style={styles.featureIconBox}>
                <Smartphone size={16} color="#EA580C" />
              </View>
              <View style={styles.featureTextBox}>
                <Text style={styles.featureHeading}>100% Offline Ready</Text>
                <Text style={styles.featureSub}>
                  All 25 calculators run locally without requiring mobile data.
                </Text>
              </View>
            </View>

            <View style={styles.featureItem}>
              <View style={styles.featureIconBox}>
                <ShieldCheck size={16} color="#EA580C" />
              </View>
              <View style={styles.featureTextBox}>
                <Text style={styles.featureHeading}>Zero Data Tracking</Text>
                <Text style={styles.featureSub}>
                  Your personal inputs and financial numbers stay on your device.
                </Text>
              </View>
            </View>

            <View style={styles.featureItem}>
              <View style={styles.featureIconBox}>
                <Sparkles size={16} color="#EA580C" />
              </View>
              <View style={styles.featureTextBox}>
                <Text style={styles.featureHeading}>25+ Purpose-Built Tools</Text>
                <Text style={styles.featureSub}>
                  Covering Finance, Math, Date & Age, Shopping, Health & Daily Life.
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* What's New / Release Notes */}
        <View style={styles.updatesCard}>
          <View style={styles.updatesHeader}>
            <View style={styles.updateBadge}>
              <Text style={styles.updateBadgeText}>CURRENT RELEASE</Text>
            </View>
            <Text style={styles.updateVersion}>v1.0.0 Release Notes</Text>
          </View>

          <View style={styles.notesList}>
            <View style={styles.noteRow}>
              <CheckCircle2 size={16} color="#10B981" style={{ marginTop: 2 }} />
              <Text style={styles.noteText}>
                Initial launch featuring 25 interactive calculators across 6 categories.
              </Text>
            </View>

            <View style={styles.noteRow}>
              <CheckCircle2 size={16} color="#10B981" style={{ marginTop: 2 }} />
              <Text style={styles.noteText}>
                1-tap Copy calculation results with formatted breakdown summaries.
              </Text>
            </View>

            <View style={styles.noteRow}>
              <CheckCircle2 size={16} color="#10B981" style={{ marginTop: 2 }} />
              <Text style={styles.noteText}>
                Brand new high-resolution 3D app icon and adaptive launcher styling.
              </Text>
            </View>

            <View style={styles.noteRow}>
              <CheckCircle2 size={16} color="#10B981" style={{ marginTop: 2 }} />
              <Text style={styles.noteText}>
                Full offline math engine support for smooth and private usage anywhere.
              </Text>
            </View>
          </View>
        </View>

        {/* Links & Contact Card */}
        <View style={styles.linksCard}>
          <Pressable
            onPress={openWebsite}
            style={({ pressed }) => [
              styles.actionRow,
              pressed && styles.pressed,
            ]}
          >
            <View style={styles.actionLeft}>
              <View style={styles.actionIconCircle}>
                <Globe size={18} color="#EA580C" />
              </View>
              <View>
                <Text style={styles.actionTitle}>Official Website</Text>
                <Text style={styles.actionSub}>https://topcalcbox.com</Text>
              </View>
            </View>
            <ExternalLink size={16} color="#94A3B8" />
          </Pressable>

          <View style={styles.rowDivider} />

          <Pressable
            onPress={openEmail}
            style={({ pressed }) => [
              styles.actionRow,
              pressed && styles.pressed,
            ]}
          >
            <View style={styles.actionLeft}>
              <View style={styles.actionIconCircle}>
                <Mail size={18} color="#EA580C" />
              </View>
              <View>
                <Text style={styles.actionTitle}>Developer Support</Text>
                <Text style={styles.actionSub}>help.rka@gmail.com</Text>
              </View>
            </View>
            <ExternalLink size={16} color="#94A3B8" />
          </Pressable>
        </View>

        {/* Footer Credit */}
        <View style={styles.footerCol}>
          <View style={styles.madeWithRow}>
            <Text style={styles.footerText}>Made with</Text>
            <Heart size={12} color="#EF4444" fill="#EF4444" />
            <Text style={styles.footerText}>for everyday calculations</Text>
          </View>
          <Text style={styles.copyrightText}>© 2026 TopCalcBox. All rights reserved.</Text>
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
    padding: 24,
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
  appIcon: {
    width: 90,
    height: 90,
    marginBottom: 14,
  },
  appName: {
    fontSize: 22,
    fontWeight: "900",
    color: "#0F172A",
    letterSpacing: -0.5,
  },
  appTagline: {
    fontSize: 12,
    fontWeight: "700",
    color: "#EA580C",
    marginTop: 2,
    marginBottom: 12,
  },
  badgeRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 14,
  },
  versionBadge: {
    backgroundColor: "#FFF7ED",
    borderWidth: 1,
    borderColor: "#FFEDD5",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 10,
  },
  versionText: {
    fontSize: 12,
    fontWeight: "800",
    color: "#EA580C",
  },
  packageBadge: {
    backgroundColor: "#F1F5F9",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 10,
  },
  packageText: {
    fontSize: 11,
    fontWeight: "600",
    color: "#64748B",
  },
  appDesc: {
    fontSize: 13,
    color: "#475569",
    textAlign: "center",
    lineHeight: 19,
    paddingHorizontal: 8,
  },
  featuresCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 24,
    padding: 20,
    borderWidth: 1,
    borderColor: "#F1F5F9",
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 11,
    fontWeight: "800",
    color: "#64748B",
    letterSpacing: 0.8,
    marginBottom: 14,
  },
  featuresList: {
    gap: 14,
  },
  featureItem: {
    flexDirection: "row",
    gap: 12,
    alignItems: "flex-start",
  },
  featureIconBox: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: "#FFF7ED",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#FFEDD5",
  },
  featureTextBox: {
    flex: 1,
  },
  featureHeading: {
    fontSize: 14,
    fontWeight: "700",
    color: "#0F172A",
    marginBottom: 2,
  },
  featureSub: {
    fontSize: 12,
    color: "#64748B",
    lineHeight: 16,
  },
  updatesCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 24,
    padding: 20,
    borderWidth: 1,
    borderColor: "#F1F5F9",
    marginBottom: 16,
  },
  updatesHeader: {
    marginBottom: 12,
  },
  updateBadge: {
    backgroundColor: "#ECFDF5",
    borderWidth: 1,
    borderColor: "#A7F3D0",
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
    alignSelf: "flex-start",
    marginBottom: 6,
  },
  updateBadgeText: {
    fontSize: 10,
    fontWeight: "800",
    color: "#059669",
    letterSpacing: 0.5,
  },
  updateVersion: {
    fontSize: 16,
    fontWeight: "800",
    color: "#0F172A",
  },
  notesList: {
    gap: 10,
  },
  noteRow: {
    flexDirection: "row",
    gap: 10,
    alignItems: "flex-start",
  },
  noteText: {
    flex: 1,
    fontSize: 13,
    color: "#475569",
    lineHeight: 18,
  },
  linksCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 24,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: "#F1F5F9",
    marginBottom: 20,
  },
  actionRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 14,
  },
  actionLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  actionIconCircle: {
    width: 38,
    height: 38,
    borderRadius: 12,
    backgroundColor: "#FFF7ED",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#FFEDD5",
  },
  actionTitle: {
    fontSize: 14,
    fontWeight: "700",
    color: "#0F172A",
  },
  actionSub: {
    fontSize: 11,
    color: "#64748B",
    marginTop: 1,
  },
  rowDivider: {
    height: 1,
    backgroundColor: "#F1F5F9",
  },
  footerCol: {
    alignItems: "center",
    gap: 4,
  },
  madeWithRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  footerText: {
    fontSize: 11,
    color: "#94A3B8",
    fontWeight: "600",
  },
  copyrightText: {
    fontSize: 11,
    color: "#CBD5E1",
    fontWeight: "500",
  },
});
