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

  const { NativeAdView, NativeAsset, NativeAssetType, NativeMediaView } = gma;
  if (!NativeAdView || !NativeAsset || !NativeAssetType) {
    return null;
  }

  const hasMedia = nativeAd.mediaContent?.hasVideoContent || (nativeAd.images && nativeAd.images.length > 0);

  return (
    <NativeAdView nativeAd={nativeAd} style={[styles.card, style]}>
      {/* 1. Top Row: [Ad] badge + Sponsored text */}
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

      {/* 2. Header Row: App Icon (Left) + Headline (Right) */}
      <View style={styles.headerRow}>
        {nativeAd.icon?.url ? (
          <NativeAsset assetType={NativeAssetType.ICON}>
            <Image
              source={{ uri: nativeAd.icon.url }}
              style={styles.iconImage}
              resizeMode="cover"
            />
          </NativeAsset>
        ) : null}

        <View style={styles.titleCol}>
          <NativeAsset assetType={NativeAssetType.HEADLINE}>
            <Text style={styles.headlineText} numberOfLines={2}>
              {nativeAd.headline}
            </Text>
          </NativeAsset>
          {nativeAd.price || nativeAd.store ? (
            <Text style={styles.metaText} numberOfLines={1}>
              {[nativeAd.price, nativeAd.store].filter(Boolean).join(" • ")}
            </Text>
          ) : null}
        </View>
      </View>

      {/* 3. Body text description */}
      {nativeAd.body ? (
        <NativeAsset assetType={NativeAssetType.BODY}>
          <Text style={styles.bodyText} numberOfLines={3}>
            {nativeAd.body}
          </Text>
        </NativeAsset>
      ) : null}

      {/* 4. Large Media Graphic (Matching Image 2 Reference) */}
      {NativeMediaView && hasMedia ? (
        <View style={styles.mediaContainer}>
          <NativeMediaView style={styles.mediaView} resizeMode="contain" />
        </View>
      ) : nativeAd.images?.[0]?.url ? (
        <NativeAsset assetType={NativeAssetType.IMAGE}>
          <Image
            source={{ uri: nativeAd.images[0].url }}
            style={styles.largeImage}
            resizeMode="contain"
          />
        </NativeAsset>
      ) : null}

      {/* 5. Full-width Orange Call To Action button (Matching Image 2 Reference) */}
      <NativeAsset assetType={NativeAssetType.CALL_TO_ACTION}>
        <View style={styles.ctaButton}>
          <Text style={styles.ctaText}>
            {nativeAd.callToAction ? nativeAd.callToAction.toUpperCase() : "INSTALL"}
          </Text>
        </View>
      </NativeAsset>
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
    borderRadius: 18,
    borderWidth: 1.5,
    borderColor: "#E2E8F0",
    padding: 16,
    marginVertical: 14,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 2,
  },
  topRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    gap: 8,
  },
  adBadge: {
    backgroundColor: "#FEF3C7",
    borderWidth: 1,
    borderColor: "#FDE68A",
    paddingHorizontal: 7,
    paddingVertical: 2,
    borderRadius: 6,
  },
  adBadgeText: {
    color: "#D97706",
    fontSize: 11,
    fontWeight: "800",
    letterSpacing: 0.5,
  },
  sponsoredLabel: {
    fontSize: 13,
    fontWeight: "600",
    color: "#64748B",
  },
  advertiserText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#475569",
    flex: 1,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginBottom: 10,
  },
  iconImage: {
    width: 44,
    height: 44,
    borderRadius: 10,
    backgroundColor: "#F1F5F9",
  },
  titleCol: {
    flex: 1,
  },
  headlineText: {
    fontSize: 15,
    fontWeight: "700",
    color: "#0F172A",
    lineHeight: 20,
  },
  metaText: {
    fontSize: 11,
    fontWeight: "500",
    color: "#64748B",
    marginTop: 2,
  },
  bodyText: {
    fontSize: 13,
    fontWeight: "500",
    color: "#334155",
    lineHeight: 18,
    marginBottom: 12,
  },
  mediaContainer: {
    width: "100%",
    height: 200,
    borderRadius: 14,
    overflow: "hidden",
    backgroundColor: "#F8FAFC",
    marginBottom: 14,
  },
  mediaView: {
    width: "100%",
    height: "100%",
  },
  largeImage: {
    width: "100%",
    height: 200,
    borderRadius: 14,
    backgroundColor: "#F8FAFC",
    marginBottom: 14,
  },
  ctaButton: {
    backgroundColor: "#EA580C",
    borderRadius: 14,
    paddingVertical: 14,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#EA580C",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.25,
    shadowRadius: 5,
    elevation: 3,
  },
  ctaText: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "800",
    letterSpacing: 0.6,
  },
});
