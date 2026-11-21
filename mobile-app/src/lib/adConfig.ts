import { Platform } from "react-native";

/**
 * AdMob Configuration for TopCalcBox (Calculator: All in One)
 *
 * App ID: ca-app-pub-9267692450432886~2829965350
 * Banner Ad Unit: ca-app-pub-9267692450432886/4751813858
 * Interstitial Ad Unit: ca-app-pub-9267692450432886/2103927221
 * Native Advanced Unit: ca-app-pub-9267692450432886/8122540667
 */

export const ADMOB_APP_ID =
  process.env.EXPO_PUBLIC_ADMOB_APP_ID || "ca-app-pub-9267692450432886~2829965350";

export const PRODUCTION_AD_UNITS = {
  BANNER:
    process.env.EXPO_PUBLIC_ADMOB_BANNER_ID || "ca-app-pub-9267692450432886/4751813858",
  INTERSTITIAL:
    process.env.EXPO_PUBLIC_ADMOB_INTERSTITIAL_ID || "ca-app-pub-9267692450432886/2103927221",
  NATIVE:
    process.env.EXPO_PUBLIC_ADMOB_NATIVE_ID || "ca-app-pub-9267692450432886/8122540667",
};

/**
 * Official Google AdMob sample test IDs
 * Used during local development (__DEV__ === true) to protect the client's
 * account against self-impression / invalid traffic penalties.
 */
export const TEST_AD_UNITS = {
  BANNER: Platform.select({
    android: "ca-app-pub-3940256099942544/6300978111",
    ios: "ca-app-pub-3940256099942544/2934735716",
    default: "ca-app-pub-3940256099942544/6300978111",
  }),
  INTERSTITIAL: Platform.select({
    android: "ca-app-pub-3940256099942544/1033173712",
    ios: "ca-app-pub-3940256099942544/4411468910",
    default: "ca-app-pub-3940256099942544/1033173712",
  }),
  NATIVE: Platform.select({
    android: "ca-app-pub-3940256099942544/2247696110",
    ios: "ca-app-pub-3940256099942544/3986624511",
    default: "ca-app-pub-3940256099942544/2247696110",
  }),
};

// Set to true only if you need to force production IDs in development
const FORCE_PRODUCTION_ADS = false;
const isTestEnvironment = __DEV__ && !FORCE_PRODUCTION_ADS;

export const AD_UNITS = {
  BANNER: isTestEnvironment ? TEST_AD_UNITS.BANNER : PRODUCTION_AD_UNITS.BANNER,
  INTERSTITIAL: isTestEnvironment
    ? TEST_AD_UNITS.INTERSTITIAL
    : PRODUCTION_AD_UNITS.INTERSTITIAL,
  NATIVE: isTestEnvironment ? TEST_AD_UNITS.NATIVE : PRODUCTION_AD_UNITS.NATIVE,
};

/**
 * Balanced ad display thresholds
 * Ensures ads never annoy users or disrupt calculations.
 */
export const AD_THRESHOLDS = {
  // Minimum time (in milliseconds) between interstitial ads (2.5 minutes)
  INTERSTITIAL_COOLDOWN_MS: 150 * 1000,
  // Minimum user calculation / tool interaction actions before an interstitial is eligible
  MIN_ACTIONS_BEFORE_INTERSTITIAL: 3,
};
