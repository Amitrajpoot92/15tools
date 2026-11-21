import React, { useState } from "react";
import { View, StyleSheet, Text, ViewStyle } from "react-native";
import { BannerAd, BannerAdSize } from "react-native-google-mobile-ads";
import { AD_UNITS } from "@/lib/adConfig";

interface BannerAdComponentProps {
  style?: ViewStyle;
}

export function BannerAdComponent({ style }: BannerAdComponentProps) {
  const [adLoaded, setAdLoaded] = useState(false);
  const [adFailed, setAdFailed] = useState(false);

  // If ad failed to load (e.g. offline, no internet, or no fill), hide completely
  if (adFailed) {
    return null;
  }

  return (
    <View style={[styles.container, style]}>
      {/* Compliance label: clearly marks sponsored content without clutter */}
      <View style={styles.badgeRow}>
        <Text style={styles.badgeText}>SPONSORED</Text>
      </View>

      <View style={styles.adWrapper}>
        <BannerAd
          unitId={AD_UNITS.BANNER}
          size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
          requestOptions={{
            requestNonPersonalizedAdsOnly: false,
          }}
          onAdLoaded={() => {
            setAdLoaded(true);
            setAdFailed(false);
          }}
          onAdFailedToLoad={(error) => {
            if (__DEV__) {
              console.warn("[BannerAd] Failed to load:", error);
            }
            setAdFailed(true);
            setAdLoaded(false);
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 12,
    backgroundColor: "#F8FAFC",
    borderRadius: 12,
    paddingVertical: 6,
    paddingHorizontal: 8,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    overflow: "hidden",
  },
  badgeRow: {
    alignSelf: "flex-start",
    marginBottom: 4,
    paddingHorizontal: 6,
    paddingVertical: 1,
    backgroundColor: "#E2E8F0",
    borderRadius: 4,
  },
  badgeText: {
    fontSize: 9,
    fontWeight: "700",
    color: "#64748B",
    letterSpacing: 0.5,
  },
  adWrapper: {
    alignItems: "center",
    justifyContent: "center",
    minHeight: 50,
    width: "100%",
  },
});
