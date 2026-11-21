import React, { Component, ErrorInfo, ReactNode, useEffect, useState } from "react";
import { View, Text, StyleSheet, Image, ViewStyle } from "react-native";
import { AD_UNITS } from "@/lib/adConfig";
import { getGoogleMobileAds, isAdMobNativeAvailable } from "@/lib/adMobSafe";
import { adManager } from "@/lib/adManager";

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

class NativeAdErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(_: Error): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    if (__DEV__) {
      console.warn("[NativeAdErrorBoundary] Caught native ad error:", error, errorInfo);
    }
  }

  render() {
    if (this.state.hasError) {
      return null;
    }
    return this.props.children;
  }
}

interface NativeAdCardProps {
  style?: ViewStyle;
}

function NativeAdCardInner({ style }: NativeAdCardProps) {
  const [nativeAd, setNativeAd] = useState<any>(null);
  const [isReady, setIsReady] = useState(adManager.isReady());

  useEffect(() => {
    if (isReady) return;
    const unsub = adManager.onReady(() => {
      setIsReady(true);
    });
    return unsub;
  }, [isReady]);

  useEffect(() => {
    if (!isReady || !isAdMobNativeAvailable()) {
      return;
    }

    const gma = getGoogleMobileAds();
    if (!gma || !gma.NativeAd) {
      return;
    }

    let cancelled = false;
    let loadedAd: any = null;

    gma.NativeAd.createForAdRequest(AD_UNITS.NATIVE)
      .then((ad: any) => {
        if (cancelled) {
          ad.destroy();
          return;
        }
        loadedAd = ad;
        setNativeAd(ad);
      })
      .catch((err: any) => {
        if (__DEV__) {
          console.warn("[NativeAdCard] Load error:", err);
        }
      });

    return () => {
      cancelled = true;
      if (loadedAd) {
        try {
          loadedAd.destroy();
        } catch {
          // ignore destroy errors
        }
      }
    };
  }, [isReady]);

  if (!nativeAd) {
    return null;
  }

  const gma = getGoogleMobileAds();
  if (!gma) {
    return null;
  }

  const { NativeAdView, NativeAsset, NativeAssetType } = gma;
  if (!NativeAdView || !NativeAsset || !NativeAssetType) {
    return null;
  }

  return (
    <NativeAdView nativeAd={nativeAd} style={[styles.card, style]}>
      {/* Top Header Row with Ad badge and Advertiser */}
      <View style={styles.topRow}>
        <View style={styles.adBadge}>
          <Text style={styles.adBadgeText}>Ad</Text>
        </View>
        <Text style={styles.sponsoredLabel}>Sponsored</Text>
        {nativeAd.advertiser ? (
          <NativeAsset assetType={NativeAssetType.ADVERTISER}>
            <Text style={styles.advertiserText} numberOfLines={1}>
              • {nativeAd.advertiser}
            </Text>
          </NativeAsset>
        ) : null}
      </View>

      {/* Main Content: Icon + Headline + Body */}
      <View style={styles.contentRow}>
        {nativeAd.icon?.url ? (
          <NativeAsset assetType={NativeAssetType.ICON}>
            <Image
              source={{ uri: nativeAd.icon.url }}
              style={styles.iconImage}
              resizeMode="cover"
            />
          </NativeAsset>
        ) : null}

        <View style={styles.textCol}>
          <NativeAsset assetType={NativeAssetType.HEADLINE}>
            <Text style={styles.headlineText} numberOfLines={2}>
              {nativeAd.headline}
            </Text>
          </NativeAsset>

          {nativeAd.body ? (
            <NativeAsset assetType={NativeAssetType.BODY}>
              <Text style={styles.bodyText} numberOfLines={2}>
                {nativeAd.body}
              </Text>
            </NativeAsset>
          ) : null}
        </View>
      </View>

      {/* Call to Action Button */}
      {nativeAd.callToAction ? (
        <NativeAsset assetType={NativeAssetType.CALL_TO_ACTION}>
          <View style={styles.ctaButton}>
            <Text style={styles.ctaText}>{nativeAd.callToAction}</Text>
          </View>
        </NativeAsset>
      ) : null}
    </NativeAdView>
  );
}

export function NativeAdCard(props: NativeAdCardProps) {
  if (!isAdMobNativeAvailable()) {
    return null;
  }

  return (
    <NativeAdErrorBoundary>
      <NativeAdCardInner {...props} />
    </NativeAdErrorBoundary>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    borderWidth: 1.5,
    borderColor: "#E2E8F0",
    padding: 14,
    marginVertical: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  topRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
    gap: 6,
  },
  adBadge: {
    backgroundColor: "#F59E0B",
    paddingHorizontal: 6,
    paddingVertical: 1.5,
    borderRadius: 4,
  },
  adBadgeText: {
    color: "#FFFFFF",
    fontSize: 10,
    fontWeight: "800",
    letterSpacing: 0.5,
  },
  sponsoredLabel: {
    fontSize: 11,
    fontWeight: "600",
    color: "#64748B",
  },
  advertiserText: {
    fontSize: 11,
    fontWeight: "600",
    color: "#475569",
    flex: 1,
  },
  contentRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 12,
  },
  iconImage: {
    width: 48,
    height: 48,
    borderRadius: 10,
    backgroundColor: "#F1F5F9",
  },
  textCol: {
    flex: 1,
  },
  headlineText: {
    fontSize: 14,
    fontWeight: "700",
    color: "#0F172A",
    lineHeight: 19,
    marginBottom: 3,
  },
  bodyText: {
    fontSize: 12,
    fontWeight: "500",
    color: "#64748B",
    lineHeight: 16,
  },
  ctaButton: {
    marginTop: 12,
    backgroundColor: "#2563EB",
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  ctaText: {
    color: "#FFFFFF",
    fontSize: 13,
    fontWeight: "800",
    letterSpacing: 0.3,
  },
});
