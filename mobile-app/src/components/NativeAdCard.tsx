import React from "react";
import { View, Text, StyleSheet, Image, ViewStyle } from "react-native";
import { AD_UNITS } from "@/lib/adConfig";
import { getGoogleMobileAds, isAdMobNativeAvailable } from "@/lib/adMobSafe";

interface NativeAdCardProps {
  style?: ViewStyle;
}

export function NativeAdCard({ style }: NativeAdCardProps) {
  // If running in Expo Go or Web, native ads cannot run — render null
  if (!isAdMobNativeAvailable()) {
    return null;
  }

  return <NativeAdCardContent style={style} />;
}

function NativeAdCardContent({ style }: NativeAdCardProps) {
  const gma = getGoogleMobileAds();
  if (
    !gma ||
    !gma.useNativeAd ||
    !gma.NativeAdView ||
    !gma.NativeAsset ||
    !gma.NativeAssetType
  ) {
    return null;
  }

  const { useNativeAd, NativeAdView, NativeAsset, NativeAssetType } = gma;

  const { status, nativeAd } = useNativeAd({
    adUnitId: AD_UNITS.NATIVE,
  });

  // Gracefully render nothing if not loaded or failed (preserves UI cleanly offline)
  if (status !== "loaded" || !nativeAd) {
    return null;
  }

  return (
    <NativeAdView nativeAd={nativeAd} style={[styles.card, style]}>
      {/* Top Header Row with Ad badge and Advertiser */}
      <View style={styles.headerRow}>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>Ad</Text>
        </View>
        {nativeAd.advertiser ? (
          <NativeAsset assetType={NativeAssetType.ADVERTISER}>
            <Text style={styles.advertiser} numberOfLines={1}>
              {nativeAd.advertiser}
            </Text>
          </NativeAsset>
        ) : (
          <Text style={styles.advertiser}>Sponsored Recommendation</Text>
        )}
      </View>

      {/* Main Content Row: Icon + Headline + Body */}
      <View style={styles.contentRow}>
        {nativeAd.icon?.url ? (
          <NativeAsset assetType={NativeAssetType.ICON}>
            <Image
              source={{ uri: nativeAd.icon.url }}
              style={styles.adIcon}
              resizeMode="cover"
            />
          </NativeAsset>
        ) : null}

        <View style={styles.textColumn}>
          {nativeAd.headline ? (
            <NativeAsset assetType={NativeAssetType.HEADLINE}>
              <Text style={styles.headline} numberOfLines={2}>
                {nativeAd.headline}
              </Text>
            </NativeAsset>
          ) : null}

          {nativeAd.body ? (
            <NativeAsset assetType={NativeAssetType.BODY}>
              <Text style={styles.body} numberOfLines={2}>
                {nativeAd.body}
              </Text>
            </NativeAsset>
          ) : null}
        </View>
      </View>

      {/* Action Row: Price/Rating info + Call To Action Button */}
      <View style={styles.footerRow}>
        <View style={styles.metaBox}>
          {nativeAd.price ? (
            <NativeAsset assetType={NativeAssetType.PRICE}>
              <Text style={styles.priceText}>{nativeAd.price}</Text>
            </NativeAsset>
          ) : nativeAd.starRating ? (
            <Text style={styles.ratingText}>★ {nativeAd.starRating.toFixed(1)}</Text>
          ) : (
            <Text style={styles.verifiedText}>Verified Partner</Text>
          )}
        </View>

        {nativeAd.callToAction ? (
          <NativeAsset assetType={NativeAssetType.CALL_TO_ACTION}>
            <View style={styles.ctaButton}>
              <Text style={styles.ctaButtonText} numberOfLines={1}>
                {nativeAd.callToAction}
              </Text>
            </View>
          </NativeAsset>
        ) : null}
      </View>
    </NativeAdView>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    borderWidth: 1.5,
    borderColor: "#E2E8F0",
    borderTopWidth: 4,
    borderTopColor: "#3B82F6",
    padding: 16,
    marginBottom: 16,
    shadowColor: "#0F172A",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 2,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 10,
  },
  badge: {
    backgroundColor: "#FEF3C7",
    borderWidth: 1,
    borderColor: "#F59E0B",
    borderRadius: 4,
    paddingHorizontal: 6,
    paddingVertical: 1,
  },
  badgeText: {
    fontSize: 10,
    fontWeight: "900",
    color: "#B45309",
    letterSpacing: 0.5,
  },
  advertiser: {
    fontSize: 11,
    fontWeight: "700",
    color: "#64748B",
    flex: 1,
  },
  contentRow: {
    flexDirection: "row",
    gap: 12,
    alignItems: "center",
    marginBottom: 12,
  },
  adIcon: {
    width: 44,
    height: 44,
    borderRadius: 10,
    backgroundColor: "#F1F5F9",
  },
  textColumn: {
    flex: 1,
  },
  headline: {
    fontSize: 14,
    fontWeight: "800",
    color: "#0F172A",
    lineHeight: 18,
    marginBottom: 3,
  },
  body: {
    fontSize: 12,
    fontWeight: "500",
    color: "#64748B",
    lineHeight: 16,
  },
  footerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: "#F1F5F9",
  },
  metaBox: {
    flex: 1,
    marginRight: 10,
  },
  priceText: {
    fontSize: 13,
    fontWeight: "800",
    color: "#059669",
  },
  ratingText: {
    fontSize: 12,
    fontWeight: "700",
    color: "#D97706",
  },
  verifiedText: {
    fontSize: 11,
    fontWeight: "600",
    color: "#94A3B8",
  },
  ctaButton: {
    backgroundColor: "#2563EB",
    borderRadius: 10,
    paddingHorizontal: 16,
    paddingVertical: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  ctaButtonText: {
    fontSize: 12,
    fontWeight: "800",
    color: "#FFFFFF",
    letterSpacing: 0.3,
  },
});
