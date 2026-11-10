import React, { useState, useMemo } from "react";
import {
  View,
  Text,
  TextInput,
  ScrollView,
  StyleSheet,
  Pressable,
  Image,
  Share,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import * as Haptics from "expo-haptics";
import {
  MOBILE_TOOLS,
  CATEGORIES,
  CATEGORY_STYLES,
  CLIENT_CATEGORY_STYLES,
  MobileTool,
} from "@/constants/tools";
import { ToolCard } from "@/components/ToolCard";
import { SimpleHeroCalculator } from "@/components/SimpleHeroCalculator";
import { DynamicIcon } from "@/components/DynamicIcon";
import {
  Search,
  Sparkles,
  Calculator,
  ShieldCheck,
  CircleHelp,
  Share2,
  Info,
  ChevronRight,
} from "lucide-react-native";

export default function HomeScreen() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");

  const filteredTools = useMemo(() => {
    if (!searchQuery.trim()) return MOBILE_TOOLS;
    const q = searchQuery.toLowerCase().trim();
    return MOBILE_TOOLS.filter(
      (t) =>
        t.name.toLowerCase().includes(q) ||
        t.description.toLowerCase().includes(q) ||
        t.category.toLowerCase().includes(q)
    );
  }, [searchQuery]);

  const isSearching = searchQuery.trim().length > 0;

  const handleShareApp = async () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    try {
      await Share.share({
        title: "TopCalcBox – Smart Calculators",
        message:
          "Check out TopCalcBox! 15+ smart, 100% free offline calculators for finance, shopping, health & daily calculations: https://topcalcbox.com",
      });
    } catch {
      // User dismissed share dialog
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <StatusBar style="dark" />

      {/* Top App Bar */}
      <View style={styles.topBar}>
        <View style={styles.brandRow}>
          <Image
            source={require("../../assets/images/splash-icon.png")}
            style={styles.logoImage}
            resizeMode="contain"
          />
          <View>
            <Text style={styles.brandTitle}>TopCalcBox</Text>
            <Text style={styles.brandSubtitle}>Free Online Calculators</Text>
          </View>
        </View>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Hero Simple Calculator (Replaces dark blue box) */}
        <SimpleHeroCalculator />

        {/* High-Visibility Compact Banner Right Under Calculator */}
        <View style={styles.heroHighlightBox}>
          <Text style={styles.heroHighlightTitle}>
            25 Free Online Calculators for Daily Use
          </Text>
          <View style={styles.heroHighlightBadge}>
            <Sparkles size={12} color="#FFFFFF" />
            <Text style={styles.heroHighlightText}>
              100% Free, No Login Required
            </Text>
          </View>
        </View>

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <Search size={18} color="#94A3B8" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search 25 calculators..."
            placeholderTextColor="#94A3B8"
            value={searchQuery}
            onChangeText={setSearchQuery}
            clearButtonMode="while-editing"
          />
        </View>

        {/* Categories Section (Client Card Design) */}
        {isSearching ? (
          <View style={[styles.clientCategoryCard, { borderTopColor: "#F97316" }]}>
            <View style={styles.clientCategoryHeader}>
              <View style={styles.clientTitleRow}>
                <DynamicIcon name="Search" size={18} color="#F97316" strokeWidth={2.5} />
                <Text style={styles.clientCategoryTitle}>Search Results</Text>
              </View>
              <View style={[styles.clientCategoryBadge, { backgroundColor: "#FFF7ED" }]}>
                <Text style={[styles.clientBadgeText, { color: "#C2410C" }]}>
                  {filteredTools.length} found
                </Text>
              </View>
            </View>

            <View style={styles.clientToolList}>
              {filteredTools.length > 0 ? (
                filteredTools.map((tool) => (
                  <Pressable
                    key={tool.slug}
                    onPress={() => {
                      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                      router.push(`/(calculators)/${tool.slug}` as any);
                    }}
                    style={({ pressed }) => [
                      styles.clientToolItem,
                      pressed && styles.clientToolItemPressedOrange,
                    ]}
                  >
                    <View style={styles.clientToolLeft}>
                      <View style={[styles.clientToolDot, { backgroundColor: "#F97316" }]} />
                      <View style={{ flex: 1 }}>
                        <Text style={styles.clientToolText}>{tool.name}</Text>
                        <Text style={styles.clientToolSubtext}>{tool.category.split("&")[0].trim()}</Text>
                      </View>
                    </View>
                    <View style={[styles.clientToolArrowBox, { backgroundColor: "#FFF7ED" }]}>
                      <ChevronRight size={15} color="#EA580C" strokeWidth={2.5} />
                    </View>
                  </Pressable>
                ))
              ) : (
                <View style={styles.emptyState}>
                  <Text style={styles.emptyStateTitle}>No calculators found</Text>
                  <Text style={styles.emptyStateText}>
                    Try searching for &quot;Percentage&quot;, &quot;BMI&quot;, or &quot;Age&quot;.
                  </Text>
                </View>
              )}
            </View>
          </View>
        ) : (
          CATEGORIES.map((category) => {
            const catTools = filteredTools.filter((t) => t.category === category);
            if (catTools.length === 0) return null;
            const styleInfo = CLIENT_CATEGORY_STYLES[category] || CLIENT_CATEGORY_STYLES["DATE & AGE"];

            return (
              <View
                key={category}
                style={[
                  styles.clientCategoryCard,
                  { borderTopColor: styleInfo.topBorder },
                ]}
              >
                {/* Category Card Header */}
                <View style={styles.clientCategoryHeader}>
                  <View style={styles.clientTitleRow}>
                    <DynamicIcon
                      name={styleInfo.iconName}
                      size={18}
                      color={styleInfo.iconColor}
                      strokeWidth={2.5}
                    />
                    <Text style={styles.clientCategoryTitle}>{category}</Text>
                  </View>
                  <View
                    style={[
                      styles.clientCategoryBadge,
                      { backgroundColor: styleInfo.badgeBg },
                    ]}
                  >
                    <Text
                      style={[
                        styles.clientBadgeText,
                        { color: styleInfo.badgeText },
                      ]}
                    >
                      {catTools.length}
                    </Text>
                  </View>
                </View>

                {/* Tool Items List (Matching Client Screenshot) */}
                <View style={styles.clientToolList}>
                  {catTools.map((tool) => (
                    <Pressable
                      key={tool.slug}
                      onPress={() => {
                        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                        router.push(`/(calculators)/${tool.slug}` as any);
                      }}
                      style={({ pressed }) => [
                        styles.clientToolItem,
                        pressed && {
                          backgroundColor: styleInfo.activeBg,
                          borderColor: styleInfo.activeBorder,
                          transform: [{ scale: 0.985 }],
                        },
                      ]}
                    >
                      <View style={styles.clientToolLeft}>
                        <View style={[styles.clientToolDot, { backgroundColor: styleInfo.topBorder }]} />
                        <Text style={styles.clientToolText}>{tool.name}</Text>
                      </View>
                      <View style={[styles.clientToolArrowBox, { backgroundColor: styleInfo.badgeBg }]}>
                        <ChevronRight size={15} color={styleInfo.iconColor} strokeWidth={2.5} />
                      </View>
                    </Pressable>
                  ))}
                </View>
              </View>
            );
          })
        )}

        {/* Settings & Info Menu (Help & FAQ, Share, Privacy, About) */}
        {!isSearching && (
          <View style={styles.settingsSection}>
            <View style={styles.settingsCard}>
              {/* Help & FAQ */}
              <Pressable
                onPress={() => {
                  Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                  router.push("/help-faq" as any);
                }}
                style={({ pressed }) => [
                  styles.menuRow,
                  pressed && styles.menuRowPressed,
                ]}
              >
                <View style={styles.menuLeft}>
                  <View style={styles.menuIconBox}>
                    <CircleHelp size={22} color="#EA580C" strokeWidth={2.2} />
                  </View>
                  <Text style={styles.menuLabel}>Help & FAQ</Text>
                </View>
                <ChevronRight size={18} color="#94A3B8" />
              </Pressable>

              {/* Share with friends */}
              <Pressable
                onPress={handleShareApp}
                style={({ pressed }) => [
                  styles.menuRow,
                  pressed && styles.menuRowPressed,
                ]}
              >
                <View style={styles.menuLeft}>
                  <View style={styles.menuIconBox}>
                    <Share2 size={22} color="#EA580C" strokeWidth={2.2} />
                  </View>
                  <Text style={styles.menuLabel}>Share with friends</Text>
                </View>
                <ChevronRight size={18} color="#94A3B8" />
              </Pressable>

              {/* Privacy policy */}
              <Pressable
                onPress={() => {
                  Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                  router.push("/privacy-policy" as any);
                }}
                style={({ pressed }) => [
                  styles.menuRow,
                  pressed && styles.menuRowPressed,
                ]}
              >
                <View style={styles.menuLeft}>
                  <View style={styles.menuIconBox}>
                    <ShieldCheck size={22} color="#EA580C" strokeWidth={2.2} />
                  </View>
                  <Text style={styles.menuLabel}>Privacy policy</Text>
                </View>
                <ChevronRight size={18} color="#94A3B8" />
              </Pressable>

              {/* About & updates */}
              <Pressable
                onPress={() => {
                  Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                  router.push("/about" as any);
                }}
                style={({ pressed }) => [
                  styles.menuRow,
                  styles.menuRowLast,
                  pressed && styles.menuRowPressed,
                ]}
              >
                <View style={styles.menuLeft}>
                  <View style={styles.menuIconBox}>
                    <Info size={22} color="#EA580C" strokeWidth={2.2} />
                  </View>
                  <Text style={styles.menuLabel}>About & updates</Text>
                </View>
                <View style={styles.menuRight}>
                  <Text style={styles.versionTag}>v1.0.0 (1)</Text>
                  <ChevronRight size={18} color="#94A3B8" />
                </View>
              </Pressable>
            </View>

            <View style={styles.footerNotice}>
              <View style={styles.footerBrandRow}>
                <Image
                  source={require("../../assets/images/splash-icon.png")}
                  style={styles.footerLogo}
                  resizeMode="contain"
                />
                <Text style={styles.footerBrandTitle}>TopCalcBox</Text>
              </View>
              <Text style={styles.footerText}>
                25 Free Calculators • 100% Private & Offline
              </Text>
              <Text style={styles.footerSubText}>
                © 2026 TopCalcBox. All Rights Reserved.
              </Text>
            </View>
          </View>
        )}

        {filteredTools.length === 0 && (
          <View style={styles.emptyState}>
            <Text style={styles.emptyStateTitle}>No calculators found</Text>
            <Text style={styles.emptyStateText}>
              Try searching with another keyword like &quot;GST&quot;, &quot;EMI&quot;, or &quot;Age&quot;.
            </Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8FAFC",
  },
  topBar: {
    paddingHorizontal: 18,
    paddingVertical: 12,
    backgroundColor: "#ffffff",
    borderBottomWidth: 1,
    borderBottomColor: "#E2E8F0",
  },
  brandRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  logoImage: {
    width: 40,
    height: 40,
    marginRight: 12,
  },
  logoBadge: {
    width: 38,
    height: 38,
    borderRadius: 10,
    backgroundColor: "#EA580C",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  brandTitle: {
    fontSize: 18,
    fontWeight: "900",
    color: "#0F172A",
    letterSpacing: -0.5,
  },
  brandSubtitle: {
    fontSize: 11,
    fontWeight: "600",
    color: "#64748B",
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 40,
  },
  heroCard: {
    backgroundColor: "#0F172A",
    borderRadius: 24,
    padding: 20,
    borderWidth: 1,
    borderColor: "#1E293B",
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 16,
    elevation: 4,
  },
  heroBadge: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
    marginBottom: 12,
  },
  heroBadgeText: {
    color: "#FED7AA",
    fontSize: 10,
    fontWeight: "800",
    marginLeft: 6,
    letterSpacing: 0.5,
  },
  heroTitle: {
    fontSize: 26,
    fontWeight: "900",
    color: "#ffffff",
    lineHeight: 32,
    letterSpacing: -0.5,
    marginBottom: 8,
  },
  heroTitleHighlight: {
    color: "#FB923C",
  },
  heroSubtitle: {
    fontSize: 13,
    color: "#94A3B8",
    fontWeight: "500",
    lineHeight: 18,
    marginBottom: 16,
  },
  heroHighlightBox: {
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    borderWidth: 2,
    borderColor: "#F97316",
    paddingVertical: 11,
    paddingHorizontal: 14,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 14,
    marginBottom: 14,
    shadowColor: "#EA580C",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.16,
    shadowRadius: 6,
    elevation: 3,
  },
  heroHighlightTitle: {
    fontSize: 15,
    fontWeight: "900",
    color: "#0F172A",
    textAlign: "center",
    letterSpacing: -0.2,
  },
  heroHighlightBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#EA580C",
    paddingHorizontal: 10,
    paddingVertical: 3.5,
    borderRadius: 16,
    marginTop: 5,
    gap: 5,
  },
  heroHighlightText: {
    fontSize: 11,
    fontWeight: "900",
    color: "#FFFFFF",
    textTransform: "uppercase",
    letterSpacing: 0.3,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    paddingHorizontal: 14,
    height: 48,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    color: "#0F172A",
    fontSize: 15,
    fontWeight: "500",
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#FFF7ED",
    borderRadius: 16,
    padding: 12,
    borderWidth: 1,
    borderColor: "#FFEDD5",
    marginBottom: 16,
  },
  sectionHeaderLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  allCalculatorsIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: "#EA580C",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "800",
    color: "#0F172A",
  },
  sectionSubtitle: {
    fontSize: 11,
    fontWeight: "600",
    color: "#64748B",
  },
  toolCountBadge: {
    backgroundColor: "#EA580C",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 10,
    alignItems: "center",
  },
  toolCountNumber: {
    color: "#ffffff",
    fontSize: 14,
    fontWeight: "900",
  },
  toolCountLabel: {
    color: "#ffffff",
    fontSize: 9,
    fontWeight: "700",
    textTransform: "uppercase",
  },
  categoryBlock: {
    marginBottom: 20,
  },
  categoryBanner: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderWidth: 1,
    marginBottom: 10,
  },
  categoryTitleGroup: {
    flexDirection: "row",
    alignItems: "center",
  },
  categoryIconCircle: {
    width: 32,
    height: 32,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  categoryTitle: {
    fontSize: 13,
    fontWeight: "800",
    letterSpacing: 0.2,
  },
  categoryCountBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 8,
  },
  categoryCountText: {
    color: "#ffffff",
    fontSize: 11,
    fontWeight: "800",
  },
  cardsContainer: {
    marginTop: 2,
  },
  emptyState: {
    padding: 30,
    alignItems: "center",
  },
  emptyStateTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#0F172A",
    marginBottom: 4,
  },
  emptyStateText: {
    fontSize: 13,
    color: "#64748B",
    textAlign: "center",
  },
  settingsSection: {
    marginTop: 12,
    marginBottom: 20,
  },
  settingsCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 24,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    paddingHorizontal: 16,
    paddingVertical: 4,
    shadowColor: "#0F172A",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
  },
  menuRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: "#F1F5F9",
  },
  menuRowLast: {
    borderBottomWidth: 0,
  },
  menuRowPressed: {
    opacity: 0.7,
  },
  menuLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  menuIconBox: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: "#FFF7ED",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 14,
  },
  menuLabel: {
    fontSize: 16,
    fontWeight: "700",
    color: "#0F172A",
    letterSpacing: -0.2,
  },
  menuRight: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  versionTag: {
    fontSize: 14,
    fontWeight: "500",
    color: "#64748B",
    marginRight: 2,
  },
  footerNotice: {
    marginTop: 20,
    marginBottom: 8,
    paddingVertical: 16,
    paddingHorizontal: 18,
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    alignItems: "center",
    shadowColor: "#0F172A",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 1,
  },
  footerBrandRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 6,
  },
  footerLogo: {
    width: 24,
    height: 24,
    borderRadius: 12,
  },
  footerBrandTitle: {
    fontSize: 15,
    fontWeight: "900",
    color: "#0F172A",
    letterSpacing: -0.3,
  },
  footerText: {
    fontSize: 12,
    fontWeight: "700",
    color: "#EA580C",
    letterSpacing: 0.1,
    marginBottom: 4,
  },
  footerSubText: {
    fontSize: 11,
    fontWeight: "500",
    color: "#64748B",
  },
  clientCategoryCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 22,
    borderTopWidth: 4,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    padding: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 2,
  },
  clientCategoryHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingBottom: 10,
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#F1F5F9",
  },
  clientTitleRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  clientCategoryTitle: {
    fontSize: 16,
    fontWeight: "900",
    color: "#0F172A",
    letterSpacing: 0.3,
    textTransform: "uppercase",
  },
  clientCategoryBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
  },
  clientBadgeText: {
    fontSize: 12,
    fontWeight: "800",
  },
  clientToolList: {
    gap: 9,
  },
  clientToolItem: {
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderWidth: 1.5,
    borderColor: "#E2E8F0",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    shadowColor: "#0F172A",
    shadowOffset: { width: 0, height: 1.5 },
    shadowOpacity: 0.04,
    shadowRadius: 3,
    elevation: 1.5,
  },
  clientToolItemPressedOrange: {
    backgroundColor: "#FFF7ED",
    borderColor: "#FB923C",
    transform: [{ scale: 0.985 }],
  },
  clientToolLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    marginRight: 10,
    gap: 10,
  },
  clientToolDot: {
    width: 5,
    height: 18,
    borderRadius: 3,
  },
  clientToolArrowBox: {
    width: 28,
    height: 28,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  clientToolText: {
    fontSize: 15,
    fontWeight: "700",
    color: "#0F172A",
    letterSpacing: -0.2,
    flexShrink: 1,
  },
  clientToolSubtext: {
    fontSize: 10,
    fontWeight: "700",
    color: "#94A3B8",
    textTransform: "uppercase",
    marginTop: 2,
  },
});
