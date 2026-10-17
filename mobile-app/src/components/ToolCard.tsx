import React from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import * as Haptics from "expo-haptics";
import { MobileTool } from "@/constants/tools";
import { DynamicIcon } from "./DynamicIcon";
import { ChevronRight, Flame } from "lucide-react-native";

export function ToolCard({ tool }: { tool: MobileTool }) {
  const router = useRouter();

  const handlePress = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    router.push(`/(calculators)/${tool.slug}` as any);
  };

  return (
    <Pressable
      onPress={handlePress}
      style={({ pressed }) => [
        styles.card,
        pressed && styles.cardPressed,
      ]}
    >
      <View style={styles.content}>
        {/* App Icon Container */}
        <View style={[styles.iconContainer, { backgroundColor: tool.color }]}>
          <DynamicIcon name={tool.iconName} size={22} color="#ffffff" strokeWidth={2.5} />
        </View>

        {/* Text Details */}
        <View style={styles.textContainer}>
          <View style={styles.titleRow}>
            <Text style={styles.title} numberOfLines={1}>
              {tool.name}
            </Text>
            {tool.popular && (
              <View style={styles.popularBadge}>
                <Flame size={10} color="#EA580C" />
                <Text style={styles.popularText}>Popular</Text>
              </View>
            )}
          </View>

          <Text style={styles.description} numberOfLines={1}>
            {tool.description}
          </Text>

          <View style={styles.actionRow}>
            <View style={styles.openBadge}>
              <Text style={styles.openBadgeText}>Open Calculator</Text>
              <ChevronRight size={12} color="#ffffff" />
            </View>
          </View>
        </View>

        {/* Right Arrow Chevron Circle */}
        <View style={styles.arrowCircle}>
          <ChevronRight size={16} color="#1D4ED8" strokeWidth={3} />
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#ffffff",
    borderRadius: 20,
    padding: 14,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#F1F5F9",
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  cardPressed: {
    opacity: 0.92,
    transform: [{ scale: 0.99 }],
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 3,
  },
  textContainer: {
    flex: 1,
    marginLeft: 14,
    marginRight: 8,
  },
  titleRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  title: {
    fontSize: 15,
    fontWeight: "700",
    color: "#0F172A",
    flex: 1,
  },
  popularBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFEDD5",
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 10,
    marginLeft: 6,
    borderWidth: 1,
    borderColor: "#FED7AA",
  },
  popularText: {
    fontSize: 9,
    fontWeight: "800",
    color: "#EA580C",
    textTransform: "uppercase",
    marginLeft: 2,
  },
  description: {
    fontSize: 12,
    color: "#64748B",
    marginTop: 2,
  },
  actionRow: {
    marginTop: 6,
    flexDirection: "row",
    alignItems: "center",
  },
  openBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1D4ED8",
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 12,
  },
  openBadgeText: {
    color: "#ffffff",
    fontSize: 10,
    fontWeight: "700",
    marginRight: 2,
  },
  arrowCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#EFF6FF",
    justifyContent: "center",
    alignItems: "center",
  },
});
