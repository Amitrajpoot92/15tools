import React, { Component, ErrorInfo, ReactNode, useEffect, useState } from "react";
import { View, Image, ActivityIndicator, StyleSheet, Text } from "react-native";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { adManager } from "@/lib/adManager";

SplashScreen.preventAutoHideAsync().catch(() => {});

interface RootErrorBoundaryProps {
  children: ReactNode;
}

interface RootErrorBoundaryState {
  hasError: boolean;
}

class RootErrorBoundary extends Component<RootErrorBoundaryProps, RootErrorBoundaryState> {
  constructor(props: RootErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(_: Error): RootErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    if (__DEV__) {
      console.warn("[RootErrorBoundary] Caught unhandled app error:", error, info);
    }
  }

  render() {
    if (this.state.hasError) {
      return (
        <View style={styles.errorContainer}>
          <Text style={styles.errorTitle}>Something went wrong</Text>
          <Text style={styles.errorSubtitle}>Please restart the app</Text>
        </View>
      );
    }
    return this.props.children;
  }
}

export default function RootLayout() {
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        // Initialize AdMob safely while splash screen is displaying.
        // Cap with a 1200ms timeout so the splash screen never hangs offline.
        await Promise.race([
          adManager.initialize(),
          new Promise((resolve) => setTimeout(resolve, 1200)),
        ]).catch(() => {});
      } catch {
        // Safe ignore
      } finally {
        setAppIsReady(true);
        await SplashScreen.hideAsync().catch(() => {});
      }
    }
    prepare();
  }, []);

  return (
    <RootErrorBoundary>
      <StatusBar style="dark" />
      <Stack
        screenOptions={{
          headerShown: false,
          animation: "slide_from_right",
        }}
      >
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="help-faq" options={{ headerShown: false }} />
        <Stack.Screen name="privacy-policy" options={{ headerShown: false }} />
        <Stack.Screen name="about" options={{ headerShown: false }} />
      </Stack>

      {!appIsReady && (
        <View style={styles.splashOverlay}>
          <Image
            source={require("../../assets/images/splash-icon.png")}
            style={styles.splashLogo}
            resizeMode="contain"
          />
          <Text style={styles.brandTitle}>Calculator: All in One</Text>
          <Text style={styles.brandSubtitle}>25 Free Offline Calculators</Text>
          <ActivityIndicator
            size="small"
            color="#DC2626"
            style={styles.loader}
          />
        </View>
      )}
    </RootErrorBoundary>
  );
}

const styles = StyleSheet.create({
  splashOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 99999,
  },
  splashLogo: {
    width: 120,
    height: 120,
    marginBottom: 16,
  },
  brandTitle: {
    fontSize: 22,
    fontWeight: "900",
    color: "#0F172A",
    letterSpacing: -0.5,
  },
  brandSubtitle: {
    fontSize: 12,
    fontWeight: "700",
    color: "#64748B",
    marginTop: 4,
    marginBottom: 20,
  },
  loader: {
    marginTop: 10,
  },
  errorContainer: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
  },
  errorTitle: {
    fontSize: 20,
    fontWeight: "800",
    color: "#0F172A",
    marginBottom: 8,
  },
  errorSubtitle: {
    fontSize: 14,
    color: "#64748B",
  },
});
