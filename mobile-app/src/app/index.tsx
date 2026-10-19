import React, { useState, useMemo } from "react";
import {
  View,
  Text,
  TextInput,
  ScrollView,
  StyleSheet,
  Pressable,
  Image,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  MOBILE_TOOLS,
  CATEGORIES,
  CATEGORY_STYLES,
  MobileTool,
} from "@/constants/tools";
import { ToolCard } from "@/components/ToolCard";
import { DynamicIcon } from "@/components/DynamicIcon";
import {
  Search,
  Sparkles,
  Calculator,
  ShieldCheck,
  Zap,
  Smartphone,
  CheckCircle2,
} from "lucide-react-native";

export default function HomeScreen() {
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
        {/* Dark Hero Banner */}
        <View style={styles.heroCard}>
          <View style={styles.heroBadge}>
            <Sparkles size={12} color="#FED7AA" />
            <Text style={styles.heroBadgeText}>FREE CALCULATOR TOOLS</Text>
          </View>

          <Text style={styles.heroTitle}>
            Calculate Anything.{"\n"}
            <Text style={styles.heroTitleHighlight}>Instantly.</Text>
          </Text>

          <Text style={styles.heroSubtitle}>
            Fast & accurate calculations for Finance, Math, Health, Age & Daily Life.
          </Text>

          {/* Search Bar */}
          <View style={styles.searchContainer}>
            <Search size={18} color="#94A3B8" style={styles.searchIcon} />
            <TextInput
              style={styles.searchInput}
              placeholder="Search 25+ calculators..."
              placeholderTextColor="#94A3B8"
              value={searchQuery}
              onChangeText={setSearchQuery}
              clearButtonMode="while-editing"
            />
          </View>
        </View>

        {/* Feature Badges Row */}
        {!isSearching && (
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.featureRow}
          >
            <View style={styles.featurePill}>
              <ShieldCheck size={14} color="#EA580C" />
              <Text style={styles.featureText}>100% Free</Text>
            </View>
            <View style={styles.featurePill}>
              <Zap size={14} color="#EA580C" />
              <Text style={styles.featureText}>Lightning Fast</Text>
            </View>
            <View style={styles.featurePill}>
              <Smartphone size={14} color="#EA580C" />
              <Text style={styles.featureText}>Offline Ready</Text>
            </View>
            <View style={styles.featurePill}>
              <CheckCircle2 size={14} color="#EA580C" />
              <Text style={styles.featureText}>Accurate</Text>
            </View>
          </ScrollView>
        )}

        {/* All Calculators Header Banner */}
        <View style={styles.sectionHeader}>
          <View style={styles.sectionHeaderLeft}>
            <View style={styles.allCalculatorsIcon}>
              <Calculator size={20} color="#ffffff" strokeWidth={2.5} />
            </View>
            <View>
              <Text style={styles.sectionTitle}>
                {isSearching ? "Search Results" : "All Calculators"}
              </Text>
              <Text style={styles.sectionSubtitle}>
                {isSearching ? `Found ${filteredTools.length} matching tools` : "Explore all tools in one place"}
              </Text>
            </View>
          </View>
          <View style={styles.toolCountBadge}>
            <Text style={styles.toolCountNumber}>{filteredTools.length}</Text>
            <Text style={styles.toolCountLabel}>Tools</Text>
          </View>
        </View>

        {/* Category List & Tool Cards */}
        {CATEGORIES.map((category) => {
          const catTools = filteredTools.filter((t) => t.category === category);
          if (catTools.length === 0) return null;
          const styleInfo = CATEGORY_STYLES[category];

          return (
            <View key={category} style={styles.categoryBlock}>
              {/* Category Header Banner */}
              <View
                style={[
                  styles.categoryBanner,
                  { backgroundColor: styleInfo.bg, borderColor: styleInfo.border },
                ]}
              >
                <View style={styles.categoryTitleGroup}>
                  <View
                    style={[
                      styles.categoryIconCircle,
                      { backgroundColor: styleInfo.iconBg },
                    ]}
                  >
                    <DynamicIcon
                      name={catTools[0].iconName}
                      size={18}
                      color="#ffffff"
                    />
                  </View>
                  <Text style={[styles.categoryTitle, { color: styleInfo.text }]}>
                    {category}
                  </Text>
                </View>
                <View
                  style={[
                    styles.categoryCountBadge,
                    { backgroundColor: styleInfo.badgeBg },
                  ]}
                >
                  <Text style={styles.categoryCountText}>{catTools.length}</Text>
                </View>
              </View>

              {/* Cards Grid */}
              <View style={styles.cardsContainer}>
                {catTools.map((tool) => (
                  <ToolCard key={tool.slug} tool={tool} />
                ))}
              </View>
            </View>
          );
        })}

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
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.12)",
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.18)",
    paddingHorizontal: 12,
    height: 48,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    color: "#ffffff",
    fontSize: 15,
    fontWeight: "500",
  },
  featureRow: {
    flexDirection: "row",
    gap: 8,
    marginBottom: 16,
    paddingVertical: 2,
  },
  featurePill: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ffffff",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    marginRight: 8,
  },
  featureText: {
    fontSize: 11,
    fontWeight: "700",
    color: "#334155",
    marginLeft: 5,
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
});
