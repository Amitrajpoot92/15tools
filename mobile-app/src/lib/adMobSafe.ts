import { Platform, TurboModuleRegistry } from "react-native";
import Constants, { ExecutionEnvironment } from "expo-constants";

let hasLoggedExpoGoNotice = false;

/**
 * Checks whether the native Google Mobile Ads binary module is available.
 *
 * In standard Expo Go, custom native TurboModules like 'RNGoogleMobileAdsModule'
 * are not bundled in the client APK. In that environment, ads are safely disabled
 * so the app runs smoothly without crashing.
 *
 * When built as a Development Build (npx expo run:android) or a Standalone APK
 * (eas build / gradlew assembleRelease), the native binary is present and ads
 * function normally.
 */
export function isAdMobNativeAvailable(): boolean {
  if (Platform.OS === "web") {
    return false;
  }

  try {
    // 1. Detect Expo Go client
    if (
      Constants.appOwnership === "expo" ||
      Constants.executionEnvironment === ExecutionEnvironment.StoreClient
    ) {
      if (__DEV__ && !hasLoggedExpoGoNotice) {
        hasLoggedExpoGoNotice = true;
        console.log(
          "[AdMob] Running inside Expo Go: Native ads module is disabled in Expo Go.\n" +
            "To test live ads, build a development client (npx expo run:android) or standalone APK."
        );
      }
      return false;
    }

    // 2. Check if TurboModule / NativeModule is actually registered in binary
    const hasModule =
      TurboModuleRegistry &&
      typeof TurboModuleRegistry.get === "function" &&
      TurboModuleRegistry.get("RNGoogleMobileAdsModule") != null;

    if (!hasModule && __DEV__ && !hasLoggedExpoGoNotice) {
      hasLoggedExpoGoNotice = true;
      console.log(
        "[AdMob] 'RNGoogleMobileAdsModule' not found in current native binary. Ads safely disabled."
      );
    }

    return hasModule;
  } catch {
    return false;
  }
}

let cachedAdsModule: any = null;

/**
 * Safely loads the react-native-google-mobile-ads module only when the native
 * binary is available. Returns null in Expo Go or Web.
 */
export function getGoogleMobileAds(): any {
  if (cachedAdsModule) {
    return cachedAdsModule;
  }

  if (!isAdMobNativeAvailable()) {
    return null;
  }

  try {
    // Dynamic require prevents Metro from evaluating TurboModuleRegistry.getEnforcing on startup in Expo Go
    cachedAdsModule = require("react-native-google-mobile-ads");
    return cachedAdsModule;
  } catch (error) {
    if (__DEV__) {
      console.warn("[AdMob] Error requiring react-native-google-mobile-ads:", error);
    }
    return null;
  }
}
