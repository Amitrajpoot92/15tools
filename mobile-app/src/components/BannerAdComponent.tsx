import React, { Component, ErrorInfo, ReactNode, useEffect, useState } from "react";
import { View, StyleSheet, Text, ViewStyle } from "react-native";
import { AD_UNITS } from "@/lib/adConfig";
import { getGoogleMobileAds, isAdMobNativeAvailable } from "@/lib/adMobSafe";
import { adManager } from "@/lib/adManager";

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

/**
 * Isolated Error Boundary to ensure that no ad rendering glitch or Fabric
 * lifecycle issue can ever crash the main host application.
 */
class AdErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(_: Error): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    if (__DEV__) {
      console.warn("[AdErrorBoundary] Caught banner rendering error:", error, errorInfo);
    }
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || null;
    }
    return this.props.children;
  }
}

interface BannerAdComponentProps {
  style?: ViewStyle;
}

export function BannerAdComponent({ style }: BannerAdComponentProps) {
  const [adFailed, setAdFailed] = useState(false);
  const [isReady, setIsReady] = useState(adManager.isReady());

  useEffect(() => {
    // Only attempt to show ad after AdMob native SDK initialization is fully complete
    if (!adManager.isReady()) {
      const unsubscribe = adManager.onReady(() => {
        setIsReady(true);
      });
      return unsubscribe;
    }
  }, []);

  // If running in Expo Go / Web, or not yet initialized, or ad failed to load, collapse with zero layout impact
  if (!isReady || !isAdMobNativeAvailable() || adFailed) {
    return null;
  }

  const gma = getGoogleMobileAds();
  if (!gma || !gma.BannerAd || !gma.BannerAdSize) {
    return null;
  }

  const { BannerAd, BannerAdSize } = gma;

  return (
    <AdErrorBoundary>
      <View style={[styles.container, style]}>
        <BannerAd
          unitId={AD_UNITS.BANNER}
          size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
          requestOptions={{
            requestNonPersonalizedAdsOnly: false,
          }}
          onAdFailedToLoad={(error: any) => {
            if (__DEV__) {
              console.warn("[BannerAd] Failed to load:", error);
            }
            setAdFailed(true);
          }}
        />
      </View>
    </AdErrorBoundary>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    marginVertical: 8,
    overflow: "hidden",
  },
});
