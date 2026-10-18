import React, { useEffect, useState } from "react";
import { View, Image, ActivityIndicator, StyleSheet, Text } from "react-native";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";

SplashScreen.preventAutoHideAsync().catch(() => {});

export default function RootLayout() {
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        // Small delay so JS bundle and components mount smoothly
        await new Promise((resolve) => setTimeout(resolve, 500));
      } catch {
        // Ignored
      } finally {
        setAppIsReady(true);
        await SplashScreen.hideAsync().catch(() => {});
      }
    }
    prepare();
  }, []);

  return (
    <>
      <StatusBar style="dark" />
      <Stack
        screenOptions={{
          headerShown: false,
          animation: "slide_from_right",
        }}
      >
        <Stack.Screen name="index" options={{ headerShown: false }} />
      </Stack>

      {!appIsReady && (
        <View style={styles.splashOverlay}>
          <Image
            source={require("../../assets/images/splash-icon.png")}
            style={styles.splashLogo}
            resizeMode="contain"
          />
          <Text style={styles.brandTitle}>TopCalcBox</Text>
          <Text style={styles.brandSubtitle}>Free Online Calculators</Text>
          <ActivityIndicator
            size="small"
            color="#EA580C"
            style={styles.loader}
          />
        </View>
      )}
    </>
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
    width: 110,
    height: 110,
    borderRadius: 22,
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
});
